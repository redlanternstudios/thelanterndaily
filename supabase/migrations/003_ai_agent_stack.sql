-- THE LANTERN DAILY — MIGRATION 003: AI AGENT STACK
-- Applied: 2026-06-16
-- Adds the AI agent attribution layer for /stack tool cards.
-- Phase 1 only. Phase 2 (full narratives) will add lantern_agent_dispatches table.
-- No existing tables are modified. Migration is fully additive.

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE: lantern_stack_entries
-- Each row = a tool in the Operator Stack, with agent attribution.
-- Agents (SIGNAL/BRIEF/SOURCE) are editorial personas on the masthead.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists lantern_stack_entries (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  category        text not null,              -- e.g. 'SEO', 'Automation', 'Backend'
  section         text not null,              -- e.g. 'Infra', 'Models & APIs', 'Data & Tools', 'Applications', 'Governance'
  description     text not null,              -- one-line tool description
  agent_name      text check (agent_name in ('SIGNAL', 'BRIEF', 'SOURCE')),  -- nullable: some tools have no agent blurb yet
  agent_blurb     text,                       -- 1-2 sentence agent POV. Visible on free tier.
  tier            text not null default 'free' check (tier in ('free', 'operator')),
  image_url       text,
  website_url     text,
  sort_order      smallint not null default 0,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_stack_entries_section on lantern_stack_entries(section);
create index if not exists idx_stack_entries_agent on lantern_stack_entries(agent_name);
create index if not exists idx_stack_entries_category on lantern_stack_entries(category);
create index if not exists idx_stack_entries_sort on lantern_stack_entries(sort_order);

alter table lantern_stack_entries enable row level security;

create policy "Public can read active stack entries"
  on lantern_stack_entries for select
  using (is_active = true);

create policy "Admin can manage stack entries"
  on lantern_stack_entries for all
  using (auth.role() = 'service_role');

create or replace function update_stack_entries_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger stack_entries_updated_at
  before update on lantern_stack_entries
  for each row execute function update_stack_entries_updated_at();


-- ─────────────────────────────────────────────────────────────────────────────
-- SEED DATA: The full Operator Stack with AI agent attribution
-- ─────────────────────────────────────────────────────────────────────────────

-- Section 1: Infra
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('AWS', 'Cloud', 'Infra', 'Foundation layer for compute, storage, and networking at any scale.', NULL, NULL, 'operator', 1),
  ('Cloudflare', 'Edge / DNS', 'Infra', 'DNS, DDoS, Workers, and R2. The edge layer every operator needs.', NULL, NULL, 'free', 2),
  ('Vercel', 'Deployment', 'Infra', 'Edge-first Next.js deploys. Zero config. Global CDN out of the box.', NULL, NULL, 'free', 3),
  ('GitHub', 'Source Control', 'Infra', 'Version control and CI/CD. The SSOT for every production codebase.', NULL, NULL, 'free', 4)
on conflict do nothing;

-- Section 2: Models & APIs
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('OpenAI', 'LLM', 'Models & APIs', 'GPT-4o and o-series. Still the default integration target for most operators.', NULL, NULL, 'free', 5),
  ('Anthropic', 'LLM', 'Models & APIs', 'Claude 3.5 and 4. Preferred for long-context, instruction-heavy agent tasks.', NULL, NULL, 'free', 6),
  ('Google', 'LLM', 'Models & APIs', 'Gemini 1.5 Pro. Best multimodal option for mixed media workloads.', NULL, NULL, 'free', 7),
  ('Perplexity', 'Search AI', 'Models & APIs', 'Real-time web retrieval with source attribution. Replaces basic search queries.', NULL, NULL, 'free', 8)
on conflict do nothing;

-- Section 3: Data & Tools
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('PostgreSQL', 'Database', 'Data & Tools', 'The default relational database. Supabase puts it behind a clean API.', NULL, NULL, 'free', 9),
  ('Supabase', 'Backend', 'Data & Tools', 'Postgres + Auth + RLS in one. The only backend a solo builder needs to know.', 'SOURCE', 'Postgres + Auth + RLS in one. The only backend a solo builder needs to know.', 'free', 10),
  ('Snowflake', 'Data Warehouse', 'Data & Tools', 'Analytics at scale. Separation of storage and compute.', NULL, NULL, 'operator', 11),
  ('Hex', 'Analytics', 'Data & Tools', 'Collaborative notebooks for data teams. SQL + Python in one workspace.', NULL, NULL, 'operator', 12),
  ('Apify', 'Scraping', 'Data & Tools', 'Web scraping and automation at production scale. Actor ecosystem.', NULL, NULL, 'free', 13)
on conflict do nothing;

-- Section 4: Applications
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('Notion', 'Docs / Wiki', 'Applications', 'SSOT for team knowledge. Replaces scattered Confluence and Google Docs.', NULL, NULL, 'free', 14),
  ('Linear', 'Issue Tracking', 'Applications', 'Fast, keyboard-driven project management. Built for engineering teams.', NULL, NULL, 'free', 15),
  ('Figma', 'Design', 'Applications', 'Design and prototyping. The standard handoff layer between design and eng.', NULL, NULL, 'free', 16),
  ('Slack', 'Comms', 'Applications', 'Team communication. Increasingly the surface for agent alerts and reports.', NULL, NULL, 'free', 17)
on conflict do nothing;

-- Section 5: Governance
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('1Password', 'Secrets', 'Governance', 'Credential management for teams. SSO and vault sharing without shared passwords.', NULL, NULL, 'free', 18),
  ('Sentry', 'Error Tracking', 'Governance', 'Production error tracking with full context. Not just stack traces.', NULL, NULL, 'free', 19),
  ('Datadog', 'Monitoring', 'Governance', 'Infrastructure and APM observability. The standard for enterprise monitoring.', NULL, NULL, 'operator', 20),
  ('Vanta', 'Compliance', 'Governance', 'SOC 2 and ISO 27001 automation. Continuous compliance monitoring.', NULL, NULL, 'operator', 21)
on conflict do nothing;

-- SIGNAL attribution: SEO, distribution, growth
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('Ahrefs Webmaster Tools', 'SEO', 'Applications', 'Free tier covers 90% of what a small publication needs. Start here before paying for anything.', 'SIGNAL', 'Free tier covers 90% of what a small publication needs. Start here before paying for anything.', 'free', 22),
  ('Beehiiv', 'Newsletter growth', 'Applications', 'The referral program alone is worth the paid tier. Build the loop from day one.', 'SIGNAL', 'The referral program alone is worth the paid tier. Build the loop from day one.', 'free', 23),
  ('Typefully', 'Content scheduling', 'Applications', 'Write in one place, distribute everywhere. Stops the manual copy-paste tax.', 'SIGNAL', 'Write in one place, distribute everywhere. Stops the manual copy-paste tax.', 'free', 24)
on conflict do nothing;

-- BRIEF attribution: automation, outreach, CRM
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('n8n', 'Automation', 'Data & Tools', 'Fair-code workflow automation. Self-hosted or cloud. 400+ integrations.', 'BRIEF', 'Self-hosted means your data stays yours. For halal business operators, that matters.', 'free', 25),
  ('Clay', 'Lead enrichment', 'Applications', 'Enrichment + outreach in one flow. The cold start problem gets a lot smaller.', 'BRIEF', 'Enrichment + outreach in one flow. The cold start problem gets a lot smaller.', 'operator', 26),
  ('Instantly', 'Email outreach', 'Applications', 'Deliverability-first design. Sequences that feel personal at scale.', 'BRIEF', 'Deliverability-first design. Sequences that feel personal at scale.', 'operator', 27)
on conflict do nothing;

-- SOURCE attribution: dev + open source
insert into lantern_stack_entries (name, category, section, description, agent_name, agent_blurb, tier, sort_order) values
  ('shadcn/ui', 'Frontend', 'Data & Tools', 'Copy components into your repo. You own the code. No lock-in, no black box.', 'SOURCE', 'Copy components into your repo. You own the code. No lock-in, no black box.', 'free', 28),
  ('Trigger.dev', 'Background jobs', 'Data & Tools', 'Open source, self-hostable background job runner. Replaced three Zapier workflows for one Trigger.dev flow.', 'SOURCE', 'Open source, self-hostable background job runner. Replaced three Zapier workflows for one Trigger.dev flow.', 'free', 29)
on conflict do nothing;
