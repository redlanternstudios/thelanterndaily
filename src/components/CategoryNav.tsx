"use client";

import Link from "next/link";

export default function CategoryNav() {
  const categories = [
    "AI INFRASTRUCTURE",
    "ISLAMIC FINANCE",
    "OPEN SOURCE AGENTS",
    "OPERATOR STACK",
    "MUSLIM DEEP TECH",
    "FIELD NOTES",
    "MARKET SIGNALS",
    "FOUNDER INTELLIGENCE",
    "GOVERNANCE",
    "PRODUCT CALLS",
  ];

  return (
    <div style={{
      background: "#0D0F1C",
      borderBottom: "1px solid #1A1F2E",
      overflowX: "auto",
      paddingLeft: 24,
      paddingRight: 24,
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        gap: 24,
        padding: "12px 0",
      }}>
        {categories.map((cat, i) => (
          <span key={cat} style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            whiteSpace: "nowrap",
          }}>
            {cat}
            {i < categories.length - 1 && <span style={{ marginLeft: 24, color: "#1A1F2E" }}>•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
