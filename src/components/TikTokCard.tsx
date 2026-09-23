'use client';

import React from 'react';
import HalalBadge from './HalalBadge';

export interface TikTokCardProps {
  id?: string;
  creatorHandle: string;
  creatorName?: string;
  videoUrl: string;
  aiSummary: string;
  halalStance?: string;
  oembedHtml?: string;
}

export default function TikTokCard({
  creatorHandle,
  creatorName,
  videoUrl,
  aiSummary,
  halalStance = 'halal',
  oembedHtml,
}: TikTokCardProps) {
  // Extract video ID if possible
  const match = videoUrl.match(/\/video\/(\d+)/);
  const videoId = match ? match[1] : null;

  return (
    <article className="overflow-hidden rounded-xl border border-[#2A2D35] bg-[#0D0F14] p-5 transition-all hover:border-[#3E434F]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-[#F7F2EE]">{creatorName || creatorHandle}</span>
          <span className="font-mono text-[#9CA3AF]">{creatorHandle}</span>
        </div>
        <HalalBadge stance={halalStance} size="sm" />
      </div>

      {/* Embed Container */}
      <div className="relative mb-3 aspect-[9/16] max-h-[480px] w-full overflow-hidden rounded-lg bg-[#050608]">
        {oembedHtml ? (
          <div
            className="flex h-full w-full items-center justify-center"
            dangerouslySetInnerHTML={{ __html: oembedHtml }}
          />
        ) : videoId ? (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${videoId}`}
            className="h-full w-full border-0"
            allow="encrypted-media;"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <span className="mb-2 text-3xl">📱</span>
            <p className="text-xs text-[#9CA3AF]">Featured TikTok insight by {creatorHandle}</p>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded bg-[#1A1F2C] px-3 py-1.5 text-xs font-semibold text-[#F7F2EE] hover:bg-[#2A2D35]"
            >
              Open on TikTok ↗
            </a>
          </div>
        )}
      </div>

      {/* AI Summary */}
      <p className="text-xs leading-relaxed text-[#9CA3AF]">
        <span className="font-semibold text-[#B8922A]">The Take: </span>
        {aiSummary}
      </p>
    </article>
  );
}
