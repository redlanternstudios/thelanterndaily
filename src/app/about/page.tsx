import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function AboutPage() {
  return (<><Nav /><main className="pt-[88px] min-h-screen"><div className="max-w-[var(--max-w-content)] mx-auto px-6 py-16"><div className="flex items-center gap-[14px] mb-10"><div className="w-10 h-[1px] bg-[var(--border-bright)]" /><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]">About</span></div><
<h1 className="font-serif text-4xl font-bold text-white mb-6">About The Lantern Daily</h1>
<div className="max-w-2xl space-y-4 text-[var(--muted)] leading-relaxed"><p>The Lantern Daily is the intelligence brief for serious Muslim operators and AI-native builders. No noise. No consensus. Just signal.</p><p>A RedLantern Studios™ publication. Built by Muslim founders who believe the next generation of infrastructure will be built by people who don&apos;t wait for permission.</p></div></div></main><Footer /></>);
}
