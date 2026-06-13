import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
const archiveItems = [
  { title: "The Agentic Shift: Why 2026 Is the Year AI Learns to Act", date: "Jun 13, 2026", slug: "agentic-shift-2026" },
  { title: "Markets Digest Fed Decision: What the Steady Hand Means", date: "Jun 12, 2026", slug: "fed-decision-june-2026" },
  { title: "DeepSeek R1 and the Open-Weight Revolution", date: "Jun 11, 2026", slug: "deepseek-r1-revolution" },
];
export default function ArchivePage() {
  return (<><Nav /><main className="pt-[88px] min-h-screen"><div className="max-w-[var(--max-w-content)] mx-auto px-6 py-16"><div className="flex items-center gap-[14px] mb-10"><div className="w-10 h-[1px] bg-[var(--border-bright)]" /><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]">Archive</span></div><h1 className="font-serif text-4xl font-bold text-white mb-8">All Issues</h1><div className="space-y-4">{archiveItems.map((item) => (<Link key={item.slug} href={"/issues/" + item.slug} className="block p-6 border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors no-underline"><div className="font-mono text-[8px] tracking-[0.1em] text-[var(--dim)] uppercase mb-2">{item.date}</div><h3 className="font-serif text-xl font-bold text-[var(--off-white)] hover:text-white transition-colors">{item.title}</h3></Link>))}</div></div></main><Footer /></>);
}
