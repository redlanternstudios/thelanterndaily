<<<<<<< HEAD
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function ShortsPage() {
  return (<><Nav /><main className="pt-[88px] min-h-screen"><div className="max-w-[var(--max-w-content)] mx-auto px-6 py-16"><h1 className="font-serif text-4xl font-bold text-white mb-6">Shorts</h1><p className="text-[var(--muted)]">Quick takes and signal snippets. Coming soon.</p></div></main><Footer /></>);
=======
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ShortsCard from "@/components/ShortsCard";
import SubscribeForm from "@/components/SubscribeForm";
import type { Short } from "@/components/ShortsCard";

// --- Mock data generator ---
const allMockShorts: Short[] = [
  { id: "s1", tag: "Flash", date: "2026-06-13", title: "Japan's 10-Year Yield Breaks 2% for First Time Since 2006", body: "The BOJ's gradual tightening cycle reaches another milestone as Japan's benchmark yield pierces the 2% threshold. Market participants are watching for accelerated portfolio rebalancing out of JGBs." },
  { id: "s2", tag: "Data Point", date: "2026-06-12", title: "Global Semiconductor Sales Hit $62B in May", body: "Monthly semiconductor sales reached $62 billion globally, up 18% YoY. AI chip demand continues to be the primary growth driver, with data center segment up 34%." },
  { id: "s3", tag: "Chart", date: "2026-06-12", title: "Central Bank Gold Reserves Hit 30-Year High", body: "Central banks added 1,037 tonnes of gold in 2025, the third consecutive year of purchases exceeding 1,000 tonnes." },
  { id: "s4", tag: "Alert", date: "2026-06-11", title: "OPEC+ Signals Production Cuts Extended", body: "OPEC+ delegates indicate the group will extend voluntary production cuts through Q3 2026 in an effort to support prices amid weaker global demand projections." },
  { id: "s5", tag: "Flash", date: "2026-06-11", title: "UK GDP Contracts 0.3% in April", body: "The UK economy contracted more than expected in April, driven by a sharp decline in manufacturing output. Sterling falls 0.8% against the dollar." },
  { id: "s6", tag: "Data Point", date: "2026-06-10", title: "US Jobless Claims Fall to 204K", body: "Initial jobless claims dropped to 204,000, well below the 220,000 consensus estimate. The labor market remains remarkably tight despite elevated rates." },
  { id: "s7", tag: "Chart", date: "2026-06-10", title: "Bitcoin Volatility Hits 6-Month Low", body: "Bitcoin's 30-day realized volatility dropped to 32%, the lowest level since December 2025. Options markets show increased positioning for a breakout." },
  { id: "s8", tag: "Flash", date: "2026-06-09", title: "China Exports Surge 12% YoY in May", body: "Chinese exports beat expectations with 12% year-over-year growth, driven by EV and solar panel shipments. Trade surplus widens to $82 billion." },
  { id: "s9", tag: "Alert", date: "2026-06-09", title: "Fed's Bowman: 'Further Rate Hikes Possible'", body: "Fed Governor Michelle Bowman stated that additional rate hikes remain on the table if inflation progress stalls. Markets price in 25% chance of a hike in September." },
  { id: "s10", tag: "Data Point", date: "2026-06-08", title: "European Gas Storage Reaches 75% Capacity", body: "EU gas storage facilities are now 75% full, ahead of the 70% target for June. The accelerated fill rate provides a buffer against winter supply disruptions." },
  { id: "s11", tag: "Chart", date: "2026-06-08", title: "Global Debt-to-GDP Ratio Edges Lower", body: "Global debt-to-GDP fell to 245% in Q1 2026, down from 249% in Q4 2025. The first decline since 2021 reflects fiscal consolidation in advanced economies." },
  { id: "s12", tag: "Flash", date: "2026-06-07", title: "India's GDP Grows 7.8% in Q1", body: "India remains the fastest-growing major economy with 7.8% Q1 GDP growth. Manufacturing PMI hits 58.9, signaling continued expansion." },
];

const PAGE_SIZE = 4;

export default function ShortsPage() {
  const [displayed, setDisplayed] = useState<Short[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    setDisplayed(allMockShorts.slice(0, PAGE_SIZE));
    setHasMore(allMockShorts.length > PAGE_SIZE);
  }, []);

  // IntersectionObserver for infinite scroll
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const nextPage = page + 1;
      const end = nextPage * PAGE_SIZE;
      setDisplayed(allMockShorts.slice(0, end));
      setPage(nextPage);
      setHasMore(end < allMockShorts.length);
      setLoading(false);
    }, 400);
  }, [loading, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-stone-100 mb-2">Shorts</h1>
      <p className="text-stone-400 mb-10">
        Quick signals, flashes, and data points.
      </p>

      <div className="space-y-4">
        {displayed.map((short, index) => (
          <div key={short.id}>
            <ShortsCard short={short} />
            {/* SubscribeForm after every 5th item */}
            {(index + 1) % 5 === 0 && (
              <div className="my-8 bg-stone-900/30 border border-stone-800 rounded-xl p-6">
                <h3 className="text-lg font-serif text-stone-100 mb-3">
                  Get these in your inbox
                </h3>
                <SubscribeForm />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="py-8 text-center">
        {loading && (
          <p className="text-sm text-stone-500 font-mono">Loading more...</p>
        )}
        {!hasMore && displayed.length > 0 && (
          <p className="text-sm text-stone-600 font-mono">
            You&apos;re all caught up.
          </p>
        )}
      </div>
    </div>
  );
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
}
