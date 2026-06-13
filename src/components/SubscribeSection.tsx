"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.operator_number) {
        const num = String(data.operator_number).padStart(4, "0");
        router.push(`/confirmed?operator=${num}`);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="subscribe" className="scroll-mt-24" style={{ padding: "80px 48px", textAlign: "center", position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(212,37,53,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div className="subscribe-eyebrow" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "20px" }}>
        Signal Before Consensus
      </div>

      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, color: "var(--white)", lineHeight: 1.1, marginBottom: "16px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
        Built for the operators who don&apos;t wait for permission.
      </h2>

      <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto 36px" }}>
        The Lantern Daily is the intelligence brief for Muslim founders, builders, and operators in AI and halal tech. Free to start. Serious when you&apos;re ready.
      </p>

      <form onSubmit={handleSubmit} className="subscribe-form-large" style={{ display: "flex", justifyContent: "center", maxWidth: "480px", margin: "0 auto" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border-bright)",
            borderRight: "none",
            color: "var(--white)",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            padding: "15px 20px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "var(--red)",
            color: "var(--white)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "15px 28px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Joining..." : "Get the Daily"}
        </button>
      </form>

      {error && <p style={{ color: "var(--red)", fontSize: "13px", marginTop: "12px" }}>{error}</p>}

      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dim)", marginTop: "16px" }}>
        Free · No spam · Unsubscribe anytime · Operator number assigned on join
      </div>
    </section>
  );
}
