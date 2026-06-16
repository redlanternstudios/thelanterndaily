# THE LANTERN DAILY — PRE-LAUNCH AUDIT
**Date:** 2026-06-15 | **Day 3 of 7** | **Status:** TRUTHSERUM MODE

---

## OPTION B — RAILWAY STATUS

`ANTHROPIC_API_KEY` was **never added** to Railway (Chrome was down when last attempted). Option B is already in effect.

**Current Railway vars (8):** NODE_ENV, OTEL_ENABLED, OTEL_SERVICE_NAME, PORT, GROQ_API_KEY ✅, DEEPSEEK_API_KEY ✅, OPENAI_API_KEY, GITHUB_TOKEN

**Two gaps found:**
- `TELEGRAM_BOT_TOKEN` — MISSING. SwarmClaw on Railway cannot receive Telegram messages without it. Robby PA on cloud is non-functional until this is added. This is a Ro action.
- `OPENAI_API_KEY` — Present but you said Groq/DeepSeek only. Decide: keep (costs $0 unless called) or remove to enforce the constraint.

---

## PRE-LAUNCH AUDIT — FULL SPECTRUM

### LAYER 1: DATABASE

| Item | Status | Notes |
|---|---|---|
| schema.sql in repo | ⚠️ WRONG VERSION | Uses old table names (signals, posts, shorts, subscribers). Does NOT contain the 8 lantern_* tables from the locked build plan. |
| lantern_content_queue | ❌ MISSING | Not in schema.sql. Must be created. |
| lantern_stack_entries | ❌ MISSING | Not in schema.sql. |
| lantern_video_channels | ❌ MISSING | Not in schema.sql. |
| lantern_video_features | ❌ MISSING | Not in schema.sql. |
| lantern_user_spotlights | ❌ MISSING | Not in schema.sql. |
| lantern_spotlight_referrals | ❌ MISSING | Not in schema.sql. |
| lantern_platform_crosspromo | ❌ MISSING | Not in schema.sql. Includes halal gate trigger. |
| lantern_affiliate_clicks | ❌ MISSING | Not in schema.sql. |
| RLS policies | ❌ MISSING | Old schema has RLS but for wrong tables. |
| Halal gate DB trigger | ❌ MISSING | `check_halal_screen_before_activate()` — not in schema.sql. |
| YouTube embed constraint | ❌ MISSING | `video_url NOT LIKE '%embed%'` — not enforced anywhere. |
| Supabase webhooks | ❌ NOT CONFIGURED | Listed as comments in schema.sql. Needs manual setup in dashboard. |
| **Migration run against Supabase?** | ❓ UNKNOWN | Cannot verify remotely. Need confirmation. |

**Verdict:** Schema in repo is stale. Must replace schema.sql with the 8-table migration from the build plan and run against RedLantern Studios Supabase project.

---

### LAYER 2: FRONTEND — PAGES

| Page | File | Status |
|---|---|---|
| `/` Homepage | app/page.tsx | ✅ EXISTS (basic) |
| `/stack` | app/stack/page.tsx | ✅ EXISTS |
| `/archive` | app/archive/page.tsx | ✅ EXISTS |
| `/dashboard` | app/dashboard/page.tsx | ✅ EXISTS |
| `/article` | app/article/page.tsx | ✅ EXISTS (but should be /issues/[slug]) |
| `/builders` | — | ❌ MISSING |
| `/builders/[slug]` | — | ❌ MISSING |
| `/issues/[slug]` | — | ❌ MISSING (dynamic route) |
| `/confirmed` | — | ❌ MISSING |
| `/about` | — | ❌ MISSING |

**Note:** `/article/page.tsx` is a static page — build plan requires `/issues/[slug]` as a dynamic route. These are structurally different.

---

### LAYER 3: FRONTEND — COMPONENTS

| Component | File | Status |
|---|---|---|
| Nav | components/ui/Nav.tsx | ✅ EXISTS |
| Button | components/ui/Button.tsx | ✅ EXISTS |
| IssueCard | components/ui/IssueCard.tsx | ✅ EXISTS |
| StackCard | components/ui/StackCard.tsx | ✅ EXISTS |
| SectionLabel | components/ui/SectionLabel.tsx | ✅ EXISTS |
| ArticleCard | components/ArticleCard.tsx | ✅ EXISTS |
| LanternMasthead | components/LanternMasthead.tsx | ✅ EXISTS |
| VideoCard | — | ❌ MISSING (no-embed enforced at component level) |
| UserSpotlightCard | — | ❌ MISSING |
| PlatformCrossPromoCard | — | ❌ MISSING |
| TickerStrip | — | ❌ MISSING |
| SubscribeForm | — | ❌ MISSING |
| PremiumGate | — | ❌ MISSING (paid content blur overlay) |
| Footer | — | ❌ MISSING |
| OperatorNumber | — | ❌ MISSING |
| RepoCard | — | ❌ MISSING |

---

### LAYER 4: API ROUTES

