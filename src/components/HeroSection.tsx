"use client";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import Link from "next/link";
export default function HeroSection() {
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
    <section className="relative overflow-hidden border-b border-[var(--border)]" style={{ padding: "80px 48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(212,37,53,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(30,20,80,0.15) 0%, transparent 50%)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
        <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--red)] mb-5 flex items-center gap-[10px]"><span className="inline-block w-[24px] h-[1px] bg-[var(--red)]" />Muslim-Built. AI-Native.</div>
        <h1 className="font-serif text-[60px] font-black leading-[1.0] text-white tracking-[-0.02em] mb-6">Signal<br /><em className="italic text-[var(--off-white)] not-italic">before</em><br />consensus.</h1>
        <p className="text-[16px] font-light leading-[1.7] text-[var(--muted)] max-w-[440px] mb-9">The daily intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.</p>
        <div className="flex items-center gap-4 flex-wrap">
          <form onSubmit={handleSubmit} className="flex gap-0">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="bg-white/5 border border-[var(--border-bright)] border-r-0 text-white font-sans text-[13px] px-5 py-[13px] w-[260px] outline-none transition-colors" />
            <button type="submit" disabled={status === "loading"} className="bg-[var(--red)] text-white font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-6 py-[13px] border-none cursor-pointer whitespace-nowrap disabled:opacity-50">{status === "loading" ? "Joining..." : "Join the Daily"}</button>
          </form>
          <Link href="#signals" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--muted)] no-underline flex items-center gap-2 hover:text-white transition-colors">Today&apos;s signal <span aria-hidden="true">→</span></Link>
        </div>
        {message && <p className={"mt-4 text-sm " + (status === "success" ? "text-green-500" : "text-[var(--red)]")}>{message}</p>}
        <div className="flex gap-8 mt-10 pt-8 border-t border-[var(--border)]">
          <div><div className="font-mono text-[28px] font-bold text-white leading-none mb-1"><span className="text-[var(--red)]">247</span></div><div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--muted)]">Operators</div></div>
          <div><div className="font-mono text-[28px] font-bold text-white leading-none mb-1">07</div><div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--muted)]">Signals</div></div>
          <div><div className="font-mono text-[28px] font-bold text-white leading-none mb-1">01</div><div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--muted)]">Brief</div></div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <div className="border border-[var(--border-bright)] overflow-hidden cursor-pointer transition-colors hover:border-[rgba(212,37,53,0.4)]">
          <div className="h-[280px] relative overflow-hidden">
            <div className="w-full h-full transition-transform duration-[0.6s] hover:scale-[1.03] relative" style={{ background: "radial-gradient(circle at 30% 40%, rgba(212,37,53,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(50,30,100,0.4) 0%, transparent 40%), linear-gradient(135deg, #0A0818 0%, #1A1040 30%, #0F0820 60%, #080510 100%)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(212,37,53,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,37,53,0.08) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            </div>
            <span className="absolute top-5 left-5 bg-[var(--red)] font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-white px-[10px] py-[5px] z-[2]">Today&apos;s Lead</span>
          </div>
          <div className="p-7 bg-[var(--bg-card)]">
            <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--red)] mb-[10px]">AI Governance · Signal</div>
            <h3 className="font-serif text-[22px] font-bold leading-[1.3] text-white mb-[10px]">Agent Governance Is the New Product Layer</h3>
            <p className="text-[13px] leading-[1.6] text-[var(--muted)] mb-5">The teams that build governance infrastructure now will own the trust layer that determines which AI products survive the next 18 months.</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.1em] text-[var(--dim)] uppercase">Jun 13 · Issue #007</span>
              <Link href="/issues/agent-governance" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--red)] no-underline flex items-center gap-[6px] hover:text-white transition-colors">Read signal <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
