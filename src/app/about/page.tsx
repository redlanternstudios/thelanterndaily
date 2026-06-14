<<<<<<< HEAD
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import SubscribeCTA from "@/components/home/SubscribeCTA";
import { SOCIAL_PROOF } from "@/lib/content";

const PRINCIPLES = [
  {
    title: "Signal over noise",
    body: "We publish what changes how you build, not what trends. Every dispatch earns its place in your inbox.",
  },
  {
    title: "Principle over hype",
    body: "Technology carries the values of its makers. We cover the people building with intention and accountability.",
  },
  {
    title: "Open by default",
    body: "Knowledge is a trust to be shared. We document in the open and credit the work of others generously.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Masthead />
      <Ticker />
      <main className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-12 sm:py-16">
        <header className="max-w-3xl">
          <span className="kicker">About</span>
          <h1 className="font-headline text-balance mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[var(--color-text)]">
            A Muslim-founded newsletter for the builders of the agent economy.
          </h1>
          <p className="mt-6 text-xl text-[var(--color-text-dim)] leading-relaxed text-pretty">
            The Lantern Daily is published by RedLantern Studios™ for founders,
            builders, and operators who want signal before consensus. We cover AI,
            markets, and tech through an Islamic lens — and we are read by{" "}
            {SOCIAL_PROOF}.
          </p>
        </header>

        <section className="mt-14 grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-[var(--color-card)] p-7">
              <span className="font-headline text-3xl text-[var(--color-red)]">
                {p.title}
              </span>
              <p className="mt-4 text-[var(--color-text-dim)] leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-16">
          <SubscribeCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
=======
import Link from "next/link"
import TickerStrip from "@/components/TickerStrip"

export default function AboutPage() {
  return (
    <div className="section page-container">
      <div className="max-w-2xl mx-auto space-y-12 pt-8">
        <div className="space-y-4">
          <h1 className="font-heading text-4xl">
            Signal Before <span className="text-accent-gold italic">Consensus</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The Lantern Daily is a curated intelligence brief for people who need to know what matters — 
            before it&apos;s consensus. Markets. Policy. Tech. Geopolitics. One email. Every morning.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-heading text-2xl">The Problem</h2>
          <p className="text-text-secondary leading-relaxed">
            Most news is noise. By the time a story reaches you through mainstream channels, 
            the signal has been diluted through aggregation, editorial filtering, and delay. 
            Information that moves markets or shifts policy is most valuable before consensus forms.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-heading text-2xl">Our Approach</h2>
          <p className="text-text-secondary leading-relaxed">
            We combine AI-powered curation with human editorial judgment. Our system monitors 
            100+ sources — central bank communications, regulatory filings, earnings transcripts, 
            geopolitical signals — and distills what matters into a single daily brief.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-2">
          <h3 className="font-heading font-semibold">By RedLantern Studios</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            The Lantern Daily is published by RedLantern Studios — a studio building 
            intelligence tools for the clear-minded. We believe the most valuable information 
            is the signal that arrives <span className="italic">before</span> consensus.
          </p>
        </div>

        <div className="border-t border-border-default pt-10">
          <div className="max-w-sm">
            <h3 className="font-heading text-xl mb-4">Get it in your inbox</h3>
            <SubscribeForm variant="hero" />
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> origin/main
