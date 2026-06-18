# THE LANTERN — AUTOMATION OS
Version: 1.0 | Designed by Claude (RedLantern Studios Senior Architect)
Last updated: 2026-06-13

> Set-it-and-forget-it media OS for a million-dollar AI-native publication.
> HITL fires only on: low confidence, legal/political flags, subscriber replies, contact form messages.
> Everything else runs without Ro.

---

## PIPELINE OVERVIEW

```
SOURCES (Tier 1-3)
    ↓ every 2h via Browserbase + RSS + Zapier
INGEST LAYER (n8n: normalize + deduplicate)
    ↓ write to supabase.signals
SCORE LAYER (SwarmClaw EDITOR agent)
    ↓ composite_score → route to queue or archive
GENERATE LAYER (SwarmClaw WRITER + DESIGNER)
    ↓ content + hero image → supabase.posts (draft)
REVIEW GATE (automated confidence check)
    ↓ auto-publish OR HITL → Ro notification
PUBLISH LAYER (n8n → Beehiiv API + Supabase)
    ↓ post live on web + email
DISTRIBUTE LAYER (Zapier → Twitter/X + LinkedIn)
```

---

## SECTION 1. SOURCE INTELLIGENCE STRATEGY

### WHY THESE SOURCES (designer rationale)

A million-dollar AI publication needs:
1. **First-mover signals** — operators win by knowing before everyone else
2. **Actionability bias** — not interesting, builder-relevant
3. **Diversified signal types** — tool releases, research, community, business intelligence
4. **Low noise floor** — every source must justify its ingestion cost

### TIER 1 — REAL-TIME (check every 2 hours via Browserbase)

| Source | URL | Signal Type | Filter |
|--------|-----|-------------|--------|
| Hacker News | news.ycombinator.com | Developer zeitgeist | Show HN + Ask HN + top 30; min 50 points |
| GitHub Trending | github.com/trending | Build signal | Python + TypeScript, daily; min 100 stars/day |
| Product Hunt | producthunt.com | New tool launches | AI + Developer Tools category; min 200 upvotes |
| ArXiv | arxiv.org/list/cs.AI | Research→production signal | Top 20 abstracts/day; cs.AI + cs.LG |
| Anthropic Changelog | docs.anthropic.com/changelog | Stack updates | All releases |
| OpenAI Changelog | platform.openai.com/docs/changelog | Stack updates | All releases |
| Groq Blog | groq.com/blog | Stack updates | All releases |
| Vercel Changelog | vercel.com/changelog | Stack updates | All releases |
| Supabase Blog | supabase.com/blog | Stack updates | All releases |

### TIER 2 — NEWSLETTER RSS (check daily, 6am ET via n8n RSS nodes)

| Source | RSS URL | Signal Type |
|--------|---------|-------------|
| TLDR AI | tldr.tech/ai/rss | Daily high-volume digest |
| Ben's Bites | bensbites.beehiiv.com/feed | Product-focused operator news |
| Latent Space | latent.space/feed | Deep technical (research → production) |
| The Rundown AI | therundown.ai/rss | Consumer + early trend signal |
| Lenny's Newsletter | lennysnewsletter.com/feed | Product + growth (operator business layer) |
| Every.to | every.to/feed | Founder + operator lens |

### TIER 3 — SOCIAL SIGNAL (Browserbase + Zapier)

**Twitter/X Monitored List** (build a private list, Zapier New Tweet in List trigger):
```
@karpathy      — model architecture signal
@sama          — OpenAI direction signal
@swyx          — AI engineering practitioner
@simonw        — building-in-public, tool discovery
@levelsio      — indie operator, product signal
@emollick      — research → practice translation
@goodside      — prompt engineering, model behavior
@tobi          — enterprise AI adoption signal (Shopify)
@gdb           — OpenAI technical signal
@jxnlco        — AI product/engineering
```

**Reddit** (Browserbase scrape, top posts >50 upvotes):
- r/LocalLLaMA — real practitioners, unfiltered
- r/MachineLearning — research signal
- r/SideProject — builder community, product launches

**Skip**: LinkedIn (low signal-to-noise for this audience)

---

## SECTION 2. PUBLISHING CADENCE (ROI-OPTIMIZED)

### ROI MODEL

```
Subscribers × Open Rate × CTR × EPC = Revenue
```

