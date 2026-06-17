"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <nav style={{
      background: "#09090B",
      borderBottom: "1px solid #1F1F23",
      padding: "16px 24px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "flex", gap: 4, alignItems: "baseline" }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 600, color: "#F4F4F5" }}>
              The Lantern
            </span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 600, color: "#D92532" }}>
              DAILY
            </span>
          </div>
          <span style={{ fontSize: 10, color: "#71717A", fontWeight: 500 }}>
            by RedLantern Studios™
          </span>
        </Link>

        {/* Center Nav Links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {["Today", "AI", "Markets", "Tech", "Stack", "Archive", "About"].map((link) => (
            <Link
              key={link}
              href={link === "Today" ? "/" : `/${link.toLowerCase()}`}
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#71717A",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F4F4F5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#71717A")}
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Right: Search + Button */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button style={{
            background: "none",
            border: "none",
            color: "#71717A",
            fontSize: 16,
            cursor: "pointer",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F4F4F5")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#71717A")}
          >
            🔍
          </button>
          <button style={{
            background: "#D92532",
            color: "#F4F4F5",
            border: "none",
            padding: "8px 16px",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Join / Subscribe
          </button>
        </div>
      </div>
    </nav>
  );
}
