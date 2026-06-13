import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function ConfirmedPage() {
  return (<><Nav /><main className="pt-[88px] min-h-screen"><div className="max-w-[var(--max-w-content)] mx-auto px-6 py-16 text-center"><div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--red)] mb-5">Signal Before Consensus</div><h1 className="font-serif text-5xl font-black text-white leading-[1.1] mb-4">You&apos;re Confirmed.</h1><p className="text-[var(--muted)] text-lg max-w-md mx-auto">Check your inbox for your welcome email. Your operator number is on its way.</p></div></main><Footer /></>);
}
