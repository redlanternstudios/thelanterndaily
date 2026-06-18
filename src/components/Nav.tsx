"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Today" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/builders", label: "Builders" },
  { href: "/stack", label: "Stack" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between h-[60px] px-6 md:px-12"
      style={{
        background: scrolled ? "rgba(7,8,15,0.92)" : "rgba(7,8,15,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link href="/" className="flex items-baseline gap-0 no-underline">
        <span className="font-serif text-[15px] font-bold text-white tracking-[0.02em]">
          The Lantern
        </span>
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase ml-[6px]">
          D<span className="text-[var(--red)]">AI</span>LY
        </span>
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--muted)] hover:text-white transition-colors no-underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.12em] text-[var(--dim)] uppercase hidden sm:inline">
          RedLantern Studios™
        </span>
        <a
          href="#subscribe"
          className="bg-[var(--red)] text-white font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-5 py-[9px] border-none cursor-pointer hover:opacity-85 transition-opacity no-underline inline-block"
        >
          Subscribe
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-5 bg-[var(--off-white)]"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[2px] w-5 bg-[var(--off-white)]"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-5 bg-[var(--off-white)]"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[var(--bg-base)] border-b border-[var(--border)] absolute top-[60px] left-0 right-0"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--muted)] hover:text-white transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#subscribe"
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-[var(--red)] text-white font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-5 py-3 text-center no-underline"
              >
                Subscribe
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
}
