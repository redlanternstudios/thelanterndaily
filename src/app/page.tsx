'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Masthead from '../components/Masthead';
import NewsCard from '../components/NewsCard';
import VideoCard from '../components/VideoCard';
import TikTokCard from '../components/TikTokCard';
import SectionHeader from '../components/SectionHeader';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('error');
      }
    } catch {
      setSubscribeStatus('error');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE]">
      <Masthead />
      {/* ── Top Masthead / Daily Briefing Bar ── */}
      <header className="border-b border-[#1A1F2E] px-4 py-4 sm:px-6 sm:py-5">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-1.5 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <span className="font-serif text-sm tracking-wider text-[#B8922A]" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </span>
            <span className="text-[#4B5563]">·</span>
            <span>3 Rabi Al-Awwal 1448</span>
            <span className="text-[#4B5563]">·</span>
            <span className="font-semibold text-[#D1D5DB]">Wednesday, September 23, 2026</span>
          </div>

          <h1 className="font-serif text-2xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-4xl">
            The Daily Briefing.
          </h1>

          <p className="mx-auto mt-1 max-w-lg text-xs leading-relaxed text-[#9CA3AF] sm:text-sm">
            What the world is reading today — distilled through the lens of clarity, ethical technology, and Islamic sovereignty.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#2A2D35] bg-[#0D0F14] px-3.5 py-1 text-[11px] font-mono text-[#D1D5DB]">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D92532]" />
              6 Lead Stories
            </span>
            <span className="text-[#4B5563]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8922A]" />
              2 Curated Videos
            </span>
            <span className="text-[#4B5563]">·</span>
            <span className="text-[#9CA3AF]">~4 Min Read</span>
          </div>
        </div>
      </header>

      {/* ── Main Content Feed (Max Width 48rem for focused reading) ── */}
      <main className="mx-auto max-w-3xl px-4 pt-4 pb-12 sm:px-6">

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: TECH & AI INFRASTRUCTURE (LEADS THE DAILY)              */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader section="tech" storyCount={4} />

          <div className="space-y-8">
            {/* Story 1: Lead Investigative Briefing */}
            <NewsCard
              headline="The Quiet Rise of Muslim-Built AI Infrastructure"
              slug="the-quiet-rise-of-muslim-built-ai-infrastructure"
              summary="From Karachi to Cairo to Detroit, a new generation of founders is building the rails for the agent economy — and doing it on their own terms. We spent three months mapping the operators turning principle into product."
              islamicLens="The infrastructure layer being built here is structurally halal — equity-based funding, no interest-bearing instruments in the stack, and founders who are explicitly building away from VC models that require riba-adjacent growth metrics. The concern is downstream: once the rails are built, what rides on them? Sovereignty requires not just owning the servers, but establishing the ethical covenants governing the agentic workflows running on top."
              halalStance="halal"
              outletCount={4}
              outlets={['The Lantern Daily', 'Wired', 'Sovereign AI Review', 'Rest of World']}
              sourceUrl="https://thelanterndaily.com/article/the-quiet-rise-of-muslim-built-ai-infrastructure"
              pullQuoteText="The strong believer is better and more beloved to Allah than the weak believer, while there is good in both."
              pullQuoteNarrator="Prophet Muhammad ﷺ"
              pullQuoteSource="Sahih Muslim 2664"
              readTimeMinutes={5}
            />

            {/* Story 2 */}
            <NewsCard
              headline="Google's Gemini AI Broke Into 3 Real Companies' Systems During Cybersecurity Red-Team Test"
              summary="Researchers confirmed Gemini was deployed as an autonomous cyber tool and successfully penetrated protected production systems across three active corporations."
              islamicLens="When commercial AI can breach corporate defenses autonomously, Muslim-owned enterprises and Islamic fintech platforms become high-value targets operating without an AI defense layer of their own. The asymmetry between those building offensive algorithmic tools and those merely consuming them is widening daily. Sovereignty demands that our community actively builds and audits its own technical systems, rather than assuming cloud safety is guaranteed."
              halalStance="concern"
              outletCount={5}
              outlets={['TechCrunch', 'Bloomberg Tech', 'CNBC Tech', 'Ars Technica', 'Fox Business']}
              sourceUrl="https://www.cnbc.com/technology/"
              pullQuoteText="There should be neither harming nor reciprocating harm (La darara wa la dirar)."
              pullQuoteNarrator="Prophet Muhammad ﷺ"
              pullQuoteSource="Sunan Ibn Majah 2341 · Sahih"
              readTimeMinutes={4}
            />

            {/* Story 2 */}
            <NewsCard
              headline="Google Unveils 'Googlebook' Laptops at $899 — Entire Hardware Line Built Natively Around Gemini"
              summary="Google announced five new hardware models launching October 4, positioning device silicon directly around real-time Gemini processing and system-level telemetry."
              islamicLens="Every major hardware platform is transforming into an AI collection terminal. For Muslim consumers and business operators, the question is not whether the device is fast, but where our behavioral data and cognitive patterns flow. When your primary computing device is engineered to observe and anticipate your daily actions, the preservation of Hayaa' (privacy) and Aql (cognitive autonomy) becomes an architectural issue."
              halalStance="nuanced"
              outletCount={3}
              outlets={['TechCrunch', 'The Verge', 'Wired']}
              sourceUrl="https://techcrunch.com/"
              readTimeMinutes={3}
            />

            {/* Story 3 */}
            <NewsCard
              headline="OpenAI and Anthropic Nearly Signed a Deal to Stress-Test Each Other's AI Models — Talks Fell Through"
              summary="The two leading artificial intelligence laboratories held high-level discussions to conduct mutual safety red-teaming, but negotiations collapsed over proprietary model access."
              islamicLens="The refusal of the two dominant frontier AI labs to submit to reciprocal safety oversight reveals the structural fragility of self-regulated technology. When systemic harm can be deployed at global scale, collective responsibility cannot be subordinated to commercial secrecy. Amanah (the sacred trust of stewardship) requires transparent benchmarks, not private agreements."
              halalStance="nuanced"
              outletCount={3}
              outlets={['The Information', 'Bloomberg Tech', 'Ars Technica']}
              sourceUrl="https://www.bloomberg.com/technology"
              readTimeMinutes={4}
            />
          </div>
        </section>

        {/* ── Interleaved Video 1: YouTube Scholar/Tech Insight ── */}
        <section className="my-12">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-[#B8922A]">✦ Featured Video Briefing</span>
            <span className="text-[#9CA3AF]">Curated Channel</span>
          </div>
          <VideoCard
            videoId="dQw4w9WgXcQ"
            title="Understanding Wealth, Debt & Sovereignty in the Modern Economy"
            creatorName="Yaqeen Institute"
            creatorHandle="@YaqeenInstitute"
            durationSeconds={745}
            aiSummary="A scholarly breakdown on how fiat debt instruments trap modern households, and why building equity-based halal alternatives is a religious imperative."
            halalStance="halal"
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: FINANCE, RIBA & MARKETS                                 */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader section="finance" storyCount={2} />

          <div className="space-y-8">
            {/* Story 4 */}
            <NewsCard
              headline="Sub-6% Mortgage Rates Disappear as Federal Reserve Signals Extended Higher-For-Longer Policy"
              summary="National averages for 30-year fixed rate loans pushed back above 6.2%, forcing mortgage originators to pull sub-6% teaser products from consumer markets."
              islamicLens="Every shift in benchmark borrowing rates highlights the fragility of an economic foundation anchored in interest. For Muslim families seeking shelter, rising rates increase the financial burden of conventional compounding debt. The path forward requires scaling genuine diminishing-musharakah and murabaha institutions — where risk and asset ownership are shared transparently."
              halalStance="concern"
              outletCount={3}
              outlets={['Yahoo Finance', 'CNBC', 'MarketWatch']}
              sourceUrl="https://finance.yahoo.com"
              pullQuoteText="Allah has permitted trade and has forbidden interest (riba)."
              pullQuoteNarrator="The Holy Quran"
              pullQuoteSource="Surah Al-Baqarah 2:275"
              readTimeMinutes={4}
            />

            {/* Story 5 */}
            <NewsCard
              headline="Bitcoin Surges Past $85,000 to Highest Level Since January Amid Institutional Treasury Inflows"
              summary="Renewed corporate balance sheet purchases and sovereign wealth allocations drove digital asset valuations sharply higher, reigniting the macro crypto debate."
              islamicLens="The OIC Fiqh Academy and contemporary jurists continue to evaluate digital assets based on whether they function as productive mediums of exchange or speculative gambling vehicles (maysir). The deeper concern for the Ummah is infrastructure ownership: when Bitcoin rallies, who controls the custody and exchange rails? Participation without sovereign custody remains financial extraction."
              halalStance="nuanced"
              outletCount={2}
              outlets={['CNBC Tech', 'MarketWatch']}
              sourceUrl="https://www.cnbc.com/"
              pullQuoteText="Do not sell what you do not possess."
              pullQuoteNarrator="Prophet Muhammad ﷺ"
              pullQuoteSource="Sunan Abi Dawud 3503 · Sahih"
              readTimeMinutes={3}
            />
          </div>
        </section>

        {/* ── Interleaved Video 2: TikTok Micro-Insight ── */}
        <section className="my-12">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-[#D92532]">✦ 60-Second Micro Take</span>
            <span className="text-[#9CA3AF]">TikTok Feed</span>
          </div>
          <TikTokCard
            creatorHandle="@islamicfinanceguru"
            creatorName="IFG Money Brief"
            videoUrl="https://www.tiktok.com/@islamicfinanceguru/video/73918239012"
            aiSummary="Three common student loan and pension screening traps that Muslim professionals accidentally overlook."
            halalStance="halal"
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: WORLD & UMMAH SIGNALS                                   */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader section="world" storyCount={2} />

          <div className="space-y-8">
            {/* Story 6 */}
            <NewsCard
              headline="Trump Holds Formal Bilateral Meeting With NYC Mayor Zohran Mamdani Ahead of UN General Assembly"
              summary="The meeting on the Mayor's home turf marks the first major policy dialogue between the White House and the first practicing Muslim executive of New York City."
              islamicLens="A practicing Muslim statesman negotiating directly with the presidency of the United States on behalf of eight million citizens represents a notable milestone in civic engagement. Leadership in Islam is rooted in service and upholding justice regardless of political pressure. The expectation for Muslim public servants is unwavering fidelity to the welfare of the vulnerable."
              halalStance="halal"
              outletCount={2}
              outlets={['Fox News', 'CNBC', 'The Guardian']}
              sourceUrl="https://www.theguardian.com/"
              pullQuoteText="O you who have believed, be persistently standing firm in justice, witnesses for Allah."
              pullQuoteNarrator="The Holy Quran"
              pullQuoteSource="Surah An-Nisa 4:135"
              readTimeMinutes={3}
            />

            {/* Story 7 */}
            <NewsCard
              headline="White House Television Pool Suspends Event Coverage Following Controversial Media Organization Bans"
              summary="CNN, MSNBC, and Politico filed joint federal lawsuits challenging credential restrictions, prompting the unified press pool to halt broadcast operations."
              islamicLens="When public authorities restrict independent observation of state power, minority communities are inevitably the most vulnerable to informational blindness. Transparent record-keeping and truthful testimony are foundational Quranic imperatives. Media accountability must be defended on principle, not partisan allegiance."
              halalStance="nuanced"
              outletCount={2}
              outlets={['Fox News', 'CNBC']}
              sourceUrl="https://www.cnbc.com/"
              readTimeMinutes={3}
            />
          </div>
        </section>

        {/* ── Email Newsletter Capture ── */}
        <section id="subscribe" className="my-16 rounded-2xl border border-[#B8922A]/30 bg-gradient-to-b from-[#12151D] to-[#0D0F14] p-8 text-center sm:p-12">
          <div className="mb-2 text-2xl">🕯️</div>
          <h3 className="font-serif text-2xl font-bold text-[#F7F2EE] sm:text-3xl">
            Wake up to clarity every morning.
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-[#9CA3AF] sm:text-sm">
            Join 18,000+ Muslim founders, engineers, and professionals. 5 essential stories, grounded in ethical principles, delivered to your inbox at 6:00 AM EST.
          </p>

          {subscribeStatus === 'success' ? (
            <div className="mx-auto mt-6 max-w-md rounded-lg border border-[#2D7A4F] bg-[#2D7A4F]/10 p-4 text-xs font-semibold text-[#4ADE80]">
              ✓ You&apos;re in. Check your inbox for the morning confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="operator@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-lg border border-[#2A2D35] bg-[#07080D] px-4 py-3 text-xs text-[#F7F2EE] placeholder-[#6B7280] focus:border-[#B8922A] focus:outline-none"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="rounded-lg bg-[#D92532] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#BF1F2B] disabled:opacity-50"
              >
                {subscribing ? 'Joining...' : 'Subscribe Free'}
              </button>
            </form>
          )}

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#6B7280]">
            <span>100% Free daily edition</span>
            <span>·</span>
            <span>No spam</span>
            <span>·</span>
            <Link href="/vault" className="text-[#B8922A] hover:underline">
              Looking for datasets? Explore The Vault ↗
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1A1F2E] px-4 py-12 text-center text-xs text-[#6B7280]">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono">
            <Link href="/" className="text-[#9CA3AF] hover:text-[#F7F2EE]">Today</Link>
            <Link href="/vault" className="text-[#B8922A] hover:text-[#E5C058]">✦ The Vault</Link>
            <Link href="/creators" className="text-[#9CA3AF] hover:text-[#F7F2EE]">Creators</Link>
            <Link href="/stack" className="text-[#9CA3AF] hover:text-[#F7F2EE]">Build Stack</Link>
            <Link href="/archive" className="text-[#9CA3AF] hover:text-[#F7F2EE]">Archive</Link>
            <Link href="/about" className="text-[#9CA3AF] hover:text-[#F7F2EE]">About & Standards</Link>
          </div>
          <p>
            The Lantern Daily is an independent intelligence briefing by RedLantern Studios™.
          </p>
          <p className="text-[11px]">
            Classical citations verified against authentic Sahih Kutub al-Sittah and authoritative tafsir.
          </p>
        </div>
      </footer>
    </div>
  );
}
