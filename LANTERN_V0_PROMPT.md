# V0 PROMPT — THE LANTERN DAILY: MARKET INTELLIGENCE UPGRADE
## For alignment before coding. Read LANTERN_MARKET_BUILD_INSTRUCTIONS.md first.

---

## CONTEXT FOR V0

You are building two UI surfaces for The Lantern Daily, a Muslim-founded AI/tech newsletter.

Design system (locked — use CSS variables from globals.css, do not hardcode):
- `--bg: #07080F` — page background (body also has red + blue radial gradients + noise overlay)
- `--surface: #0D0F1C` — card backgrounds
- `--surface-2: #11142A` — elevated surfaces
- `--panel: #0A1322` — panel/sidebar
- `--red: #D42535` — all accents, kickers, CTAs
- `--off: #F7F2EA` — headings and primary text
- `--muted: #7A8299` — body copy, excerpts, secondary text
- `--dim: #4E556E` — labels, timestamps, tertiary text
- `--border: #252B3B` — card and section borders
- `--border-2: #394158` — stronger borders, hover states
- `--green: #54D18A` — compliant halal status, positive values
- `--gold: #C8A96E` — questionable halal status, warnings
- Fonts: Georgia (serif, headings) · Space Mono (monospace, tickers/labels/kickers) · Inter / system sans-serif (body)
- Max content width: 1440px centered, 32px horizontal padding
- `border-radius: 0 !important` already enforced globally — do NOT add any border-radius
- All spacing in multiples of 4px

**Critical rules:**
- No hardcoded prices, subscriber counts, user numbers, or market data. Show real data props or empty states.
- No buy/sell/invest language anywhere.
- Every financial surface needs a disclaimer.
- No rounded corners anywhere on the site.
- Dark theme only.

---

## SURFACE 1: HOMEPAGE MARKET INTELLIGENCE SECTIONS

Replace the current Market Watch two-column layout with three stacked sections:

### Section A: Market Watch · Halal-Screened (daily signals)

Full-width section. Section label component: left-aligned red kicker text "MARKET WATCH · HALAL-SCREENED" + full-width horizontal rule + right-aligned small link "VIEW ALL →".

Below the label, a horizontal table/list — NOT a grid of cards. Think terminal-style data table:

Each row shows:
- **Ticker** (Space Mono, 14px bold, `#F7F2EE`, left column ~80px wide)
- **Asset class pill** (10px uppercase, `#1F1F23` background, e.g. "EQUITY" or "CRYPTO")  
- **Company name** (13px, `#9CA3AF`, grows to fill space)
- **Editorial note** (12px italic, `#6B7280`, max 2 lines, truncated)
- **Halal status badge** (right-aligned): pill with color-coded text — compliant=`#16a34a`, questionable=`#ca8a04`, non-compliant=`#D92532`. Text: "COMPLIANT · MUSAFFA" or "REVIEW · ZOYA" — all caps, 9px, Space Mono
- **Price** (Space Mono, 13px, `#F7F2EE`, right-aligned)
- **Change %** (Space Mono, 12px bold, green if positive, red if negative, right-aligned)

Row height: 52px. Divider: 1px `#1F1F23`. No background on rows (transparent).

At the bottom of the table, a single line in 10px Space Mono dim text: "Prices updated daily · Screened via Musaffa & Zoya · Not financial advice · As of [timestamp]"

**Empty state** (when no data): centered text, dim, 14px: "Market signals updating — check back Friday morning."

---

### Section B: Halal Portfolio Picks · Q3 2026 Watch

Section label: "HALAL PORTFOLIO PICKS · Q3 2026 WATCH" + rule + "VIEW FULL ANALYSIS →" linking to `/portfolio`.

**Disclaimer banner** (full-width, immediately above the grid — cannot be missed):
```
[!] Educational purposes only. Not financial advice.
Screened for halal compliance per Musaffa / Zoya methodology.
Verify with a qualified Islamic finance scholar before investing.
```
Styling: `#0D0F14` background, left border `3px solid #D92532`, `#6B7280` text, 12px, 16px padding, Space Mono font.

