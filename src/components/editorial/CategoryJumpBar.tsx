'use client';

import React from 'react';
import { CANONICAL_CATEGORIES, CATEGORY_DEFINITIONS } from '@/lib/taxonomy';

export default function CategoryJumpBar() {
  const scrollToAnchor = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sticky top-16 z-40 w-full border-b border-[#1E2028] bg-[#07080D]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex w-full items-center gap-1 overflow-x-auto py-2.5 no-scrollbar sm:gap-2">
          <span className="hidden pr-3 font-mono text-[11px] font-bold uppercase tracking-widest text-[#B8922A] lg:inline-block">
            Pillars
          </span>
          <span className="hidden text-[#2A2D35] lg:inline-block">|</span>

          {CANONICAL_CATEGORIES.map((cat) => {
            const def = CATEGORY_DEFINITIONS[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => scrollToAnchor(def.slug)}
                className="inline-flex min-h-[44px] flex-shrink-0 items-center border border-transparent px-3 py-2 font-mono text-xs uppercase tracking-wider text-[#9CA3AF] transition-all hover:border-[#2A2D35] hover:bg-[#0D0F14] hover:text-[#F7F2EE] active:text-[#B8922A]"
                aria-label={`Jump to ${def.name}`}
              >
                <span className="mr-1.5 opacity-40">#</span>
                <span>{def.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
