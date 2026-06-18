'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SubscribeForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscribe failed');
      const padded = String(data.operator_number).padStart(4, '0');
      router.push(`/confirmed?operator=${padded}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '0', border: '1px solid #2A2D35' }}>
        <input
          type="email"
          required
          placeholder="operator@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            background: '#0D0F14',
            color: '#F7F2EE',
            border: 'none',
            padding: '14px 16px',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            letterSpacing: '0.01em',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#2A2D35' : '#D92532',
            color: '#F7F2EE',
            border: 'none',
            padding: '14px 24px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}
        >
          {loading ? 'JOINING...' : 'JOIN'}
        </button>
      </div>
      {error && (
        <p style={{ color: '#D92532', fontSize: '12px', margin: 0, letterSpacing: '0.04em' }}>
          {error}
        </p>
      )}
      <p style={{ color: '#6B7280', fontSize: '11px', margin: 0, letterSpacing: '0.04em' }}>
        FREE. NO ADS. HALAL-SCREENED CONTENT.
      </p>
    </form>
  );
}
