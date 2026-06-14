"use client";

import Link from "next/link";

const signals = [
  {
    number: "01",
    category: "AI Systems",
    title: "Why Every Serious Operator Is Building a Memory Layer Now",
    excerpt: "The difference between a demo and a product isn't the model. It's whether the system remembers what happened last time.",
    date: "Jun 12, 2026",
    tag: "Free",
    href: "/issues/memory-layer",
  },
  {
    number: "02",
    category: "Field Notes",
    title: "What the Alif Summit Said About Where Muslim Tech Is Going",
    excerpt: "Three patterns from the room that don't show up in the coverage but tell you everything about the next 24 months.",
    date: "Jun 11, 2026",
    tag: "Premium",
    href: "/issues/alif-summit",
  },
  {
    number: "03",
    category: "Operator Stack",
    title: "The Real Self-Hosted Stack: n8n on Railway, Supabase, and Why Make.com Doesn't Scale",
    excerpt: "What serious Muslim builders are actually running under the hood and why the cloud tax is the first thing to cut.",
    date: "Jun 10, 2026",
    tag: "Free",
    href: "/issues/self-hosted-stack",
  },
];

const topics = [
  { name: "AI Systems", count: "12 signals" },
  { name: "Governance", count: "8 signals" },
  { name: "Market Signal", count: "7 signals" },
  { name: "Field Notes", count: "6 signals" },
  { name: "Operator Stack", count: "5 signals" },
];

export default function SignalsSection() {
  return (
    <>
      <div
        id="signals"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px 48px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div className="section-line" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Recent Signals
          </span>
        </div>
        <Link
          href="/archive"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Full archive <span>→</span>
        </Link>
      </div>

      <div
        style={{
          padding: "0 48px 64px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "64px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Signal list */}
        <div>
          {signals.map((signal, i) => (
            <Link
              key={i}
              href={signal.href}
              style={{
                display: "flex",
                gap: "24px",
                padding: "24px 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--dim)", minWidth: "24px", paddingTop: "3px" }}>
                {signal.number}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red)", marginBottom: "6px" }}>
                  {signal.category}
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 600, lineHeight: 1.3, color: "var(--off-white)", marginBottom: "8px" }}>
                  {signal.title}
                </div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--muted)", marginBottom: "12px" }}>
                  {signal.excerpt}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", color: "var(--dim)", textTransform: "uppercase" }}>
                    {signal.date}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", padding: "2px 7px", border: "1px solid var(--border-bright)" }}>
                    {signal.tag}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ border: "1px solid var(--red-border)", background: "var(--red-dim)", padding: "24px", marginBottom: "24px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "12px" }}>
              Become an Operator
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "40px", fontWeight: 700, color: "var(--white)", lineHeight: 1, marginBottom: "8px" }}>
              #0248
            </div>
            <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
              Join 247 Muslim builders, founders, and operators getting signal before consensus.
            </div>
            <Link
              href="/#subscribe"
              style={{
                display: "block",
                marginTop: "16px",
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "11px 0",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Claim Your Number
            </Link>
          </div>

          <div style={{ border: "1px solid var(--border)", padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
              Intelligence by Category
            </div>
            {topics.map((topic, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: i < topics.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span style={{ fontSize: "12px", color: "var(--off-white)" }}>{topic.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--dim)" }}>{topic.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
