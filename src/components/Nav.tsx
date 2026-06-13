"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Today" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/stack", label: "Stack" },
=======
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shorts", label: "Shorts" },
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export default function Nav() {
<<<<<<< HEAD
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
      {/* Logo */}
      <Link href="/" className="nav-logo flex items-baseline gap-0 no-underline">
        <span className="nav-logo-name font-serif text-[15px] font-bold text-white tracking-[0.02em]">
          The Lantern
        </span>
        <span className="nav-logo-daily font-mono text-[11px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase ml-[6px]">
          D<span className="text-[var(--red)]">AI</span>LY
        </span>
      </Link>

      {/* Desktop nav */}
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

      {/* Right side */}
      <div className="flex items-center gap-3">
        <span className="label-rls font-mono text-[9px] tracking-[0.12em] text-[var(--dim)] uppercase hidden sm:inline">
          RedLantern Studios™
        </span>
        <a
          href="#subscribe"
          className="btn-subscribe bg-[var(--red)] text-white font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-5 py-[9px] border-none cursor-pointer hover:opacity-85 transition-opacity no-underline inline-block"
        >
          Subscribe
        </a>
        {/* Mobile hamburger */}
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

      {/* Mobile menu */}
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
=======
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-serif text-amber-400 hover:text-amber-300 transition-colors tracking-tight"
          >
            The Lantern Daily
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-400"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden text-stone-400 hover:text-stone-200 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="sm:hidden bg-stone-950 border-t border-stone-800">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
<<<<<<< HEAD
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
=======
                  className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-400 bg-stone-900"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
>>>>>>> 1b0c004 (feat: The Lantern Daily — all 6 pages, 8 components, API routes, design system)
    </nav>
  );
}
