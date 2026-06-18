# MISSION 6: Pre-Launch QA Trust Audit

**Product**: The Lantern Daily  
**Audited by**: BACKEND agent  
**Date**: June 15, 2026  
**Repo**: rsemeah/redlanternstudios (thelanterndaily/)

---

## Summary Table

| Check | Status | Notes |
|-------|--------|-------|
| 1. Halal Constraints | ✅ PASS | No video/iframe embeds found. Halal alignment is editorial/marketing language only — no content-level halal gate required. |
| 2. Affiliate Disclosure | ✅ PASS | Affiliate links use `sponsored nofollow` rel and are labeled with "Affiliate link" badges. No separate .css disclosure class needed. |
| 3. Premium Gate | ✅ PASS | `PremiumGate` component wraps premium tools; premium issue bodies are truncated with upgrade CTA. No subscription tier auth yet — logged as INFO. |
| 4. Spotlight Flow E2E | ⚠️ FLAG | Operator number query param mismatch: SubscribeForm pushes `?number=` but confirmed/page.tsx reads `?operator=`. |
| 5. Subscribe w/ Operator # | ⚠️ FLAG | SubscribeForm sends `email` only — no `ownerNumber` field sent to API. The API returns `operator_number` from n8n but the fallback path does not provide one. |
| 6. Stripe Webhook | ❌ FAIL | No Stripe webhook route exists (`src/app/api/stripe/webhook/route.ts`). No Stripe SDK integration found. |

---

## Check 1: Halal Constraints

**Status**: ✅ PASS

**Evidence**:
- Grep `grep -rn "video\|embed\|youtube\|iframe" src/` across all `.tsx`, `.ts`, `.css` files
- Grep `grep -rn "halal\|halal_screened\|HalalConstraints\|screened" src/`
- No `VideoEmbed.tsx` component exists in `src/components/`
- No `shorts/[id]/page.tsx` route exists (only `shorts/page.tsx`)

**Findings**:
- **No video embeds, iframes, or YouTube embeds** found anywhere in the codebase. The only matches for "video" are in article body copy mentioning "video editing" generically.
- **No `halal_screened` flag, `HalalConstraints` type/component, or screening gate** exists. The word "halal" appears only in:
  - Editorial/marketing copy: "halal tech", "halal alignment", "halal compliance"
  - Builder bios (e.g. "building the halal tech stack")
  - Tool descriptions (e.g. "halal compliance layers")
- No content moderation or screening infrastructure exists — but this is appropriate given the **editorial newsletter** nature of the product. The Lantern Daily is a curated editorial publication, not a UGC platform.
- **No shorts ID-level page** — shorts render on the list page only.

**Recommended Action**: None required for launch. If video embeds are added in the future, add a halal screening gate at that point.

---

## Check 2: Affiliate Disclosure

**Status**: ✅ PASS

**Evidence**:
- `src/app/globals.css` — inspected for `.affiliate-disclosure`, `.disclosure` classes — none found
- `src/components/Footer.tsx` — inspected for disclosure text — no disclosure found in footer
- `src/components/StackToolCard.tsx` — the component rendering affiliate links

**Findings**:
- **3 affiliate links** exist in the Stack tools data (`StackToolCard.tsx`):
  - n8n (`affiliateLink: { url: 'https://n8n.io', label: 'Try n8n' }`)
  - Railway (`affiliateLink: { url: 'https://railway.app', label: 'Deploy on Railway' }`)
  - Stripe (`affiliateLink: { url: 'https://stripe.com', label: 'Set up Stripe' }`)
- All affiliate links use `rel="sponsored nofollow"` (line 13 of `StackToolCard.tsx`)
- Each affiliate card displays a visible **"Affiliate link"** badge (lines 38–40) and a "Affiliate link" / "Direct link" footer label (line 107)
- The disclosure is per-card, visible, and uses the correct `rel="sponsored"` attribute
- No standalone `.affiliate-disclosure` CSS class exists in globals.css but this is **not a requirement** — the per-card badges satisfy FTC disclosure guidelines
- **No affiliate disclosure in the Footer** — but for a tool directory where disclosure is on each tool card, a footer-level disclosure is not strictly necessary

**Recommended Action**: None. Current implementation is adequate for launch.

---

## Check 3: Premium Gate

**Status**: ✅ PASS (🔍 INFO on auth gap)

**Evidence**:
- `src/components/PremiumGate.tsx` — the gating component
- `src/app/issues/[slug]/page.tsx` — premium content truncation in the Issue detail page
- `src/app/stack/page.tsx` — premium tools section
- `src/app/layout.tsx` — no premium gate wrapper around children

