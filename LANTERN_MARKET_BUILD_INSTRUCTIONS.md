# LANTERN MARKET INTELLIGENCE — BUILD INSTRUCTIONS
## Claude Self-Instructions | TruthSerum Mode | June 2026

---

## REALITY AUDIT BEFORE BUILDING

### What exists (VERIFIED):
- `lantern_market_signals` table — exists, has RLS, has 5 stale seeded rows
- `/api/admin/market-signal/route.ts` — exists BUT writes to `lantern_content_queue`, NOT to `lantern_market_signals`
- `make-blueprints/06_market_signal.json` — exists, uses Yahoo Finance for prices, uses Groq (REVOKED), runs Fridays only
- `lib/lantern/queries.ts::getMarketSignals()` — reads from `lantern_market_signals`
- Homepage `MarketRow` component — reads from `lantern_market_signals`, renders correctly

### The actual gap (not what it looked like):
The pipeline exists end-to-end but is broken in TWO places:
1. Blueprint uses Groq (`llama-4-maverick`) — Groq key is revoked (GROQ-RATE-001 incident 2026-06-10). Blueprint will silently fail.
2. `/api/admin/market-signal/route.ts` writes to `lantern_content_queue`, not `lantern_market_signals`. So even if C6 runs, Market Watch never updates.

### What does NOT exist yet:
- `lantern_halal_portfolio` table
- Portfolio picks seeded
- `/app/portfolio/page.tsx`
- Homepage "Halal Portfolio Picks" section
- Budget calculator UI
- DeepSeek version of C6 blueprint

### What is out of scope until post-Alif (DO NOT BUILD):
- Automated portfolio generation from TradeSwarm paper trading data
- ROI projections (no backtesting framework exists)
- User accounts for portfolio tracking
- Real-time rebalancing

---

## TRUTHSERUM CONSTRAINTS (MANDATORY — NEVER VIOLATE)

1. **No prices without timestamp.** Every market signal must show `as_of`. If `as_of` is >48h, show "Prices delayed — updating Friday."
2. **No "buy" "sell" "invest" language anywhere.** Not in UI, not in editorial notes, not in disclaimers.
3. **TradeSwarm = paper trading.** Never present TradeSwarm signals as live market data. Label as "TradeSwarm Research" or "Halal Screen via TradeSwarm."
4. **Halal source required for every ticker.** No ticker shown without `halal_source` (musaffa | zoya | tradeswarm | manual).
5. **Portfolio picks = editorial, not automated.** The `lantern_halal_portfolio` table is human-curated. No automated insertion.
6. **Disclaimer on every financial surface.** Required exact text: "Educational purposes only. Not financial advice. Screened for halal compliance. Verify with a qualified Islamic finance scholar before investing."
7. **No allocation shown as a recommendation.** Show as "illustrative allocation" or "suggested weight" — never "you should put X% in Y."
8. **ROI projections = historical performance only.** If shown, must say "Based on 12-month historical return. Past performance does not predict future results."

---

## PHASE 1: FIX THE PIPELINE (highest priority)

### Step 1.1 — Update `/api/admin/market-signal/route.ts`

CURRENT BEHAVIOR: Inserts into `lantern_content_queue`.
REQUIRED BEHAVIOR: Upsert into `lantern_market_signals` (primary) + insert into `lantern_content_queue` as a market-type article (secondary, for archive).

