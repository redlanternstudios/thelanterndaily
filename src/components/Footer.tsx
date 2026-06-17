"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#07080F",
      borderTop: "1px solid #1A1F2E",
      padding: "48px 24px 32px",
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 48,
        marginBottom: 40,
      }}>
        {/* Col 1: Brand + Tagline */}
        <div>
          <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "flex", gap: 4, alignItems: "baseline", marginBottom: 12 }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 600, color: "#9CA3AF" }}>
                The Lantern
              </span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 600, color: "#D42535" }}>
                DAILY
              </span>
            </div>
          </Link>
          <p style={{
            fontSize: 12,
            color: "#9CA3AF",
            lineHeight: 1.6,
            margin: 0,
          }}>
            Intelligence for builders. Signal for operators. Built for the long game.
          </p>
        </div>

        {/* Col 2: Sections */}
        <div>
          <h3 style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            margin: "0 0 16px 0",
          }}>
            SECTIONS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["AI", "Reports", "Markets", "Tech", "Stack"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                style={{
                  fontSize: 13,
                  color: "#9CA3AF",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Resources */}
        <div>
          <h3 style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            margin: "0 0 16px 0",
          }}>
            RESOURCES
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Archive", "Advertise", "Field Notes", "Market Signals", "Contact"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(" ", "-")}`}
                style={{
                  fontSize: 13,
                  color: "#9CA3AF",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Company */}
        <div>
          <h3 style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            margin: "0 0 16px 0",
          }}>
            COMPANY
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["About", "Careers", "Terms", "Privacy"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                style={{
                  fontSize: 13,
                  color: "#9CA3AF",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{
        borderTop: "1px solid #1A1F2E",
        paddingTop: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <p style={{
          fontSize: 11,
          color: "#9CA3AF",
          margin: 0,
        }}>
          © 2025 RedLantern Studios™ · All rights reserved.
        </p>
        <div style={{
          display: "flex",
          gap: 16,
        }}>
          {[
            { label: "X", href: "https://x.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "YouTube", href: "https://youtube.com" },
            { label: "Email", href: "mailto:hello@thelanterndaily.com" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              style={{
                color: "#9CA3AF",
                fontSize: 16,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            >
              {social.label === "X" ? "𝕏" : social.label === "Email" ? "✉" : social.label === "YouTube" ? "▶" : "in"}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
