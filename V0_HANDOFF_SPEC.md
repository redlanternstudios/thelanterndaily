# V0 HANDOFF SPEC — The Lantern Daily
Date: 2026-06-14 | Status: **LOCKED — decisions resolved, v0 prompt ready to run**

---

## WHAT V0 SHOULD PRODUCE

A pixel-accurate, dark editorial publication site. Use the design system below exactly. Do not introduce your own aesthetic choices.

---

## DESIGN SYSTEM (LOCK THESE — DO NOT DEVIATE)

### CSS Variables
```css
--bg: #07080F;
--surface: #0D0F1C;
--surface-2: #11142A;
--panel: #0A1322;
--red: #D42535;
--off: #F7F2EA;
--muted: #7A8299;
--dim: #4E556E;
--border: #252B3B;
--border-2: #394158;
--blue: #2F8FD8;
--green: #54D18A;
--gold: #C8A96E;
```

### Typography
- Headlines: Georgia, serif (700 weight)
- Body / UI: Inter, sans-serif
- Monospace / kickers / labels: Space Mono, monospace (Google Fonts)
- Kicker style: uppercase, letter-spacing 0.14em, font-size 11px, color var(--red), font-family Space Mono

### Spacing
- All gaps between blocks: 2px (flush grid, not gutter grid)
- `border-radius: 0 !important` — globally enforced, no exceptions
- Cards: `background: var(--surface)`, `border: 1px solid var(--border)`

### Body background
```css
background: 
  radial-gradient(circle at 18% 26%, rgba(212,37,53,0.18), transparent 34%),
  radial-gradient(circle at 76% 20%, rgba(47,143,216,0.16), transparent 34%),
  #07080F;
```

---

## COMPONENT SPECS

### Masthead (sticky, all pages)
```
height: 64px
background: rgba(7,8,15,0.92)
backdrop-filter: blur(14px)
border-bottom: 1px solid var(--border)
z-index: 100
padding: 0 48px

Left: Brand title (Georgia, 34px)
  "The " [white] + "Lantern" [#D42535] + " D" [white] + "AI" [#D42535] + "LY" [white]
  Below: "by " [white] + "Red" [#D42535] + "Lantern Studios™" [white] — Space Mono, 11px

Center: nav links — Today / AI / Markets / Tech / Stack / Archive / About
  font-family: Space Mono; font-size: 12px; letter-spacing: 0.08em; color: var(--muted)
  hover: color var(--off)

Right: "Join" button
  background: var(--red); color: #fff; font-family: Space Mono; font-size: 11px
  padding: 10px 22px; letter-spacing: 0.1em; no border-radius
```

### Editorial Ticker (below masthead)
```
background: var(--red)
height: 36px
overflow: hidden
white-space: nowrap

Text: "AI INFRASTRUCTURE · ISLAMIC FINANCE · OPEN SOURCE AGENTS · OPERATOR STACK · MUSLIM-BUILT TECH · FIELD NOTES · MARKET SIGNALS · FOUNDER INTELLIGENCE · GOVERNANCE · PRODUCT CALLS · " (repeated)
font-family: Space Mono; font-size: 11px; color: #fff; letter-spacing: 0.1em; line-height: 36px

Animation: continuous left scroll, ~30s duration, linear infinite
```

### Card component
```
background: var(--surface)
border: 1px solid var(--border)
border-radius: 0
padding: 0 (image fills top) or 24-32px (text card)
```

### Kicker
```
font-family: Space Mono, monospace
font-size: 11px
font-weight: 700
letter-spacing: 0.14em
text-transform: uppercase
color: var(--red)
margin-bottom: 14px
```

### Article image wrapper (Next.js Image fill)
```
position: relative  ← MANDATORY for Next.js Image fill to work
overflow: hidden
```

---

## PAGE 1 — HOMEPAGE

### Hero (top section)
```
grid: 0.95fr 1.15fr, gap 2px

LEFT: text panel card
  padding: 48px 40px
  display: flex; flex-direction: column; justify-content: space-between
  border-left: 2px solid var(--red)
  min-height: 430px
  
  Content:
  - kicker: article category (red, Space Mono)
  - h1: article title (Georgia, 42px, line-height 1.1)
  - p.excerpt: article excerpt (17px, color var(--muted))
  - byline: "Author · Date · Read time" (Space Mono, 11px, var(--dim))
  - CTA button: "Read the story →" (red button)

RIGHT: full-bleed image
  position: relative
  min-height: 430px
  overflow: hidden
  Next.js Image with fill + objectFit: cover + priority
```

