'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <section id="subscribe" className="border border-[#1E2028] bg-[#0A0C12] p-8 text-center sm:p-12 overflow-hidden">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 font-mono text-xs uppercase tracking-widest text-[#B8922A]">
          ✦ Sovereign Editorial Dispatch
        </div>

        <h3 className="font-serif text-2xl font-extrabold tracking-tight text-[#F7F2EE] sm:text-3xl">
          Wake Up to Clarity Every Morning.
        </h3>

        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-[#9CA3AF] sm:text-sm">
          Essential signals on AI infrastructure, Halal public markets, and sovereign tech—grounded in Islamic covenants and delivered daily at 06:00 AM EST.
        </p>

        {status === 'success' ? (
          <div className="mx-auto mt-6 max-w-md border border-[#2D7A4F] bg-[#2D7A4F]/10 p-4 text-xs font-semibold text-[#4ADE80]">
            ✓ Dispatch confirmed. Your morning edition arrives at 06:00 AM EST.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md w-full flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="operator@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full min-h-[44px] flex-1 border border-[#2A2D35] bg-[#07080D] px-4 py-2.5 text-xs text-[#F7F2EE] placeholder-[#6B7280] focus:border-[#B8922A] focus:outline-none"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="inline-flex min-h-[44px] items-center justify-center bg-[#D92532] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#BF1F2B] disabled:opacity-50"
            >
              {subscribing ? 'Joining...' : 'Subscribe Free'}
            </button>
          </form>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-[#6B7280]">
          <span>Free Daily Edition</span>
          <span>·</span>
          <span>No Advertisers / No Riba</span>
          <span>·</span>
          <Link href="/about/editorial-standards" className="text-[#B8922A] hover:underline">
            Read Editorial Covenants ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
