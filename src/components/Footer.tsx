import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
      <div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "14px", fontWeight: 700, color: "var(--white)", marginBottom: "4px" }}>
          The Lantern Daily
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--dim)" }}>
          A RedLantern Studios™ Publication · By Red LLC
        </div>
      </div>

      <ul style={{ display: "flex", gap: "24px", listStyle: "none", flexWrap: "wrap" }}>
        <li><Link href="/archive" style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>Archive</Link></li>
        <li><Link href="/about" style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>About</Link></li>
        <li><Link href="/shorts" style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>Shorts</Link></li>
        <li><Link href="/privacy" style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>Privacy</Link></li>
      </ul>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dim)", textAlign: "right" }}>
        Muslim-Built. AI-Native.<br />
        &copy; 2026 By Red, LLC
      </div>
    </footer>
  );
}
