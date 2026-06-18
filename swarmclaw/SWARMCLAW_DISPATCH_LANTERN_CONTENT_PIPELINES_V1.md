# SWARMCLAW DISPATCH — THE LANTERN DAILY
## Autonomous Content Pipeline: 3 n8n Flows
Version: 1.0 | Date: 2026-06-16 | Priority: HIGH

---

## MISSION

Build 3 n8n automation flows that make The Lantern Daily an **autonomous editorial publication**.

This is NOT an aggregator. These flows **write original commentary** through the halal lens, screen for compliance, and insert into `lantern_content_queue` for operator review.

Supabase project: `endovljmaudnxdzdapmf`
Table: `lantern_content_queue`
All flows insert rows — the operator reviews and approves via `/dashboard/content-queue`

---

## FLOW 1: ARTICLE SIGNAL INGESTION
**n8n flow name:** `lantern_article_ingestion`
**Schedule:** Every 4 hours (cron: `0 */4 * * *`)

### Step 1 — Fetch RSS feeds (HTTP Request node × 8)

Feeds to pull (all permissive RSS, no auth required):

| Source | RSS URL |
|--------|---------|
| MuslimMatters | `https://muslimmatters.org/feed/` |
| Amanah Ventures | `https://amanaventures.com/feed/` |
| IslamicFinanceGuru | `https://islamicfinanceguru.com/feed/` |
| ProductiveMuslim | `https://productivemuslim.com/feed/` |
| IlmFeed | `https://ilmfeed.com/feed/` |
| Mvslim | `https://mvslim.com/feed/` |
| Yaqeen Institute | `https://yaqeeninstitute.org/feed/` |
| Rest of World (tech only) | `https://restofworld.org/feed/` |

### Step 2 — XML → items (XML Parse node)
Parse each RSS feed. Extract per-item:
- `title` (RSS item title)
- `link` (article URL)
- `description` (RSS excerpt / summary)
- `pubDate` (publish date)
- `source` (feed source name)

Filter: `pubDate` within last 8 hours only. Deduplicate by URL.

### Step 3 — Full article extraction (HTTP Request → Code node)
For each URL, use `newspaper3k` via Python Code node OR direct HTTP + regex to extract:
- `source_headline` = article's actual `<h1>` text
- `source_excerpt` = first 300 chars of article body

If extraction fails, use RSS description as fallback.

### Step 4 — Halal screening (HTTP Request → Groq)
**Model:** `llama-4-scout-17b-16e-instruct` via Groq API
**Endpoint:** `https://api.groq.com/openai/v1/chat/completions`
**Headers:** `Authorization: Bearer {{ $env.GROQ_API_KEY }}`

**System prompt:**
```
You are the halal content screener for The Lantern Daily, a Muslim tech and business publication.

Screen this article signal for halal compliance. Consider:
- Does it involve riba (interest-based finance)?
- Does it normalize haram behavior or relationships?
- Does it involve gambling, alcohol, pork, weapons against Muslims?
- Is the content appropriate for a Muslim professional audience?

Return ONLY a JSON object:
{
  "halal_score": <0-100, where 100 is fully halal>,
  "halal_verdict": <"pass" | "review" | "fail">,
  "halal_flags": [<array of specific concern strings, empty if none>],
  "relevance_score": <0-100, how relevant to Muslim tech/business audience>
}
```

**User message:** `Title: {{title}}\n\nSource: {{source}}\n\nExcerpt: {{source_excerpt}}`

Parse the JSON response. Any `halal_verdict: "fail"` items are still inserted with status `rejected` for audit trail.

### Step 5 — AI editorial commentary (HTTP Request → Groq)
**ONLY for items where halal_verdict is "pass" or "review" AND relevance_score >= 60**
**Model:** `llama-4-maverick-17b-128e-instruct` via Groq

**System prompt:**
```
You are the editorial voice of The Lantern Daily — a premium Muslim tech and business newsletter. You write with discipline, precision, and intelligence. You are NOT summarizing. You are writing original editorial commentary in the halal lens.

The Lantern has no individual byline. You write as a community-first editorial voice.

Rules:
- 150-250 words MAXIMUM
- Original perspective, not a summary of the source
- Frame through Muslim professional lens: why does this matter to Muslim founders, investors, or practitioners?
- Be direct. No fluff. No "in conclusion."
- End with: "Source: [source name]" on its own line
- Never mention "as a Muslim" — write naturally for a Muslim audience
- Do not hallucinate facts not in the provided excerpt
```

**User message:**
```
Signal: {{title}}
Source: {{source}}
Excerpt: {{source_excerpt}}

Write the Lantern editorial commentary on this signal.
```

Store as `editorial_commentary`.

