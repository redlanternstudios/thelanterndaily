# SWARMCLAW DISPATCH — THE LANTERN DAILY: WEEKLY TECH STACK + VIDEO + OPERATOR SPOTLIGHT
**Mission ID:** LANTERN-STACK-V1
**Date:** 2026-06-14
**Status:** AWAITING RO CONFIRMATION — Do not execute until confirmed
**Integrates With:** SWARMCLAW_DISPATCH_LANTERN_FRONTEND.md + SWARMCLAW_DISPATCH_LANTERN_BACKEND.md

---

## MISSION SUMMARY

Extend The Lantern Daily with three new recurring content features:
1. **Weekly Tech Stack** — hybrid free/paid (3 tools free, full breakdown paid)
2. **Video Corner** — Muslim tech YouTube channels as linked cards (NEVER embedded)
3. **Operator Spotlight** — real builder setups with affiliate referral revenue share
4. **Muslim Platform Cross-Promo** — editorial-first, affiliate where available

All new content flows through the existing 6-gate trust architecture defined in LANTERN_DATA_TRUST_CTP.md.

---

## AGENT ASSIGNMENTS

### AGENT: BUILDER (Primary — Frontend)
**Mission:** Build 5 new UI components + 2 new pages

#### Components to Build

**1. VideoCard**
```
File: components/lantern/VideoCard.tsx
Props:
  - videoTitle: string
  - videoUrl: string (YouTube URL — opens in new tab, NEVER embedded)
  - channelName: string
  - channelUrl: string
  - thumbnailUrl: string
  - channelType: 'MUSLIM_RUN' | 'OPERATOR_RECOMMENDED' | 'HALAL_SAFE'
  - editorialNote?: string
  - contentType: 'tutorial' | 'interview' | 'tool-review' | 'founder-story'

Design rules:
  - Dark card (#0D0F14), border (#2A2D35)
  - Thumbnail with play overlay (static — clicking opens YouTube link in new tab)
  - Channel type badge: MUSLIM-RUN = green (#2D7A4F), OPERATOR-RECOMMENDED = blue (#6070D0), HALAL-SAFE = amber (#C47A2A)
  - NO <iframe>. NO embed. NO autoplay. Link card only.
  - "Watch on YouTube →" CTA — clear external link icon
  - Category label in red small caps (consistent with existing article cards)
```

**2. StackToolCard (Free)**
```
File: components/lantern/StackToolCard.tsx (variant: 'free')
Props:
  - toolName: string
  - toolUrl: string
  - category: 'ai' | 'infra' | 'frontend' | 'backend' | 'design' | 'productivity' | 'open-source'
  - tier: 'free' | 'freemium' | 'paid'
  - monthlyCostUsd?: number
  - isOpenSource: boolean
  - oneLineDesc: string (≤ 100 chars)
  - variant: 'free' | 'paid'

Free variant shows: name, category badge, one-line desc, tier/cost, external link
NO affiliate links on free variant
Paid variant shows: all free fields + full breakdown + affiliate link + "(affiliate)" disclosure
Paid variant: gate with subscription check — show lock icon if not paid subscriber
```

**3. RepoCard**
```
File: components/lantern/RepoCard.tsx
Props:
  - repoName: string
  - repoUrl: string
  - stars: number
  - language: string
  - license: string
  - oneLineDesc: string
  - builderSafeRating: { purpose: boolean, maintainer: boolean, license: boolean, active: boolean }

Design: GitHub-dark card feel within Lantern dark system
Show: repo name, star count, language tag, license badge
Builder-safe rating: 4 green checkmarks or red X per criterion
"View on GitHub →" external link
```