At 10k subscribers:
- Daily dispatch affiliate (2% CTR × $2 EPC × 5 days) = $2,000/week = $104k/year
- Weekly brief premium upsell (5% conversion × $15/mo) = $7,500/month
- Monthly spotlight sponsorship (at scale) = $2,000-5,000/month
- **Total run rate at 10k: ~$25k/month**

Growth path: list growth is the multiplier. Every format choice optimizes for list growth first.

### CADENCE SCHEDULE

#### DAILY DISPATCH (Mon–Fri, 7:00am ET)
- **5 signal items**, 2–3 sentences each
- **1 inline Stack Card** (rotating affiliate on 6-week cycle: n8n → Beehiiv → Supabase → Vercel → Groq → Resend)
- **Fully automated** at confidence > 0.85
- Target open rate: 38–45% (operators form morning habits)
- Format: scannable bullets, no narrative fluff

#### WEEKLY INTELLIGENCE BRIEF (Sunday 6:00pm ET → lands Monday morning)
- **Full issue**, 7–12 min read
- **1 featured tool** with deep "why operators use it" section
- **Ro reviews Friday afternoon** — 15 min light edit, not writing
- This is the shareable, list-growth product
- Premium subscribers get: extra section (Field Notes from the RLS build)

#### WEB SHORTS (3x daily, auto-generated, web-only — no email)
- Insight cards: headline + 1-sentence insight + source + category tag
- Generates from Tier 1 signals with composite_score > 6.0
- Drives SEO, social shares, and web discovery
- Does NOT email subscribers — reduces inbox fatigue

#### MONTHLY STACK SPOTLIGHT (manual — Ro writes/edits)
- Deep affiliate review of 1 featured tool
- Published as a special issue (web + email)
- Sponsorship potential at scale: $1,000–5,000/issue
- Ro owns: writing/editing and publishing approval

### AFFILIATE ROTATION SCHEDULE

| Week | Featured Tool | CTA | Affiliate Program |
|------|--------------|-----|-------------------|
| 1 | n8n | Own your orchestration | n8n partner program |
| 2 | Beehiiv | Build your publication | Beehiiv affiliate ($30/referral) |
| 3 | Supabase | Own your data | Supabase partner |
| 4 | Vercel | Deploy at the edge | Vercel partner |
| 5 | Groq | Run fast inference | Groq referral |
| 6 | Resend | Wire your email | Resend affiliate |
→ repeat

---

## SECTION 3. FULL PIPELINE SPECIFICATION

### 3.1 INGEST LAYER

**Tool:** n8n (Schedule Trigger, every 2 hours)
**Inputs:** Browserbase scrape results + RSS feed items + Zapier webhook payloads
**Process:**
1. Fetch Tier 1 sources via Browserbase HTTP node
2. Fetch Tier 2 RSS via n8n RSS Feed Read nodes
3. Receive Tier 3 social via Zapier webhook POST to n8n
4. Normalize all to canonical signal schema:
   ```json
   {
     "source": "hackernews|github|producthunt|arxiv|rss|twitter",
     "raw_title": "...",
     "raw_url": "...",
     "raw_summary": "...",
     "source_score": 0,
     "published_at": "ISO8601",
     "category": "ai-systems|product-strategy|operator-stack|field-notes"
   }
   ```
5. Deduplicate: check against signals table, URL hash match, last 7 days window
6. Write new signals to `supabase.signals` with `status = 'new'`

### 3.2 SCORE LAYER

**Tool:** SwarmClaw EDITOR agent (triggered by n8n webhook on new signals)
**Model:** Groq llama-4-maverick (fast, high volume)
**Scoring formula:**
```
composite = (relevance × 0.50) + (actionability × 0.35) + (freshness × 0.15)
```

**Scoring criteria:**
- `relevance` (0–10): Is this directly useful to AI-native operators building products?
- `actionability` (0–10): Can an operator DO something with this today?
- `freshness` (0–10): Decay function — full score if < 4h old, 50% at 24h, 0% at 72h

**Routing:**
- composite > 7.5 → `status = 'queued_daily'` (Daily Dispatch candidate)
- composite 6.0–7.5 → `status = 'queued_short'` (Web Short candidate)
- composite 4.0–6.0 → `status = 'queued_weekly'` (Weekly Brief consideration)
- composite < 4.0 → `status = 'archived'`

### 3.3 GENERATE LAYER

