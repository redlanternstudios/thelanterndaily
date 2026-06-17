# THE LANTERN DAILY — MAKE.COM TRIGGER MAP

**Version:** 1.0  
**Authored:** 2026-06-16  
**Status:** LOCKED — source of truth for all Make.com automation  
**Supersedes:** AUTOMATION_OS.md (automation sections), any Zapier references

---

## DESIGN PRINCIPLES

- Make.com is the **ONLY** automation layer. No n8n, no Zapier.
- Logic lives in Next.js API routes. Make.com = relay + scheduler + trigger handler.
- **Groq** (HTTP module) handles all AI scoring and content generation inside Make.com.
- Ro's HITL is exactly **two** daily touchpoints: 5pm ET approval review + publish after morning draft notification.
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

### C1 — CONTENT RADAR
**Type:** Scheduled  
**Schedule:** Every 4 hours (00:00, 04:00, 08:00, 12:00, 16:00, 20:00 UTC)  
**Purpose:** Ingest RSS sources, score with Groq, dedup, queue approved signals.  
**Table:** `lantern_content_queue`

**Flow:**
1. Schedule trigger
2. RSS module — pull in parallel: IslamicFinanceGuru, SalaamGateway, TLDR AI, Ben's Bites, TechCrunch, Wired
3. Iterator — loop each article
4. Supabase: Search `lantern_content_queue` WHERE url match → STOP if found (dedup)
5. Groq: POST to /chat/completions with scoring prompt → JSON parse `relevance_score`, `halal_stance`, `ai_summary`
6. Filter: STOP if relevance < 7 or halal_stance = 'BLOCKED'
7. Supabase: Insert into `lantern_content_queue` with status='pending'

**Failure:** RSS fails → skip source. Groq fails → log to `lantern_automation_errors`. Insert fails → retry once.

### C2 — APPROVAL DIGEST
**Type:** Scheduled (22:00 UTC daily)  
**Table:** `lantern_content_queue`  
**HITL:** Yes — Ro receives digest via Telegram at 5pm ET

**Flow:**
1. Query pending stories (top 12 by relevance_score DESC)
2. STOP if 0 results
3. Build Telegram digest with approve/reject links
4. Send to Ro

**Links:** `/api/admin/approve/[id]?key={{ADMIN_WEBHOOK_SECRET}}` and `/api/admin/reject/[id]?key={{ADMIN_WEBHOOK_SECRET}}`

**Failure:** Telegram fails → fallback to Resend email.

### C3 — DAILY DRAFT GENERATOR
**Type:** Scheduled (07:00 UTC Mon–Fri)  
**Tables:** `lantern_content_queue` → `lantern_drafts`  
**HITL:** Yes — Ro receives notification, publishes in Beehiiv by 7am ET

**Flow:**
1. Query approved stories (limit 8)
2. If < 3: supplement from backlog older than 24h. If still < 3: skip + notify.
3. Slice to top 5, call Groq for each signal item
4. Assemble dispatch header + 5 signals + affiliate card (weekly rotation) + footer
5. Insert into `lantern_drafts` with status='ready_to_publish'
6. Mark stories as 'used' in queue
7. Telegram Ro with preview link

**Affiliate rotation:** n8n → Beehiiv → Supabase → Vercel → Groq → Resend (mod 6 of week number)

### C4 — WEEKLY BRIEF GENERATOR
**Type:** Scheduled (Friday 17:00 UTC)  
**Tables:** `lantern_content_queue` → `lantern_drafts`  
**HITL:** Yes — Ro edits Friday PM, publishes Sunday 6pm ET

**Flow:**
1. Query 7-day window of approved+used stories (limit 15)
2. STOP if < 5
3. Groq: generate full brief structure (Opening, Top 5 Signals, Featured Tool, What to Watch, [PREMIUM] stub)
4. Insert into `lantern_drafts` type='weekly-brief'
5. Telegram Ro

---

## USER LIFECYCLE

### U1 — SUBSCRIBE WELCOME SEQUENCE
**Type:** Webhook (triggered by `/api/subscribe` → Make.com)  
**Tables:** `lantern_subscribers`  
**Email:** Resend

