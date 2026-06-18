import Link from "next/link";

export default function IntelligencePage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div style={{ padding: "40px 48px 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div className="section-line" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Intelligence
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>
          Intelligence Briefing
        </h1>
        <p style={{ fontSize: "15px", color: "var(--muted)", marginTop: "12px", maxWidth: "500px" }}>
          Curated intelligence across the domains that matter to Muslim operators and AI-native builders.
        </p>
      </div>

      <div style={{ padding: "40px 48px 80px" }}>
        <div className="brief-grid">
          {/* Categories */}
          <div>
            {[
              { title: "AI Systems", desc: "Model releases, agent frameworks, infrastructure shifts, and the architectural decisions that define the next generation of AI products.", count: "12 signals" },
              { title: "Governance", desc: "Regulation, ethics, Sharia compliance in tech, and the control layer debates that will shape AI deployment for the next decade.", count: "8 signals" },
              { title: "Market Signal", desc: "Funding flows, market gaps, demographic shifts, and the capital allocation patterns that serious builders need to watch.", count: "7 signals" },
              { title: "Field Notes", desc: "On-the-ground reporting from Muslim tech ecosystems — Alif Summit, GITEX, local meetups, and the networks that don't make the news.", count: "6 signals" },
              { title: "Operator Stack", desc: "The actual tools, frameworks, and infrastructure that serious Muslim builders are shipping with. No hype. Just what works.", count: "5 signals" },
            ].map((cat) => (
              <div key={cat.title} style={{ padding: "24px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "1px", background: "var(--red)" }} />
                  {cat.title}
                </div>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--muted)", marginBottom: "8px" }}>{cat.desc}</p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--dim)" }}>{cat.count}</span>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ border: "1px solid var(--red-border)", background: "var(--red-dim)", padding: "24px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red)", marginBottom: "12px" }}>
                Intelligence Access
              </div>
              <div style={{ fontSize: "13px", color: "var(--off-white)", lineHeight: 1.5, marginBottom: "16px" }}>
                Full access to all intelligence categories, including premium signals and deep dives.
              </div>
              <Link
                href="/#subscribe"
                style={{
                  display: "block",
                  background: "var(--red)",
                  color: "var(--white)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "12px 0",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Subscribe Free
              </Link>
            </div>

            <div style={{ border: "1px solid var(--border)", padding: "20px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
                Latest Signal
              </div>
              <div style={{ fontSize: "14px", fontFamily: "var(--font-serif)", color: "var(--off-white)", lineHeight: 1.4, marginBottom: "8px" }}>
                Agent Governance Is the New Product Layer
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Jun 13 · Issue #007
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
