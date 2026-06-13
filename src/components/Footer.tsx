import Link from "next/link";

const footerLinks = {
  Publication: [
    { href: "/issues", label: "Latest Issues" },
    { href: "/about", label: "About" },
    { href: "/subscribe", label: "Subscribe" },
    { href: "/archive", label: "Archive" },
  ],
  Connect: [
    { href: "https://twitter.com", label: "Twitter / X" },
    { href: "https://redlanternstudios.com", label: "RedLantern Studios" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-[var(--max-w-content)] px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🏮</span>
              <span className="serif text-lg font-bold">The Lantern Daily</span>
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              AI-curated intelligence for the signal-driven reader. Daily
              briefings on AI, markets, geopolitics, and the future of work.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mono text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tagline */}
          <div>
            <h4 className="mono text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] mb-4">
              Signal
            </h4>
            <p className="serif text-2xl font-bold italic text-[var(--color-accent-gold)]">
              Before Consensus
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} The Lantern Daily. A RedLantern
            Studios publication. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
