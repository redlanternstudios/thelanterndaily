"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        padding: "80px 48px 64px",
        borderBottom: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 60% 50%, rgba(212,37,53,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(30,20,80,0.15) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Left column */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--red)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ width: "24px", height: "1px", background: "var(--red)" }} />
          Muslim-Built. AI-Native.
        </div>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 900,
            lineHeight: 1.0,
            color: "var(--white)",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          Signal<br />
          <em style={{ fontStyle: "italic", color: "var(--off-white)" }}>before</em><br />
          consensus.
        </h1>

        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "440px",
            marginBottom: "36px",
          }}
        >
          The daily intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", gap: 0 }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="subscribe-input"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-bright)",
                borderRight: "none",
                color: "var(--white)",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                padding: "13px 20px",
                width: "260px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "13px 24px",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Join the Daily
            </button>
          </form>

          <Link
            href="#signals"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Today&apos;s signal <span>→</span>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "40px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 700, color: "var(--white)", lineHeight: 1, marginBottom: "4px" }}>
              <span style={{ color: "var(--red)" }}>247</span>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>
              Operators
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 700, color: "var(--white)", lineHeight: 1, marginBottom: "4px" }}>
              07
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>
              Signals
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 700, color: "var(--white)", lineHeight: 1, marginBottom: "4px" }}>
              01
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>
              Brief
            </div>
          </div>
        </div>
      </div>

      {/* Right column — Feature card */}
      <div>
        <div
          style={{
            position: "relative",
            border: "1px solid var(--border-bright)",
            overflow: "hidden",
            transition: "border-color 0.3s",
          }}
        >
          <div style={{ height: "280px", position: "relative", overflow: "hidden" }}>
            <div
              className="feature-img-inner"
              style={{
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle at 30% 40%, rgba(212,37,53,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(50,30,100,0.4) 0%, transparent 40%), linear-gradient(135deg, #0A0818 0%, #1A1040 30%, #0F0820 60%, #080510 100%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "var(--red)",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--white)",
                padding: "5px 10px",
                zIndex: 2,
              }}
            >
              Today&apos;s Lead
            </span>
          </div>
          <div style={{ padding: "28px", background: "var(--bg-card)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "10px" }}>
              AI Governance · Signal
            </div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 700, lineHeight: 1.3, color: "var(--white)", marginBottom: "10px" }}>
              Agent Governance Is the New Product Layer
            </h3>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--muted)", marginBottom: "20px" }}>
              The teams that build governance infrastructure now will own the trust layer that determines which AI products survive the next 18 months.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "var(--dim)", textTransform: "uppercase" }}>
                Jun 13 · Issue #007
              </span>
              <Link
                href="/issues/agent-governance"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--red)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Read signal <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
