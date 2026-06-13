"use client";

<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";

export default function TickerStrip() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Mock: simulate fetching operator count
    const fetchCount = async () => {
      try {
        // In production, this would call Supabase:
        // const { count } = await supabase.from('lantern_operators').select('*', { count: 'exact', head: true })
        await new Promise((r) => setTimeout(r, 500));
        setCount(Math.floor(Math.random() * 500) + 1200);
      } catch {
        setCount(null);
      }
    };
    fetchCount();
  }, []);

  const text =
    count !== null
      ? `${count.toLocaleString()} operators signed up  •  ${count.toLocaleString()} operators signed up  •  ${count.toLocaleString()} operators signed up  •`
      : "Loading operator count...  •  Loading operator count...  •";

  return (
    <div className="w-full overflow-hidden bg-amber-500/10 border-y border-amber-500/20 py-2">
      <div className="ticker-scroll whitespace-nowrap text-sm text-amber-400/80 font-mono">
        {text}
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
      </div>
    </div>
  );
}
