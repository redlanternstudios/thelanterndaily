# SwarmClaw Dispatch — The Lantern Daily Make.com Content Pipelines
Version: 2.0 | Platform: Make.com | Updated: 2026-06-16
Replaces: SWARMCLAW_DISPATCH_LANTERN_CONTENT_PIPELINES_V1.md (DEPRECATED — was incorrectly written for n8n)

---

## CONTEXT

The Lantern Daily uses Make.com exclusively for automation. NOT n8n.

Existing blueprints (already imported in Make.com):
- 01 — Welcome sequence (Beehiiv + Supabase new subscriber)
- 02 — Daily approval digest (admin email at 8am)
- 03 — Content radar (Salaam Gateway RSS → Groq → `/api/admin/content-radar`)
- 04 — Beehiiv sync (approved items → Beehiiv draft)

New scenarios to build (this dispatch):
- 05 — Multi-feed article ingestion (additional RSS sources)
- 06 — Market signal (Yahoo Finance + Musaffa + Groq → `/api/admin/market-signal`)
- 07 — Video pipeline (YouTube Data API + Groq → `/api/admin/video-signal`)

---

## SERVER-SIDE ARCHITECTURE (MANDATORY UNDERSTANDING)

Make.com NEVER touches Supabase directly.
Make.com NEVER holds the service role key.

Flow is always:
```
Make.com → POST /api/admin/{endpoint} (x-admin-secret header)
                        ↓
           Next.js route handler (server-side)
                        ↓
           Supabase service role client
                        ↓
           lantern_content_queue table
```

The three admin API routes now exist:
- `POST /api/admin/content-radar` — handles article batches from Groq
- `POST /api/admin/market-signal` — handles single stock market signal
- `POST /api/admin/video-signal` — handles single YouTube video

All routes:
- Check `x-admin-secret` header against `ADMIN_WEBHOOK_SECRET` env var
- Handle deduplication
- Enforce schema constraints (relevance_score 1-10, halal_verdict enum, etc.)
- Return `{ok, inserted, skipped, errors?}`

---

## ENV VARS REQUIRED

Add to Vercel (production) and `.env.local` (local):
```
ADMIN_WEBHOOK_SECRET=<generate a secure 32-char random string>
```

Add to Make.com as Connection/Environment variables:
```
ADMIN_WEBHOOK_SECRET — same value as above
GROQ_API_KEY — your Groq API key
YOUTUBE_DATA_API_KEY — from Google Cloud Console (free tier = 10k units/day)
MUSAFFA_API_KEY — from musaffa.com/developers (optional, screen manually if not available)
```

---

## SCENARIO 03 UPDATE (ALREADY DONE — VERIFY IN MAKE.COM)

Blueprint `03_content_radar.json` has been updated with:
- Enhanced Groq prompt: now returns `halal_verdict`, `halal_score`, `halal_flags` per article
- Auth header fixed: `X-Admin-Key` → `x-admin-secret`

**Action required in Make.com:**
1. Open scenario 03 in Make.com
2. Click the HTTP module (module 3 — the one that POSTs to content-radar)
3. Update header name from `X-Admin-Key` to `x-admin-secret`
4. Update header value to your `ADMIN_WEBHOOK_SECRET` variable
5. Open the Groq HTTP module (module 2)
6. Replace the prompt body with the new prompt from `03_content_radar.json`
7. Save + Run Once to verify

---

## SCENARIO 05 — MULTI-FEED ARTICLE INGESTION

**Purpose:** Run additional RSS feeds through the same Groq screening → content-radar pipeline.

**Trigger:** Schedule — every 6 hours (offset 3h from scenario 03 to avoid Groq rate limit overlap)
Cron: `0 3,9,15,21 * * *`

**RSS feeds to add:**
- `https://islamicfinancenews.com/feed/` — Islamic finance
- `https://muslimmatters.org/feed/` — Muslim community
- `https://themuslimvibe.com/feed/` — Muslim lifestyle/tech
- `https://5pillars.net/feed/` — UK Muslim news
- `https://ilmfeed.com/feed/` — Islamic content

**Module chain (one chain per feed, or use Iterator):**

Option A — Iterator (recommended): 
1. Module 1: Set variable — feeds array `["https://islamicfinancenews.com/feed/", ...]`
2. Module 2: Iterator (built-in Make.com module)
3. Module 3: HTTP GET — fetch `{{item}}` (feed URL)
4. Module 4: HTTP POST → Groq (same prompt as scenario 03)
5. Module 5: HTTP POST → `https://thelanterndaily.com/api/admin/content-radar`
   - Header: `x-admin-secret: {{ADMIN_WEBHOOK_SECRET}}`
   - Body: `{"articles_json": "{{4.data.choices[0].message.content}}", "source": "{{item}}"}`

**Blueprint file:** `make-blueprints/05_multi_feed.json`

