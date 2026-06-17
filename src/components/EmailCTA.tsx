"use client";

export default function EmailCTA() {
  return (
    <div style={{
      background: "#111113",
      borderTop: "1px solid #1F1F23",
      padding: "56px 40px",
      maxWidth: 1400,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      alignItems: "center",
    }}>
      <div>
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: 28,
          color: "#F4F4F5",
          margin: "0 0 8px 0",
        }}>
          Stay ahead with signal, not noise.
        </h2>
        <p style={{
          fontSize: 14,
          color: "#71717A",
          margin: "0 0 24px 0",
          lineHeight: 1.6,
        }}>
          Daily insights on AI, markets, and the operator stack—delivered straight to your inbox.
        </p>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "flex-end",
      }}>
        <div style={{
          display: "flex",
          gap: 0,
        }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: 13,
              background: "#1F1F23",
              border: "1px solid #1F1F23",
              color: "#F4F4F5",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button style={{
            background: "#D92532",
            color: "#F4F4F5",
            border: "none",
            padding: "12px 24px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Join The Lantern
          </button>
        </div>
        <p style={{
          fontSize: 11,
          color: "#71717A",
          margin: 0,
        }}>
          Join 18,472+ builders, investors, and operators.
        </p>
      </div>
    </div>
  );
}
