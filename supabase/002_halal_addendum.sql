-- THE LANTERN DAILY — HALAL EDITORIAL ADDENDUM
-- Applied AFTER supabase/schema.sql
-- Adds Islamic editorial layer to posts table

alter table posts
  add column if not exists halal_stance text check (halal_stance in ('positive', 'critical', 'blocked', 'nuanced')),
  add column if not exists editorial_note text;

-- Index for filtering by halal stance
create index if not exists posts_halal_stance_idx on posts(halal_stance);

-- Published posts with halal_stance visible to public (already covered by existing RLS policy)
-- No additional policy needed — the existing "public_read_published_posts" covers all columns
