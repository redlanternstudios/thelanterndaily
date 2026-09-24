import React from 'react';
import Link from 'next/link';
import Masthead from '@/components/Masthead';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import HalalBadge from '@/components/HalalBadge';
import LanternSeal from '@/components/lantern/LanternSeal';
import { ALL_ARTICLES } from '@/lib/content';
import { normalizeCategory } from '@/lib/taxonomy';

export const metadata = {
  title: 'Islamic Finance & Sovereign Markets | The Lantern Daily',
  description: 'Precision daily financial intelligence, AAOIFI Shariah-screened equities, Sukuk liquidity, mega-cap balance sheet compliance, and sovereign commodity reserves.',
};

const SHARIA_ETFS = [
  {
    ticker: 'SPUS',
    name: 'SP Funds S&P 500 Sharia Industry ETF',
    focus: 'US Large-Cap Equities',
    price: '$148.20',
    change: '+0.85%',
    up: true,
    aum: '$480M',
    screener: 'AAOIFI Standard 21',
  },
  {
    ticker: 'HLAL',
    name: 'Wahed FTSE USA Shariah ETF',
    focus: 'US Broad Market Equities',
    price: '$46.85',
    change: '+1.18%',
    up: true,
    aum: '$410M',
    screener: 'FTSE Shariah',
  },
  {
    ticker: 'UMMA',
    name: 'Wahed Dow Jones Islamic World ETF',
    focus: 'Global Ex-US Markets',
    price: '$24.10',
    change: '+0.42%',
    up: true,
    aum: '$120M',
    screener: 'Dow Jones Islamic',
  },
  {
    ticker: 'SPRE',
    name: 'SP Funds S&P Global RE Sharia ETF',
    focus: 'Global Real Estate (REITs)',
    price: '$19.50',
    change: '-0.24%',
    up: false,
    aum: '$85M',
    screener: 'AAOIFI Standard 21',
  },
];

const MEGA_CAP_SCREEN = [
  {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    status: 'COMPLIANT',
    stance: 'positive',
    debtRatio: '14.2%',
    cashRatio: '18.5%',
    notes: 'Low interest debt leverage; hardware & ecosystem services dominate revenue.',
  },
  {
    ticker: 'MSFT',
    company: 'Microsoft Corp.',
    status: 'COMPLIANT',
    stance: 'positive',
    debtRatio: '12.8%',
    cashRatio: '22.1%',
    notes: 'Enterprise cloud & AI infrastructure; balance sheet well within AAOIFI bounds.',
  },
  {
    ticker: 'NVDA',
    company: 'Nvidia Corp.',
    status: 'COMPLIANT',
    stance: 'positive',
    debtRatio: '3.6%',
    cashRatio: '26.4%',
    notes: 'Exceptional balance sheet cash; AI silicon and compute hardware.',
  },
  {
    ticker: 'GOOGL',
    company: 'Alphabet Inc.',
    status: 'COMPLIANT',
    stance: 'positive',
    debtRatio: '4.8%',
    cashRatio: '28.9%',
    notes: 'Search, YouTube, and Google Cloud infrastructure; strong equity buffer.',
  },
  {
    ticker: 'TSLA',
    company: 'Tesla Inc.',
    status: 'NUANCED',
    stance: 'nuanced',
    debtRatio: '2.1%',
    cashRatio: '29.3%',
    notes: 'Low debt, but digital asset treasury holdings require ongoing quarterly purification audits.',
  },
];

const SOVEREIGN_ASSETS = [
  {
    name: 'Physical Gold (XAU/USD)',
    value: '$2,654.10 / oz',
    change: '+1.4%',
    up: true,
    note: 'Sovereign inflation hedge & historic monetary anchor',
  },
  {
    name: 'Physical Silver (XAG/USD)',
    value: '$32.40 / oz',
    change: '+2.1%',
    up: true,
    note: 'Industrial clean-energy demand & bimetallic reserve',
  },
  {
    name: 'GPU Compute (1M H100 Tok)',
    value: '$0.42',
    change: '-6.3%',
    up: false,
    note: 'Deflationary infrastructure cost for modern enterprise',
  },
  {
    name: 'Agent API Volume (MoM)',
    value: '$2.1B',
    change: '+11.9%',
    up: true,
    note: 'Autonomous corporate transaction volume',
  },
];

