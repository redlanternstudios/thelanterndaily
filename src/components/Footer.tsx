<<<<<<< HEAD
import Link from "next/link";
import { SOCIAL_PROOF } from "@/lib/content";

const columns = [
  {
    title: "Sections",
    links: ["Today", "AI", "Markets", "Tech", "Operator Stack", "Archive"],
  },
  {
    title: "Company",
    links: ["About", "RedLantern Studios", "Editorial Standards", "Contact"],
  },
  {
    title: "Follow",
    links: ["Newsletter", "X / Twitter", "LinkedIn", "RSS"],
  },
];
=======
import Link from 'next/link';
>>>>>>> origin/main

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
<<<<<<< HEAD
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <span className="font-headline text-[28px] leading-none">
              <span className="text-[var(--color-text)]">The </span>
              <span className="text-[var(--color-red)]">Lantern </span>
              <span className="text-[var(--color-text)]">D</span>
              <span className="text-[var(--color-red)]">AI</span>
              <span className="text-[var(--color-text)]">LY</span>
            </span>
            <p className="mt-4 max-w-xs text-sm text-[var(--color-text-dim)] leading-relaxed">
              A Muslim-founded AI &amp; tech newsletter for founders, builders, and
              operators. Signal over noise, principle over hype.
=======
    <footer className="border-t border-border-default mt-16 py-12">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🏳</span>
              <span className="font-heading font-bold text-lg">
                The Lantern <span className="text-accent-gold">Daily</span>
              </span>
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Signal before consensus. Curated intelligence for the clear-minded.
>>>>>>> origin/main
            </p>
            <p className="kicker mt-5">{SOCIAL_PROOF}</p>
          </div>

<<<<<<< HEAD
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label-mono mb-4">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border-soft)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-dim)]">
            © 2026 RedLantern Studios™. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-dim)]">
            Built in the open · Made with intention
=======
          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Navigate</h4>
            <ul className="space-y-2">
              {[
                { href: '/archive', label: 'Archive' },
                { href: '/shorts', label: 'Shorts' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Categories</h4>
            <ul className="space-y-2">
              {['Markets', 'Policy', 'Tech', 'Geopolitics'].map((cat) => (
                <li key={cat}>
                  <span className="text-sm text-text-secondary">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {currentYear} RedLantern Studios. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary">
            Signal before consensus.
>>>>>>> origin/main
          </p>
        </div>
      </div>
    </footer>
  );
}