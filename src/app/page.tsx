<<<<<<< HEAD
import Nav from "@/components/Nav";
import TickerStrip from "@/components/TickerStrip";
import HeroSection from "@/components/HeroSection";
import IntelligenceWall from "@/components/IntelligenceWall";
import SignalsSection from "@/components/SignalsSection";
import SubscribeForm from "@/components/SubscribeForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <TickerStrip />
      <main className="page" style={{ paddingTop: "88px" }}>
        <HeroSection />
        <IntelligenceWall />
        <SignalsSection />
        <SubscribeForm />
      </main>
      <Footer />
    </>
=======
import Link from 'next/link';
import TickerStrip from '@/components/TickerStrip';
import SubscribeForm from '@/components/SubscribeForm';
import IssueCard from '@/components/IssueCard';
import ShortsCard from '@/components/ShortsCard';

const FEATURED_ISSUE = {
  slug: 'signal-vs-noise-2026',
  title: 'Signal vs. Noise: How We Read the Room in 2026',
  excerpt: 'In an era of algorithmic chaos and manufactured consensus, the operators who win are the ones who learn to read the room before the room reads itself.',
  date: 'Jun 13, 2026',
  category: 'STRATEGY',
  tier: 'free' as const,
  readTime: '8 min',
  imageUrl: '',
};

const WALL_ITEMS = [
  { slug: 'dxy-dollar-dominance', title: 'DXY & Dollar Dominance', excerpt: 'The dollar isn\'t weakening — everything else is. Why DXY at 104 means more than you think.', date: 'Jun 12', category: 'MACRO', tier: 'free' as const },
  { slug: 'ai-infrastructure-boom', title: 'AI Infrastructure: The Forgotten Layer', excerpt: 'Everyone\'s watching models. The smart money is watching the pipes. Data center buildout is up 340% YoY.', date: 'Jun 11', category: 'TECH', tier: 'premium' as const },
  { slug: 'china-manufacturing-pmi', title: 'China PMI: The Unwind Begins', excerpt: 'The manufacturing engine that powered global growth for two decades is stalling. Here\'s what replaces it.', date: 'Jun 10', category: 'MACRO', tier: 'premium' as const },
  { slug: 'energy-transition-reality', title: 'Energy Transition Hits Reality', excerpt: 'The gap between ambition and infrastructure is widening. Grid capacity, permitting, and the mineral squeeze.', date: 'Jun 9', category: 'ENERGY', tier: 'free' as const },
  { slug: 'defense-tech-cycle', title: 'The New Defense Tech Cycle', excerpt: 'Public markets are waking up to defense tech. But the real action is in private primaries.', date: 'Jun 8', category: 'DEFENSE', tier: 'premium' as const },
  { slug: 'institutional-btc-flow', title: 'Institutional BTC: The Steady Hand', excerpt: 'Quiet accumulation, not volatility. The institutional bid is the real story beneath the price action.', date: 'Jun 7', category: 'CRYPTO', tier: 'free' as const },
];

const SHORTS_ITEMS = [
  { tag: 'MACRO', date: 'Jun 13', body: 'Japan 10-year JGB yield hits 1.2% — highest since 2011. BOJ normalization is real, and it\'s reshaping global carry trade dynamics.' },
  { tag: 'TECH', date: 'Jun 13', body: 'OpenAI launches o5 with native code execution. Early benchmarks show 40% improvement on complex reasoning tasks.' },
  { tag: 'ENERGY', date: 'Jun 12', body: 'Texas grid sets new demand record at 82 GW. ERCOT issues voluntary conservation notice. Summer hasn\'t peaked yet.' },
];

const SIDEBAR_ISSUES = [
  { slug: 'semiconductor-geopolitics', title: 'Semiconductor Geopolitics: The New Front', excerpt: 'Export controls are just the beginning. The next phase is fabrication sovereignty.', date: 'Jun 6', category: 'GEOPOLITICS', tier: 'premium' as const },
  { slug: 'software-defined- warfare', title: 'Software-Defined Warfare', excerpt: 'The battlefield is now a stack. Whoever controls the API controls the escalation ladder.', date: 'Jun 5', category: 'DEFENSE', tier: 'premium' as const },
];