### Step 6 — Insert to Supabase (HTTP Request node)
**Method:** POST
**URL:** `https://endovljmaudnxdzdapmf.supabase.co/rest/v1/lantern_content_queue`
**Headers:**
```
apikey: {{ $env.SUPABASE_SERVICE_ROLE_KEY }}
Authorization: Bearer {{ $env.SUPABASE_SERVICE_ROLE_KEY }}
Content-Type: application/json
Prefer: return=minimal
```

**Body:**
```json
{
  "title": "{{ editorial_title_from_groq_or_original }}",
  "url": "{{ link }}",
  "source": "{{ source }}",
  "content_type": "article",
  "status": "{{ halal_verdict == 'fail' ? 'rejected' : 'pending' }}",
  "ai_summary": "{{ editorial_commentary }}",
  "editorial_commentary": "{{ editorial_commentary }}",
  "source_headline": "{{ source_headline }}",
  "source_excerpt": "{{ source_excerpt }}",
  "halal_score": {{ halal_score }},
  "halal_flags": {{ halal_flags }},
  "halal_verdict": "{{ halal_verdict }}",
  "relevance_score": {{ relevance_score }},
  "reject_reason": "{{ halal_verdict == 'fail' ? 'Halal screening failed: ' + halal_flags[0] : null }}"
}
```

**Dedup check BEFORE insert:** Query Supabase first for existing `url` in last 7 days. Skip if found.

---

## FLOW 2: HALAL MARKET SIGNAL
**n8n flow name:** `lantern_market_signal`
**Schedule:** Every weekday at 7:00 AM EST (cron: `0 12 * * 1-5`)

### Step 1 — Fetch halal stock data (HTTP Request × 5 tickers)

**Source:** yfinance via Python Code node (Apache 2.0, no API key)

```python
import yfinance as yf
import json

HALAL_TICKERS = ["AAPX", "MSFT", "AMZN", "GOOGL", "TSLA"]
# Note: Always verify halal status via Musaffa before featuring

results = []
for ticker in HALAL_TICKERS:
    t = yf.Ticker(ticker)
    info = t.info
    hist = t.history(period="5d")
    
    if len(hist) >= 2:
        latest_close = hist["Close"].iloc[-1]
        prev_close = hist["Close"].iloc[-2]
        change_pct = ((latest_close - prev_close) / prev_close) * 100
    else:
        continue
    
    results.append({
        "ticker": ticker,
        "company_name": info.get("shortName", ticker),
        "current_price": round(latest_close, 2),
        "change_pct": round(change_pct, 2),
        "market_cap": info.get("marketCap"),
        "sector": info.get("sector"),
        "week_high": round(hist["High"].max(), 2),
        "week_low": round(hist["Low"].min(), 2),
    })

print(json.dumps(results))
```

### Step 2 — Musaffa halal verification (HTTP Request)
For each ticker, call Musaffa API (free tier):
**URL:** `https://api.musaffa.com/v1/stocks/{{ticker}}/compliance`

Parse: `compliance_status` (COMPLIANT | NON_COMPLIANT | DOUBTFUL | NOT_COVERED)
Map to `halal_verdict`: COMPLIANT → "pass", DOUBTFUL → "review", NON_COMPLIANT → "fail", NOT_COVERED → "review"

If Musaffa is unavailable, use DJIM methodology rules hardcoded:
- Debt/Total Assets > 33% → "review"
- Revenue from haram > 5% → "fail"

### Step 3 — Market editorial (Groq llama-4-maverick)

**System prompt:**
```
You are the Halal Market Watch editor for The Lantern Daily. Write educational, non-advisory market commentary.

MANDATORY COMPLIANCE PREFACE (include verbatim at start):
"EDUCATIONAL ONLY. The Lantern Daily is not a registered investment advisor. Nothing here constitutes investment advice. Halal screening sourced from Musaffa/DJIM — verify independently. Consult a qualified financial advisor."

After the preface, write 80-120 words of educational market commentary:
- Explain the week's notable movement in plain language
- Reference the halal screening status (cite AAOIFI debt ratio standard)
- Mention the sector context
- Do NOT say "buy", "sell", or recommend any action
- End with the compliance disclaimer on its own line
```

**User message:**
```
Tickers this week: {{ticker_data_json}}

Write the Halal Market Watch segment.
```

### Step 4 — Insert to Supabase
One row per featured ticker with notable movement (|change_pct| > 2% OR halal_verdict changed):

```json
{
  "title": "Halal Market Watch: {{company_name}} ({{ticker}}) — {{change_pct}}% this week",
  "content_type": "market",
  "status": "pending",
  "market_ticker": "{{ticker}}",
  "market_data": {
    "current_price": {{current_price}},
    "change_pct": {{change_pct}},
    "market_cap": {{market_cap}},
    "sector": "{{sector}}",
    "week_high": {{week_high}},
    "week_low": {{week_low}},
    "musaffa_status": "{{compliance_status}}"
  },
  "editorial_commentary": "{{market_editorial}}",
  "halal_score": {{ compliant ? 85 : 30 }},
  "halal_verdict": "{{halal_verdict}}",
  "halal_flags": {{ halal_flags }},
  "relevance_score": 90,
  "source": "Musaffa + yfinance"
}
```