### Second row
```
grid: 1.1fr 0.7fr 0.7fr, gap 2px

- Video card (1.1fr): article card with play button overlay + duration badge
- Article card (0.7fr): standard card with image
- Article card (0.7fr): standard card with image

image height: 260px on all three
```

### Section label + 4-column grid
```
Section label: "LATEST INTELLIGENCE" kicker + horizontal rule

4-col grid: repeat(4, 1fr), gap 2px
image height: 190px on all four cards
```

### Pull quote
```
border-left: 4px solid var(--red)
padding: 32px 40px
background: var(--surface-2)

.quote-text: Georgia, 24px, italic, color var(--off)
.byline below
```

### Market Signals + Operator Stack showcase (2-col)
```
grid: 1fr 1fr, gap 2px

LEFT — Market Signals table:
  Asset / Price / 24h / Signal columns
  val-up: var(--green); val-down: var(--red)
  signal-bullish chip: background rgba(84,209,138,0.12); color var(--green)
  Disclaimer line: Space Mono, 11px, var(--dim)

RIGHT — Operator Stack showcase:
  5 category rows: Infra / Models / Data / Apps / Governance
  Each row: category label (kicker, 80px wide) + 4 tool names (Space Mono, 12px, var(--off))
  border-bottom between rows
  "Full Stack Guide →" link at bottom
```

### Subscribe CTA
```
background: var(--surface)
padding: 64px
text-align: center

kicker → h2 → excerpt text → email input + Join button (inline)
social proof: "Join 18,472+ builders, investors, and operators"
```

### Footer
```
4-column grid: brand description / Coverage links / Company links / Legal links
footer-bottom: copyright line + "BUILD IN PUBLIC. OPERATE IN TRUTH."
border-top: 1px solid var(--border)
```

---

## PAGE 2 — ARTICLE PAGE

```
Masthead + ticker

Article header (max-width 800px, centered):
  kicker → h1 (52px, Georgia) → excerpt (20px) → byline
  border-bottom below byline

Hero image: 480px height, max-width 960px, centered

Two-column layout (1fr 380px, gap 64px, max-width 1140px, centered):

  LEFT: article body
    - Paragraphs: Georgia, 19px, line-height 1.8, color var(--off)
    - Pull quote: quote-block component (see above)
    - H2 headings for section breaks

  RIGHT: sticky sidebar (top: 96px)
    - "Related Intelligence" kicker
    - 3 related ArticleCards stacked (image height 140px)
    - Newsletter signup card: email input + Join button
```

---

## PAGE 3 — ARCHIVE PAGE

```
Masthead + ticker

Page header:
  kicker: "Intelligence Archive"
  h1: "Every signal we've published."
  excerpt: subtext
  border-bottom

Filter bar (wrap, gap 4px):
  Buttons: All / AI Infrastructure / Islamic Finance / Tech / Operator Stack / Field Notes / Video
  NOTE: "Islamic Finance" is canonical. Do not use "Halal Fintech".
  Active state: background var(--red), color #fff
  Inactive: outline, color var(--muted)

4-column article grid: repeat(4, 1fr), gap 2px
image height: 190px

Social proof (above footer or in page header):
  "18,472+ builders, investors, and operators"

Load More button (centered, outline style)

Footer
```

---

## PAGE 4 — OPERATOR STACK PAGE

```
Masthead + ticker

Hero (1fr 1fr, gap 2px):
  LEFT: text card — kicker, h1 (52px), excerpt, two buttons (Join / Browse)
  RIGHT: full-bleed hero image (min-height 480px)

Info row (3-col, gap 2px):
  Three cards: WHY THIS EXISTS / WHAT WE COVER / OPERATOR NOTE

Stack sections (5 rows, one per category):
  Each row: grid 240px 1fr, gap 2px
  
  LEFT (240px): vertical rotated kicker label
    writing-mode: vertical-rl; transform: rotate(180deg)
    centered, background var(--surface)
  
  RIGHT: 4 tool cards (repeat(4, 1fr), gap 2px)
    Each card:
    - 48×48 icon box (bg var(--surface-2), border var(--border-2))
      content: first 2 letters of tool name, Space Mono, var(--red)
    - kicker: tool category
    - h4: tool name (16px)
    - p: tool description (13px, line-height 1.6)

Categories and tools:
  Infra: AWS / Cloudflare / Vercel / GitHub
  Models & APIs: OpenAI / Anthropic / Google / Perplexity
  Data & Tools: PostgreSQL / Snowflake / Hex / Apify
  Applications: Notion / Linear / Figma / Slack
  Governance: 1Password / Sentry / Datadog / Vanta

Footer
```

---

## PAGE 5 — DASHBOARD

