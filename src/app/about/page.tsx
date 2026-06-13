import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 48px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div className="section-line" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            About
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.1, color: "var(--white)", marginBottom: "24px" }}>
          The Lantern Daily
        </h1>

        <div className="issue-content">
          <p>
            The Lantern Daily is the intelligence brief for serious Muslim operators, founders, and builders in AI and halal tech.
          </p>
          <p>
            We filter the noise so you don't have to. Every day, we surface the signals that matter — in AI systems, governance, market trends, and the operator stack — and deliver them in a format you can read in under 5 minutes.
          </p>

          <h2>Why "The Lantern"?</h2>
          <p>
            "Allah is the Light of the heavens and the earth." (Quran 24:35). The lantern is a symbol of guidance, clarity, and illumination. In a world drowning in information, we aim to be the light that cuts through the fog.
          </p>

          <h2>Who It's For</h2>
          <p>
            Muslim founders building AI products. Operators running engineering teams. Builders choosing stacks. Investors looking for the next signal. Anyone who needs intelligence — not content — to make better decisions.
          </p>

          <h2>The Team</h2>
          <p>
            Published by <strong>RedLantern Studios™</strong>, a division of By Red, LLC. We're a distributed team of Muslim builders, engineers, and operators who believe the next generation of great technology companies will be built by people who combine technical excellence with deep values.
          </p>

          <div style={{ padding: "32px", border: "1px solid var(--border)", background: "var(--bg-card)", margin: "32px 0" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red)", marginBottom: "12px" }}>
              Signal Before Consensus
            </p>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--muted)", marginBottom: "20px" }}>
              Join 247+ Muslim operators who start their day with the signal.
            </p>
            <Link
              href="/#subscribe"
              style={{
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "12px 24px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Subscribe Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
