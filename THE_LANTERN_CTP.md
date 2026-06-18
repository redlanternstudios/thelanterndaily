# THE LANTERN — COMPREHENSIVE CRITICAL THOUGHT PROCESS
Version: 1.0 | Date: 2026-06-13 | Status: PRE-BUILD REVIEW
TruthSerum Mode: ON

---

## PRODUCT POSITIONING (LOCKED)

**Name:** The Lantern
**Tagline:** The daily brief for Muslim founders and builders shaping the future of halal tech.
**Free tier:** Daily Dispatch — short takes, news, links
**Paid tier:** Weekly Brief — $15/month / $120/year — curated deep brief, premium analysis
**Operator Number:** Sequential subscriber identity assigned from subscriber #1. Displayed on /confirmed. Stored in Supabase. Live from day one.

---

## CLASSIFICATION KEY

| Label | Meaning |
|---|---|
| VERIFIED | Confirmed, real, exists |
| ASSUMPTION | Believed true, not confirmed |
| UNKNOWN | Needs answer before build |
| CONCEPT | Idea only, no implementation path yet |
| PROTOTYPE | Implementation path known, not built |
| PLAYBOOK | Documented, buildable, not yet built |
| PRODUCT-READY | Built, tested, control layers in place |

---

## RISK KEY

| Level | Meaning |
|---|---|
| LOW | Fails gracefully, reversible |
| MEDIUM | Causes data inconsistency or UX breaks if wrong |
| HIGH | Data loss, payment failure, irreversible state |

---

## OWNERSHIP KEY

| Owner | Role |
|---|---|
| RO | Human action only — dashboard, accounts, content |
| SC-FRONTEND | SwarmClaw FRONTEND agent |
| SC-BACKEND | SwarmClaw BACKEND agent |
| SC-BOTH | Coordinated frontend + backend |
| THIRD-PARTY | External platform handles it |

---

---

# SECTION 1 — PAGE ARCHITECTURE CTP

---

## PAGE 1: Homepage `/`

**Purpose:** Convert visitors to free subscribers. Communicate positioning clearly.

**Classification:** PLAYBOOK

**Components required:**
- Nav (logo, About, Archive, Shorts links + Subscribe CTA)
- Hero section (tagline + email capture form)
- Social proof strip (operator count, e.g. "Join 247 Operators")
- Recent issues preview (3 cards, free tier visible, paid teased)
- Recent Shorts preview (3 cards)
- Footer (brand, links, social)

**CTP:**
- Hero must convert. One job. Tagline + email field + Subscribe button. No carousel, no animation, no distractions.
- Social proof must be dynamic — operator count pulled from Supabase, not hardcoded.
- Issue preview cards must differentiate free vs. paid visually (lock icon, "Premium" badge).
- Nav subscribe CTA must scroll to hero form on mobile, open modal on desktop — decide before build.

**Risk:** LOW
**Owner:** SC-FRONTEND
**Dependencies:** Supabase subscriber count endpoint, issue data from Supabase
**Decision needed:** Nav subscribe — scroll to form OR modal? **Decision: scroll to form. Simpler, no modal state to manage.**

---

## PAGE 2: `/issues/[slug]`

**Purpose:** Render individual full issues. Gate premium content.

**Classification:** PLAYBOOK

**Components required:**
- Issue header (title, date, issue number, tier badge)
- Issue body (rich text, markdown rendered)
- Premium gate component (blur + CTA if user not paid subscriber)
- Related issues (2-3 cards at bottom)
- Subscribe CTA (for non-subscribers)

**CTP:**
- Premium gate must check Supabase subscriber tier, not just a cookie. Cookies can be bypassed.
- Free issues must be fully visible to all. Paid issues must show first ~200 words then gate.
- Slug must be generated from title at publish time — not editable after publish (SEO stability).
- Issue number must be sequential and stored in Supabase — not derived from slug.

