'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HalalBadge, { HalalStance } from './HalalBadge';
import PullQuote from './PullQuote';

export interface NewsCardProps {
  id?: string;
  headline: string;
  slug?: string;
  summary: string;
  islamicLens?: string;
  halalStance?: HalalStance | string;
  outletCount?: number;
  outlets?: string[];
  sourceUrl?: string;
  pullQuoteText?: string | null;
  pullQuoteSource?: string | null;
  pullQuoteNarrator?: string | null;
  pullQuoteArabic?: string | null;
  readTimeMinutes?: number;
}

export default function NewsCard({
  headline,
  slug,
  summary,
  islamicLens,
  halalStance = 'nuanced',
  outletCount = 1,
  outlets = [],
  sourceUrl,
  pullQuoteText,
  pullQuoteSource,
  pullQuoteNarrator,
  pullQuoteArabic,
  readTimeMinutes = 3,
}: NewsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: headline,
          text: `Read on The Lantern Daily: ${headline}`,
          url,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const outletDisplay = outlets && outlets.length > 0
    ? outlets.slice(0, 3).join(' · ') + (outletCount > 3 ? ` (+${outletCount - 3})` : '')
    : `${outletCount} Major Outlets`;

  return (
    <article className="group relative rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-6 transition-all hover:border-[#3E434F] hover:shadow-lg sm:p-7">
      {/* Meta Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#9CA3AF]">Seen on:</span>
          <span className="font-medium text-[#D1D5DB]">{outletDisplay}</span>
        </div>
        <div className="flex items-center gap-3">
          <HalalBadge stance={halalStance} size="sm" />
          <span className="font-mono text-[11px] text-[#6B7280]">{readTimeMinutes} min read</span>
        </div>
      </div>

      {/* Headline */}
      <h3 className="mb-3 font-serif text-xl font-bold leading-snug tracking-tight text-[#F7F2EE] transition-colors group-hover:text-white sm:text-2xl">
        {slug ? (
          <Link href={`/article/${slug}`} className="hover:text-[#B8922A] transition-colors">
            {headline}
          </Link>
        ) : (
          headline
        )}
      </h3>

      {/* 2-Sentence Factual Summary */}
      <p className="mb-5 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
        {summary}
      </p>

      {/* Islamic Lens Editorial Block */}
      {islamicLens && (
        <div className="mb-5 rounded-lg border-l-2 border-[#B8922A] bg-[#12151D] p-4 text-sm leading-relaxed text-[#E5E7EB] sm:p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[#B8922A]">🕯️</span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#B8922A]">
              Islamic Lens
            </span>
          </div>
          <div className="space-y-3 font-normal text-[#D1D5DB]">
            {islamicLens.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Option C Scholar Gold PullQuote */}
          {pullQuoteText && (
            <PullQuote
              quote={pullQuoteText}
              source={pullQuoteSource}
              narrator={pullQuoteNarrator}
              arabic={pullQuoteArabic}
            />
          )}
        </div>
      )}

      {/* Card Footer Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-[#1F2430] pt-4 text-xs font-medium">
        <div className="flex items-center gap-4">
          {slug && (
            <Link
              href={`/article/${slug}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#B8922A] transition-colors hover:text-[#E5C058]"
            >
              <span>Read Full Briefing</span>
              <span>→</span>
            </Link>
          )}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#9CA3AF] transition-colors hover:text-[#B8922A]"
            >
              <span>Primary Source</span>
              <span className="text-xs">↗</span>
            </a>
          ) : (
            <span className="text-[#6B7280]">Primary Source Verified</span>
          )}
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[#9CA3AF] transition-colors hover:bg-[#1A1F2C] hover:text-[#F7F2EE]"
          title="Share this story"
        >
          <span>{copied ? 'Link copied! ✓' : 'Share'}</span>
          <span>→</span>
        </button>
      </div>
    </article>
  );
}
