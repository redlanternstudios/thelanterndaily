export default function QuoteCallout() {
  return (
    <div style={{
      background: "#0D0F1C",
      borderTop: "1px solid #1A1F2E",
      borderBottom: "1px solid #1A1F2E",
      padding: "56px 40px",
      maxWidth: 1400,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "75% 25%",
      gap: 40,
      alignItems: "center",
    }}>
      <div>
        <div style={{
          fontSize: 72,
          color: "#D42535",
          lineHeight: 0.8,
          marginBottom: 16,
        }}>
          "
        </div>
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: 26,
          fontStyle: "italic",
          color: "#9CA3AF",
          lineHeight: 1.5,
          margin: 0,
        }}>
          The next decade won't be defined by the smartest models, but by the strongest systems around them.
        </p>
      </div>
      <div style={{
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
        <div style={{
          color: "#D42535",
          fontSize: 14,
          fontWeight: 600,
        }}>
          — RedLantern Studios™
        </div>
        <div style={{
          color: "#F7F2EE",
          fontSize: 13,
        }}>
          Founder intelligence.
        </div>
        <div style={{
          color: "#9CA3AF",
          fontSize: 13,
        }}>
          Built for builders.
        </div>
      </div>
    </div>
  );
}