**Risk:** MEDIUM (gate logic — wrong tier check = paid content exposed)
**Owner:** SC-BOTH (backend: tier check API; frontend: gate component)
**Dependencies:** Supabase subscriber auth, issue content table
**Decision needed:** Auth method — Supabase Auth session or token in URL? **Decision: Supabase Auth. Token-in-URL is insecure and leaks in share links.**

---

## PAGE 3: `/archive`

**Purpose:** Full issue history. Browsable, filterable.

**Classification:** PLAYBOOK

**Components required:**
- Search/filter bar (filter by tier: free/paid, date range)
- Issue card grid (paginated, 12 per page)
- Premium indicator on locked cards

**CTP:**
- Pagination must be server-side — client-side pagination of all issues will break at scale.
- Filter state must live in URL params for shareability (`/archive?tier=free&page=2`).
- Locked cards should still show title and date — teasing content drives upgrades.

**Risk:** LOW
**Owner:** SC-FRONTEND (display) + SC-BACKEND (pagination API)
**Dependencies:** Supabase issues table

---

## PAGE 4: `/about`

**Purpose:** Explain The Lantern, its mission, the team, and the Muslim tech angle.

**Classification:** PLAYBOOK

**Components required:**
- Mission statement section
- Who it's for section
- Team/founder section (Ro, Bilal mentioned as co-signers of this community)
- Subscribe CTA

**CTP:**
- This page carries the authenticity weight. Generic "about us" copy will kill community trust.
- Must explicitly name the Muslim tech community as the audience — no hedging.
- Ro writes this. Not SwarmClaw. The voice must be real.

**Risk:** LOW
**Owner:** SC-FRONTEND (page build) | RO (copy)
**Dependencies:** None technical

---

## PAGE 5: `/confirmed`

**Purpose:** Post-subscribe confirmation. Assigns and displays Operator Number.

**Classification:** PLAYBOOK — most important page for community identity.

**Components required:**
- Operator Number display (large, prominent — "You are Operator #0042")
- Welcome message (what to expect, free vs. paid)
- Share prompt ("Tell another Muslim builder — share your number")
- Next step CTA (upgrade to paid if free subscriber)

**CTP:**
- Operator Number must be assigned BEFORE this page loads — not async. If the number isn't ready, the page fails.
- Assignment flow: subscribe form submit → Beehiiv webhook → n8n → assign next sequential number in Supabase → return to /confirmed with number in URL param.
- URL param: `/confirmed?operator=0042` — read on page load.
- Race condition risk: two simultaneous subscribes could get the same number. Supabase row-level locking on the assignment query required.
- Share prompt must pre-fill a shareable message: "I just became Operator #0042 at The Lantern — the Muslim tech brief. Join the community: [URL]"

**Risk:** HIGH (operator number uniqueness, race condition)
**Owner:** SC-BOTH
**Dependencies:** Supabase subscriber table, n8n webhook flow, Beehiiv webhook

---

## PAGE 6: `/shorts`

**Purpose:** Free daily quick takes. Top-of-funnel content. Drives discoverability and subscriptions.

**Classification:** PLAYBOOK

**Components required:**
- Chronological feed of Shorts cards
- Each card: title, 1-3 paragraph body, date, tag (category)
- Load more / infinite scroll (no pagination UI)
- Subscribe CTA between every 5 shorts

**CTP:**
- Shorts are always free. No gate. Ever. They are the discovery surface.
- Subscribe CTA injected every 5 items — not at bottom only. Readers who never scroll to bottom still see it.
- Shorts use same data table as issues with `content_type = 'short'` — no separate table.
- Infinite scroll preferred over pagination for this content type — shorts are scroll content.

**Risk:** LOW
**Owner:** SC-FRONTEND
**Dependencies:** Supabase issues table (content_type field)

---

---

# SECTION 2 — FEATURE CTP

---

## FEATURE 1: Free Subscribe

**What it does:** Captures email, creates subscriber in Beehiiv, triggers n8n flow to assign operator number and store in Supabase.

**Classification:** PLAYBOOK

