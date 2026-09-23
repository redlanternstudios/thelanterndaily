import React from 'react';

interface PullQuoteProps {
  quote: string;
  narrator?: string | null;
  source?: string | null;
  arabic?: string | null;
}

export default function PullQuote({ quote, narrator, source, arabic }: PullQuoteProps) {
  if (!quote) return null;

  return (
    <div
      className="my-5 rounded-lg border border-[#2A2D35] bg-[#0A0C13] p-5 shadow-sm transition-all"
      style={{
        borderLeft: '4px solid #B8922A',
      }}
    >
      {arabic && (
        <p
          className="mb-3 text-right font-serif text-lg leading-relaxed text-[#B8922A]"
          dir="rtl"
        >
          {arabic}
        </p>
      )}
      <p className="font-serif text-base italic leading-relaxed text-[#F7F2EE]">
        &ldquo;{quote}&rdquo;
      </p>
      {(narrator || source) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-[#B8922A]">
          {narrator && <span>— {narrator}</span>}
          {narrator && source && <span className="text-[#4B5563]">·</span>}
          {source && <span className="text-[#9CA3AF]">{source}</span>}
        </div>
      )}
    </div>
  );
}
