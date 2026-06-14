'use client';

<<<<<<< HEAD
import { useState, type FormEvent } from "react";
import { SOCIAL_PROOF } from "@/lib/content";

export default function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
=======
import { useState, FormEvent } from 'react';

type SubscribeState = 'idle' | 'loading' | 'success' | 'error';
>>>>>>> origin/main

export default function SubscribeForm({ variant = 'hero' }: { variant?: 'hero' | 'inline' | 'footer' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubscribeState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
<<<<<<< HEAD
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're in. Check your inbox for the welcome briefing.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className={compact ? "" : "text-center"}>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-2 ${compact ? "" : "max-w-md mx-auto"}`}
      >
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-red)] focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[var(--color-red)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--color-text)] hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap"
        >
          {status === "loading" ? "Joining…" : "Join Free"}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "success" ? "text-[var(--color-blue)]" : "text-[var(--color-red)]"
          }`}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-dim)]">
          Join {SOCIAL_PROOF.split(" ")[0]}+ · No spam · Unsubscribe anytime
        </p>
      )}
    </div>
=======
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
            placeholder="you@example.com"
            required
            disabled={state === 'loading' || state === 'success'}
            className="subscribe-input flex-1"
          />
          <button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            className="btn-primary"
          >
            {state === 'loading' ? 'Subscribing…' : state === 'success' ? 'Subscribed ✓' : 'Subscribe'}
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
            placeholder="you@example.com"
            required
            disabled={state === 'loading' || state === 'success'}
            className="subscribe-input text-sm py-2"
          />
          <button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            className="btn-primary text-sm py-2"
          >
            {state === 'loading' ? '…' : state === 'success' ? '✓' : 'Subscribe'}
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
        placeholder="you@example.com"
        required
        disabled={state === 'loading' || state === 'success'}
        className="subscribe-input"
      />
      <button
        type="submit"
        disabled={state === 'loading' || state === 'success'}
        className="btn-primary"
      >
        {state === 'loading' ? '…' : 'Subscribe'}
      </button>
    </form>
>>>>>>> origin/main
  );
}