"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            background: "#07080F",
            color: "#E8E9EF",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "system-ui, sans-serif",
            padding: "20px",
          }}
        >
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "36px" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#7A8299", marginTop: "12px" }}>
            The Lantern encountered an error.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "20px",
              background: "#D42535",
              color: "white",
              border: "none",
              padding: "12px 24px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
