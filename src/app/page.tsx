'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import StackToolCard, { sampleTools } from '@/components/StackToolCard'
import OperatorSpotlightCard, { sampleBuilders } from '@/components/OperatorSpotlightCard'

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-stone-950">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-500">Loading...</p>
        </div>
      </main>
    )
  }

  const featuredTools = sampleTools.filter(t => t.featured).slice(0, 3)
  const featuredBuilders = sampleBuilders.filter(b => b.featured).slice(0, 3)

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative px-6 md:px-12 py-20 md:py-28 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(245,197,66,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(30,20,80,0.15) 0%, transparent 50%)' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-3 text-amber-500">
            <span className="w-6 h-px bg-amber-500/50" />
            Muslim-Built · AI-Native
          </div>
          <h1 className="font-serif font-black leading-[1.0] mb-6 text-white"
            style={{ fontSize: 'clamp(36px, 8vw, 64px)', letterSpacing: '-0.02em' }}
          >
            Build Your Islamic<br />
            <span className="text-amber-400">Digital Empire</span>
          </h1>
          <p className="text-base md:text-lg font-light leading-relaxed max-w-[540px] mb-8 text-stone-400">
            Curated tools, stacks, and operator profiles for Muslim founders and builders
            shaping the future of halal tech. No noise. Just what ships.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/stack"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              Explore the Stack
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/builders"
              className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-stone-400 hover:text-white transition-colors"
            >
              Meet the Operators
            </Link>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
            Get the Daily Signal
          </h2>
          <p className="text-sm text-stone-400 mb-6 max-w-md mx-auto">
            Intelligence brief for Muslim operators. Tools, stacks, and signals — delivered daily.
          </p>
          <SubscribeForm variant="large" placeholder="your@email.com" buttonText="Join Free" />
        </div>
      </section>

      {/* ─── FEATURED STACK TEASER ─────────────────── */}
      <section className="px-6 md:px-12 py-16 border-b border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">Featured Tools</div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">The Stack</h2>
            </div>
            <Link
              href="/stack"
              className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-stone-400 hover:text-amber-400 transition-colors"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <StackToolCard key={tool.id} tool={tool} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUILDER PREVIEW ───────────────────────── */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">Community</div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Meet the Builders</h2>
            </div>
            <Link
              href="/builders"
              className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-stone-400 hover:text-amber-400 transition-colors"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBuilders.map((builder) => (
              <OperatorSpotlightCard key={builder.id} builder={builder} variant="featured" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
