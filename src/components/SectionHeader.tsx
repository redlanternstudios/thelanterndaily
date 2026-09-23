import React from 'react';

export type SectionType = 'tech' | 'finance' | 'world';

interface SectionHeaderProps {
  section: SectionType;
  storyCount?: number;
}

const SECTION_CONFIG = {
  tech: {
    icon: '🖥️',
    title: 'TECH & AI INFRASTRUCTURE',
    subtitle: 'What is moving in tech that the Ummah needs to build, govern, and master.',
    accentColor: '#D92532',
    pillBg: 'rgba(217, 37, 50, 0.12)',
    tag: 'LEAD SECTION',
  },
  finance: {
    icon: '💰',
    title: 'FINANCE, RIBA & MARKETS',
    subtitle: 'Macroeconomic shifts, halal investment theses, and sovereign capital signals.',
    accentColor: '#B8922A',
    pillBg: 'rgba(184, 146, 42, 0.12)',
    tag: 'MARKETS',
  },
  world: {
    icon: '🌍',
    title: 'WORLD & UMMAH SIGNALS',
    subtitle: 'Global events in their proper context. Clear, grounded, and anti-alarmist.',
    accentColor: '#2D7A4F',
    pillBg: 'rgba(45, 122, 79, 0.12)',
    tag: 'GLOBAL',
  },
};

export default function SectionHeader({ section, storyCount }: SectionHeaderProps) {
  const config = SECTION_CONFIG[section] || SECTION_CONFIG.tech;

  return (
    <div className="mb-4 border-b border-[#2A2D35] pb-3 pt-6 first-of-type:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{config.icon}</span>
          <h2 className="font-mono text-sm font-bold tracking-widest text-[#F7F2EE] sm:text-base">
            {config.title}
          </h2>
          <span
            className="rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: config.pillBg,
              color: config.accentColor,
              border: `1px solid ${config.accentColor}`,
            }}
          >
            {config.tag}
          </span>
        </div>

        {storyCount !== undefined && (
          <span className="font-mono text-xs text-[#9CA3AF]">
            {storyCount} {storyCount === 1 ? 'story' : 'stories'}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs text-[#9CA3AF] sm:text-sm">
        {config.subtitle}
      </p>
    </div>
  );
}
