"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Today", href: "/" },
  { label: "Stack", href: "/stack" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
];

function Logo() {
  return (
    <Link href="/" style={{ textDecoration: "none" }} aria-label="The Lantern Daily — home">
      <span
        style={{
          fontFamily: "Playfair Display, Georgia, serif",
          fontWeight: 800,
          fontSize: 28,
          lineHeight: 1,
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ color: "#9CA3AF" }}>The </span>
        <span style={{ color: "#9CA3AF", marginRight: "6px" }}>Lantern</span>
        <span style={{ color: "#9CA3AF" }}>D</span>
        <span style={{ color: "#D42535" }}>AI</span>
        <span style={{ color: "#9CA3AF" }}>LY</span>
      </span>
    </Link>
  );
}

export default function Masthead() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background: "#07080D",
        borderBottom: "1px solid #1E2028",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: 64,
        }}
      >
        <Logo />

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 13,
                color: "#9CA3AF",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#subscribe"
            style={{
              background: "#D42535",
              color: "#ffffff",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "8px 20px",
              borderRadius: 0,
              textDecoration: "none",
            }}
          >
            Join the Lantern
          </Link>
        </nav>
      </div>
    </header>
  );
}
