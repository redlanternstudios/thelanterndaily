# THE LANTERN DAILY — COMPREHENSIVE BUILD PLAN
**Version:** 1.0 | **Date:** 2026-06-14 | **Status:** SCOPE LOCKED
**Prepared for:** Alif.build presentation + SwarmClaw execution
**Publication:** thelanterndaily.com | **Entity:** RedLantern Studios / By Red LLC

---

## EXECUTIVE SUMMARY

The Lantern Daily is the Muslim tech community's trust-first editorial publication and distribution engine. Built for the Ummah — covering AI tools, Islamic finance, halal software, and Muslim builders. Every piece of content passes a 6-gate halal trust pipeline before publication. No founder branding. No sponsored content that isn't editorially disclosed. The community built it, the community runs it.

**Business model:** Free newsletter (Beehiiv) + paid subscription ($15/mo or $120/yr) + Live User Spotlight affiliate revenue share (30% Year-1 per referred subscriber) + halal partner affiliate network.

**Strategic position:** The distribution layer for the Halal Software Suite. Amina, TradeSwarm, Authentic Hadith — all reach their audience through The Lantern.

---

## STRIPE — LIVE ✅

All Stripe products created 2026-06-14. Verified on RedLantern Studios account (acct_1THc0PD8NguWaPm7).

| Product | Stripe ID | Price ID | Amount | Type |
|---------|-----------|----------|--------|------|
| The Lantern Daily (Monthly) | prod_Uhice87kie5I9k | price_1TiMiYD8NguWaPm7NkQcfe4U | $15.00/mo | Recurring |
| The Lantern Daily (Annual) | prod_Uhice87kie5I9k | price_1TiMiZD8NguWaPm7O8DLGVBZ | $120.00/yr | Recurring |
| The Lantern Daily (Lifetime) | prod_UhilDLOD6BQhtY | price_1TiJK6D8NguWaPm7H6qSInfh | $199.99 | One-time |
| Live User Spotlight — Paid Upgrade | prod_UhmHfqAyYHWoz0 | price_1TiMimD8NguWaPm7kPgngURq | $49.00 | One-time |

**Webhook events needed (wire when Make.com scenarios are built):**
- `payment_intent.succeeded` → Spotlight upgrade activation
- `customer.subscription.created` → New subscriber tracking + affiliate commission trigger
- `customer.subscription.deleted` → Subscriber churn tracking

---

## TECH STACK — LOCKED

| Layer | Tool | Status |
|-------|------|--------|
| Frontend | Next.js (App Router) + Tailwind | To build |
| Hosting | Vercel | To connect |
| Backend | Supabase — RedLantern Studios project | Confirmed existing |
| Newsletter/CMS | Beehiiv | Ro: upgrade to paid tier |
| Automation | Make.com | Scenarios to build |
| Email | Resend | To configure |
| Analytics | PostHog | To instrument |
| Error tracking | Sentry | To configure |
| Payments | Stripe | ✅ LIVE |
| AI triage | Groq (llama-4-scout) | To wire in Make.com |
| Domain | thelanterndaily.com (Namecheap) | DNS pending |

**DNS action (Ro only):**
- A record: `76.76.21.21` → Vercel
- CNAME: `www` → `cname.vercel-dns.com`

---

## FEATURE SET — COMPLETE SCOPE

### 1. Trust Architecture (6-Gate Pipeline)
Every piece of content passes all 6 gates before publication:

| Gate | Method | Block Condition |
|------|--------|-----------------|
| 1. Source Whitelist | DB lookup (lantern_content_queue) | Source not in approved list |
| 2. Groq Dual Score | llama-4-scout | relevance_score < 7 OR halal_stance = BLOCKED |
| 3. Editorial Approval | Ro review via Telegram | Manual reject |
| 4. Islamic Claim Screen | Groq + contains_islamic_claim flag | Scholar review required |
| 5. Financial Product Screen | Groq + contains_financial_product flag | Riba-adjacent → BLOCKED |
| 6. Community Correction Loop | DB flag (community_flagged) | Re-review + possible retraction |

**Halal badges (display logic):**
- ✅ HALAL VERIFIED — passed all 6 gates, no Islamic claims
- 📚 SCHOLAR REVIEWED — Islamic claims present, scholar-verified
- 🏦 HALAL FINANCE SCREENED — financial product, DJIM-screened
- ℹ️ EDITORIAL ONLY — non-Islamic content, no financial claims

