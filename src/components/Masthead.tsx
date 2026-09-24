"use client";

import { useState } from "react";
import Link from "next/link";
import EditionTimer from "@/components/EditionTimer";

const PRIMARY_NAV = [
  { label: "Today", href: "/" },
  { label: "Islamic Finance", href: "/markets" },
  { label: "Stack", href: "/stack" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

const SECTOR_DESKS = [
  { label: "AI Infrastructure", href: "/section/ai-infrastructure" },
  { label: "KP Frontier Radar", href: "/sources" },
  { label: "Islamic Finance", href: "/markets" },
  { label: "Operator Stack", href: "/stack" },
  { label: "Builder Economy", href: "/section/builder-economy" },
  { label: "Governance & Policy", href: "/section/governance-geopolitics" },
  { label: "Sacred Ethics & Fiqh", href: "/section/research-sacred-ethics-review" },
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
      {/* ── Tier 1: Global Intelligence Desk Bar ── */}
      <div className="border-b border-[#1A1E2B] bg-[#0A0C14] px-4 py-2 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-[#9CA3AF]">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#4ADE80]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              GLOBAL DESK ACTIVE
            </span>
            <span className="text-[#2A2E3D]">·</span>
            <span className="text-[#D1D5DB] tracking-wider">NEW YORK · LONDON · DUBAI · TOKYO</span>
            <span className="text-[#2A2E3D]">·</span>
            <span className="font-semibold text-[#F7F2EE]">Wednesday, September 23, 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <EditionTimer />
          </div>
        </div>
      </div>

      {/* ── Tier 2: Core Masthead Navigation ── */}
      <div className="flex justify-between items-center px-4 sm:px-6 h-16 w-full max-w-7xl mx-auto">
        <Logo />

        {/* Desktop Primary Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {PRIMARY_NAV.map((link) => (
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

      {/* ── Tier 3: Sub-Nav Sector Bifurcation Ribbon ── */}
      <nav aria-label="Sector Desks" className="border-t border-[#141722] bg-[#07080D] px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto whitespace-nowrap py-2 no-scrollbar text-xs font-mono">
          <span className="hidden pr-2 font-bold uppercase tracking-widest text-[#B8922A] md:inline-block flex-shrink-0">
            Desks:
          </span>
          {SECTOR_DESKS.map((desk, idx) => (
            <span key={desk.label} className="flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
              <Link
                href={desk.href}
                className="flex-shrink-0 rounded px-2.5 py-1 text-[#9CA3AF] hover:bg-[#0E101A] hover:text-[#F7F2EE] transition-colors"
              >
                {desk.label}
              </Link>
              {idx < SECTOR_DESKS.length - 1 && <span className="text-[#1F2430]">·</span>}
            </span>
          ))}
        </div>
      </nav>

      {/* ── Mobile Dropdown Drawer (Dual Bifurcation) ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1E2028] bg-[#0A0C12] px-4 py-5 space-y-5">
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#B8922A] font-bold">
              Core Pillars
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-wider text-[#D1D5DB] py-1.5 hover:text-[#B8922A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1A1F2E] pt-3">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#D42535] font-bold">
              Sector Desks
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {SECTOR_DESKS.map((desk) => (
                <Link
                  key={desk.label}
                  href={desk.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs text-[#9CA3AF] py-1 hover:text-[#F7F2EE] transition-colors flex items-center justify-between"
                >
                  <span>{desk.label}</span>
                  <span className="text-[#4B5563]">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
