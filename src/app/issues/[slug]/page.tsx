import Link from "next/link";

const issueContent: Record<string, { title: string; date: string; category: string; tier: string; content: string[] }> = {
  "agent-governance": {
    title: "Agent Governance Is the New Product Layer",
    date: "Jun 13, 2026",
    category: "AI Governance · Signal",
    tier: "premium",
    content: [
      "Every week, a new agent framework ships. CrewAI, AutoGen, LangGraph, OpenAI Agents SDK, Google ADK, Anthropic's MCP — the list grows faster than anyone can track.",
      "But here's the pattern nobody's naming: the frameworks all converge on the same unsolved problem. Governance.",
      "When an agent can write code, deploy infrastructure, and spend money, who decides what it's allowed to do? Who audits the decisions? Who turns it off when it goes rogue?",
      "The teams that build governance infrastructure now will own the trust layer that determines which AI products survive the next 18 months.",
      "",
      "## The Three Layers of Agent Governance",
      "",
      "**1. Identity & Permissions.** Every agent needs a cryptographically verifiable identity. Not an API key. An identity. This is what SPIRE, OAuth 2.1 with DPoP, and the emerging agent identity standards are converging on.",
      "",
      "**2. Decision Audit.** Every action an agent takes should be logged in an immutable audit trail. Not for compliance theater. For debugging. When an agent makes a wrong call, you need to replay the decision chain.",
      "",
      "**3. Kill Switch Architecture.** This is the one nobody wants to talk about. Every agent deployment needs a human-in-the-loop circuit breaker. Not a soft 'are you sure?' — a hard, cryptographically enforced stop.",
      "",
      "## Why This Matters for Muslim Builders",
      "",
      "Islamic finance has centuries of governance scholarship. The concept of Hisbah — market inspection and accountability — maps directly to agent governance. Muslim builders have a cultural intuition for trust layers that most Silicon Valley builders don't.",
      "",
      "This is our wedge. Build governance-first, and the market will follow.",
      "",
      "## The Signal",
      "",
      "Watch the intersection of agent frameworks and identity standards. The first company to ship a production-ready agent governance layer that's Sharia-compliant by default will have a decade-long moat in the Muslim-majority market.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(issueContent).map((slug) => ({ slug }));
}

export default function IssuePage({ params }: { params: { slug: string } }) {
  const issue = issueContent[params.slug];

  if (!issue) {
    return (
      <div style={{ padding: "160px 48px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 900, color: "var(--white)" }}>Issue not found</h1>
        <p style={{ color: "var(--muted)", marginTop: "16px" }}>
          <Link href="/archive" style={{ color: "var(--red)" }}>Back to archive</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "120px" }}>
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "0 48px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "24px", height: "1px", background: "var(--red)" }} />
            {issue.category}
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.1, color: "var(--white)", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            {issue.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {issue.date}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: "1px solid", color: "var(--red)", borderColor: "var(--red-border)" }}>
              {issue.tier}
            </span>
          </div>
        </div>

        {/* Premium Gate */}
        <div className="premium-blur" style={{ position: "relative", overflow: "hidden" }}>
          <div className="issue-content">
            {issue.content.map((para, i) => {
              if (para.startsWith("## ")) {
                return <h2 key={i}>{para.replace("## ", "")}</h2>;
              }
              if (para.startsWith("**") && para.endsWith("**")) {
                return <p key={i} style={{ fontWeight: 600, color: "var(--off-white)" }}>{para.replace(/\*\*/g, "")}</p>;
              }
              if (para === "") return <br key={i} />;
              return <p key={i}>{para}</p>;
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Link href="/archive" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
            ← Back to archive
          </Link>
          <Link href="/#subscribe" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>
            Get the Daily →
          </Link>
        </div>
      </article>
    </div>
  );
}
