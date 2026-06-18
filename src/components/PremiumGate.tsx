import type { ReactNode } from 'react';

interface PremiumGateProps {
  children: ReactNode;
  previewWords?: number;
}

export default function PremiumGate({ children, previewWords = 200 }: PremiumGateProps) {
  const maxHeight = previewWords * 1.5 * 1.8 + 80;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          maxHeight: maxHeight + 'px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: 'linear-gradient(transparent, #07080F 60%)',
          padding: '60px 0 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            border: '1px solid rgba(212,37,53,0.3)',
            background: 'rgba(212,37,53,0.15)',
            padding: 28,
            maxWidth: 400,
            margin: '0 auto',
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 18,
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 8px',
            }}
          >
            Unlock the Full Brief
          </h3>
          <p
            style={{
              fontSize: 12,
              color: '#7A8299',
              lineHeight: 1.5,
              margin: '0 0 16px',
            }}
          >
            You&apos;re reading a preview. Premium operators get the full Weekly
            Brief, all signals, and the intelligence archive.
          </p>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 22,
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: 4,
            }}
          >
            $15{' '}
            <span style={{ fontSize: 12, color: '#7A8299' }}>/ month</span>
          </div>
          <button
            style={{
              width: '100%',
              background: '#D42535',
              color: '#FFFFFF',
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '12px 0',
              border: 'none',
              cursor: 'pointer',
              marginTop: 14,
            }}
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
