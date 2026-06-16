"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";

function Logo() {
  return (
    <Link href="/" className="block leading-none" aria-label="The Lantern Daily — home">
      <span
        className="font-headline block text-[26px] sm:text-[34px] leading-none tracking-tight"
        aria-hidden="true"
      >
        <span className="text-[var(--color-text)]">The Lantern D</span>
        <span className="text-[var(--color-red)]">AI</span>
        <span className="text-[var(--color-text)]">LY</span>
      </span>
      <span className="sr-only">The Lantern Daily</span>
    </Link>
  );
}

export default function Masthead() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[var(--max-w)] px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6 py-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#subscribe"
              className="hidden sm:inline-flex items-center bg-[var(--color-red)] px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--color-text)] hover:opacity-90 transition-opacity"
            >
              Join the Lantern
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="block h-0.5 w-6 bg-[var(--color-text)]" />
              <span className="block h-0.5 w-6 bg-[var(--color-text)]" />
              <span className="block h-0.5 w-6 bg-[var(--color-text)]" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
          aria-label="Mobile"
        >
          <div className="flex flex-col px-4 sm:px-6 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-dim)] hover:text-[var(--color-text)] py-3 border-b border-[var(--color-border-soft)] last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#subscribe"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 inline-flex items-center justify-center bg-[var(--color-red)] px-5 py-3 font-mono text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--color-text)]"
            >
              Join the Lantern
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