export default function HomePage() {
  return (
    <div className="atmos-dark">
      <TickerStrip />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="atmos-glow absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-lantern-accent animate-pulse" />
                <span className="text-xs font-mono text-lantern-accent uppercase tracking-widest">Live Intelligence Feed</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Signal Before
                <span className="block text-lantern-accent">Consensus</span>
              </h1>
              <p className="text-base sm:text-lg text-lantern-muted-text leading-relaxed max-w-lg mb-8">
                Daily intelligence briefings for the modern operator. We filter the noise so you can move before the herd.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div>
                  <p className="font-mono text-2xl font-bold text-lantern-text">14,200+</p>
                  <p className="text-xs text-lantern-muted-text mt-1">Operators subscribed</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-lantern-text">47</p>
                  <p className="text-xs text-lantern-muted-text mt-1">Countries reached</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-lantern-text">340+</p>
                  <p className="text-xs text-lantern-muted-text mt-1">Briefings delivered</p>
                </div>
              </div>

              {/* Subscribe */}
              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-lantern-muted-text mb-3">
                  Join the network
                </p>
                <SubscribeForm variant="large" placeholder="you@domain.com" buttonText="Get Signal" />
              </div>
            </div>

            {/* Right: Featured Issue Card */}
            <div className="hidden lg:block">
              <IssueCard {...FEATURED_ISSUE} />
            </div>
          </div>
        </div>
      </section>

      {/* INTELLIGENCE WALL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">The Intelligence Wall</h2>
            <p className="text-sm text-lantern-muted-text">Today&apos;s essential briefings, curated and ranked.</p>
          </div>
          <Link href="/archive" className="hidden sm:inline-flex items-center gap-1 text-sm text-lantern-accent hover:text-lantern-accent/80 transition-colors">
            View all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WALL_ITEMS.map((item) => (
            <IssueCard key={item.slug} {...item} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/archive" className="text-sm text-lantern-accent hover:text-lantern-accent/80">
            View all briefings →
          </Link>
        </div>
      </section>

      {/* RECENT SIGNALS / SHORTS */}
      <section className="border-t border-lantern-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main: Recent Signals */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Recent Signals</h2>
                  <p className="text-sm text-lantern-muted-text">Short-form intelligence for the time-constrained operator.</p>
                </div>
                <Link href="/shorts" className="hidden sm:inline-flex items-center gap-1 text-sm text-lantern-accent hover:text-lantern-accent/80 transition-colors">
                  All signals
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>

              <div className="space-y-4">
                {SHORTS_ITEMS.map((item, i) => (
                  <ShortsCard key={i} {...item} />
                ))}
              </div>

              <div className="mt-6 text-center sm:hidden">
                <Link href="/shorts" className="text-sm text-lantern-accent hover:text-lantern-accent/80">
                  All signals →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-lantern-accent mb-6">
                  Premium Briefings
                </h3>
                <div className="space-y-6">
                  {SIDEBAR_ISSUES.map((item) => (
                    <IssueCard key={item.slug} {...item} />
                  ))}
                </div>

                <div className="mt-8 atmos-card border border-lantern-border/30 rounded-xl p-6 text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-lantern-accent/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-lantern-accent">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-lg font-bold mb-2">Go Premium</h4>
                  <p className="text-sm text-lantern-muted-text mb-4">
                    Unlock deep-dive analysis, exclusive briefings, and early access.
                  </p>
                  <SubscribeForm placeholder="you@domain.com" buttonText="Upgrade" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="border-t border-lantern-border/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            Join 14,200+ Operators
          </h2>
          <p className="text-sm text-lantern-muted-text mb-8 max-w-lg mx-auto">
            Get the signal before the consensus. Daily briefings delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <SubscribeForm variant="large" placeholder="you@domain.com" buttonText="Get The Signal" />
          </div>
        </div>
      </section>
    </div>
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
  );
}
