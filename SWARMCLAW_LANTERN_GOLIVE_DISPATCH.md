# SWARMCLAW MISSION — THE LANTERN DAILY — GO-LIVE DISPATCH
Version: 1.0 | Date: 2026-06-15 | Author: Claude (TruthSerum mode)
Target: Jun 21 2026 — Alif presentation-ready

---

## DB STATUS — VERIFIED ✅ (2026-06-15)

All 8 lantern_ tables confirmed in Supabase project `endovljmaudnxdzdapmf`:

| Table | Status |
|---|---|
| `lantern_subscribers` | ✅ Pre-existing |
| `lantern_issues` | ✅ Pre-existing |
| `lantern_content_queue` | ✅ Pre-existing |
| `lantern_stack_entries` | ✅ Migrated 2026-06-15 |
| `lantern_video_channels` | ✅ Migrated 2026-06-15 |
| `lantern_video_features` | ✅ Migrated 2026-06-15 (embed HARD BLOCKED at DB level) |
| `lantern_user_spotlights` | ✅ Migrated 2026-06-15 |
| `lantern_spotlight_referrals` | ✅ Migrated 2026-06-15 |
| `lantern_platform_crosspromo` | ✅ Migrated 2026-06-15 (halal trigger active) |
| `lantern_affiliate_clicks` | ✅ Migrated 2026-06-15 |

RLS enabled on all tables. Service role write policies set. Public read policies set where appropriate.

---

## CTP PASS 2 — CHALLENGE (what the first audit missed)

### 1. SwarmClaw down = full agent pipeline blocked

The prior audit listed SwarmClaw recovery as a "blocker" without naming the blast radius. Here is the actual blast radius: **ALL frontend scaffolding, ALL component builds, ALL API route implementations, ALL page builds are blocked until SwarmClaw is restored**. These are not parallel tracks. They are sequential behind SC recovery.

The critical path is: `Ro restarts SC → ENGINEER scaffolds Next.js repo → frontend agents build components → backend agents wire API routes → QA validates`.

Without SC the only work that can execute is: DB migrations (done ✅), Make.com scenarios (Ro builds manually), DNS (Ro action), Beehiiv (Ro action).

### 2. The repo question is unanswered and blocks everything

There is no confirmed `thelanterndaily` Next.js repo. This is not a minor detail. It is the single dependency that blocks ENGINEER from starting. Two options exist:
- Option A: Existing RLS project repo at a known path → ENGINEER adds `apps/the-lantern/` subdirectory
- Option B: Fresh scaffold → `npx create-next-app@latest apps/the-lantern`

Until Ro confirms one of these, ENGINEER cannot start. This must be the FIRST decision Ro makes after SC recovery.

### 3. Make.com scenarios require Ro doing UI work — not agent work

Make.com has an API but building complex multi-step scenarios (Groq scoring, Supabase inserts, Stripe webhooks, Telegram alerts, Resend emails) via API is not a reasonable agent task. These are effectively human-executed UI builds. All 5 scenarios are Ro-owned.

Timeline implication: if Ro spends 2-3 hours on Make.com scenarios, that is 2-3 hours not on other blockers. Prioritization matters.

### 4. Telegram bot token is a hard dependency for Make.com alerting

Scenarios A and D-1 require a Telegram bot token + Ro's chat ID. Neither exists yet. BotFather setup takes 5 minutes but must happen before Make.com scenarios can be tested end-to-end.

### 5. The content seed problem is real and immediate

Day 4 task is "content seed." But the content seed requires: (a) Groq API called from Make.com Scenario A, (b) Scenario A built and running, (c) sources whitelisted. At the current pace, by Day 4 (Jun 17), Scenario A may not be live. The editorial queue will be empty when frontend is ready. This breaks the demo — an empty `/stack` page is worse than no page.

Mitigation: Ro manually seeds 3-5 stack entries directly into `lantern_stack_entries` before the frontend is ready. This decouples content from automation.

---

## CTP PASS 3 — REAL TRUTH (what pass 2 still missed)

### 1. The Alif demo is not a working product demo — it's a proof-of-direction demo

Alif (Omar, 21yo, $500k pre-seed, SF) is evaluating whether The Lantern is a credible media arm for the Halal Suite. They are NOT evaluating whether the subscription gate works perfectly or whether Make.com Scenario B fires correctly on Stripe events.

