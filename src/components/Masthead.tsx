"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Today", href: "/" },
  { label: "Stack", href: "/stack" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
];

function Logo() {
  return (
    <Link href="/" className="no-underline select-none" aria-label="The Lantern Daily — home">
      <span className="font-serif font-extrabold text-2xl sm:text-3xl tracking-tight leading-none">
        <span className="text-[#9CA3AF]">The </span>
        <span className="text-[#9CA3AF] mr-1.5">Lantern</span>
        <span className="text-[#9CA3AF]">D</span>
        <span className="text-[#D42535]">AI</span>
        <span className="text-[#9CA3AF]">LY</span>
      </span>
    </Link>
  );
}

export default function Masthead() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-col bg-[#07080D] border-b border-[#1E2028] w-full">
      <div className="flex justify-between items-center px-4 sm:px-6 h-16 w-full max-w-7xl mx-auto">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF] hover:text-[#F7F2EE] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#subscribe"
            className="bg-[#D42535] text-white font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#b01e2c] transition-colors"
          >
            Join Free
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/#subscribe"
            className="bg-[#D42535] text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5"
          >
            Join
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9CA3AF] hover:text-[#F7F2EE] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1E2028] bg-[#0A0C12] px-4 py-4 space-y-3">
          {NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-wider text-[#D1D5DB] py-2 hover:text-[#B8922A] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