| Route | File | Status |
|---|---|---|
| POST /api/subscribe | app/api/subscribe/route.ts | ✅ EXISTS |
| POST /api/affiliate-click | — | ❌ MISSING |
| GET /api/check-tier | — | ❌ MISSING |
| POST /api/webhooks/stripe | — | ❌ MISSING |
| POST /api/webhooks/beehiiv | — | ❌ MISSING |

---

### LAYER 5: AUTOMATION (MAKE.COM)

| Scenario | Status |
|---|---|
| A: Tech Stack Daily Curate | ❌ NOT BUILT |
| B: Spotlight Referral Tracker | ❌ NOT BUILT |
| C: Platform Cross-Promo Rotation | ❌ NOT BUILT |
| D-1: Live User Spotlight Intake | ❌ NOT BUILT |
| D-2: Paid Spotlight Activation | ❌ NOT BUILT |
| Stripe webhooks wired | ❌ NOT WIRED (depends on Make.com scenarios first) |

---

### LAYER 6: PAYMENTS

| Item | Status |
|---|---|
| Stripe account | ✅ LIVE — acct_1THc0PD8NguWaPm7 |
| Monthly price | ✅ price_1TiMiYD8NguWaPm7NkQcfe4U ($15/mo) |
| Annual price | ✅ price_1TiMiZD8NguWaPm7O8DLGVBZ ($120/yr) |
| Lifetime price | ✅ price_1TiJK6D8NguWaPm7H6qSInfh ($199.99) |
| Spotlight upgrade | ✅ price_1TiMimD8NguWaPm7kPgngURq ($49) |
| Stripe Checkout links in UI | ❌ NOT WIRED (no Checkout components built yet) |
| Stripe webhooks | ❌ NOT WIRED (Make.com D-1/D-2 not built yet) |

---

### LAYER 7: BEEHIIV

| Item | Status |
|---|---|
| Paid tier | ✅ Active |
| **Boosts disabled** | ❌ **CRITICAL — NOT DONE** |
| Beehiiv API integration | ❌ NOT WIRED |
| Webhook → Supabase sync | ❌ NOT BUILT |
| First issue drafted | ❌ NOT DONE |
| Email template matches brand | ❓ UNKNOWN |

**BEEHIIV BOOSTS = CRITICAL BLOCK.** Cannot publish a single issue until this is disabled. Haram ads can appear to subscribers. Ro must do this manually in Beehiiv settings before any content goes live.

---

### LAYER 8: DNS + HOSTING

| Item | Status |
|---|---|
| Domain: thelanterndaily.com | Registered (Namecheap) |
| A record: 76.76.21.21 | ❌ NOT SET |
| CNAME: www → cname.vercel-dns.com | ❌ NOT SET |
| Vercel project created | ❓ UNKNOWN |
| Domain added in Vercel | ❌ NOT DONE |
| Repo connected to Vercel | ❓ UNKNOWN |
| .env.local / Vercel env vars | ❌ NOT SET |

---

### LAYER 9: ENV VARS

None of these are confirmed set in Vercel or .env.local:

| Var | Status |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | ❓ |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ❓ |
| SUPABASE_SERVICE_ROLE_KEY | ❓ |
| STRIPE_SECRET_KEY | ❓ |
| STRIPE_WEBHOOK_SECRET | ❓ |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | ❓ |
| STRIPE_MONTHLY_PRICE_ID | ❓ |
| STRIPE_ANNUAL_PRICE_ID | ❓ |
| BEEHIIV_API_KEY | ❓ |
| BEEHIIV_WEBHOOK_SECRET | ❓ |
| RESEND_API_KEY | ❓ |
| NEXT_PUBLIC_POSTHOG_KEY | ❓ |
| SENTRY_DSN | ❓ |
| GROQ_API_KEY (server-side) | ❓ |

All 14 unconfirmed. Zero have been verified as set.

---

### LAYER 10: CONTENT SEED

| Item | Status |
|---|---|
| Lantern Build Stack (12 tools) | ❌ NOT SEEDED |
| Video channel whitelist (≥5) | ❌ NOT SEEDED |
| Founding spotlights (≥1 before /builders launches) | ❌ NOT DONE |
| Partner research (Zoya, Wahed, etc.) | ❌ NOT DONE |
| First newsletter issue | ❌ NOT WRITTEN |

---

### LAYER 11: TRUST GATES

| Gate | Status |
|---|---|
| 1. Source whitelist (DB lookup) | ❌ Table not created |
| 2. Groq dual score (relevance + halal_stance) | ❌ Make.com Scenario A not built |
| 3. Editorial approval (Telegram) | ❌ Make.com D-1 not built |
| 4. Islamic claim screen | ❌ Not implemented |
| 5. Financial product screen | ❌ Not implemented |
| 6. Community correction loop | ❌ Not implemented |
| YouTube embed hard block (DB) | ❌ Table + constraint not created |
| YouTube embed hard block (component) | ❌ VideoCard not built |
| Beehiiv Boosts disabled | ❌ NOT DONE — CRITICAL |
| Halal badge display logic | ❌ Not implemented |

---

### LAYER 12: AUTH + PREMIUM GATING