**Flow:**
1. User enters email on homepage form
2. POST to Next.js API route `/api/subscribe`
3. API route calls Beehiiv API to create subscriber
4. Beehiiv webhook fires to n8n
5. n8n assigns next operator number (Supabase transaction)
6. n8n stores subscriber record in Supabase
7. n8n triggers Resend welcome email
8. API route redirects to `/confirmed?operator=[number]`

**CTP:**
- Step 3 and step 4 are NOT synchronous. Beehiiv webhook is async. This means /confirmed cannot wait for n8n — the operator number must be assigned in the API route itself, not in n8n.
- Revised flow: API route → Beehiiv subscribe → assign operator number in Supabase directly → redirect to /confirmed → n8n webhook handles email async.
- Duplicate subscribe: if email already exists in Beehiiv, do NOT assign a second operator number. Check Supabase first.
- Email validation: client-side AND server-side. Invalid emails break the Beehiiv API call.

**Risk:** HIGH (operator number assignment, duplicate prevention)
**Owner:** SC-BACKEND (API route, Supabase logic) | SC-FRONTEND (form)
**Failure states:**
- Beehiiv API down → store in Supabase queue, retry
- Duplicate email → return existing operator number, redirect to /confirmed
- Supabase write fails → do not redirect, show error, do not assign number

---

## FEATURE 2: Paid Subscribe

**What it does:** Upgrades subscriber to paid tier via Stripe. Updates Supabase tier field.

**Classification:** PLAYBOOK

**Flow:**
1. User clicks upgrade CTA
2. Redirect to Stripe Checkout (monthly or annual)
3. Stripe webhook fires on successful payment
4. n8n receives webhook, updates subscriber tier in Supabase to 'paid'
5. Resend sends premium welcome email

**CTP:**
- Stripe webhook must be verified (Stripe-Signature header). Unverified webhooks = security hole.
- Supabase tier update must be atomic — not two separate queries.
- Failed payment: subscriber stays 'free'. No partial states.
- Cancellation flow: Stripe cancellation webhook → update tier to 'free' in Supabase → send churn email.
- Annual vs monthly: two Stripe products, both map to same 'paid' tier in Supabase. Price ID stored on subscriber record for renewal tracking.

**Risk:** HIGH (payment, tier state, cancellation)
**Owner:** SC-BACKEND (Stripe webhook, Supabase update) | SC-FRONTEND (upgrade CTA, Stripe redirect)
**Failure states:**
- Stripe webhook fails → Stripe auto-retries 3x. Log all failures to Sentry.
- Supabase update fails → subscriber paid in Stripe but 'free' in app → manual reconciliation needed. Alert via Sentry.

---

## FEATURE 3: Operator Number Assignment

**What it does:** Assigns a unique sequential number to every new subscriber.

**Classification:** PLAYBOOK

**Data model:**
```sql
subscribers (
  id uuid primary key,
  email text unique not null,
  operator_number integer unique not null,
  tier text default 'free', -- 'free' | 'paid'
  beehiiv_id text,
  stripe_customer_id text,
  price_id text,
  created_at timestamptz default now()
)
```

**Assignment logic:**
```sql
-- Atomic assignment using SELECT FOR UPDATE
INSERT INTO subscribers (email, operator_number)
VALUES ($email, (SELECT COALESCE(MAX(operator_number), 0) + 1 FROM subscribers FOR UPDATE))
```

**CTP:**
- MAX + 1 with FOR UPDATE prevents race conditions between concurrent subscribes.
- Operator numbers start at 1. Display format: zero-padded to 4 digits (0001, 0042, 0247).
- Numbers are permanent. Even if subscriber unsubscribes, their number is retired — never reassigned.
- Number is displayed publicly on /confirmed. It is NOT a security token.

**Risk:** HIGH (uniqueness guarantee, race condition)
**Owner:** SC-BACKEND
**Dependencies:** Supabase, API route

---

## FEATURE 4: Issue Publishing

**What it does:** Publishes a new issue (free or premium) to the web and sends via Beehiiv.

