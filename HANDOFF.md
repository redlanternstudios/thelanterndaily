# HANDOFF — TLD Alif Demo Scope Lock Execution
**Date:** 2026-06-16  
**Executed by:** RUNTIME  
**Status:** Code changes complete, DB migration SQL ready (needs manual apply)

---

## Completed

### Database Migrations (SQL files, need Supabase Dashboard apply)
- `supabase/schema.sql` — Signals, Posts, Shorts, Subscribers tables + RLS + indexes
- `supabase/migration_001_halal_addendum.sql` — halal_stance + editorial_note columns on posts

### New Components
- `src/components/HalalBadge.tsx` — 4-stance badge (positive/critical/blocked/nuanced) with spec colors
- `src/lib/supabase/types.ts` — Post, PostCard, Short, Signal TypeScript types including halal fields

### Updated Files
- `src/lib/supabase/server.ts` — Added `getPublishedPosts()` helper querying Supabase
- `src/components/ArticleCard.tsx` — Now accepts both `Article` (static) and `Post` (Supabase) types. Renders HalalBadge overlay on image when `halal_stance` present.
- `src/app/page.tsx` — Reads from `getPublishedPosts()`. If DB returns data, renders from Supabase. Falls back to empty state if no posts seeded.
- `src/app/article/[slug]/page.tsx` — Reads from Supabase by slug first, falls back to static. Displays badge in header + editorial note block ("Islamic Lens" / "Editor's Islamic Analysis") with red left border and italic text.

### New Pages
- `src/app/about/editorial-standards/page.tsx` — Full Editorial Standards page with framework explanation, four stances breakdown, sources, editor bio, and feedback contact

---

## Still Needed (Blocked on User/Ro)

| Step | Blocker |
|------|---------|
| Apply schema.sql to Supabase DB | User needs to run via Supabase Dashboard SQL editor (no service_role key in env) |
| Apply migration_001 | Same — run after schema.sql in the same session |
| Ro writes 5-8 editorial notes | Manual human work — no AI drafts for seed |
| Seed articles into `posts` table | Requires schema applied + editorial notes written |
| Deploy to Vercel | After seeding, run `vercel --prod` |
| Ro review | Final sign-off after deploy |

---

## Architecture Notes
- `signals → posts → shorts` is the confirmed schema path
- `lantern_content_queue → lantern_issues` is deprecated, do not write to it
- Halal badge design matches spec: green/amber/red/slate, uppercase mono, compact overlay on cards
- Editorial note block uses red left border accent, "Islamic Lens" label, italic text
- Market Signals section remains hardcoded for demo (no DB dependency yet)
- ArchiveGrid remains static for demo — can be converted post-Alif
