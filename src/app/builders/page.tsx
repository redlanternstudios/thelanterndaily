'use client'

import OperatorSpotlightCard, { sampleBuilders } from '@/components/OperatorSpotlightCard'

export default function BuildersPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative px-6 md:px-12 py-20 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 40% 50%, rgba(245,197,66,0.05) 0%, transparent 60%)' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-3 text-amber-500">
            <span className="w-6 h-px bg-amber-500/50" />
            Community
          </div>
          <h1 className="font-serif font-black leading-[1.0] mb-4 text-white"
            style={{ fontSize: 'clamp(32px, 6vw, 52px)', letterSpacing: '-0.02em' }}
          >
            Meet the Operators
          </h1>
          <p className="text-base text-stone-400 leading-relaxed max-w-[540px]">
            The builders, founders, and engineers shaping the halal tech landscape.
            Each operator is building something that matters for the Ummah.
          </p>
        </div>
      </section>

      {/* ─── BUILDER GRID ─────────────────────────── */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleBuilders.map((builder) => (
              <OperatorSpotlightCard key={builder.id} builder={builder} variant="grid" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
