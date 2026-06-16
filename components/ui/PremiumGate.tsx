'use client';

import { useState } from 'react';

interface PremiumGateProps {
  children: React.ReactNode;
  previewLines?: number; // how many chars to show before blur
}

export function PremiumGate({ children, previewLines = 300 }: PremiumGateProps) {
  const [upgradeClicked, setUpgradeClicked] = useState(false);

  const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || '';

  function handleUpgrade() {
    setUpgradeClicked(true);
    // Link to Stripe Checkout — replace with real Checkout Session creation via API
    window.location.href = `/api/checkout?price_id=${MONTHLY_PRICE_ID}`;
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Blurred content overlay */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        maxHeight: `${previewLines}px`,
      }}>
        {children}
        {/* Gradient fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #0A0B0F)',
        }} />
      </div>

      {/* Gate card */}
      <div style={{
        background: '#0D0F14',
        border: '1px solid #2A2D35',
        padding: '40px 32px',
        textAlign: 'center',
        marginTop: '0',
      }}>
        <div style={{
          color: '#D92532',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          marginBottom: '16px',
        }}>
          PAID SUBSCRIBERS ONLY
        </div>
        <h3 style={{
          color: '#F7F2EE',
          fontSize: '22px',
          fontWeight: 700,
          margin: '0 0 12px',
          letterSpacing: '-0.01em',
        }}>
          Continue reading with The Lantern Daily
        </h3>
        <p style={{
          color: '#9CA3AF',
          fontSize: '14px',
          lineHeight: '1.6',
          margin: '0 0 28px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Full issues, complete Weekly Stack breakdowns, and the full Builder Spotlight archive.
          Halal-screened. No ads. $15/month or $120/year.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleUpgrade}
            disabled={upgradeClicked}
            style={{
              background: '#D92532',
              color: '#F7F2EE',
              border: 'none',
              padding: '14px 32px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: upgradeClicked ? 'not-allowed' : 'pointer',
            }}
          >
            {upgradeClicked ? 'REDIRECTING...' : 'JOIN — $15/MONTH'}
          </button>
          <a
            href="/?ref=gate"
            style={{
              background: 'transparent',
              color: '#6B7280',
              border: '1px solid #2A2D35',
              padding: '14px 24px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            FREE NEWSLETTER
          </a>
        </div>
        <p style={{ color: '#3D4048', fontSize: '11px', margin: '20px 0 0', letterSpacing: '0.04em' }}>
          CANCEL ANYTIME · HALAL-SCREENED CONTENT · NO ADS EVER
        </p>
      </div>
    </div>
  );
}
