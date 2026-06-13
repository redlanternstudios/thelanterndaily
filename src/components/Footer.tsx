import Link from "next/link";
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
    </footer>
  );
}
