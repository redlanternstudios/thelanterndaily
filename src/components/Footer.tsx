import Link from "next/link";
<<<<<<< HEAD
export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 md:px-12 py-10 flex-wrap gap-4">
      <div>
        <div className="font-serif text-[14px] font-bold text-white mb-1">The Lantern Daily</div>
        <div className="font-mono text-[8px] tracking-[0.12em] uppercase text-[var(--dim)]">A RedLantern Studios™ Publication · By Red LLC</div>
      </div>
      <ul className="flex gap-6 list-none">
        {[{ href: "/about", label: "About" }, { href: "/archive", label: "Archive" }, { href: "#subscribe", label: "Subscribe" }, { href: "/privacy", label: "Privacy" }].map((link) => (
          <li key={link.href}><Link href={link.href} className="font-mono text-[9px] tracking-[0.1em] uppercase text-[var(--muted)] no-underline hover:text-white transition-colors">{link.label}</Link></li>
        ))}
      </ul>
      <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-[var(--dim)] text-right">&copy; {new Date().getFullYear()}</div>
=======

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link
              href="/"
              className="text-lg font-serif text-amber-400 hover:text-amber-300 transition-colors"
            >
              The Lantern Daily
            </Link>
            <p className="mt-1 text-xs text-stone-500 font-mono">
              Signal Before Consensus
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/shorts"
              className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
            >
              Shorts
            </Link>
            <Link
              href="/archive"
              className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
            >
              Archive
            </Link>
            <Link
              href="/about"
              className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
            >
              About
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-800 text-center">
          <p className="text-xs text-stone-600 font-mono">
            &copy; 2026 The Lantern Daily. All rights reserved.
          </p>
        </div>
      </div>
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
    </footer>
  );
}
