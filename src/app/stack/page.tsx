'use client'

import { useState } from 'react'
import Link from 'next/link'
import StackToolCard, { sampleTools, premiumTools } from '@/components/StackToolCard'
import PremiumGate from '@/components/PremiumGate'

const categories = Array.from(new Set(sampleTools.map(t => t.category))).sort()

export default function StackPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? sampleTools.filter(t => t.category === activeCategory)
    : sampleTools

  return (
    <>
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative px-6 md:px-12 py-20 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(245,197,66,0.05) 0%, transparent 60%)' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-3 text-amber-500">
            <span className="w-6 h-px bg-amber-500/50" />
            Curated Tools
          </div>
          <h1 className="font-serif font-black leading-[1.0] mb-4 text-white"
            style={{ fontSize: 'clamp(32px, 6vw, 52px)', letterSpacing: '-0.02em' }}
          >
            The Stack
          </h1>
          <p className="text-base text-stone-400 leading-relaxed max-w-[540px]">
            A curated directory of tools, platforms, and infrastructure
            used by serious Muslim operators. Every tool vetted for quality and halal alignment.
            No fluff, no hype. Just what ships.
          </p>
        </div>
      </section>

      {/* ─── FILTER BAR ───────────────────────────── */}
      <section className="px-6 md:px-12 py-6 border-b border-stone-800 sticky top-16 z-20 bg-stone-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`font-mono text-[9px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded border transition-all ${
              activeCategory === null
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-transparent text-stone-500 border-stone-700 hover:border-stone-500'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[9px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded border transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-transparent text-stone-500 border-stone-700 hover:border-stone-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── TOOL GRID ───────────────────────────── */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-stone-500">
              Showing {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
              {activeCategory ? ` in ${activeCategory}` : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool) => (
              <StackToolCard key={tool.id} tool={tool} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PREMIUM GATE ─────────────────────────── */}
      <section className="px-6 md:px-12 py-16 border-t border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
              Premium Stack
            </h2>
            <p className="text-sm text-stone-400 max-w-md mx-auto">
              Enterprise-grade tools and exclusive resources for operators who need more power.
            </p>
          </div>
          <PremiumGate
            title="Unlock Premium Stack"
            description="Enterprise tools, early access to new releases, and exclusive operator resources. Coming soon."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {premiumTools.map((tool) => (
                <StackToolCard key={tool.id} tool={tool} variant="premium" />
              ))}
            </div>
          </PremiumGate>
        </div>
      </section>
    </>
  )
}
