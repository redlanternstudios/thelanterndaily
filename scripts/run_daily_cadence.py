#!/usr/bin/env python3
"""
The Lantern Daily: Autonomous Daily Cadence Ingestion and Editorial Runner
File: projects/Red-Lantern-Daily/scripts/run_daily_cadence.py
Parent Entity: Penn Enterprises LLC
Standards: SYS-MOD-000, SYS-MOD-008, SYS-MOD-GUARD-018, SYS-MOD-GUARD-040, GUARD-SYNTAX-NO-DASH

Executes headless 6:00 AM daily cadence:
1. Ingests fresh wire stories from gold-standard tech and AI RSS feeds
2. Evaluates deduplication against Supabase state store (MD5 canonical hash)
3. Synthesizes executive briefing and Islamic ethical review via Gemini 2.5 Flash
4. Stages draft in Supabase PostgreSQL (public.posts with status 'needs_review')
5. Pushes interactive 1-tap review card to Keymon via Telegram Pocket Remote
6. Dispatches governance audit log to Slack #leads-and-alerts
"""

import os
import sys
import json
import time
import socket
import hashlib
import argparse
import urllib.request
import urllib.error
from urllib.parse import urljoin
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple

# Force IPv4 socket resolution on macOS to eliminate network Errno 65
orig_getaddrinfo = socket.getaddrinfo
def getaddrinfo_ipv4_only(host, port, family=0, type=0, proto=0, flags=0):
    res = orig_getaddrinfo(host, port, socket.AF_INET, type, proto, flags)
    return [r for r in res if r[0] == socket.AF_INET]
socket.getaddrinfo = getaddrinfo_ipv4_only

# Locate project and workspace roots
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
WORKSPACE_ROOT = PROJECT_DIR.parent.parent