Below the disclaimer: 3-column card grid (on desktop). Each card:

**Portfolio Pick Card:**
- Top: ticker in Space Mono 24px bold `#F7F2EE` + asset class pill (same as above)
- Allocation % large: "25%" in Georgia 36px `#D92532` (the red accent, prominent)
- Company name: 13px `#9CA3AF`
- Halal score bar: thin 4px bar, width proportional to score (0-100). Color matches status. Label: "HALAL SCORE 88/100" in 9px Space Mono dim.
- Source badge: "MUSAFFA" or "ZOYA" or "TRADESWARM" — 9px pill, `#1F1F23` background
- Editorial note: 12px italic `#6B7280`, max 2 lines
- Bottom link: "Verify on Musaffa →" in 10px red, opens musaffa.com/stocks/{ticker}
- Card border: `1px solid #1F1F23`, red top border 2px for compliant picks, amber for questionable
- Padding: 20px

Below the grid, a small row: "Analysis powered by TradeSwarm · Q3 2026 portfolio reviewed quarterly"

---

### Section C: From the Stack (existing — keep as-is)

Existing two-column layout (Daily Signals LEFT | From the Stack RIGHT) should become just "From the Stack" full-width OR keep as a single column. Do NOT duplicate Market Watch in this section.

---

## SURFACE 2: /portfolio PAGE

Full dedicated page. Server-rendered. URL: `/portfolio`.

### Hero block (full-width, dark surface):
- Kicker: "HALAL PORTFOLIO INTELLIGENCE" in red 10px uppercase Space Mono
- H1: "Screened by TradeSwarm." (Georgia 52px, white) newline "Curated by The Lantern." (Georgia 52px, `#D92532`)
- Subtext: 16px `#9CA3AF`: "Halal-verified investment context for Muslim founders and operators. Educational only — not financial advice."
- Disclaimer banner (same style as above, full-width)

### Full Portfolio Table:
All 6 picks in a clean table layout (wider than homepage cards, more detail per row):

Columns: Ticker | Company | Asset Class | Weight | Halal Score | Source | Editorial Rationale | Screened Date | Verify

Each row collapsible to show full rationale text on click (client component, `useState`).

Sticky header row with column labels in 9px Space Mono dim uppercase.

---

### Budget Calculator (client component, interactive):

Section label: "ILLUSTRATIVE BUDGET ALLOCATION"

Disclaimer (above the input, red border box):
"This calculator is for educational illustration only. It applies historical return data from June 2025–June 2026 to a hypothetical budget. Past performance does not predict future results. This is not investment advice."

**Input:**
- Label: "YOUR BUDGET (USD)" in 10px Space Mono red
- Large number input: `$[____]` — Space Mono 28px, white text, dark background, red bottom border only (no full border), placeholder `$10,000`
- No submit button — reactive on input change (debounced 300ms)

**Output table** (appears below input as user types):

| TICKER | COMPANY | WEIGHT | AMOUNT | HIST. 12M RETURN | ILLUSTRATIVE VALUE |
|--------|---------|--------|--------|------------------|--------------------|
| MSFT   | Microsoft | 25% | $2,500 | +18.2% | $2,955 |

Columns in Space Mono 12px. Green for positive return rows, amber for BTC (scholarly note), dim for questionable.

Footer below table: "Based on June 2025–June 2026 historical data. ILLUSTRATIVE ONLY. Not a projection. Halal screening as of June 2026 — verify current status before any investment decision."

---

### TradeSwarm Attribution Block:

Card with `#0D0F14` background, left red border:
- Logo placeholder: "TS" monogram in Space Mono red
- "Halal screening research powered by TradeSwarm"
- "TradeSwarm runs automated halal gate analysis across equity and crypto markets using Zoya API and proprietary TruthSerum scoring."
- "TradeSwarm is currently in research phase. Live signals launching Q4 2026."
- Link: "Learn about TradeSwarm →" (external, to be filled)

