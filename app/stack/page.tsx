import Image from "next/image";
import { LanternMasthead } from "@/components/LanternMasthead";

const STACK_SECTIONS = [
  {
    label: "Infra",
    tools: [
      { name: "AWS", cat: "Cloud", desc: "Foundation layer for compute, storage, and networking at any scale." },
      { name: "Cloudflare", cat: "Edge / DNS", desc: "DNS, DDoS, Workers, and R2. The edge layer every operator needs." },
      { name: "Vercel", cat: "Deployment", desc: "Edge-first Next.js deploys. Zero config. Global CDN out of the box." },
      { name: "GitHub", cat: "Source Control", desc: "Version control and CI/CD. The SSOT for every production codebase." },
    ],
  },
  {
    label: "Models & APIs",
    tools: [
      { name: "OpenAI", cat: "LLM", desc: "GPT-4o and o-series. Still the default integration target for most operators." },
      { name: "Anthropic", cat: "LLM", desc: "Claude 3.5 and 4. Preferred for long-context, instruction-heavy agent tasks." },
      { name: "Google", cat: "LLM", desc: "Gemini 1.5 Pro. Best multimodal option for mixed media workloads." },
      { name: "Perplexity", cat: "Search AI", desc: "Real-time web retrieval with source attribution. Replaces basic search queries." },
    ],
  },
  {
    label: "Data & Tools",
    tools: [
      { name: "PostgreSQL", cat: "Database", desc: "The default relational database. Supabase puts it behind a clean API." },
      { name: "Snowflake", cat: "Data Warehouse", desc: "Analytics at scale. Separation of storage and compute." },
      { name: "Hex", cat: "Analytics", desc: "Collaborative notebooks for data teams. SQL + Python in one workspace." },
      { name: "Apify", cat: "Scraping", desc: "Web scraping and automation at production scale. Actor ecosystem." },
    ],
  },
  {
    label: "Applications",
    tools: [
      { name: "Notion", cat: "Docs / Wiki", desc: "SSOT for team knowledge. Replaces scattered Confluence and Google Docs." },
      { name: "Linear", cat: "Issue Tracking", desc: "Fast, keyboard-driven project management. Built for engineering teams." },
      { name: "Figma", cat: "Design", desc: "Design and prototyping. The standard handoff layer between design and eng." },
      { name: "Slack", cat: "Comms", desc: "Team communication. Increasingly the surface for agent alerts and reports." },
    ],
  },
  {
    label: "Governance",
    tools: [
      { name: "1Password", cat: "Secrets", desc: "Credential management for teams. SSO and vault sharing without shared passwords." },
      { name: "Sentry", cat: "Error Tracking", desc: "Production error tracking with full context. Not just stack traces." },
      { name: "Datadog", cat: "Monitoring", desc: "Infrastructure and APM observability. The standard for enterprise monitoring." },
      { name: "Vanta", cat: "Compliance", desc: "SOC 2 and ISO 27001 automation. Continuous compliance monitoring." },
    ],
  },
];

export default function StackPage() {
  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── HERO ───────────────────────────────────────────────── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <div
            className="card"
            style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <div className="kicker" style={{ marginBottom: "20px" }}>The Operator Stack</div>
            <h1 style={{ marginBottom: "24px", fontSize: "52px" }}>
              Tools built for operators who ship.
            </h1>
            <p className="excerpt" style={{ fontSize: "18px", marginBottom: "36px", maxWidth: "420px" }}>
              Not a sponsored listicle. Not VC-backed recommendations. The actual
              stack Muslim-led teams are running in production right now.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="join-button">Get Operator Access</button>
              <a
                href="/archive?category=Operator+Stack"
                className="btn outline"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Browse Coverage
              </a>
            </div>
          </div>
          <div className="article-image" style={{ minHeight: "480px" }}>
            <Image
              src="/images/lantern/operator-stack-hero.jpg"
              alt="Operator Stack"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </section>

        {/* ── INFO ROW ───────────────────────────────────────────── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          {[
            {
              label: "WHY THIS EXISTS",
              body: "Most stack guides are sponsored content or written by people who haven't run production systems. This one is built from operator interviews and real deployment data.",
            },
            {
              label: "WHAT WE COVER",
              body: "Infrastructure, automation, AI/LLM tooling, observability, payment infrastructure, and the Islamic finance stack. Updated quarterly.",
            },
            {
              label: "OPERATOR NOTE",
              body: "Operator tier subscribers get vendor comparison tables, migration guides, and direct stack recommendations for specific use cases.",
            },
          ].map((item) => (
            <div key={item.label} className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: "14px" }}>{item.label}</div>
                <p style={{ fontSize: "14px", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── STACK SECTIONS ─────────────────────────────────────── */}
        {STACK_SECTIONS.map((section) => (
          <section key={section.label} style={{ marginBottom: "2px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2px" }}>
              <div
                className="card"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}
              >
                <div
                  className="kicker"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  {section.label}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
                {section.tools.map((tool) => (
                  <div key={tool.name} className="card">
                    <div className="card-body">
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "var(--surface-2)",
                          border: "1px solid var(--border-2)",
                          display: "grid",
                          placeItems: "center",
                          marginBottom: "16px",
                          fontFamily: "Space Mono, monospace",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--red)",
                        }}
                      >
                        {tool.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="kicker" style={{ marginBottom: "6px" }}>{tool.cat}</div>
                      <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>{tool.name}</h4>
                      <p style={{ fontSize: "13px", lineHeight: 1.6 }}>{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

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
