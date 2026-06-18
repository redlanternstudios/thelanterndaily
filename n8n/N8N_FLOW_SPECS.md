# THE LANTERN — n8n FLOW SPECIFICATIONS
Version: 1.0 | 2026-06-13

6 flows. All build against the Supabase schema in `supabase/schema.sql`.
Build these in order — each flow depends on the table the previous one writes to.

---

## FLOW 1: SIGNAL INGESTOR
**Trigger:** Schedule — every 2 hours, 24/7
**Purpose:** Scrape all Tier 1 sources + receive RSS + Zapier webhooks → normalize → deduplicate → write to signals table

### Nodes (in order)

**1.1 Schedule Trigger**
- Interval: every 2 hours

**1.2 Parallel Branch — Tier 1 Scrapers (run concurrently)**

Branch A: Hacker News
```
HTTP Request → GET https://hacker-news.firebaseio.com/v0/topstories.json
→ Split In Batches (first 30 IDs)
→ HTTP Request → GET https://hacker-news.firebaseio.com/v0/item/{id}.json
→ Filter: score >= 50 AND type = 'story'
→ Map to canonical signal schema
```

Branch B: GitHub Trending (via Browserbase)
```
HTTP Request → POST https://api.browserbase.com/v1/sessions
  body: { url: "https://github.com/trending/python?since=daily", ... }
→ Extract: repo name, description, stars today, URL
→ Filter: stars_today >= 100
→ Map to canonical signal schema
```

Branch C: Product Hunt (via Browserbase)
```
HTTP Request → POST https://api.browserbase.com/v1/sessions
  body: { url: "https://producthunt.com/topics/artificial-intelligence" }
→ Extract: product name, tagline, upvotes, url
→ Filter: upvotes >= 200
→ Map to canonical signal schema
```

Branch D: ArXiv (RSS)
```
RSS Feed Read → https://rss.arxiv.org/rss/cs.AI
→ RSS Feed Read → https://rss.arxiv.org/rss/cs.LG
→ Merge
→ Map to canonical signal schema
```

Branch E: Changelog RSS feeds
```
RSS Feed Read (parallel):
  - https://www.anthropic.com/rss.xml
  - https://openai.com/news/rss/
  - https://supabase.com/blog/rss.xml
  - https://vercel.com/blog/rss
→ Merge
→ Map to canonical signal schema
```

**1.3 Merge all branches**

**1.4 Normalize to canonical schema**
```json
{
  "source": "hackernews",
  "raw_title": "...",
  "raw_url": "...",
  "raw_summary": "...",
  "published_at": "ISO8601",
  "category": null  // set by EDITOR in Flow 2
}
```

**1.5 Deduplicate**
```
Supabase → SELECT url_hash FROM signals
  WHERE url_hash = md5({{raw_url}})
  AND ingested_at > now() - interval '7 days'
→ IF EXISTS → discard
→ IF NOT EXISTS → continue
```

**1.6 Supabase — Insert**
```
Table: signals
Fields: source, raw_title, raw_url, raw_summary, published_at
Status: 'new'
```

**1.7 n8n Webhook → Trigger Flow 2 (score)**
- HTTP Request POST to Flow 2 webhook URL with signal IDs batch

---

## FLOW 2: SIGNAL SCORER
**Trigger:** Webhook (called by Flow 1) OR Schedule fallback every 4 hours
**Purpose:** Send new signals to SwarmClaw EDITOR → get scores → update signals table

### Nodes

**2.1 Webhook Trigger** (receives signal IDs from Flow 1)

**2.2 Supabase — Fetch new signals**
```
SELECT * FROM signals WHERE status = 'new' AND id = ANY({{signal_ids}})
```

**2.3 Batch processor** — process up to 20 signals per SwarmClaw call

**2.4 HTTP Request → SwarmClaw EDITOR agent**
```
POST http://localhost:3456/api/agents/editor/score
Body:
{
  "signals": [
    {
      "id": "uuid",
      "source": "hackernews",
      "title": "...",
      "summary": "...",
      "published_at": "..."
    }
  ],
  "scoring_instructions": "Score each signal for AI-native operators (builders, founders, technical PMs). Relevance = directly useful to someone building AI products. Actionability = can act on this TODAY. Freshness = decay from published_at. Return JSON array with: id, relevance_score, actionability_score, freshness_score, composite_score, category, scoring_notes."
}
```

**2.5 Parse response + calculate routing**
```javascript
// n8n Code node
const signals = $input.all();
return signals.map(s => ({
  ...s,
  status: s.composite_score > 7.5 ? 'queued_daily' :
          s.composite_score > 6.0 ? 'queued_short' :
          s.composite_score > 4.0 ? 'queued_weekly' : 'archived'
}));
```

**2.6 Supabase — Batch update signals**
```
UPDATE signals SET
  relevance_score = {{relevance_score}},
  actionability_score = {{actionability_score}},
  freshness_score = {{freshness_score}},
  composite_score = {{composite_score}},
  category = {{category}},
  scoring_notes = {{scoring_notes}},
  status = {{status}},
  scored_at = now()
WHERE id = {{id}}
```

