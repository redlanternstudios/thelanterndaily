# SWARMCLAW MISSION — THE LANTERN DAILY — FRONTEND
Version: 2.0 | Updated: 2026-06-13
Agent: SC-FRONTEND
Priority: HIGH
Status: REBUILD — dark theme supersedes all prior cream/light theme code

---

## CRITICAL OVERRIDE

Previous build used a light cream hero. THIS IS SUPERSEDED.
Approved design is DARK throughout. Discard all cream/light theme code.

Background: #07080D
Body text: #F7F2EE
Accent/CTA: #D92532
Card background: #111318
Muted: #888888
Border: rgba(255,255,255,0.08)

---

## GITHUB REPO

Org: RedLanternstudios
Repo: thelanterndaily (private)
Push each page on completion. Do not batch. main = v0-synced stable.

---

## MISSION OBJECTIVE

Build the full frontend for The Lantern Daily.
Dark editorial publication. Muslim tech. Operator audience.
Stack: Next.js 15 App Router + Tailwind CSS 4
Deployment: Vercel

---

## INSTALL FIRST

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## BRAND SYSTEM (LOCKED)

Colors as above. Never deviate.

Typography:
- Headings: serif or display, bold, editorial weight
- Body: clean sans-serif
- Category labels: #D92532 small caps, uppercase, tight tracking
- Wordmark: "The Lantern" (regular) + "DAILY" (bold italic)

CTA label: JOIN everywhere. Never Subscribe.

Author bylines: role-based only.
Use: "By The Lantern Editorial" / "By The Markets Desk" / "By The Signals Team"
NEVER personal names as if they are real individuals.

---

## PAGES — build in this exact order

### 1. `/` — Homepage

**Nav**
- Logo: lantern icon + "The Lantern DAILY" wordmark (left)
- Links: TODAY'S BRIEF | AI | MARKETS | TECH | STACK | ARCHIVE | ABOUT | REDLANTERN STUDIOS™ (external)
- Right: JOIN button (#D92532)
- Mobile: hamburger, full dark drawer

**Hero**
- Red eyebrow: "MUSLIM-BUILT. AI-NATIVE. SIGNAL OVER NOISE."
- H1: "The daily brief for builders who move before the market agrees."
- Subtext: "A live AI publication tracking the products, markets, tools, and founder signals that serious Muslim operators should know before consensus catches up."
- Email input (placeholder: "operator@email.com") + JOIN button
- Social proof line: "[X] Operators · [X] Signals Published"

**Featured + Secondary (right column)**
- LEAD badge article: image, category label, headline, role byline, date
- TECH badge article: image, category label, headline
- No video — cut from v1

**Latest Articles Grid**
- 6 cards. First card featured (wider/taller). Rest standard.
- Each: category label (red small caps), headline, role byline, date, excerpt, thumbnail

**Pull Quote**
- Full-width dark section, large italic serif quote
- Attribution: role title only — no personal names

**Market Signals**
- "MARKET SIGNALS" header
- 5 signal rows: category | headline | role byline | date | one-line excerpt
- "VIEW ALL SIGNALS →" link

**Operator Stack Showcase**
- "OPERATOR STACK SHOWCASE" header
- Editorial framing: "Tools the operators we cover are actually running."
- 4 tool cards with affiliate ref links

**Footer**
- Row 1: Logo + "Markets, tools, and product signal for Muslim-built AI operators."
- Row 2: Email + JOIN
- Row 3: Section nav links
- Row 4: Social | Privacy Policy | Contact | © By Red LLC

---

### 2. `/shorts` — Shorts feed (always free, never gated)
- Chronological, newest first, full body per card
- Infinite scroll (10 per load, cursor-based from Supabase)
- JOIN CTA after every 5 cards

### 3. `/shorts/[slug]` — Individual short
- Full content, role byline, related shorts (3), JOIN CTA at bottom

### 4. `/issues/[slug]` — Issue page
- Header: title, date, issue number, tier badge
- Premium gate: if paid AND not authenticated → first 200 words + blur + upgrade CTA
- Related issues (2), back to archive

### 5. `/archive` — All content
- Filter: All / Free / Premium
- Grid: 12 per page, URL params `/archive?tier=free&page=2`
- Locked cards: title + date visible, body blurred, lock icon

### 6. `/[category]` — Category pages (dynamic route)
Categories (exactly 5): ai | markets | tech | stack | founders
Route: `app/[category]/page.tsx`
- Validate against whitelist — 404 for any other value
- Same article grid as homepage, filtered by category
- H1: category name in red small caps

### 7. `/about` — About
- Mission section
- REQUIRED disclosure (verbatim):
  "The Lantern Daily is AI-researched and AI-drafted. All content is reviewed and curated before publication."
- [RO TO REPLACE] placeholders for team/mission copy

### 8. `/confirmed` — Post-subscribe
- "You are Operator #[NUMBER]" — large display, animated reveal
- Read from URL param `?operator=0042` (zero-padded 4 digits)
- "Welcome to The Lantern. Your signal is confirmed."
- Share prompt + Web Share API + clipboard fallback
- Upgrade CTA: "Unlock the Weekly Brief — $15/month"

---

## REQUIRED ADDITIONS (not optional)

- `app/feed.xml/route.ts` — RSS feed for all published issues (valid XML)
- `app/sitemap.ts` — Next.js sitemap, all published URLs
- `app/opengraph-image.tsx` — Homepage OG
- `app/issues/[slug]/opengraph-image.tsx` — Per-issue OG
- `public/robots.txt` — allow all
- Favicon set to lantern logo

---

## COMPONENTS — all in /components/lantern/

| Component | Notes |
|---|---|
| `<Nav />` | Dark, logo + links + JOIN, mobile hamburger |
| `<JoinForm />` | POST to /api/subscribe, loading + error states |
| `<ArticleCard />` | Category label, headline, role byline, date, excerpt, thumbnail. Featured variant. |
| `<ShortCard />` | Full body, category, role byline, date. Always unlocked. |
| `<PremiumGate />` | Blur overlay + upgrade CTA |
| `<OperatorNumber />` | Large animated display, reads URL param |
| `<SharePrompt />` | Web Share API + clipboard fallback |
| `<CategoryBadge />` | Red small caps |
| `<SignalRow />` | Market signals list row |
| `<StackCard />` | Tool card with affiliate link |
| `<Footer />` | Full dark footer with JOIN capture |

---

## API CALLS FRONTEND MAKES

- `POST /api/subscribe` → `{ operator_number: 42 }`
- `GET /api/check-tier` → `{ tier: 'free' | 'paid' }`
- `GET /api/issues?tier=&page=&limit=`
- `GET /api/issues/[slug]`
- `GET /api/shorts?cursor=`
- `GET /api/subscriber-count` → `{ count: number }`

---

## DEFINITION OF DONE

- [ ] Dark theme consistent throughout — no light/cream sections anywhere
- [ ] All 8 pages render without errors
- [ ] JOIN form POSTs and redirects to /confirmed with operator number
- [ ] Premium gate works for free users on paid issues
- [ ] /shorts infinite scroll works
- [ ] /[category] works for 5 categories, 404 for others
- [ ] RSS feed returns valid XML
- [ ] Sitemap includes all published URLs
- [ ] OG tags on homepage + issue pages
- [ ] Mobile responsive on all pages (375px clean)
- [ ] Vercel deploy succeeds on push to main
