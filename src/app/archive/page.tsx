<<<<<<< HEAD
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
const archiveItems = [
  { title: "The Agentic Shift: Why 2026 Is the Year AI Learns to Act", date: "Jun 13, 2026", slug: "agentic-shift-2026" },
  { title: "Markets Digest Fed Decision: What the Steady Hand Means", date: "Jun 12, 2026", slug: "fed-decision-june-2026" },
  { title: "DeepSeek R1 and the Open-Weight Revolution", date: "Jun 11, 2026", slug: "deepseek-r1-revolution" },
];
export default function ArchivePage() {
  return (<><Nav /><main className="pt-[88px] min-h-screen"><div className="max-w-[var(--max-w-content)] mx-auto px-6 py-16"><div className="flex items-center gap-[14px] mb-10"><div className="w-10 h-[1px] bg-[var(--border-bright)]" /><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]">Archive</span></div><h1 className="font-serif text-4xl font-bold text-white mb-8">All Issues</h1><div className="space-y-4">{archiveItems.map((item) => (<Link key={item.slug} href={"/issues/" + item.slug} className="block p-6 border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors no-underline"><div className="font-mono text-[8px] tracking-[0.1em] text-[var(--dim)] uppercase mb-2">{item.date}</div><h3 className="font-serif text-xl font-bold text-[var(--off-white)] hover:text-white transition-colors">{item.title}</h3></Link>))}</div></div></main><Footer /></>);
=======
"use client";

import { useState } from "react";
import IssueCard, { type Issue } from "@/components/IssueCard";

// --- Mock data ---
const allIssues: Issue[] = [
  { slug: "silicon-valley-shift", title: "Silicon Valley's Quiet Pivot to Defense Tech", description: "How venture capital is flowing into defense and aerospace at record levels.", category: "Technology", tier: "Premium", date: "2026-06-12" },
  { slug: "energy-transition", title: "The Energy Transition's Dirty Secret: Mineral Supply Chains", description: "Critical mineral dependencies are reshaping geopolitics.", category: "Energy", tier: "Free", date: "2026-06-11" },
  { slug: "ai-regulation-wave", title: "The Coming Wave: Global AI Regulation in 2026", description: "As AI regulation accelerates worldwide, businesses face a patchwork.", category: "Policy", tier: "Premium", date: "2026-06-10" },
  { slug: "supply-chain-rewiring", title: "Supply Chain Rewiring: The Post-COVID Reality", description: "Four years after the pandemic, global supply chains have fundamentally restructured.", category: "Economics", tier: "Free", date: "2026-06-09" },
  { slug: "cyber-mercenaries", title: "The Rise of Cyber Mercenaries", description: "Private cyber groups are increasingly acting as unofficial state proxies.", category: "Security", tier: "Premium", date: "2026-06-08" },
  { slug: "food-inflation", title: "Food Inflation's Hidden Driver: Climate Shocks", description: "Extreme weather events are creating food price volatility.", category: "Markets", tier: "Free", date: "2026-06-07" },
  { slug: "quantum-timeline", title: "Quantum Computing: The Real Timeline", description: "Separating hype from reality in quantum computing development.", category: "Technology", tier: "Premium", date: "2026-06-06" },
  { slug: "dollar-empire", title: "The Dollar Empire: 5 Charts That Explain Everything", description: "Deep dive into global reserve currency dynamics.", category: "Geopolitics", tier: "Free", date: "2026-06-05" },
  { slug: "semiconductor-war", title: "The Semiconductor War: Export Controls Deepen", description: "New export controls on semiconductor equipment escalate the US-China tech war.", category: "Geopolitics", tier: "Premium", date: "2026-06-04" },
  { slug: "renewable-record", title: "Renewable Energy Sets Global Record in 2025", description: "Renewables accounted for 45% of global electricity generation in 2025.", category: "Energy", tier: "Free", date: "2026-06-03" },
  { slug: "central-bank-gold", title: "Why Central Banks Can't Stop Buying Gold", description: "Central bank gold purchases hit a 30-year high in 2025.", category: "Markets", tier: "Free", date: "2026-06-02" },
  { slug: "ai-employment", title: "AI and Employment: The Real Story Behind the Headlines", description: "A data-driven look at which jobs AI is actually displacing.", category: "Economics", tier: "Premium", date: "2026-06-01" },
];

const ITEMS_PER_PAGE = 4;

const filters = ["All", "Free", "Premium"] as const;
type Filter = (typeof filters)[number];

export default function ArchivePage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered =
    activeFilter === "All"
      ? allIssues
      : allIssues.filter((i) => i.tier === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (f: Filter) => {
    setActiveFilter(f);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-stone-100 mb-2">Archive</h1>
      <p className="text-stone-400 mb-8">
        Every issue, every signal. Browse the full archive.
      </p>

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => handleFilterChange(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === f
                ? "bg-amber-400 text-stone-950"
                : "bg-stone-800/50 text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Issue grid */}
      {visible.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-500 font-mono text-sm">
            No issues found for this filter.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((issue) => (
              <IssueCard key={issue.slug} issue={issue} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={() =>
                  setVisibleCount((c) =>
                    Math.min(c + ITEMS_PER_PAGE, filtered.length)
                  )
                }
                className="px-6 py-2.5 bg-stone-800/50 border border-stone-700 rounded-lg text-sm text-stone-300 hover:bg-stone-700/50 transition-colors font-medium"
              >
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
}
