'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function ConfirmedContent() {
  const params = useSearchParams();
  const operatorNumber = params.get('operator') || '0001';

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0A0B0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
        {/* Operator number */}
        <div style={{
          fontFamily: 'monospace',
          fontSize: '80px',
          fontWeight: 900,
          color: '#D92532',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          marginBottom: '8px',
        }}>
          #{operatorNumber}
        </div>

        <div style={{
          color: '#F7F2EE',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: '32px',
        }}>
          YOU ARE NOW AN OPERATOR
        </div>

        <div style={{
          background: '#0D0F14',
          border: '1px solid #2A2D35',
          padding: '32px',
          marginBottom: '32px',
        }}>
          <h1 style={{
            color: '#F7F2EE',
            fontSize: '24px',
            fontWeight: 700,
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}>
            Check your inbox.
          </h1>
          <p style={{
            color: '#9CA3AF',
            fontSize: '14px',
            lineHeight: '1.7',
            margin: '0 0 20px',
          }}>
            Your first issue drops Thursday. Every brief is halal-screened before it reaches you — no exceptions.
          </p>
          <p style={{
            color: '#6B7280',
            fontSize: '13px',
            lineHeight: '1.6',
            margin: 0,
          }}>
            Can't find it? Check your spam folder and mark us as safe. <br />
            Subject line: <span style={{ color: '#F7F2EE', fontStyle: 'italic' }}>The Lantern Daily ✦</span>
          </p>
        </div>

        {/* Share link */}
        <div style={{
          borderTop: '1px solid #1A1D24',
          paddingTop: '24px',
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link
            href="/builders"
            style={{
              color: '#D92532',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              borderBottom: '1px solid #D92532',
              paddingBottom: '2px',
            }}
          >
            Meet the builders →
          </Link>
          <Link
            href="/"
            style={{
              color: '#6B7280',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
