import Link from 'next/link';

export default function PremiumGate() {
  return (
    <div className="premium-blur rounded-xl border border-lantern-border/30 p-8 text-center">
      <div className="premium-content mb-6">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-lantern-accent/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-lantern-accent">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <p className="text-sm text-lantern-muted-text">
          Premium content is locked. Subscribe to unlock the full briefing.
        </p>
      </div>
      <Link
        href="/"
        className="inline-block bg-lantern-accent text-lantern-black font-semibold px-6 py-3 rounded-lg text-sm hover:bg-lantern-accent/90 transition-all"
      >
        Upgrade to Premium
      </Link>
    </div>
  );
}
