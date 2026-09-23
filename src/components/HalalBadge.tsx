import React from 'react';

export type HalalStance = 'halal' | 'nuanced' | 'concern' | 'blocked' | 'positive' | 'critical';

interface HalalBadgeProps {
  stance?: HalalStance | string | null;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export function HalalBadge({ stance, size = 'md', showDot = true }: HalalBadgeProps) {
  const raw = (stance || 'nuanced').toString().toLowerCase().trim();

  // Tier 1 / Green: positive, halal, sovereign, tier 1
  const isPositive =
    raw.includes('positive') ||
    raw.includes('halal') ||
    raw.includes('sovereign') ||
    raw.includes('tier 1');

  // Tier 3 / Red: critical, blocked, concern, predatory, tier 3
  const isCritical =
    raw.includes('critical') ||
    raw.includes('blocked') ||
    raw.includes('concern') ||
    raw.includes('predatory') ||
    raw.includes('tier 3');

  let label = '◈ NUANCED';
  let bg = 'rgba(184, 146, 42, 0.12)';
  let border = '#B8922A';
  let text = '#E5C058';
  let dot = '#B8922A';

  if (isPositive) {
    label = '✓ HALAL-ALIGNED';
    bg = 'rgba(45, 122, 79, 0.14)';
    border = '#2D7A4F';
    text = '#4ADE80';
    dot = '#2D7A4F';
  } else if (isCritical) {
    label = raw.includes('blocked') ? '✗ BLOCKED' : '⚠ CRITICAL CONCERN';
    bg = 'rgba(217, 37, 50, 0.14)';
    border = '#D92532';
    text = '#F87171';
    dot = '#D92532';
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-2.5 py-1 text-[11px]',
    lg: 'px-3 py-1.5 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider font-semibold transition-all select-none ${
        sizeStyles[size] || sizeStyles.md
      }`}
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        color: text,
      }}
    >
      {showDot && (
        <span
          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: dot }}
        />
      )}
      {label}
    </span>
  );
}

export default HalalBadge;