### 2. Weekly Tech Stack
**Free tier:** 3 tools — name, one-liner, external link (no affiliate)
**Paid tier:** 8-12 tools — full breakdown, cost comparison, operator context, affiliate links, "avoid" list
**Source pipeline:** Product Hunt RSS + Hacker News RSS + GitHub Trending + Awesome Lists + The Lantern editorial stack
**Cadence:** Thursday anchor. Quick Stack (free) published with Thursday Brief.

### 3. Video Corner
**Format:** Linked cards only. NEVER embedded. YouTube pre-roll haram ad risk = hard block.
**DB constraint:** `video_url NOT LIKE '%embed%'`
**Channel types:** MUSLIM_RUN | HALAL_SAFE | OPERATOR_RECOMMENDED (editorial, no personal attribution)
**Cadence:** Tuesday Shorts

### 4. Live User Spotlight
**Ummah-first rule:** No editorial staff featured. Community members only.

**Free tier (always available):**
- Open submission via form
- Editorial review gate (team: Ro, Bilal, Keymon, Homira, Build Team)
- Permanent spotlight URL at `/builders/[slug]`
- Unique affiliate code (30% Year-1 commission on referred subscribers)
- Archive listing at `/builders`
- Never degraded, never removed

**Paid upgrade ($49 one-time — optional, offered after acceptance):**
- 300-word editorial feature in Thursday Brief
- The Lantern social post (Twitter/X)
- 7-day homepage "Spotlight Builder" rotation
- Priority positioning in /builders archive
- Embeddable "Featured in The Lantern Daily" badge

**Attribution:** Operator's choice — NAMED or ROLE_BASED

**Upgrade offer (sent post-acceptance, never before):**
> "Your spotlight is live. Want more reach? For $49: newsletter feature, social post, homepage for a week, and a badge for your site. No pressure — your spotlight runs forever either way."

**Cold-start team:** Ro + Bilal + Keymon + Homira + RedLantern Build Team doing direct outreach pre-launch. Target: 5+ founding spotlights live on day 1.

### 5. Muslim Platform Cross-Promo / Halal Partner Network
**Phase 1:** Editorial-first, disclosed affiliate where available
**Phase 2 (500+ users):** Formalized Halal Partner Network at `/partners`
**Priority partners to approach:** Zoya, Wahed Invest, Islamic Finance Guru, Muslim Pro, Alif.build

---

## DATABASE MIGRATIONS — 8 TABLES
Target: RedLantern Studios Supabase project (existing)

Run in this order:

### Migration 1: lantern_content_queue
```sql
CREATE TABLE lantern_content_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name text NOT NULL,
  source_url text,
  article_url text NOT NULL,
  headline text NOT NULL,
  excerpt text,
  relevance_score integer CHECK (relevance_score BETWEEN 1 AND 10),
  halal_stance text CHECK (halal_stance IN ('POSITIVE','NEUTRAL','CRITICAL','BLOCKED')),
  haram_keyword_detected boolean DEFAULT false,
  contains_islamic_claim boolean DEFAULT false,
  contains_financial_product boolean DEFAULT false,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','flagged','scholar_review')),
  ro_reviewed_at timestamptz,
  ro_decision text,
  created_at timestamptz DEFAULT now()
);
```

### Migration 2: lantern_stack_entries
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
  has_affiliate boolean DEFAULT false,
  affiliate_link text,
  affiliate_disclosure text DEFAULT '(affiliate — The Lantern earns a commission)',
  featured_week date,
  tier_placement text CHECK (tier_placement IN ('free_teaser','paid_full','both')),
  published boolean DEFAULT false,
  editorial_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

### Migration 3: lantern_video_channels
```sql
CREATE TABLE lantern_video_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_name text NOT NULL UNIQUE,
  channel_url text NOT NULL,
  youtube_channel_id text,
  channel_type text CHECK (channel_type IN ('MUSLIM_RUN','HALAL_SAFE','OPERATOR_RECOMMENDED')),
  active boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now()
);
```

