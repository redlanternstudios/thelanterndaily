-- THE LANTERN — SUPABASE CONTENT SCHEMA
-- Run in order. All tables use RLS.
-- Project: The Lantern (separate Supabase project from other RLS products)

-- ─────────────────────────────────────────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for full-text search on signals


-- ─────────────────────────────────────────────────────────────────────────────
-- ENUM TYPES
-- ─────────────────────────────────────────────────────────────────────────────
create type signal_source as enum (
  'hackernews', 'github', 'producthunt', 'arxiv',
  'rss', 'twitter', 'reddit', 'changelog'
);

create type signal_status as enum (
  'new', 'queued_daily', 'queued_short', 'queued_weekly',
  'generating', 'published', 'archived', 'rejected'
);

create type post_type as enum (
  'daily-dispatch', 'weekly-brief', 'short', 'stack-spotlight'
);

create type post_status as enum (
  'draft', 'generating', 'needs_review', 'approved', 'published',
  'unpublished', 'rejected'
);

create type subscriber_tier as enum ('free', 'operator');

create type content_category as enum (
  'ai-systems', 'product-strategy', 'operator-stack', 'field-notes', 'research'
);


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: signals
-- Raw ingested content from all sources. This is the input layer.
-- ─────────────────────────────────────────────────────────────────────────────
create table signals (
  id                   uuid default uuid_generate_v4() primary key,
  source               signal_source not null,
  raw_title            text not null,
  raw_url              text not null,
  raw_summary          text,
  url_hash             text generated always as (md5(raw_url)) stored, -- dedup key
  published_at         timestamptz,
  ingested_at          timestamptz default now() not null,

  -- scoring (populated by SwarmClaw EDITOR agent)
  relevance_score      float check (relevance_score between 0 and 10),
  actionability_score  float check (actionability_score between 0 and 10),
  freshness_score      float check (freshness_score between 0 and 10),
  composite_score      float check (composite_score between 0 and 10),
  scoring_notes        text, -- EDITOR agent reasoning

  -- routing
  category             content_category,
  status               signal_status default 'new' not null,
  scored_at            timestamptz,

  -- constraints
  unique (url_hash)
);

create index signals_status_idx on signals(status);
create index signals_composite_score_idx on signals(composite_score desc);
create index signals_ingested_at_idx on signals(ingested_at desc);
create index signals_url_hash_idx on signals(url_hash);


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: posts
-- Published + draft content. Both email issues and web content.
-- ─────────────────────────────────────────────────────────────────────────────
create table posts (
  id                      uuid default uuid_generate_v4() primary key,
  type                    post_type not null,
  title                   text not null,
  slug                    text unique not null,
  issue_number            integer, -- sequential, for daily-dispatch + weekly-brief
  content_markdown        text,
  summary                 text,       -- ≤280 chars, used in email preview + social
  hero_image_url          text,
  og_image_url            text,
  reading_time_minutes    integer,
  category                content_category,

  -- affiliate tracking
  affiliate_tool          text,       -- which tool is featured in Stack Card
  affiliate_url           text,

  -- scoring / quality
  content_confidence_score float check (content_confidence_score between 0 and 1),
  image_quality_score      float check (image_quality_score between 0 and 1),
  flags                    text[],    -- ['political', 'legal', 'offensive']

  -- publishing
  status                  post_status default 'draft' not null,
  beehiiv_post_id         text,       -- set after Beehiiv publish
  published_at            timestamptz,
  scheduled_for           timestamptz,
  created_at              timestamptz default now() not null,
  updated_at              timestamptz default now() not null,

  -- source tracking
  signal_ids              uuid[],     -- references signals.id array

  -- premium gating
  is_premium              boolean default false
);

create index posts_status_idx on posts(status);
create index posts_type_idx on posts(type);
create index posts_published_at_idx on posts(published_at desc);
create index posts_slug_idx on posts(slug);
create index posts_issue_number_idx on posts(issue_number);

-- auto-increment issue numbers per type
create sequence daily_dispatch_seq start 1;
create sequence weekly_brief_seq start 1;


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: shorts
-- Web-only insight cards. Never emailed. Auto-generated 3x daily.
-- ─────────────────────────────────────────────────────────────────────────────
create table shorts (
  id              uuid default uuid_generate_v4() primary key,
  headline        text not null check (length(headline) <= 100),
  insight         text not null check (length(insight) <= 320),
  source_name     text,
  source_url      text,
  card_image_url  text,       -- CSS-generated card, no DALL-E
  category        content_category,
  signal_id       uuid references signals(id),
  published_at    timestamptz default now() not null,
  created_at      timestamptz default now() not null
);

