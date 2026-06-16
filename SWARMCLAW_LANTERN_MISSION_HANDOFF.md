# SWARMCLAW — THE LANTERN DAILY MISSION HANDOFF
**Date:** 2026-06-14 | **Scope:** LOCKED | **Trigger:** Ro says "CONFIRMED — LANTERN-STACK-V1 EXECUTE"

---

## MISSION BRIEF

Build The Lantern Daily — Muslim tech newsletter. Trust-first. Ummah-first. Alif-presentation-ready by Jun 21.

Full dispatch: `the-lantern/SWARMCLAW_DISPATCH_LANTERN_STACK_V1.md`
Full build plan: `the-lantern/LANTERN_COMPREHENSIVE_BUILD_PLAN_V1.md`

---

## WHAT'S ALREADY DONE (DO NOT REPEAT)

- Stripe products created and live (4 products — see build plan for IDs)
- SWARMCLAW_DISPATCH updated with all Scenario D-1/D-2 specs, table renames, Stripe IDs
- Memory files updated
- Build plan written and saved to Drive + Notion
- lantern_user_spotlights schema defined (renamed from operator_spotlights, paid tier fields added)

---

## WHAT SWARMCLAW EXECUTES (on Ro's CONFIRMED trigger)

### PRE-FLIGHT (ROBBY checks before dispatching agents)
1. Confirm RedLantern Studios Supabase project ID accessible to ENGINEER
2. Confirm Next.js repo path at apps/the-lantern/ OR scaffold fresh Next.js app
3. Confirm SwarmClaw fully running (this file is only read if running — so check passes)
4. Stripe: DONE ✅ (skip)

### PHASE 1 — ENGINEER: Database (8 migrations)
Run in sequence against RedLantern Studios Supabase project.
SQL source: `SWARMCLAW_DISPATCH_LANTERN_STACK_V1.md` → Migrations section

Critical verifications after each migration:
- Migration 4 (lantern_user_spotlights): confirm all paid tier fields present
- Migration 6 (lantern_platform_crosspromo): confirm halal_screened trigger fires
- Migration 3 (lantern_video_features): confirm embed HARD BLOCK constraint works

### PHASE 2 — ENGINEER: Make.com Scenarios (5 total)
A, B, C, D-1, D-2 — specs in dispatch file.
After D-2: provide Stripe webhook URL to Ro for configuration.

### PHASE 3 — BUILDER: Frontend Components + Pages
Components (in components/lantern/):
- VideoCard.tsx — linked cards, NO iframes ever
- StackToolCard.tsx — free teaser variant + paid full variant
- RepoCard.tsx
- UserSpotlightCard.tsx — free + paid badge variant (gold "FEATURED BUILDER ✦" if tier='paid')
- PlatformCrossPromoCard.tsx

Pages:
- app/stack/page.tsx — subscription gate on paid content
- app/builders/page.tsx — public, submit CTA always visible
- app/builders/[slug]/page.tsx — public, affiliate CTA, paid features if tier='paid'

API Routes:
- app/api/affiliate-click/route.ts
- app/api/subscribe/route.ts (add ref= param handling)

Stripe Checkout links (use these exact price IDs):
- Monthly: price_1TiMiYD8NguWaPm7NkQcfe4U
- Annual: price_1TiMiZD8NguWaPm7O8DLGVBZ
- Spotlight upgrade: price_1TiMimD8NguWaPm7kPgngURq?client_reference_id=[spotlight_id]

### PHASE 4 — DATA: API Routes + Beehiiv Integration
Wire /api/subscribe to Beehiiv + Supabase
Wire /api/affiliate-click to lantern_affiliate_clicks table

### PHASE 5 — COMPLY: Trust Audit (10-point checklist)
Source: dispatch file COMPLY section
BLOCK deployment if any check fails. No exceptions.

### PHASE 6 — RESEARCH: Content Pre-Seeding (parallel with 3/4)
- Channel whitelist: ≥ 5 video channels (MUSLIM_RUN, HALAL_SAFE, or OPERATOR_RECOMMENDED)
- Stack seed: 12 tools ("Lantern Build Stack" — editorial voice, NO individual attribution)
- Platform partners: ≥ 3 researched (Zoya, Islamic Finance Guru, Wahed Invest)

### PHASE 7 — ALL: Ro Review + Sign-Off
Deploy to Vercel staging → report URL to Ro for review.
DO NOT DEPLOY TO PRODUCTION WITHOUT RO CONFIRMATION.

---

## KEY RULES (ROBBY ENFORCES)

1. YouTube embeds: ZERO TOLERANCE. VideoCard never renders iframes. COMPLY confirms via DOM test.
2. Ummah-first: /builders page must show open submission CTA. NO editorial staff featured.
3. Beehiiv Boosts: COMPLY flags if Boosts status cannot be confirmed disabled (Ro action).
4. Paid spotlight: ADDITIVE ONLY. Free tier never degraded. Paid never required to see free spotlight.
5. Affiliate disclosure: "(referral — builder earns commission)" adjacent to all affiliate CTAs.
6. Halal platform gate: DB trigger blocks activation without halal_screened = true.

---

## UMMAH-FIRST RULE (NON-NEGOTIABLE)

Ro does NOT appear anywhere on The Lantern Daily.
No founder face. No personal spotlight. No attribution to Ro.
Cold-start team: Ro, Bilal, Keymon, Homira, Build Team doing outreach — not featuring themselves.

---

## BRAND

Background: #07080D | Cards: #0D0F14 | Text: #F7F2EE
Halal Green: #2D7A4F (verified trust signals ONLY)
Scholar Gold: #B8922A (Islamic attribution + featured builder badge ONLY)
Red: #D92532 (category labels, section headers)
Bismillah (بسم الله) as editorial opening. Hijri date first.

---

## ALIF PRESENTATION TARGET

Jun 21, 2026 — The Lantern Daily live at thelanterndaily.com (or staging) with:
- Homepage functional
- /stack with 3-tool free teaser and subscription gate
- /builders with ≥ 1 founding spotlight + open submission CTA
- Newsletter subscribe working (Beehiiv)
- Stripe checkout functional (monthly + annual)
- Trust badges visible
- No haram content slip-throughs

---

*Dispatch: SWARMCLAW_DISPATCH_LANTERN_STACK_V1.md*
*Build Plan: LANTERN_COMPREHENSIVE_BUILD_PLAN_V1.md*
*Scope locked 2026-06-14. Changes require Ro sign-off.*
