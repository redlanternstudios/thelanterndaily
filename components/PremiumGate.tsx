"use client";

import { SubscribeForm } from "@/components/SubscribeForm";

interface PremiumGateProps {
  previewHtml: string;
  /** Number of chars to show before the gate — default 600 */
  previewLength?: number;
}

export function PremiumGate({ previewHtml, previewLength = 600 }: PremiumGateProps) {
  // Extract a text preview from the HTML (strip tags for char count)
  const textPreview = previewHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const isLong = textPreview.length > previewLength;
  const previewText = isLong ? textPreview.slice(0, previewLength) + "…" : textPreview;

  return (
    <div>
      {/* Preview paragraph */}
      <p
        style={{
          fontSize: "19px",
          lineHeight: 1.8,
          color: "var(--off)",
          marginBottom: "28px",
          fontFamily: "Georgia, serif",
        }}
      >
        {previewText}
      </p>

      {/* Gate overlay */}
      <div
        style={{
          position: "relative",
          marginTop: "32px",
        }}
      >
        {/* Blur fade */}
        <div
          style={{
            height: "120px",
            background: "linear-gradient(to bottom, transparent, var(--bg))",
            marginBottom: "-1px",
          }}
        />

        {/* Gate card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid #C9A84C",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontFamily: "Space Mono, monospace",
              color: "#C9A84C",
              letterSpacing: "0.2em",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            PREMIUM INTELLIGENCE
          </div>
          <h3
            style={{
              fontSize: "24px",
              marginBottom: "12px",
              fontFamily: "Georgia, serif",
            }}
          >
            Unlock Full Intelligence
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              marginBottom: "28px",
              maxWidth: "400px",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            This piece is available to Lantern premium members. Join free, then
            upgrade for full access to premium analysis, deep-dives, and the
            complete operator stack reports.
          </p>

          {/* Pricing row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginBottom: "28px",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Monthly", price: "$9.99/mo" },
              { label: "Annual", price: "$99.99/yr" },
              { label: "Lifetime", price: "$199.99" },
            ].map((tier) => (
              <div
                key={tier.label}
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  color: "var(--muted)",
                }}
              >
                <span style={{ color: "var(--off)", fontWeight: 700 }}>{tier.price}</span>
                {" "}
                <span style={{ color: "var(--dim)" }}>{tier.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/subscribe"
            className="join-button"
            style={{
              display: "inline-block",
              marginBottom: "20px",
              background: "#C9A84C",
              color: "#07080D",
            }}
          >
            Unlock Full Intelligence →
          </a>

          {/* Free subscribe option */}
          <p
            style={{
              fontSize: "12px",
              color: "var(--dim)",
              marginBottom: "16px",
              fontFamily: "Space Mono, monospace",
            }}
          >
            Or join free for weekly signals:
          </p>
          <div style={{ maxWidth: "360px", margin: "0 auto" }}>
            <SubscribeForm variant="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
