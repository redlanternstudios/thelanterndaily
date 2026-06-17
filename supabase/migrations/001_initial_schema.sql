-- THE LANTERN DAILY — MIGRATION 001: INITIAL SCHEMA
-- Run against RedLantern Studios Supabase project.
-- Applied: 2026-06-16
-- State: SCOPE LOCKED for Alif demo

-- ─────────────────────────────────────────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

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
  'retracted', 'community_flagged'
);

create type halal_badge_type as enum (
  'halal_verified',
  'scholar_reviewed',
  'halal_finance_screened',
  'editorial_only'
);

create type spotlight_tier as enum ('free', 'paid');

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────────────────────────────────────────

-- Incoming signals from all sources
create table if not exists lantern_signals (
  id uuid primary key default uuid_generate_v4(),
  source signal_source not null,
  external_id text not null unique,
  title text not null,
  url text not null,
  description text,
  author_name text,
  source_created_at timestamptz,
  raw_json jsonb,
  relevance_score smallint check (relevance_score between 0 and 10),
  halal_stance text check (halal_stance in ('ALLOWED', 'BLOCKED', 'REQUIRES_REVIEW')),
  status signal_status not null default 'new',
  community_flagged boolean not null default false,
  ingested_at timestamptz not null default now(),
  processed_at timestamptz,
  notes text
);

-- Signal → source whitelist
create table if not exists lantern_source_whitelist (
  id uuid primary key default uuid_generate_v4(),
  source_name text not null unique,
  source_type text not null,
  added_by text,
  added_at timestamptz not null default now(),
  is_active boolean not null default true
);

-- Published posts
create table if not exists lantern_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  body_html text,
  author_name text not null default 'The Lantern Daily',
  post_type post_type not null,
  status post_status not null default 'draft',
  halal_badge halal_badge_type,
  scholar_notes text,
  contains_islamic_claim boolean not null default false,
  contains_financial_product boolean not null default false,
  image_url text,
  video_url text check (video_url is null or video_url not like '%embed%'),
  read_time_minutes smallint,
  is_premium boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- User spotlights
create table if not exists lantern_user_spotlights (
  id uuid primary key default uuid_generate_v4(),
  user_number serial,
  name text not null,
  role_description text,
  profile_image_url text,
  bio_html text,
  stack_highlights jsonb,
  stripe_customer_id text,
  affiliate_code text unique,
  spotlight_tier spotlight_tier not null default 'free',
  stripe_payment_id text,
  paid_at timestamptz,
  paid_amount_usd numeric(10,2),
  homepage_featured boolean not null default false,
  homepage_featured_start timestamptz,
  homepage_featured_end timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Affiliate click tracking
create table if not exists lantern_affiliate_clicks (
  id uuid primary key default uuid_generate_v4(),
  spotlight_id uuid references lantern_user_spotlights(id) on delete cascade,
  target_url text not null,
  ip_address text,
  user_agent text,
  clicked_at timestamptz not null default now()
);

-- Subscribers
create table if not exists lantern_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  ref_code text,
  stripe_customer_id text,
  subscription_tier text check (subscription_tier in ('free', 'monthly', 'annual', 'lifetime')),
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  is_active boolean not null default true
);

-- Platform cross-promo registry
create table if not exists lantern_platform_partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  website_url text,
  is_redlantern_product boolean not null default false,
  is_active boolean not null default true,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────────────────────
create index if not exists idx_signals_status on lantern_signals(status);
create index if not exists idx_signals_source on lantern_signals(source);
create index if not exists idx_signals_halal_stance on lantern_signals(halal_stance);
create index if not exists idx_posts_slug on lantern_posts(slug);
create index if not exists idx_posts_status on lantern_posts(status);
create index if not exists idx_posts_type on lantern_posts(post_type);
create index if not exists idx_posts_published_at on lantern_posts(published_at desc);
create index if not exists idx_spotlights_status on lantern_user_spotlights(status);
create index if not exists idx_spotlights_affiliate_code on lantern_user_spotlights(affiliate_code);
create index if not exists idx_subscribers_email on lantern_subscribers(email);
create index if not exists idx_affiliate_clicks_spotlight on lantern_affiliate_clicks(spotlight_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────────
alter table lantern_signals enable row level security;
alter table lantern_source_whitelist enable row level security;
alter table lantern_posts enable row level security;
alter table lantern_user_spotlights enable row level security;
alter table lantern_affiliate_clicks enable row level security;
alter table lantern_subscribers enable row level security;
alter table lantern_platform_partners enable row level security;

-- Public read policies
create policy "Public can read published posts"
  on lantern_posts for select
  using (status = 'published');

create policy "Public can read published spotlights"
  on lantern_user_spotlights for select
  using (status = 'published');

create policy "Public can read active whitelist"
  on lantern_source_whitelist for select
  using (is_active = true);

create policy "Public can read active partners"
  on lantern_platform_partners for select
  using (is_active = true);

-- Admin policies (role-based — insert/update/delete requires service_role)
create policy "Admin can manage signals"
  on lantern_signals for all
  using (auth.role() = 'service_role');

create policy "Admin can manage posts"
  on lantern_posts for all
  using (auth.role() = 'service_role');

create policy "Admin can manage spotlights"
  on lantern_user_spotlights for all
  using (auth.role() = 'service_role');

create policy "Admin can manage whitelist"
  on lantern_source_whitelist for all
  using (auth.role() = 'service_role');

create policy "Admin can manage subscribers"
  on lantern_subscribers for all
  using (auth.role() = 'service_role');

create policy "Admin can manage partners"
  on lantern_platform_partners for all
  using (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED DATA: Source whitelist
-- ─────────────────────────────────────────────────────────────────────────────
insert into lantern_source_whitelist (source_name, source_type) values
  ('Hacker News', 'aggregator'),
  ('GitHub Trending', 'aggregator'),
  ('Product Hunt', 'aggregator'),
  ('ArXiv', 'academic'),
  ('TechCrunch', 'publication'),
  ('The Verge', 'publication'),
  ('Wired', 'publication'),
  ('Ars Technica', 'publication'),
  ('Stack Overflow Blog', 'publication'),
  ('Google AI Blog', 'publication'),
  ('Anthropic Blog', 'publication'),
  ('OpenAI Blog', 'publication'),
  ('Supabase Blog', 'publication'),
  ('Vercel Blog', 'publication'),
  ('Beehiiv Blog', 'publication')
on conflict (source_name) do nothing;

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED DATA: Platform partners
-- ─────────────────────────────────────────────────────────────────────────────
insert into lantern_platform_partners (name, slug, description, is_redlantern_product, sort_order) values
  ('Amina', 'amina', 'AI native companion for Muslim communities — wellness, reflection, daily practice.', true, 1),
  ('TradeSwarm', 'tradeswarm', 'AI-powered intelligence gathering and analysis platform for operators.', true, 2),
  ('Authentic Hadith', 'authentic-hadith', 'Scholar-verified hadith database with chain-of-narration tracking.', true, 3)
on conflict (slug) do nothing;