**Sequence:**
- Day 0: "You are Operator #N. Welcome to The Lantern."
- Day 2: "Your first signal from The Lantern." (verify subscriber still active)
- Day 5: "The Weekly Brief is ready for you." (only if still 'free' tier — skip if paid)

### U2 — PREMIUM WELCOME + REFERRAL CHECK
**Type:** Webhook (Stripe `customer.subscription.created` → Make.com)  
**Tables:** `lantern_subscribers`, `lantern_spotlight_referrals`

**Flow:**
1. Lookup subscriber by stripe_customer_id
2. Update tier to 'paid'
3. Send premium welcome email
4. Check referrals: if `lantern_spotlight_referrals` has matching referred_email with status='pending', mark as 'converted', calculate 30% commission
5. Telegram Ro: "💰 Referral converted"

---

## SPOTLIGHT

### SP1 — SPOTLIGHT INTAKE → EDITORIAL GATE
**Type:** Supabase webhook (INSERT on `lantern_user_spotlights` with status='submitted')  
**HITL:** Yes — editorial team receives email + Ro Telegram

**Flow:**
1. Email editorial team (roryleesemeah@gmail.com + Bilal + Keymon) with accept/reject links
2. Telegram Ro: "📥 New spotlight: {{builder_name}} — {{company_name}}"
3. On accept (separate webhook): update status='published', send acceptance email, sleep 24h, send upgrade offer ($49)
4. On reject: update status='archived', send kind rejection email

**Links:** `/api/admin/spotlight/accept/[id]?key={{ADMIN_WEBHOOK_SECRET}}` and `/api/admin/spotlight/reject/[id]?key={{ADMIN_WEBHOOK_SECRET}}`

**Rule:** The $49 upgrade offer is sent exactly once, 24h after acceptance. Never before.

### SP2 — SPOTLIGHT PAID ACTIVATION
**Type:** Webhook (Stripe `payment_intent.succeeded` WHERE product_type='spotlight_upgrade')  
**Table:** `lantern_user_spotlights`

**Flow:**
1. Lookup spotlight by stripe_payment_id or builder_email
2. Update tier to 'paid', set badge_url, enable Thursday Brief + homepage rotation + archive priority
3. Send confirmation email with badge embed code
4. Telegram Ro: "💎 Spotlight paid — $49 received"

---

## DISTRIBUTION

### D1 — BEEHIIV → SUPABASE SYNC
**Type:** Webhook (Beehiiv `post.published` → Make.com → Next.js)  
**Table:** `lantern_posts`

Make.com is relay only. `/api/webhooks/beehiiv` handles processing: HTML sanitize, excerpt gen, Supabase upsert to `lantern_posts`.

**Flow:** Beehiiv webhook → Make.com D1 → POST to `/api/webhooks/beehiiv` → success → Make.com internal webhook to D2

### D2 — SOCIAL DISTRIBUTION
**Type:** Internal webhook (from D1 after successful sync)  
**BLOCKED:** Requires Twitter/X `@thelanternhq` + LinkedIn company page

Skip if content_type = 'short'. Post to Twitter/X + LinkedIn.

---

## UTILITY

### UT1 — CROSS-PROMO ROTATION
**Type:** Scheduled (Monday 14:00 UTC)  
**Table:** `lantern_platform_partners`

Rotate to the partner with lowest `feature_count`. Only active + halal_screened partners.

### UT2 — CONTACT FORM → RO NOTIFICATION
**Type:** Supabase webhook (INSERT on `contact_submissions`)  
Forwards to Telegram with name, email, subject, truncated message.

### UT3 — BEEHIIV CLICK → AFFILIATE LOG
**Type:** Webhook (Beehiiv `email.clicked` → Make.com → Next.js)  
Filter: only URLs containing `?via=thelantern` or `utm_source=thelantern`.  
Forward to `/api/webhooks/beehiiv-click` for Supabase insert into `lantern_affiliate_clicks`.

---

## MAKE.COM VARIABLES