create index shorts_published_at_idx on shorts(published_at desc);
create index shorts_category_idx on shorts(category);


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: subscribers
-- Synced from Beehiiv via Zapier webhook on new_subscription event.
-- ─────────────────────────────────────────────────────────────────────────────
create table subscribers (
  id              uuid default uuid_generate_v4() primary key,
  email           text unique not null,
  tier            subscriber_tier default 'free' not null,
  beehiiv_id      text unique,
  subscribed_at   timestamptz default now() not null,
  unsubscribed_at timestamptz,
  referral_source text,       -- UTM source from subscribe URL
  operator_number integer unique, -- sequential operator number assigned on subscribe
  is_active       boolean default true not null
);

create index subscribers_email_idx on subscribers(email);
create index subscribers_tier_idx on subscribers(tier);
create index subscribers_beehiiv_id_idx on subscribers(beehiiv_id);

-- auto-assign operator number
create sequence operator_number_seq start 1;

create or replace function assign_operator_number()
returns trigger as $$
begin
  if new.operator_number is null then
    new.operator_number := nextval('operator_number_seq');
  end if;
  return new;
end;
$$ language plpgsql;

create trigger subscribers_assign_operator_number
  before insert on subscribers
  for each row execute function assign_operator_number();


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: affiliate_clicks
-- PostHog handles this on the frontend, but we log server-side too for backup.
-- ─────────────────────────────────────────────────────────────────────────────
create table affiliate_clicks (
  id              uuid default uuid_generate_v4() primary key,
  tool            text not null,
  post_id         uuid references posts(id),
  subscriber_tier text,
  clicked_at      timestamptz default now() not null,
  utm_source      text,
  utm_medium      text
);

create index affiliate_clicks_tool_idx on affiliate_clicks(tool);
create index affiliate_clicks_clicked_at_idx on affiliate_clicks(clicked_at desc);


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: contact_submissions
-- Triggers Zapier → Robby → Ro iMessage on insert.
-- ─────────────────────────────────────────────────────────────────────────────
create table contact_submissions (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  submitted_at timestamptz default now() not null,
  resolved    boolean default false
);


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: error_log
-- n8n pipeline failures write here. Ro sees summary in weekly health check.
-- ─────────────────────────────────────────────────────────────────────────────
create table error_log (
  id          uuid default uuid_generate_v4() primary key,
  flow        text not null,  -- 'ingest'|'score'|'generate'|'publish'|'distribute'
  error_type  text not null,
  error_detail text,
  context     jsonb,
  created_at  timestamptz default now() not null,
  resolved    boolean default false
);


-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────────

-- signals: service role reads/writes (n8n), anon has no access
alter table signals enable row level security;
create policy "service_role_all_signals" on signals
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- posts: published posts visible to all; drafts only to service role
alter table posts enable row level security;
create policy "public_read_published_posts" on posts
  for select using (status = 'published');
create policy "service_role_all_posts" on posts
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- shorts: all visible to public (web-only, no sensitive data)
alter table shorts enable row level security;
create policy "public_read_shorts" on shorts
  for select using (true);
create policy "service_role_all_shorts" on shorts
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- subscribers: only service role (never expose to frontend directly)
alter table subscribers enable row level security;
create policy "service_role_all_subscribers" on subscribers
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- affiliate_clicks: service role only
alter table affiliate_clicks enable row level security;
create policy "service_role_all_clicks" on affiliate_clicks
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- contact_submissions: insert allowed for anon (contact form), read for service only
alter table contact_submissions enable row level security;
create policy "anon_insert_contact" on contact_submissions
  for insert with check (true);
create policy "service_role_read_contact" on contact_submissions
  for select using (auth.role() = 'service_role');

-- error_log: service role only
alter table error_log enable row level security;
create policy "service_role_all_errors" on error_log
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();


-- ─────────────────────────────────────────────────────────────────────────────
-- SUPABASE WEBHOOKS TO CONFIGURE (after running migrations)
-- ─────────────────────────────────────────────────────────────────────────────
-- 1. posts INSERT/UPDATE where status = 'needs_review'
--    → POST to: n8n webhook (HITL notification flow)
--    → POST to: Zapier webhook (Robby-Telegram Ro notification)
--
-- 2. posts UPDATE where status = 'published'
--    → POST to: Zapier webhook (social distribution flow)
--
-- 3. contact_submissions INSERT
--    → POST to: Zapier webhook (Robby-Telegram Ro notification)
--
-- Configure in: Supabase Dashboard → Database → Webhooks
