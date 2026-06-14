"use client";

import Link from "next/link";

const wallCards = [
  {
    href: "/issues/memory-agents-architecture",
    imgClass: "atmo-3",
    category: "AI Systems",
    title: "Memory, Agents, Architecture",
    issue: "Signal #012",
    tier: "Free",
    tierClass: "tier-free",
  },
  {
    href: "/issues/what-operators-ship",
    imgClass: "atmo-2",
    category: "Product Calls",
    title: "What Operators Are Actually Shipping",
    issue: "Signal #009",
    tier: "Premium",
    tierClass: "tier-premium",
  },
  {
    href: "/issues/operator-stack-tools",
    imgClass: "atmo-4",
    category: "Operator Stack",
    title: "Tools the Serious Builders Use",
    issue: "Signal #011",
    tier: "Free",
    tierClass: "tier-free",
  },
  {
    href: "/issues/field-notes-muslim-tech",
    imgClass: "atmo-5",
    category: "Field Notes",
    title: "From the Ground in Muslim Tech",
    issue: "Signal #008",
    tier: "Free",
    tierClass: "tier-free",
  },
  {
    href: "/issues/governance-control-layer",
    imgClass: "atmo-2",
    category: "Governance",
    title: "Who Controls the Control Layer",
    issue: "Signal #010",
    tier: "Premium",
    tierClass: "tier-premium",
  },
  {
    href: "/issues/halal-finance-ai",
    imgClass: "atmo-3",
    category: "Market Signal",
    title: "Halal Finance Meets AI Infrastructure",
    issue: "Signal #007",
    tier: "Premium",
    tierClass: "tier-premium",
  },
];

export default function IntelligenceWall() {
  return (
    <>
      <div
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
            Live Intelligence Wall
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
          View all signals <span>→</span>
        </Link>
      </div>

      <div style={{ padding: "0 48px 64px", borderBottom: "1px solid var(--border)" }}>
        <div className="lantern-grid">
          {wallCards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              style={{
                position: "relative",
                overflow: "hidden",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s",
              }}
            >
              <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <div className={card.imgClass} style={{ width: "100%", height: "100%", transition: "transform 0.5s ease", position: "relative" }} />
                <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", gap: "4px", zIndex: 2 }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--red)", opacity: 0.8 }} />
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--red)", opacity: 0.4 }} />
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--red)", opacity: 0.2 }} />
                </div>
              </div>
              <div style={{ padding: "20px", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "1px", background: "var(--red)" }} />
                  {card.category}
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 700, lineHeight: 1.3, color: "var(--off-white)", marginBottom: "8px" }}>
                  {card.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", color: "var(--dim)", textTransform: "uppercase" }}>
                    {card.issue}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "8px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 7px",
                      border: "1px solid",
                      color: card.tier === "Premium" ? "var(--red)" : "var(--muted)",
                      borderColor: card.tier === "Premium" ? "var(--red-border)" : "var(--dim)",
                    }}
                  >
                    {card.tier}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
