"use client";
import { motion } from "framer-motion";
import IssueCard, { sampleIssues } from "./IssueCard";
import Link from "next/link";
export default function IssuesSection() {
  return (
    <section id="issues" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div><span className="font-mono inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--red)] mb-3">Latest Intelligence</span><h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--white)]">Recent Issues</h2></div>
        <Link href="/archive" className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--muted)] hover:text-white transition-colors flex items-center gap-1 no-underline">View all issues →</Link>
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] border border-[var(--border)]" style={{ background: "var(--border)" }}>
        {sampleIssues.map((issue, i) => (<IssueCard key={issue.slug} {...issue} index={i} />))}
      </motion.div>
    </section>
  );
}
