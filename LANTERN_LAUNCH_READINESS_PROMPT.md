# THE LANTERN DAILY — LAUNCH READINESS + SEMI-AUTONOMOUS OPERATION AUDIT
**Version:** 1.0 | **Date:** 2026-06-15
**Use:** Run at session start OR as SwarmClaw mission trigger
**Trigger phrase (SwarmClaw):** "LANTERN-AUDIT-V1 EXECUTE"

---

## WHO RUNS THIS

**Claude (specialist):** Runs this at session start to orient before any Lantern work.
**SwarmClaw (COMPLY + ENGINEER agents):** Runs this as a pre-build gate before executing LANTERN-STACK-V1.

---

## OBJECTIVE

Determine the exact delta between current state and The Lantern Daily operating semi-autonomously. No assumptions. No optimism. Verified facts only.

Semi-autonomous means:
- Daily content scoring runs without Ro (Make.com Scenario A)
- Spotlight intake routes and emails editorial team without Ro (Scenario D-1)
- Paid activation fires on Stripe webhook without Ro (Scenario D-2)
- Referral commissions track without Ro (Scenario B)
- Cross-promo rotates without Ro (Scenario C)
- Ro only touches: editorial approve/reject decisions + newsletter writing in Beehiiv

---

## AUDIT INSTRUCTIONS

For each item below, classify as one of:
- ✅ VERIFIED — confirmed working, tested
- 🟡 PARTIAL — exists but incomplete or untested
- ❌ MISSING — not built
- ❓ UNKNOWN — cannot determine without checking

Do NOT mark anything ✅ unless you have direct evidence. Label assumptions as ASSUMED.

---

## SECTION 1 — DATABASE (Supabase: RedLantern Studios project)

Check: have these 8 migrations been run against the live Supabase project?

| # | Table | Status | Notes |
|---|-------|--------|-------|
| 1 | `lantern_content_queue` | ❓ | AI-scored content pipeline |
| 2 | `lantern_stack_entries` | ❓ | Weekly Tech Stack tool entries |
| 3 | `lantern_video_channels` | ❓ | Video channel whitelist |
| 4 | `lantern_video_features` | ❓ | Video cards (embed HARD BLOCKED) |
| 5 | `lantern_user_spotlights` | ❓ | Spotlight entries (free + paid tier) |
| 6 | `lantern_spotlight_referrals` | ❓ | Affiliate commission tracking |
| 7 | `lantern_platform_crosspromo` | ❓ | Halal partner cross-promo |
| 8 | `lantern_affiliate_clicks` | ❓ | Outbound affiliate click tracking |

Migration SQL source: `the-lantern/SWARMCLAW_DISPATCH_LANTERN_STACK_V1.md`

**Gate:** If ANY of these are ❌ or ❓, database work is Step 1 before anything else.

---

## SECTION 2 — MAKE.COM AUTOMATION (5 scenarios)

| Scenario | Name | Trigger | Status |
|----------|------|---------|--------|
| A | Tech Stack Daily Curate | Schedule (daily) | ❓ |
| B | Live User Spotlight Referral Tracker | Stripe `subscription.created` | ❓ |
| C | Platform Cross-Promo Rotation | Schedule (weekly) | ❓ |
| D-1 | Spotlight Intake | Form submission | ❓ |
| D-2 | Paid Spotlight Activation | Stripe `payment_intent.succeeded` for `prod_UhmHfqAyYHWoz0` | ❓ |

**Gate:** Scenarios A + D-1 + D-2 are required for semi-autonomous operation. B + C are important but not blockers.

---

## SECTION 3 — STRIPE WEBHOOKS

| Event | Target Scenario | Webhook URL | Status |
|-------|----------------|-------------|--------|
| `payment_intent.succeeded` | D-2 | Make.com webhook URL | ❓ |
| `customer.subscription.created` | B | Make.com webhook URL | ❓ |

**Gate:** D-2 webhook must be wired before paid spotlight upgrades can activate automatically.

---

## SECTION 4 — FRONTEND (Next.js repo: `redlanternstudios/thelanterndaily`)

| Component / Page | Status | Required for launch |
|-----------------|--------|---------------------|
| `VideoCard.tsx` | ❓ | Yes — no iframes ever |
| `StackToolCard.tsx` | ❓ | Yes — free teaser + paid gate |
| `UserSpotlightCard.tsx` | ❓ | Yes — free + paid badge variant |
| `RepoCard.tsx` | ❓ | No — nice to have |
| `PlatformCrossPromoCard.tsx` | ❓ | No — nice to have |
| `app/page.tsx` (homepage) | ❓ | Yes |
| `app/stack/page.tsx` | ❓ | Yes — subscription gate |
| `app/builders/page.tsx` | ❓ | Yes — open submission CTA always visible |
| `app/builders/[slug]/page.tsx` | ❓ | Yes — public spotlight page |
| `app/api/subscribe/route.ts` | ❓ | Yes — Beehiiv integration |
| `app/api/affiliate-click/route.ts` | ❓ | Yes — click tracking |