### Migration 4: lantern_video_features
```sql
CREATE TABLE lantern_video_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_title text NOT NULL,
  video_url text NOT NULL CHECK (video_url NOT LIKE '%embed%'),
  channel_id uuid REFERENCES lantern_video_channels(id),
  thumbnail_url text,
  content_type text CHECK (content_type IN ('tutorial','interview','tool-review','founder-story')),
  content_summary text,
  why_featured text,
  featured_date date,
  published boolean DEFAULT false,
  editorial_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

### Migration 5: lantern_user_spotlights (RENAMED from operator_spotlights)
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
  -- Paid upgrade fields
  spotlight_tier text DEFAULT 'free' CHECK (spotlight_tier IN ('free','paid')),
  stripe_payment_id text,
  paid_at timestamptz,
  paid_amount_usd numeric DEFAULT 0,
  -- Paid feature tracking
  newsletter_featured boolean DEFAULT false,
  newsletter_featured_date date,
  social_post_sent boolean DEFAULT false,
  social_post_date date,
  homepage_featured boolean DEFAULT false,
  homepage_featured_start date,
  homepage_featured_end date,
  builder_badge_generated boolean DEFAULT false,
  builder_badge_url text,
  -- Status
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','published')),
  created_at timestamptz DEFAULT now()
);
```

### Migration 6: lantern_spotlight_referrals
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

### Migration 7: lantern_platform_crosspromo
```sql
CREATE TABLE lantern_platform_crosspromo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name text NOT NULL,
  platform_url text NOT NULL,
  category text,
  is_rl_product boolean DEFAULT false,
  feature_type text CHECK (feature_type IN ('editorial','sponsored','affiliate','co-promo')),
  affiliate_link text,
  commission_rate numeric,
  halal_screened boolean DEFAULT false,
  halal_screen_notes text,
  feature_count integer DEFAULT 0,
  total_clicks integer DEFAULT 0,
  active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Halal gate trigger
CREATE OR REPLACE FUNCTION check_halal_screen_before_activate()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.active = true AND NEW.halal_screened = false THEN
    RAISE EXCEPTION 'Cannot activate platform without halal screening.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_halal_screen
BEFORE INSERT OR UPDATE ON lantern_platform_crosspromo
FOR EACH ROW EXECUTE FUNCTION check_halal_screen_before_activate();
```

### Migration 8: lantern_affiliate_clicks
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

---

## MAKE.COM SCENARIOS — 5 TOTAL

### Scenario A: Tech Stack Daily Curate
**Trigger:** Daily 6am
Sources: Product Hunt RSS + Hacker News RSS + GitHub Trending
→ Groq dual score (relevance + halal_stance)
→ relevance ≥ 7 AND not prohibited → INSERT lantern_stack_entries (status: pending)
→ Thursday trigger: compile Quick Stack (free) + Full Stack (paid)
→ Telegram: "Stack queue ready — N tools pending editorial approval"

### Scenario B: Spotlight Referral Tracker
**Trigger:** Webhook — Stripe `customer.subscription.created`
→ Parse `ref_code` from subscription metadata
→ Lookup lantern_user_spotlights WHERE affiliate_code = ref_code
→ INSERT lantern_spotlight_referrals
→ Calculate commission (subscription_value × revenue_share_pct / 100)
→ Email operator: "You earned $[X] from a new Lantern subscriber"
→ Telegram to editorial: "[Operator] referral: $[commission]"

### Scenario C: Platform Cross-Promo Rotation
**Trigger:** Weekly Friday 9am
→ SELECT platform with lowest feature_count AND halal_screened = true
→ Build content card → INSERT to Shorts queue
→ INCREMENT feature_count

### Scenario D-1: Live User Spotlight Intake
**Trigger:** Form webhook (Tally or custom form → Supabase)
→ INSERT to lantern_user_spotlights (status: pending, tier: free)
→ Telegram to outreach team: "New spotlight submission: [display_name]"
→ Await editorial approval (Telegram button or Supabase status update)
→ If APPROVED:
  - status → 'approved', published → true
  - Generate affiliate_code (already auto-generated on insert)
  - Email builder: spotlight live URL + affiliate link + upgrade offer
→ If REJECTED:
  - Email builder: "Not a fit right now — reapply in 30 days"

**Upgrade offer email (sent on approval):**
"Your spotlight is live at [URL]. Your affiliate link is below — earn 30% of Year-1 for every subscriber you refer.

Want more reach? For $49: newsletter feature, social post, 7-day homepage placement, and a badge for your site.

[Upgrade → $49] or [Keep my free spotlight — it runs forever]"

Stripe Checkout URL: `?price_id=price_1TiMimD8NguWaPm7kPgngURq&client_reference_id=[spotlight_id]`

