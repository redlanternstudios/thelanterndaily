import Link from "next/link";

const issues = [
  { slug: "agent-governance", title: "Agent Governance Is the New Product Layer", date: "Jun 13, 2026", excerpt: "The teams that build governance infrastructure now will own the trust layer.", topics: ["AI Systems", "Governance"], tier: "free" as const },
  { slug: "memory-layer", title: "Why Every Serious Operator Is Building a Memory Layer Now", date: "Jun 12, 2026", excerpt: "The difference between a demo and a product isn't the model.", topics: ["AI Systems"], tier: "free" as const },
  { slug: "alif-summit", title: "What the Alif Summit Said About Where Muslim Tech Is Going", date: "Jun 11, 2026", excerpt: "Three patterns from the room that tell you everything about the next 24 months.", topics: ["Field Notes"], tier: "premium" as const },
  { slug: "self-hosted-stack", title: "The Real Self-Hosted Stack: n8n on Railway, Supabase, and Why Make.com Doesn't Scale", date: "Jun 10, 2026", excerpt: "What serious Muslim builders are actually running under the hood.", topics: ["Operator Stack"], tier: "free" as const },
  { slug: "governance-control-layer", title: "Who Controls the Control Layer", date: "Jun 9, 2026", excerpt: "The control layer is the most consequential infrastructure decision of the next decade.", topics: ["Governance"], tier: "premium" as const },
  { slug: "halal-finance-ai", title: "Halal Finance Meets AI Infrastructure", date: "Jun 8, 2026", excerpt: "Where Islamic finance principles intersect with the AI infrastructure buildout.", topics: ["Market Signal"], tier: "premium" as const },
];

export default function ArchivePage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div style={{ padding: "40px 48px 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div className="section-line" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Full Archive
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>
          All Signals
        </h1>
        <p style={{ fontSize: "15px", color: "var(--muted)", marginTop: "12px", maxWidth: "500px" }}>
          Every issue of The Lantern Daily, from the latest signal to the first brief.
        </p>
      </div>

      <div style={{ padding: "40px 48px 64px" }}>
        <div className="archive-grid">
          {issues.map((issue) => (
            <Link
              key={issue.slug}
              href={`/issues/${issue.slug}`}
              style={{
                textDecoration: "none",
                border: "1px solid var(--border)",
                padding: "24px",
                background: "var(--bg-card)",
                transition: "all 0.3s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {issue.date}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "3px 8px", border: "1px solid",
                  color: issue.tier === "premium" ? "var(--red)" : "var(--muted)",
                  borderColor: issue.tier === "premium" ? "var(--red-border)" : "var(--dim)",
                }}>
                  {issue.tier === "premium" ? "Premium" : "Free"}
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 700, lineHeight: 1.3, color: "var(--off-white)", marginBottom: "8px" }}>
                {issue.title}
              </h2>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--muted)", marginBottom: "14px" }}>
                {issue.excerpt}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {issue.topics.map((topic) => (
                  <span key={topic} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "3px 8px", background: "rgba(255,255,255,0.04)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {topic}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
