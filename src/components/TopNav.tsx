"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <nav style={{
      background: "#07080F",
      borderBottom: "1px solid #1A1F2E",
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
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#9CA3AF", letterSpacing: "-0.01em" }}>
              The 
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#9CA3AF", letterSpacing: "-0.01em" }}>
              Lantern
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#9CA3AF", letterSpacing: "-0.01em" }}>
              {" "}D
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#D42535", letterSpacing: "-0.01em" }}>
              AI
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#9CA3AF", letterSpacing: "-0.01em" }}>
              LY
            </span>
          </div>
          <span style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500, letterSpacing: "0.05em" }}>
            by <span style={{ color: "#D42535" }}>Red</span>Lantern Studios™
          </span>
        </Link>

        {/* Center Nav Links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {["Today", "Markets", "Stack", "Archive", "About"].map((link) => (
            <Link
              key={link}
              href={link === "Today" ? "/" : `/${link.toLowerCase()}`}
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9CA3AF",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
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
            color: "#9CA3AF",
            fontSize: 16,
            cursor: "pointer",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
          >
            🔍
          </button>
          <Link 
            href="/#subscribe"
            style={{
              background: "#D42535",
              color: "#ffffff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Join / Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}
