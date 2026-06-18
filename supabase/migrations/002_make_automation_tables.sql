-- THE LANTERN DAILY — MIGRATION 002: MAKE.COM AUTOMATION TABLES
-- Applied: 2026-06-16
-- Adds the tables required by the Make.com Trigger Map scenarios.
-- The migration is additive — does not modify any existing tables.

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: lantern_content_queue
-- Ingested RSS articles scored by Groq, pending Ro approval.
-- Used by C1 (Content Radar) and C2 (Approval Digest).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists lantern_content_queue (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  url             text not null,
  source          text not null,               -- feed name (e.g. 'islamicfinanceguru')
  ai_summary      text,
  relevance_score smallint check (relevance_score between 1 and 10),
  halal_stance    text check (halal_stance in ('POSITIVE', 'NEUTRAL', 'CRITICAL', 'BLOCKED')),
  status          text not null default 'pending'
                    check (status in ('pending', 'approved', 'rejected', 'used')),
  approved_at     timestamptz,
  rejected_at     timestamptz,
  queued_at       timestamptz not null default now(),
  processed_at    timestamptz
);

create index if not exists idx_content_queue_status on lantern_content_queue(status);
create index if not exists idx_content_queue_relevance on lantern_content_queue(relevance_score desc);
create index if not exists idx_content_queue_source on lantern_content_queue(source);
create index if not exists idx_content_queue_url on lantern_content_queue(url);

alter table lantern_content_queue enable row level security;
create policy "service_role_all_content_queue" on lantern_content_queue
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: lantern_drafts
-- Auto-generated draft content (Daily Dispatch, Weekly Brief) from Groq.
-- Used by C3 and C4. Final publish happens in Beehiiv.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists lantern_drafts (
  id              uuid primary key default uuid_generate_v4(),
  type            text not null check (type in ('daily-dispatch', 'weekly-brief')),
  content         text not null,              -- full assembled markdown
  status          text not null default 'ready_to_publish'
                    check (status in ('generating', 'ready_to_publish', 'published', 'skipped')),
  story_ids       uuid[],                     -- references lantern_content_queue.id
  publish_at      timestamptz,                -- scheduled publish time
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_drafts_status on lantern_drafts(status);
create index if not exists idx_drafts_type on lantern_drafts(type);
create index if not exists idx_drafts_publish_at on lantern_drafts(publish_at);

alter table lantern_drafts enable row level security;
create policy "service_role_all_drafts" on lantern_drafts
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create or replace function update_drafts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger drafts_updated_at
  before update on lantern_drafts
  for each row execute function update_drafts_updated_at();


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: lantern_spotlight_referrals
-- Tracks referral codes and commissions for paid spotlights.
-- Used by U2 (Premium Welcome + Referral).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists lantern_spotlight_referrals (
  id                uuid primary key default uuid_generate_v4(),
  referrer_email    text not null,
  referrer_operator_number integer,
  referred_email    text not null,
  status            text not null default 'pending'
                      check (status in ('pending', 'converted', 'expired')),
  commission_amount numeric(10, 2),
  converted_at      timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists idx_referrals_referred_email on lantern_spotlight_referrals(referred_email);
create index if not exists idx_referrals_status on lantern_spotlight_referrals(status);

alter table lantern_spotlight_referrals enable row level security;
create policy "service_role_all_referrals" on lantern_spotlight_referrals
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: lantern_automation_errors
-- Failure log for all Make.com scenarios.
-- Used by every scenario's failure path.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists lantern_automation_errors (
  id              uuid primary key default uuid_generate_v4(),
  scenario_id     text not null,              -- e.g. 'C1', 'C2', 'U1'
  error_type      text not null,              -- e.g. 'rss_fetch_failed', 'groq_api_error'
  error_detail    text,
  context         jsonb,
  created_at      timestamptz not null default now(),
  resolved        boolean not null default false
);

create index if not exists idx_automation_errors_scenario on lantern_automation_errors(scenario_id);
create index if not exists idx_automation_errors_created on lantern_automation_errors(created_at desc);

alter table lantern_automation_errors enable row level security;
create policy "service_role_all_automation_errors" on lantern_automation_errors
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: contact_submissions
-- Contact form submissions. Triggers UT2 notification on INSERT.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists contact_submissions (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  email         text not null,
  subject       text,
  message       text not null,
  submitted_at  timestamptz not null default now(),
  resolved      boolean not null default false
);

alter table contact_submissions enable row level security;
create policy "anon_insert_contact" on contact_submissions
  for insert with check (true);
create policy "service_role_read_contact" on contact_submissions
  for select using (auth.role() = 'service_role');
