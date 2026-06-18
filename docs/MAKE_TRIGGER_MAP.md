# THE LANTERN DAILY — MAKE.COM TRIGGER MAP (FINAL)
Version: 1.0 | Authored: 2026-06-16
Status: LOCKED — this is the source of truth for all Make.com automation
Supersedes: AUTOMATION_OS.md (automation sections), ZAPIER_TRIGGER_MAP.md, SWARMCLAW_DISPATCH_MAKE_AUTOMATION.md

---

## DESIGN PRINCIPLES

- Make.com is the ONLY automation layer. n8n and Zapier are not in this stack.
- Logic lives in Next.js API routes. Make.com is relay + scheduler + trigger handler.
- Groq (HTTP module) handles all AI scoring and content generation inside Make.com.
- Ro's HITL is exactly two daily touchpoints: 5pm ET approval review + publish after morning draft notification.
- Every scenario has a defined failure path.

---

## SCENARIO TAXONOMY

| Prefix | Category | Count |
|--------|----------|-------|
| C | Content pipeline | 4 |
| U | User lifecycle | 2 |
| SP | Spotlight | 2 |
| D | Distribution | 2 |
| UT | Utility | 3 |
| **TOTAL** | | **13** |

---

## CONTENT PIPELINE

---

### C1 — CONTENT RADAR
**Type:** Scheduled
**Schedule:** Every 4 hours (00:00, 04:00, 08:00, 12:00, 16:00, 20:00 UTC)
**Purpose:** Ingest RSS sources, score with Groq, dedup, queue approved signals.

