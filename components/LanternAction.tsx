/**
 * LanternAction — "Take Action" block rendered at the bottom of every article.
 *
 * Shows 2-3 specific, concrete steps the reader can take after reading.
 * These are topic-locked to the article — not generic CTAs.
 *
 * Usage:
 *   <LanternAction steps={article.action_steps} />
 */

interface LanternActionProps {
  steps: string[];
}

export function LanternAction({ steps }: LanternActionProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div
      style={{
        marginTop: "48px",
        padding: "28px 32px",
        background: "var(--surface)",
        borderTop: "3px solid var(--red)",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        border: "1px solid var(--border)",
        borderTopColor: "var(--red)",
        borderTopWidth: "3px",
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "var(--red)",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        TAKE ACTION · THIS WEEK
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr",
              gap: "16px",
              alignItems: "start",
            }}
          >
            {/* Step number */}
            <div
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--red)",
                paddingTop: "2px",
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Step text */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "var(--muted)",
                margin: 0,
              }}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