```
Layout: 280px sidebar + 1fr main (min-height 100vh)

SIDEBAR (background var(--panel), border-right 1px solid var(--border)):
  - Brand logo text (top, padding 24px 20px, border-bottom)
  - Nav sections: Content / Publishing / Assets / Growth / System
    Each section: section label (uppercase, 10px, var(--dim)) + nav items
    Active item: background var(--surface-2), border-left 2px var(--red)
  - Beehiiv sync status (bottom, green dot + "Synced" label)

MAIN:
  Sticky header (64px):
    Left: "Dashboard" kicker + current date
    Right: "Operator #0001" + avatar square (bg var(--red), letter "R")

  Content area (padding 32px):

    KPI cards (4-col, gap 2px):
      Total Subscribers: 18,704
      Open Rate (30d): 61%
      Articles Published: 47
      Queue Ready: 3
      Each card: kpi-label / kpi-value (32px, var(--off)) / kpi-delta (green or dim)

    Featured + Content Queue (2-col, gap 2px):
      LEFT: featured article card — Today's Lead / title / excerpt / byline / action buttons
      RIGHT: content queue — 4 items with status badges (ready/review/scheduled/draft)
        Status badge colors: ready=green, review=gold, scheduled=blue, draft=dim

    Analytics row (3-col, gap 2px):
      Top Articles (30d): ranked list with 01/02/03/04 labels
      Subscriber Growth: weekly table (week / new subs / open rate)
      Beehiiv Sync: status rows (subscribers synced, last issue, API health) + Force Sync button
```

---

## EXACT V0 PROMPT

```
Build a dark editorial publication website called "The Lantern Daily" — a Muslim-founded AI and tech newsletter targeting founders, builders, and operators.

Design system:
- Dark background: #07080F with red (#D42535) + blue (#2F8FD8) radial gradient accents
- Off-white text: #F7F2EA
- Red accent: #D42535 (kickers, active states, highlights)
- Cards: #0D0F1C background, 1px solid #252B3B border
- ALL border-radius: 0 — no rounded corners anywhere, ever
- Gaps between blocks: 2px (flush grid aesthetic, not gutter)
- Fonts: Georgia (headlines), Inter (body), Space Mono (kickers, labels, monospace UI)
- Kickers: Space Mono uppercase, 11px, 0.14em letter-spacing, red (#D42535)

Components to build:

1. Sticky masthead with logo text (not an image):
   "The [white] Lantern [red] D[white]AI[red]LY[white]" in Georgia 34px
   Below: "by [white] Red[red]Lantern Studios™[white]" in Space Mono 11px
   Center nav: Today / AI / Markets / Tech / Stack / Archive / About
   Right: "Join" button in red

2. Editorial ticker (below masthead, red background, white Space Mono text, infinite scroll animation):
   "AI INFRASTRUCTURE · ISLAMIC FINANCE · OPEN SOURCE AGENTS · OPERATOR STACK · MUSLIM-BUILT TECH · FIELD NOTES · MARKET SIGNALS ·"

3. Homepage with:
   - Hero: text panel left (article headline, excerpt, red CTA) + full-bleed image right (0.95fr / 1.15fr)
   - Second row: video card (1.1fr) + 2 article cards (0.7fr each)
   - Section divider + 4-column article grid
   - Pull quote block (red left border, Georgia italic)
   - 2-col: Market signals table + Operator stack showcase (5 category rows: Infra/Models/Data/Apps/Governance)
   - Email subscribe CTA
   - Footer

4. Article page: full-width header, hero image, 2-col layout (body + 380px sidebar with related + newsletter)

5. Archive page: filter bar + 4-column grid + load more

6. Operator Stack page: hero (text + image), 3-col info row, 5 stack sections with vertical category labels + 4 tool cards each

7. CMS Dashboard: 280px sidebar nav + main with KPI cards (18,704 subscribers), featured article + queue, analytics row

Imagery direction: multicultural with Islamic lens. South Asian, Arab, Black, MENA founders and engineers. Never white-dominant. Editorial, journalistic tone. No stock photography aesthetics.

Social proof number throughout: "18,472+ builders, investors, and operators"
```

---

## LOCKED DECISIONS (2026-06-14 — do not reopen)

| # | Decision | Locked Value | Note |
|---|----------|-------------|------|
| 1 | Social proof number | `18,472+` | **DESIGN PLACEHOLDER ONLY** — replace with real count before any external deploy. Never present as verified. |
| 2 | Category name | `Islamic Finance` | Canonical everywhere: ticker, archive filter, article tags, category labels. "Halal Fintech" removed from codebase. |
| 3 | Article inline chart | Skip — v1 prose only | No chart component. Revisit in v2 when article data pipeline exists. |
