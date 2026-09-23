'use client';

import React, { useState } from 'react';
import HalalBadge from './HalalBadge';

export interface VideoCardProps {
  id?: string;
  videoId: string;
  title: string;
  creatorName: string;
  creatorHandle: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  aiSummary: string;
  halalStance?: string;
}

export default function VideoCard({
  videoId,
  title,
  creatorName,
  creatorHandle,
  thumbnailUrl,
  durationSeconds,
  aiSummary,
  halalStance = 'halal',
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const defaultThumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <article className="overflow-hidden rounded-xl border border-[#2A2D35] bg-[#0D0F14] transition-all hover:border-[#3E434F]">
      {/* Video Container / Thumbnail Player */}
      <div className="relative aspect-video w-full bg-[#050608]">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="group relative h-full w-full cursor-pointer"
          >
            <img
              src={defaultThumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/10" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D92532]/90 text-white shadow-lg transition-transform duration-200 group-hover:scale-110 group-hover:bg-[#D92532]">
                <svg className="ml-1 h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration Badge */}
            {durationSeconds && (
              <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-0.5 font-mono text-[11px] font-medium text-white">
                {formatDuration(durationSeconds)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#F7F2EE]">{creatorName}</span>
            <span className="font-mono text-[#9CA3AF]">{creatorHandle}</span>
          </div>
          <HalalBadge stance={halalStance} size="sm" />
        </div>

        <h4 className="mb-2 font-serif text-lg font-bold leading-snug text-[#F7F2EE]">
          {title}
        </h4>

        <p className="text-xs leading-relaxed text-[#9CA3AF]">
          <span className="font-semibold text-[#B8922A]">The Take: </span>
          {aiSummary}
        </p>

        <div className="mt-4 flex items-center justify-end border-t border-[#1F2430] pt-3 text-xs">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#9CA3AF] hover:text-[#B8922A]"
          >
            <span>Watch on YouTube</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
