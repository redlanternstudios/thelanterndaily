import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import EditorialStatusBadge from '@/components/editorial/EditorialStatusBadge';
import NewsletterBanner from '@/components/editorial/NewsletterBanner';

export default function HomePage() {
  const marketRows = [
    { asset: 'Nasdaq 100 (NDX)', latest: '18,708.34', change24h: '+1.32%', change7d: '+4.78%', signal: 'Bullish', up: true },
    { asset: 'S&P 500 (SPY)', latest: '5,297.10', change24h: '+0.95%', change7d: '+2.21%', signal: 'Bullish', up: true },
    { asset: 'Physical Gold (XAU/USD)', latest: '$2,654.10', change24h: '+1.40%', change7d: '+3.15%', signal: 'Neutral', up: true },
    { asset: 'Brent Crude Oil (USO)', latest: '$83.21', change24h: '+1.05%', change7d: '-1.63%', signal: 'Neutral', up: true },
    { asset: 'Bitcoin (BTC/USD)', latest: '$66,160.00', change24h: '+1.84%', change7d: '+3.22%', signal: 'Bullish', up: true },
    { asset: 'SP Funds Sharia (SPUS)', latest: '$148.20', change24h: '+0.85%', change7d: '+2.40%', signal: 'Bullish', up: true },
    { asset: 'H100 Compute / 1M Tok', latest: '$0.42', change24h: '-6.30%', change7d: '-12.50%', signal: 'Bullish', up: false },
  ];

  const featuredSignals = [
    {
      type: 'VIDEO',
      duration: '01:30',
      title: 'Watch: The 90-Second Signal',
      category: 'MARKET PULSE',
      summary: 'A fast-paced daily briefing on sovereign compute spend, frontier model shifts, and interest-free capital liquidity.',
      image: '/images/video-thumb.png',
      href: '/article/the-late-night-build-log',
      readTime: '1.5m watch',
      status: 'VERIFIED' as const,
      confidence: 'HIGH' as const,
    },
    {
      type: 'ANALYSIS',
      title: 'Why Agent Reliability Beats Model Benchmarks',
      category: 'AI & INFRASTRUCTURE',
      summary: 'Raw intelligence is a commodity. The real enterprise moat is deterministic tool execution, audit trails, and token efficiency.',
      image: '/images/hero-founder.png',
      href: '/article/the-governance-layer',
      readTime: '6m read',
      status: 'VERIFIED' as const,
      confidence: 'HIGH' as const,
    },
    {
      type: 'STRATEGY',
      title: 'Designing AI Products People Actually Keep',
      category: 'BUILDER ECONOMY',
      summary: 'Retention is not magic. It is clarity, trust, and a tight feedback loop that respects user time and eliminates friction.',
      image: '/images/grid-2.png',
      href: '/article/pair-programming-with-models',
      readTime: '5m read',
      status: 'VERIFIED' as const,
      confidence: 'HIGH' as const,
    },
    {
      type: 'CAPITAL',
      title: 'Islamic Finance Enters Its Platform Era',
      category: 'MARKETS & CAPITAL',
      summary: 'Fintech rails, equity syndicates, and AAOIFI Sharia-compliant debt screening are replacing high-interest bank debt for builders.',
      image: '/images/grid-3.png',
      href: '/markets',
      readTime: '8m read',
      status: 'VERIFIED' as const,
      confidence: 'HIGH' as const,
    },
    {
      type: 'RUNBOOK',
      title: "The Operator's Edge in a Noisy World",
      category: 'OPERATOR STACK',
      summary: 'Tools do not build leverage — battle-tested systems do. The production runbooks powering high-margin autonomous studios.',
      image: '/images/grid-1.png',
      href: '/stack',
      readTime: '7m read',
      status: 'VERIFIED' as const,
      confidence: 'HIGH' as const,
    },
    {
      type: 'DISPATCH',
      title: 'What Founders Get Wrong About Focus',
      category: 'BUILDER ECONOMY',
      summary: 'Focus is not doing less. It is ruthlessly deciding what compounds enterprise value and removing the rest without apology.',
      image: '/images/grid-4.png',
      href: '/article/bootstrapping-agentic-ventures',
      readTime: '4m read',
      status: 'VERIFIED' as const,
      confidence: 'HIGH' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE] antialiased">
      {/* ── Persistent Navigation Masthead (Today, Markets, Stack, Careers, About) ── */}
      <Masthead />

      {/* ── Main Editorial Console Container ── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">

        {/* ── SECTION 1: LEAD INVESTIGATION HERO (50/50 Screen Layout) ── */}
        <section aria-label="Lead Investigation" className="border-b border-[#1A1E2B] pb-12">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Lead Story Copy */}
            <div className="flex flex-col justify-between lg:col-span-7 xl:col-span-7">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#D42535]">
                    <span className="h-2 w-2 rounded-full bg-[#D42535] animate-pulse" />
                    AI &amp; INFRASTRUCTURE
                  </span>
                  <span className="text-[#4B5563]">/</span>
                  <EditorialStatusBadge status="VERIFIED" confidence="HIGH" />
                </div>

                <h1 className="mt-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-[#F7F2EE] sm:text-4xl lg:text-5xl">
                  AI Infrastructure Is Becoming the New Commodity Trade
                </h1>

                <p className="mt-5 text-base leading-relaxed text-[#9CA3AF] sm:text-lg">
                  Inference demand is exploding, cloud spend is repricing across every major enterprise, and the next picks-and-shovels layer will decide the next decade of sovereign software winners.
                </p>

                <div className="mt-6 border-l-2 border-[#D42535] pl-4 font-mono text-xs text-[#D1D5DB]">
                  Key Finding: Inference compute volume is outpacing training spend by 4.2x YoY. Infrastructure owners are capturing 68% of enterprise AI budgets.
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A1E2B] pt-4 font-mono text-xs">
                <div className="text-[#6B7280]">
                  By <span className="text-[#D1D5DB]">RedLantern Studios™</span> · 8 min read
                </div>
                <Link
                  href="/article/the-quiet-rise-of-muslim-built-ai-infrastructure"
                  className="inline-flex items-center gap-2 bg-[#D42535] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#b01e2c]"
                >
                  Read Full Investigation →
                </Link>
              </div>
            </div>

            {/* Right Column: Full-Bleed Cinematic Photography */}
            <div className="relative min-h-[300px] overflow-hidden rounded-sm border border-[#1A1E2B] bg-[#0D0F18] lg:col-span-5 xl:col-span-5">
              <Image
                src="/images/article-hero.png"
                alt="High-density sovereign AI compute infrastructure at dusk"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080D]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[#D1D5DB]">
                <span>Hyperscale Node 04 · Sovereign Compute</span>
                <span className="text-[#4ADE80]">● ONLINE</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: HIGH-SIGNAL 6-CARD ASYMMETRIC MATRIX ── */}
        <section aria-label="Featured Intelligence Signals" className="mt-12">
          <div className="mb-6 flex items-center justify-between border-b border-[#1A1E2B] pb-3 font-mono text-xs uppercase tracking-widest text-[#B8922A]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8922A]" />
              Executive Signals &amp; Briefings
            </span>
            <span className="text-[#6B7280]">6 Stories Filtered for High Conviction</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSignals.map((story) => (
              <Link
                key={story.title}
                href={story.href}
                className="group flex flex-col justify-between border border-[#1A1E2B] bg-[#0A0C14] transition-all duration-200 hover:border-[#D42535] hover:bg-[#0D0F1A]"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07080D]">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C14] via-transparent to-transparent" />
                    
                    {story.type === 'VIDEO' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D42535]/90 text-white shadow-lg transition-transform group-hover:scale-110">
                          <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
                          {story.duration}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#D42535] backdrop-blur-sm">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <EditorialStatusBadge status={story.status} confidence={story.confidence} />
                      <span className="font-mono text-[11px] text-[#6B7280]">· {story.readTime}</span>
                    </div>

                    <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-[#F7F2EE] transition-colors group-hover:text-[#E5C058]">
                      {story.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF] line-clamp-3">
                      {story.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#161822] px-5 py-3 font-mono text-xs text-[#B8922A] group-hover:text-[#E5C058]">
                  <span>Explore Signal</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: PULL QUOTE DIVIDER BANNER ── */}
        <section aria-label="Studio Manifesto" className="my-16 border-y border-[#1A1E2B] bg-[#0A0C14] px-6 py-10 text-center sm:px-12">
          <div className="mx-auto max-w-4xl">
            <span className="font-serif text-4xl text-[#D42535]">“</span>
            <blockquote className="font-serif text-xl italic leading-relaxed text-[#F7F2EE] sm:text-2xl lg:text-3xl">
              The next decade won&apos;t be defined by the smartest models, but by the strongest systems around them.
            </blockquote>
            <div className="mt-4 font-mono text-xs uppercase tracking-widest text-[#B8922A]">
              — RedLantern Studios™ · Founder Intelligence · Built for Builders
            </div>
          </div>
        </section>

        {/* ── SECTION 4: DUAL BLOOMBERG TERMINAL MODULES ── */}
        <section aria-label="Terminal Modules" className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left Module: Real-Time Market Signals (Cols 1–7) */}
          <div className="border border-[#1A1E2B] bg-[#0A0C14] p-5 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A1E2B] pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F7F2EE]">Market Signals &amp; Macro Pulse</h3>
                <p className="font-mono text-xs text-[#6B7280]">Live equities, Sharia benchmarks, and compute pricing</p>
              </div>
              <Link
                href="/markets"
                className="font-mono text-xs font-semibold text-[#B8922A] transition-colors hover:text-[#E5C058]"
              >
                Full Markets Terminal →
              </Link>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#161822] text-[#6B7280]">
                    <th className="pb-2 font-normal">ASSET / SEGMENT</th>
                    <th className="pb-2 text-right font-normal">LATEST</th>
                    <th className="pb-2 text-right font-normal">24H</th>
                    <th className="pb-2 text-right font-normal">7D</th>
                    <th className="pb-2 text-right font-normal">SIGNAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#12141D]">
                  {marketRows.map((row) => (
                    <tr key={row.asset} className="hover:bg-[#0E101B]/60 transition-colors">
                      <td className="py-2.5 font-medium text-[#F7F2EE]">{row.asset}</td>
                      <td className="py-2.5 text-right font-semibold text-[#D1D5DB]">{row.latest}</td>
                      <td className={`py-2.5 text-right ${row.up ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
                        {row.change24h}
                      </td>
                      <td className={`py-2.5 text-right ${row.change7d.startsWith('+') ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
                        {row.change7d}
                      </td>
                      <td className="py-2.5 text-right">
                        <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                          row.signal === 'Bullish' ? 'bg-[#0E2416] text-[#4ADE80] border border-[#2D7A4F]/40' : 'bg-[#1C1A10] text-[#E5C058] border border-[#B8922A]/40'
                        }`}>
                          {row.signal}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#161822] pt-3 font-mono text-[11px] text-[#6B7280]">
              <span>Source: RedLantern Quantitative Research</span>
              <Link href="/markets" className="underline hover:text-[#D1D5DB]">
                AAOIFI Standard 21 Screener Active ↗
              </Link>
            </div>
          </div>

          {/* Right Module: Operator Stack Runbooks Preview (Cols 8–12) */}
          <div className="flex flex-col justify-between border border-[#1A1E2B] bg-[#0A0C14] p-5 sm:p-6 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-[#1A1E2B] pb-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F7F2EE]">Operator Stack</h3>
                  <p className="font-mono text-xs text-[#6B7280]">Battle-tested tools and runbooks</p>
                </div>
                <Link
                  href="/stack"
                  className="font-mono text-xs font-semibold text-[#B8922A] transition-colors hover:text-[#E5C058]"
                >
                  View All Runbooks →
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                <div className="border border-[#161822] bg-[#0E101A] p-3.5 transition-colors hover:border-[#2A2E3D]">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#F7F2EE]">Vercel Edge &amp; Next.js 15</span>
                    <span className="text-[#4ADE80]">RUNBOOK READY</span>
                  </div>
                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    Deterministic static export, edge propagation, and zero-downtime routing.
                  </p>
                  <Link href="/stack" className="mt-2 inline-block font-mono text-[11px] text-[#B8922A] hover:underline">
                    Download .md Runbook →
                  </Link>
                </div>

                <div className="border border-[#161822] bg-[#0E101A] p-3.5 transition-colors hover:border-[#2A2E3D]">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#F7F2EE]">Claude Code CLI Orchestration</span>
                    <span className="text-[#4ADE80]">RUNBOOK READY</span>
                  </div>
                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    Autonomous tool-calling, token caching, and strict subagent governance.
                  </p>
                  <Link href="/stack" className="mt-2 inline-block font-mono text-[11px] text-[#B8922A] hover:underline">
                    Download .md Runbook →
                  </Link>
                </div>

                <div className="border border-[#161822] bg-[#0E101A] p-3.5 transition-colors hover:border-[#2A2E3D]">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#F7F2EE]">Llama 3 Local Sovereign Inference</span>
                    <span className="text-[#4ADE80]">RUNBOOK READY</span>
                  </div>
                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    Self-hosted Ollama/vLLM endpoints for confidential document parsing.
                  </p>
                  <Link href="/stack" className="mt-2 inline-block font-mono text-[11px] text-[#B8922A] hover:underline">
                    Download .md Runbook →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#161822] pt-3 text-center">
              <Link
                href="/stack"
                className="inline-flex w-full items-center justify-center border border-[#B8922A] bg-transparent py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#B8922A] transition-colors hover:bg-[#B8922A] hover:text-black"
              >
                Explore Full Operator Stack
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: NEWSLETTER CONVERSION BANNER ── */}
        <div className="mt-16">
          <NewsletterBanner />
        </div>
      </main>

      {/* ── Standardized Verified Footer (Today, Markets, Stack, Careers, About) ── */}
      <Footer />
    </div>
  );
}