**Findings**:
- **`PremiumGate` component** exists at `/components/PremiumGate.tsx`. It renders a red-themed CTA box with "Subscribe to Unlock" or "Unlock Premium" links pointing to `/#subscribe`.
- **Issue detail page** (`issues/[slug]/page.tsx`): Premium-tier issues show a **truncated preview** (first ~60 words) with an upgrade CTA. Free-tier issues show full body. This is a **client-side visual gate** — no server-side auth check yet.
- **Stack page**: The `PremiumGate` component wraps premium tools, and the premium tools are rendered with a blurred/locked overlay (`backdrop-blur-[3px]` + lock icon).
- **No subscription/auth integration** in the gating — the gate is purely visual/CSS-based. If a user knows the URL, they can access premium content directly.
- **Layout.tsx** has no premium gate wrapper — all routes are accessible.
- **Tier filtering** exists in `archive/page.tsx` via URL query param `?tier=free|premium|all`.
- No Stripe subscription integration yet (see Check 6).

**Recommended Action**: Document as KNOWN GAP: premium gates are cosmetic only. Server-side auth enforcement and Stripe integration are needed before monetization goes live. For launch with manual subscriber management, this is acceptable as a "coming soon" visual.

---

## Check 4: Spotlight Flow E2E

**Status**: ⚠️ FLAG

**Evidence**:
- `src/components/SubscribeForm.tsx` — subscribe form submission handler
- `src/app/confirmed/page.tsx` — post-subscribe confirmation page
- `src/app/api/subscribe/route.ts` — subscribe API endpoint
- `src/components/OperatorNumber.tsx` — animated operator number component
- `src/components/SharePrompt.tsx` — share prompt with operator number

**Findings**:
- **Flow path**: Content page → subscribe CTA → subscribe form → API → confirmed page
- The SubscribeForm is embedded in the homepage `/#subscribe` section and inline in `/shorts`.
- **Query param mismatch (CRITICAL)**:
  - `SubscribeForm.tsx` line 79: `router.push(\`/confirmed?number=\${data.operator_number}\`)`
  - `confirmed/page.tsx` line 11: `const operatorNumber = searchParams.get('operator') || '0000'`
  - **The form pushes `?number=` but the confirmation page reads `?operator=`** — the operator number will always fall back to `'0000'`
- **Fallback path**: When n8n is not configured, the API returns `{ message, email, note }` with no `operator_number` field. The form attempts `data.operator_number` which will be `undefined`, pushing `/confirmed` with no number param. Confirmed page then defaults to `'0000'`.
- The **Spotlight flow** (operator number assignment + welcome) works when n8n is properly configured AND the query param naming is fixed. Currently broken due to the mismatch.
- Confirmed page correctly renders `OperatorNumber`, `SharePrompt`, and an upgrade CTA.

**Recommended Action**: **Fix the query param mismatch**: Change `confirmed/page.tsx` to read `searchParams.get('number')` (to match what SubscribeForm sends), OR change SubscribeForm to push `?operator=` (to match what confirmed reads). Pick one and align.

---

## Check 5: Subscribe Flow with Operator Number

**Status**: ⚠️ FLAG

**Evidence**:
- `src/components/SubscribeForm.tsx` — form fields and submission
- `src/app/api/subscribe/route.ts` — request handling
- `src/app/confirmed/page.tsx` — operator display

**Findings**:
- **SubscribeForm sends only `email`** to the API: `body: JSON.stringify({ email: email.trim().toLowerCase() })`
- **No `ownerNumber` field** is collected from the user or sent to the API. The operator number is assigned server-side (expected to come from n8n).
- **The subscribe API route** (`/api/subscribe/route.ts`):
  - Accepts `{ email }` only
  - Forwards to n8n webhook with `{ email, source: 'thelanterndaily' }`
  - Returns whatever n8n returns (expected to include `operator_number`)
  - **Fallback path** (n8n not configured): returns no `operator_number` — the field will be undefined
- **Confirmed page** displays the operator number from `?operator=` (or `?number=` depending on fix — see Check 4) and defaults to `0000`.
- **No `.env` variables** checked for `N8N_SUBSCRIBE_WEBHOOK_URL` — cannot verify if n8n is configured in production.
- **The `SubscribeForm` has unresolved merge conflicts** (`<<<<<<< HEAD` / `=======` / `>>>>>>> 1b0c004`) — there are two versions of the component in the same file. The HEAD version (lines 1–31) uses framer-motion, sends email only, and does NOT have an ownerNumber field. The incoming version (lines 31–126) uses useRouter and redirects to confirmed. These need to be resolved.

**Recommended Action**: 
1. **Resolve merge conflicts** in `SubscribeForm.tsx` — decide between HEAD and incoming versions
2. **Fix query param alignment** (see Check 4)
3. **Ensure n8n returns `operator_number`** in the response, or implement a fallback assignment in the API route
4. No `ownerNumber` user-facing field is needed for this product — operator numbers are auto-assigned, which is correct

---

## Check 6: Stripe Webhook Integration

**Status**: ❌ FAIL

**Evidence**:
- `grep -rn "stripe\|webhook\|checkout.session\|STRIPE\|subscription" src/`
- `find src/app/api` — only two API routes: `/api/subscribe` and `/api/issues`
- `src/app/api/stripe/webhook/route.ts` — does not exist
- All files in `src/app/api/` listed