**4. OperatorSpotlightCard**
```
File: components/lantern/OperatorSpotlightCard.tsx
Props:
  - operatorNumber: number
  - displayName: string
  - attributionType: 'NAMED' | 'ROLE_BASED'
  - roleDescription: string
  - productsBuilding: string[]
  - stackSummary: { tool: string, purpose: string, tier: string }[] (max 6 shown)
  - quote: string
  - spotlightSlug: string
  - affiliateCode: string
  - affiliateCta: string (e.g. "Join via [Operator Name]'s link" — dynamically populated from display_name)

Design:
  - Operator Number badge: large, red (#D92532), monospaced
  - Stack chips: tool name pills in dark bg
  - Quote in italics, cream color
  - Affiliate CTA: clearly labeled "(referral — builder earns commission)"
  - Gold accent for operator attribution (Scholar Gold #B8922A — signals trusted community member)
```

**5. PlatformCrossPromoCard**
```
File: components/lantern/PlatformCrossPromoCard.tsx
Props:
  - platformName: string
  - platformUrl: string
  - category: string
  - isRlProduct: boolean
  - featureType: 'editorial' | 'sponsored' | 'affiliate' | 'co-promo'
  - oneLineDesc: string
  - affiliateLink?: string
  - ctaLabel: string

Design rules:
  - is_rl_product = true → show "REDLANTERN PRODUCT" badge (red, unmissable)
  - featureType = 'affiliate' → show "(affiliate)" label on CTA button
  - featureType = 'sponsored' → show "SPONSORED" label (same as existing sponsored badge)
  - featureType = 'editorial' → no badge (pure editorial, no financial relationship)
```

#### Pages to Build

**1. /stack**
```
File: app/stack/page.tsx
Features:
  - Searchable grid of all stack entries
  - Filter by: category, tier (free/paid/open-source), featured week
  - Free teaser cards visible to all
  - Full breakdown locked: show SubscriptionGate component if not paid subscriber
  - Top section: "This Week's Quick Stack" (3 free teaser cards, refreshed Thursdays)
  - Below fold: "Full Stack Archive" (searchable)
  - SEO: "Best tools for Muslim founders and indie builders"
```

**2. /operators**
```
File: app/operators/page.tsx
Features:
  - Grid of OperatorSpotlightCards (archive of all spotlights)
  - Filter by: products building, stack size
  - Top CTA: "Submit Your Stack →" (links to form)
  - Each card links to /operators/[slug] (full spotlight article)
  - Referral CTA visible on every card
```

---

### AGENT: ENGINEER (Primary — Backend + Database)
**Mission:** Migrate 5 new tables, build 3 new Make.com scenarios

#### Database Migrations

Run in order:

**Migration 1: lantern_stack_entries**
```sql
CREATE TABLE lantern_stack_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name text NOT NULL,
  tool_url text NOT NULL,
  category text CHECK (category IN ('ai','infra','frontend','backend','design','productivity','open-source')),
  tier text CHECK (tier IN ('free','freemium','paid')),
  monthly_cost_usd numeric,
  is_open_source boolean DEFAULT false,
  repo_url text,
  license text,
  one_line_desc text CHECK (length(one_line_desc) <= 100),
  full_breakdown text,
  avoid_reason text,
  operator_context text,
  halal_screened boolean DEFAULT false,
  halal_notes text,
  has_affiliate boolean DEFAULT false,
  affiliate_link text,
  affiliate_disclosure text DEFAULT '(affiliate — The Lantern earns a commission)',
  featured_week date,
  tier_placement text CHECK (tier_placement IN ('free_teaser','paid_full','both')),
  published boolean DEFAULT false,
  ro_approved boolean DEFAULT false,
  ro_approved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- RLS: public read (published = true, tier_placement = 'free_teaser')
-- Paid read: published = true (requires subscription check in app layer)
-- Write: service_role only
```

**Migration 2: lantern_video_channels (whitelist)**
```sql
CREATE TABLE lantern_video_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_name text NOT NULL UNIQUE,
  channel_url text NOT NULL,
  youtube_channel_id text,
  channel_type text CHECK (channel_type IN ('MUSLIM_RUN','HALAL_SAFE','OPERATOR_RECOMMENDED')),
  verified_by text DEFAULT 'ro',
  verified_at timestamptz DEFAULT now(),
  active boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now()
);
```

