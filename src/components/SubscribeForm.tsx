'use client';

import { useState, FormEvent } from 'react';

type SubscribeState = 'idle' | 'loading' | 'success' | 'error';

interface SubscribeFormProps {
  variant?: 'hero' | 'inline' | 'footer';
  buttonText?: string;
  placeholder?: string;
}

export default function SubscribeForm({ variant = 'hero', buttonText, placeholder }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubscribeState>('idle');
  const [message, setMessage] = useState('');

  const btnText = buttonText || 'Subscribe';
  const placeholderText = placeholder || 'you@example.com';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState('loading');
    setMessage('');

    // Placeholder: v0 will wire to n8n webhook → Supabase
    await new Promise((r) => setTimeout(r, 1000));

    // Simulated success
    setState('success');
    setMessage('You\'re on the list. Signal arrives daily.');
    setEmail('');
  }

  if (variant === 'hero') {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            required
            disabled={state === 'loading' || state === 'success'}
            className="subscribe-input flex-1"
          />
          <button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            className="btn-primary"
          >
            {state === 'loading' ? 'Subscribing…' : state === 'success' ? 'Subscribed ✓' : btnText}
          </button>
        </form>
        {message && (
          <p className="text-sm text-accent-green mt-2">{message}</p>
        )}
        {state === 'error' && (
          <p className="text-sm text-accent-red mt-2">{message || 'Something went wrong. Try again.'}</p>
        )}
        <p className="text-xs text-text-tertiary mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="space-y-3">
        <p className="text-sm text-text-secondary">Get the next issue in your inbox.</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            required
            disabled={state === 'loading' || state === 'success'}
            className="subscribe-input text-sm py-2"
          />
          <button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            className="btn-primary text-sm py-2"
          >
            {state === 'loading' ? '…' : state === 'success' ? '✓' : btnText}
          </button>
        </form>
        {message && <p className="text-xs text-accent-green">{message}</p>}
      </div>
    );
  }

  // Inline variant (default)
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholderText}
        required
        disabled={state === 'loading' || state === 'success'}
        className="subscribe-input"
      />
      <button
        type="submit"
        disabled={state === 'loading' || state === 'success'}
        className="btn-primary"
      >
        {state === 'loading' ? '…' : btnText}
      </button>
    </form>
  );
}