**Findings**:
- **No Stripe webhook route exists** at `src/app/api/stripe/webhook/route.ts`
- **No Stripe SDK** import or usage anywhere in the codebase
- **No webhook signature verification** (no `stripe.webhooks.constructEvent`)
- **No event type handling** (no `checkout.session.completed`)
- **No error handling for Stripe** — no retry logic, no idempotency keys
- **Stripe only appears** as a tool listing in the Stack directory (`StackToolCard.tsx`) with an affiliate link
- **The subscribe route** mentions "Upgrade — $15/mo" but there is no payment integration to handle this
- **Premium gate** links to `/#subscribe` but there's no payment flow at that target
- **No subscription management** — no customer creation, no plan/price lookup, no webhook event processing
- This means **premium monetization does not function**. Users cannot actually upgrade to premium via Stripe.

**Recommended Action**: 
1. **Create `src/app/api/stripe/webhook/route.ts`** with:
   - Stripe SDK initialization
   - Webhook signature verification using `stripe.webhooks.constructEvent()`
   - Event type routing for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Error handling with 400 on signature failure, 200 on unhandled events
   - idempotency and retry-safe processing
2. **Create a Stripe checkout session creation endpoint** (or route through n8n per architecture)
3. **Implement subscription status checking** in the premium gate components
4. **Add environment variables**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PRICE_ID`
5. This is a **launch blocker** if premium monetization is required for launch

---

## Merge Conflict Audit (Cross-Cutting)

**Status**: ⚠️ FLAG — Unresolved merge conflicts in 4 components

| File | Conflict Range |
|------|---------------|
| `src/components/Footer.tsx` | Lines 1–63 (HEAD vs `1b0c004`) |
| `src/components/IssueCard.tsx` | Lines 1–98 (HEAD vs `1b0c004`) |
| `src/components/SubscribeForm.tsx` | Lines 1–126 (HEAD vs `1b0c004`) |
| `src/components/TickerStrip.tsx` | Lines 3–64 (HEAD vs `1b0c004`) |

These will prevent clean deployment. Resolve before shipping.

---

## Overall Verdict

**Status**: ❌ FAIL

**Rationale**:
- ❌ **Stripe Webhook is missing** — premium monetization cannot function. Hard blocker if premium is required.
- ⚠️ **Query param mismatch** between SubscribeForm and confirmed page — operator number always falls back to `0000`.
- ⚠️ **Merge conflicts** in 4 component files — these will prevent clean build/deploy.
- ✅ Halal constraints are satisfied (no video embeds, editorial-only halal references).
- ✅ Affiliate disclosure is properly implemented with per-card badges and `sponsored nofollow`.
- ✅ Premium visual gating is in place (though server-side auth is future work).

**Gate Decision: FAIL until Stripe webhook is implemented and merge conflicts are resolved. CONDITIONAL PASS can be granted if premium monetization is deferred to post-launch.**

---

## Files Examined

| # | File | Path |
|---|------|------|
| 1 | Articles page | `src/app/articles/[slug]/page.tsx` |
| 2 | Issues page | `src/app/issues/[slug]/page.tsx` |
| 3 | Shorts list page | `src/app/shorts/page.tsx` |
| 4 | Builders detail page | `src/app/builders/[slug]/page.tsx` |
| 5 | Stack page | `src/app/stack/page.tsx` |
| 6 | Layout | `src/app/layout.tsx` |
| 7 | Footer | `src/components/Footer.tsx` |
| 8 | SubscribeForm | `src/components/SubscribeForm.tsx` |
| 9 | Subscribe API | `src/app/api/subscribe/route.ts` |
| 10 | Confirmed page | `src/app/confirmed/page.tsx` |
| 11 | PremiumGate | `src/components/PremiumGate.tsx` |
| 12 | StackToolCard | `src/components/StackToolCard.tsx` |
| 13 | OperatorSpotlightCard | `src/components/OperatorSpotlightCard.tsx` |
| 14 | OperatorNumber | `src/components/OperatorNumber.tsx` |
| 15 | Globals CSS | `src/app/globals.css` |
| 16 | Privacy page | `src/app/privacy/page.tsx` |
| 17 | Types | `src/lib/types.ts` |

## Commands Run

```
grep -rn "video\|embed\|youtube\|iframe" src/
grep -rn "halal\|halal_screened\|HalalConstraints\|screened" src/
grep -rn "affiliate\|disclosure\|sponsored\|affiliate-disclosure" src/
grep -rn "premium\|PremiumGate\|tier\|subscription\|unlock" src/
grep -rn "stripe\|webhook\|checkout.session\|STRIPE" src/
grep -rn "operator\|ownerNumber\|owner_number\|FLAG_OWNER" src/
grep -rn "<<<<<<<\|=======\|>>>>>>>" src/components/*.tsx
git log --oneline -20
```
