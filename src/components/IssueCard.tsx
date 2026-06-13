<<<<<<< HEAD
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
=======
import Link from 'next/link';

interface IssueCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tier: 'free' | 'premium';
  imageUrl?: string;
  readTime?: string;
}

export default function IssueCard({
  slug,
  title,
  excerpt,
  date,
  category,
  tier,
  imageUrl,
  readTime,
}: IssueCardProps) {
  return (
    <Link href={`/issues/${slug}`} className="group block">
      <article className="atmos-card border border-lantern-border/30 rounded-xl overflow-hidden hover:border-lantern-accent/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,197,66,0.06)]">
        {/* Image */}
        {imageUrl && (
          <div className="card-image aspect-[16/9]">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        {!imageUrl && (
          <div className="aspect-[16/9] bg-gradient-to-br from-lantern-muted to-lantern-dark flex items-center justify-center">
            <span className="font-serif text-4xl text-lantern-muted-text/30 italic">TL</span>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-lantern-accent uppercase tracking-wider">{category}</span>
            {tier === 'premium' && (
              <span className="text-[10px] font-semibold uppercase tracking-widest bg-lantern-accent/10 text-lantern-accent px-2 py-0.5 rounded-full border border-lantern-accent/20">
                Premium
              </span>
            )}
            {tier === 'free' && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-lantern-muted-text">
                Free
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg font-bold text-lantern-text group-hover:text-lantern-accent transition-colors duration-200 leading-snug mb-2">
            {title}
          </h3>

          <p className="text-sm text-lantern-muted-text leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <time className="text-xs font-mono text-lantern-muted-text">{date}</time>
            {readTime && <span className="text-xs text-lantern-muted-text">{readTime} read</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