| Item | Status |
|---|---|
| Supabase Auth configured | ❓ UNKNOWN |
| Free vs paid subscriber check | ❌ /api/check-tier not built |
| PremiumGate component | ❌ Not built |
| Stripe webhook → tier upgrade | ❌ Not built |
| Operator number assignment | ✅ Designed in schema (trigger exists in old schema) |

---

### LAYER 13: OBSERVABILITY

| Item | Status |
|---|---|
| PostHog installed | ❌ Not wired |
| Sentry installed | ❌ Not wired |
| Error log table | ✅ In old schema (not in new 8-table plan) |
| Affiliate click tracking | ❌ Not built |

---

### LAYER 14: SWARMCLAW / BUILD EXECUTION

| Item | Status |
|---|---|
| SwarmClaw on Railway | ✅ Online |
| GROQ_API_KEY on Railway | ✅ Set |
| DEEPSEEK_API_KEY on Railway | ✅ Set |
| ANTHROPIC_API_KEY on Railway | ✅ NOT PRESENT (Option B confirmed) |
| TELEGRAM_BOT_TOKEN on Railway | ❌ MISSING — Robby PA on cloud non-functional |
| Robby webhook pointing to Railway | ⚠️ SET (webhook set on Telegram bot) but bot token var missing |
| SwarmClaw locally (MacBook) | ❌ Crashed — sc-restart.sh pending |

---

## CRITICAL PATH TO GO-LIVE (ordered)

### BLOCKERS — Nothing else matters until these are done

1. **Replace schema.sql** with the 8-table migration and run against Supabase. (Everything depends on this.)
2. **Disable Beehiiv Boosts.** Cannot publish anything without this. Ro-only.
3. **TELEGRAM_BOT_TOKEN** added to Railway. Robby PA is dead without it. Ro-only.
4. **Set all env vars** in Vercel (or .env.local for dev). Supabase keys are the most critical — without them the app can't read/write anything.

### HIGH PRIORITY — Alif demo minimum viable

5. **Build /builders page** + submission CTA + at least 1 founding spotlight
6. **Build UserSpotlightCard component** (required for /builders)
7. **Build SubscribeForm component** → wire to /api/subscribe → Beehiiv
8. **Build /confirmed page** (operator number display)
9. **Build PremiumGate component** (paid content wall)
10. **Build /issues/[slug]** (dynamic route with premium gate)
11. **Make.com Scenario D-1** (spotlight intake)
12. **Make.com Scenario A** (content queue — needed for trust gates)
13. **Wire Stripe Checkout links** to subscription price IDs in UI
14. **DNS: A record + CNAME** in Namecheap → Vercel

### MEDIUM — Before first issue publishes

15. **Make.com Scenario D-2** (paid spotlight activation)
16. **Make.com Scenario B** (referral tracker)
17. **Make.com Scenario C** (cross-promo rotation)
18. **Wire Stripe webhooks** (D-1 and B must be live first)
19. **Beehiiv API** → /api/webhooks/beehiiv
20. **Seed content**: Lantern Build Stack (12 tools) + video channel whitelist (5+)
21. **PostHog** + **Sentry** instrumented
22. **VideoCard component** (with embed block enforced)
23. **Footer component**
24. **TickerStrip component**

### DEFERRED — Post-launch

25. Make.com Scenario C (cross-promo rotation)
26. /api/check-tier + full auth layer
27. Community correction loop (Gate 6)
28. Partner network at /partners
29. Islamic claim review workflow (Gate 4 + 5 full automation)

---

## MINIMUM VIABLE ALIF DEMO (Day 7 — Jun 21)

If everything above is too much for 4 remaining days, here's what you actually need live to demo:

| Item | Required? |
|---|---|
| Homepage with subscribe form | YES |
| /builders with 1 founding spotlight | YES |
| /stack with 3 free tool previews | YES |
| /issues/[slug] with 1 real issue | YES |
| Stripe checkout working (monthly/annual) | YES |
| Beehiiv Boosts disabled | YES (non-negotiable) |
| Trust badges visible on content | YES |
| thelanterndaily.com live on DNS | YES |
| Make.com D-1 (spotlight intake) | YES — needed to show the pipeline |
| Make.com A (content scoring) | NICE TO HAVE — can demo manually |
| Auth / premium gating | NO — can blur with static CSS for demo |
| All 8 DB tables migrated | YES — app won't function without them |

---

## OPEN DECISIONS (must lock before build continues)

1. **schema.sql conflict** — old schema (signals/posts/shorts) vs locked build plan (lantern_* tables). Which wins? (Answer: locked build plan — the old schema is from an earlier session and is superseded.)
2. **OPENAI_API_KEY on Railway** — remove to enforce Groq/DeepSeek only? Or keep as backup?
3. **Author/content voice** — AI personas with disclosure OR pure editorial voice? Locked design CTP called this open. Needed before first issue.
4. **Video Corner in v1** — design CTP recommended cutting. Build plan includes it. Lock this.
5. **Supabase project** — confirmed as RedLantern Studios existing project. Need service role key to proceed.

---

*Truth-first. Build in order. Don't ship until Beehiiv Boosts are off.*
