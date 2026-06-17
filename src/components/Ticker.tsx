import { TICKER_ITEMS } from "@/lib/content";

const tickerString =
  TICKER_ITEMS.map((item) => `${item}  ·  `).join("") +
  TICKER_ITEMS.map((item) => `${item}  ·  `).join("");

export default function Ticker() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderBottom: "1px solid #1E2028",
        padding: "8px 0",
        background: "#07080D",
      }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <span
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "marquee 40s linear infinite",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 10,
          color: "#6B7280",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {tickerString}
      </span>
    </div>
  );
}
