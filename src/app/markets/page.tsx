import React from 'react';
import Link from 'next/link';
import Masthead from '@/components/Masthead';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import HalalBadge from '@/components/HalalBadge';
import { MARKET_SIGNALS, SECONDARY_ARTICLES, ALL_ARTICLES } from '@/lib/content';

export const metadata = {
  title: 'Halal Stock Market & Sovereign Capital | The Lantern Daily',
  description: 'Real-time Sharia-compliant public equities, AAOIFI Standard 21 screening, compute index benchmarks, and sovereign liquidity signals.',
};

const SHARIA_ETFS = [
  { ticker: 'SPUS', name: 'SP Funds S&P 500 Sharia Industry ETF', price: '$148.20', change: '+0.85%', up: true, aum: '$480M', screener: 'AAOIFI' },
  { ticker: 'HLAL', name: 'Wahed FTSE USA Shariah ETF', price: '$46.85', change: '+1.18%', up: true, aum: '$410M', screener: 'FTSE Sharia' },
  { ticker: 'UMMA', name: 'Wahed Dow Jones Islamic World ETF', price: '$24.10', change: '+0.42%', up: true, aum: '$120M', screener: 'Dow Jones Islamic' },
  { ticker: 'SPRE', name: 'SP Funds S&P Global RE Sharia ETF', price: '$19.50', change: '-0.24%', up: false, aum: '$85M', screener: 'AAOIFI' },
];

const SOVEREIGN_ASSETS = [
  { name: 'Physical Gold (XAU/USD)', value: '$2,654.10 / oz', change: '+1.4%', up: true, note: 'Sovereign inflation hedge' },
  { name: 'Physical Silver (XAG/USD)', value: '$32.40 / oz', change: '+2.1%', up: true, note: 'Industrial & monetary reserve' },
  { name: 'GPU Compute / 1M H100 tok', value: '$0.42', change: '-6.3%', up: false, note: 'Deflationary infrastructure cost' },
  { name: 'Monthly Agent API Spend', value: '$2.1B (MoM)', change: '+11.9%', up: true, note: 'Autonomous corporate volume' },
];

export default function MarketsPage() {
  const marketArticles = ALL_ARTICLES.filter((a) => a.category === 'Markets' || a.kicker === 'Markets');

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <Masthead />
      <Ticker />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <header className="border-b border-[#1A1F2E] pb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8922A]/40 bg-[#B8922A]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#B8922A]">
            <span>✦</span>
            <span>Markets & Sovereign Capital</span>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-5xl">
            The Halal Stock Market.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:text-lg">
            Tracking Sharia-screened public equities, physical monetary reserves, compute commodity indices, and the migration toward interest-free sovereign capital.
          </p>
        </header>

        {/* 1. Sharia-Compliant ETFs Section */}
        <section className="mt-12">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
                Sharia-Compliant Equity ETFs
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Public index vehicles implementing Islamic equity screens and zero interest-bearing leverage.
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#4ADE80]">
              ● Market Live
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHARIA_ETFS.map((etf) => (
              <div
                key={etf.ticker}
                className="rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-5 transition-all hover:border-[#B8922A]/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-[#F7F2EE]">{etf.ticker}</span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      etf.up ? 'text-[#4ADE80]' : 'text-[#F87171]'
                    }`}
                  >
                    {etf.change}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-[#9CA3AF]">{etf.name}</p>
                <div className="mt-4 flex items-baseline justify-between border-t border-[#1F2430] pt-3">
                  <span className="font-serif text-xl font-bold text-[#F7F2EE]">{etf.price}</span>
                  <span className="font-mono text-[10px] uppercase text-[#6B7280]">
                    AUM {etf.aum}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Sovereign Commodities & Compute Index */}
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl font-bold text-[#F7F2EE]">
            Sovereign Commodities & Compute Signals
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOVEREIGN_ASSETS.map((asset) => (
              <div
                key={asset.name}
                className="rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-5"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#B8922A] block mb-1">
                  {asset.note}
                </span>
                <p className="text-xs font-semibold text-[#D1D5DB]">{asset.name}</p>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-serif text-lg font-bold text-[#F7F2EE]">{asset.value}</span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      asset.up ? 'text-[#4ADE80]' : 'text-[#9CA3AF]'
                    }`}
                  >
                    {asset.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. AAOIFI Standard 21 Screening Tool CTA */}
        <section className="mt-14 rounded-xl border border-[#B8922A]/40 bg-[#12151D] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B8922A] font-bold block mb-1">
                ✦ Institutional Governance Standard
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
                AAOIFI Standard 21 Equity Screening Matrix
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                The exact financial template used to audit public stocks against Sharia compliance: Debt/MarketCap &lt; 33%, Cash/Interest Securities &lt; 33%, and Impure Revenue purification &lt; 5%.
              </p>
            </div>

            <a
              href="/vault/aaoifi-equity-screening-matrix.xlsx"
              download
              className="inline-flex items-center justify-center gap-2 rounded bg-[#B8922A] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#E5C058]"
            >
              <span>Download Screening Matrix</span>
              <span>↓</span>
            </a>
          </div>
        </section>

        {/* 4. Curated Market Dispatches */}
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between border-b border-[#2A2D35] pb-3">
            <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
              Market Briefings & Field Reports
            </h2>
            <Link
              href="/archive?cat=Markets"
              className="font-mono text-xs uppercase tracking-wider text-[#B8922A] hover:text-[#E5C058]"
            >
              View Full Archive →
            </Link>
          </div>

          <div className="space-y-6">
            {marketArticles.map((article) => (
              <div
                key={article.slug}
                className="group rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-6 transition-all hover:border-[#3E434F]"
              >
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-[#B8922A]">
                    {article.kicker}
                  </span>
                  <span className="font-mono text-[#6B7280]">{article.readTime}</span>
                </div>

                <Link href={`/article/${article.slug}`}>
                  <h3 className="font-serif text-xl font-bold text-[#F7F2EE] group-hover:text-[#B8922A] transition-colors sm:text-2xl">
                    {article.title}
                  </h3>
                </Link>

                <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                  {article.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-[#1F2430] pt-3 text-xs">
                  <span className="text-[#6B7280]">Published by {article.author}</span>
                  <Link
                    href={`/article/${article.slug}`}
                    className="font-mono text-xs uppercase tracking-wider text-[#B8922A] hover:text-[#E5C058]"
                  >
                    Read Full Briefing →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
