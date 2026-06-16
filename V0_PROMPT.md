# The Lantern Daily — v0 Prompt
Generated: 2026-06-13
Use at: v0.dev

---

## PASTE THIS INTO v0

Build a full Next.js App Router application called **The Lantern Daily** — a Muslim tech newsletter and media product. Dark editorial design. No light mode. Every page must match the design system exactly.

---

## DESIGN SYSTEM (NON-NEGOTIABLE)

```
Colors:
  --bg-base: #07080F
  --bg-card: #0D0F1C
  --bg-card-hover: #151828
  --red: #D42535
  --red-dim: rgba(212,37,53,0.15)
  --red-border: rgba(212,37,53,0.3)
  --white: #FFFFFF
  --off-white: #E8E9EF
  --muted: #7A8299
  --dim: #3A3F57
  --border: rgba(255,255,255,0.06)
  --border-bright: rgba(255,255,255,0.12)
  --gold: #C8A96E

Fonts:
  - Playfair Display (serif) — headlines, article titles
  - Inter (sans) — body, UI text
  - Space Mono (mono) — labels, tags, metadata, ALL caps tracking

Layout: max-width 1280px, padding 48px horizontal
Card style: dark bg, 1px border at border color, no drop shadows
Interactive: border-color transitions only, no box-shadow glow effects
NO: white backgrounds, rounded corners, gradients on cards, emoji
```

---

## PAGES TO BUILD

### 1. `/` — Homepage

**Nav (fixed, backdrop-blur):**
- Left: Logo "The Lantern" + "DAILY" in Space Mono (AI letters in red)
- Center: Today / Intelligence / Stack / Archive / About
- Right: "RedLantern Studios™" label + Subscribe button (red)

**Ticker strip (below nav, red bg):**
- Scrolling text: "Signal Before Consensus · Issue #007 · Muslim-Built. AI-Native. · 247 Operators"
- CSS animation, infinite loop

**Hero (2-col grid):**
- Left: eyebrow label in red "Muslim-Built. AI-Native.", Playfair Display 60px headline "Signal before consensus.", body text, email subscribe form (input + red button), stats strip (247 Operators / 07 Signals / 01 Brief)
- Right: Featured article card with dark atmospheric gradient background (deep navy/purple), "Today's Lead" badge, category + title + excerpt + meta

**Intelligence Wall:**
- Section header with "Live Intelligence Wall" label + "View all signals" link
- 3×2 CSS grid of cards
- Each card: dark gradient image area (200px, category-colored radial gradient with subtle grid mesh overlay), card body with category label (red), title (Playfair), issue number, Free/Premium tier badge
- Categories: AI Systems, Product Calls, Operator Stack, Field Notes, Governance, Market Signal

