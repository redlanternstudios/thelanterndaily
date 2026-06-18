import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800">
      <div>
        <div className="font-serif text-[14px] font-bold text-white mb-1">The Lantern Daily</div>
        <div className="font-mono text-[8px] tracking-[0.12em] uppercase text-stone-600">
          A RedLantern Studios&trade; Publication &middot; By Red LLC
        </div>
      </div>
      <ul className="flex gap-6 list-none">
        {[
          { href: '/about', label: 'About' },
          { href: '/archive', label: 'Archive' },
          { href: '#subscribe', label: 'Subscribe' },
          { href: '/privacy', label: 'Privacy' },
          { href: '/stack', label: 'Stack' },
          { href: '/builders', label: 'Builders' },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-mono text-[9px] tracking-[0.1em] uppercase text-stone-500 no-underline hover:text-amber-400 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-stone-600 text-right">
        &copy; {new Date().getFullYear()}
      </div>
    </footer>
  )
}