**Migration 3: lantern_video_features**
```sql
CREATE TABLE lantern_video_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_title text NOT NULL,
  video_url text NOT NULL CHECK (video_url NOT LIKE '%embed%'), -- HARD BLOCK: no embed URLs
  channel_id uuid REFERENCES lantern_video_channels(id),
  thumbnail_url text,
  content_type text CHECK (content_type IN ('tutorial','interview','tool-review','founder-story')),
  content_summary text,
  why_featured text,
  featured_date date,
  published boolean DEFAULT false,
  ro_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- CRITICAL CONSTRAINT: enforce no embed URLs at DB level
-- video_url must match pattern: youtube.com/watch?v= or youtu.be/ (NOT youtube.com/embed/)
```

**Migration 4: lantern_user_spotlights** *(renamed from operator_spotlights — Ummah-first, community-focused)*
```sql
CREATE TABLE lantern_user_spotlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_number integer UNIQUE,
  display_name text NOT NULL,
  attribution_type text CHECK (attribution_type IN ('NAMED','ROLE_BASED')) DEFAULT 'NAMED',
  role_description text,
  location text,
  products_building text[],
  stack_summary jsonb,
  quote text,
  spotlight_slug text UNIQUE,
  affiliate_code text UNIQUE DEFAULT substring(gen_random_uuid()::text, 1, 8),
  revenue_share_pct numeric DEFAULT 30,
  spotlight_published_date date,
  consent_confirmed boolean DEFAULT false,
  consent_date timestamptz,
  -- Paid upgrade fields (spotlight_tier = 'paid' unlocks additive features)
  spotlight_tier text DEFAULT 'free' CHECK (spotlight_tier IN ('free','paid')),
  stripe_payment_id text,
  paid_at timestamptz,
  paid_amount_usd numeric DEFAULT 0,
  newsletter_featured boolean DEFAULT false,
  newsletter_featured_date date,
  social_post_sent boolean DEFAULT false,
  social_post_date date,
  homepage_featured boolean DEFAULT false,
  homepage_featured_start date,
  homepage_featured_end date,
  builder_badge_generated boolean DEFAULT false,
  builder_badge_url text,
  -- Status lifecycle
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','published')),
  created_at timestamptz DEFAULT now()
);
-- NOTE: free tier spotlights are NEVER degraded when paid tier exists. Paid = additive only.
```

**Migration 5: lantern_spotlight_referrals**
```sql
CREATE TABLE lantern_spotlight_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  spotlight_id uuid REFERENCES lantern_user_spotlights(id),
  subscriber_email text,
  subscription_type text CHECK (subscription_type IN ('monthly','annual','lifetime')),
  subscription_value_usd numeric,
  commission_amount_usd numeric,
  stripe_subscription_id text,
  commission_paid boolean DEFAULT false,
  commission_paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

**Migration 6: lantern_platform_crosspromo**
```sql
CREATE TABLE lantern_platform_crosspromo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name text NOT NULL,
  platform_url text NOT NULL,
  category text,
  is_rl_product boolean DEFAULT false,
  feature_type text CHECK (feature_type IN ('editorial','sponsored','affiliate','co-promo')),
  affiliate_code text,
  affiliate_link text,
  commission_rate numeric,
  halal_screened boolean DEFAULT false,
  halal_screen_date date,
  halal_screen_notes text,
  editorial_notes text,
  feature_count integer DEFAULT 0,
  total_clicks integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- CONSTRAINT: cannot set active = true unless halal_screened = true
-- Enforce via trigger:
CREATE OR REPLACE FUNCTION check_halal_screen_before_activate()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.active = true AND NEW.halal_screened = false THEN
    RAISE EXCEPTION 'Cannot activate platform cross-promo without halal screening. Set halal_screened = true first.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_halal_screen