# 1. Environment Variable Loader (Supports CI/CD env vars and local .env files)
def load_environment():
    """Loads configuration from process environment or local .env files."""
    env_paths = [
        PROJECT_DIR / "frontend/.env.local",
        PROJECT_DIR / "frontend/.env",
        WORKSPACE_ROOT / ".env"
    ]
    for p in env_paths:
        if p.exists():
            try:
                with open(p, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            k = k.strip()
                            v = v.strip().strip("'\"")
                            if k and k not in os.environ:
                                os.environ[k] = v
            except Exception:
                pass

load_environment()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL", "").strip().rstrip("/")
SUPABASE_KEY = (os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY") or "").strip()
GEMINI_API_KEY = (os.getenv("GOOGLE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY") or "").strip()
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "1866262824").strip()
SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL", "").strip()

# Gold-Standard Ingestion Sources
DEFAULT_FEEDS = [
    {
        "name": "TechCrunch AI",
        "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
        "category": "ai-systems",
        "trust_tier": "tier_1_verified"
    },
    {
        "name": "Hacker News Top",
        "url": "https://news.ycombinator.com/rss",
        "category": "operator-stack",
        "trust_tier": "tier_1_verified"
    },
    {
        "name": "Supabase Engineering",
        "url": "https://supabase.com/rss.xml",
        "category": "operator-stack",
        "trust_tier": "tier_1_verified"
    },
    {
        "name": "ArXiv AI Research",
        "url": "https://rss.arxiv.org/rss/cs.AI",
        "category": "research",
        "trust_tier": "tier_1_verified"
    }
]

def sanitize_dashes(text: str) -> str:
    """Enforces GUARD-SYNTAX-NO-DASH: replaces em dashes, en dashes, and double hyphens."""
    if not text:
        return ""
    return text.replace("—", ", ").replace("–", ", ").replace("--", ", ")

def log(tag: str, msg: str):
    now = datetime.now(timezone.utc).strftime("%H:%M:%S")
    clean_msg = sanitize_dashes(msg)
    print(f"[{now}] [{tag}] {clean_msg}")

def http_get(url: str, headers: Optional[Dict[str, str]] = None, timeout: int = 12, max_redirects: int = 4) -> Tuple[int, bytes]:
    """Robust HTTP GET with redirect following (handles 301, 302, 307, 308)."""
    current_url = url
    req_headers = {"User-Agent": "TheLanternDaily-CadenceEngine/2.0 (Penn Enterprises LLC)"}
    if headers:
        req_headers.update(headers)
        
    for _ in range(max_redirects):
        req = urllib.request.Request(current_url, headers=req_headers)
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.status, resp.read()
        except urllib.error.HTTPError as e:
            if e.code in (301, 302, 303, 307, 308) and "Location" in e.headers:
                loc = e.headers["Location"]
                current_url = urljoin(current_url, loc)
                continue
            return e.code, e.read()
        except Exception as e:
            log("HTTP_ERR", f"Failed {current_url}: {e}")
            return 0, b""
    return 0, b""

def http_post_json(url: str, payload: Dict[str, Any], headers: Optional[Dict[str, str]] = None, timeout: int = 15) -> Tuple[int, Dict[str, Any]]:
    req_headers = {
        "Content-Type": "application/json",
        "User-Agent": "TheLanternDaily-CadenceEngine/2.0 (Penn Enterprises LLC)"
    }
    if headers:
        req_headers.update(headers)

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=req_headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8")
            return resp.status, json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            return e.code, json.loads(body)
        except Exception:
            return e.code, {"error": body}
    except Exception as e:
        log("HTTP_POST_ERR", f"Failed {url}: {e}")
        return 0, {"error": str(e)}

def find_child(parent: ET.Element, tag_names: List[str]) -> Optional[ET.Element]:
    """Finds first matching child element avoiding python bool(Element) gotchas."""
    for tag in tag_names:
        el = parent.find(tag)
        if el is not None:
            return el
    for child in parent:
        clean_tag = child.tag.split("}")[-1] if "}" in child.tag else child.tag
        if clean_tag in tag_names:
            return child
    return None

def parse_rss_feed(feed_meta: Dict[str, str]) -> List[Dict[str, Any]]:
    """Fetches and parses RSS/Atom feed into normalized article objects."""
    feed_url = feed_meta["url"]
    source_name = feed_meta["name"]
    category = feed_meta.get("category", "ai-systems")
    
    status, xml_bytes = http_get(feed_url)
    if status != 200 or not xml_bytes:
        log("FEED_WARN", f"Could not reach {source_name} at {feed_url} (Status: {status})")
        return []

    try:
        root = ET.fromstring(xml_bytes)
    except Exception as e:
        log("XML_PARSE_ERR", f"XML parse error for {source_name}: {e}")
        return []

    items = []
    channel = root.find("channel")
    if channel is not None:
        raw_items = channel.findall("item")
    else:
        raw_items = root.findall(".//item") or root.findall(".//{http://www.w3.org/2005/Atom}entry")
    
    for item in raw_items[:6]:
        title_el = find_child(item, ["title", "{http://www.w3.org/2005/Atom}title"])
        link_el = find_child(item, ["link", "{http://www.w3.org/2005/Atom}link"])
        desc_el = find_child(item, ["description", "{http://www.w3.org/2005/Atom}summary"])
        guid_el = find_child(item, ["guid", "{http://www.w3.org/2005/Atom}id"])

        title = title_el.text.strip() if title_el is not None and title_el.text else ""
        desc = desc_el.text.strip() if desc_el is not None and desc_el.text else ""
        
        link = ""
        if link_el is not None:
            link = link_el.get("href") or (link_el.text.strip() if link_el.text else "")

        guid = guid_el.text.strip() if guid_el is not None and guid_el.text else link

        if not title or not link:
            continue

        clean_link = link.split("?")[0].strip()
        dedupe_key = hashlib.md5(f"{source_name}|{clean_link}".encode("utf-8")).hexdigest()

        items.append({
            "source_name": source_name,
            "source_url": clean_link,
            "title": sanitize_dashes(title),
            "summary": sanitize_dashes(desc[:500]),
            "category": category,
            "dedupe_key": dedupe_key,
            "article_guid": guid,
            "published_at": datetime.now(timezone.utc).isoformat()
        })

    log("FEED_INTAKE", f"Parsed {len(items)} items from {source_name}")
    return items

def get_existing_dedupe_keys() -> set:
    """Queries Supabase for already ingested deduplication keys."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        log("DB_WARN", "Supabase credentials not configured: running local dedupe cache only")
        return set()

    url = f"{SUPABASE_URL}/rest/v1/lantern_signals?select=dedupe_key&limit=500"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}"
    }
    status, body_bytes = http_get(url, headers=headers)
    if status == 200:
        try:
            records = json.loads(body_bytes.decode("utf-8"))
            keys = {r["dedupe_key"] for r in records if "dedupe_key" in r and r["dedupe_key"]}
            log("DEDUPE_CACHE", f"Loaded {len(keys)} existing dedupe keys from Supabase")
            return keys
        except Exception:
            return set()
    return set()

def synthesize_with_gemini(article: Dict[str, Any], model_name: str = "gemini-2.5-flash") -> Optional[Dict[str, Any]]:
    """Evaluates raw wire item through Gemini using the Islamic Lens taxonomy."""
    if not GEMINI_API_KEY:
        log("AI_WARN", "GOOGLE_GEMINI_API_KEY missing: using structured heuristic fallback")
        return {
            "headline": sanitize_dashes(article["title"]),
            "summary": sanitize_dashes(article["summary"] or "High conviction technical update from primary wire feeds."),
            "halal_stance": "positive",
            "editorial_note": "Technology infrastructure aligned with open source transparency and utility.",
            "reading_time_minutes": 5,
            "pull_quote_text": "Whoever treads a path seeking knowledge, Allah makes easy for him the path to Paradise.",
            "pull_quote_source": "Sahih Muslim 2699",
            "pull_quote_narrator": "Prophet Muhammad (pbuh)"
        }

    prompt = (
        "You are the executive editorial voice of The Lantern Daily.\n"
        "Tone: High status, white glove, calm elder who knows advanced engineering, markets, and Islam.\n"
        "Never sensational, never lecturing, never fatwa issuing, never alarmist.\n"
        "CRITICAL RULE: DO NOT use any em dashes, en dashes, or double hyphens. Use commas, colons, or clean sentences.\n\n"
        "Produce an executive editorial brief for this wire story hitting the 3-beat structure:\n"
        "1. Ground: Explain what happened in concise, enterprise-grade terms.\n"
        "2. Reflect: Analyze what it touches in personal deen, capital sovereignty, or builder independence.\n"
        "3. Soft Anchor: Provide an authentic scripture citation from Quran or Sahih Hadith.\n\n"
        f"STORY DETAILS:\n"
        f"Title: {article['title']}\n"
        f"Source: {article['source_name']}\n"
        f"Summary: {article['summary']}\n"
        f"Category: {article['category']}\n\n"
        "Respond STRICTLY in valid JSON matching this schema:\n"
        "{\n"
        '  "headline": "Crisp Title Case Headline Without Any Dashes",\n'
        '  "summary": "1 to 2 sentences summarizing the strategic takeaway",\n'
        '  "halal_stance": "positive" | "nuanced" | "critical" | "blocked",\n'
        '  "editorial_note": "The Islamic Lens paragraph evaluating ethics and Maqasid impact",\n'
        '  "reading_time_minutes": 5,\n'
        '  "pull_quote_text": "Scripture quote in English",\n'
        '  "pull_quote_source": "e.g. Sahih Muslim 2699 or Surah Al-Baqarah 2:275",\n'
        '  "pull_quote_narrator": "e.g. Prophet Muhammad (pbuh) or Holy Quran"\n'
        "}"
    )

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.2
        }
    }

    log("AI_DESK", f"Invoking {model_name} for editorial synthesis...")
    t0 = time.time()
    status, data = http_post_json(url, payload)
    elapsed = round(time.time() - t0, 2)

    if status == 200:
        try:
            raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
            result = json.loads(raw_text)
            for k in ["headline", "summary", "editorial_note", "pull_quote_text"]:
                if k in result and isinstance(result[k], str):
                    result[k] = sanitize_dashes(result[k])
            log("AI_DESK", f"Synthesis received in {elapsed}s (Stance: {result.get('halal_stance')})")
            return result
        except Exception as e:
            log("AI_PARSE_ERR", f"Failed to parse Gemini output: {e}")
            return None
    else:
        log("AI_ERR", f"Gemini API returned status {status}: {data}")
        return None

def slugify(text: str) -> str:
    clean = "".join(c.lower() if c.isalnum() or c.isspace() else "" for c in text)
    return "-".join(clean.split()[:8])

def stage_in_supabase(article: Dict[str, Any], synthesis: Dict[str, Any], dry_run: bool = False) -> Optional[str]:
    """Persists staged raw signal and draft post into Supabase tables."""
    if dry_run:
        log("DRY_RUN", "Supabase staging simulated: skipping write operations")
        return "dryrun-stage-id-001"

    if not SUPABASE_URL or not SUPABASE_KEY:
        log("DB_SKIP", "Skipping Supabase staging (credentials not provided)")
        return "local-stage-mock-id"

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Prefer": "return=representation"
    }

    # 1. Insert into public.lantern_signals
    signal_payload = [{
        "source_name": article["source_name"],
        "source_tier": "tier_1_verified",
        "headline": article["title"],
        "source_url": article["source_url"],
        "dedupe_key": article["dedupe_key"],
        "published_at": article["published_at"]
    }]
    sig_url = f"{SUPABASE_URL}/rest/v1/lantern_signals"
    sig_status, sig_res = http_post_json(sig_url, signal_payload, headers=headers)
    if sig_status not in (200, 201):
        log("DB_WARN", f"Signal stage returned {sig_status}: {sig_res}")

    # 2. Insert draft into public.posts
    slug = slugify(synthesis.get("headline") or article["title"])
    post_payload = [{
        "title": sanitize_dashes(synthesis.get("headline") or article["title"]),
        "slug": f"{slug}-{int(time.time())}",
        "type": "daily-dispatch",
        "category": article["category"],
        "excerpt": sanitize_dashes(synthesis.get("summary") or article["summary"]),
        "body_markdown": sanitize_dashes(f"{synthesis.get('summary')}\n\n{synthesis.get('editorial_note')}"),
        "halal_stance": synthesis.get("halal_stance", "positive").lower(),
        "editorial_note": sanitize_dashes(synthesis.get("editorial_note", "")),
        "reading_time_minutes": synthesis.get("reading_time_minutes", 5),
        "status": "needs_review",
        "published_at": datetime.now(timezone.utc).isoformat()
    }]
    post_url = f"{SUPABASE_URL}/rest/v1/posts"
    post_status, post_res = http_post_json(post_url, post_payload, headers=headers)
    if post_status in (200, 201) and isinstance(post_res, list) and len(post_res) > 0:
        post_id = post_res[0].get("id")
        log("DB_SUCCESS", f"Draft staged in public.posts with ID: {post_id}")
        return post_id
    else:
        log("DB_ERR", f"Failed to stage post (Status: {post_status}): {post_res}")
        return None

def dispatch_telegram_remote_card(article: Dict[str, Any], synthesis: Dict[str, Any], post_id: Optional[str], dry_run: bool = False) -> bool:
    """Sends interactive review card to Keymon via Telegram Bot API."""
    if dry_run:
        log("DRY_RUN", "Telegram dispatch simulated: skipping network send")
        return True

    if not TELEGRAM_BOT_TOKEN:
        log("TELEGRAM_SKIP", "TELEGRAM_BOT_TOKEN not configured")
        return False

    stance = synthesis.get("halal_stance", "positive").upper()
    emoji = "🟢" if stance == "POSITIVE" else ("🟡" if stance == "NUANCED" else "🔴")
    
    text = (
        "🏮 <b>THE LANTERN DAILY · MORNING EDITORIAL REVIEW</b>\n\n"
        f"<b>Headline:</b> {synthesis.get('headline') or article['title']}\n"
        f"<b>Source:</b> {article['source_name']} | <b>Stance:</b> {emoji} [{stance}]\n"
        f"<b>Read:</b> {synthesis.get('reading_time_minutes', 5)} min read\n\n"
        f"<b>Summary:</b>\n{synthesis.get('summary')}\n\n"
        f"<b>Islamic Lens:</b>\n<i>{synthesis.get('editorial_note')}</i>\n\n"
        f"<b>Scripture Anchor:</b>\n"
        f"\"{synthesis.get('pull_quote_text')}\"\n"
        f", {synthesis.get('pull_quote_narrator')} ({synthesis.get('pull_quote_source')})\n\n"
        f"<i>Status: Staged as NEEDS_REVIEW | 1-Tap Action Required</i>"
    )

    cb_token = (post_id or "rld")[:16]
    keyboard = {
        "inline_keyboard": [
            [
                {"text": "✅ Approve and Publish", "callback_data": f"rld_app:{cb_token}"},
                {"text": "❌ Reject Draft", "callback_data": f"rld_rej:{cb_token}"}
            ],
            [
                {"text": "📖 Read Wire Source", "url": article["source_url"]}
            ]
        ]
    }

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "reply_markup": keyboard
    }

    log("TELEGRAM", f"Dispatching review card to Keymon (Chat ID: {TELEGRAM_CHAT_ID})...")
    status, resp = http_post_json(url, payload)
    if status == 200 and resp.get("ok"):
        log("TELEGRAM_SUCCESS", f"HITL Card delivered (Message ID: {resp.get('result', {}).get('message_id')})")
        return True
    else:
        log("TELEGRAM_ERR", f"Telegram API failed (Status {status}): {resp}")
        return False

def dispatch_slack_audit(article: Dict[str, Any], synthesis: Dict[str, Any], post_id: Optional[str], dry_run: bool = False):
    """Dispatches governance audit log to Slack."""
    if dry_run:
        log("DRY_RUN", "Slack audit simulated: skipping webhook dispatch")
        return

    if not SLACK_WEBHOOK_URL:
        return

    payload = {
        "text": f"🏮 The Lantern Daily Staged: {synthesis.get('headline')}",
        "blocks": [
            {
                "type": "header",
                "text": {"type": "plain_text", "text": "🏮 The Lantern Daily: Daily Cadence Dispatch", "emoji": True}
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*Headline:* {synthesis.get('headline')}\n*Source:* `{article['source_name']}` | *Stance:* `[{synthesis.get('halal_stance', 'positive').upper()}]`\n*Post ID:* `{post_id}`"
                }
            }
        ]
    }
    http_post_json(SLACK_WEBHOOK_URL, payload)

def run_daily_cadence(dry_run: bool = False, force: bool = False, limit: int = 1, model: str = "gemini-2.5-flash"):
    log("CADENCE_INIT", f"Starting 6:00 AM daily intelligence ingestion cycle (Dry Run: {dry_run}, Limit: {limit})")
    
    existing_keys = set() if force else get_existing_dedupe_keys()
    candidate_items = []

    # 1. Feed Ingestion Radar
    for feed in DEFAULT_FEEDS:
        items = parse_rss_feed(feed)
        for it in items:
            if it["dedupe_key"] not in existing_keys:
                candidate_items.append(it)

    log("RADAR_AUDIT", f"Identified {len(candidate_items)} fresh candidate stories across feeds")

    if not candidate_items:
        log("CADENCE_DONE", "Zero uningested stories detected: state is fully synchronized")
        return

    processed_count = 0
    for target_story in candidate_items[:limit]:
        log("TARGET_SELECT", f"Selected candidate story: '{target_story['title']}' ({target_story['source_name']})")

        # 2. AI Editorial Synthesis
        synthesis = synthesize_with_gemini(target_story, model_name=model)
        if not synthesis:
            log("CADENCE_WARN", "Synthesis returned None: skipping target")
            continue

        # 3. State Store Persistence
        post_id = stage_in_supabase(target_story, synthesis, dry_run=dry_run)

        # 4. Sovereign HITL Review Dispatch (Telegram and Slack)
        dispatch_telegram_remote_card(target_story, synthesis, post_id, dry_run=dry_run)
        dispatch_slack_audit(target_story, synthesis, post_id, dry_run=dry_run)
        
        processed_count += 1

    mode_label = "DRY RUN COMPLETE" if dry_run else "LIVE CADENCE COMPLETE"
    log("CADENCE_FINISH", f"{mode_label}: Processed {processed_count} story briefs. Ingestion cycle ended cleanly.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="The Lantern Daily: Autonomous Daily Cadence Runner")
    parser.add_argument("--dry-run", action="store_true", help="Simulate execution without modifying Supabase or sending alerts")
    parser.add_argument("--force", action="store_true", help="Bypass deduplication check")
    parser.add_argument("--limit", type=int, default=1, help="Max stories to process (default: 1)")
    parser.add_argument("--model", type=str, default="gemini-2.5-flash", help="Gemini model name")
    args = parser.parse_args()

    run_daily_cadence(dry_run=args.dry_run, force=args.force, limit=args.limit, model=args.model)
