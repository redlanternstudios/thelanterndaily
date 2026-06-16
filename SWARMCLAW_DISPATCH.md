# SWARMCLAW DISPATCH — The Lantern Daily UI Refinement
Date: 2026-06-14 | Status: **LOCKED — ready to dispatch**

---

## MISSION OBJECTIVE

The Lantern Daily is a 5-page Next.js 14 publication site (dark editorial aesthetic). UI is built. Three structural gaps were confirmed via CTP diff against Google Drive reference docs and ChatGPT design mocks. This dispatch contains everything SwarmClaw needs to complete and push to GitHub, then produce a v0-ready handoff.

---

## REPO LOCATION

- Host machine: `~/thelanterndaily/` (canonical)
- SwarmClaw workspace copy: `~/.swarmclaw/workspace/thelanterndaily/`
- `.env.local` lives ONLY at `~/thelanterndaily/.env.local` — must be copied to SwarmClaw workspace copy before any dev server runs

---

## DRIVE ASSETS (for reference)

- Drive folder: `1hSNntGvko3mgl395PaYlz4NzQVeo1TvV`
- Drive code doc (canonical spec): `18YLMXBv4Va19iJ6SFw3mR7arJYkH6MmhLoKmygC6vFw`
- ChatGPT design mocks (6 PNGs):
  - Dashboard v1 (Jun 13): `1RHgK5XZh9ZqnEOBMavJmYC1Pp2bSUzIN`
  - Homepage (Jun 14): `1Rz1BB7oCDTPojeVdJ4STepq91HoypBim`
  - Article (Jun 14): `18PlJm6nCNUKnlLX3vA2z96OPSZplvSOR`
  - Archive (Jun 14): `1poBUfOXgsv8K8VS89KHD_PNYTl7TRyJj`
  - Operator Stack (Jun 14): `18nNgxC8KpTPjseJfB0097ILCZ2iqKnCD`
  - Dashboard v2 (Jun 14): `1PV6caluWIMUZAZJjQLaG71nVpNaCIOTl`

---

## WHAT CLAUDE ALREADY FIXED (do not redo)

1. **Homepage hero** — Changed from 2×ArticleCard grid to text-panel-left + full-bleed-image-right (matches Drive spec exactly). borderLeft: "2px solid var(--red)" on the text card.

2. **Stack page categories** — Updated from 4 custom categories to the canonical 5 from Drive spec:
   - Infra: AWS / Cloudflare / Vercel / GitHub
   - Models & APIs: OpenAI / Anthropic / Google / Perplexity
   - Data & Tools: PostgreSQL / Snowflake / Hex / Apify
   - Applications: Notion / Linear / Figma / Slack
   - Governance: 1Password / Sentry / Datadog / Vanta

3. **Homepage operator stack showcase** — Updated from 4-tool list to category-row grid matching Drive spec categories.

4. **TypeScript** — Zero errors confirmed (`npx tsc --noEmit` clean).

---

## SWARMCLAW TASKS

### TASK 1 — Image sourcing (ARCHITECT agent)
Replace 8 SVG placeholder files in `public/images/lantern/` with real editorial photography.

**Image specs:**
- Multicultural lens. MENA, South Asian, Black, Arab founders/builders.
- Never white-dominant.
- NOT stock-looking. Not generic corporate. Editorial quality.
- Dark, moody, journalistic tone — matches `#07080F` background.
- 16:9 or wider aspect ratio.
- File names (must match exactly):
  1. `ai-infrastructure.jpg` — server rooms, fiber optics, or a South Asian/Arab engineer in a data center
  2. `video-signal.jpg` — someone at a monitor in a dark room, signal/broadcast aesthetic
  3. `agent-reliability.jpg` — laptop + terminal output, or circuit board close-up
  4. `product-ai.jpg` — mobile screen with an AI interface, held by non-white hands
  5. `islamic-finance.jpg` — trading terminal or fintech interface, possibly with Arabic numerals or Islamic geometry
  6. `operator-stack.jpg` — clean desk, multiple monitors, builder aesthetic
  7. `field-notes.jpg` — notebook + laptop, outdoor or cafe context
  8. `operator-stack-hero.jpg` — hero-scale image, wide composition, operator at work (multicultural)

Source options in order of preference:
1. Generate via Canva AI or Midjourney with prompts above
2. Unsplash API — search: "software engineer" filtered for diverse representation
3. Use existing ChatGPT mock image aesthetic as visual reference

### TASK 2 — Legacy cleanup (EXECUTOR agent)
Delete unused files that carry TypeScript errors:
- `components/ui/Nav.tsx`
- `components/ui/IssueCard.tsx`
- `components/ui/StackCard.tsx`
- `components/ui/SectionLabel.tsx`

These are not imported anywhere. They will break any full type-check or build. Safe to delete.

### TASK 3 — Sync .env.local (EXECUTOR agent)
Copy `~/thelanterndaily/.env.local` to `~/.swarmclaw/workspace/thelanterndaily/.env.local`

Contents should include:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### TASK 4 — Full build validation (EXECUTOR agent)
After TASK 2 is done:
```bash
cd ~/thelanterndaily
npm run build
```
Expected: zero errors. If build fails, report the exact error and file — do not attempt a silent fix.

### TASK 5 — GitHub push (EXECUTOR agent)
After TASK 4 passes:
```bash
cd ~/thelanterndaily
git add -A
git commit -m "feat: hero layout fix, stack categories aligned to Drive spec, operator showcase updated"
git push origin main
```
No PR needed. Push directly to main.

---

## LOCKED DECISIONS (do not deviate — locked 2026-06-14)

1. **Social proof number**: Use `18,472+` in all UI copy. **This is a design placeholder only — MUST be replaced with real subscriber count before any external-facing deployment.** Do not present this number as verified anywhere outside the design prototype.

2. **Category name**: `Islamic Finance` is canonical. Replace ALL instances of "Halal Fintech" across: ticker, archive filter bar, article tags, category labels. Zero instances of "Halal Fintech" should remain in the codebase.

3. **Article inline chart**: Skip entirely for v1. Prose-only article body. No chart component. Chart is v2 scope after data pipeline exists.

---

## REPORT BACK FORMAT

When complete, report:
- TASK 1: image sourcing method used + filenames confirmed
- TASK 2: files deleted (list)
- TASK 3: .env.local synced (confirmed/blocked)
- TASK 4: build result (pass/fail + error if fail)
- TASK 5: git commit SHA + branch

Do not report operational detail. Stakeholder-level only.