BEFORE INSERT OR UPDATE ON lantern_platform_crosspromo
FOR EACH ROW EXECUTE FUNCTION check_halal_screen_before_activate();
```

**Migration 7: lantern_affiliate_clicks**
```sql
CREATE TABLE lantern_affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text CHECK (source_type IN ('platform_crosspromo','stack_entry','user_spotlight')),
  source_id uuid,
  affiliate_link text,
  utm_source text,
  utm_medium text DEFAULT 'lantern',
  utm_campaign text,
  converted boolean DEFAULT false,
  conversion_value_usd numeric,
  clicked_at timestamptz DEFAULT now()
);
```

#### Make.com Scenario Specs

**Scenario A: Tech Stack Curator (NEW)**
```
Name: Lantern — Tech Stack Daily Curate
Trigger: Schedule → Daily, 6:00am MST

Module 1: HTTP Request
  URL: https://api.github.com/search/repositories
  Params: q=topic:ai+topic:nextjs+topic:supabase&sort=stars&per_page=20
  Auth: GitHub token

Module 2: HTTP Request
  URL: https://hacker-news.firebaseio.com/v0/topstories.json
  Method: GET
  (Follow up: fetch top 20 story IDs, then fetch each story for Show HN / Ask HN filter)

Module 3: RSS Feed Reader
  URL: https://www.producthunt.com/feed

Module 4: Groq AI (llama-4-scout)
  Prompt: "Score this tool/repo for solo builder and small team relevance (1-10).
  Also: does this serve any prohibited purpose (gambling, adult, weapons, surveillance)? Answer YES/NO.
  Respond with JSON: { relevance_score: N, prohibited: bool, reason: string }"
  Input: title + description for each item

Module 5: Router
  Path A: relevance_score ≥ 7 AND prohibited = false → INSERT to lantern_stack_entries (status: pending)
  Path B: relevance_score < 7 OR prohibited = true → log and skip

Module 6 (Weekly — Thursday trigger separately): 
  Pull top 3 free_teaser items from that week's queue → compile Quick Stack
  Pull top 8-12 paid_full items → compile Full Stack Breakdown
  Telegram notification to Ro: "Stack queue ready: [N] tools pending approval"
```

**Scenario B: Live User Spotlight Referral Tracker (NEW)**
```
Name: Lantern — Spotlight Affiliate Tracker
Trigger: Webhook from Next.js /api/subscribe (when ?ref= param is present)

Module 1: Parse webhook payload
  Extract: ref_code, email, subscription_type, subscription_value_usd

Module 2: Supabase SELECT
  Query: SELECT id, revenue_share_pct, display_name FROM lantern_user_spotlights WHERE affiliate_code = ref_code

Module 3: Router
  Path A: spotlight found → INSERT to lantern_spotlight_referrals
  Path B: spotlight not found → log error, send Telegram alert to Ro

Module 4: Calculate commission
  commission = subscription_value_usd × (revenue_share_pct / 100)

Module 5: Send email via Resend
  To: featured operator's email
  Subject: "You earned $[commission] from a new Lantern subscriber!"
  Body: operator-name, subscriber count milestone, commission total to date

Module 6: Telegram notification to Ro
  "[Operator Name] referral: new subscriber via spotlight. Commission: $[amount]"
```

**Scenario C: Platform Cross-Promo Weekly Feature (NEW)**
```
Name: Lantern — Platform Cross-Promo Scheduler
Trigger: Schedule → Weekly Friday, 9:00am MST

Module 1: Supabase SELECT
  Query: SELECT * FROM lantern_platform_crosspromo 
  WHERE halal_screened = true AND active = true
  ORDER BY feature_count ASC, created_at ASC
  LIMIT 1

Module 2: Router
  Path A: Platform found → build content card → POST to lantern_shorts table (type: 'platform_promo')
  Path B: No platform found → Telegram alert to Ro "No cross-promo platform queued for this week"