| Variable | Value | Source |
|---|---|---|
| GROQ_API_KEY | `{{GROQ_API_KEY}}` | SwarmClaw .env |
| RESEND_API_KEY | `{{RESEND_API_KEY}}` | Vercel env vars |
| SUPABASE_URL | `https://endovljmaudnxdzdapmf.supabase.co` | Supabase dashboard |
| SUPABASE_SERVICE_ROLE_KEY | `{{SUPABASE_SERVICE_ROLE_KEY}}` | Vercel env vars |
| ADMIN_WEBHOOK_SECRET | `{{ADMIN_WEBHOOK_SECRET}}` | .env.local |
| RO_TELEGRAM_CHAT_ID | TBD — ask RobbyPA bot | Ro action |
| TELEGRAM_BOT_TOKEN | `{{TELEGRAM_BOT_TOKEN}}` | robby-telegram .env |
| NEXT_PUBLIC_SITE_URL | `https://thelanterndaily.com` | |

---

## WEBHOOKS TO CONFIGURE

### Supabase (Dashboard → Database → Webhooks)
| Event | Table | Fires to | Used by |
|---|---|---|---|
| INSERT | lantern_user_spotlights | Make.com SP1 webhook URL | SP1 |
| INSERT | contact_submissions | Make.com UT2 webhook URL | UT2 |

### Beehiiv (Settings → Webhooks)
| Event | Fires to | Used by |
|---|---|---|
| post.published | Make.com D1 webhook URL | D1 → D2 |
| subscriber.created | `/api/webhooks/beehiiv-subscribe` | Subscriber sync |
| email.clicked | Make.com UT3 webhook URL | UT3 |

### Stripe (Developers → Webhooks)
| Event | Endpoint | Used by |
|---|---|---|
| customer.subscription.created | `/api/webhooks/stripe` | U2 |
| payment_intent.succeeded | `/api/webhooks/stripe` | SP2 |
| checkout.session.completed | `/api/webhooks/stripe` | Subscription record |

---

## NEXT.JS API ROUTES BUILT

| Route | Purpose | Status |
|---|---|---|
| `POST /api/subscribe` | Subscribe form → Beehiiv | ✅ Committed |
| `POST /api/admin/approve/[id]` | Approve queued story | ✅ Committed |
| `POST /api/admin/reject/[id]` | Reject queued story | ✅ Committed |
| `POST /api/admin/spotlight/accept/[id]` | Accept spotlight | ✅ Committed |
| `POST /api/admin/spotlight/reject/[id]` | Reject spotlight | ✅ Committed |
| `POST /api/webhooks/beehiiv` | Beehiiv post sync | ✅ Committed |
| `POST /api/webhooks/beehiiv-click` | Affiliate click log | ✅ Committed |
| `POST /api/webhooks/beehiiv-subscribe` | Beehiiv subscriber sync | ✅ Committed |
| `POST /api/webhooks/stripe` | Stripe event router | ✅ Committed |

---

## BUILD ORDER

1. **C1** — Content Radar (starts queue, runs independently) ← Do first
2. **C2** — Approval Digest (Ro starts reviewing)
3. **U1** — Welcome Sequence (subscriber onboarding)
4. **U2** — Premium Welcome + Referral
5. **SP1** — Spotlight Intake
6. **SP2** — Spotlight Paid Activation
7. **C3** — Daily Draft Generator
8. **C4** — Weekly Brief Generator
9. **D1** — Beehiiv Sync
10. **D2** — Social Distribution (blocked on accounts)
11. **UT1** — Cross-Promo Rotation
12. **UT2** — Contact Form
13. **UT3** — Affiliate Click Log

---

## RO's HITL SUMMARY

| Time | Notification | Action |
|---|---|---|
| 5pm ET daily | Approval digest (12 stories) | Tap approve/reject links (~2 min) |
| 2am ET Mon–Fri | Draft ready notification | Wake up, publish in Beehiiv by 7am |
| Friday 12pm ET | Weekly Brief draft ready | Edit Friday PM, publish Sunday 6pm |
| On spotlight submission | "New submission" Telegram | Accept/reject via link |
| On $49 payment | "Paid spotlight" alert | Schedule Thursday feature |
| On referral conversion | "Commission owed" | FYI only |
| On contact form | "New contact" Telegram | Respond or ignore |

Everything else runs without Ro.
