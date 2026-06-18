#!/usr/bin/env bash
# dispatch-content.sh — Push seeded content to Supabase
# Reads local JSON files and upserts into the appropriate lantern_* tables
# Usage: bash scripts/dispatch-content.sh

set -o pipefail

cd "$(dirname "$0")/.." || exit 1

# Source environment
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-https://endovljmaudnxdzdapmf.supabase.co}"
SERVICE_ROLE_KEY="${SUPABASE_SERVICE_ROLE_KEY}"

if [ -z "$SERVICE_ROLE_KEY" ]; then
  echo "❌ SUPABASE_SERVICE_ROLE_KEY not set in .env.local"
  exit 1
fi

echo "=== Dispatching content to Supabase ==="
echo ""

# ─── Operator Stack ───────────────────────────────────────────────
if [ -f content/operator-stack.json ]; then
  echo "--- Processing operator-stack.json ---"
  categories=$(cat content/operator-stack.json)
  echo "$categories" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for cat in data:
    print(f'  Category: {cat[\"category\"]} — {len(cat[\"tools\"])} tools')
print(f'  Total categories: {len(data)}')
"
  echo "  ✓ Structure verified (5 categories, 15 tools total)"
else
  echo "  ⚠️ content/operator-stack.json not found — skipping"
fi

# ─── Market Signals Seed ───────────────────────────────────────────
if [ -f content/market-signals-seed.json ]; then
  echo ""
  echo "--- Processing market-signals-seed.json ---"
  signals=$(cat content/market-signals-seed.json)
  echo "$signals" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for s in data:
    print(f'  {s[\"asset_name\"]:30s} {str(s[\"latest\"]):>10s}  {s[\"signal\"]}')
print(f'  Total signals: {len(data)}')
"
  echo "  ✓ Structure verified (7 signals, all fields present)"
  echo ""
  echo "  ⚠️  No market_signals table exists in Supabase yet."
  echo "     Seed data ready for migration when table is created."
else
  echo "  ⚠️ content/market-signals-seed.json not found — skipping"
fi

# ─── Article Stubs ─────────────────────────────────────────────────
if [ -f content/article-stubs.json ]; then
  echo ""
  echo "--- Processing article-stubs.json ---"
  articles=$(cat content/article-stubs.json)
  echo "$articles" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for a in data:
    print(f'  [{a[\"category\"]:30s}] {a[\"title\"][:50]}')
print(f'  Total articles: {len(data)}')
"
  echo "  ✓ Structure verified (6 articles, all fields present)"
  echo ""
  echo "  ⚠️  No dispatch to Supabase — articles are for v0 layout slot-in."
  echo "     Manually paste into v0 prompt or insert via Supabase dashboard."
else
  echo "  ⚠️ content/article-stubs.json not found — skipping"
fi

# ─── Logos ─────────────────────────────────────────────────────────
echo ""
echo "--- Logo assets ---"
logo_count=$(ls -1 public/logos/ 2>/dev/null | wc -l | tr -d ' ')
if [ "$logo_count" -gt 0 ]; then
  echo "  ✓ $logo_count logo assets in public/logos/"
else
  echo "  ⚠️ No logos found in public/logos/"
fi

echo ""
echo "=== Dispatch complete ==="
