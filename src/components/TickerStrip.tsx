"use client";

const tickerItems = [
  "Signal Before Consensus",
  "Issue #007",
  "Muslim-Built. AI-Native.",
  "Agent Governance Is the New Product Layer",
  "247 Operators",
  "03 Signals Today",
];

export default function TickerStrip() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker fixed top-[60px] left-0 right-0 z-[99] overflow-hidden"
      style={{
        background: "var(--red)",
        padding: "6px 0",
      }}
    >
      <div className="ticker-inner flex whitespace-nowrap"
        style={{
          animation: "ticker-scroll 30s linear infinite",
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="ticker-item font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-white/90 px-[40px]">
            {item}
            <span className="ticker-sep text-white/40 px-[8px]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
