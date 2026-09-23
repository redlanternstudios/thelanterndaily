'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StructuredStory } from '@/lib/types/editorial';
import EditorialStatusBadge from './EditorialStatusBadge';
import HalalBadge from '../HalalBadge';

interface LeadInvestigationCardProps {
  story: StructuredStory;
}

export default function LeadInvestigationCard({ story }: LeadInvestigationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/article/${story.slug}` : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.headline,
          text: story.summary,
          url,
        });
      } catch {
        // User cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="relative flex flex-col justify-between border border-[#1E2028] bg-[#0A0C12] p-6 transition-all hover:border-[#2A2D35] sm:p-8">
      {/* Top Metadata Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A1F2E] pb-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D92532]">
              {story.category}
            </span>
            <span className="text-[#2A2D35]">|</span>
            <EditorialStatusBadge status={story.editorialStatus} confidence={story.confidence} />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            {story.halalStance && <HalalBadge stance={story.halalStance} size="sm" />}
            <span className="text-[#4B5563]">·</span>
            <span>{story.readTimeMinutes} min read</span>
          </div>
        </div>

        {/* Primary Headline */}
        <h2 className="mt-5 font-serif text-2xl font-extrabold leading-[1.2] tracking-tight text-[#F7F2EE] transition-colors hover:text-white sm:text-3xl lg:text-4xl">
          <Link href={`/article/${story.slug}`} className="hover:text-[#E5C058] transition-colors">
            {story.headline}
          </Link>
        </h2>

        {/* 2-3 Line Crisp Factual Summary */}
        <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
          {story.summary}
        </p>

        {/* Sourcing & Provenance Strip */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#16181F] pt-4 text-xs font-mono text-[#6B7280]">
          <div>
            <span className="text-[#9CA3AF]">Primary Source: </span>
            <a
              href={story.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D1D5DB] underline decoration-[#4B5563] underline-offset-2 transition-colors hover:text-[#B8922A]"
            >
              {story.sourceName} ↗
            </a>
          </div>
          <span className="text-[#2A2D35]">·</span>
          <div>
            <span className="text-[#9CA3AF]">Published: </span>
            <span>{story.sourcePublishedAt}</span>
          </div>
          <span className="text-[#2A2D35]">·</span>
          <div>
            <span className="text-[#9CA3AF]">Verified: </span>
            <span className="text-[#4ADE80]">{story.lastVerifiedAt}</span>
          </div>
          <span className="text-[#2A2D35]">·</span>
          <div>
            <span className="text-[#9CA3AF]">Reviewer: </span>
            <span className="text-[#D1D5DB]">{story.authorOrReviewer}</span>
          </div>
        </div>

        {/* Progressive Disclosure: Islamic Lens & Sacred Ethics Accordion */}
        {story.islamicLens && (
          <details className="group mt-6 border-l-2 border-[#B8922A] bg-[#0E1118] text-xs">
            <summary className="flex min-h-[44px] cursor-pointer items-center justify-between px-4 py-2 font-mono font-bold uppercase tracking-wider text-[#B8922A] select-none hover:text-[#E5C058]">
              <span className="flex items-center gap-2">
                <span>✦</span>
                <span>The Islamic Lens & Ethical Covenants</span>
              </span>
              <span className="transition-transform duration-200 group-open:rotate-180">▼</span>
            </summary>
            <div className="border-t border-[#1E2028] px-4 py-3.5 leading-relaxed text-[#D1D5DB] space-y-3">
              <p>{story.islamicLens}</p>

              {story.pullQuote && (
                <div className="mt-3 border-l-2 border-[#B8922A]/40 pl-3 pt-1 text-[11px] italic text-[#E5C058]">
                  <p>&ldquo;{story.pullQuote.text}&rdquo;</p>
                  <p className="mt-1 font-mono not-italic text-[#9CA3AF]">
                    — {story.pullQuote.narrator || 'Classical Source'} ({story.pullQuote.source})
                  </p>
                </div>
              )}
            </div>
          </details>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A1F2E] pt-5">
        <Link
          href={`/article/${story.slug}`}
          className="inline-flex min-h-[44px] items-center gap-2 bg-[#D92532] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#BF1F2B]"
        >
          <span>{story.primaryActionLabel || 'Read Full Briefing'}</span>
          <span>→</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 font-mono text-xs text-[#9CA3AF] transition-colors hover:text-[#B8922A]"
          >
            <span>Primary Wire</span>
            <span>↗</span>
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex min-h-[44px] items-center gap-1.5 border border-[#1E2028] px-3.5 py-2 font-mono text-xs text-[#9CA3AF] transition-all hover:border-[#2A2D35] hover:text-[#F7F2EE]"
            aria-label="Share story link"
          >
            <span>{copied ? 'Copied ✓' : 'Share'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