### Scenario D-2: Paid Spotlight Activation
**Trigger:** Stripe webhook → `payment_intent.succeeded` WHERE product = prod_UhmHfqAyYHWoz0
→ Parse spotlight_id from Stripe client_reference_id
→ UPDATE lantern_user_spotlights:
  - spotlight_tier = 'paid'
  - stripe_payment_id = [payment_id]
  - paid_at = now()
  - paid_amount_usd = 49.00
  - homepage_featured = true
  - homepage_featured_start = today
  - homepage_featured_end = today + 7
→ Queue newsletter feature for next Thursday Brief
→ Generate social post draft → Telegram for editorial approval
→ Generate builder badge → upload to Supabase Storage
→ Email builder: "Paid spotlight live. Badge code below. Newsletter feature drops [date]."
→ Telegram to editorial: "[Builder] paid $49. Newsletter feature due [date]."

---

## FRONTEND — COMPONENTS + PAGES

### Components (file: components/lantern/)

| Component | File | Purpose |
|-----------|------|---------|
| VideoCard | VideoCard.tsx | Linked video card — no embeds ever |
| StackToolCard | StackToolCard.tsx | Free variant (teaser) + Paid variant (full breakdown) |
| RepoCard | RepoCard.tsx | GitHub repo with builder-safe rating |
| UserSpotlightCard | UserSpotlightCard.tsx | Live User Spotlight — RENAMED from OperatorSpotlightCard |
| PlatformCrossPromoCard | PlatformCrossPromoCard.tsx | Cross-promo with REDLANTERN badge if RL product |