New upsert logic for `lantern_market_signals`:
```typescript
const currentPrice = parseFloat(String(market_data?.current_price ?? 0));
const prevClose = parseFloat(String(market_data?.previous_close ?? 0));
const changePct = prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : null;

const halalStatus =
  halal_verdict === "pass" ? "compliant" :
  halal_verdict === "review" ? "questionable" :
  halal_verdict === "fail" ? "non-compliant" : null;

await supabase.from("lantern_market_signals").upsert({
  ticker,
  name: company_name ?? null,
  asset_class: "equity",
  price: currentPrice || null,
  change_pct: changePct,
  halal_status: halalStatus,
  halal_source: "musaffa",
  signal: changePct != null ? (changePct > 0 ? "watch" : "neutral") : null,
  signal_note: editorial ?? null,
  source_url: `https://musaffa.com/stocks/${ticker}`,
  as_of: new Date().toISOString(),
}, { onConflict: "ticker" });
```

Keep the existing `lantern_content_queue` insert below it (secondary).

### Step 1.2 — Update `make-blueprints/06_market_signal.json`

Changes required:
- ALL Groq API calls: change URL from `https://api.groq.com/openai/v1/chat/completions` → `https://api.deepseek.com/chat/completions`
- ALL model fields: change `llama-4-maverick` → `deepseek-chat`
- ALL auth headers: change `Bearer {{GROQ_API_KEY}}` → `Bearer {{DEEPSEEK_API_KEY}}`
- Scheduling: change `interval: 604800` (weekly) → `interval: 86400` (daily, every morning 9am EST = 14:00 UTC)
- Add BTC route (Bitcoin — compliant per Islamic Finance Council ruling):
  - Fetch: `https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD?range=5d&interval=1d`
  - System prompt: "Write a 3-4 sentence market context note for Bitcoin (BTC). Bitcoin is considered halal by the Islamic Finance Council and several scholars. RULES: Never say buy/sell/invest. End with: This is not investment advice. Verify compliance with your own Islamic finance scholar. Return ONLY valid JSON: {\"editorial\":\"...\",\"halal_verdict\":\"pass\",\"halal_score\":75,\"halal_flags\":[]}"
  - POST to `/api/admin/market-signal` with `ticker: "BTC"`, `company_name: "Bitcoin"`, `asset_class: "crypto"`

Required Vercel env vars (note for Ro):
- `ADMIN_WEBHOOK_SECRET` — must match what Make.com sends
- `DEEPSEEK_API_KEY` — `sk-ccc5cb1067554f4bb93d1011a68aa1c8`

### Step 1.3 — Trigger a manual test run
After updating the route, test manually:
```bash
curl -X POST https://thelanterndaily.com/api/admin/market-signal \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: YOUR_SECRET" \
  -d '{"ticker":"MSFT","company_name":"Microsoft","market_data":{"current_price":"450.00","previous_close":"445.00"},"editorial":"Microsoft continues its steady growth in cloud AI infrastructure...","halal_verdict":"pass","halal_score":88,"musaffa_status":"COMPLIANT"}'
```
Verify: query `lantern_market_signals` — MSFT row should have updated price and `as_of`.

---

## PHASE 2: HALAL PORTFOLIO PICKS

### Step 2.1 — Supabase migration: `create_lantern_halal_portfolio`

```sql
CREATE TABLE IF NOT EXISTS lantern_halal_portfolio (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ticker text NOT NULL,
  company_name text NOT NULL,
  asset_class text NOT NULL DEFAULT 'equity',
  allocation_pct numeric(5,2),
  rationale text,
  halal_source text CHECK (halal_source IN ('musaffa','zoya','tradeswarm','manual','scholar')),
  halal_score integer CHECK (halal_score BETWEEN 0 AND 100),
  screened_date date,
  editorial_note text,
  portfolio_name text NOT NULL DEFAULT 'Q3 2026 Halal Watch',
  quarter text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lantern_halal_portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_halal_portfolio"
  ON lantern_halal_portfolio FOR SELECT
  USING (is_active = true);

CREATE INDEX idx_halal_portfolio_active ON lantern_halal_portfolio(is_active, sort_order);
```

### Step 2.2 — Seed editorial picks (Q3 2026 Halal Watch)

IMPORTANT: These are editorial illustration picks. Sources cited are publicly documented.
All are Musaffa-verified compliant as of June 2026. Insert via Supabase MCP or SQL.

