'use client';
import { useState } from 'react';

interface Props {
  text: string;
}

export default function SharePrompt({ text }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'The Lantern Daily', text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
        color: '#E8E9EF', fontFamily: "'Space Mono', monospace",
        fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', padding: '11px 24px',
        cursor: 'pointer', transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#D42535'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
    >
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}