Module 3: Increment feature_count
  UPDATE lantern_platform_crosspromo SET feature_count = feature_count + 1 WHERE id = platform.id
```

**Scenario D-1: Live User Spotlight Intake (NEW)**
```
Name: Lantern — Spotlight Intake
Trigger: Webhook → form submission (Tally or Next.js /api/spotlight-submit)

Stripe product for upgrade: prod_UhmHfqAyYHWoz0 | price_1TiMimD8NguWaPm7kPgngURq ($49 one-time)

Module 1: Parse form webhook
  Extract: display_name, attribution_type, role_description, products_building, stack_summary, quote, 
           consent_confirmed, contact_email

Module 2: Supabase INSERT
  Table: lantern_user_spotlights
  Values: status = 'pending', spotlight_tier = 'free', affiliate_code = auto-generated

Module 3: Telegram message to editorial team (Ro, Bilal, Keymon, Homira)
  "New spotlight submission: [display_name / role_description if ROLE_BASED]
   Review + approve in Supabase or reply APPROVE/REJECT"

Module 4: Router (await approval via Supabase status field poll OR Telegram response)
  Path A: APPROVED (status = 'approved')
    → UPDATE: published = true, status = 'published', spotlight_published_date = today
    → Email builder via Resend:
      Subject: "Your Lantern spotlight is live ✦"
      Body: permanent URL + affiliate link + 30% commission explanation
      + upgrade offer: "$49 for newsletter feature, social post, 7-day homepage, badge"
      + Stripe Checkout link: ?price_id=price_1TiMimD8NguWaPm7kPgngURq&client_reference_id=[spotlight_id]
    → Telegram to team: "[display_name] spotlight live at /builders/[slug]"
  Path B: REJECTED (status = 'rejected')
    → Email builder: "Not a fit right now — reapply in 30 days"

Module 5: Error handling
  Missing consent_confirmed = false → reject immediately, Telegram alert
  Duplicate submission (same email within 30 days) → reject, send retry-in-30 email
```

**Scenario D-2: Paid Spotlight Upgrade Activation (NEW)**
```
Name: Lantern — Spotlight Paid Activation
Trigger: Stripe webhook → payment_intent.succeeded
         Filter: WHERE payment_intent.metadata.product_id = 'prod_UhmHfqAyYHWoz0'

Stripe IDs: prod_UhmHfqAyYHWoz0 | price_1TiMimD8NguWaPm7kPgngURq | $49.00 one-time

Module 1: Parse Stripe webhook
  Extract: client_reference_id (= spotlight_id), payment_intent.id

Module 2: Supabase UPDATE lantern_user_spotlights
  WHERE id = spotlight_id:
    spotlight_tier = 'paid'
    stripe_payment_id = payment_intent.id
    paid_at = now()
    paid_amount_usd = 49.00
    homepage_featured = true
    homepage_featured_start = today
    homepage_featured_end = today + 7 days

Module 3: Newsletter feature queue
  INSERT to newsletter_queue (or equivalent): type = 'builder_spotlight', source_id = spotlight_id
  Scheduled for next Thursday Brief

Module 4: Social post draft
  Generate via Groq: builder headline + one-liner + affiliate link
  Send to Telegram for editorial approval before posting

Module 5: Builder badge generation
  Generate badge HTML/image: "Featured in The Lantern Daily ✦ [date]"
  Upload to Supabase Storage
  UPDATE lantern_user_spotlights: builder_badge_generated = true, builder_badge_url = [url]

Module 6: Email builder via Resend
  Subject: "Your paid spotlight is live ✦ Newsletter feature incoming"
  Body: confirmation + badge embed code + newsletter feature date + social post preview

Module 7: Telegram to team
  "[display_name] paid $49. Newsletter feature queued for [date]. Social draft pending approval."

Module 8: Error handling
  spotlight_id not found → Telegram alert + manual review flag
  Badge generation fail → Telegram alert, mark builder_badge_generated = false, retry
