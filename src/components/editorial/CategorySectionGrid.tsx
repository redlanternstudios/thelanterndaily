import React from 'react';
import Link from 'next/link';
import { CanonicalCategory, CATEGORY_DEFINITIONS } from '@/lib/taxonomy';
import { StructuredStory } from '@/lib/types/editorial';
import EditorialStatusBadge from './EditorialStatusBadge';
import HalalBadge from '../HalalBadge';

interface CategorySectionGridProps {
  category: CanonicalCategory;
  stories: StructuredStory[];
}

export default function CategorySectionGrid({
  category,
  stories,
}: CategorySectionGridProps) {
  const meta = CATEGORY_DEFINITIONS[category];

  if (!stories || stories.length === 0) return null;

  return (
    <section id={meta.slug} className="scroll-mt-32 border-t border-[#1E2028] pt-10">
      {/* Category Section Header */}
      <div className="mb-6 flex flex-col justify-between gap-2 border-b border-[#1A1F2E] pb-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: meta.accent }}
            />
            <h3 className="font-serif text-xl font-bold tracking-tight text-[#F7F2EE] sm:text-2xl">
              {meta.name}
            </h3>
          </div>
          <p className="mt-1 text-xs text-[#9CA3AF] sm:text-sm">
            {meta.tagline}
          </p>
        </div>

        <Link
          href={`/archive?cat=${encodeURIComponent(category)}`}
          className="font-mono text-xs uppercase tracking-wider text-[#B8922A] hover:text-[#E5C058] transition-colors"
        >
          View Section Archive ({stories.length}) →
        </Link>
      </div>

      {/* Asymmetrical 2-column editorial grid */}
      <div className="grid gap-px bg-[#1E2028] sm:grid-cols-2">
        {stories.map((story) => (
          <article
            key={story.id}
            className="flex flex-col justify-between bg-[#07080D] p-5 transition-colors hover:bg-[#0C0E15] sm:p-6"
          >
            <div>
              {/* Card Meta Top */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#16181F] pb-3 text-xs">
                <EditorialStatusBadge
                  status={story.editorialStatus}
                  confidence={story.confidence}
                />
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#6B7280]">
                  {story.halalStance && <HalalBadge stance={story.halalStance} size="sm" />}
                  <span>{story.readTimeMinutes}m read</span>
                </div>
              </div>

              {/* Headline */}
              <h4 className="mt-4 font-serif text-lg font-bold leading-snug text-[#F7F2EE] transition-colors hover:text-[#E5C058]">
                <Link href={`/article/${story.slug}`}>{story.headline}</Link>
              </h4>

              {/* Excerpt */}
              <p className="mt-2.5 text-xs leading-relaxed text-[#9CA3AF] line-clamp-3 sm:text-sm">
                {story.summary}
              </p>
            </div>

            {/* Bottom Provenance & Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#16181F] pt-3 font-mono text-xs">
              <div className="text-[#6B7280]">
                Source:{' '}
                <a
                  href={story.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9CA3AF] hover:text-[#F7F2EE] underline decoration-[#2A2D35]"
                >
                  {story.sourceName} ↗
                </a>
              </div>

              <Link
                href={`/article/${story.slug}`}
                className="font-semibold text-[#B8922A] hover:text-[#E5C058] transition-colors"
              >
                Read Briefing →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
