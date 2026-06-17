"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <nav style={{
      background: "#faf8f5",
      borderBottom: "1px solid #e5e0d8",
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
        <Link href="/" style={{ display: "flex", flexDirection: "column", gap: 2, textDecoration: "none" }}>
          <div style={{ display: "flex", gap: 0, alignItems: "baseline" }}>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.01em" }}>
              The Lantern 
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#b91c1c", letterSpacing: "-0.01em" }}>
              D
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.01em" }}>
              AI
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#b91c1c", letterSpacing: "-0.01em" }}>
              LY
            </span>
          </div>
          <span style={{ fontSize: 10, color: "#6b6b6b", fontWeight: 500, letterSpacing: "0.05em" }}>
            by <span style={{ color: "#b91c1c" }}>Red</span>Lantern Studios™
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
                color: "#6b6b6b",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
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
            color: "#6b6b6b",
            fontSize: 16,
            cursor: "pointer",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
          >
            🔍
          </button>
          <button style={{
            background: "#b91c1c",
            color: "#ffffff",
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
