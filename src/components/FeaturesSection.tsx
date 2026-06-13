"use client";
import { motion } from "framer-motion";
const wallCards = [
  { category: "AI Systems", title: "Memory, Agents, Architecture", signal: "#012", tier: "Free", href: "/signals/memory-agents-architecture", gradient: "radial-gradient(circle at 50% 30%, rgba(30,60,200,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(100,30,200,0.2) 0%, transparent 40%), linear-gradient(160deg, #060A1F 0%, #0D1235 50%, #06080F 100%)" },
  { category: "Product Calls", title: "What Operators Are Actually Shipping", signal: "#009", tier: "Premium", href: "/signals/what-operators-shipping", gradient: "radial-gradient(circle at 40% 50%, rgba(212,37,53,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(200,60,20,0.15) 0%, transparent 40%), linear-gradient(160deg, #150808 0%, #220D0D 50%, #0F0606 100%)" },
  { category: "Operator Stack", title: "Tools the Serious Builders Use", signal: "#011", tier: "Free", href: "/signals/operator-stack-tools", gradient: "radial-gradient(circle at 60% 40%, rgba(20,120,80,0.2) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(10,80,60,0.15) 0%, transparent 40%), linear-gradient(160deg, #060F0A 0%, #0A1A10 50%, #050A07 100%)" },
  { category: "Field Notes", title: "From the Ground in Muslim Tech", signal: "#008", tier: "Free", href: "/signals/field-notes-muslim-tech", gradient: "radial-gradient(circle at 30% 60%, rgba(200,169,110,0.15) 0%, transparent 60%), linear-gradient(160deg, #130F06 0%, #1E1608 50%, #0A0905 100%)" },
  { category: "Governance", title: "Who Controls the Control Layer", signal: "#010", tier: "Premium", href: "/signals/who-controls-control-layer", gradient: "radial-gradient(circle at 50% 50%, rgba(212,37,53,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(80,10,30,0.2) 0%, transparent 40%), linear-gradient(160deg, #0F0608 0%, #1A080C 50%, #0A0507 100%)" },
  { category: "Market Signal", title: "Halal Finance Meets AI Infrastructure", signal: "#007", tier: "Premium", href: "/signals/halal-finance-ai-infra", gradient: "radial-gradient(circle at 70% 50%, rgba(50,120,200,0.2) 0%, transparent 60%), radial-gradient(circle at 30% 30%, rgba(100,160,220,0.1) 0%, transparent 40%), linear-gradient(160deg, #060C14 0%, #0A1520 50%, #06080F 100%)" },
];
const signalItems = [
  { number: "01", category: "AI Systems", title: "Why Every Serious Operator Is Building a Memory Layer Now", excerpt: "The difference between a demo and a product isn't the model. It's whether the system remembers what happened last time.", date: "Jun 12, 2026", tag: "Free", href: "/signals/memory-layer" },
  { number: "02", category: "Field Notes", title: "What the Alif Summit Said About Where Muslim Tech Is Going", excerpt: "Three patterns from the room that don't show up in the coverage but tell you everything about the next 24 months.", date: "Jun 11, 2026", tag: "Premium", href: "/signals/alif-summit" },
  { number: "03", category: "Operator Stack", title: "The Real Self-Hosted Stack: n8n on Railway, Supabase, and Why Make.com Doesn't Scale", excerpt: "What serious Muslim builders are actually running under the hood and why the cloud tax is the first thing to cut.", date: "Jun 10, 2026", tag: "Free", href: "/signals/self-hosted-stack" },
];
const categories = [ { name: "AI Systems", count: "12 signals" }, { name: "Governance", count: "8 signals" }, { name: "Market Signal", count: "7 signals" }, { name: "Field Notes", count: "6 signals" }, { name: "Operator Stack", count: "5 signals" } ];
export default function FeaturesSection() {
  return (<>
    <section>
      <div className="flex items-center justify-between px-6 md:px-12 py-10 pb-6">
        <div className="flex items-center gap-[14px]"><div className="w-10 h-[1px] bg-[var(--border-bright)]" /><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]">Live Intelligence Wall</span></div>
        <a href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] no-underline flex items-center gap-[6px] hover:text-white transition-colors">View all signals →</a>
      </div>
      <div className="px-6 md:px-12 pb-16 border-b border-[var(--border)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] border border-[var(--border)]" style={{ background: "var(--border)" }}>
          {wallCards.map((card, i) => (
            <motion.a key={card.signal} href={card.href} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="relative overflow-hidden cursor-pointer no-underline block group" style={{ background: "var(--bg-card)" }}>
              <div className="h-[200px] relative overflow-hidden">
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04] relative" style={{ background: card.gradient }}>
                  <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                  <div className="absolute top-4 right-4 flex gap-1 z-[2]"><span className="w-[5px] h-[5px] rounded-full bg-[var(--red)] opacity-80" /><span className="w-[5px] h-[5px] rounded-full bg-[var(--red)] opacity-40" /><span className="w-[5px] h-[5px] rounded-full bg-[var(--red)] opacity-20" /></div>
                </div>
              </div>
              <div className="p-5 bg-[var(--bg-card)] border-t border-[var(--border)] transition-colors group-hover:bg-[var(--bg-card-hover)]">
                <div className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase text-[var(--red)] mb-2 flex items-center gap-2"><span className="inline-block w-3 h-[1px] bg-[var(--red)]" />{card.category}</div>
                <div className="font-serif text-[16px] font-bold leading-[1.3] text-[var(--off-white)] mb-2 group-hover:text-white transition-colors">{card.title}</div>
                <div className="flex items-center justify-between mt-[14px]">
                  <span className="font-mono text-[8px] tracking-[0.1em] text-[var(--dim)] uppercase">Signal {card.signal}</span>
                  <span className={"font-mono text-[8px] font-bold tracking-[0.1em] uppercase px-[7px] py-[3px] border " + (card.tier === "Free" ? "text-[var(--muted)] border-[var(--dim)]" : "text-[var(--red)] border-[var(--red-border)]")}>{card.tier}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
    <section id="signals">
      <div className="flex items-center justify-between px-6 md:px-12 py-10 pb-6">
        <div className="flex items-center gap-[14px]"><div className="w-10 h-[1px] bg-[var(--border-bright)]" /><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]">Recent Signals</span></div>
        <a href="/archive" className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--muted)] no-underline flex items-center gap-[6px] hover:text-white transition-colors">Full archive →</a>
      </div>
      <div className="px-6 md:px-12 pb-16 border-b border-[var(--border)] grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-16">
        <div>{signalItems.map((signal) => (
          <motion.a key={signal.number} href={signal.href} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-6 py-6 border-b border-[var(--border)] last:border-b-0 no-underline group">
            <div className="font-mono text-[11px] font-bold text-[var(--dim)] min-w-[24px] pt-[3px]">{signal.number}</div>
            <div>
              <div className="font-mono text-[8px] font-bold tracking-[0.15em] uppercase text-[var(--red)] mb-[6px]">{signal.category}</div>
              <div className="font-serif text-[18px] font-semibold leading-[1.3] text-[var(--off-white)] mb-2 group-hover:text-white transition-colors">{signal.title}</div>
              <div className="text-[13px] leading-[1.6] text-[var(--muted)] mb-3">{signal.excerpt}</div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[8px] tracking-[0.1em] text-[var(--dim)] uppercase">{signal.date}</span>
                <span className={"font-mono text-[8px] tracking-[0.1em] uppercase px-[7px] py-[2px] border " + (signal.tag === "Free" ? "text-[var(--muted)] border-[var(--border-bright)]" : "text-[var(--red)] border-[var(--red-border)]")}>{signal.tag}</span>
              </div>
            </div>
          </motion.a>
        ))}</div>
        <div className="space-y-6">
          <div className="border border-[var(--red-border)] p-6" style={{ background: "var(--red-dim)" }}>
            <div className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase text-[var(--red)] mb-3">Become an Operator</div>
            <div className="font-mono text-[40px] font-bold text-white leading-none mb-2">#0248</div>
            <div className="text-[12px] text-[var(--muted)] leading-[1.5]">Join 247 Muslim builders, founders, and operators getting signal before consensus.</div>
            <a href="#subscribe" className="block mt-4 bg-[var(--red)] text-white font-mono text-[9px] font-bold tracking-[0.12em] uppercase py-[11px] text-center no-underline">Claim Your Number</a>
          </div>
          <div className="border border-[var(--border)] p-5">
            <div className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--muted)] mb-4 pb-3 border-b border-[var(--border)]">Intelligence by Category</div>
            {categories.map((cat) => (<div key={cat.name} className="flex items-center justify-between py-[10px] border-b border-[var(--border)] last:border-b-0 cursor-pointer"><span className="text-[12px] text-[var(--off-white)]">{cat.name}</span><span className="font-mono text-[9px] text-[var(--dim)]">{cat.count}</span></div>))}
          </div>
        </div>
      </div>
    </section>
  </>);
}
