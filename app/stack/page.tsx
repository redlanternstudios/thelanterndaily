import Image from 'next/image';
import { LanternMasthead } from '@/components/LanternMasthead';
import { StackToolCard } from '@/components/StackToolCard';
import type { StackEntry, AgentName } from '@/data/lanternTypes';

// ─── SEED DATA ─────────────────────────────────────────────────────────────
// Mirrors supabase/migrations/003_ai_agent_stack.sql seed inserts.
// Will be replaced with Supabase query once migration is applied.
// For now, inline data allows the page to render without a live DB connection.

const STACK_ENTRIES: StackEntry[] = [
  // ── Infra ──
  { id: 's1', name: 'AWS', category: 'Cloud', section: 'Infra', description: 'Foundation layer for compute, storage, and networking at any scale.', agent_name: null, agent_blurb: null, tier: 'operator', image_url: null, website_url: null, sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: 's2', name: 'Cloudflare', category: 'Edge / DNS', section: 'Infra', description: 'DNS, DDoS, Workers, and R2. The edge layer every operator needs.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: 's3', name: 'Vercel', category: 'Deployment', section: 'Infra', description: 'Edge-first Next.js deploys. Zero config. Global CDN out of the box.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: 's4', name: 'GitHub', category: 'Source Control', section: 'Infra', description: 'Version control and CI/CD. The SSOT for every production codebase.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 4, is_active: true, created_at: '', updated_at: '' },

  // ── Models & APIs ──
  { id: 's5', name: 'OpenAI', category: 'LLM', section: 'Models & APIs', description: 'GPT-4o and o-series. Still the default integration target for most operators.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: 's6', name: 'Anthropic', category: 'LLM', section: 'Models & APIs', description: 'Claude 3.5 and 4. Preferred for long-context, instruction-heavy agent tasks.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 6, is_active: true, created_at: '', updated_at: '' },
  { id: 's7', name: 'Google', category: 'LLM', section: 'Models & APIs', description: 'Gemini 1.5 Pro. Best multimodal option for mixed media workloads.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 7, is_active: true, created_at: '', updated_at: '' },
  { id: 's8', name: 'Perplexity', category: 'Search AI', section: 'Models & APIs', description: 'Real-time web retrieval with source attribution. Replaces basic search queries.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 8, is_active: true, created_at: '', updated_at: '' },

  // ── Data & Tools ──
  { id: 's9', name: 'PostgreSQL', category: 'Database', section: 'Data & Tools', description: 'The default relational database. Supabase puts it behind a clean API.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 9, is_active: true, created_at: '', updated_at: '' },
  { id: 's10', name: 'Supabase', category: 'Backend', section: 'Data & Tools', description: 'Postgres + Auth + RLS in one. The only backend a solo builder needs to know.', agent_name: 'SOURCE' as AgentName, agent_blurb: 'Postgres + Auth + RLS in one. The only backend a solo builder needs to know.', tier: 'free', image_url: null, website_url: null, sort_order: 10, is_active: true, created_at: '', updated_at: '' },
  { id: 's11', name: 'Snowflake', category: 'Data Warehouse', section: 'Data & Tools', description: 'Analytics at scale. Separation of storage and compute.', agent_name: null, agent_blurb: null, tier: 'operator', image_url: null, website_url: null, sort_order: 11, is_active: true, created_at: '', updated_at: '' },
  { id: 's12', name: 'Hex', category: 'Analytics', section: 'Data & Tools', description: 'Collaborative notebooks for data teams. SQL + Python in one workspace.', agent_name: null, agent_blurb: null, tier: 'operator', image_url: null, website_url: null, sort_order: 12, is_active: true, created_at: '', updated_at: '' },
  { id: 's13', name: 'Apify', category: 'Scraping', section: 'Data & Tools', description: 'Web scraping and automation at production scale. Actor ecosystem.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 13, is_active: true, created_at: '', updated_at: '' },

  // ── Applications ──
  { id: 's14', name: 'Notion', category: 'Docs / Wiki', section: 'Applications', description: 'SSOT for team knowledge. Replaces scattered Confluence and Google Docs.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 14, is_active: true, created_at: '', updated_at: '' },
  { id: 's15', name: 'Linear', category: 'Issue Tracking', section: 'Applications', description: 'Fast, keyboard-driven project management. Built for engineering teams.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 15, is_active: true, created_at: '', updated_at: '' },
  { id: 's16', name: 'Figma', category: 'Design', section: 'Applications', description: 'Design and prototyping. The standard handoff layer between design and eng.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 16, is_active: true, created_at: '', updated_at: '' },
  { id: 's17', name: 'Slack', category: 'Comms', section: 'Applications', description: 'Team communication. Increasingly the surface for agent alerts and reports.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 17, is_active: true, created_at: '', updated_at: '' },

  // ── Governance ──
  { id: 's18', name: '1Password', category: 'Secrets', section: 'Governance', description: 'Credential management for teams. SSO and vault sharing without shared passwords.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 18, is_active: true, created_at: '', updated_at: '' },
  { id: 's19', name: 'Sentry', category: 'Error Tracking', section: 'Governance', description: 'Production error tracking with full context. Not just stack traces.', agent_name: null, agent_blurb: null, tier: 'free', image_url: null, website_url: null, sort_order: 19, is_active: true, created_at: '', updated_at: '' },
  { id: 's20', name: 'Datadog', category: 'Monitoring', section: 'Governance', description: 'Infrastructure and APM observability. The standard for enterprise monitoring.', agent_name: null, agent_blurb: null, tier: 'operator', image_url: null, website_url: null, sort_order: 20, is_active: true, created_at: '', updated_at: '' },
  { id: 's21', name: 'Vanta', category: 'Compliance', section: 'Governance', description: 'SOC 2 and ISO 27001 automation. Continuous compliance monitoring.', agent_name: null, agent_blurb: null, tier: 'operator', image_url: null, website_url: null, sort_order: 21, is_active: true, created_at: '', updated_at: '' },

  // ── SIGNAL's tools ──
  { id: 's22', name: 'Ahrefs Webmaster Tools', category: 'SEO', section: 'Applications', description: 'Free tier covers 90% of what a small publication needs. Start here before paying for anything.', agent_name: 'SIGNAL' as AgentName, agent_blurb: 'Free tier covers 90% of what a small publication needs. Start here before paying for anything.', tier: 'free', image_url: null, website_url: null, sort_order: 22, is_active: true, created_at: '', updated_at: '' },
  { id: 's23', name: 'Beehiiv', category: 'Newsletter growth', section: 'Applications', description: 'The referral program alone is worth the paid tier. Build the loop from day one.', agent_name: 'SIGNAL' as AgentName, agent_blurb: 'The referral program alone is worth the paid tier. Build the loop from day one.', tier: 'free', image_url: null, website_url: null, sort_order: 23, is_active: true, created_at: '', updated_at: '' },
  { id: 's24', name: 'Typefully', category: 'Content scheduling', section: 'Applications', description: 'Write in one place, distribute everywhere. Stops the manual copy-paste tax.', agent_name: 'SIGNAL' as AgentName, agent_blurb: 'Write in one place, distribute everywhere. Stops the manual copy-paste tax.', tier: 'free', image_url: null, website_url: null, sort_order: 24, is_active: true, created_at: '', updated_at: '' },

  // ── BRIEF's tools ──
  { id: 's25', name: 'n8n', category: 'Automation', section: 'Data & Tools', description: 'Fair-code workflow automation. Self-hosted or cloud. 400+ integrations.', agent_name: 'BRIEF' as AgentName, agent_blurb: 'Self-hosted means your data stays yours. For halal business operators, that matters.', tier: 'free', image_url: null, website_url: null, sort_order: 25, is_active: true, created_at: '', updated_at: '' },
  { id: 's26', name: 'Clay', category: 'Lead enrichment', section: 'Applications', description: 'Enrichment + outreach in one flow. The cold start problem gets a lot smaller.', agent_name: 'BRIEF' as AgentName, agent_blurb: 'Enrichment + outreach in one flow. The cold start problem gets a lot smaller.', tier: 'operator', image_url: null, website_url: null, sort_order: 26, is_active: true, created_at: '', updated_at: '' },
  { id: 's27', name: 'Instantly', category: 'Email outreach', section: 'Applications', description: 'Deliverability-first design. Sequences that feel personal at scale.', agent_name: 'BRIEF' as AgentName, agent_blurb: 'Deliverability-first design. Sequences that feel personal at scale.', tier: 'operator', image_url: null, website_url: null, sort_order: 27, is_active: true, created_at: '', updated_at: '' },

  // ── SOURCE's tools ──
  { id: 's28', name: 'shadcn/ui', category: 'Frontend', section: 'Data & Tools', description: 'Copy components into your repo. You own the code. No lock-in, no black box.', agent_name: 'SOURCE' as AgentName, agent_blurb: 'Copy components into your repo. You own the code. No lock-in, no black box.', tier: 'free', image_url: null, website_url: null, sort_order: 28, is_active: true, created_at: '', updated_at: '' },
  { id: 's29', name: 'Trigger.dev', category: 'Background jobs', section: 'Data & Tools', description: 'Open source, self-hostable background job runner. Replaced three Zapier workflows for one Trigger.dev flow.', agent_name: 'SOURCE' as AgentName, agent_blurb: 'Open source, self-hostable background job runner. Replaced three Zapier workflows for one Trigger.dev flow.', tier: 'free', image_url: null, website_url: null, sort_order: 29, is_active: true, created_at: '', updated_at: '' },
];

// Group entries by section preserving order
const SECTIONS = [
  'Infra',
  'Models & APIs',
  'Data & Tools',
  'Applications',
  'Governance',
] as const;

function getEntriesForSection(section: string): StackEntry[] {
  return STACK_ENTRIES
    .filter((e) => e.section === section && e.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export default function StackPage() {
  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── HERO ───────────────────────────────────────────────── */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            marginTop: '2px',
            marginBottom: '2px',
          }}
        >
          <div
            className="card"
            style={{
              padding: '64px 56px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="kicker" style={{ marginBottom: '20px' }}>
              The Operator Stack
            </div>
            <h1 style={{ marginBottom: '24px', fontSize: '52px' }}>
              Tools built for operators who ship.
            </h1>
            <p
              className="excerpt"
              style={{
                fontSize: '18px',
                marginBottom: '36px',
                maxWidth: '420px',
              }}
            >
              Not a sponsored listicle. Not VC-backed recommendations. The actual
              stack Muslim-led teams are running in production right now.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="join-button">Get Operator Access</button>
              <a
                href="/archive?category=Operator+Stack"
                className="btn outline"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                Browse Coverage
              </a>
            </div>
          </div>
          <div className="article-image" style={{ minHeight: '480px' }}>
            <Image
              src="/images/lantern/operator-stack-hero.jpg"
              alt="Operator Stack"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </section>

        {/* ── AI AGENT INTRO ROW ──────────────────────────────────── */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2px',
            marginBottom: '2px',
          }}
        >
          <div className="card">
            <div className="card-body">
              <div className="kicker" style={{ marginBottom: '14px' }}>
                SIGNAL — Distribution &amp; Discovery
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7 }}>
                &ldquo;If no one finds it, you didn&apos;t build it.&rdquo;
                SIGNAL knows how to move audiences, rank content, and build
                distribution infrastructure. No fluff, just what moves the
                needle.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="kicker" style={{ marginBottom: '14px' }}>
                BRIEF — Automation &amp; Pipelines
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7 }}>
                &ldquo;Automation is just documented discipline.&rdquo; BRIEF
                builds the systems that turn strangers into subscribers,
                customers, and partners. Methodical, efficiency-obsessed.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="kicker" style={{ marginBottom: '14px' }}>
                SOURCE — Builds &amp; Open Source
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7 }}>
                &ldquo;Open source is the only starting point that makes
                sense.&rdquo; SOURCE ships products, wires backends, and
                evaluates repos before recommending them. Technical but
                accessible.
              </p>
            </div>
          </div>
        </section>

        {/* ── INFO ROW ───────────────────────────────────────────── */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2px',
            marginBottom: '2px',
          }}
        >
          {[
            {
              label: 'WHY THIS EXISTS',
              body: 'Most stack guides are sponsored content or written by people who haven\'t run production systems. This one is built from operator interviews and real deployment data.',
            },
            {
              label: 'WHAT WE COVER',
              body: 'Infrastructure, automation, AI/LLM tooling, observability, payment infrastructure, and the Islamic finance stack. Updated quarterly.',
            },
            {
              label: 'OPERATOR NOTE',
              body: 'Operator tier subscribers get vendor comparison tables, migration guides, and direct stack recommendations for specific use cases.',
            },
          ].map((item) => (
            <div key={item.label} className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: '14px' }}>
                  {item.label}
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ── STACK SECTIONS ─────────────────────────────────────── */}
        {SECTIONS.map((sectionLabel) => {
          const entries = getEntriesForSection(sectionLabel);
          if (entries.length === 0) return null;

          return (
            <section key={sectionLabel} style={{ marginBottom: '2px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '240px 1fr',
                  gap: '2px',
                }}
              >
                {/* Section label (vertical) */}
                <div
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px',
                  }}
                >
                  <div
                    className="kicker"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                    }}
                  >
                    {sectionLabel}
                  </div>
                </div>

                {/* Tool cards grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '2px',
                  }}
                >
                  {entries.map((tool) => (
                    <StackToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── AGENT FOOTER ────────────────────────────────────────── */}
        <section
          className="card"
          style={{ padding: '48px 56px', marginBottom: '2px' }}
        >
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div className="kicker" style={{ marginBottom: '14px' }}>
              THE LANTERN MASTHEAD
            </div>
            <h2 style={{ marginBottom: '16px' }}>
              SIGNAL · BRIEF · SOURCE
            </h2>
            <p
              className="excerpt"
              style={{
                maxWidth: '560px',
                margin: '0 auto',
                fontSize: '15px',
                lineHeight: 1.7,
              }}
            >
              Each tool recommendation is attributed to the AI agent whose
              domain it belongs to. Not a chatbot. Not a gimmick. Three
              editorial voices proving what &ldquo;Muslim-built,
              AI-native&rdquo; looks like.
            </p>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer className="footer">
          <div className="footer-bottom">
            <span>© 2026 By Red, LLC</span>
            <span>BUILD IN PUBLIC. OPERATE IN TRUTH.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