---

### Waitlist CTA:

Section: "GET TRADESW ARM MARKET INTELLIGENCE"
- Subtext: "Be notified when live halal-screened portfolio signals launch."
- Email input + "JOIN WAITLIST" button (red background, white text)
- Below: "No spam. Halal promise."

---

---

## IMAGE SYSTEM (mandatory — read before generating any image code)

A utility at `lib/article-images.ts` is the single source of truth for all article images.

**Import:**
```ts
import { getArticleImage } from "@/lib/article-images"
```

**Usage — every article/card image:**
```tsx
<Image
  src={article.image ?? getArticleImage(
    article.video ? "VIDEO" : (article.category ?? "TECH"),
    article.id
  )}
  alt={article.title}
  fill
  style={{ objectFit: "cover" }}
  sizes="(max-width: 900px) 100vw, 50vw"
/>
```

**Rules:**
- Never use `source.unsplash.com` — deprecated
- Never use `Math.random()` or dynamic URL generation
- Never hardcode Unsplash photo IDs outside `lib/article-images.ts`
- The utility is deterministic — same category + id always returns same image, no flicker between renders
- For portfolio pick cards: use `getArticleImage("MARKETS", pick.ticker)` as card background
- For market signal rows: no image (table layout, text only)
- `next/image` `remotePatterns` for `images.unsplash.com` is already configured in `next.config.ts`

Supported category strings (pass exactly): `"AI INFRASTRUCTURE"` `"ISLAMIC FINANCE"` `"OPEN SOURCE AGENTS"` `"OPERATOR STACK"` `"MUSLIM DEEP TECH"` `"FIELD NOTES"` `"MARKET SIGNALS"` `"FOUNDER INTELLIGENCE"` `"GOVERNANCE"` `"PRODUCT CALLS"` `"AI"` `"MARKETS"` `"TECH"` `"STACK"` `"VIDEO"`

---

## WHAT V0 MUST NOT DO

1. Do not hardcode any prices, percentages, or market data values into JSX
2. Do not add rounded corners (border-radius: 0 everywhere)
3. Do not use any colors outside the design system above
4. Do not add illustrations, emojis, or decorative elements
5. Do not add "Subscribe now" subscriber counts or user testimonials
6. Do not reference specific fund performance or price targets
7. Do not write "buy" "sell" "invest" anywhere in UI text
8. Do not make the disclaimer removable or collapsible — it must always be visible
9. Do not add animations beyond simple CSS transitions on hover (no scroll animations)
10. Do not use localStorage — all state in React state only

## COMPONENT NAMES (use these exactly for integration)

- `<MarketSignalsTable signals={LanternMarketSignal[]} />` — server, full Market Watch table
- `<PortfolioPicksGrid picks={LanternPortfolioPick[]} />` — server, 3-col homepage grid
- `<PortfolioTable picks={LanternPortfolioPick[]} />` — server, full-detail table for /portfolio
- `<BudgetCalculator picks={LanternPortfolioPick[]} />` — CLIENT component, "use client"
- `<FinancialDisclaimer variant="banner" | "compact" | "page" />` — reusable disclaimer component
- `<TradeSwarmAttribution />` — attribution card

---

## ALIGNMENT CHECKLIST (confirm before generating code)

- [ ] No hardcoded data
- [ ] Disclaimer visible above fold on /portfolio
- [ ] Disclaimer visible above portfolio picks on homepage
- [ ] All tickers show halal source
- [ ] Budget calculator clearly labeled as illustrative/historical
- [ ] TradeSwarm labeled as research/paper trading
- [ ] Zero buy/sell/invest language
- [ ] Sharp corners throughout
- [ ] Dark theme only
- [ ] Space Mono for all financial data

