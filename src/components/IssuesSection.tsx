"use client";
import { motion } from "framer-motion";
import IssueCard from "./IssueCard";
import Link from "next/link";

const SAMPLE_ISSUES = [
  { slug: "agent-governance", title: "Agent Governance Is the New Product Layer", excerpt: "The teams building AI products right now are making a mistake that will cost them.", date: "Jun 13, 2026", category: "AI Governance", tier: "premium" as const },
  { slug: "memory-layer", title: "Why Every Serious Operator Is Building a Memory Layer Now", excerpt: "The difference between a demo and a product isn't the model.", date: "Jun 12, 2026", category: "AI Systems", tier: "free" as const },
  { slug: "alif-summit", title: "What the Alif Summit Said About Where Muslim Tech Is Going", excerpt: "Three patterns from the room that tell you everything about the next 24 months.", date: "Jun 11, 2026", category: "Field Notes", tier: "premium" as const },
];

export default function IssuesSection() {
  return (
    <section id="issues" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="font-mono inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--red)] mb-3">Latest Intelligence</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--white)]">Recent Issues</h2>
        </div>
        <Link href="/archive" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--muted)] hover:text-white transition-colors flex items-center gap-1 no-underline">View all issues →</Link>
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] border border-[var(--border)]" style={{ background: "var(--border)" }}>
        {SAMPLE_ISSUES.map((issue) => (
          <IssueCard key={issue.slug} slug={issue.slug} title={issue.title} excerpt={issue.excerpt} date={issue.date} category={issue.category} tier={issue.tier} />
        ))}
      </motion.div>
    </section>
  );
}