**Gate:** Homepage + /builders + /stack + subscribe API are minimum for Alif demo.

---

## SECTION 5 — INTEGRATIONS

| Integration | Purpose | Status |
|-------------|---------|--------|
| Beehiiv API connected | Subscribe flow | ❓ |
| Beehiiv Boosts DISABLED | Trust gate — blocks haram ads | ❓ |
| Resend API configured | Transactional email (D-1, D-2) | ❓ |
| PostHog initialized | Analytics | ❓ |
| Sentry initialized | Error tracking | ❓ |

**Gate:** Beehiiv Boosts disabled is NON-NEGOTIABLE before first issue goes out. This is a Ro action.

---

## SECTION 6 — DNS + HOSTING

| Item | Status |
|------|--------|
| A record: `76.76.21.21` in Namecheap | ❓ |
| CNAME in Namecheap | ❓ |
| `thelanterndaily.com` added in Vercel | ❓ |
| SSL active | ❓ |

**Gate:** DNS must be live before cold-start spotlight outreach — builders need a real URL.

---

## SECTION 7 — CONTENT (minimum for launch)

| Item | Required count | Current count | Status |
|------|---------------|---------------|--------|
| Video channels whitelisted | ≥ 5 | ❓ | ❓ |
| Stack tools seeded | ≥ 12 (Lantern Build Stack) | ❓ | ❓ |
| Platform partners researched | ≥ 3 | ❓ | ❓ |
| Founding builder spotlights live | ≥ 1 | ❓ | ❓ |

**Gate:** ≥ 1 spotlight live before Alif presentation (Jun 21).

---

## SECTION 8 — TRUST AUDIT (6-gate pipeline)

| Gate | Mechanism | Status |
|------|-----------|--------|
| Source whitelist | `lantern_video_channels` table + channel_status check | ❓ |
| Groq dual score (relevance + halal_stance) | Make.com Scenario A | ❓ |
| Editorial approval | D-1 human gate | ❓ |
| YouTube embed HARD BLOCK | DB constraint + VideoCard component | ❓ |
| Halal platform gate | DB trigger on `lantern_platform_crosspromo` | ❓ |
| Community correction loop | Planned — not required at launch | ❌ |

---

## OUTPUT FORMAT

After running this audit, produce:

### VERIFIED
List everything confirmed working with evidence.

### GAPS (ordered by build priority)
For each gap:
- What's missing
- Why it blocks (or doesn't block) semi-autonomous operation
- Who owns it: ENGINEER / BUILDER / DATA / COMPLY / Ro

### SEMI-AUTONOMOUS READINESS SCORE
X of 5 core automation gates operational:
1. Content scoring (Scenario A) — [ ]
2. Spotlight intake (Scenario D-1) — [ ]
3. Paid activation (Scenario D-2) — [ ]
4. Database fully migrated — [ ]
5. Frontend minimum viable — [ ]

Score: X/5

### NEXT 3 ACTIONS (highest leverage, ordered)
1. [Owner] [Action] — [why it unblocks]
2. [Owner] [Action] — [why it unblocks]
3. [Owner] [Action] — [why it unblocks]

---

## SWARMCLAW DISPATCH (on trigger: "LANTERN-AUDIT-V1 EXECUTE")

ROBBY routes:
- ENGINEER → check Supabase for all 8 tables, report exact status
- COMPLY → check VideoCard for iframe, check Beehiiv Boosts status (flag if unknown)
- BUILDER → check `redlanternstudios/thelanterndaily` repo for existing components and pages
- DATA → check Make.com for any existing scenarios
- RESEARCH → check DNS propagation for thelanterndaily.com
- ALL → report back to ROBBY with verified status per section above
- ROBBY → compile audit, output gap list, state SEMI-AUTONOMOUS READINESS SCORE

Do NOT proceed to build without completing this audit. Fake completeness is the enemy.

---

*Source of truth: `the-lantern/SWARMCLAW_DISPATCH_LANTERN_STACK_V1.md` + `the-lantern/LANTERN_COMPREHENSIVE_BUILD_PLAN_V1.md`*
*Scope locked 2026-06-14. Changes require Ro sign-off.*
