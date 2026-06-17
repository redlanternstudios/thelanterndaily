# Lantern Market Intelligence Build Instructions

## Phase 1: Market Signal Infrastructure

### 1.1 API Endpoint Setup
- **Route:** `/api/admin/market-signal` (POST)
- **Auth:** `x-admin-key` header validation
- **Payload:** Market data from Musaffa API or manual ingestion
- **Operations:**
  - Parse market_data (current_price, previous_close)
  - Calculate change_pct = ((current - prev) / prev) * 100
  - Map halal_verdict to halal_status (pass→compliant, review→questionable, fail→non-compliant)
  - Upsert to `lantern_market_signals` with `onConflict: ticker` (one row per ticker)
  - Insert to `lantern_content_queue` for content review workflow

### 1.2 Database Schema
Table: `lantern_market_signals`
```
id (uuid, pk)
ticker (text, unique index)
name (text, nullable)
asset_class (text: 'equity' | 'crypto')
price (numeric, nullable)
change_pct (numeric, nullable)
halal_status (text: 'compliant' | 'questionable' | 'non-compliant', nullable)
halal_source (text: 'musaffa' | 'zoya' | 'tradeswarm' | 'manual')
signal (text: 'watch' | 'neutral' | 'bearish', nullable)
signal_note (text, nullable)
source_url (text, nullable)
as_of (timestamptz)
```

### 1.3 Deployment
- Route created at: `src/app/api/admin/market-signal/route.ts`
- Environment variables required:
  - `ADMIN_SECRET_KEY` (existing)
  - `SUPABASE_URL` (existing)
  - `SUPABASE_SERVICE_ROLE_KEY` (existing)

---

## Phase 2: Daily Market Signal Automation (C6 Blueprint)

### 2.1 Blueprint Configuration
- **File:** `make-blueprints/06_market_signal.json`
- **Schedule:** Daily (86400 seconds)
- **Timezone:** UTC
- **Max Retries:** 3 with 5-minute delay on failure

### 2.2 Execution Steps
1. **Fetch Market Data**
   - Source: `https://musaffa.com/api/market/signals`
   - Auth: Bearer token via `MUSAFFA_API_KEY`
   - Output: Array of market signals

2. **Analyze with DeepSeek**
   - Model: `deepseek-chat`
   - Endpoint: `https://api.deepseek.com/chat/completions`
   - Auth: Bearer token via `DEEPSEEK_API_KEY`
   - Prompt: Analyze for halal compliance and investment sentiment
   - Output: Structured analysis with sentiment, verdict, notes

3. **Store Signals**
   - POST to `/api/admin/market-signal`
   - Headers: `x-admin-key`, `Content-Type: application/json`
   - Deduplication: Upsert on ticker (automatic via DB constraint)

4. **Log Completion**
   - Info level logging
   - Count of processed signals

### 2.3 Environment Variables for C6
- `MUSAFFA_API_KEY` (Musaffa API access)
- `DEEPSEEK_API_KEY` (DeepSeek API access)
- `ADMIN_SECRET_KEY` (existing, for route auth)
- `API_BASE` (set to deployment URL)

### 2.4 Error Handling
- On failure: Automatically retry up to 3 times
- Slack notification on failure only
- Logs all errors for debugging

---

## Phase 1 & 2 Checklist

- [x] Create `/api/admin/market-signal/route.ts` with upsert logic
- [x] Create `lantern_market_signals` table schema
- [x] Create `make-blueprints/06_market_signal.json` with DeepSeek config
- [ ] Set `MUSAFFA_API_KEY` environment variable
- [ ] Set `DEEPSEEK_API_KEY` environment variable
- [ ] Deploy/publish C6 blueprint to scheduler
- [ ] Test market signal ingestion with sample payload
- [ ] Verify deduplication on ticker (upsert behavior)
- [ ] Monitor first daily run and logs

---

## Testing

### Manual Test: Create Market Signal
```bash
curl -X POST http://localhost:3000/api/admin/market-signal \
  -H "x-admin-key: $ADMIN_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "ticker": "AAPL",
    "company_name": "Apple Inc.",
    "asset_class": "equity",
    "market_data": {
      "current_price": 185.50,
      "previous_close": 183.20
    },
    "halal_verdict": "pass",
    "editorial": "Strong tech momentum with growing AI investments"
  }'
```

Expected response:
```json
{
  "ok": true,
  "ticker": "AAPL",
  "signalCreated": true,
  "queuedForReview": true
}
```

### Verify Database
```sql
SELECT ticker, price, change_pct, halal_status, signal, as_of 
FROM lantern_market_signals 
ORDER BY as_of DESC 
LIMIT 10;
```

---

## Next Steps (Phase 3+)

- Market Intelligence dashboard component with real-time signals
- Halal compliance scoring visualization
- Historical trend analysis and anomaly detection
- Integration with user portfolios and watchlists
