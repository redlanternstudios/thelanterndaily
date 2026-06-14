'use client';

import { useRef } from 'react';
import { PLACEHOLDER_TICKER } from '@/lib/placeholder';

const urgencyColor = {
  low: 'text-text-tertiary',
  medium: 'text-text-secondary',
  high: 'text-accent-red',
};

export default function TickerStrip() {
  // Double the items for seamless loop
  const items = [...PLACEHOLDER_TICKER, ...PLACEHOLDER_TICKER];

  return (
    <div className="border-y border-border-subtle bg-bg-surface overflow-hidden py-2">
      <div className="ticker-track flex gap-12 whitespace-nowrap">
        {items.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-mono uppercase ${urgencyColor[item.urgency]}`}>
              {item.urgency === 'high' ? '●' : '○'}
            </span>
            <span className="text-sm text-text-primary">{item.text}</span>
            <span className="text-xs text-text-tertiary font-mono">{item.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}