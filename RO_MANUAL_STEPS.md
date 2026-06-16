# THE LANTERN DAILY — GO-LIVE CHECKLIST
**Updated: 2026-06-16** | Only Ro can do these. Everything else is built.

---

## ✅ WHAT'S ALREADY DONE (don't touch)
- All 10 DB tables live in Supabase
- Stripe products + 4 price IDs created
- All components: SubscribeForm, Footer, PremiumGate, UserSpotlightCard, VideoCard
- All pages: /, /about, /builders, /builders/[slug], /issues/[slug], /confirmed
- API routes: /api/subscribe, /api/checkout, /api/webhooks/stripe ← new
- Supabase clients: anon (server.ts + client.ts) + service role (service.ts) ← new
- .env.local updated with all known keys + NEXT_PUBLIC_ Stripe price vars ← new
- Ummah-first attribution fixed

---

## ⛔ BLOCKER 1 — STRIPE SECRET KEY (do before deploy)
**Why:** `mk_` restricted keys cannot create checkout sessions or verify webhooks.
**You need:** `sk_live_` key (full secret key).

**Link:** https://dashboard.stripe.com/acct_1THc0PD8NguWaPm7/apikeys

**Steps:**
1. Log in to Stripe dashboard
2. Click "Reveal live key" next to Secret key (starts with `sk_live_`)
3. Replace `STRIPE_SECRET_KEY` in `.env.local` with the `sk_live_` value
4. Also grab the publishable key (`pk_live_`) and replace `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

---

## ⛔ BLOCKER 2 — VERCEL DEPLOY (prerequisite for DNS + webhooks)
**Link:** https://vercel.com/new

**Steps:**
1. Import `the-lantern` repo from RedLanternstudios GitHub org
2. Root directory: `the-lantern`
3. Framework: Next.js (auto-detected)
4. Go to Project Settings → Environment Variables
5. Paste ALL vars from `.env.local` — including the `sk_live_` key once you have it
6. Deploy

**After deploy, grab your Vercel URL** (e.g. `the-lantern-xyz.vercel.app`) — needed for Step 3.

---

## ⛔ BLOCKER 3 — STRIPE WEBHOOK SECRET (after Vercel deploys)
**Link:** https://dashboard.stripe.com/webhooks

**Steps:**
1. Click "Add endpoint"
2. URL: `https://thelanterndaily.com/api/webhooks/stripe` (or Vercel URL if DNS not live yet)
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
4. Copy the "Signing secret" → paste as `STRIPE_WEBHOOK_SECRET` in Vercel env vars
5. Redeploy (or it picks up on next build)

---

## STEP 4 — DNS IN NAMECHEAP
**Link:** https://ap.www.namecheap.com/domains/domaincontrolpanel/thelanterndaily.com/advancedns

Add these 2 records:

| Type  | Host | Value                | TTL       |
|-------|------|----------------------|-----------|
| A     | @    | 76.76.21.21          | Automatic |
| CNAME | www  | cname.vercel-dns.com | Automatic |

Then in Vercel → Settings → Domains → add `thelanterndaily.com` and `www.thelanterndaily.com`.
DNS propagates in 5–30 min.

---

## STEP 5 — BEEHIIV BOOSTS OFF (halal compliance)
**Link:** https://app.beehiiv.com/monetize/boosts
**Action:** Toggle ALL Boosts OFF before any subscribers land.

---

## STEP 6 — POSTHOG KEY (nice to have for Alif demo)
**Link:** https://app.posthog.com/project/settings
1. Copy Project API Key
2. Add as `NEXT_PUBLIC_POSTHOG_KEY` in Vercel env vars

---

## STEP 7 — MAKE.COM SCENARIOS (can build after go-live)
**Link:** https://make.com
Blueprints are in `the-lantern/make-blueprints/`

Build order:
1. `03_content_radar.json` → Scenario A (daily content curation, 8am)
2. `01_welcome_sequence.json` → welcome email to new subscribers
3. `04_beehiiv_sync.json` → Beehiiv subscriber sync
4. D-1 → spotlight intake → add webhook URL to `MAKE_SPOTLIGHT_INTAKE_WEBHOOK`
5. D-2 → paid spotlight activation → add webhook URL to `MAKE_PAID_WEBHOOK`

---

## STEP 8 — SEED DEMO DATA FOR ALIF (Jun 21 deadline)
For the demo, you need at least 1 record in each:

### Builder spotlight in Supabase:
Go to: https://supabase.com/dashboard/project/endovljmaudnxdzdapmf/editor
Table: `lantern_spotlights`

Insert 1 row:
```json
{
  "operator_number": 1,
  "slug": "founding-operator",
  "name": "Founding Operator",
  "title": "Builder",
  "company": "The Ummah",
  "bio": "The first operator in the Lantern community.",
  "is_paid": false,
  "status": "published",
  "stack": [{"tool": "Claude", "url": "https://claude.ai", "note": "AI layer"}]
}
```

### Newsletter issue in Supabase:
Table: `lantern_issues`

Insert 1 row:
```json
{
  "slug": "issue-001",
  "title": "The First Lantern",
  "excerpt": "What we're building and why it matters.",
  "is_premium": false,
  "content": "<p>Welcome to The Lantern Daily.</p>",
  "published_at": "2026-06-16T08:00:00Z",
  "status": "published"
}
```

---

## ALIF DEMO MINIMUM (June 21)

Hard minimum to demo live:
1. ☐ DNS live → thelanterndaily.com resolves
2. ☐ sk_live_ key in Vercel
3. ☐ Stripe webhook secret in Vercel
4. ☐ Subscribe form → /confirmed page (shows operator number)
5. ☐ /builders → at least 1 spotlight showing
6. ☐ /issues/issue-001 → visible free issue
7. ☐ Beehiiv Boosts OFF

Can show as "in pipeline" for Alif: Make.com automation, content curation AI, referral system.
The demo is: vision + skeleton working, not full product.
