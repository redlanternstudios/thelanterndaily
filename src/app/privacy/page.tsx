export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 48px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div className="section-line" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Privacy
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "var(--white)", marginBottom: "24px" }}>
          Privacy Policy
        </h1>
        <div className="issue-content">
          <p><strong>Last updated:</strong> June 13, 2026</p>

          <h2>What We Collect</h2>
          <p>When you subscribe to The Lantern Daily, we collect your email address and assign you an operator number. That's it.</p>

          <h2>How We Use It</h2>
          <p>We send you the daily brief. We may occasionally send you product updates related to The Lantern Daily. We will never sell your email address.</p>

          <h2>Data Storage</h2>
          <p>Your data is stored in Supabase, hosted in US-based data centers. We use industry-standard encryption for data in transit and at rest.</p>

          <h2>Your Rights</h2>
          <p>You can unsubscribe at any time using the link at the bottom of any email. To request deletion of your data, email privacy@redlantern.studio.</p>

          <h2>Contact</h2>
          <p>By Red, LLC · privacy@redlantern.studio</p>
        </div>
      </div>
    </div>
  );
}
