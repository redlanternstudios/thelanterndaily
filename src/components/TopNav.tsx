"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or handle search
      console.log("[v0] Search query:", searchQuery);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

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
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#9CA3AF", letterSpacing: "-0.01em", marginRight: "6px" }}>
              Lantern
            </span>
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 800, color: "#9CA3AF", letterSpacing: "-0.01em" }}>
              D
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
          {searchOpen && (
            <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  background: "#0D0F1C",
                  border: "1px solid #1A1F2E",
                  borderRadius: 4,
                  padding: "8px 12px",
                  color: "#9CA3AF",
                  fontSize: 14,
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color 0.2s",
                  width: "200px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#D42535";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#1A1F2E";
                  if (!searchQuery.trim()) {
                    setSearchOpen(false);
                  }
                }}
              />
              <button type="submit" style={{
                background: "none",
                border: "none",
                color: "#D42535",
                fontSize: 16,
                cursor: "pointer",
              }}>
                🔍
              </button>
            </form>
          )}
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#9CA3AF",
              fontSize: 16,
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F7F2EE")}
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