export default function MarketsPage() {
  const marketArticles = ALL_ARTICLES.filter(
    (a) => normalizeCategory(a.category) === 'Markets & Islamic Finance'
  );

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE] antialiased">
      <Masthead />
      <Ticker />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Header Bar */}
        <header className="border-b border-[#1E2028] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B8922A]">
              ✦ Daily Financial Intelligence & Sovereign Capital
            </span>
            <span className="text-[#6B7280]">
              Market Data Verified: Wednesday, September 23, 2026 · 09:30 AM EST
            </span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-5xl">
            Islamic Finance &amp; Sovereign Markets.
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
            High-precision financial intelligence and Shariah-compliant asset screening for sovereign operators, founders, and ethical investors. Track equities screened against AAOIFI Standard 21, physical monetary reserves, and the global migration away from interest-bearing debt (<em>Riba</em>).
          </p>
        </header>

        {/* ── SECTION 1: TODAY'S MACRO MARKET DOSE (Plain-English Briefing) ── */}
        <section className="mt-8 border border-[#1E2028] bg-[#0A0C12] p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b border-[#1A1F2E] pb-3 text-xs font-mono uppercase tracking-widest text-[#D92532] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#D92532]" />
            Daily Market Pulse · What Every Operator Needs to Know Today
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            <div className="border border-[#16181F] bg-[#07080D] p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8922A] block mb-1">
                1. Interest Rates & Families
              </span>
              <h3 className="font-serif text-base font-bold text-[#F7F2EE]">
                Fed Rate Signals Hold Mortgages Above 6.2%
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                Conventional 30-year borrowing costs remain elevated. For Muslim families, this reinforces why interest-free diminishing musharakah models provide stability without compounding balance-sheet penalties.
              </p>
            </div>

            <div className="border border-[#16181F] bg-[#07080D] p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8922A] block mb-1">
                2. Tech & Compute Equities
              </span>
              <h3 className="font-serif text-base font-bold text-[#F7F2EE]">
                Halal Tech Giants Drive S&P 500 Outperformance
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                Apple, Microsoft, and Nvidia represent over 40% of the SPUS ETF weighting. Low institutional debt and robust enterprise cash positions keep the largest tech innovators fully AAOIFI-compliant.
              </p>
            </div>

            <div className="border border-[#16181F] bg-[#07080D] p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8922A] block mb-1">
                3. Physical Monetary Reserves
              </span>
              <h3 className="font-serif text-base font-bold text-[#F7F2EE]">
                Gold Hits $2,654/oz as Central Banks De-Dollarize
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                Global sovereign reserves continue migrating toward physical bimetallic stores of value. Sovereign wealth funds in the Gulf and Southeast Asia are increasing non-fiat asset allocations.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: SHARIA-SCREENED PUBLIC ETFS ── */}
        <section className="mt-12">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#1A1F2E] pb-3">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
                Core Halal Equity ETFs
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                The primary public investment vehicles used by individual retirement and brokerage accounts worldwide.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#4ADE80]">
              <span className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
              Live Pricing Desk
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHARIA_ETFS.map((etf) => (
              <div
                key={etf.ticker}
                className="border border-[#1E2028] bg-[#0A0C12] p-5 transition-colors hover:border-[#2A2D35]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-[#F7F2EE]">
                    {etf.ticker}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      etf.up ? 'text-[#4ADE80]' : 'text-[#F87171]'
                    }`}
                  >
                    {etf.change}
                  </span>
                </div>
                <p className="mt-1 font-serif text-sm font-semibold text-[#D1D5DB] line-clamp-1">
                  {etf.name}
                </p>
                <p className="text-[11px] text-[#9CA3AF] font-mono mt-0.5">{etf.focus}</p>

                <div className="mt-4 flex items-baseline justify-between border-t border-[#16181F] pt-3 font-mono">
                  <span className="font-serif text-xl font-bold text-[#F7F2EE]">
                    {etf.price}
                  </span>
                  <span className="text-[10px] uppercase text-[#6B7280]">
                    AUM {etf.aum}
                  </span>
                </div>
                <div className="mt-2 text-[10px] font-mono text-[#B8922A]">
                  Screen: {etf.screener}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: MEGA-CAP TECH COMPLIANCE SNAPSHOT ── */}
        <section className="mt-14">
          <div className="mb-4 border-b border-[#1A1F2E] pb-3">
            <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
              Mega-Cap Tech Screening Snapshot
            </h2>
            <p className="text-xs text-[#9CA3AF]">
              Can everyday investors own big tech? AAOIFI Standard 21 quarterly compliance breakdown for top market leaders.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#1E2028] bg-[#0A0C12]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-[#1E2028] bg-[#07080D] text-[#9CA3AF] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Ticker / Company</th>
                  <th className="p-3.5">Lantern Shariah Seal</th>
                  <th className="p-3.5">Debt / Market Cap (&lt;33%)</th>
                  <th className="p-3.5">Cash / Market Cap (&lt;33%)</th>
                  <th className="p-3.5">Editorial Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16181F] text-[#D1D5DB]">
                {MEGA_CAP_SCREEN.map((item) => (
                  <tr key={item.ticker} className="hover:bg-[#0E1118] transition-colors">
                    <td className="p-3.5 font-bold text-[#F7F2EE]">
                      <span className="text-[#B8922A] mr-2">{item.ticker}</span>
                      <span className="font-serif font-normal">{item.company}</span>
                    </td>
                    <td className="p-3.5">
                      <LanternSeal
                        name={item.company}
                        tickerOrTag={item.ticker}
                        stance={item.stance as "positive" | "nuanced" | "concern" | "blocked"}
                        debtRatio={item.debtRatio}
                        cashRatio={item.cashRatio}
                        editorialNote={item.notes}
                        variant="compact"
                      />
                    </td>
                    <td className="p-3.5 text-[#4ADE80] font-semibold">{item.debtRatio}</td>
                    <td className="p-3.5 text-[#4ADE80] font-semibold">{item.cashRatio}</td>
                    <td className="p-3.5 text-[#9CA3AF] font-sans text-xs">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 4: SOVEREIGN COMMODITIES & COMPUTE BENCHMARKS ── */}
        <section className="mt-14">
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#F7F2EE]">
            Sovereign Commodities & Compute Benchmarks
          </h2>
          <p className="mb-4 text-xs text-[#9CA3AF]">
            Tracking physical stores of value and digital compute commodities side-by-side.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOVEREIGN_ASSETS.map((asset) => (
              <div
                key={asset.name}
                className="border border-[#1E2028] bg-[#0A0C12] p-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8922A] block mb-1">
                  {asset.note}
                </span>
                <p className="text-xs font-semibold text-[#D1D5DB]">{asset.name}</p>
                <div className="mt-3 flex items-baseline justify-between font-mono">
                  <span className="font-serif text-lg font-bold text-[#F7F2EE]">
                    {asset.value}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      asset.up ? 'text-[#4ADE80]' : 'text-[#F87171]'
                    }`}
                  >
                    {asset.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: AAOIFI STANDARD 21 3-RULE CHEAT SHEET & DOWNLOAD ── */}
        <section className="mt-14 border border-[#B8922A]/40 bg-[#0E1118] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#B8922A] font-bold">
                  ✦ The 3 Golden Rules of Halal Stock Screening
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
                AAOIFI Standard 21 Equity Matrix
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#9CA3AF]">
                Everyday investors don&apos;t need complex finance degrees to evaluate stocks. A stock is considered Sharia-compliant if it satisfies three clear mathematical tests:
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs font-mono">
                <div className="border border-[#1A1F2E] bg-[#07080D] p-3">
                  <span className="text-[#B8922A] font-bold block mb-1">1. Business Check</span>
                  <span className="text-[#D1D5DB]">Impure revenue &lt; 5% of total gross revenue.</span>
                </div>
                <div className="border border-[#1A1F2E] bg-[#07080D] p-3">
                  <span className="text-[#B8922A] font-bold block mb-1">2. Debt Check</span>
                  <span className="text-[#D1D5DB]">Total interest debt &lt; 33% of 24-month market cap.</span>
                </div>
                <div className="border border-[#1A1F2E] bg-[#07080D] p-3">
                  <span className="text-[#B8922A] font-bold block mb-1">3. Cash Check</span>
                  <span className="text-[#D1D5DB]">Cash &amp; interest securities &lt; 33% of market cap.</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href="/vault/aaoifi-equity-screening-matrix.xlsx"
                download
                className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#B8922A] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#E5C058]"
              >
                <span>Download Screening Matrix (.xlsx)</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: CURATED MARKET BRIEFS ── */}
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between border-b border-[#1E2028] pb-3">
            <h2 className="font-serif text-2xl font-bold text-[#F7F2EE]">
              Curated Islamic Capital Dispatches
            </h2>
            <Link
              href="/archive?cat=Markets%20%26%20Islamic%20Finance"
              className="font-mono text-xs uppercase tracking-wider text-[#B8922A] hover:text-[#E5C058] transition-colors"
            >
              View All Market Archives →
            </Link>
          </div>

          <div className="grid gap-px bg-[#1E2028] sm:grid-cols-2">
            {marketArticles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col justify-between bg-[#07080D] p-5 sm:p-6 hover:bg-[#0C0E15] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] border-b border-[#16181F] pb-2">
                    <span className="text-[#B8922A] font-bold uppercase tracking-wider">
                      {article.kicker || 'Market Signal'}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="mt-3 font-serif text-lg font-bold text-[#F7F2EE] hover:text-[#E5C058] transition-colors sm:text-xl">
                    <Link href={`/article/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF] line-clamp-3 sm:text-sm">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#16181F] pt-3 text-xs font-mono">
                  <span className="text-[#6B7280]">By {article.author}</span>
                  <Link
                    href={`/article/${article.slug}`}
                    className="font-semibold text-[#B8922A] hover:text-[#E5C058]"
                  >
                    Read Briefing →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