```

---

### AGENT: DATA (API Integration — Affiliate Tracking)
**Mission:** Build affiliate tracking endpoint

#### New API Route: /api/affiliate-click
```typescript
// File: app/api/affiliate-click/route.ts
// POST handler
// Body: { sourceType, sourceId, affiliateLink, utmCampaign }
// Action: INSERT to lantern_affiliate_clicks
// Response: { trackingId, redirectUrl }
// 
// All affiliate links go through this endpoint so clicks are tracked
// before redirect to external URL
// 
// UTM params auto-appended to affiliate URL:
// ?utm_source=thelanterndaily&utm_medium=lantern&utm_campaign=[sourceType]-[sourceId]
```

#### Update: /api/subscribe (add referral tracking)
```typescript
// Existing subscribe endpoint
// ADD: check for ?ref= query param
// If present: fire Make.com webhook (Scenario B) with referral data
// Store: affiliate_code in new subscriber record
```

---

### AGENT: COMPLY (Trust + Compliance Review)
**Mission:** Audit all new features against halal trust standard

**Checklist to verify before any feature goes live:**

1. VideoCard: confirm zero `<iframe>` in rendered HTML. Automated DOM test.
2. StackToolCard: confirm free variant has no affiliate_link rendered
3. All affiliate links: confirm "(affiliate)" text adjacent in DOM
4. lantern_platform_crosspromo: confirm DB trigger fires and blocks activation without halal_screened = true
5. lantern_video_features: confirm DB rejects any video_url containing 'embed'
6. UserSpotlightCard: confirm "(referral — builder earns commission)" disclosure visible
7. RLProduct flag: confirm "REDLANTERN PRODUCT" badge appears when is_rl_product = true
8. /builders page: confirm open submission form live + community CTA visible (NO editorial staff featured)
9. All Make.com scenarios: confirm error paths send Telegram alerts to Ro
10. /stack page: confirm paid content returns 401 for non-subscribers

---

### AGENT: RESEARCH (Content Pre-Seeding)
**Mission:** Populate channel whitelist + stack seed data before frontend launches

#### Channel Whitelist (Research + Populate)
Research and find minimum 5 YouTube channels that meet criteria:
- MUSLIM_RUN: channel creator explicitly identifies as Muslim
- HALAL_SAFE: content is tech/builder-focused with no prohibited content
- OPERATOR_RECOMMENDED: editorially reviewed and recommended by The Lantern (no personal attribution)

Document findings in: /the-lantern/LANTERN_VIDEO_CHANNEL_RESEARCH.md
Insert to lantern_video_channels after editorial approval.

#### Stack Seed Data (Pre-Populate)
Pre-populate 12 stack entries before /stack goes live:
Cover categories: AI tools, infra, frontend, backend, open source repos
Free teaser (3 for first week's Quick Stack): must be editorially approved
Full breakdown entries: 9 more, queued for paid tier

Framed as "The Lantern Build Stack" — editorial voice, not attributed to any individual:
Label: "Tools we build The Lantern Daily with — vetted, used, recommended."
Source:
- Claude (AI)
- Supabase (backend)
- Next.js (frontend)
- Tailwind (styling)
- Make.com (automation)
- Vercel (hosting)
- Resend (email)
- PostHog (analytics)
- Sentry (errors)
- Groq (AI inference)
- GitHub (source control)
- Beehiiv (newsletter CMS)

#### Platform Cross-Promo Seed (Research + Approach)
Research affiliate/referral programs for:
1. Zoya App
2. Islamic Finance Guru
3. Wahed Invest
Document in: /the-lantern/LANTERN_PARTNER_RESEARCH.md

---

## EXECUTION ORDER

```
PRE-FLIGHT (before agents fire):
  - Confirm RedLantern Studios Supabase project accessible to ENGINEER
  - Confirm Next.js repo path or approve fresh scaffold at apps/the-lantern/
  - Confirm SwarmClaw running (local recovery OR Railway deploy)
  - Stripe ✅ DONE (price IDs live: monthly price_1TiMiYD8NguWaPm7NkQcfe4U, annual price_1TiMiZD8NguWaPm7O8DLGVBZ, spotlight price_1TiMimD8NguWaPm7kPgngURq)

