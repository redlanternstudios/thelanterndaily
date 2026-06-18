# SWARMCLAW DISPATCH — THE LANTERN DAILY: V0 BRAND ALIGNMENT
**Issued:** 2026-06-16
**Priority:** HIGH
**Product:** The Lantern Daily
**Assigned to:** BUILDER agent
**Deadline:** Before Alif demo June 21, 2026

---

## MISSION

Audit and correct all v0-generated components and pages in `the-lantern/` for brand alignment violations. Deliver clean, corrected files. No placeholders. No assumptions. Only verified output.

---

## KNOWN VIOLATIONS (already confirmed)

| File | Violation | Fix Applied |
|------|-----------|-------------|
| `components/LanternMasthead.tsx` | "by RedLantern Studios™" in logo | ✅ FIXED — removed |
| `app/layout.tsx` | `siteName: "The Lantern Daily by RedLantern Studios"` | ✅ FIXED — now "The Lantern Daily" |
| `data/lanternArticles.ts` | All 7 articles had `author: "RedLantern Studios™"` | ✅ FIXED — now "The Lantern Daily" |

---

## REMAINING AUDIT REQUIRED

Scan every `.tsx` and `.ts` file in `the-lantern/app/` and `the-lantern/components/` for:

### 1. Personal author names
Any hardcoded names that are not real people who wrote the content.
Pattern: `"Ahmed`, `"Sarah`, `"Hassan`, `"Omar`, `"Fatima`, or any first/last name in bylines.
Fix: Replace with `"The Lantern Daily"` or omit entirely.

### 2. RedLantern Studios™ in editorial content
`"RedLantern Studios"` or `"RedLantern Studios™"` in:
- Article bylines
- Article footers
- Social meta tags
- Newsletter footers (except legal copyright line)

Fix: Remove entirely from editorial content.
EXCEPTION: Legal copyright line `© 2026 By Red, LLC` in page footers is acceptable — it is the legal entity, not an editorial byline.

### 3. "by RedLantern Studios" in any masthead, header, or nav
Fix: Remove. The Lantern Daily is the brand. No parent attribution in UI.

### 4. Placeholder author avatars or headshots
Any `<img>` or `<Image>` tagged as an author photo.
Fix: Remove. No byline photos. Publication-only attribution.

### 5. "Presented by" or "Powered by" attribution
Fix: Remove entirely.

---

## BRAND ENFORCEMENT RULES (non-negotiable)

### Voice attribution
- ALL editorial content = attributed to `"The Lantern Daily"` editorial team
- NO individual author names unless the person is a named external community contributor in a Spotlight
- NO company/studio attribution in editorial content

### Publication identity
- The Lantern Daily is an independent Muslim tech intelligence publication
- It is NOT presented as "a RedLantern Studios product" in UI
- Legal entity = By Red, LLC (acceptable in copyright footer only)

### Byline format (correct)
```
The Lantern Daily · Jun 16, 2026 · 6 min read
```

### Byline format (WRONG — do not use)
```
Ahmed Al-Rashid · Jun 16, 2026
RedLantern Studios™ · Jun 16, 2026
by RedLantern Studios
```

---

## DELIVERABLES

1. Audit report — list every file checked, every violation found
2. Corrected files — all fixes applied directly
3. Confirmation — zero remaining violations after corrections

---

## CONTEXT

- Alif.build demo: June 21, 2026
- Ummah-first rule: Ro does NOT appear personally. No founder face. No studio attribution in editorial.
- The Lantern is the brand. By Red LLC is the legal entity. They do not appear interchangeably.
- SwarmClaw OS docs: `swarmclaw/BRAND_DOCUMENT_ENFORCEMENT.md`
