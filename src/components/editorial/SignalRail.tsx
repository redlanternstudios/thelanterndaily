import React from 'react';
import Link from 'next/link';
import { StructuredStory } from '@/lib/types/editorial';
import EditorialStatusBadge from './EditorialStatusBadge';

interface SignalRailProps {
  secondaryStories: StructuredStory[];
  marketMicroTicker?: {
    label: string;
    value: string;
    change: string;
    up: boolean;
  }[];
}

export default function SignalRail({
  secondaryStories,
  marketMicroTicker,
}: SignalRailProps) {
  return (
    <aside className="flex flex-col gap-6">
      {/* Real-time Sovereign Markets Micro-Row */}
      {marketMicroTicker && marketMicroTicker.length > 0 && (
        <div className="border border-[#1E2028] bg-[#0A0C12] p-4">
          <div className="mb-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#B8922A]">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              Sovereign Benchmarks
            </span>
            <Link href="/markets" className="text-[#9CA3AF] hover:text-[#F7F2EE]">
              Full Board →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {marketMicroTicker.map((item) => (
              <div key={item.label} className="border border-[#16181F] bg-[#07080D] p-2">
                <div className="text-[10px] text-[#9CA3AF] truncate">{item.label}</div>
                <div className="mt-1 flex items-baseline justify-between font-bold">
                  <span className="text-[#F7F2EE]">{item.value}</span>
                  <span className={item.up ? 'text-[#4ADE80]' : 'text-[#F87171]'}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest Signals Header */}
      <div className="border border-[#1E2028] bg-[#0A0C12] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[#1A1F2E] pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D92532]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#F7F2EE]">
              Signal Rail · Secondary Briefings
            </h3>
          </div>
          <span className="font-mono text-[11px] text-[#6B7280]">Real-Time Desk</span>
        </div>

        {/* Stories List */}
        <div className="divide-y divide-[#16181F]">
          {secondaryStories.map((story) => (
            <div key={story.id} className="py-4 first:pt-4 last:pb-0">
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                <span className="font-bold text-[#B8922A] uppercase tracking-wider truncate">
                  {story.category}
                </span>
                <EditorialStatusBadge status={story.editorialStatus} confidence={story.confidence} />
              </div>

              <h4 className="mt-2 font-serif text-base font-bold leading-snug text-[#F7F2EE] hover:text-[#E5C058] transition-colors">
                <Link href={`/article/${story.slug}`}>{story.headline}</Link>
              </h4>

              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#9CA3AF]">
                {story.summary}
              </p>

              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                <span>
                  Via{' '}
                  <a
                    href={story.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9CA3AF] hover:text-[#F7F2EE] underline decoration-[#2A2D35]"
                  >
                    {story.sourceName}
                  </a>
                </span>
                <span>{story.readTimeMinutes}m read</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
