"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function ConfirmedContent() {
  const searchParams = useSearchParams();
  const operator = searchParams.get("operator") || "0000";

  const shareText = `I just became Operator #${operator} at The Lantern — the Muslim tech brief. Join: thelanterndaily.com`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "The Lantern Daily", text: shareText, url: "https://thelanterndaily.com" });
      } catch {
        await navigator.clipboard.writeText(shareText);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
      } catch {
        // fallback
      }
    }
  };

  return (
    <div style={{ paddingTop: "120px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 48px 80px", textAlign: "center" }}>
        <div className="operator-reveal">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "24px" }}>
            You Are Operator
          </div>
          <div style={{ fontSize: "clamp(64px, 10vw, 120px)", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--white)", lineHeight: 1, marginBottom: "16px", letterSpacing: "-0.03em" }}>
            #{operator}
          </div>
          <p style={{ fontSize: "18px", color: "var(--off-white)", fontFamily: "var(--font-serif)", marginBottom: "12px" }}>
            Welcome to The Lantern.
          </p>
          <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "32px" }}>
            Your signal is confirmed.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <button
            onClick={handleShare}
            style={{
              background: "var(--red)",
              color: "var(--white)",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "14px 32px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Share Your Number
          </button>

          <div style={{ marginTop: "24px", padding: "24px", border: "1px solid var(--red-border)", background: "var(--red-dim)", width: "100%" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 700, color: "var(--white)", marginBottom: "8px" }}>
              Unlock the Weekly Brief
            </div>
            <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5, marginBottom: "16px" }}>
              Premium subscribers get the full Weekly Brief, all signals, and the intelligence archive.
            </p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "22px", fontWeight: 700, color: "var(--white)", marginBottom: "12px" }}>
              $15 <span style={{ fontSize: "12px", color: "var(--muted)" }}>/ month</span>
            </div>
            <Link
              href="/#subscribe"
              style={{
                display: "block",
                width: "100%",
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "12px 0",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Upgrade Now
            </Link>
          </div>

          <Link
            href="/"
            style={{
              marginTop: "16px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            ← Back to Today&rsquo;s Signal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: "160px", textAlign: "center", color: "var(--muted)" }}>Loading...</div>}>
      <ConfirmedContent />
    </Suspense>
  );
}
