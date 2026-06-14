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