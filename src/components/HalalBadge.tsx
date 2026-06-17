"use client";

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type HalalVerdict = "positive" | "critical" | "blocked" | "nuanced";

export interface HalalReview {
  verdict: HalalVerdict;
  editorialNote?: string; // appears as the Islamic Lens block on article pages
}

// ─── Verdict config ───────────────────────────────────────────────────────────

const VERDICTS: Record<
  HalalVerdict,
  { icon: string; label: string; bg: string; color: string }
> = {
  positive: {
    icon: "✓",
    label: "HALAL-ALIGNED",
    bg: "#0D2B1A",
    color: "#3DBA72",
  },
  critical: {
    icon: "⚠",
    label: "CRITICAL",
    bg: "#2B1E09",
    color: "#D4922A",
  },
  blocked: {
    icon: "✗",
    label: "BLOCKED",
    bg: "#2B0A0D",
    color: "#E8E6E1",
  },
  nuanced: {
    icon: "◈",
    label: "NUANCED",
    bg: "#15171F",
    color: "#8B95B0",
  },
};

// ─── HalalBadge ───────────────────────────────────────────────────────────────

export function HalalBadge({
  verdict,
  size = "sm",
}: {
  verdict: HalalVerdict;
  size?: "sm" | "md";
}) {
  const cfg = VERDICTS[verdict];
  const isBlocked = verdict === "blocked";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: isBlocked ? "#D92532" : cfg.bg,
        color: cfg.color,
        fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
        fontSize: size === "sm" ? 10 : 12,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: size === "sm" ? "3px 8px" : "5px 12px",
        borderRadius: 3,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden="true">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

// ─── EditorialNote (Islamic Lens block) ───────────────────────────────────────

export function EditorialNote({ text }: { text: string }) {
  return (
    <div
      style={{
        borderLeft: "3px solid #D92532",
        paddingLeft: 20,
        margin: "32px 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#D92532",
          marginBottom: 10,
        }}
      >
        ISLAMIC LENS
      </div>
      <p
        style={{
          fontStyle: "italic",
          color: "#E8E6E1",
          fontSize: 15,
          lineHeight: 1.7,
          margin: 0,
          fontFamily: "var(--font-body), Inter, sans-serif",
        }}
      >
        {text}
      </p>
    </div>
  );
}

// ─── BadgeLegendStrip ─────────────────────────────────────────────────────────

const LEGEND: Array<{ verdict: HalalVerdict; description: string }> = [
  {
    verdict: "positive",
    description: "Delivers genuine benefit; no prohibited mechanisms found",
  },
  {
    verdict: "critical",
    description: "Contains design patterns that conflict with Islamic ethics",
  },
  {
    verdict: "blocked",
    description:
      "Contains riba, maysir, or gharar — hard prohibitions under all major madhabs",
  },
  {
    verdict: "nuanced",
    description: "Active scholarly disagreement; editorial analysis provided",
  },
];

export function BadgeLegendStrip() {
  return (
    <div
      style={{
        background: "#0F1117",
        borderTop: "1px solid #1E2028",
        borderBottom: "1px solid #1E2028",
        padding: "14px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px 32px",
        }}
      >
        {LEGEND.map(({ verdict, description }) => (
          <div
            key={verdict}
            style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
          >
            <HalalBadge verdict={verdict} size="sm" />
            <span
              style={{
                fontFamily: "var(--font-body), Inter, sans-serif",
                fontSize: 12,
                color: "#6B7280",
                lineHeight: 1.5,
                paddingTop: 1,
              }}
            >
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
