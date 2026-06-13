import Link from "next/link";

const shorts = [
  { title: "The Hisbah Principle in AI Governance", excerpt: "How classical Islamic market governance maps directly to modern agent oversight frameworks.", date: "Jun 12" },
  { title: "Why Supabase RLS Is Underrated", excerpt: "Row Level Security is the most underappreciated feature in the modern stack. Here's why.", date: "Jun 11" },
  { title: "Vibe Coding Is Not a Strategy", excerpt: "AI-assisted development is a force multiplier. But if you can't read the output, you don't own the outcome.", date: "Jun 10" },
  { title: "The Halal Cloud Question", excerpt: "Can we build cloud infrastructure that respects Islamic data principles? The answer is yes, and it's happening.", date: "Jun 9" },
  { title: "Operator Number Culture", excerpt: "Why assigning operator numbers creates belonging and accountability in a distributed community.", date: "Jun 8" },
];

export default function ShortsPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div style={{ padding: "40px 48px 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div className="section-line" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Shorts
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>
          Quick Hits
        </h1>
        <p style={{ fontSize: "15px", color: "var(--muted)", marginTop: "12px", maxWidth: "500px" }}>
          Bite-sized insights, observations, and patterns from the team. Reads in under 60 seconds.
        </p>
      </div>

      <div style={{ padding: "40px 48px 80px" }}>
        {shorts.map((s, i) => (
          <div key={i} style={{
            padding: "24px 0",
            borderBottom: i < shorts.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 600, lineHeight: 1.3, color: "var(--off-white)", marginBottom: "8px" }}>
                  {s.title}
                </h2>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--muted)" }}>
                  {s.excerpt}
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", paddingTop: "4px" }}>
                {s.date}
              </span>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <Link
            href="/#subscribe"
            style={{
              background: "var(--red)",
              color: "var(--white)",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "12px 28px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Get Shorts in Your Inbox
          </Link>
        </div>
      </div>
    </div>
  );
}
