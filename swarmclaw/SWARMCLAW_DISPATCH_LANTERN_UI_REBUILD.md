# SWARMCLAW DISPATCH — THE LANTERN DAILY UI REBUILD
Date: 2026-06-17
Priority: HIGH
Trigger: Homepage layout rebuild initiated. v0 prompt sent. Agents must prepare content and data to populate the new layout correctly.

---

## CONTEXT

The Lantern Daily homepage is being rebuilt in v0 to match the approved reference design (dark newsprint layout). The v0 prompt has been issued. The new layout introduces sections that require real data and content — agents must prepare these now so the build doesn't block on content.

---

## AGENT ASSIGNMENTS

---

### WRITER — Article Content Pack

**Task:** Produce 6 real article stubs matching the homepage content grid slots.

For each article provide:
- title (match the slot headline from the v0 prompt or improve it)
- category tag (one of: AI INFRASTRUCTURE, ISLAMIC FINANCE, OPEN SOURCE AGENTS, OPERATOR STACK, MUSLIM DEEP TECH, FIELD NOTES, MARKET SIGNALS, FOUNDER INTELLIGENCE, GOVERNANCE, PRODUCT CALLS)
- subheadline (1–2 sentences, editorial voice, no fluff)
- byline: "by RedLantern Studios™"
- date: June 2025
- read_time: 4–8 min
- slug (kebab-case)
- body_stub: 2 opening paragraphs (real editorial content, not lorem ipsum)

Slots to fill:
1. HERO — "AI Infrastructure Is Becoming the New Commodity Trade"
2. VIDEO — "Watch: The 90-Second Signal" (video stub — include a script outline, 90 seconds)
3. TECH/AGENTS — "Why Agent Reliability Beats Model Benchmarks"
4. PRODUCT — "Designing AI Products People Actually Keep"
5. ISLAMIC FINANCE — "Islamic Finance Enters Its Platform Era"
6. FIELD NOTES — "What Founders Get Wrong About Focus"

Output format: JSON array → save to `the-lantern/content/article-stubs.json`

---

### DATA — Market Signals Verification

**Task:** Verify the Market Signals table data is structured correctly for the homepage component.

The homepage needs a real-time or cached market data feed with these fields per row:
- asset_name (string)
- ticker (string)
- latest (number)
- change_24h (percent string, e.g. "+1.32%")
- change_7d (percent string)
- signal (enum: "Bullish" | "Neutral" | "Bearish")

Seed data (to use if live feed not wired):
```json
[
  { "asset_name": "Nasdaq 100", "ticker": "NDX", "latest": 18708.34, "change_24h": "+1.32%", "change_7d": "+4.78%", "signal": "Bullish" },
  { "asset_name": "S&P 500", "ticker": "SPY", "latest": 5297.10, "change_24h": "+0.95%", "change_7d": "+2.21%", "signal": "Bullish" },
  { "asset_name": "Gold", "ticker": "XAU/USD", "latest": 2382.51, "change_24h": "-0.41%", "change_7d": "+1.12%", "signal": "Neutral" },
  { "asset_name": "Brent Oil", "ticker": "USO", "latest": 83.21, "change_24h": "-1.05%", "change_7d": "-1.63%", "signal": "Bearish" },
  { "asset_name": "BTC", "ticker": "USD", "latest": 66160.00, "change_24h": "+1.84%", "change_7d": "+3.22%", "signal": "Bullish" },
  { "asset_name": "AI Infra Basket*", "ticker": null, "latest": 132.47, "change_24h": "+1.61%", "change_7d": "+2.11%", "signal": "Bullish" },
  { "asset_name": "Global Cloud Spend (Est. Q1 2025)", "ticker": null, "latest": 78.68, "change_24h": "+1.47%", "change_7d": "+9.20%", "signal": "Bullish" }
]
```

Confirm this structure matches what the Supabase `market_signals` table (or equivalent) currently holds. If no table exists, flag to Ro.

Save verified structure to `the-lantern/content/market-signals-seed.json`

---

### BUILDER — Operator Stack Data

**Task:** Produce the Operator Stack data structure for the homepage component.

Required format:
```json
[
  {
    "category": "Infra",
    "description": "Scalable compute, storage, and networking for modern AI.",
    "icon": "server",
    "tools": ["AWS", "Azure", "Nvidia"]
  },
  {
    "category": "Models & APIs",
    "description": "Best-in-class models and embeddings to build on and scale.",
    "icon": "cpu",
    "tools": ["OpenAI", "Anthropic", "Mistral"]
  },
  {
    "category": "Data & Tools",
    "description": "Databases, caching, evals, and workflow orchestration.",
    "icon": "database",
    "tools": ["Databricks", "Pinecone", "LangSmith"]
  },
  {
    "category": "Applications",
    "description": "Production apps users love—with modern UX and durable backends.",
    "icon": "layout",
    "tools": ["Vercel", "Retool", "Supabase"]
  },
  {
    "category": "Governance",
    "description": "Security, observability, and policy frameworks you can trust.",
    "icon": "shield",
    "tools": ["Okta", "Vanta", "TrustLayer"]
  }
]
```

Save to `the-lantern/content/operator-stack.json`

Also: source grayscale SVG/PNG logos for each tool listed (white or light version). Download to `the-lantern/public/logos/`. Use official brand logos. Naming: `[tool-name-lowercase].svg`

---

### OBSERVE — Content Integrity Audit

**Task:** Audit the current live Lantern Daily site for any placeholder, broken, or wrong content.

Check:
1. Is the Rick Astley thumbnail visible anywhere? → Flag exact location in component tree
2. Are there any hardcoded fake articles that need replacing with real stubs?
3. Is the trust classification row (HALAL-ALIGNED / CRITICAL / BLOCKED / NUANCED) hardcoded into the layout? If so, flag the file and line number — this element needs to be removed from the homepage chrome
4. Does the category nav render as a ticker/marquee? If so, flag — it should be a static nav row
5. Is there a Market Signals section in the current build? If not, confirm missing

Output: `the-lantern/swarmclaw/CONTENT_INTEGRITY_AUDIT.md`

---

### LIBRARIAN — Archive this dispatch

Save this dispatch to the docs archive. Reference in the next WBR as: "UI Rebuild — Dispatch issued 2026-06-17, v0 prompt sent, content prep in progress."

---

## SUCCESS CRITERIA

- [ ] `article-stubs.json` written with 6 real articles
- [ ] `market-signals-seed.json` written and structure verified
- [ ] `operator-stack.json` written with all 5 categories + logos downloaded
- [ ] `CONTENT_INTEGRITY_AUDIT.md` written with broken content flagged
- [ ] Lantern homepage v0 rebuild in progress (Ro's action — v0 prompt sent)

---

## BLOCKING

Nothing blocks the data/content prep. All agents can run in parallel.

The v0 rebuild is Ro's action — paste the prompt into the Lantern Daily v0 session.

---

*Dispatched by Claude · RedLantern Studios Operating System · 2026-06-17*
