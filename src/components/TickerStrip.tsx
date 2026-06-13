"use client";

const tickerItems = [
  "🤖 AI agents are reshaping enterprise workflows",
  "📊 Markets calm as Fed holds rates steady",
  "🌍 Geopolitical tensions drive energy policy shifts",
  "⚡ The future of work: distributed teams, AI copilots",
  "🧬 Breakthrough in quantum computing announced",
  "🏮 The Lantern Daily — Signal Before Consensus",
  "📡 AI-curated intelligence for the signal-driven reader",
  "💡 DeepSeek R1 sets new SOTA on reasoning benchmarks",
  "🔮 How to think about AGI timelines in 2026",
  "📈 Crypto volatility signals regime change ahead",
];

export default function TickerStrip() {
  return (
    <div className="w-full overflow-hidden bg-[var(--color-ticker-bg)] py-3 mt-16">
      <div className="ticker-track flex whitespace-nowrap">
        {/* First track */}
        <div className="flex shrink-0 items-center gap-12 px-6">
          {tickerItems.map((item, i) => (
            <span
              key={`a-${i}`}
              className="mono text-sm text-[var(--color-ticker-text)] tracking-wide"
            >
              {item}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center gap-12 px-6">
          {tickerItems.map((item, i) => (
            <span
              key={`b-${i}`}
              className="mono text-sm text-[var(--color-ticker-text)] tracking-wide"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
