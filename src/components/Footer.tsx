import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #1E2028",
        background: "#07080D",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
          padding: "48px 0",
        }}
      >
        {/* Col 1: brand */}
        <div>
          <span
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontWeight: 800,
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            <span style={{ color: "#E8E6E1" }}>The </span>
            <span style={{ color: "#D92532" }}>Lantern</span>
            <span style={{ color: "#E8E6E1" }}> D</span>
            <span style={{ color: "#D92532" }}>AI</span>
            <span style={{ color: "#E8E6E1" }}>LY</span>
          </span>
          <p
            style={{
              marginTop: 16,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "#6B7280",
              lineHeight: 1.6,
              maxWidth: 260,
            }}
          >
            Muslim-built. AI-native. Signal over noise.
          </p>
        </div>

        {/* Col 2: Coverage */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: 16,
            }}
          >
            Coverage
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Stack", href: "/stack" },
              { label: "Archive", href: "/archive" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", textDecoration: "none" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Company */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: 16,
            }}
          >
            Company
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ label: "About", href: "/about" }].map((l) => (
              <li key={l.label}>
                <Link href={l.href} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", textDecoration: "none" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Legal */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: 16,
            }}
          >
            Legal
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Affiliate Disclosure", href: "/privacy#affiliate" },
              { label: "Halal Standards", href: "/about#standards" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", textDecoration: "none" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          borderTop: "1px solid #1E2028",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            color: "#6B7280",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 By Red, LLC · thelanterndaily.com
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            color: "#6B7280",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Build in Public. Operate in Truth.
        </span>
      </div>
    </footer>
  );
}
