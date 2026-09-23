import React from 'react';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import EditionTimer from '@/components/EditionTimer';
import CategoryJumpBar from '@/components/editorial/CategoryJumpBar';
import LeadInvestigationCard from '@/components/editorial/LeadInvestigationCard';
import SignalRail from '@/components/editorial/SignalRail';
import CategorySectionGrid from '@/components/editorial/CategorySectionGrid';
import NewsletterBanner from '@/components/editorial/NewsletterBanner';
import {
  STRUCTURED_LEAD_INVESTIGATION,
  STRUCTURED_SECONDARY_SIGNALS,
  STRUCTURED_CATEGORY_STORIES,
  MARKET_SIGNALS,
} from '@/lib/content';
import { CANONICAL_CATEGORIES } from '@/lib/taxonomy';

export default function HomePage() {
  const marketMicroTicker = [
    { label: 'SPUS Sharia', value: '$148.20', change: '+0.85%', up: true },
    { label: 'Physical Gold', value: '$2,654.10', change: '+1.4%', up: true },
    { label: 'Compute 1M tok', value: '$0.42', change: '-6.3%', up: false },
    { label: 'Agent API MoM', value: '$2.1B', change: '+11.9%', up: true },
  ];

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F7F2EE] antialiased">
      {/* ── Persistent Navigation Masthead ── */}
      <Masthead />

      {/* ── Sticky Category Jump Navigation Strip ── */}
      <CategoryJumpBar />

      {/* ── Edition Header Bar & Real-Time Archival Countdown ── */}
      <header className="border-b border-[#1E2028] bg-[#0A0C12] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-[#9CA3AF]">
            <span className="font-serif text-sm tracking-wider text-[#B8922A]" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </span>
            <span className="text-[#3A3F4D]">·</span>
            <span className="text-[#D1D5DB]">3 Rabi Al-Awwal 1448</span>
            <span className="text-[#3A3F4D]">·</span>
            <span className="font-semibold text-[#F7F2EE]">Wednesday, September 23, 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <EditionTimer />
          </div>
        </div>
      </header>

      {/* ── Main Editorial 12-Column Grid Container (1200–1280px) ── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Section 1: Above-the-Fold Asymmetrical 12-Column Grid */}
        <section aria-label="Lead Intelligence & Real-Time Signals">
          <div className="mb-4 flex items-center justify-between border-b border-[#1A1F2E] pb-2 font-mono text-xs uppercase tracking-widest text-[#B8922A]">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D92532]" />
              Front Page Intelligence Briefing
            </span>
            <span className="text-[#6B7280]">06:00 AM EST Daily Cycle</span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start">
            {/* Primary Dominant Lead Investigation (Cols 1–7 / ~60%) */}
            <div className="lg:col-span-7 xl:col-span-8">
              <LeadInvestigationCard story={STRUCTURED_LEAD_INVESTIGATION} />
            </div>

            {/* Real-time Signal Rail & Secondary Briefings (Cols 8–12 / ~40%) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <SignalRail
                secondaryStories={STRUCTURED_SECONDARY_SIGNALS}
                marketMicroTicker={marketMicroTicker}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Canonical Category Matrices */}
        <div className="mt-16 space-y-16">
          {CANONICAL_CATEGORIES.map((category) => {
            const categoryStories = STRUCTURED_CATEGORY_STORIES[category] || [];
            return (
              <CategorySectionGrid
                key={category}
                category={category}
                stories={categoryStories}
              />
            );
          })}
        </div>

        {/* Section 3: Clean Sovereign Newsletter Conversion Banner */}
        <div className="mt-20">
          <NewsletterBanner />
        </div>
      </main>

      {/* ── Platform Footer ── */}
      <Footer />
    </div>
  );
}
