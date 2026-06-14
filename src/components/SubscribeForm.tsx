"use client";

import { useState, type FormEvent } from "react";
import { SOCIAL_PROOF } from "@/lib/content";

export default function SubscribeForm({ compact = false }: { compact?: boolean }) {
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
  );
}