**Recent Signals + Sidebar (2-col: 2fr 1fr):**
- Left: numbered signal list (01/02/03), each with category/title/excerpt/date/tag
- Right sidebar:
  - "Become an Operator" card (red border, red dim bg) showing next operator number (#0248), description, "Claim Your Number" CTA button
  - "Intelligence by Category" widget listing categories with signal counts

**Subscribe CTA section:**
- Centered, radial red glow bg
- "Signal Before Consensus" eyebrow
- Playfair 48px headline
- Email form
- Fine print: "Free · No spam · Operator number assigned on join"

**Footer:**
- Logo left, nav links center, "Muslim-Built. AI-Native. / © 2026 By Red, LLC" right

---

### 2. `/issues/[slug]` — Issue Page

**Layout:** max-width 800px centered

**Header:**
- Category label (red, mono)
- Playfair 52px headline
- Excerpt in 16px muted
- Issue number + date + read time
- Free/Premium badge

**Content body:**
- Full article prose (Playfair for pull quotes, Inter for body)
- If `tier = 'paid'` and user not subscribed: show first 3 paragraphs then blur overlay with upgrade CTA card

**Sidebar (sticky, 260px):**
- Operator number widget
- Next/Prev issue navigation
- Related signals (3 cards, minimal)

---

### 3. `/archive` — Archive

**Layout:** full-width grid

**Filter bar:** All / Free / Premium / by Category (mono tab buttons)

**Grid:** 3-col card grid, same card style as Intelligence Wall
- Locked premium cards show lock icon overlay, content blurred

---

### 4. `/about` — About

- Two-column: mission text left, brand statement right
- "SIGNAL BEFORE CONSENSUS" large red display text
- Mission paragraph
- "Muslim-Built. AI-Native." section
- RedLantern Studios attribution

---

### 5. `/confirmed` — Post-Subscribe

**Center-aligned, full viewport:**
- Fanoos/lantern icon (SVG geometric, dark crimson)
- "You are Operator" label
- Large mono display: #0248
- Confirmation message
- Share prompt: "Tell another Muslim builder"
- "Read today's signal →" link

---

### 6. `/shorts` — Quick Takes

**Layout:** masonry-style or 2-col grid

**Each Short card:**
- Category label
- Short title (Playfair 20px)
- 1-3 paragraph body
- Date (mono)
- NO premium gate (always free)

---

## COMPONENTS TO BUILD

```
components/
  Nav.tsx              — fixed nav with logo, links, subscribe CTA
  TickerStrip.tsx      — animated scrolling text bar
  SubscribeForm.tsx    — email input + submit, calls /api/subscribe
  IssueCard.tsx        — card used in Intelligence Wall + Archive
  SignalListItem.tsx   — numbered signal in Recent Signals list
  PremiumGate.tsx      — blur overlay with upgrade CTA for paid content
  OperatorNumber.tsx   — displays #XXXX with red border styling
  ShortsCard.tsx       — card for /shorts page
  Footer.tsx           — standard footer
  SidebarOperator.tsx  — "Become an Operator" sidebar widget
  CategoryWidget.tsx   — category list with counts
```

---

## DATA / API LAYER

### Supabase tables (already defined):
```typescript
// subscribers
interface Subscriber {
  id: string
  email: string
  operator_number: number  // unique, sequential, permanent
  tier: 'free' | 'paid'
  beehiiv_id?: string
  stripe_customer_id?: string
  subscribed_at: string
}

// issues (also used for shorts via content_type field)
interface Issue {
  id: string
  title: string
  slug: string
  content: string  // HTML from Beehiiv
  excerpt?: string
  published_at?: string
  tier: 'free' | 'paid'
  content_type: 'issue' | 'short'
  issue_number?: number
  beehiiv_post_id?: string
}
```

### API routes to scaffold:
```
POST /api/subscribe
  body: { email: string }
  returns: { operator_number: number }
  → assigns sequential operator number (SELECT FOR UPDATE)
  → redirects to /confirmed?operator=0248

GET /api/check-tier
  → returns { tier: 'free' | 'paid' } for authenticated user

POST /api/webhooks/stripe
  → updates subscriber tier on payment events

POST /api/webhooks/beehiiv
  → syncs new issue from Beehiiv to Supabase

GET /api/issues
  → paginated list, respects tier filter

GET /api/issues/[slug]
  → single issue

GET /api/shorts
  → paginated, content_type='short'

GET /api/subscriber-count
  → cached count for homepage display

GET /api/prayer-times
  query: { lat: number, lng: number }
  → proxies to api.aladhan.com/v1/timings
  → returns { nextPrayer: string, nextTime: string }
  → cache 1 hour per coordinate bucket
```

---

## ENV VARS NEEDED

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_MONTHLY_PRICE_ID=
STRIPE_ANNUAL_PRICE_ID=
BEEHIIV_API_KEY=
BEEHIIV_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
SENTRY_DSN=
```

---

## IMPORTANT RULES FOR v0

1. Dark backgrounds ONLY — `#07080F` base, `#0D0F1C` cards
2. NO rounded corners anywhere
3. Red accent `#D42535` for CTAs, labels, borders only — never backgrounds
4. Space Mono for ALL metadata, labels, tags, issue numbers, dates
5. Playfair Display for ALL headlines and article titles
6. Card borders: `1px solid rgba(255,255,255,0.06)` — not visible but structurally present
7. Hover states: border-color change only, no glow
8. Operator Number display: `#0042` format (4 digits, zero-padded, hash prefix)
9. Prayer times on dashboard: fetch from `/api/prayer-times` using browser geolocation
10. Premium content gate: blur CSS filter + overlay card, not redirect
11. Tailwind only — no external component libraries
12. TypeScript throughout
