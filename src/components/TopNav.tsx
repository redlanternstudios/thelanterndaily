"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
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
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {/* Expanding input — animates open/closed */}
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
              style={{
                background: "#0D0F1C",
                border: "1px solid #1A1F2E",
                borderRight: "none",
                borderRadius: "4px 0 0 4px",
                padding: searchOpen ? "7px 12px" : "7px 0",
                color: "#F7F2EE",
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                width: searchOpen ? "220px" : "0px",
                overflow: "hidden",
                opacity: searchOpen ? 1 : 0,
                transition: "width 0.25s ease, opacity 0.2s ease, padding 0.2s ease",
                pointerEvents: searchOpen ? "auto" : "none",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#D42535"; }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#1A1F2E";
                if (!searchQuery.trim()) setSearchOpen(false);
              }}
            />
            {/* Search icon button — toggles open, submits when open */}
            <button
              type={searchOpen ? "submit" : "button"}
              onClick={() => { if (!searchOpen) setSearchOpen(true); }}
              aria-label={searchOpen ? "Submit search" : "Open search"}
              style={{
                background: searchOpen ? "#D42535" : "none",
                border: searchOpen ? "1px solid #D42535" : "none",
                borderRadius: searchOpen ? "0 4px 4px 0" : "4px",
                padding: "7px 10px",
                color: searchOpen ? "#ffffff" : "#9CA3AF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { if (!searchOpen) (e.currentTarget as HTMLButtonElement).style.color = "#F7F2EE"; }}
              onMouseLeave={(e) => { if (!searchOpen) (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
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
