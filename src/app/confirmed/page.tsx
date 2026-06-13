<<<<<<< HEAD
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function ConfirmedPage() {
  return (<><Nav /><main className="pt-[88px] min-h-screen"><div className="max-w-[var(--max-w-content)] mx-auto px-6 py-16 text-center"><div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--red)] mb-5">Signal Before Consensus</div><h1 className="font-serif text-5xl font-black text-white leading-[1.1] mb-4">You&apos;re Confirmed.</h1><p className="text-[var(--muted)] text-lg max-w-md mx-auto">Check your inbox for your welcome email. Your operator number is on its way.</p></div></main><Footer /></>);
=======
import OperatorNumber from "@/components/OperatorNumber";
import SharePrompt from "@/components/SharePrompt";
import Link from "next/link";

interface ConfirmedPageProps {
  searchParams: Promise<{ number?: string }>;
}

export default async function ConfirmedPage({
  searchParams,
}: ConfirmedPageProps) {
  const params = await searchParams;
  const operatorNumber = parseInt(params.number || "0", 10) || 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-8">
        {/* Success icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <OperatorNumber number={operatorNumber} />

        <div className="space-y-3">
          <h1 className="text-3xl font-serif text-stone-100">
            Welcome to the Network
          </h1>
          <p className="text-stone-400 max-w-md mx-auto leading-relaxed">
            You&apos;re now subscribed. Your daily intelligence briefings will
            arrive in your inbox each morning. Signal before consensus.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SharePrompt
            url={`https://thelanterndaily.com/confirmed?number=${operatorNumber}`}
            title="I just joined The Lantern Daily — Signal Before Consensus"
          />
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2.5 bg-amber-400 text-stone-950 font-medium rounded-lg hover:bg-amber-300 transition-colors text-sm"
          >
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
}