---

## FLOW 3: DAILY DISPATCH GENERATOR
**Trigger:** Schedule — Mon–Fri, 5:00am ET
**Purpose:** Pull top 5 signals → generate dispatch → quality gate → auto-publish or HITL

### Nodes

**3.1 Schedule Trigger** (Mon–Fri 5:00am ET)

**3.2 Supabase — Fetch top 5 signals**
```sql
SELECT * FROM signals
WHERE status = 'queued_daily'
  AND ingested_at > now() - interval '48 hours'
ORDER BY composite_score DESC
LIMIT 5
```

**3.3 Fallback check**
```javascript
// If fewer than 3 results, pull from queued_weekly
if ($input.length < 3) {
  // trigger fallback: fetch from queued_weekly, top composite_score
}
```

**3.4 Get current affiliate in rotation**
```javascript
// n8n Code node — 6-week cycle
const affiliates = ['n8n', 'beehiiv', 'supabase', 'vercel', 'groq', 'resend'];
const weekOfYear = Math.floor((Date.now() - new Date(2026,0,1)) / (7*24*60*60*1000));
const currentAffiliate = affiliates[weekOfYear % 6];
```

**3.5 HTTP Request → SwarmClaw WRITER agent**
```
POST http://localhost:3456/api/agents/writer/generate
Body:
{
  "type": "daily-dispatch",
  "signals": [/* top 5 signals */],
  "affiliate_tool": "{{currentAffiliate}}",
  "voice_instructions": "The Lantern voice: direct, operator-to-operator, no fluff. Each signal: 1-line headline → 2-3 sentence insight → operator implication. No adjectives like 'exciting' or 'revolutionary'. Be specific and technical.",
  "format": "markdown"
}
```

**3.6 HTTP Request → SwarmClaw DESIGNER agent (image generation)**
```
POST http://localhost:3456/api/agents/designer/generate-image
Body:
{
  "brief": "{{title}} — editorial photography, precise composition, dark moody atmosphere, no text, no people",
  "provider": "openrouter/dall-e-3",
  "size": "1200x630"
}
```

**3.7 SightEngine quality gate**
```
HTTP Request → POST https://api.sightengine.com/1.0/check.json
  api_user: {{SIGHTENGINE_API_USER}}
  api_secret: {{SIGHTENGINE_API_SECRET}}
  url: {{generated_image_url}}
  models: quality,nudity,offensive
→ IF quality.score < 0.75 OR nudity.raw > 0.1 OR offensive > 0.1
  → Use fallback card (set hero_image_url = null, frontend renders branded card)
→ IF passes → use generated image
```

**3.8 Confidence gate**
```javascript
const confidence = $('SwarmClaw WRITER').json.confidence_score;
const hasFlags = $('SwarmClaw WRITER').json.flags?.length > 0;

if (confidence > 0.85 && !hasFlags) {
  return { action: 'auto_publish' };
} else {
  return { action: 'needs_review' };
}
```

**3.9a Auto-publish branch**

Supabase — Insert post:
```
Table: posts
type: 'daily-dispatch'
title: {{title}}
slug: {{slug}}  // generated from title + date
issue_number: nextval('daily_dispatch_seq')
content_markdown: {{content}}
summary: {{summary}}
hero_image_url: {{image_url}}
affiliate_tool: {{currentAffiliate}}
status: 'approved'
scheduled_for: today 7:00am ET
signal_ids: {{signal_ids}}
content_confidence_score: {{confidence}}
```

Then: HTTP Request → Beehiiv API publish (see Flow 5)

**3.9b HITL branch**

Supabase — Insert post with `status = 'needs_review'`
→ (Supabase webhook fires automatically → Zapier → Robby → Ro iMessage)

---

## FLOW 4: WEB SHORTS GENERATOR
**Trigger:** Schedule — every 3 hours
**Purpose:** Pull top signals from queued_short → generate 3 insight cards → publish to Supabase web only

### Nodes

**4.1 Schedule Trigger** (every 3 hours)

**4.2 Supabase — Fetch top 3 signals**
```sql
SELECT * FROM signals
WHERE status = 'queued_short'
  AND ingested_at > now() - interval '24 hours'
ORDER BY composite_score DESC
LIMIT 3
```

**4.3 HTTP Request → SwarmClaw WRITER agent**
```
POST http://localhost:3456/api/agents/writer/generate-short
Body:
{
  "type": "short",
  "signals": [/* 3 signals */],
  "format": {
    "headline": "max 100 chars, operator-relevant hook",
    "insight": "max 320 chars, 1 actionable takeaway",
    "source_name": "source publication name",
    "category": "ai-systems|product-strategy|operator-stack|field-notes"
  }
}
```

**4.4 Supabase — Insert 3 shorts**
```
Table: shorts
headline, insight, source_name, source_url, category, signal_id
published_at: now()
```

**4.5 Update signal status**
```
UPDATE signals SET status = 'published' WHERE id IN ({{signal_ids}})
```