**Classification:** CONCEPT → needs admin interface or CMS decision

**CTP:**
- Who publishes issues? Ro manually, or a CMS?
- Options: (A) Markdown files in repo → deploy triggers publish. (B) Supabase admin table + simple form. (C) Third-party CMS (Sanity, Contentful). (D) Beehiiv as CMS, sync to Supabase.
- Option D is most pragmatic for v1 — write in Beehiiv (which you're using anyway for email), webhook syncs to Supabase for web display.

**Decision: Option D — Beehiiv is the CMS. Beehiiv post published → webhook → n8n → sync to Supabase issues table → web displays it.**

**Risk:** MEDIUM (Beehiiv webhook reliability, content sync)
**Owner:** SC-BACKEND (sync flow) | RO (writing content in Beehiiv)
**Failure states:**
- Beehiiv webhook fails → issue in Beehiiv but not on web. n8n retry handles this.
- Content format mismatch → Beehiiv HTML → needs sanitization before storing in Supabase.

---

## FEATURE 5: Shorts Publishing

**What it does:** Publishes short-form content to /shorts feed.

**Classification:** PLAYBOOK

**CTP:**
- Same flow as issues, `content_type = 'short'` in Supabase.
- Shorts are always free, always published to web immediately.
- Shorts do NOT get sent via Beehiiv email (they're web-only quick takes).
- Shorts can be written directly in Supabase or via a simple admin form — no Beehiiv needed.

**Decision: Shorts are Supabase-native. Write via a simple admin form at `/admin/shorts` (auth-gated). No CMS overhead.**

**Risk:** LOW
**Owner:** SC-BOTH

---

## FEATURE 6: Welcome Email Sequence

**What it does:** Sends onboarding emails after subscribe.

**Classification:** PLAYBOOK

**Sequence:**
- Email 1 (immediate): "You are Operator #XXXX. Welcome to The Lantern." — sent via Resend
- Email 2 (Day 2): "Here's what Muslim founders are building" — first issue teaser
- Email 3 (Day 5): Upgrade prompt for free subscribers

**CTP:**
- Resend handles transactional. Beehiiv handles broadcast (issues, newsletters).
- Sequence lives in n8n as a timed flow triggered by new subscriber event.
- Paid subscribers skip Email 3 (upgrade prompt).
- Unsubscribe from any email must be honored immediately — n8n checks subscriber status before each send.

**Risk:** MEDIUM (unsubscribe compliance, CAN-SPAM)
**Owner:** SC-BACKEND (n8n flows) | RO (email copy)

---

---

# SECTION 3 — COMPONENT CTP

| Component | Purpose | Owner | Risk | Notes |
|---|---|---|---|---|
| Nav | Global navigation | SC-FRONTEND | LOW | Logo, links, Subscribe CTA |
| Subscribe Form | Email capture | SC-BOTH | MEDIUM | Connects to /api/subscribe |
| Issue Card | Display issue preview | SC-FRONTEND | LOW | Free/paid badge, lock icon |
| Shorts Card | Display short take | SC-FRONTEND | LOW | No gate, always visible |
| Premium Gate | Blur + CTA on paid content | SC-BOTH | HIGH | Checks Supabase tier |
| Operator Number Display | Show #XXXX on /confirmed | SC-FRONTEND | MEDIUM | Read from URL param |
| Social Proof Strip | Live operator count | SC-BOTH | LOW | Supabase count query |
| Footer | Links, brand, legal | SC-FRONTEND | LOW | Privacy policy link required |
| Upgrade CTA | Stripe redirect button | SC-BOTH | HIGH | Stripe Checkout integration |
| Share Prompt | Pre-filled share on /confirmed | SC-FRONTEND | LOW | Navigator.share or clipboard |
| Admin Form (Shorts) | Write + publish shorts | SC-BOTH | MEDIUM | Auth-gated, Supabase write |

---

---

# SECTION 4 — INTEGRATION CTP

---

## BEEHIIV

**Role:** Newsletter platform + CMS for issues. Subscriber management for email list.
**What it owns:** Email sends, subscriber list, issue content (source of truth for issues)
**What it does NOT own:** Operator numbers, tier state, web display
**Risk:** MEDIUM — Beehiiv webhook reliability is not guaranteed. Build retry logic in n8n.
**Owner:** RO (account, paid tier setup) | SC-BACKEND (webhook consumption)
**Ro action required:** Enable paid subscriptions in Beehiiv dashboard. Set $15/mo + $120/yr. Gate Weekly Brief.
**VERIFIED:** Beehiiv has a partner program (beehiiv.com/partners)

---

## STRIPE

**Role:** Payment processor for paid subscriptions.
**What it owns:** Payment state, billing, invoices, cancellations
**What it does NOT own:** Tier state in app (that lives in Supabase, synced via webhook)
**Risk:** HIGH — payment flows require webhook verification, idempotency, failure handling
**Owner:** RO (Stripe account setup, product creation) | SC-BACKEND (webhook handler)
**Products to create in Stripe:**
- The Lantern Monthly — $15/month
- The Lantern Annual — $120/year
**Ro action required:** Create both products in Stripe dashboard before SC-BACKEND builds webhook handler.

---

## SUPABASE

**Role:** Primary database. Stores subscribers, operator numbers, tier state, issues (synced from Beehiiv), shorts.
**What it owns:** All persistent application state
**Risk:** HIGH — this is the source of truth for operator numbers and tier state
**Owner:** RO (project creation, env vars) | SC-BACKEND (schema, queries, RLS)
**Schema tables:**
- `subscribers` — email, operator_number, tier, beehiiv_id, stripe_customer_id
- `issues` — title, slug, content, published_at, tier, content_type, issue_number, beehiiv_post_id
**Ro action required:** Create new Supabase project, copy 4 env vars to .env.local

---

## RESEND

**Role:** Transactional email. Welcome sequence, operator number confirmation.
**What it owns:** Transactional sends only. NOT broadcasts (that's Beehiiv).
**Risk:** LOW — transactional emails are low-volume, well-documented API
**Owner:** SC-BACKEND (API integration in n8n)
**ASSUMPTION:** Resend account exists or needs to be created. Verify before build.
**Affiliate:** resend.com/affiliates — apply immediately

---

## N8N

**Role:** Automation and orchestration. Connects all platforms.
**Flows required:**
1. New Beehiiv subscriber → operator number assignment → Supabase write → Resend welcome
2. Beehiiv issue published → sync to Supabase issues table
3. Stripe payment success → update Supabase tier to 'paid' → Resend premium welcome
4. Stripe cancellation → update Supabase tier to 'free'
5. Welcome sequence (Day 2, Day 5 emails via Resend)
**Risk:** MEDIUM — n8n flows require retry logic and failure alerting
**Owner:** SC-BACKEND
**Ro action required:** Ensure n8n instance is running (localhost or cloud)

---

## POSTHOG

**Role:** Product analytics. Track key conversion events.
**Events to instrument:**
- `subscribe_free` — new free subscriber
- `subscribe_paid` — new paid subscriber
- `issue_viewed` — issue page load
- `gate_hit` — user hit premium gate
- `upgrade_clicked` — upgrade CTA clicked
- `shorts_viewed` — shorts page load
**Risk:** LOW — PostHog is additive, no critical path dependency
**Owner:** SC-BACKEND (event calls in API routes) | SC-FRONTEND (client-side events)

---

## SENTRY

**Role:** Error tracking. Alert on payment failures, webhook failures, Supabase write errors.
**Critical alerts:**
- Stripe webhook verification failure
- Supabase tier update failure post-payment
- Operator number assignment failure
- n8n flow failure (webhook to Sentry)
**Risk:** LOW — additive, but critical alerts must be wired before launch
**Owner:** SC-BACKEND

---

## VERCEL

**Role:** Hosting and deployment. Next.js runs here.
**Risk:** LOW
**Owner:** RO (account, domain connection) | SC-BACKEND (env var setup)
**Affiliate:** vercel.com/partners — apply immediately

---

---

# SECTION 5 — AFFILIATE MARKETING CTP

| Program | URL | Revenue model | Approval time | Ro action | Status |
|---|---|---|---|---|---|
| Beehiiv Partners | beehiiv.com/partners | Referral commission | 1-2 weeks | Apply immediately | PENDING |
| n8n Partners | n8n.io/partners | Referral commission | 1-2 weeks | Apply immediately | PENDING |
| Supabase Partners | supabase.com/partners | Referral commission | 1-2 weeks | Apply immediately | PENDING |
| Resend Affiliates | resend.com/affiliates | Referral commission | 1-2 weeks | Apply immediately | PENDING |
| Vercel Partners | vercel.com/partners | Referral commission | 1-2 weeks | Apply immediately | PENDING |

**CTP on affiliates:**
- These are passive income from day 1 — apply before you need them, not after.
- Affiliate links must be used in The Lantern content naturally — "We run on Beehiiv, here's why" style. Not banner ads.
- Islamic finance angle: ensure affiliate products are halal-compatible. Stripe, Vercel, Supabase — all fine. No interest-bearing or gambling-adjacent products.
- Track affiliate conversions in PostHog with UTM params.

---

---

# SECTION 6 — DATA MODEL CTP

```sql
-- SUBSCRIBERS
CREATE TABLE subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  operator_number integer UNIQUE NOT NULL,
  tier text NOT NULL DEFAULT 'free', -- 'free' | 'paid'
  beehiiv_id text,
  stripe_customer_id text,
  stripe_price_id text,
  subscribed_at timestamptz DEFAULT now(),
  upgraded_at timestamptz,
  cancelled_at timestamptz
);

-- ISSUES + SHORTS (unified table)
CREATE TABLE issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL, -- sanitized HTML from Beehiiv or direct input
  excerpt text, -- first 200 words for gate/preview
  published_at timestamptz,
  tier text NOT NULL DEFAULT 'free', -- 'free' | 'paid'
  content_type text NOT NULL DEFAULT 'issue', -- 'issue' | 'short'
  issue_number integer, -- NULL for shorts
  beehiiv_post_id text, -- NULL for shorts
  created_at timestamptz DEFAULT now()
);

-- OPERATOR NUMBER SEQUENCE (via MAX + FOR UPDATE in application layer)
-- No separate sequence table needed — derive from subscribers table
```

**RLS Rules:**
- Issues: free issues readable by all. Paid issues readable only by authenticated paid subscribers.
- Subscribers: readable only by authenticated user matching their own row. Admin role can read all.

---

---

# SECTION 7 — SWARMCLAW MISSION MAP

## SC-FRONTEND MISSION

**Deliverables:**
- `/` — Homepage with hero, social proof, issue preview, shorts preview, footer
- `/archive` — Paginated issue grid with filter
- `/issues/[slug]` — Issue render with premium gate
- `/about` — Mission page (Ro provides copy)
- `/confirmed` — Operator number display + share prompt
- `/shorts` — Chronological shorts feed with inline CTAs
- All shared components: Nav, Footer, Issue Card, Shorts Card, Subscribe Form, Premium Gate, Upgrade CTA, Operator Number Display

**Brief for FRONTEND:**
- Stack: Next.js App Router + Tailwind
- Design language: The Lantern brand (to be defined — default: clean, dark, gold accent)
- Subscribe form POSTs to `/api/subscribe`
- Premium gate checks `/api/check-tier` (returns tier for authenticated user)
- Operator number read from URL param `?operator=XXXX` on /confirmed
- All pages server-rendered where possible (SEO)

---

## SC-BACKEND MISSION

**Deliverables:**
- Supabase schema (run `schema.sql`)
- `/api/subscribe` — handles free subscribe, operator assignment, Beehiiv call
- `/api/check-tier` — returns subscriber tier for authenticated user
- `/api/webhooks/stripe` — handles payment success, cancellation
- `/api/webhooks/beehiiv` — handles new issue published (sync to Supabase)
- n8n flows: welcome sequence (Day 2, Day 5), issue sync, Stripe → Supabase tier update
- PostHog instrumentation on all API routes
- Sentry alerts on all critical failure paths
- Resend integration for transactional emails

---

## RO MANUAL ACTIONS (in order)

| # | Action | Time | Platform | Blocks |
|---|---|---|---|---|
| 1 | Enable Beehiiv paid tier ($15/mo + $120/yr) | 5 min | Beehiiv dashboard | Stripe integration |
| 2 | Create Supabase project for The Lantern | 5 min | supabase.com | Schema, all backend |
| 3 | Copy 4 Supabase env vars to .env.local | 2 min | Terminal | All backend queries |
| 4 | Create Stripe products (monthly + annual) | 10 min | Stripe dashboard | Paid subscribe feature |
| 5 | Apply to all 5 affiliate programs | 20 min | See table above | Nothing (async) |
| 6 | Write /about page copy | 30 min | Anywhere | SC-FRONTEND /about |
| 7 | Write first issue in Beehiiv | 60 min | Beehiiv | Issue sync flow test |
| 8 | Connect domain to Vercel | 10 min | Vercel dashboard | Launch |

---

---

# SECTION 8 — BUILD ORDER

## Phase 1 — Foundation (Ro does these first, unlocks everything)
1. Ro: Supabase project created + env vars in .env.local
2. Ro: Stripe products created
3. Ro: Beehiiv paid tier enabled
4. SC-BACKEND: Run schema.sql, confirm tables exist

## Phase 2 — Backend core (SC-BACKEND, unblocked after Phase 1)
5. SC-BACKEND: /api/subscribe with operator assignment
6. SC-BACKEND: /api/webhooks/stripe
7. SC-BACKEND: /api/check-tier
8. SC-BACKEND: n8n welcome email flows (Resend)
9. SC-BACKEND: PostHog + Sentry wired

## Phase 3 — Frontend (SC-FRONTEND, can start parallel to Phase 2)
10. SC-FRONTEND: Homepage
11. SC-FRONTEND: /confirmed
12. SC-FRONTEND: /shorts
13. SC-FRONTEND: /issues/[slug] with gate
14. SC-FRONTEND: /archive
15. SC-FRONTEND: /about (Ro provides copy)

## Phase 4 — Sync flows (SC-BACKEND, after Phase 2)
16. SC-BACKEND: /api/webhooks/beehiiv (issue sync)
17. SC-BACKEND: n8n Beehiiv → Supabase issue sync flow

## Phase 5 — Launch
18. Ro: Connect domain to Vercel
19. Ro: Write first issue in Beehiiv
20. Ro: Share with Bilal, personal network — first 10-20 subscribers

---

---

# SECTION 9 — OPEN QUESTIONS / BLOCKERS

| # | Question | Owner | Priority |
|---|---|---|---|
| 1 | Does a Resend account exist? | RO | HIGH — blocks welcome email |
| 2 | Is n8n running (local or cloud)? | RO | HIGH — blocks all automation flows |
| 3 | What is The Lantern domain name? | RO | MEDIUM — needed for Vercel, email links |
| 4 | Brand design (colors, logo)? | RO | MEDIUM — needed for SC-FRONTEND |
| 5 | Admin auth for /admin/shorts — Supabase Auth or simple password? | RO | LOW — can be simple env var password for v1 |

---

---

# SECTION 10 — WHAT THIS IS NOT (SCOPE GUARDRAILS)

These are explicitly OUT of v1 scope:

- Subscriber portal / account dashboard
- Comments or community features
- Search across issues
- RSS feed
- Mobile app
- Podcast
- Arabic language support
- Social media auto-posting

Build these after 50 real subscribers. Not before.

---

*Document owner: Ro / RedLantern Studios*
*Next review: After Phase 1 completion*
