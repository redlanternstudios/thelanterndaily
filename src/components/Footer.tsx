import Link from "next/link";
import { SOCIAL_PROOF } from "@/lib/content";

const columns = [
  {
    title: "Sections",
    links: [
      { label: "Today", href: "/" },
      { label: "AI", href: "/archive?cat=AI" },
      { label: "Markets", href: "/archive?cat=Markets" },
      { label: "Tech", href: "/archive?cat=Tech" },
      { label: "Operator Stack", href: "/stack" },
      { label: "Archive", href: "/archive" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Editorial Standards", href: "/about/editorial-standards" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Newsletter", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "RSS", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <span className="font-headline text-[28px] leading-none">
              <span className="text-[var(--color-text)]">The </span>
              <span className="text-[var(--color-text)]">Lantern </span>
              <span className="text-[var(--color-text)]">D</span>
              <span className="text-[var(--color-red)]">AI</span>
              <span className="text-[var(--color-text)]">LY</span>
            </span>
            <p className="mt-4 max-w-xs text-sm text-[var(--color-text-dim)] leading-relaxed">
              A Muslim-founded AI &amp; tech newsletter for founders, builders, and
              operators. Signal over noise, principle over hype.
            </p>
            <p className="kicker mt-5">{SOCIAL_PROOF}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label-mono mb-4">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors"
                    >
                      {link.label}
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
          </p>
        </div>
      </div>
    </footer>
  );
}