**Failure handling:**
- Make.com: set "Ignore errors" on per-feed HTTP GET (some feeds may be down)
- Route response: check `ok: false` and log to Make.com execution history
- Don't retry failed feeds immediately — next 6h run will catch them

---

## SCENARIO 06 — MARKET SIGNAL

**Purpose:** Pull weekly price + compliance data for halal-screened tech stocks, generate editorial, queue for operator review.

**Trigger:** Schedule — Fridays at 7:00 AM EST (before Jumu'ah)
Cron: `0 12 * * 5` (UTC = 7am EST)

**Tickers to monitor:**
```
AMZN, GOOGL, AAPL, MSFT, META, NVDA, ADBE, CRM, NOW
```
(These are commonly tracked by Musaffa as halal-compliant or doubtful — verify screening before each issue)

**Module chain (one chain per ticker, or use Iterator):**

Module 1: Set variable — tickers array
Module 2: Iterator — loops over each ticker
Module 3: HTTP GET — Yahoo Finance
```
URL: https://query1.finance.yahoo.com/v8/finance/chart/{{item}}?range=5d&interval=1d
Headers: none required (unofficial public API)
Parse response: true
```
Module 4: HTTP POST → Groq (editorial generation)
```
URL: https://api.groq.com/openai/v1/chat/completions
Model: llama-4-maverick (better writing quality for editorial)
Prompt:
"You are the market writer for The Lantern Daily, a Muslim tech newsletter covering halal investing.

Write a 3-4 sentence market update for {{item}} ({{3.data.chart.result[0].meta.longName}}).

Current price: ${{3.data.chart.result[0].meta.regularMarketPrice}}
Week change: {{calculate from close prices}}%
Sector: {{3.data.chart.result[0].meta.instrumentType}}

RULES:
- Never say 'buy', 'sell', or give price targets
- Always include: 'This is not investment advice. Verify halal compliance via Musaffa before investing.'
- Frame as educational context for Muslim investors tracking halal tech
- Write in a calm, informative tone — no hype

Return JSON only: {\"editorial\": \"...\", \"halal_verdict\": \"pass|review|fail\", \"halal_score\": 0-100, \"halal_flags\": []}"

Max tokens: 400
Temperature: 0.3
```
Module 5: HTTP POST → `/api/admin/market-signal`
```
URL: https://thelanterndaily.com/api/admin/market-signal
Headers: x-admin-secret: {{ADMIN_WEBHOOK_SECRET}}
Body:
{
  "ticker": "{{item}}",
  "company_name": "{{3.data.chart.result[0].meta.longName}}",
  "market_data": {
    "current_price": "{{3.data.chart.result[0].meta.regularMarketPrice}}",
    "change_pct": "{{calculate}}"
  },
  "editorial": "{{fromstr(4.data.choices[0].message.content).editorial}}",
  "halal_verdict": "{{fromstr(4.data.choices[0].message.content).halal_verdict}}",
  "halal_score": "{{fromstr(4.data.choices[0].message.content).halal_score}}",
  "musaffa_status": "COMPLIANT"
}
```

**Failure handling:**
- Yahoo Finance 429 — exponential backoff, max 3 retries per ticker
- Groq failure — skip editorial, insert with `editorial_commentary: null` (operator fills in)
- Dedup: route handles one signal per ticker per day — safe to re-run

**Blueprint file:** `make-blueprints/06_market_signal.json`

---

## SCENARIO 07 — VIDEO PIPELINE

**Purpose:** Monitor curated YouTube channels for new videos, screen for halal compliance, queue for operator review.

**Trigger:** Schedule — every 12 hours
Cron: `0 6,18 * * *`

**Channels to monitor (from `lantern_video_channels` table):**

| Channel | YouTube Channel ID |
|---|---|
| Islamic Finance Guru | UCXXXXXXXXXXXX (get from channel URL) |
| ProductivMuslim | UCXXXXXXXXXXXX |
| 1 Million Arab Coders | UCXXXXXXXXXXXX |
| Yaqeen Institute | UCXXXXXXXXXXXX |
| AIMS Education | UCXXXXXXXXXXXX |

**Module chain:**

Module 1: Set variable — channel IDs array
Module 2: Iterator
Module 3: HTTP GET — YouTube Data API v3
```
URL: https://www.googleapis.com/youtube/v3/search
Params:
  key: {{YOUTUBE_DATA_API_KEY}}
  channelId: {{item}}
  part: snippet
  order: date
  maxResults: 3
  publishedAfter: {{addDays(now, -1)}} (ISO 8601 format)
Type: get
Parse response: true
```
Module 4: Iterator (nested — loop over video results)
```
Array: {{3.data.items}}
```
Module 5: HTTP POST → Groq (halal screen + editorial)
```
URL: https://api.groq.com/openai/v1/chat/completions
Model: llama-4-scout-17b-16e-instruct
Prompt:
"You are a halal content screener for The Lantern Daily, a Muslim tech newsletter.

Screen this YouTube video for The Lantern's Muslim tech audience:

Title: {{4.item.snippet.title}}
Channel: {{4.item.snippet.channelTitle}}
Description: {{left(4.item.snippet.description, 300)}}

Return JSON only:
{
  \"pass\": true/false,
  \"halal_verdict\": \"pass|review|fail\",
  \"halal_score\": 0-100,
  \"halal_flags\": [],
  \"editorial\": \"2-3 sentence editorial note for Muslim founders\"
}

Mark fail if: contains music, mixed gender dating content, riba promotion, gambling.
Mark review if: unclear content, needs human judgment.
Mark pass if: educational tech content appropriate for Muslim audience."

Max tokens: 300
Temperature: 0.1
```
Module 6: Filter — only continue if `{{5.data.choices[0].message.content.pass}} = true`
Module 7: HTTP POST → `/api/admin/video-signal`
```
URL: https://thelanterndaily.com/api/admin/video-signal
Headers: x-admin-secret: {{ADMIN_WEBHOOK_SECRET}}
Body:
{
  "video_id": "{{4.item.id.videoId}}",
  "title": "{{4.item.snippet.title}}",
  "channel_name": "{{4.item.snippet.channelTitle}}",
  "description": "{{left(4.item.snippet.description, 300)}}",
  "editorial": "{{fromstr(5.data.choices[0].message.content).editorial}}",
  "halal_verdict": "{{fromstr(5.data.choices[0].message.content).halal_verdict}}",
  "halal_score": "{{fromstr(5.data.choices[0].message.content).halal_score}}",
  "halal_flags": "{{fromstr(5.data.choices[0].message.content).halal_flags}}"
}
```

**Failure handling:**
- YouTube 403 (quota exceeded) — alert via Make.com notification to admin email. Daily quota = 10k units. Each search costs 100 units. 5 channels × 2 runs = 1000 units/day. Well within free tier.
- Video already queued — route returns `{ok: true, skipped: 1}` — no error, safe to continue
- Groq parse failure — skip video, continue iterator

**Blueprint file:** `make-blueprints/07_video_pipeline.json`

---

## SWARMCLAW BUILD INSTRUCTIONS

### What SwarmClaw must do:

1. **Open Make.com in browser** → navigate to The Lantern Daily organization
2. **Update Scenario 03:**
   - Module 3 (HTTP to content-radar): change header `X-Admin-Key` → `x-admin-secret`
   - Module 2 (Groq): replace prompt with updated version from `03_content_radar.json`
3. **Create Scenario 05** (multi-feed):
   - Import from `make-blueprints/05_multi_feed.json` if available, OR build manually
   - Set schedule: every 6h at :00, offset from scenario 03
   - Set `ADMIN_WEBHOOK_SECRET` and `GROQ_API_KEY` as Make.com variables
4. **Create Scenario 06** (market signal):
   - Import from `make-blueprints/06_market_signal.json`
   - Set schedule: Fridays 12:00 UTC
   - Add `YOUTUBE_DATA_API_KEY` is NOT needed for this scenario
5. **Create Scenario 07** (video pipeline):
   - Import from `make-blueprints/07_video_pipeline.json`
   - Set schedule: every 12h
   - Requires `YOUTUBE_DATA_API_KEY` — get from Google Cloud Console (free)
6. **Verify all 3 new scenarios** with Run Once before activating
7. **Check execution logs** for each scenario — confirm `{ok: true, inserted: N}` from API

### What NOT to automate (Ro does manually):
- Setting `ADMIN_WEBHOOK_SECRET` in Vercel (production secrets, requires Vercel dashboard login)
- Getting YouTube Data API key (requires Google Cloud Console login)
- Activating scenarios after verification

---

## CURRENT STATE CHECKLIST

| Item | Status |
|---|---|
| `03_content_radar.json` updated | ✅ Done |
| `/api/admin/content-radar` route | ✅ Built |
| `/api/admin/market-signal` route | ✅ Built |
| `/api/admin/video-signal` route | ✅ Built |
| Scenario 03 updated in Make.com UI | ⏳ SwarmClaw pending |
| Scenario 05 built in Make.com | ⏳ SwarmClaw pending |
| Scenario 06 built in Make.com | ⏳ SwarmClaw pending |
| Scenario 07 built in Make.com | ⏳ SwarmClaw pending |
| `ADMIN_WEBHOOK_SECRET` in Vercel | ⏳ Ro pending |
| `ADMIN_WEBHOOK_SECRET` in Make.com | ⏳ Ro/SwarmClaw pending |
| YouTube Data API key obtained | ⏳ Ro pending |
| Supabase Realtime enabled on `lantern_content_queue` | ⏳ Verify |
| All new API routes committed + pushed | ⏳ Pending this session |
