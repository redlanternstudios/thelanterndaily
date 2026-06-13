"use client";
import { motion } from "framer-motion";
import Link from "next/link";
interface IssueCardProps { title: string; date: string; excerpt: string; topics: string[]; readTime: string; slug: string; index?: number; }
export default function IssueCard({ title, date, excerpt, topics, readTime, slug, index = 0 }: IssueCardProps) {
  return (
    <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }} className="p-6 bg-[var(--bg-card)] border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-4"><time className="font-mono text-[8px] tracking-[0.1em] text-[var(--dim)] uppercase">{date}</time><span className="font-mono text-[8px] tracking-[0.1em] text-[var(--dim)] uppercase">{readTime}</span></div>
      <h3 className="font-serif text-[18px] font-bold leading-[1.3] text-[var(--off-white)] group-hover:text-white transition-colors"><Link href={"/issues/" + slug} className="no-underline text-inherit">{title}</Link></h3>
      <p className="mt-3 text-[13px] leading-[1.6] text-[var(--muted)] line-clamp-3">{excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">{topics.map((topic) => (<span key={topic} className="font-mono inline-block rounded-full bg-[var(--bg-base)] px-3 py-1 text-[10px] font-medium text-[var(--muted)] uppercase tracking-wider">{topic}</span>))}</div>
    </motion.article>
  );
}
export const sampleIssues = [
  { title: "The Agentic Shift: Why 2026 Is the Year AI Learns to Act", date: "Jun 13, 2026", excerpt: "Enterprise AI is moving from chat to action.", topics: ["AI", "Enterprise"], readTime: "4 min", slug: "agentic-shift-2026" },
  { title: "Markets Digest Fed Decision: What the Steady Hand Means", date: "Jun 12, 2026", excerpt: "The Fed held rates steady as expected.", topics: ["Markets", "Economy"], readTime: "5 min", slug: "fed-decision-june-2026" },
  { title: "DeepSeek R1 and the Open-Weight Revolution", date: "Jun 11, 2026", excerpt: "DeepSeek's latest model matches frontier labs.", topics: ["AI", "Open Source"], readTime: "6 min", slug: "deepseek-r1-revolution" },
];