**UserSpotlightCard — paid tier badge:**
If `spotlight_tier = 'paid'`: show gold "FEATURED BUILDER ✦" badge (Scholar Gold #B8922A)
If `spotlight_tier = 'free'`: standard display — no badge difference (paid never degrades free)

### Pages

| Page | File | Access |
|------|------|--------|
| /stack | app/stack/page.tsx | Free teaser: public. Full breakdown: subscription gate |
| /builders | app/builders/page.tsx | Public archive. Submit CTA always visible. |
| /builders/[slug] | app/builders/[slug]/page.tsx | Public. Affiliate CTA visible. Upgrade CTA if paid. |

### API Routes

| Route | File | Purpose |
|-------|------|---------|
| /api/affiliate-click | app/api/affiliate-click/route.ts | Track outbound affiliate clicks → lantern_affiliate_clicks |
| /api/subscribe | app/api/subscribe/route.ts | Handle Beehiiv subscribe + capture ref_code for affiliate tracking |

---

## CONTENT PRE-SEEDING (before launch)

### The Lantern Build Stack (12 tools — editorial voice, no personal attribution)
Framed as: "Tools we build The Lantern Daily with — vetted, in production, recommended."

| Tool | Category | Tier | Placement |
|------|----------|------|-----------|
| Claude (Anthropic) | AI | Paid | Free teaser |
| Supabase | Backend/DB | Freemium | Free teaser |
| Next.js | Frontend | Free/OS | Free teaser |
| Make.com | Automation | Paid | Paid full |
| Vercel | Hosting | Freemium | Paid full |
| Resend | Email | Freemium | Paid full |
| PostHog | Analytics | Freemium | Paid full |
| Sentry | Error tracking | Freemium | Paid full |
| Groq | AI inference | Freemium | Paid full |
| Tailwind | CSS | Free/OS | Paid full |
| Beehiiv | Newsletter | Paid | Paid full |
| GitHub | Source control | Free | Paid full |

### Video Channel Whitelist (minimum 5 before Video Corner launches)
Research required — RESEARCH agent assigned. Criteria:
- MUSLIM_RUN: creator explicitly identifies as Muslim
- HALAL_SAFE: tech/builder content, no prohibited content
- OPERATOR_RECOMMENDED: editorially reviewed (no personal attribution)

### Live User Spotlights (minimum 1 before /builders page launches)
Cold-start team: Ro, Bilal, Keymon, Homira, RedLantern Build Team
Target: 5 founding spotlights secured via direct outreach before launch

---

## BRAND + DESIGN RULES

**Dark editorial theme:**
- Background: #07080D (near-black)
- Cards: #0D0F14
- Borders: #2A2D35
- Body text: #F7F2EE (cream)
- Halal Green: #2D7A4F — verified trust signals ONLY
- Scholar Gold: #B8922A — Islamic attribution ONLY
- Red: #D92532 — category labels, section headers
- Bismillah (بسم الله) as editorial opening signature
- Hijri date first, Gregorian in parentheses

**Live User Spotlight branding:**
Carries The Lantern Daily publication mark. Section header: "LIVE USER SPOTLIGHT" in red small caps. Gold accent for featured builder name (NAMED) or role description (ROLE_BASED).

---

## RO ACTIONS REQUIRED (cannot be automated)

| Action | Priority | Status |
|--------|----------|--------|
| Disable Beehiiv Boosts | CRITICAL — before first publish | Pending |
| Upgrade Beehiiv to paid tier | HIGH | Pending |
| DNS: A record 76.76.21.21 + CNAME in Namecheap | HIGH | Pending |
| Add Vercel domain: thelanterndaily.com | HIGH | Pending |
| Stripe webhook URL (after Make.com scenarios built) | HIGH | Pending |
| Begin cold-start outreach (Bilal, Keymon, Homira) | HIGH | Pending |
| Confirm Next.js repo path or approve fresh scaffold | BLOCKER | Pending |
| SwarmClaw back up OR Railway migration decision | BLOCKER | Pending |

---

## SWARMCLAW EXECUTION ORDER

**Pre-flight (before agents fire):**
1. ✅ Stripe products live
2. Confirm RedLantern Studios Supabase project ID accessible to ENGINEER
3. Confirm Next.js repo path or approve fresh scaffold at `apps/the-lantern/`
4. SwarmClaw running (local recovery OR Railway deploy)

**Phase 1: Database (ENGINEER)**
Run all 8 migrations in order against RedLantern Studios Supabase project.
Verify each table created before proceeding to next.

**Phase 2: Make.com Scenarios (ENGINEER)**
Build all 5 scenarios: A, B, C, D-1, D-2
Wire Stripe webhook URLs after scenarios built.

**Phase 3: Frontend Components (BUILDER)**
Build 5 components in `components/lantern/`
Wire Stripe Checkout links using price IDs above.

**Phase 4: Pages + API Routes (BUILDER + DATA)**
Build /stack, /builders, /builders/[slug]
Build /api/affiliate-click, /api/subscribe

**Phase 5: Trust Audit (COMPLY)**
10-point pre-deploy compliance check.
Block deploy if any check fails.

**Phase 6: Content Pre-Seed (RESEARCH — parallel with 3/4)**
- Channel whitelist: ≥ 5 entries
- Stack seed: 12 tools (Lantern Build Stack)
- Platform partners: ≥ 3 researched

**Phase 7: Ro Review + Sign-off**
- All components in staging
- Quick Stack (3 free tools) approved
- Channel whitelist confirmed
- /builders page showing open submission CTA
- Beehiiv Boosts DISABLED before sign-off
- SIGN OFF → production deploy

---

## TIMELINE TO ALIF PRESENTATION

**Assuming SwarmClaw recovers today:**

| Day | Work | Owner |
|-----|------|-------|
| Day 1 (Jun 14) | Stripe ✅ Done | Claude |
| Day 2 (Jun 15) | DB migrations + Make.com A/B/C | ENGINEER |
| Day 3 (Jun 16) | Make.com D-1/D-2 + Frontend components | ENGINEER + BUILDER |
| Day 4 (Jun 17) | Pages + API routes + content seed | BUILDER + DATA + RESEARCH |
| Day 5 (Jun 18) | Trust audit + Beehiiv integration + staging deploy | COMPLY + BUILDER |
| Day 6 (Jun 19) | DNS live + Vercel connect + cold-start spotlights | Ro + Team |
| Day 7 (Jun 20) | QA, edge cases, final content approval | Ro |
| **Jun 21** | **Alif presentation ready** | **All** |

**If Railway migration needed first (SwarmClaw stays down):**
Add 2 days → Alif ready Jun 23.

**Minimum viable Alif demo (if time-constrained):**
- Live URL with homepage
- 1 founding spotlight on /builders
- 3 tools on /stack (free)
- Newsletter signup working
- Trust badges visible
- Stripe checkout functional (monthly + annual)

This can be achieved in 4 days if BUILDER works from scaffolded Next.js + pre-seeded content.

---

## CONFIRMATION PHRASE

When ready to execute:
**"CONFIRMED — LANTERN-STACK-V1 EXECUTE"**

SwarmClaw will execute phases in order per the schedule above.

---

*Scope locked 2026-06-14. All decisions documented. Truth-first build.*
