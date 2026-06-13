<<<<<<< HEAD
"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setStatus("loading"); setMessage("");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (res.ok) { setStatus("success"); setMessage("You're in. Check your inbox."); setEmail(""); }
      else { setStatus("error"); setMessage(data.error || "Something went wrong."); }
    } catch { setStatus("error"); setMessage("Network error."); }
  };
  return (
    <section id="subscribe" className="scroll-mt-24 text-center py-20 px-6 md:px-12 relative overflow-hidden border-b border-[var(--border)]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,37,53,0.08) 0%, transparent 60%)" }} />
      <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--red)] mb-5">Signal Before Consensus</div>
      <h2 className="font-serif text-4xl md:text-[48px] font-black text-white leading-[1.1] mb-4 max-w-[600px] mx-auto">Built for the operators who don&apos;t wait for permission.</h2>
      <p className="text-[15px] text-[var(--muted)] leading-[1.6] max-w-[480px] mx-auto mb-9">The Lantern Daily is the intelligence brief for Muslim founders, builders, and operators in AI and halal tech. Free to start. Serious when you&apos;re ready.</p>
      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center max-w-[480px] mx-auto">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 bg-white/5 border border-[var(--border-bright)] border-r-0 text-white font-sans text-[14px] px-5 py-[15px] outline-none transition-colors focus:border-[var(--red)]" />
        <button type="submit" disabled={status === "loading"} className="bg-[var(--red)] text-white font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-7 py-[15px] border-none cursor-pointer whitespace-nowrap disabled:opacity-50">{status === "loading" ? "Joining..." : "Get the Daily"}</button>
      </motion.form>
      {message && <p className={"mt-4 text-sm " + (status === "success" ? "text-green-500" : "text-[var(--red)]")}>{message}</p>}
      <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-[var(--dim)] mt-4">Free · No spam · Unsubscribe anytime · Operator number assigned on join</div>
    </section>
=======
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SubscribeFormProps {
  variant?: 'default' | 'large' | 'inline';
  placeholder?: string;
  buttonText?: string;
}

export default function SubscribeForm({
  variant = 'default',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
}: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      if (data.operator_number) {
        router.push(`/confirmed?number=${data.operator_number}`);
      } else {
        router.push('/confirmed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    }
  };

  const inputClasses =
    variant === 'large'
      ? 'flex-1 bg-lantern-gray border border-lantern-border rounded-lg px-4 py-3 text-sm text-lantern-text placeholder:text-lantern-muted-text focus:outline-none focus:border-lantern-accent'
      : 'flex-1 bg-lantern-gray border border-lantern-border rounded-md px-3 py-2 text-sm text-lantern-text placeholder:text-lantern-muted-text focus:outline-none focus:border-lantern-accent';

  const btnClasses =
    variant === 'large'
      ? 'bg-lantern-accent text-lantern-black font-semibold px-6 py-3 rounded-lg text-sm hover:bg-lantern-accent/90 transition-all disabled:opacity-50'
      : variant === 'inline'
      ? 'text-lantern-accent text-sm font-medium hover:text-lantern-accent/80 transition-colors disabled:opacity-50'
      : 'bg-lantern-accent text-lantern-black font-semibold px-4 py-2 rounded-md text-sm hover:bg-lantern-accent/90 transition-all disabled:opacity-50';

  const containerClass = variant === 'large' ? 'flex flex-col sm:flex-row gap-3' : 'flex gap-2';

  return (
    <form onSubmit={handleSubmit} className={containerClass}>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
        placeholder={placeholder}
        className={inputClasses}
        disabled={status === 'loading'}
        required
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className={btnClasses}
      >
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Subscribed!' : buttonText}
      </button>
      {status === 'error' && (
        <p className="text-xs text-lantern-red mt-1 w-full">{errorMsg}</p>
      )}
    </form>
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
  );
}
