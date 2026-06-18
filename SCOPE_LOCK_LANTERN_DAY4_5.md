# THE LANTERN DAILY — SCOPE LOCK
**Locked:** 2026-06-16 | **Target:** Alif demo  
**Status:** [LOCKED] — no scope changes until Alif demo is delivered

---

## ARCHITECTURE DECISION (FINAL)

**Winner:** `signals → posts → shorts` (as defined in `supabase/schema.sql`)  
**Rejected:** `lantern_content_queue → lantern_issues` — deprecated, do not write to it  
**Action:** Apply schema.sql to live Supabase project + add halal columns to `posts`

The schema.sql was designed correctly. It just hasn't been applied. That's the only migration needed.

---

## WHAT IS IN SCOPE

### 1. Database Migration
Apply `supabase/schema.sql` to The Lantern Supabase project.  
Then run this addendum migration:

```sql
-- Add Islamic editorial layer to posts
alter table posts
  add column halal_stance text check (halal_stance in ('positive', 'critical', 'blocked', 'nuanced')),
  add column editorial_note text; -- Ro's Islamic angle, written by human, required before publish
```

No other schema changes. `signals`, `posts`, `shorts`, `subscribers` are the full schema.

---

### 2. Data Layer — Homepage reads from Supabase
Replace `lanternArticles.ts` reads in `app/page.tsx` with server-side Supabase query:
```
SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC LIMIT 12
```
Use `lib/supabase/server.ts` (already wired). No client-side fetch.

---

### 3. Seed Data — 5-8 articles, manually written
All pieces seeded directly into `posts` table via Supabase Dashboard or service role insert.  
**Required distribution:**
- 2× `positive` (halal-aligned tech — e.g. open source infra, accessibility tooling)
- 2× `critical` (manipulative design — TikTok algorithm, Robinhood gamification, dark patterns)
- 1× `blocked` (outright haram — riba-based fintech, interest-bearing instruments)
- 1× `nuanced` (complex Islamic reasoning required — AI image generation, digital contracts)
- 1× video card (existing YouTube format)

Each piece requires `editorial_note` — a 2-4 sentence Islamic reasoning note written by Ro.  
No Groq drafts for the seed. Human-written only. These are what Alif sees.

---

### 4. Halal Badge System — UI
**Badge spec (4 states):**

| Stance | Label | Color |
|--------|-------|-------|
| `positive` | ✓ HALAL-ALIGNED | Green `#2D6A4F` |
| `critical` | ⚠ CRITICAL | Amber `#B45309` |
| `blocked` | ✗ BLOCKED | Red `#D92532` |
| `nuanced` | ◈ NUANCED | Slate `#4B5563` |

Badge appears on:
- Article card (top-left overlay on image, or below kicker)
- Article page header (below category kicker, above headline)
- `editorial_note` text block on article page (after article body, styled as "Editor's Islamic Analysis")

---

### 5. ArticleCard Component Update
Accept `Post` type from Supabase (not `Article` from static file).  
Render halal badge if `halal_stance` is present.

---

### 6. Article Page Update  
Read from `posts` table by `slug`.  
Show badge + editorial note block.  
Editorial note block style: bordered left with red accent, label "Islamic Lens", italic text.

---

### 7. Editorial Standards Page (static)
Route: `/about/editorial-standards`  
Content: Explains The Lantern's Islamic reasoning framework. States clearly:
- What sources are used (Quran, Sunnah, established fiqh principles on mu'amalat)
- Where Lantern issues editorial analysis vs. where scholars have spoken
- Where disagreement exists, we name it
- Ro as founding editor (named, no credentials claimed beyond editorial voice)
- Contact for scholarly feedback

One static page. No Supabase read. Linked in footer + about page.

---

### 8. Market Signals Section
Keep hardcoded for demo. Style correctly. Real tickers, real framing. No API dependency.

---

## WHAT IS NOT IN SCOPE (POST-ALIF)

- Make.com pipeline live (scenarios 03, 05, 06, 07)
- `signals` table automated ingestion
- `shorts` auto-generation
- Beehiiv integration live
- Social distribution automation
- Full authentication / premium gating (PremiumGate component exists, keep but don't wire)
- Paid upgrade flow

---

## SUCCESS CRITERIA FOR ALIF DEMO

A visitor to the live site must be able to:
1. Land on homepage — reads real content from Supabase, not static file
2. See 4 different halal stance badges across visible cards
3. Click any article — see full article with badge + Islamic analysis section
4. Understand within 60 seconds that this is an editorial institution with a framework, not an AI filter
5. Navigate to Editorial Standards and read the framework

That is the demo. Nothing else.

---

## EXECUTION ORDER

1. Apply schema.sql to Supabase — confirm tables exist ✓
2. Run halal addendum migration ✓
3. Ro writes 5-8 editorial notes (Islamic angle) — manual, no AI
4. Seed articles into `posts` table
5. SwarmClaw: rewrite `page.tsx` to read from Supabase
6. SwarmClaw: update `ArticleCard` to accept Post type + render badge
7. SwarmClaw: update article page to read from posts by slug + show editorial note
8. v0: halal badge component design
9. SwarmClaw: wire badge component into cards and article page
10. Static: Editorial Standards page
11. Deploy to Vercel — confirm live
12. Ro review — 4 stances visible, editorial notes readable, no static fallback

---

## POST-LOCK CHANGE RULE

Any change to this scope requires:
1. A stated reason
2. A statement of what gets cut to compensate
3. Explicit acknowledgment that Alif deadline doesn't move
