-- content_radar table
-- Stores articles ingested by Make.com Lantern C1 - Content Radar scenario
-- Deduplicates by URL

create table if not exists public.content_radar (
  id            uuid primary key default gen_random_uuid(),
  url           text not null unique,
  title         text,
  summary       text,
  category      text,
  signal        text check (signal in ('HALAL-ALIGNED', 'CRITICAL', 'BLOCKED', 'NUANCED')),
  published_at  timestamptz,
  source        text,
  ingested_at   timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

-- Index for feed queries sorted by ingestion time
create index if not exists content_radar_ingested_at_idx
  on public.content_radar (ingested_at desc);

-- Index for filtering by source
create index if not exists content_radar_source_idx
  on public.content_radar (source);

-- RLS: service role bypasses. Anon/authenticated read only.
alter table public.content_radar enable row level security;

create policy "Public read" on public.content_radar
  for select using (true);

-- No insert/update policy for anon — only service role (Make.com) writes
