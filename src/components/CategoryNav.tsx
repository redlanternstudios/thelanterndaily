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
      background: "#111113",
      borderBottom: "1px solid #1F1F23",
      overflowX: "auto",
      padding: "10px 0",
      whiteSpace: "nowrap",
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        gap: 24,
      }}>
        {categories.map((cat, idx) => (
          <Link
            key={cat}
            href={`/archive?cat=${cat.replace(/\s+/g, "-").toLowerCase()}`}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#71717A",
              transition: "color 0.2s",
              textDecoration: "none",
              borderBottom: "2px solid transparent",
              paddingBottom: 2,
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#D92532";
              e.currentTarget.style.borderBottomColor = "#D92532";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#71717A";
              e.currentTarget.style.borderBottomColor = "transparent";
            }}
          >
            {cat}
            {idx < categories.length - 1 && <span style={{ color: "#1F1F23", marginLeft: 24 }}>|</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