What they need to see:
1. Real domain live (`thelanterndaily.com`)
2. At minimum 1 actual subscriber (not fake data)
3. At least 1 builder spotlight published (even if seeded by Ro's team)
4. The positioning page (`/about` or homepage) that makes the editorial mission clear
5. A stack page with real tools (even if manually seeded)

The June 21 target is achievable even if Make.com Scenario B (referral tracker) is incomplete — that scenario does not affect the visible product. What kills the demo is: no domain, empty pages, or generic content.

### 2. Bilal as first spotlight is the highest-leverage single action available

Bilal (Deixis) has Muslim community reach and is already part of the cold-start team. If Bilal submits a spotlight today and it goes live before Jun 21, the demo has social proof before the product has real users. This is not a nice-to-have — it is the single most credible signal Alif will see.

**This should be the first DM Ro sends today.** Not after SwarmClaw. Not after DNS. Today.

### 3. The video corner constraint is stricter than the implementation implies

YouTube embeds are HARD BLOCKED at DB level (`video_url NOT LIKE '%embed%'`). This is correct. But the Make.com scenario and the frontend VideoCard component must both honor this constraint. If FRONTEND agent builds a VideoCard that accepts an embed URL client-side, the DB constraint alone won't save you — the insert will fail and the card will be broken. The component must validate URL format BEFORE attempting DB write.

Additionally: no video channels are whitelisted yet. The `lantern_video_channels` table is empty. Even with the VideoCard built, no videos can be featured until Ro reviews and approves channels. This needs to be a seeding task before Day 5.

### 4. The affiliate disclosure requirement is non-optional

`affiliate_disclosure` has a default value in `lantern_stack_entries`: `'(affiliate — The Lantern earns a commission)'`. This is correct. But:
- The frontend StackToolCard must ALWAYS render this disclosure when `has_affiliate = true`
- Omitting it on a Muslim platform creates trust damage that is asymmetric and permanent (community correction signal is fast and unforgiving)
- This must be in FRONTEND's component spec, not just the DB

### 5. The semi-autonomous operation target is a 30-day goal, not a launch goal

The original audit framed "semi-autonomous operation" as the Jun 21 target. Pass 3 truth: semi-autonomous operation requires Make.com Scenario A running reliably with Groq scoring, editorial approval flow working, and multiple content cycles completing without manual intervention. That takes 2-3 weeks of iteration after launch, not one week of build.

**The correct Jun 21 target is:** functional product that demonstrates the editorial model with at least some real content and 1 real builder spotlight. Semi-autonomous operation is a Week 3-4 milestone.

---

## GO-LIVE CRITICAL PATH — GOVERNING DIRECTIVES

Three lanes execute in parallel:

```
LANE A: RO ACTIONS (blocks everything in lanes B and C)
LANE B: CLAUDE / MCP (can execute now, no SC needed)
LANE C: SWARMCLAW AGENTS (blocked until SC recovery + repo confirmed)
```

---

## LANE A — RO ACTIONS (ordered by criticality)

### A1 — TODAY, before anything else
- [ ] **DM Bilal** — ask him to submit a builder spotlight. This is the single highest-leverage action for Jun 21.
- [ ] **Restart SwarmClaw**: `bash ~/swarmclaw/sc-restart.sh`
- [ ] **Disable Beehiiv Boosts** — CRITICAL: Settings → Monetization → Boosts → OFF. Must be off before ANY issue is sent.

### A2 — TODAY, after SC recovery
- [ ] **Confirm repo path** — does a `thelanterndaily` Next.js repo exist anywhere? If yes, what path? If no, approve fresh scaffold at `apps/the-lantern/` in existing RLS repo. This is the gate for ENGINEER.
- [ ] **Create Telegram bot** via BotFather — get token + your chat ID. Takes 5 minutes. Required before Make.com scenarios can be tested.

### A3 — TODAY or TOMORROW (parallel with SC agents working)
- [ ] **Build Make.com Scenario A** — Tech Stack Daily Curate. This feeds the content pipeline. Highest priority of the 5 scenarios. Spec in `SWARMCLAW_DISPATCH_LANTERN_STACK_V1.md`.
- [ ] **Build Make.com Scenario D-1** — Spotlight Intake. Required before the submission form can route to you for approval.
- [ ] **Manually seed 3-5 stack entries** into `lantern_stack_entries` directly via Supabase dashboard. Ensure `ro_approved = true`, `published = true`, `halal_screened = true`. This unblocks the `/stack` page demo.

### A4 — Day 3-4 (Jun 16-17)
- [ ] **DNS** — A record `76.76.21.21` + CNAME in Namecheap Advanced DNS
- [ ] **Add domain** `thelanterndaily.com` in Vercel
- [ ] **Seed video channels** — add 3-5 approved channels to `lantern_video_channels` (MUSLIM_RUN or HALAL_SAFE only)
- [ ] **Build Make.com Scenario B** — Referral Tracker (needed for affiliate flow)
- [ ] **Build Make.com Scenario C** — Cross-promo rotation
- [ ] **Build Make.com Scenario D-2** — Paid Spotlight Activation (needed for $49 upgrade)

### A5 — Day 5 (Jun 18)
- [ ] **Wire Stripe webhooks** — after D-1 and D-2 Make.com URLs are known
- [ ] **Review and approve Bilal's spotlight** (and any others that came in)
- [ ] **Stage deploy** — verify domain resolves, SSL active, homepage loads

### A6 — Day 6-7 (Jun 19-20)
- [ ] **Cold-start outreach** — Bilal + Keymon + Homira submit spotlights
- [ ] **Coordinate Bilal co-sign** — get Bilal to post about The Lantern to his audience (first distribution spike)
- [ ] **QA final pass** — read all pages as a free subscriber, then as a paid subscriber. Check every CTA.

---

## LANE B — CLAUDE / MCP ACTIONS (can execute this session)

### B1 — DONE ✅ (this session)
- [x] All 7 missing DB migrations run on `endovljmaudnxdzdapmf`
- [x] RLS policies set on all new tables
- [x] Halal trigger deployed on `lantern_platform_crosspromo`
- [x] YouTube embed constraint deployed on `lantern_video_features`

### B2 — Available now via Stripe MCP
- [ ] Verify Stripe webhook endpoint exists for `payment_intent.succeeded` and `customer.subscription.created`
- [ ] Verify Stripe products are correctly configured (price IDs match .env.local spec)

### B3 — Available after repo confirmed
- [ ] Generate TypeScript types from Supabase schema (`generate_typescript_types`)
- [ ] Write `.env.example` with all required vars from SWARMCLAW_DISPATCH_LANTERN_BACKEND.md

---

## LANE C — SWARMCLAW AGENT MISSIONS

**GATE: Do not start until Ro confirms:**
1. SwarmClaw running (`sc-restart.sh` complete)
2. Repo path confirmed or scaffold approved

---

### MISSION 1 — ENGINEER: Scaffold + Core Architecture
**Trigger phrase:** `LANTERN-SCAFFOLD-APPROVED`
**Priority:** P0 — all other frontend missions depend on this

**Inputs:**
- Repo path from Ro (or: `npx create-next-app@latest the-lantern-daily`)
- `.env.example` from SWARMCLAW_DISPATCH_LANTERN_BACKEND.md
- Stack: Next.js App Router + Tailwind + Supabase + Stripe + PostHog + Sentry

**Tasks:**
1. Scaffold Next.js 14 App Router project (or extend existing)
2. Install dependencies:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr stripe @supabase/auth-helpers-nextjs posthog-js @sentry/nextjs resend
   ```
3. Create directory structure:
   ```
   app/
     (public)/
       page.tsx               # Homepage
       about/page.tsx
       stack/page.tsx
       builders/page.tsx
       builders/[slug]/page.tsx
       issues/page.tsx
       issues/[slug]/page.tsx
       archive/page.tsx
       confirmed/page.tsx
     (auth)/
       layout.tsx
     api/
       subscribe/route.ts
       check-tier/route.ts
       webhooks/
         stripe/route.ts
         beehiiv/route.ts
       admin/
         approve/[id]/route.ts
         reject/[id]/route.ts
       issues/route.ts
       issues/[slug]/route.ts
       shorts/route.ts
       subscriber-count/route.ts
   components/
     lantern/
       StackToolCard.tsx
       VideoCard.tsx
       OperatorSpotlightCard.tsx
       RepoCard.tsx
       PlatformCrossPromoCard.tsx
       PremiumGate.tsx
   lib/
     supabase/
       client.ts
       server.ts
     stripe.ts
     posthog.ts
   ```
4. Write `.env.example` from spec
5. Wire PostHog and Sentry providers at root layout
6. Commit to branch: `feat/lantern-scaffold`

**DoD:** `npm run dev` starts without errors. All page routes return 200 or valid redirect.

---

### MISSION 2 — FRONTEND: Homepage + Subscribe Flow
**Trigger phrase:** `LANTERN-SCAFFOLD-APPROVED`
**Priority:** P0 — this is what Alif sees first
**Depends on:** MISSION 1 complete

**Key constraints:**
- Brand: `SIGNAL BEFORE CONSENSUS` + `MUSLIM-BUILT. AI-NATIVE.`
- Color: Use RLS brand (check `BRAND_DOCUMENT_STANDARD.md` for hex values)
- No Ro's face. No personal attribution. Community-first voice.
- Email subscribe → `/api/subscribe` → redirect `/confirmed?operator=[XXXX]` (zero-padded 4 digits)
- Subscriber count rendered live from `/api/subscriber-count`
- Hero CTA: "Join [COUNT] Muslim founders and builders" (real count, not fake)

**Components to build:**
1. Hero section — headline + subtitle + subscribe form
2. "Why The Lantern" section — 3-4 editorial pillars
3. Featured Stack teaser (3 tools max, paid gate CTA)
4. Builder spotlight preview (most recent published spotlight)
5. Trust bar — "Beehiiv-powered. RLS-encrypted. Halal-curated."
6. Footer — links + social + unsubscribe

**DoD:** Homepage loads with live subscriber count. Subscribe form submits, returns operator number, redirects to /confirmed page.

---

### MISSION 3 — FRONTEND: Stack Page (`/stack`)
**Trigger phrase:** `LANTERN-SCAFFOLD-APPROVED`
**Priority:** P1
**Depends on:** MISSION 1 complete + at least 3 rows seeded in `lantern_stack_entries`

**Access gates:**
- Free: 3 tool teasers (one_line_desc only, no full_breakdown)
- Paid: full breakdown for all tools (8-12 per weekly feature)

**StackToolCard component spec:**
```
Props:
  tool: LanternStackEntry
  tier: 'free' | 'paid'
  
Display (free):
  - tool_name
  - category badge
  - tier badge (free/freemium/paid)
  - one_line_desc
  - External link (tool_url) — opens in new tab
  - If has_affiliate: affiliate_disclosure (always visible, never hidden)
  - "Paid: full breakdown" teaser CTA

Display (paid, adds):
  - full_breakdown
  - avoid_reason (if present) — labeled "Watch out for:"
  - operator_context — labeled "Lantern take:"
  - affiliate_link (if has_affiliate)
  - is_open_source badge + repo_url
```

**CRITICAL — affiliate disclosure:** When `has_affiliate = true`, render `affiliate_disclosure` text visibly. Never hide it. Non-negotiable.

**DoD:** `/stack` renders tools from DB. Free users see 3 tools + paywall. Paid users see all. Affiliate disclosure always visible.

---

### MISSION 4 — FRONTEND: Builders Pages (`/builders` + `/builders/[slug]`)
**Trigger phrase:** `LANTERN-SCAFFOLD-APPROVED`
**Priority:** P1
**Depends on:** MISSION 1 complete + at least 1 spotlight in `lantern_user_spotlights` (status='published')

**`/builders` — archive page:**
- Public. No auth gate.
- Grid of OperatorSpotlightCards (all published spotlights)
- Submit CTA always visible at top: "Are you building something? Share your story."
- Submit form → Make.com Webhook (Scenario D-1)
- If 0 spotlights: show "Be the first builder featured" CTA only (no empty grid)

**`/builders/[slug]` — individual spotlight:**
- Public. No auth gate.
- Builder profile: display_name, role_description, location, products_building, quote
- Affiliate CTA: "Subscribe via [display_name]'s link — they earn 30% Year 1"
- If spotlight_tier = 'paid': render paid_badge ("Featured in The Lantern Daily ✓")
- 7-day homepage feature banner if homepage_featured = true and today in [start, end]
- DO NOT show contact_email on public page

**OperatorSpotlightCard component:**
```
Display:
  - user_number (zero-padded: "Builder #0001")
  - display_name
  - role_description
  - location
  - products_building (comma list)
  - quote (pull-quote style)
  - affiliate_code link to /builders/[slug]
  - paid_tier badge if spotlight_tier='paid'
```

**DoD:** `/builders` renders grid with submit CTA. `/builders/[slug]` renders full profile. Affiliate link present. 0-spotlight state handled.

---

### MISSION 5 — BACKEND: API Routes (all)
**Trigger phrase:** `LANTERN-SCAFFOLD-APPROVED`
**Priority:** P0
**Depends on:** MISSION 1 scaffold complete

**Implement all routes from SWARMCLAW_DISPATCH_LANTERN_BACKEND.md exactly as specified:**

| Route | Priority | Notes |
|---|---|---|
| `POST /api/subscribe` | P0 | Race-safe operator number via sequence |
| `GET /api/check-tier` | P0 | Required for PremiumGate |
| `POST /api/webhooks/stripe` | P0 | HMAC verify required |
| `POST /api/webhooks/beehiiv` | P1 | Upserts issues to DB |
| `POST /api/admin/approve/[id]` | P1 | X-Admin-Key auth |
| `POST /api/admin/reject/[id]` | P1 | X-Admin-Key auth |
| `GET /api/issues` | P1 | Pagination, tier filter |
| `GET /api/subscriber-count` | P0 | 5 min revalidation |
| `GET /api/shorts` | P2 | Cursor pagination |

**CRITICAL constraints:**
- `/api/webhooks/stripe`: verify `Stripe-Signature` header with `STRIPE_WEBHOOK_SECRET`. Do NOT process events without signature verification.
- `/api/subscribe`: use `SELECT nextval('lantern_operator_number_seq')` for operator number — no `MAX(operator_number) + 1` (race condition)
- All PostHog events fire as specified in SWARMCLAW_DISPATCH_LANTERN_BACKEND.md
- All Sentry alerts configured as specified

**DoD:** All P0 routes passing integration tests with live Supabase. Stripe webhook verifies signature and rejects invalid requests. Subscribe assigns unique operator numbers under concurrent load.

---

### MISSION 6 — QA: Pre-Launch Trust Audit
**Trigger phrase:** `LANTERN-QA-READY`
**Priority:** P0 — must run before domain goes live
**Depends on:** All MISSION 1-5 complete + staging deploy on Vercel

**Checks to run:**

**Halal constraints:**
- [ ] Submit a video URL containing "embed" to VideoCard → should FAIL at DB level
- [ ] Try to activate a `lantern_platform_crosspromo` row with `halal_screened = false` and `active = true` → DB trigger must RAISE EXCEPTION
- [ ] Confirm Beehiiv Boosts are disabled (Ro confirms manually — QA cannot verify this)

**Affiliate disclosure:**
- [ ] Find a stack entry with `has_affiliate = true` → affiliate_disclosure text must be visible on free tier AND paid tier
- [ ] Confirm disclosure is not hidden behind any CSS `display:none` or conditional

**Premium gate:**
- [ ] Load `/stack` as unauthenticated user → exactly 3 tools visible, rest gated
- [ ] Load `/stack` as paid subscriber → all tools visible, no gate
- [ ] Load a paid issue as free subscriber → content blurred/gated

**Spotlight:**
- [ ] Submit spotlight form → confirm Make.com D-1 webhook fires (check Make.com logs)
- [ ] Approve spotlight via `/api/admin/approve/[id]` → confirm status = 'published' in DB
- [ ] Load `/builders/[slug]` → affiliate link present, contact_email NOT visible

**Subscribe flow:**
- [ ] Submit email → redirect to `/confirmed?operator=XXXX` with zero-padded number
- [ ] Submit same email again → return existing operator_number (no duplicate)
- [ ] PostHog: `lantern_subscribe_free` fires

**Stripe:**
- [ ] Trigger `checkout.session.completed` via Stripe webhook test → subscriber tier updates to 'paid'
- [ ] PostHog: `lantern_subscribe_paid` fires

**DoD:** All checks pass. Zero halal constraint bypasses. Affiliate disclosure 100% visible. Premium gate enforced. Duplicate subscribe handled.

---

## MAKE.COM SCENARIOS — RO-OWNED (reference specs)

All specs in `SWARMCLAW_DISPATCH_LANTERN_STACK_V1.md`. Priority order for Ro to build:

| Scenario | Priority | Why |
|---|---|---|
| D-1: Spotlight Intake | P0 | Submit form → editorial gate → approval flow |
| A: Tech Stack Daily Curate | P0 | Feeds content pipeline — empty without it |
| D-2: Paid Spotlight Activation | P1 | Enables $49 upgrade revenue |
| B: Referral Tracker | P1 | Affiliate commissions — needed for trust |
| C: Cross-Promo Rotation | P2 | Nice for demo, not critical |

**Before building any scenario:**
- Create Telegram bot via BotFather (5 min) → token + chat ID required for A and D-1
- Connect modules in Make.com: Supabase, Groq HTTP, Stripe, Resend, Telegram

---

## CONTENT SEED — MANUAL ACTION (do not wait for Scenario A)

Ro manually inserts 3-5 rows into `lantern_stack_entries` NOW via Supabase dashboard.

**Required fields to set:**
```
tool_name: e.g. "Supabase"
tool_url: e.g. "https://supabase.com"
category: 'backend'
tier: 'freemium'
one_line_desc: ≤ 100 chars
halal_screened: true
ro_approved: true
published: true
tier_placement: 'both'
```

**Suggested seed tools (verified halal — no haram revenue streams):**
1. Supabase — backend/infra, freemium
2. Resend — infra, freemium  
3. Vercel — infra, freemium
4. Tailwind CSS — frontend, free + open-source
5. Make.com — productivity, freemium (mark `has_affiliate: false` for now)

---

## TIMELINE — REVISED (post-CTP)

| Day | Date | Target |
|---|---|---|
| 1 (done) | Jun 14 | Stripe ✅ |
| 2 (today) | Jun 15 | DB migrations ✅, SC restart, repo decision, DM Bilal, Beehiiv Boosts OFF, Telegram bot |
| 3 | Jun 16 | SC agents start scaffold + components + API routes, Make.com D-1 + A |
| 4 | Jun 17 | Frontend pages complete, manual content seed live, Make.com D-2 + B |
| 5 | Jun 18 | DNS + domain live, staging deploy, Make.com C, QA trust audit |
| 6 | Jun 19 | Bilal spotlight live, Stripe webhooks wired, cold-start outreach |
| 7 | Jun 20 | Final QA pass, editorial review, demo prep |
| 8 | Jun 21 | Alif presentation — domain live, 1 spotlight, stack seeded ✅ |

---

## DEFINITION OF DONE — JUN 21 ALIF DEMO

A successful demo requires ALL of these — no exceptions:

- [ ] `thelanterndaily.com` resolves in browser
- [ ] Homepage loads with real subscriber count (even if 1)
- [ ] At least 1 builder spotlight published on `/builders/[slug]`
- [ ] `/stack` shows at minimum 3 seeded tools with correct access gates
- [ ] Subscribe form works end-to-end (email → operator number → /confirmed)
- [ ] Stripe checkout page loads for monthly plan
- [ ] Beehiiv Boosts are OFF
- [ ] No YouTube embeds anywhere in the product
- [ ] Affiliate disclosures visible on any stack entry with `has_affiliate = true`

The following are NOT required for Jun 21 but should be in-flight:
- Make.com Scenario A fully automated (Week 2)
- Video corner live (Week 2)
- Referral commission payouts (Week 3)
- Semi-autonomous operation (Week 3-4)

---

## ESCALATION RULES

If SwarmClaw cannot be recovered by Jun 16 EOD:
→ ENGINEER mission must be executed manually by Ro or Bilal directly in VS Code
→ Scaffold takes ~2 hours manually vs SC async
→ This does not kill Jun 21 but kills most of the parallel build

If Bilal does not respond by Jun 17:
→ Ro submits own team member as "Builder #0001" (Keymon or Homira, with their consent)
→ The demo needs ONE real spotlight. It does not need to be Bilal.

If DNS propagation is slow (up to 48hr):
→ Use Vercel preview URL for Alif demo as fallback
→ Note to Alif: "Domain propagating — preview URL active"

---

## TRIGGER PHRASE

When SC is running and repo is confirmed, send this to SC-ENGINEER:

```
LANTERN-SCAFFOLD-APPROVED
Repo: [path or "fresh scaffold"]
Next.js version: 14 (App Router)
Run all MISSION 1-5 tasks from SWARMCLAW_LANTERN_GOLIVE_DISPATCH.md
DB is fully migrated. Do not run any SQL. Start with scaffold only.
```

When QA is ready:
```
LANTERN-QA-READY
Run MISSION 6 from SWARMCLAW_LANTERN_GOLIVE_DISPATCH.md
Staging URL: [vercel preview URL]
```
