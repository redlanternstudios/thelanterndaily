# THE LANTERN — SWARMCLAW BUILD BRIEF
**Status:** Scaffold confirmed. Extending to agents.
**Date:** 2026-06-12
**Claude role:** Scaffold + architecture only. SwarmClaw extends from here.
**QBos context:** The Lantern = QBos dogfood product #2. This build proves QuietBuild OS can ship a production-grade publication + affiliate platform autonomously.

---

## 1. WHAT CLAUDE HAS BUILT (VERIFIED ✅)

### Foundation
- `package.json` — Next.js 15, React 19, Tailwind v4, TypeScript
- `postcss.config.mjs` — @tailwindcss/postcss only
- `next.config.ts` — typedRoutes experimental enabled
- `tsconfig.json` — standard Next.js 15, @/* path alias

### Design System
- `app/globals.css` — Tailwind v4 @theme block, ALL brand tokens as CSS variables
  - `--color-rls-black: #08080C`
  - `--color-rls-red: #D7262E`
  - `--color-rls-offwhite: #F4F0EC`
  - `--color-rls-charcoal: #17171C`
  - `--color-rls-muted: #6B6B72`
  - `--color-rls-surface: #0F0F13`
  - `--color-rls-card: #17171C`
  - `--color-rls-border: #D8D2CC`
  - `--color-rls-divider: #2A2A2A`
  - Global rule: `* { border-radius: 0 !important; }` — NO rounded corners anywhere
- `lib/utils.ts` — cn() utility (clsx + tailwind-merge)

### UI Components (in `components/ui/`)
- `Button.tsx` — primary/outline/ghost variants, sm/md/lg sizes
- `SectionLabel.tsx` — red small-caps label with extending red rule
- `StackCard.tsx` — affiliate tool card with red top border + affiliate badge
- `IssueCard.tsx` — issue card with locked overlay mechanic
- `Nav.tsx` — fixed dark nav, TL logomark, Archive/Stack/About links, Join CTA

### Pages Built
- `app/layout.tsx` — root layout with Nav, footer, metadata
- `app/page.tsx` — full landing page (Hero, Identity Proof, Recent Issues, Stack Preview, CTA)
- `app/stack/page.tsx` — full Operator Stack page (6 stages, 16 tools, affiliate disclosure)

### Directory Structure Created
```
the-lantern/
├── app/
│   ├── stack/page.tsx       ✅ BUILT
│   ├── archive/             ← AGENT TASK
│   ├── about/               ← AGENT TASK
│   ├── confirmed/           ← AGENT TASK
│   └── issues/[slug]/       ← AGENT TASK
├── components/
│   ├── ui/                  ✅ BUILT (5 components)
│   └── sections/            ← AGENT TASK (extract sections from page.tsx)
├── public/                  ← AGENT TASK (assets)
└── lib/
    └── utils.ts             ✅ BUILT
```

---

## 2. AGENT ASSIGNMENTS

### FRONTEND (65de47a2)
**Priority order:**

**Task F-1: `app/archive/page.tsx`**
- Full issue archive with filter by free/operator-only
- Uses IssueCard component
- Static data for now (Beehiiv API wired separately)
- Pattern: Same grid layout as home page issues section

**Task F-2: `app/issues/[slug]/page.tsx`**
- Individual issue reading experience
- Full-width reading zone (off-white `#F4F0EC` background, dark text)
- Inline STACK CARDS within body (use StackCard component)
- Locked gate if subscriber-only: blur overlay + subscribe CTA
- "Previous issue / Next issue" navigation footer

**Task F-3: `app/about/page.tsx`**
- Manifesto page: "What is an operator?"
- Ro's founding story — minimal, direct
- RedLantern Studios attribution
- QBos mention: "The Lantern is built with QuietBuild OS"

**Task F-4: `app/confirmed/page.tsx`**
- Post-subscribe confirmation screen
- Assign Operator number (mock: "You are Operator #1,248")
- What to expect next
- Link to latest issue + /stack

**Task F-5: Extract `components/sections/`**
- Extract hero, identity-proof, issues-grid, stack-preview, cta sections from `app/page.tsx` into reusable section components
- Keep `app/page.tsx` as composition layer only

---

### DESIGNER (1ae4f248)
**Priority order:**

**Task D-1: Generate hero imagery brief**
- Write ChatGPT DALL-E 3 prompts for hero section background (dark, cinematic, lantern metaphor)
- Spec: 1440×900px, dark atmospheric, no faces, operator/intelligence aesthetic
- Output: prompts to `public/assets/hero-prompt.md`

**Task D-2: TL logomark SVG**
- Design proper TL logomark SVG replacing the current text-in-square placeholder in Nav.tsx
- Brand constraints: #D7262E red, no rounded corners, geometric, minimal
- Output: `public/tl-logo.svg`

**Task D-3: OG image template**
- Create static OG image template (1200×630px)
- Per-issue variant: headline text overlay on dark background
- Output: `public/og-default.png` + spec for dynamic generation

---

### BACKEND (adb45687)
**Task B-1: Beehiiv API integration**
- Ro holds: API key + publication ID (v1 and v2 endpoints)
- Wire to: `lib/beehiiv.ts` — typed client
- Functions needed:
  - `getPublishedPosts(limit, page)` → feed archive + homepage
  - `getPostBySlug(slug)` → individual issue page
  - `subscribeEmail(email)` → subscribe form handler
- API endpoint docs: https://developers.beehiiv.com/docs
- Wire subscribe form in `app/page.tsx` to `app/api/subscribe/route.ts`
- Replace mock data in `app/page.tsx` and `app/archive/page.tsx` with live data

**Task B-2: SightEngine quality gate script**
- Write `swarmclaw/tools/verify_asset.js`
- Credentials already in `robby-telegram/.env`:
  - SIGHTENGINE_API_USER=1677623118
  - SIGHTENGINE_API_SECRET=xBL8FA65dENEkp6GFBUvLLYTJBgkbWNY
- Checks: image-quality score, properties (color palette), AI-generated detection
- Threshold: quality score < 0.75 = reject
- Output: JSON result to stdout

**Task B-3: Subscribe API route**
- `app/api/subscribe/route.ts`
- POST handler: validate email → call Beehiiv subscribe API → return success/error
- Error states: invalid email, already subscribed, API failure
- No frontend redirect — return JSON, handle client-side

---

### ARCHITECT (a4c9f2e1)
**Task A-1: Review scaffold and flag gaps**
- Run standard integrity check against this brief
- Verify: routing is correct, components are typed, no fake wiring
- Flag: any missing error states, missing TypeScript types, prop validation gaps
- Output: `the-lantern/ARCHITECT_REVIEW.md`

**Task A-2: Beehiiv data model types**
- Define TypeScript types for Beehiiv post objects
- Output: `lib/types.ts`
- Required types: `BeehiivPost`, `BeehiivSubscriber`, `IssueMetadata`

---

## 3. DESIGN RULES (NON-NEGOTIABLE)

### THEME: LIGHT EDITORIAL. NOT DARK.
The previous dark build was wrong. The Lantern is a PREMIUM PUBLICATION, not a generic AI tool.
Reference: The Atlantic, Bloomberg, The Information — cream/white body, dark nav as brand anchor.

### FLAME: TRI-COLOR. NON-NEGOTIABLE.
The RLS lantern flame has THREE colors. Always. No exceptions.
- Red: #D7262E (base/left)
- Yellow-orange: #F5891A (center, tallest)
- Blue: #3AA0FF (right, cold edge)
This tri-color flame appears in the lantern logo graphic. Do NOT replace with single warm amber flame.

### COLOR SYSTEM (updated):
```
Nav/Footer bg: #08080C (dark — brand anchor)
Page bg: #F4F0EC (cream — default for all content)
Alternate section bg: #EAE6E0
Card bg: #FFFFFF
Body text: #08080C
Muted text: #6B6B72
Red accent: #D7262E (CTAs, labels, section marks, left rails)
Flame orange accent: #F5891A (hero flame, select highlights)
Flame blue accent: #3AA0FF (hero flame, cold accents)
Border light: #D8D2CC
Divider dark: #2A2A2A (dark zones only)
NO border-radius anywhere — ever
Left rail: 3px solid #D7262E on hero/feature sections
Section labels: red small-caps + extending rule (use SectionLabel component)
```

---

## 4. QBOS VALIDATION CRITERIA

The Lantern build succeeds for QBos validation when:

1. **Scaffold → SwarmClaw handoff is clean** — agents can extend without reading full context
2. **Design system holds** — no color/spacing drift across agent-written pages
3. **Beehiiv API wired** — live data, not mock data
4. **Subscribe form works** — email → Beehiiv → confirmation screen
5. **Stack page is affiliate-ready** — tracked links, disclosed, organized by stage
6. **Zero fake wiring** — no UI that exists without backing API logic
7. **Builds without error** — `npm run build` passes

---

## 5. TO START

```bash
# In the-lantern/ directory:
npm install
npm run dev
# → localhost:3000
```

Agent access: SwarmClaw Filesystem MCP at `99bd0d9e` has access to:
`/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios/the-lantern/`

Ro has Beehiiv API key + publication IDs (v1/v2) — request when starting B-1.

---

## 6. OPEN QUESTIONS (blocking)

| # | Question | Blocking | Owner | Status |
|---|----------|----------|-------|--------|
| OQ-1 | Beehiiv API key + publication ID | B-1 (Beehiiv wiring) | Ro | ✅ RESOLVED — see .env.local |
| OQ-2 | Hero imagery — DALL-E via ChatGPT (not Canva) | D-1 | Ro | ✅ RESOLVED |
| OQ-3 | Operator number mechanic — sequential DB | F-4 | Claude | ✅ RESOLVED — see supabase/schema.sql (operator_number_seq) |

---

## 7. AUTOMATION OS LAYER (NEW — 2026-06-13)

The Lantern is NOT just a newsletter website. It is a **fully automated media OS**.
Read `AUTOMATION_OS.md` for the full pipeline spec before building anything in this section.

### NEW AGENT TASKS

#### BACKEND (adb45687) — add to queue after B-1, B-2, B-3:

**Task B-4: Supabase content schema**
- Run migrations from `supabase/schema.sql`
- Tables: signals, posts, shorts, subscribers, affiliate_clicks, contact_submissions, error_log
- Apply all RLS policies as written
- Configure webhooks per the comments at the bottom of schema.sql

**Task B-5: Admin API routes**
- `app/api/admin/approve/[id]/route.ts` — SET posts.status = 'approved' (protected)
- `app/api/admin/reject/[id]/route.ts` — SET posts.status = 'rejected' (protected)
- Auth: check for admin secret header (env: ADMIN_SECRET)
- These are called by Ro from iMessage HITL notification links

**Task B-6: Shorts API route**
- `app/api/shorts/route.ts` — GET latest 9 shorts from Supabase
- Powers `/shorts` page (to be built by FRONTEND)

**Task B-7: PostHog instrumentation**
- Add PostHog to `app/layout.tsx` (NEXT_PUBLIC_POSTHOG_KEY from .env.local)
- Instrument events:
  - `lantern_subscribe_clicked` — on Join CTA click
  - `lantern_subscribe_success` — on successful Beehiiv subscribe
  - `lantern_affiliate_clicked` — on any Stack Card CTA click (capture: tool, post_id)
  - `lantern_issue_opened` — on issue page load (capture: slug, issue_number, tier)

#### FRONTEND (65de47a2) — add to queue after F-4:

**Task F-6: `app/shorts/page.tsx`**
- Masonry or grid of short insight cards
- Each card: headline + insight + category tag + source name + timestamp
- Fetches from `/api/shorts`
- "The Signal Feed" — web-only, not email
- Same light editorial theme

**Task F-7: Upgrade flow**
- `app/upgrade/page.tsx` — Operator tier benefits page
- Links to Beehiiv payment checkout (URL configured in env)
- Operator benefits: Weekly Brief, Field Notes, full archive, Operator number

### NEW ENVIRONMENT VARIABLES NEEDED

Add to `.env.local`:
```
NEXT_PUBLIC_POSTHOG_KEY=           # from PostHog project
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
ADMIN_SECRET=                      # random string, Ro sets this
BEEHIIV_UPGRADE_URL=               # Beehiiv paid subscription checkout URL
SUPABASE_URL=                      # The Lantern Supabase project URL
SUPABASE_SERVICE_ROLE_KEY=         # service role key (server-side only)
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # anon key (client-safe)
```

---

## 8. REVENUE ARCHITECTURE (NEW — 2026-06-13)

See `REVENUE_MODEL.md` for full breakdown.

**Summary for agents:**
- Beehiiv handles paid subscriptions ($15/mo Operator tier) — native, no Stripe needed
- Stripe handles one-time payments (Stack Spotlight sponsorships)
- All affiliate links use `?via=thelantern` UTM (already in stack/page.tsx)
- PostHog tracks all affiliate clicks (instrument in B-7)
- Operator number is assigned from Supabase `operator_number_seq` on subscribe

**StackCard component** — already has `isAffiliate` prop and affiliate badge.
Wire PostHog `lantern_affiliate_clicked` event on StackCard CTA click (client-side).

---

*This brief is generated by Claude after scaffold confirmation. SwarmClaw extends from here. QBos validated: Claude did architecture + scaffold. Agents handle execution.*
*Last updated: 2026-06-13 — Automation OS layer added*
