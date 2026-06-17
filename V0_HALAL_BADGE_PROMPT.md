# v0 PROMPT — HALAL BADGE SYSTEM
**For:** The Lantern Daily  
**Date:** 2026-06-16

---

## PROMPT FOR v0

Build a halal verdict badge component system for an Islamic tech editorial publication called The Lantern Daily.

**Design language:**
- Publication aesthetic: editorial, serious, newspaper-influenced
- Background palette: dark (`#07080D` header) / off-white (`#F7F2EE` body)
- Red accent: `#D92532`
- Sans-serif body, serif headlines (Georgia)
- Tight, disciplined — no rounded edges, no friendly UI

---

**Component 1: HalalBadge**

Four variants. Show all four in a row:

| Variant | Label | Visual |
|---------|-------|--------|
| `positive` | ✓ HALAL-ALIGNED | Small green pill, dark green text |
| `critical` | ⚠ CRITICAL | Amber pill, dark amber text |
| `blocked` | ✗ BLOCKED | Red pill using `#D92532`, white or dark red text |
| `nuanced` | ◈ NUANCED | Light slate pill, dark slate text |

Style rules:
- All caps, tight letter-spacing (0.08em), font-weight 700
- Font size: 10px (card variant), 12px (article page variant)
- Padding: 3px 8px (small), 5px 12px (medium)
- Border-radius: 3px (sharp, not pill-shaped)
- No drop shadow
- Icon + space + label, inline-flex

---

**Component 2: ArticleCard with badge**

Show a mock article card in the publication's style:
- Dark card background (`#111318`)
- Full-bleed article image top (placeholder)
- Category kicker (e.g. "AI SYSTEMS") — small caps, red color
- Halal badge below kicker (use `critical` variant as example)
- Article headline: serif, white, 18px
- Excerpt: light gray, 14px, 2 lines
- Byline: dim text, author · date · read time

---

**Component 3: Editorial Note block**

Appears at the bottom of an article body. Style:
- Left border: 3px solid `#D92532`
- Padding left: 20px
- Label: "ISLAMIC LENS" — 11px, all caps, red, font-weight 700, non-italic
- Body: italic, off-white, 15px, 1.6 line-height
- No background fill — just the left border

Example text:
> "This platform's revenue model depends on extending revolving credit with APRs averaging 28%. Under established Islamic finance principles (mu'amalat), this constitutes riba regardless of how the UX frames the experience. Muslim builders should note: the underlying instrument is unchanged by the product design."

---

**Page section: Badge legend strip**

A horizontal strip that could appear at the top of the archive or homepage, showing all 4 verdict types with a one-line explanation each:

```
✓ HALAL-ALIGNED — Reviewed and consistent with Islamic principles
⚠ CRITICAL — Requires caution; contains elements of concern  
✗ BLOCKED — Contains haram elements (riba, gambling, deception)
◈ NUANCED — Islamic scholars disagree; editorial analysis provided
```

Style as a 4-column horizontal rule strip, subtle, dark background, small text.

---

**Constraints:**
- React + Tailwind or inline styles (publication uses inline styles heavily)
- No external icon libraries — use Unicode/emoji icons only
- No rounded cards — `border-radius: 0` or `3px` max
- No gradients
- Dark publication aesthetic throughout
- Export as single component file