**Triggers:**
- Daily Dispatch: n8n Schedule 5:00am ET (Mon–Fri), pulls top 5 from `queued_daily`
- Web Shorts: n8n Schedule every 3 hours, pulls top 3 from `queued_short`
- Weekly Brief: n8n Schedule Friday 2:00pm ET, pulls top 15 from `queued_weekly` + `queued_daily`

**SwarmClaw WRITER agent instructions (added to SWARMCLAW_BUILD_BRIEF.md):**
- Voice: The Lantern — direct, operator-to-operator, no fluff
- Format: headline → signal → operator implication → "why this matters now"
- No: "exciting", "revolutionary", "game-changing"
- Yes: specific, technical, actionable

**SwarmClaw DESIGNER agent:**
- Generates hero image via DALL-E 3 (via OpenRouter) for Daily Dispatch + Weekly Brief
- Shorts use auto-generated card template (no DALL-E — CSS-generated cards)
- Image brief template: `{topic} — editorial photography, dark atmosphere, precise composition, no text`
- Output: URL written to `posts.hero_image_url`

**SightEngine quality gate** (after image generation):
- POST to SightEngine API with image URL
- Quality score < 0.75 → reject image, use fallback (RLS branded card)
- Nudity/violence/offensive → reject + HITL alert

### 3.4 REVIEW GATE

**Auto-publish conditions (ALL must pass):**
- `content_confidence_score > 0.85`
- `image_quality_score > 0.75` OR fallback card used
- `no_flags = true` (no political, legal, or personal content detected)
- `duplicate_check = clear` (no similar post in last 14 days)

**HITL triggers (Ro gets notified via iMessage via Robby-Telegram):**
- `content_confidence_score` between 0.60–0.85 → "Review needed: [title]"
- Political/legal topic flag → "Flag: [title] — needs review before publish"
- Weekly Brief always → "Weekly brief ready for your review: [preview URL]"
- SightEngine offensive flag → "Image rejected: [reason] — fallback applied"

**Auto-reject (no notification unless > 3/day):**
- `composite_score < 4.0`
- `duplicate_check = match`
- `content_confidence_score < 0.60`

### 3.5 PUBLISH LAYER

**Tool:** n8n (triggered on `posts.status = 'approved'` via Supabase webhook)

**Daily Dispatch + Weekly Brief:**
1. Build Beehiiv post payload from `posts` table
2. POST to `https://api.beehiiv.com/v2/publications/{pub_id}/posts`
3. Set `status: 'confirmed'`, `send_at: scheduled_time`, `audience: 'free'`
4. On success: update `posts.beehiiv_post_id` + `posts.status = 'published'`
5. On failure: retry 3x, then HITL

**Web Shorts:**
1. Write directly to `supabase.shorts` (no Beehiiv)
2. Next.js fetches from Supabase on page load — auto-appears on web

**OG Image generation:**
- n8n HTTP node → generate OG image via Vercel OG API or Cloudinary
- Written to `posts.og_image_url`

### 3.6 DISTRIBUTE LAYER

**Tool:** Zapier (triggered by Supabase webhook on posts.status = 'published')

**Zap 1 — Twitter/X:**
- Trigger: Supabase row updated (posts, status = 'published', type = 'daily-dispatch' OR 'weekly-brief')
- Action: Twitter → Create Tweet
- Format: `{title} — {summary_80_chars}\n\n→ {web_url}\n\n#AIoperators #buildinpublic`

**Zap 2 — LinkedIn:**
- Same trigger
- Format: longer copy, operator-audience voice, link in first comment

**Zap 3 — Subscriber sync:**
- Trigger: Beehiiv webhook (new subscription)
- Action: Supabase → Insert row in subscribers table
- Map: email, tier, subscribed_at, beehiiv_id

**Zap 4 — HITL notification:**
- Trigger: Supabase row updated (posts.status = 'needs_review')
- Action: n8n webhook → Robby-Telegram → Ro iMessage: "🔴 Review needed: {title}"

**Zap 5 — Contact form:**
- Trigger: Supabase row inserted (contact_submissions)
- Action: Robby-Telegram → Ro iMessage: "📩 New contact: {name} — {subject}"

---

## SECTION 4. HITL RULES (WHAT RO ACTUALLY SEES)

Ro sees NOTHING except:

