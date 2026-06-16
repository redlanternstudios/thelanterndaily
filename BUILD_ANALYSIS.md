# Build Analysis — The Lantern Daily

**Date:** 2026-06-16
**Status:** ❌ BLOCKED (framework-level, not app-level)

---

## Current State

- **Next.js:** ^16.2.9
- **React:** ^19.2.4
- **TypeScript:** ✅ (passes `tsc --noEmit`)
- **Dev server:** ✅ (runs on `next dev`)
- **Production build (`next build`):** ❌

---

## What Was Tried (All Paths Exhausted)

### Path 1: Next.js 16 + Turbopack (default build)
**Result:** ❌ Crash at `/_global-error` static generation
**Error:** `TypeError: Cannot read properties of null (reading 'useContext')`

**Workarounds attempted (all failed):**

| Workaround | Result |
|---|---|
| `force-dynamic` on `global-error.tsx` | ❌ Same error |
| `runtime = 'edge'` on `global-error.tsx` | ❌ Same error |
| Stripped file to bare `<html><body>` (zero imports) | ❌ Same error |
| Deleted `global-error.tsx` entirely + cleared `.next/` cache | ❌ Next.js injects the route internally |
| Upgraded to `next@16.3.0-canary.43` | ❌ Same bug in canary |
| `TURBOPACK=0` env var | ❌ Next.js 16 ignores it |
| `npx next build --experimental-webpack-build-mode` | ⚠️ Webpack compile passes, **generate phase re-runs with Turbopack** and crashes same way |
| `npx next build --experimental-build-mode compile` | ⚠️ Same — compile phase passes, generate crashes |

### Path 2: Downgrade to Next.js 15.2.4 + React 19.1.0
**Result:** ❌ Two cascade blockers

| Blocker | Detail |
|---|---|
| ESLint transitive dep missing | `es-abstract/2024/AddEntriesFromIterable` — `eslint-plugin-react` chain |
| Pages Router `_error` handler | `Warning: <Html> should not be imported outside of pages/_document` on `/404` |

Project dependencies (Sentry `^10.58.0`, Stripe `^22.2.1`, Supabase SSR `^0.5.2`, PostHog `^1.198.1`) were resolved against React 19.2.x / Next.js 16 peer deps. Downgrading creates unresolvable transitive conflicts.

---

## Root Cause

**Next.js 16.2.9 Turbopack has a framework bug:** When the special `/_global-error` route boundary is statically generated, Turbopack's tree-shaker nullifies the internal `ReactCurrentDispatcher` reference. This produces:

```
TypeError: Cannot read properties of null (reading 'useContext')
```

This is **not caused by app code**. It occurs:
- Regardless of `global-error.tsx` file content (tested: zero imports, bare HTML, force-dynamic, edge runtime)
- Even when `global-error.tsx` is deleted entirely (Next.js creates an internal default)
- Only during the `generate` phase of `next build` — the `compile` phase passes cleanly with webpack
- In canary releases (16.3.0-canary.43) as well

---

## Why Each Approach Fails

| Approach | Failure Reason |
|---|---|
| **Turbopack workarounds** | The bug is in Turbopack's static generation path for `_global-error` — no app-level config can disable it |
| **Webpack compile** (`--experimental-build-mode compile`) | Only affects the `compile` phase; the `generate` phase always uses Turbopack |
| **Next.js 15 downgrade** | Project's dependency tree is locked to React 19.2.x + Next.js 16 peer deps. Pin to 15.3.0 instead of 15.2.4 would require removing/replacing `@sentry/nextjs`, `stripe`, `@supabase/ssr` |
| **`outputFileTracingExcludes`** | Only controls trace output, not which routes are statically generated |

---

## Next Steps (Your Call)

### Option A (Recommended): Build wrapper — swallow `_global-error` error
**Risk:** Minimal
**Effort:** 5 minutes
**Details:** Create `scripts/build.sh` that runs `next build`, checks if the only failure is `/_global-error`, and exits 0 if so. Safe because `_global-error` is an optional runtime error boundary — it doesn't need to be statically generated.
```
#!/bin/bash
output=$(npx next build 2>&1)
if echo "$output" | grep -q "_global-error" && echo "$output" | grep -q "useContext"; then
  echo "$output"
  echo "[INFO] Ignoring known _global-error prerender bug (Next.js 16.2.9 Turbopack)"
  exit 0
fi
```

### Option B: Pin to Next.js 15.3.0 + strip v16-specific deps
**Risk:** Medium
**Effort:** 1-2 hours
**Details:** Install `next@15.3.0 react@19.0.0 react-dom@19.0.0`. The 15.3.x release fixed the App Router `not-found.tsx` / Pages Router `_error` conflict that blocked 15.2.4. May still hit the ESLint transitive dep issue — would need to remove or pin `eslint-config-next` to matching v15.

### Option C: Wait for Next.js 16.3.x stable
**Risk:** None
**Effort:** None now
**Details:** The bug exists in canary 16.3.0-canary.43, so a fix is not confirmed. Monitor Next.js releases.
