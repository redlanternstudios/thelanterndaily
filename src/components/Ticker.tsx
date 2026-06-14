import { TICKER_ITEMS } from "@/lib/content";

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full overflow-hidden bg-[var(--color-red)] border-y border-[var(--color-red)]">
      <div className="flex whitespace-nowrap ticker-track py-2.5">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--color-text)] px-5"
          >
            {item}
            <span className="ml-5 opacity-60">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
