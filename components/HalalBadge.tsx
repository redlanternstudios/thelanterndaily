'use client';

import { HalalBadgeType, HALAL_BADGE_DEFINITIONS } from '@/data/lanternTypes';

interface HalalBadgeProps {
  type: HalalBadgeType;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export function HalalBadge({ type, size = 'md', showTooltip = false }: HalalBadgeProps) {
  const badge = HALAL_BADGE_DEFINITIONS[type];
  if (!badge) return null;

  const sizeMap = {
    sm: { fontSize: '9px', padding: '3px 8px', gap: '4px' },
    md: { fontSize: '10px', padding: '4px 10px', gap: '6px' },
    lg: { fontSize: '11px', padding: '6px 14px', gap: '8px' },
  };

  const s = sizeMap[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: '"Space Mono", ui-monospace, monospace',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: badge.color,
        border: `1px solid ${badge.color}`,
        background: `${badge.color}11`,
        cursor: showTooltip ? 'help' : 'default',
        whiteSpace: 'nowrap',
      }}
      title={showTooltip ? badge.description : undefined}
    >
      <span>{badge.icon}</span>
      <span>{badge.label}</span>
    </span>
  );
}

// ─── Trust Note Component ──────────────────────────────────────────────────
// Shown at the bottom of articles to explain trust posture

export function TrustNote({ type }: { type: HalalBadgeType }) {
  const badge = HALAL_BADGE_DEFINITIONS[type];
  if (!badge) return null;

  return (
    <div
      style={{
        marginTop: '48px',
        padding: '24px',
        border: `1px solid ${badge.color}33`,
        background: `${badge.color}08`,
        borderLeft: `3px solid ${badge.color}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <HalalBadge type={type} size="md" />
      </div>
      <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>
        {badge.description} This content passed all six gates in{' '}
        <a href="/halal/standards" style={{ color: badge.color, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
          The Lantern Daily trust pipeline
        </a>
        .
      </p>
    </div>
  );
}