Phase 1: Database (ENGINEER — do first, frontend depends on it)
  1. Run all 8 migrations in sequence
  2. Verify RLS policies applied
  3. Verify DB-level constraints (embed block, halal screen trigger, halal screen on crosspromo)
  4. Verify lantern_user_spotlights has all paid tier fields (spotlight_tier, paid_at, homepage_featured, etc.)
  5. Test with sample data inserts

Phase 2: Make.com Scenarios (ENGINEER — parallel with frontend start)
  1. Build Scenario A (Stack Curator)
  2. Build Scenario B (Live User Spotlight Referral Tracker)
  3. Build Scenario C (Cross-Promo Scheduler)
  4. Build Scenario D-1 (Spotlight Intake)
  5. Build Scenario D-2 (Paid Spotlight Activation — wire Stripe webhook)
  6. Test each with dry run

Phase 3: Frontend Components (BUILDER)
  1. VideoCard
  2. StackToolCard (both variants — free teaser + paid full)
  3. RepoCard
  4. UserSpotlightCard (free + paid badge variant)
  5. PlatformCrossPromoCard
  6. /stack page (subscription gate on paid content)
  7. /builders page + /builders/[slug] page

Phase 4: API Routes (DATA)
  1. /api/affiliate-click
  2. Update /api/subscribe for referral tracking

Phase 5: Trust Audit (COMPLY)
  1. Run all 10 compliance checks
  2. Document pass/fail per check
  3. Block deployment if any check fails

Phase 6: Content Pre-Seed (RESEARCH — parallel with Phase 3/4)
  1. Channel whitelist research
  2. Stack seed data entry (12 tools)
  3. Platform partner research

Phase 7: Ro Review + Confirmation
  1. Review all components in staging
  2. Approve first Quick Stack (3 free tools — "Lantern Build Stack" editorial framing)
  3. Confirm channel whitelist (≥ 5 channels)
  4. Confirm /builders page shows open submission CTA (Ummah-first — no editorial staff featured)
  5. SIGN OFF before any production deploy
```

---

## DEFINITION OF DONE (MISSION COMPLETE WHEN)

- [ ] All 8 Supabase migrations applied + verified (incl. lantern_user_spotlights with paid tier fields)
- [ ] All 5 Make.com scenarios tested (A, B, C, D-1, D-2)
- [ ] Stripe webhooks wired (D-2 receives payment_intent.succeeded for prod_UhmHfqAyYHWoz0)
- [ ] All 5 UI components built + responsive (incl. UserSpotlightCard with paid badge variant)
- [ ] /stack, /builders, /builders/[slug] pages live in staging
- [ ] /api/affiliate-click live and tracking
- [ ] /api/subscribe updated with referral tracking
- [ ] Channel whitelist: ≥ 5 entries researched + editorially approved
- [ ] Stack seed: 12 tools pre-populated (framed as "Lantern Build Stack" — editorial, no individual attribution)
- [ ] Platform research: ≥ 3 partners researched
- [ ] Cold-start spotlights: ≥ 1 founding builder secured (outreach by Ro, Bilal, Keymon, Homira, Build Team)
- [ ] COMPLY audit: all 10 checks pass
- [ ] /builders page live with open submission CTA — NO editorial staff featured (Ummah-first rule enforced)
- [ ] Ro final approval received
- [ ] Production deploy

**DO NOT DEPLOY WITHOUT RO CONFIRMATION.**

---

## CONFIRMATION GATE

Before SwarmClaw executes any of this:

Ro must reply: **"CONFIRMED — LANTERN-STACK-V1 EXECUTE"**

Or with modifications: **"CONFIRMED with changes: [specify]"**

This dispatch does not self-execute.
