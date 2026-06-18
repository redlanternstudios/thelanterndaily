'use client';

import { type StackEntry, AGENT_META } from '@/data/lanternTypes';

interface StackToolCardProps {
  tool: StackEntry;
}

export function StackToolCard({ tool }: StackToolCardProps) {
  const agentMeta = tool.agent_name ? AGENT_META[tool.agent_name] : null;
  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tool icon area */}
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-2)',
            display: 'grid',
            placeItems: 'center',
            marginBottom: '16px',
            fontFamily: 'Space Mono, monospace',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--red)',
          }}
        >
          {initials}
        </div>

        {/* Category badge */}
        <div className="kicker" style={{ marginBottom: '6px' }}>
          {tool.category}
        </div>

        {/* Tool name */}
        <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>{tool.name}</h4>

        {/* Description */}
        <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '12px', flex: 1 }}>
          {tool.description}
        </p>

        {/* Agent attribution line */}
        {agentMeta && tool.agent_blurb && (
          <div
            style={{
              borderTop: '1px solid var(--border-2)',
              paddingTop: '10px',
              marginTop: 'auto',
              fontSize: '12px',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: '3px',
                backgroundColor: agentMeta.color,
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginRight: '6px',
              }}
            >
              {tool.agent_name}
            </span>
            <span style={{ color: 'var(--text-2)' }}>says:</span>
            <span style={{ display: 'block', marginTop: '6px', color: 'var(--text-1)' }}>
              &ldquo;{tool.agent_blurb}&rdquo;
            </span>
          </div>
        )}

        {/* Tier label */}
        <div
          style={{
            marginTop: '12px',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: tool.tier === 'operator' ? 'var(--red)' : 'var(--text-3)',
          }}
        >
          {tool.tier === 'operator' ? '🔒 Operator' : 'Free'}
        </div>
      </div>
    </div>
  );
}
