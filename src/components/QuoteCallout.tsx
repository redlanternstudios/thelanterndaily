export default function QuoteCallout() {
  return (
    <div style={{
      background: "#f0ede8",
      borderTop: "1px solid #e5e0d8",
      borderBottom: "1px solid #e5e0d8",
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
          color: "#b91c1c",
          lineHeight: 0.8,
          marginBottom: 16,
        }}>
          "
        </div>
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: 26,
          fontStyle: "italic",
          color: "#1a1a1a",
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
          color: "#D92532",
          fontSize: 14,
          fontWeight: 600,
        }}>
          — RedLantern Studios™
        </div>
        <div style={{
          color: "#F4F4F5",
          fontSize: 13,
        }}>
          Founder intelligence.
        </div>
        <div style={{
          color: "#71717A",
          fontSize: 13,
        }}>
          Built for builders.
        </div>
      </div>
    </div>
  );
}