---

## FLOW 3: HALAL VIDEO PIPELINE
**n8n flow name:** `lantern_video_pipeline`
**Schedule:** Every Monday at 9:00 AM EST (cron: `0 14 * * 1`)

### Step 1 — Fetch active channels from Supabase
```
GET /rest/v1/lantern_video_channels?active=eq.true&select=*
```

### Step 2 — YouTube Data API v3 (HTTP Request per channel)
**URL:** `https://www.googleapis.com/youtube/v3/search`
**Params:**
```
channelId: {{youtube_channel_id}}
part: snippet
order: date
maxResults: 5
publishedAfter: {{last_monday_iso}}
type: video
key: {{YOUTUBE_DATA_API_KEY}}
```

Extract per video:
- `videoId` → `youtube_video_id`
- `snippet.title` → `title`
- `snippet.description` → `source_excerpt`
- `snippet.thumbnails.high.url` → thumbnail
- `snippet.channelTitle` → `source`

### Step 3 — Halal screen the video title + description (Groq llama-4-scout)
Same halal screening prompt as Flow 1. Videos about:
- Islamic finance education → "pass"
- Muslim entrepreneur stories → "pass"
- General tech/business → "pass" (context check)
- Music content → "review"
- Mixed gender entertainment → "review"

### Step 4 — Video editorial (Groq llama-4-maverick)
**System prompt:**
```
You are the video curator for The Lantern Daily. Write 2-3 sentences explaining why this video matters this week for the Muslim tech and business community. Be specific. Reference something concrete from the title/description. No filler.
```

### Step 5 — Insert to Supabase
One row per video that passes halal screen (score >= 60):

```json
{
  "title": "{{video_title}}",
  "url": "https://www.youtube.com/watch?v={{videoId}}",
  "source": "{{channel_name}}",
  "content_type": "video",
  "status": "pending",
  "youtube_video_id": "{{videoId}}",
  "editorial_commentary": "{{video_editorial}}",
  "source_excerpt": "{{description_first_200_chars}}",
  "halal_score": {{halal_score}},
  "halal_verdict": "{{halal_verdict}}",
  "halal_flags": {{halal_flags}},
  "relevance_score": {{relevance_score}}
}
```

---

## ENV VARS REQUIRED (add to n8n credentials)

| Key | Value Source |
|-----|-------------|
| `GROQ_API_KEY` | Groq console (existing — llama-4-scout + maverick) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project `endovljmaudnxdzdapmf` → Settings → API |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://endovljmaudnxdzdapmf.supabase.co` |
| `YOUTUBE_DATA_API_KEY` | Google Cloud Console → YouTube Data API v3 (free, 10k units/day) |
| `MUSAFFA_API_KEY` | musaffa.com → free tier signup |

---

## DEDUP LOGIC (applies to all 3 flows)

Before any insert, run a Supabase query:
```
GET /rest/v1/lantern_content_queue?url=eq.{{encoded_url}}&queued_at=gte.{{7_days_ago}}
```
If count > 0, skip. Do not insert duplicates.

For market signals, dedup by `market_ticker + DATE(queued_at)` — one ticker per day max.

For videos, dedup by `youtube_video_id`.

---

## ERROR HANDLING

| Error | Behavior |
|-------|----------|
| RSS feed down | Skip that source, continue others, log to n8n execution log |
| Groq rate limit | Wait 10s, retry once. If fails again, insert with `editorial_commentary = null` |
| Supabase insert fails | Log error, do NOT retry silently — mark n8n execution as failed |
| Musaffa unavailable | Fall back to DJIM hardcoded rules, add flag `"musaffa_unavailable"` to `halal_flags` |
| yfinance error | Skip that ticker, continue |
| YouTube quota exceeded | Log and abort, alert via n8n error workflow |

---

## SUCCESS CRITERIA

Flow 1 (articles): 3-8 new items inserted per 4-hour cycle, halal_verdict populated on all
Flow 2 (market): 1-3 market cards per weekday morning, compliance preface always present
Flow 3 (video): 3-8 new video cards per Monday, all have editorial_commentary

Total target: ~30-50 new queue items per week, ready for operator review at `/dashboard/content-queue`

---

## SWARMCLAW AGENT ASSIGNMENT

| Task | Agent |
|------|-------|
| Build Flow 1 in n8n | ENGINEER agent |
| Build Flow 2 in n8n | ENGINEER agent |
| Build Flow 3 in n8n | ENGINEER agent |
| Test all 3 flows end-to-end | QA agent |
| Verify Supabase inserts | VERIFY agent |
| Document flow schemas | LIBRARIAN agent |

**Priority:** Build in order (Flow 1 → Flow 2 → Flow 3). Flow 1 is highest leverage.