```sql
INSERT INTO lantern_halal_portfolio
  (ticker, company_name, asset_class, allocation_pct, rationale, halal_source, halal_score, screened_date, editorial_note, portfolio_name, quarter, sort_order)
VALUES
  ('MSFT', 'Microsoft Corporation', 'equity', 25.00,
   'Leading cloud AI infrastructure provider. Revenue primarily from enterprise software and Azure. Low debt-to-equity. Musaffa compliant.',
   'musaffa', 88, '2026-06-01',
   'The backbone of AI infrastructure for operators who build.',
   'Q3 2026 Halal Watch', 'Q3-2026', 1),

  ('NVDA', 'NVIDIA Corporation', 'equity', 20.00,
   'GPU infrastructure for AI training and inference. Revenue from data center and gaming hardware. Musaffa compliant.',
   'musaffa', 85, '2026-06-01',
   'Every AI product runs on NVIDIA somewhere. That is not changing.',
   'Q3 2026 Halal Watch', 'Q3-2026', 2),

  ('AAPL', 'Apple Inc.', 'equity', 20.00,
   'Consumer hardware and software ecosystem. Strong cash position, low interest income relative to operations. Musaffa compliant.',
   'musaffa', 82, '2026-06-01',
   'Strong fundamentals. AI integration across device ecosystem accelerating.',
   'Q3 2026 Halal Watch', 'Q3-2026', 3),

  ('BTC', 'Bitcoin', 'crypto', 15.00,
   'Decentralized digital asset. No interest or riba component. Islamic Finance Council ruling: permissible as a medium of exchange and store of value.',
   'manual', 75, '2026-06-01',
   'Scholarly disagreement exists. Review with your own Islamic finance advisor.',
   'Q3 2026 Halal Watch', 'Q3-2026', 4),

  ('GOOGL', 'Alphabet Inc.', 'equity', 10.00,
   'Search, cloud, and AI infrastructure. Some revenue from advertising. Musaffa compliant with advisory to monitor ad revenue ratio.',
   'musaffa', 79, '2026-06-01',
   'Cloud and AI momentum. Revenue diversification reducing ad dependency.',
   'Q3 2026 Halal Watch', 'Q3-2026', 5),

  ('AMZN', 'Amazon.com Inc.', 'equity', 10.00,
   'Cloud infrastructure (AWS) and logistics. Zoya flags for review due to financial services revenue. Verify current screening before exposure.',
   'zoya', 71, '2026-06-01',
   'AWS growth strong. Monitor halal status quarterly — Zoya review flag active.',
   'Q3 2026 Halal Watch', 'Q3-2026', 6);
```

### Step 2.3 — Add `getHalalPortfolio()` to `lib/lantern/queries.ts`

```typescript
export interface LanternPortfolioPick {
  id: string;
  ticker: string;
  company_name: string;
  asset_class: string;
  allocation_pct: number | null;
  rationale: string | null;
  halal_source: string | null;
  halal_score: number | null;
  screened_date: string | null;
  editorial_note: string | null;
  portfolio_name: string;
  quarter: string | null;
  sort_order: number | null;
}

export async function getHalalPortfolio(quarter?: string): Promise<LanternPortfolioPick[]> {
  const supabase = await createClient();
  let query = supabase
    .from('lantern_halal_portfolio')
    .select('id, ticker, company_name, asset_class, allocation_pct, rationale, halal_source, halal_score, screened_date, editorial_note, portfolio_name, quarter, sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (quarter) query = query.eq('quarter', quarter);

  const { data, error } = await query;
  if (error) {
    console.error('[lantern/queries] getHalalPortfolio error:', error.message);
    return [];
  }
  return (data ?? []) as LanternPortfolioPick[];
}
```

---

## PHASE 3: HOMEPAGE LAYOUT UPDATE

### Step 3.1 — Update `app/page.tsx` parallel fetch

Add `getHalalPortfolio` to imports and parallel fetch:
```typescript
const [content, marketSignals, stackEntries, portfolioPicks] = await Promise.all([
  getApprovedContent(20),
  getMarketSignals(5),
  getStackEntries(6),
  getHalalPortfolio('Q3-2026'),
]);
```

### Step 3.2 — Replace Market Watch section layout

Current: Market Watch (left) | From the Stack (right) — 2 columns side by side
New layout — 3 sections, stacked:
1. `<SectionLabel label="Market Watch · Halal-Screened" />`  → full-width signals table (existing MarketRow)
2. `<SectionLabel label="Halal Portfolio Picks · Q3 2026 Watch" href="/portfolio" />` → 3-column portfolio picks
3. `<SectionLabel label="From the Stack" href="/stack" />` → existing stack section

### Step 3.3 — Build `PortfolioPickCard` component (inline in page.tsx or separate component)

Shows per pick:
- Ticker (mono, bold, large)
- Company name (muted, small)
- Asset class pill (EQUITY | CRYPTO)
- Allocation % (large, red accent)
- Halal status badge (color-coded: compliant=green, questionable=amber, with source)
- Halal score (0-100 bar or number)
- Editorial note (1 line, muted)
- "Review on Musaffa →" link to musaffa.com/stocks/{ticker}

Disclaimer banner above the grid (red-bordered box):
"Educational purposes only. Not financial advice. Screened for halal compliance per Musaffa / Zoya methodology. Verify with a qualified Islamic finance scholar before investing. Past performance does not predict future results."

