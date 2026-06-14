'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/archive', label: 'Archive' },
  { href: '/shorts', label: 'Shorts' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="page-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl leading-none" aria-hidden="true">🏳</span>
          <span className="font-heading text-xl font-bold tracking-tight">
            The Lantern <span className="text-accent-gold">Daily</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-primary p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="page-container pb-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}