"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface IssueCardProps {
  title: string;
  date: string;
  excerpt: string;
  topics: string[];
  readTime: string;
  slug: string;
  index?: number;
}

export default function IssueCard({
  title,
  date,
  excerpt,
  topics,
  readTime,
  slug,
  index = 0,
}: IssueCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="issue-card group rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6"
    >
      {/* Meta row */}
      <div className="flex items-center justify-between mb-4">
        <time className="mono text-xs text-[var(--color-muted)] uppercase tracking-wider">
          {date}
        </time>
        <span className="mono text-xs text-[var(--color-muted)]">
          {readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="serif text-xl font-bold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors">
        <Link href={`/issues/${slug}`}>
          <span className="absolute inset-0" aria-hidden="true" />
          {title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
        {excerpt}
      </p>

      {/* Topics */}
      <div className="mt-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            className="mono inline-block rounded-full bg-[var(--color-bg)] px-3 py-1 text-[10px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider"
          >
            {topic}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

// Sample data for initial render
export const sampleIssues: IssueCardProps[] = [
  {
    title: "The Agentic Shift: Why 2026 Is the Year AI Learns to Act",
    date: "Jun 13, 2026",
    excerpt:
      "Enterprise AI is moving from chat to action. This week's briefing covers the major agent frameworks reshaping how work gets done.",
    topics: ["AI", "Enterprise"],
    readTime: "4 min",
    slug: "agentic-shift-2026",
  },
  {
    title: "Markets Digest Fed Decision: What the Steady Hand Means",
    date: "Jun 12, 2026",
    excerpt:
      "The Fed held rates steady as expected, but the dot plot tells a different story. Breaking down the signal from the noise.",
    topics: ["Markets", "Economy"],
    readTime: "5 min",
    slug: "fed-decision-june-2026",
  },
  {
    title: "DeepSeek R1 and the Open-Weight Revolution",
    date: "Jun 11, 2026",
    excerpt:
      "DeepSeek's latest model matches frontier labs on reasoning benchmarks. What this means for the AI landscape, competition, and accessibility.",
    topics: ["AI", "Open Source"],
    readTime: "6 min",
    slug: "deepseek-r1-revolution",
  },
];