---

## FLOW 5: BEEHIIV PUBLISHER
**Trigger:** Webhook (called by Flow 3 on auto-publish) OR Supabase webhook on posts.status = 'approved'
**Purpose:** Push approved post to Beehiiv API → update post record with beehiiv_post_id

### Nodes

**5.1 Webhook Trigger**

**5.2 Supabase — Fetch approved post**
```sql
SELECT * FROM posts WHERE id = {{post_id}} AND status = 'approved'
```

**5.3 Build Beehiiv payload**
```javascript
{
  "publication_id": process.env.BEEHIIV_PUBLICATION_ID,
  "subject": post.title,
  "preview_text": post.summary,
  "body": post.content_markdown,  // Beehiiv accepts markdown
  "status": "confirmed",
  "send_at": post.scheduled_for,
  "audience": post.is_premium ? "premium" : "free",
  "meta_title": post.title,
  "thumbnail_url": post.hero_image_url
}
```

**5.4 HTTP Request → Beehiiv API**
```
POST https://api.beehiiv.com/v2/publications/{{BEEHIIV_PUBLICATION_ID}}/posts
Authorization: Bearer {{BEEHIIV_API_KEY}}
Body: {{beehiiv_payload}}
```

**5.5 Success branch**
```
Supabase → UPDATE posts SET
  beehiiv_post_id = {{response.data.id}},
  status = 'published',
  published_at = now()
WHERE id = {{post_id}}
```

**5.6 Failure branch** (Beehiiv 4xx/5xx)
```
→ Retry 3x at 5-minute intervals
→ If all fail: Supabase error_log INSERT + HITL notification
```

---

## FLOW 6: WEEKLY BRIEF ASSEMBLER
**Trigger:** Schedule — Friday 2:00pm ET
**Purpose:** Aggregate week's best signals → generate full weekly brief → always route to HITL

### Nodes

**6.1 Schedule Trigger** (Friday 2:00pm ET)

**6.2 Supabase — Fetch week's top signals**
```sql
SELECT * FROM signals
WHERE status IN ('queued_weekly', 'queued_daily')
  AND ingested_at > now() - interval '7 days'
ORDER BY composite_score DESC
LIMIT 20
```

**6.3 HTTP Request → SwarmClaw WRITER agent**
```
POST http://localhost:3456/api/agents/writer/generate-weekly
Body:
{
  "type": "weekly-brief",
  "signals": [/* top 20 */],
  "affiliate_tool": "{{currentAffiliate}}",
  "sections": [
    "This Week in AI Systems",
    "Product Strategy",
    "Operator Stack",
    "Field Notes from the Build",
    "This Week's Stack Card"
  ],
  "word_count_target": 1200,
  "voice": "intelligent operator briefing, not a newsletter digest"
}
```

**6.4 Generate hero image** (same as Flow 3, step 3.6–3.7)

**6.5 ALWAYS route to HITL** (weekly brief is never auto-published)
```
Supabase → INSERT posts (status = 'needs_review', type = 'weekly-brief')
→ Supabase webhook fires → Zapier → Robby → Ro iMessage:
  "📋 Weekly brief ready: {title} — {preview_url} — Approve by Sunday 4pm"
```

**Note:** Ro has until Sunday 4pm ET to approve. If no action by 5pm, Flow 5 auto-publishes with a generic fallback notice.

---

## ENVIRONMENT VARIABLES REQUIRED IN n8n

```
BEEHIIV_API_KEY
BEEHIIV_PUBLICATION_ID
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
BROWSERBASE_API_KEY
SIGHTENGINE_API_USER
SIGHTENGINE_API_SECRET
SWARMCLAW_BASE_URL          # http://localhost:3456
OPENROUTER_API_KEY          # for DALL-E 3 image generation
ZAPIER_WEBHOOK_HITL         # Zapier catch hook for HITL notifications
ZAPIER_WEBHOOK_DISTRIBUTION # Zapier catch hook for social distribution
```

---

## BUILD ORDER

1. Flow 1 (Ingestor) — requires Supabase signals table
2. Flow 2 (Scorer) — requires SwarmClaw EDITOR agent endpoint
3. Flow 4 (Shorts Generator) — simpler than Flow 3, test generation first
4. Flow 5 (Beehiiv Publisher) — test with manual trigger before wiring auto
5. Flow 3 (Daily Dispatch) — wire after Flow 5 is confirmed working
6. Flow 6 (Weekly Brief) — final flow, depends on all others

---

## TESTING PROTOCOL

Before going live:
1. Run Flow 1 manually → verify signals appear in Supabase
2. Run Flow 2 manually on 5 signals → verify scores look correct
3. Run Flow 4 → verify 3 shorts appear in Supabase + on web at /shorts
4. Run Flow 5 with a test post → verify it appears in Beehiiv draft
5. Run Flow 3 with `send_at = now() + 30 min` → verify full dispatch flow
6. Run Flow 6 → verify HITL fires and Ro receives notification