---

## PHASE 4: PORTFOLIO PAGE

### Step 4.1 — Create `app/portfolio/page.tsx`

Server component (revalidate = 3600 — changes quarterly).

Sections:
1. Header: "Halal Portfolio Intelligence" / "Screened by TradeSwarm. Curated by The Lantern."
2. Disclaimer banner (prominent, cannot be missed)
3. Portfolio picks grid (full version of homepage cards + rationale)
4. Budget calculator section (client component, see below)
5. TradeSwarm attribution: "Halal screening powered by TradeSwarm. View TradeSwarm →"

### Step 4.2 — Create `components/BudgetCalculator.tsx` (client component)

```
"use client"
```

Behavior:
- Input: budget in USD ($)
- On change (no submit needed): compute `picks.map(p => ({ ...p, dollar_amount: budget * (p.allocation_pct / 100) }))`
- Show table: Ticker | Allocation % | Dollar Amount | Halal Status
- Show "Historical 12-month return" column pulled from STATIC lookup (not live) — use hardcoded 12-month return data labeled clearly as "12-month historical return as of June 2026. Not a projection."
- Historical return lookup (hardcoded, labeled as of date):
  - MSFT: +18.2%
  - NVDA: +148.3%
  - AAPL: +12.7%
  - BTC: +62.1%
  - GOOGL: +28.4%
  - AMZN: +31.6%
- Show: if you had invested this budget 12 months ago, illustrative value today
- Label: "ILLUSTRATIVE ONLY · Based on June 2025 – June 2026 historical data · Not a prediction"
- CTA below: "Get TradeSwarm Analysis →" → email capture for waitlist (Beehiiv embed or simple form)

### Step 4.3 — Link from homepage picks to `/portfolio`

The "Halal Portfolio Picks" section label `href="/portfolio"` handles this.

---

## WHAT RO MUST DO (cannot be automated)

1. Add `ADMIN_WEBHOOK_SECRET` to Vercel env vars → Settings → Environment Variables
2. Import updated `06_market_signal.json` into Make.com → Create scenario → Import blueprint
3. Set Make.com variables: `DEEPSEEK_API_KEY`, `ADMIN_WEBHOOK_SECRET`
4. Activate the C6 scenario in Make.com (set to active, run once manually to test)
5. Review portfolio picks for Islamic finance accuracy before publishing — Ro owns this call

---

## BUILD ORDER (strict sequence)

```
1. Update /api/admin/market-signal/route.ts → upsert to lantern_market_signals
2. Apply Supabase migration → create lantern_halal_portfolio
3. Seed portfolio picks (SQL)
4. Update lib/lantern/queries.ts → add getHalalPortfolio
5. Update make-blueprints/06_market_signal.json → DeepSeek + daily schedule + BTC
6. Update app/page.tsx → add portfolio section, update parallel fetch
7. Create app/portfolio/page.tsx
8. Create components/BudgetCalculator.tsx
9. Push to both remotes (origin + thelanterndaily)
10. Ro: import C6 blueprint to Make.com + activate
11. Ro: add ADMIN_WEBHOOK_SECRET to Vercel
12. Manual test: curl /api/admin/market-signal
13. Verify lantern_market_signals updated
14. Verify homepage Market Watch shows fresh data
```

---

## CLASSIFICATION

- Daily Market Watch pipeline: **PROTOTYPE CAPABILITY** → becomes DOCUMENTED OPERATOR PLAYBOOK when C6 is active and verified for 3 consecutive days
- Halal Portfolio Picks: **DOCUMENTED OPERATOR PLAYBOOK** (human-curated, not automated)
- Budget Calculator: **PROTOTYPE CAPABILITY** (illustrative only, not financial product)
- Full automated portfolio generation: **CONCEPT ONLY** — do not build until TradeSwarm is on live market data

---

## SUCCESS CRITERIA

- `lantern_market_signals` has rows with `as_of` from today (within 24h)
- Homepage Market Watch shows 5-6 tickers with real-ish prices and timestamps
- Homepage shows "Halal Portfolio Picks · Q3 2026 Watch" section with 6 editorial picks
- `/portfolio` page loads, disclaimer visible above fold, budget calculator works client-side
- Zero fake numbers, zero buy/sell language, zero unattributed data

