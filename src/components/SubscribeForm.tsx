"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
        setMessage("You're in. Check your inbox for the welcome email.");
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
    <section id="subscribe" className="scroll-mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mono inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-gold)] mb-4">
          Stay Ahead
        </span>
        <h2 className="serif text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
          Get The Lantern Daily
        </h2>
        <p className="mt-4 text-[var(--color-text-secondary)] max-w-md mx-auto">
          Join 24K+ readers getting signal before consensus. Free daily briefings
          delivered to your inbox every morning.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="subscribe-input flex-1 rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-muted)]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-[var(--color-accent-gold)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-gold)]/90 disabled:opacity-50 transition-all whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe Free"}
          </button>
        </motion.form>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-sm ${
              status === "success"
                ? "text-green-600"
                : "text-[var(--color-accent-red)]"
            }`}
          >
            {message}
          </motion.p>
        )}

        <p className="mt-4 text-xs text-[var(--color-muted)]">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
