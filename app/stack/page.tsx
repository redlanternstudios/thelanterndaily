import { LanternMasthead } from "@/components/LanternMasthead";
import { getStackEntries, type LanternStackEntry } from "@/lib/lantern/queries";

// Group stack entries by category for display
function groupByCategory(entries: LanternStackEntry[]) {
  const order = ["backend", "frontend", "infra", "ai", "productivity", "design", "open-source"];
  const labels: Record<string, string> = {
    backend: "Backend & Logic",
    frontend: "Frontend",
    infra: "Infrastructure",
    ai: "AI & Models",
    productivity: "Productivity",
    design: "Design",
    "open-source": "Open Source",
  };
  const groups: Record<string, LanternStackEntry[]> = {};
  for (const entry of entries) {
    if (!groups[entry.category]) groups[entry.category] = [];
    groups[entry.category].push(entry);
  }
  return order
    .filter((cat) => groups[cat]?.length > 0)
    .map((cat) => ({ label: labels[cat] ?? cat, tools: groups[cat] }));
}

export default async function StackPage() {
  const stackEntries = await getStackEntries(24);
  const stackSections = groupByCategory(stackEntries);
  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* HERO */}
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
              <a href="/#subscribe" className="join-button">Get Operator Access →</a>
              <a
                href="/archive?category=Operator+Stack"
                className="btn outline"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Browse Coverage
              </a>
            </div>
          </div>
          <div
            className="article-image"
            style={{
              minHeight: "480px",
              background: "var(--surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "var(--dim)",
              }}
            >
              OPERATOR STACK
            </span>
          </div>
        </section>

        {/* INFO ROW */}
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

        {/* STACK SECTIONS */}
        {stackSections.map((section) => (
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
                  <a
                    key={tool.tool_name}
                    href={tool.tool_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card" style={{ height: "100%", cursor: "pointer" }}>
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
                          {tool.tool_name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="kicker" style={{ marginBottom: "6px" }}>{tool.category}</div>
                        <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>{tool.tool_name}</h4>
                        <p style={{ fontSize: "13px", lineHeight: 1.6 }}>{tool.one_line_desc}</p>
                        {!tool.halal_screened && (
                          <div
                            style={{
                              marginTop: "10px",
                              fontSize: "10px",
                              color: "var(--amber, #d97706)",
                              fontFamily: "Space Mono, monospace",
                              letterSpacing: "0.05em",
                            }}
                          >
                            WARNING VERIFY BEFORE USE
                          </div>
                        )}
                        {tool.has_affiliate && (
                          <div
                            style={{
                              marginTop: "6px",
                              fontSize: "10px",
                              color: "var(--dim)",
                              fontFamily: "Space Mono, monospace",
                            }}
                          >
                            Affiliate link
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-bottom">
            <span>2026 By Red, LLC</span>
            <span>BUILD IN PUBLIC. OPERATE IN TRUTH.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
