#!/usr/bin/env bash
# fill_blueprints.sh
# Reads .env.local and substitutes known secret placeholders in Make.com blueprints.
# Make.com formula expressions ({{left(...)}}, {{join(map(...))}}, etc.) are left untouched.
# Output: make-blueprints/filled/*.json — import these directly into Make.com.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env.local"
INPUT_DIR="$SCRIPT_DIR"
OUTPUT_DIR="$SCRIPT_DIR/filled"

mkdir -p "$OUTPUT_DIR"

# ── Load .env.local ──────────────────────────────────────────────────────────
if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: .env.local not found at $ENV_FILE"
  exit 1
fi

load_env() {
  local key="$1"
  grep "^${key}=" "$ENV_FILE" | head -1 | cut -d'=' -f2-
}

DEEPSEEK_API_KEY=$(load_env "DEEPSEEK_API_KEY")
ADMIN_WEBHOOK_SECRET=$(load_env "ADMIN_WEBHOOK_SECRET")
SUPABASE_URL=$(load_env "NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY=$(load_env "SUPABASE_SERVICE_ROLE_KEY")
RESEND_API_KEY=$(load_env "RESEND_API_KEY")
TELEGRAM_BOT_TOKEN=$(load_env "TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID=$(load_env "TELEGRAM_CHAT_ID")
YOUTUBE_DATA_API_KEY=$(load_env "YOUTUBE_DATA_API_KEY")
SITE_URL="https://thelanterndaily.com"  # override localhost

# ── Validate required vars ───────────────────────────────────────────────────
MISSING=()
[[ -z "$DEEPSEEK_API_KEY" ]]         && MISSING+=("DEEPSEEK_API_KEY")
[[ -z "$ADMIN_WEBHOOK_SECRET" ]]     && MISSING+=("ADMIN_WEBHOOK_SECRET")
[[ -z "$SUPABASE_URL" ]]             && MISSING+=("NEXT_PUBLIC_SUPABASE_URL")
[[ -z "$SUPABASE_SERVICE_ROLE_KEY" ]] && MISSING+=("SUPABASE_SERVICE_ROLE_KEY")
[[ -z "$TELEGRAM_BOT_TOKEN" ]]       && MISSING+=("TELEGRAM_BOT_TOKEN")
[[ -z "$TELEGRAM_CHAT_ID" ]]         && MISSING+=("TELEGRAM_CHAT_ID")

if [[ ${#MISSING[@]} -gt 0 ]]; then
  echo "ERROR: Missing required env vars: ${MISSING[*]}"
  exit 1
fi

# ── Substitution function ────────────────────────────────────────────────────
# Only replaces {{UPPER_SNAKE_CASE}} tokens (known secrets).
# Leaves all Make.com formula expressions untouched.
fill_blueprint() {
  local src="$1"
  local dst="$2"

  python3 - "$src" "$dst" \
    "$DEEPSEEK_API_KEY" \
    "$ADMIN_WEBHOOK_SECRET" \
    "$SUPABASE_URL" \
    "$SUPABASE_SERVICE_ROLE_KEY" \
    "$RESEND_API_KEY" \
    "$TELEGRAM_BOT_TOKEN" \
    "$TELEGRAM_CHAT_ID" \
    "$YOUTUBE_DATA_API_KEY" \
    "$SITE_URL" <<'PYEOF'
import sys, re

src, dst = sys.argv[1], sys.argv[2]
(
  deepseek, admin_secret, supa_url, supa_service,
  resend, tg_token, tg_chat, yt_key, site_url
) = sys.argv[3:]

# Only substitute known all-caps snake_case secret tokens
substitutions = {
    "DEEPSEEK_API_KEY":           deepseek,
    "ADMIN_WEBHOOK_SECRET":       admin_secret,
    "SUPABASE_URL":               supa_url,
    "SUPABASE_SERVICE_ROLE_KEY":  supa_service,
    "RESEND_API_KEY":             resend,
    "TELEGRAM_BOT_TOKEN":         tg_token,
    "TELEGRAM_CHAT_ID":           tg_chat,
    "YOUTUBE_DATA_API_KEY":       yt_key,
    "NEXT_PUBLIC_SITE_URL":       site_url,
    "SITE_URL":                   site_url,
}

with open(src) as f:
    content = f.read()

# Replace localhost URL regardless of placeholder
content = content.replace("http://localhost:3000", site_url)

# Replace only exact {{KEY}} tokens that match our substitution table
def replacer(m):
    key = m.group(1)
    return substitutions[key] if key in substitutions else m.group(0)

content = re.sub(r'\{\{([A-Z][A-Z0-9_]+)\}\}', replacer, content)

with open(dst, "w") as f:
    f.write(content)

print(f"  ✓ {src.split('/')[-1]} → {dst.split('/')[-1]}")
PYEOF
}

# ── Process each blueprint ───────────────────────────────────────────────────
echo ""
echo "Filling Make.com blueprints..."
echo ""

for src in "$INPUT_DIR"/*.json; do
  filename="$(basename "$src")"
  dst="$OUTPUT_DIR/$filename"
  fill_blueprint "$src" "$dst"
done

echo ""
echo "Done. Filled blueprints in: $OUTPUT_DIR"
echo ""
echo "Import order in Make.com (make.com → Scenarios → Import Blueprint):"
echo "  1. filled/03_content_radar.json        ← C1: runs every 4h, feeds the queue"
echo "  2. filled/02_daily_approval_digest.json ← C2: 5pm ET Telegram digest"
echo "  3. filled/01_welcome_sequence.json      ← U1: subscriber welcome emails"
echo "  4. filled/04_beehiiv_sync.json          ← D1: Beehiiv post → Supabase"
echo ""
echo "After import, set each scenario's schedule and turn ON."
