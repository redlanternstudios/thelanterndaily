"use client";

import { motion } from "framer-motion";
import IssueCard, { sampleIssues } from "./IssueCard";
import Link from "next/link";

export default function IssuesSection() {
  return (
    <section id="issues" className="scroll-mt-24">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="mono inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-gold)] mb-3">
            Latest Intelligence
          </span>
          <h2 className="serif text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            Recent Issues
          </h2>
        </div>
        <Link
          href="/issues"
          className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1"
        >
          View all issues &rarr;
        </Link>
      </div>

      {/* Issue grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="lantern-grid"
      >
        {sampleIssues.map((issue, i) => (
          <IssueCard key={issue.slug} {...issue} index={i} />
        ))}
      </motion.div>

      {/* Section divider */}
      <div className="section-divider mt-16" />
    </section>
  );
}