\`\`\`
[Schedule trigger: every 4 hours]
  ↓
[RSS module] — pull in parallel:
  - https://islamicfinanceguru.com/feed
  - https://www.salaamgateway.com/rss
  - https://tldr.tech/ai/rss
  - https://bensbites.beehiiv.com/feed
  - https://techcrunch.com/feed
  - https://www.wired.com/feed/rss
  ↓
[Iterator] — loop each article
  ↓
[Supabase: Search rows]
  Table: lantern_content_queue
  Filter: url = {{article.link}}
  ↓
[Filter] — STOP if match found (dedup gate)
  ↓
[HTTP: POST https://api.groq.com/openai/v1/chat/completions]
  Auth: Bearer {{GROQ_API_KEY}}
  Body:
  {
    "model": "llama-3.3-70b-versatile",
    "messages": [{
      "role": "user",
      "content": "You are an editorial AI for The Lantern Daily — a newsletter for Muslim founders and builders in AI and halal tech. Score this article on two dimensions. Return only JSON.\n\n{\"relevance_score\": 1-10, \"halal_stance\": \"POSITIVE|NEUTRAL|CRITICAL|BLOCKED\", \"ai_summary\": \"one sentence, operator-focused\"}\n\nBLOCKED = haram financial products, inappropriate content, anti-Islamic framing.\nCRITICAL = critical of Islamic finance or halal tech but factually relevant.\n\nTitle: {{article.title}}\nSummary: {{article.summary}}"
    }],
    "response_format": { "type": "json_object" }
  }
  ↓
[JSON Parse] — extract relevance_score, halal_stance, ai_summary
  ↓
[Filter] — STOP if:
  - relevance_score < 7
  - halal_stance = 'BLOCKED'
  ↓
[Supabase: Insert row]
  Table: lantern_content_queue
  title: {{article.title}}
  url: {{article.link}}
  source: {{feed_name}}
  ai_summary: {{parsed.ai_summary}}
  relevance_score: {{parsed.relevance_score}}
  halal_stance: {{parsed.halal_stance}}
  status: 'pending'
  queued_at: {{now}}
\`\`\`

**Failure handling:**
- RSS fetch fails: skip that source, continue iterator
- Groq API error: log to Supabase `lantern_automation_errors`, skip article
- Supabase insert fails: retry once, then log error

---

### C2 — APPROVAL DIGEST
**Type:** Scheduled
**Schedule:** Daily 22:00 UTC (5pm ET / 3pm MST)
**Purpose:** Send Ro the day's top pending stories for approval. Approved stories feed tomorrow's dispatch.

\`\`\`
[Schedule trigger: 22:00 UTC daily]
  ↓
[Supabase: Search rows]
  Table: lantern_content_queue
  Filter: status = 'pending'
  Order: relevance_score DESC
  Limit: 12
  ↓
[Filter] — STOP if 0 results (nothing to review)
  ↓
[Text aggregator] — build digest per story:
  "#{n} [{relevance_score}/10] [{halal_stance}]
   {title}
   {source} — {ai_summary}
   ✅ https://thelanterndaily.com/api/admin/approve/{id}?key={{ADMIN_WEBHOOK_SECRET}}
   ❌ https://thelanterndaily.com/api/admin/reject/{id}?key={{ADMIN_WEBHOOK_SECRET}}"
  ↓
[Telegram Bot: Send message]
  Chat ID: {{RO_TELEGRAM_CHAT_ID}}
  Parse mode: HTML
  Text:
  "📡 <b>Lantern Radar — {{date}}</b>
  {{count}} stories ready for review.

  {{aggregated_digest}}

  These approved stories will be drafted at 2am ET tomorrow."
\`\`\`

**Failure handling:**
- Telegram send fails: HTTP POST to Resend as fallback email to roryleesemeah@gmail.com
- 0 results: skip silently (no notification)

---

### C3 — DAILY DRAFT GENERATOR
**Type:** Scheduled
**Schedule:** 07:00 UTC Mon–Fri only (2am ET / midnight MST)
**Purpose:** Pull approved stories, generate Daily Dispatch draft via Groq, write to drafts table, notify Ro.

\`\`\`
[Schedule trigger: 07:00 UTC, Mon–Fri]
  ↓
[Supabase: Search rows]
  Table: lantern_content_queue
  Filter: status = 'approved'
  Order: relevance_score DESC, approved_at DESC
  Limit: 8
  ↓
[Filter] — if results < 3:
  → Supabase: fetch from queued_weekly backlog (status='approved', older than 24h)
  → supplement up to 5 total
  → if still < 3: Telegram to Ro "⚠️ Not enough approved stories for today's dispatch. Dispatch skipped." → STOP
  ↓
[Slice to top 5]
  ↓
[Iterator] — for each story, call Groq:
  [HTTP: POST Groq]
  Body:
  {
    "model": "llama-3.3-70b-versatile",
    "messages": [{
      "role": "user",
      "content": "Write a signal item for The Lantern Daily in this exact format:\n\n**[HEADLINE — 8 words max, punchy]**\n[2-3 sentence operator insight. Direct. No fluff. Lead with what it means for builders.]\n→ [source] via {source_name}\n\nTitle: {{title}}\nSummary: {{ai_summary}}\nURL: {{url}}"
    }]
  }
  ↓
[Text aggregator] — assemble full dispatch:
  Header: "THE LANTERN DAILY — {weekday}, {date}"
  5 signal items (generated above)
  Affiliate card (rotate via {{affiliate_week_number}} mod 6):
    Week 1: n8n | Week 2: Beehiiv | Week 3: Supabase | Week 4: Vercel | Week 5: Groq | Week 6: Resend
  Footer: "→ thelanterndaily.com"
  ↓
[Supabase: Insert row]
  Table: lantern_drafts
  type: 'daily-dispatch'
  content: {{assembled_dispatch}}
  status: 'ready_to_publish'
  publish_at: {{today}}T12:00:00Z (7am ET)
  story_ids: [{{id1}}, {{id2}}, ...]
  created_at: {{now}}
  ↓
[Supabase: Update rows] — mark used stories
  Table: lantern_content_queue
  Filter: id IN ({{story_ids}})
  Update: status = 'used'
  ↓
[Telegram Bot: Send message]
  Chat ID: {{RO_TELEGRAM_CHAT_ID}}
  Text:
  "📰 <b>Daily Dispatch draft ready</b>
  {{date}} | {{story_count}} signals

  Preview: https://thelanterndaily.com/admin/drafts/{{draft_id}}
  Publish in Beehiiv by 7am ET. Light edit optional."
\`\`\`

**Failure handling:**
- Groq generation fails for a story: use `ai_summary` as fallback signal item text
- Supabase insert fails: retry once → if fail, Telegram alert to Ro with raw text

---

### C4 — WEEKLY BRIEF GENERATOR
**Type:** Scheduled
**Schedule:** Friday 17:00 UTC (12pm ET / 10am MST)
**Purpose:** Pull week's top stories, generate full Weekly Intelligence Brief draft, notify Ro for Friday PM edit.

\`\`\`
[Schedule trigger: Friday 17:00 UTC]
  ↓
[Supabase: Search rows]
  Table: lantern_content_queue
  Filter: status IN ('approved', 'used') AND queued_at >= 7 days ago
  Order: relevance_score DESC
  Limit: 15
  ↓
[Filter] — if results < 5: Telegram "⚠️ Not enough material for Weekly Brief. Generate manually." → STOP
  ↓
[HTTP: POST Groq]
  Model: llama-3.3-70b-versatile
  Prompt:
  "You are the editor of The Lantern Daily — a weekly intelligence brief for Muslim founders and builders in AI and halal tech. Voice: direct, operator-to-operator, no fluff. Tagline: SIGNAL BEFORE CONSENSUS.

  Generate a Weekly Intelligence Brief with this structure:
  1. OPENING (2 sentences — frame the week's theme)
  2. TOP SIGNALS (5 items, 3-4 sentences each — deeper analysis than daily)
  3. FEATURED TOOL (pick the most relevant tool from the signals — explain why operators use it)
  4. WHAT TO WATCH (2 forward-looking items)
  5. [PREMIUM] FIELD NOTES (stub — write '[PREMIUM SECTION — Ro to complete]')

  Stories for this week:
  {{aggregated_story_list}}"
  ↓
[Supabase: Insert row]
  Table: lantern_drafts
  type: 'weekly-brief'
  content: {{generated_brief}}
  status: 'ready_to_publish'
  publish_at: Sunday 23:00 UTC (6pm ET)
  created_at: {{now}}
  ↓
[Telegram Bot: Send message]
  Chat ID: {{RO_TELEGRAM_CHAT_ID}}
  Text:
  "📋 <b>Weekly Brief draft ready</b>
  Built from {{count}} signals this week.

  Edit at: https://thelanterndaily.com/admin/drafts/{{draft_id}}
  Or edit directly in Beehiiv. Publishes Sunday 6pm ET."
\`\`\`

**Failure handling:**
- Groq fails: Telegram with raw story list so Ro can write manually
- < 5 stories: alert + skip

---

## USER LIFECYCLE

---

### U1 — SUBSCRIBE WELCOME SEQUENCE
**Type:** Webhook
**Trigger:** POST from Next.js `/api/subscribe` → Make.com webhook URL
**Payload:** `{ email, operator_number, referral_code? }`

\`\`\`
[Webhook trigger]
  ↓
[Variables] — store email, operator_number, referral_code
  ↓
[HTTP: POST https://api.resend.com/emails] — Day 0 (immediate)
  Auth: Bearer {{RESEND_API_KEY}}
  from: editorial@thelanterndaily.com
  to: {{email}}
  subject: "You are Operator #{{operator_number}}. Welcome to The Lantern."
  html: [welcome template — see /templates/welcome_day0.html]
  ↓
[Sleep: 2 days]
  ↓
[Supabase: Get row] — verify subscriber still active
  Table: lantern_subscribers
  Filter: email = {{email}}
  ↓
[Filter] — STOP if status != 'active'
  ↓
[Resend: Send email] — Day 2
  subject: "Your first signal from The Lantern."
  html: [first signal teaser + link to /issues (latest brief)]
  ↓
[Sleep: 3 days]
  ↓
[Supabase: Get row] — check tier
  ↓
[Filter] — STOP if tier != 'free' (already paid — skip upgrade pitch)
  ↓
[Resend: Send email] — Day 5
  subject: "The Weekly Brief is ready for you, Operator #{{operator_number}}."
  html: [what paid unlocks + Stripe checkout link for monthly ($15) or annual ($120)]
\`\`\`

**Failure handling:**
- Email send fails: retry once via Resend, then log

---

### U2 — PREMIUM WELCOME + REFERRAL CHECK
**Type:** Webhook
**Trigger:** Stripe `customer.subscription.created` → Make.com webhook receiver

\`\`\`
[Webhook trigger]
  ↓
[Supabase: Search rows]
  Table: lantern_subscribers
  Filter: stripe_customer_id = {{customer.id}}
  ↓
[Supabase: Update row]
  tier: 'paid'
  stripe_subscription_id: {{subscription.id}}
  upgraded_at: {{now}}
  ↓
[Resend: Send email]
  subject: "Your Weekly Brief is unlocked, Operator #{{operator_number}}."
  html: [premium welcome + link to latest brief]
  ↓
[Supabase: Search rows] — check referral
  Table: lantern_spotlight_referrals
  Filter: referred_email = {{customer.email}} AND status = 'pending'
  ↓
[Filter] — STOP if no referral found
  ↓
[Supabase: Update row]
  status: 'converted'
  commission_amount: {{subscription.plan.amount * 0.30}}
  converted_at: {{now}}
  ↓
[Telegram: Notify Ro]
  "💰 Referral converted: {{referred_email}} subscribed via Operator #{{referrer_operator_number}}.
  Commission: ${{commission_amount}} owed to {{referrer_email}}"
\`\`\`

---

## SPOTLIGHT

---

### SP1 — SPOTLIGHT INTAKE → EDITORIAL GATE
**Type:** Webhook
**Trigger:** Supabase webhook on `lantern_user_spotlights` INSERT (status='submitted') → Make.com

\`\`\`
[Webhook trigger]
  ↓
[Resend: Send email to editorial team]
  to: [roryleesemeah@gmail.com, bilal@email, keymon@email]  ← update with real emails
  subject: "📥 New Spotlight Submission — {{builder_name}}"
  html:
  "Builder: {{builder_name}} ({{builder_role}})
   Company: {{company_name}}
   Submission: {{submission_text}}

   Accept: https://thelanterndaily.com/api/admin/spotlight/accept/{{id}}?key={{ADMIN_WEBHOOK_SECRET}}
   Reject: https://thelanterndaily.com/api/admin/spotlight/reject/{{id}}?key={{ADMIN_WEBHOOK_SECRET}}"
  ↓
[Telegram: Notify Ro]
  "📥 New spotlight: {{builder_name}} — {{company_name}}"
\`\`\`

**On Accept (separate Make.com webhook, triggered by /api/admin/spotlight/accept/[id]):**
\`\`\`
[Webhook trigger]
  ↓
[Supabase: Update row]
  status: 'accepted'
  accepted_at: {{now}}
  ↓
[Resend: Acceptance email to builder]
  subject: "You're in — The Lantern Daily Builder Spotlight"
  html: [acceptance template with permanent URL + affiliate code]
  ↓
[Sleep: 24 hours]
  ↓
[Resend: Upgrade offer email]
  subject: "One more thing — feature your build in the Thursday Brief"
  html: [paid upgrade offer — $49 one-time, describe the 4 features]
  ← This is the ONLY time the paid offer is ever sent. Never before acceptance.
\`\`\`

**On Reject:**
\`\`\`
  [Supabase: Update row] status: 'rejected'
  [Resend: Kind rejection email]
\`\`\`

---

### SP2 — SPOTLIGHT PAID ACTIVATION
**Type:** Webhook
**Trigger:** Stripe `payment_intent.succeeded` WHERE `metadata.product_type = 'spotlight_upgrade'`

\`\`\`
[Webhook trigger]
  ↓
[Supabase: Search rows]
  Table: lantern_user_spotlights
  Filter: stripe_payment_intent = {{payment_intent.id}}
     OR  builder_email = {{customer_email}}
  ↓
[Supabase: Update row]
  tier: 'paid'
  paid_at: {{now}}
  thursday_brief_scheduled: true
  homepage_rotation_active: true
  archive_priority: true
  badge_url: 'https://thelanterndaily.com/badge/{{slug}}'
  ↓
[Resend: Confirmation email to builder]
  subject: "You're featured — here's your Lantern badge"
  html: [badge embed code + what happens next + Thursday Brief schedule]
  ↓
[Telegram: Notify Ro]
  "💎 Spotlight paid: {{builder_name}} — $49 received. Schedule Thursday feature."
\`\`\`

---

## DISTRIBUTION

---

### D1 — BEEHIIV → SUPABASE SYNC
**Type:** Webhook
**Trigger:** Beehiiv `post.published` webhook → Make.com webhook receiver

\`\`\`
[Webhook trigger]
  ↓
[HTTP: POST https://thelanterndaily.com/api/webhooks/beehiiv]
  Forward full Beehiiv payload
  ← Next.js route handles: HTML sanitize, excerpt gen, Supabase upsert to lantern_issues
  ← Make.com is relay only. Processing lives in code.
  ↓
[Filter] — only continue if HTTP response 200
  ↓
[Make.com webhook: POST to D2 trigger URL]
  Forward: post_id, slug, title, excerpt, content_type
\`\`\`

**Failure handling:**
- /api/webhooks/beehiiv returns non-200: retry 3x → Telegram alert if still failing

---

### D2 — SOCIAL DISTRIBUTION
**Type:** Webhook
**Trigger:** Make.com internal webhook from D1 (fires after successful Beehiiv sync)

\`\`\`
[Webhook trigger]
  ↓
[Filter] — STOP if content_type = 'short' (web-only, no social)
  ↓
[Twitter/X module: Create tweet]
  Text:
  "{{title}}

{{excerpt_truncated_200_chars}}

→ https://thelanterndaily.com/issues/{{slug}}

#MuslimTech #AIoperators"
  ↓
[LinkedIn module: Create share]
  Text:
  "{{title}}

{{excerpt}}

For serious Muslim operators building in production.

→ https://thelanterndaily.com/issues/{{slug}}"
\`\`\`

**Blockers before enabling:**
- Twitter/X @thelanternhq account must exist (Ro action)
- LinkedIn company page must exist (Ro action)
- Both connected in Make.com connections

---

## UTILITY

---

### UT1 — CROSS-PROMO ROTATION
**Type:** Scheduled
**Schedule:** Monday 14:00 UTC (9am ET / 7am MST)
**Purpose:** Rotate halal partner cross-promo weekly, lowest feature_count first.

\`\`\`
[Schedule trigger: Monday 14:00 UTC]
  ↓
[Supabase: Search rows]
  Table: lantern_platform_crosspromo
  Filter: active = true AND halal_screened = true
  Order: feature_count ASC, last_featured ASC
  Limit: 1
  ↓
[Filter] — STOP if 0 results (no screened partners yet — skip silently)
  ↓
[Supabase: Update row]
  last_featured: {{now}}
  feature_count: {{feature_count + 1}}
  ↓
[Telegram: Notify Ro]
  "🔄 Cross-promo rotated: {{partner_name}} is this week's feature.
  Check /stack to confirm it's live."
\`\`\`

---

### UT2 — CONTACT FORM → RO NOTIFICATION
**Type:** Webhook
**Trigger:** Supabase webhook on `contact_submissions` INSERT → Make.com

\`\`\`
[Webhook trigger]
  ↓
[Telegram: Send to Ro]
  "📩 <b>Lantern Contact</b>
  From: {{name}} ({{email}})
  Subject: {{subject}}

  {{message_truncated_300_chars}}"
\`\`\`

---

### UT3 — BEEHIIV CLICK → AFFILIATE LOG
**Type:** Webhook
**Trigger:** Beehiiv `email.clicked` webhook → Make.com webhook receiver

\`\`\`
[Webhook trigger]
  ↓
[Filter] — only continue if URL contains '?via=thelantern' OR 'utm_source=thelantern'
  ↓
[HTTP: POST https://thelanterndaily.com/api/webhooks/beehiiv-click]
  Body: { subscriber_id, url, clicked_at }
  ← Next.js route handles Supabase upsert to lantern_affiliate_clicks
\`\`\`

---

## MAKE.COM VARIABLES (configure in Settings → Variables)

| Variable | Value | Notes |
|---|---|---|
| GROQ_API_KEY | [REDACTED] | From SwarmClaw .env |
| RESEND_API_KEY | From Vercel env vars | Check Vercel dashboard |
| SUPABASE_URL | https://endovljmaudnxdzdapmf.supabase.co | RedLantern Studios project |
| SUPABASE_SERVICE_ROLE_KEY | From Vercel env vars | Check Vercel dashboard |
| ADMIN_WEBHOOK_SECRET | 606ca511175e02ad32fe9c1da761259e823b4351f2d4d671693465c1e8832489 | From .env.local |
| RO_TELEGRAM_CHAT_ID | TBD — get from Telegram bot after first message | Ro action |
| TELEGRAM_BOT_TOKEN | From robby-telegram .env | |
| NEXT_PUBLIC_SITE_URL | https://thelanterndaily.com | |

---

## SUPABASE WEBHOOKS TO CONFIGURE
(Supabase Dashboard → Database → Webhooks)

| Event | Table | Fires to | Used by |
|---|---|---|---|
| INSERT | lantern_user_spotlights | Make.com SP1 webhook URL | SP1 intake flow |
| INSERT | contact_submissions | Make.com UT2 webhook URL | UT2 notification |

---

## BEEHIIV WEBHOOKS TO CONFIGURE
(Beehiiv Dashboard → Settings → Webhooks)

| Event | Fires to | Used by |
|---|---|---|
| post.published | Make.com D1 webhook URL | D1 → D2 sync + social |
| subscriber.created | Next.js /api/webhooks/beehiiv-subscribe | Subscriber sync to Supabase |
| email.clicked | Make.com UT3 webhook URL | UT3 affiliate click log |

Note: subscriber.created goes directly to Next.js, not Make.com — the welcome sequence (U1) is triggered by /api/subscribe (user action), not Beehiiv (which fires after email confirmation). Don't double-fire the welcome sequence.

---

## STRIPE WEBHOOKS TO CONFIGURE
(Stripe Dashboard → Developers → Webhooks → Add endpoint)

| Event | Endpoint | Used by |
|---|---|---|
| customer.subscription.created | https://thelanterndaily.com/api/webhooks/stripe | U2 premium welcome |
| payment_intent.succeeded | https://thelanterndaily.com/api/webhooks/stripe | SP2 spotlight activation |

Next.js /api/webhooks/stripe routes to Make.com based on event type:
- subscription.created → POST to Make.com U2 webhook URL
- payment_intent.succeeded + metadata.product_type = 'spotlight_upgrade' → POST to Make.com SP2 webhook URL

---

## NEXT.JS API ROUTES REQUIRED

These must exist before Make.com scenarios are enabled:

| Route | Purpose | Used by |
|---|---|---|
| POST /api/subscribe | Subscribe form handler → triggers U1 | U1 |
| POST /api/admin/approve/[id] | Approve queued story | C2 digest links |
| POST /api/admin/reject/[id] | Reject queued story | C2 digest links |
| POST /api/admin/spotlight/accept/[id] | Accept spotlight | SP1 |
| POST /api/admin/spotlight/reject/[id] | Reject spotlight | SP1 |
| POST /api/webhooks/beehiiv | Beehiiv post.published processing | D1 |
| POST /api/webhooks/beehiiv-click | Affiliate click log | UT3 |
| POST /api/webhooks/stripe | Stripe event router | U2, SP2 |

All admin routes must validate `?key={{ADMIN_WEBHOOK_SECRET}}` before processing.

---

## BUILD ORDER

Build in this sequence — each unblocks the next:

1. **C1** — Content Radar (starts filling the queue. Runs independently.)
2. **C2** — Approval Digest (Ro can start reviewing signals)
3. **U1** — Welcome Sequence (unblocks subscriber onboarding)
4. **U2** — Premium Welcome + Referral (unblocks paid revenue tracking)
5. **SP1** — Spotlight Intake (unblocks cold-start outreach)
6. **SP2** — Spotlight Paid Activation (unblocks $49 revenue)
7. **C3** — Daily Draft Generator (unblocks daily dispatch content)
8. **C4** — Weekly Brief Generator (unblocks weekly content)
9. **D1** — Beehiiv Sync (unblocks web content display)
10. **D2** — Social Distribution (launch-day, after accounts exist)
11. **UT1** — Cross-Promo Rotation (after first halal partner screened)
12. **UT2** — Contact Form (low priority, simple)
13. **UT3** — Affiliate Click Log (analytics, last)

---

## RO ACTIONS REQUIRED (blocks specific scenarios)

| Action | Blocks |
|---|---|
| Get Telegram chat ID from RobbyPA bot | C2, C3, C4, all HITL notifications |
| Create @thelanternhq Twitter/X account | D2 |
| Create LinkedIn company page | D2 |
| Wire Stripe webhook endpoint | U2, SP2 |
| Configure Supabase webhooks (2) | SP1, UT2 |
| Configure Beehiiv webhooks (3) | D1, D2, UT3 |
| Add Make.com variables (table above) | All scenarios |

---

## WHAT RO SEES (HITL SUMMARY)

| Time | Notification | Action |
|---|---|---|
| 5pm ET daily | Approval digest: 12 stories | Tap approve/reject links (2 min) |
| 2am ET (Mon–Fri) | Draft ready notification | Wake up to it, publish in Beehiiv by 7am |
| Friday 12pm ET | Weekly Brief draft ready | Edit Friday PM, publish Sunday 6pm |
| On spotlight submission | "New submission" Telegram | Accept/reject via link |
| On spotlight $49 payment | "Paid spotlight" alert | Schedule Thursday feature |
| On referral conversion | "Commission owed" alert | FYI only |
| On contact form | "New contact" Telegram | Respond or ignore |

Everything else runs without Ro.