| Trigger | Notification | Action Required |
|---------|-------------|-----------------|
| Content confidence 0.60–0.85 | iMessage: title + preview URL | Approve or reject (1 click) |
| Legal/political flag | iMessage: title + flag reason | Approve or reject |
| Weekly brief ready | iMessage: preview URL | Light edit + approve (Friday PM) |
| Subscriber reply (Beehiiv webhook) | iMessage: reply text | Respond or ignore |
| Contact form submission | iMessage: name + subject | Respond or ignore |
| Image offensive flag | iMessage: fallback applied (FYI only) | No action needed |

**Ro does NOT see:**
- Auto-published daily dispatches
- Auto-published web shorts
- Archived signals (low score)
- Distribution confirmations
- Retry attempts

---

## SECTION 5. FAILURE HANDLING

| Failure | Handling |
|---------|----------|
| Beehiiv API down | Retry 3x at 5-min intervals → HITL if all fail |
| Image generation fails | Use branded fallback card (CSS, no image) |
| SwarmClaw WRITER timeout | Retry once → if fail, pull pre-generated template |
| Supabase write fails | n8n error branch → log to error_log table → HITL |
| Browserbase scrape blocked | Mark source as `temporarily_blocked` → skip for 6h → retry |
| Duplicate slip through | Post-publish dedup check → if match, unpublish + archive |
| Score below threshold day-of | Pull from `queued_weekly` backlog to fill dispatch |
| Twitter/X post fails | Retry once → log → no HITL (non-critical) |

---

## SECTION 6. OBSERVABILITY

**PostHog events to instrument:**
```
lantern_signal_ingested    { source, category, composite_score }
lantern_post_generated     { type, confidence_score }
lantern_post_published     { type, word_count, affiliate_featured }
lantern_affiliate_clicked  { tool, post_id, subscriber_tier }
lantern_subscriber_added   { tier, source_utm }
lantern_hitl_triggered     { reason, post_id }
```

**Sentry monitoring:**
- n8n webhook errors → Sentry alert
- Beehiiv API 4xx/5xx → Sentry alert
- SightEngine API failure → Sentry alert

**Weekly performance check (Ro's only recurring task — 5 min):**
- Beehiiv dashboard: open rate, CTR
- PostHog: affiliate click heatmap
- Sentry: any recurring errors
- Adjust scoring weights if signal quality drops

---

## SECTION 7. SETUP CHECKLIST (one-time)

### Infrastructure
- [ ] Supabase project created for The Lantern (separate from other products)
- [ ] Run `schema.sql` migrations
- [ ] Supabase webhook configured (posts.status changes → n8n endpoint)
- [ ] Supabase webhook configured (contact_submissions → Zapier)

### n8n
- [ ] Browserbase credential added
- [ ] Supabase credential added
- [ ] Beehiiv API key added (from .env.local)
- [ ] OpenRouter API key added (for DALL-E 3 image generation)
- [ ] SightEngine credentials added
- [ ] Build all 6 flows (see N8N_FLOW_SPECS.md)

### Zapier
- [ ] Build 5 zaps (see ZAPIER_TRIGGER_MAP.md)
- [ ] Twitter/X account connected
- [ ] LinkedIn page connected
- [ ] Beehiiv webhook configured

### SwarmClaw
- [ ] WRITER agent updated with The Lantern voice spec
- [ ] EDITOR agent updated with scoring instructions
- [ ] DESIGNER agent updated with image brief template
- [ ] n8n webhook endpoints added to agent configs

### Beehiiv
- [ ] Publication setup complete (name, description, branding)
- [ ] Webhook enabled for: new_subscription, unsubscribe, email_click
- [ ] API key confirmed in .env.local

### PostHog
- [ ] Project created for The Lantern
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` added to .env.local
- [ ] Affiliate link UTM params standardized (`?via=thelantern` for all affiliates)

---

## SECTION 8. OPEN QUESTIONS (unresolved at design time)

| ID | Question | Default if not answered |
|----|----------|------------------------|
| OQ-A | Does Ro want a /review page in Next.js for HITL approvals, or iMessage-only? | iMessage-only for v1 |
| OQ-B | Premium tier pricing — $15/mo or different? | $15/mo default |
| OQ-C | Operator number mechanic (sequential) — mock data for v1 or real DB? | Sequential from DB (auto-increment) |
| OQ-D | Twitter/X account for The Lantern — existing or new? | New @thelanternhq |

---

*This document is the source of truth for The Lantern automation OS.*
*SwarmClaw agents, n8n flows, and Zapier zaps all implement against this spec.*
*Update this document before changing pipeline behavior.*
