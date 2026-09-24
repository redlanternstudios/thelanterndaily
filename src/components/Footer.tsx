import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1F2E] bg-[#07080F] text-xs text-[#9CA3AF]">
      {/* ── Main 4-Column Bifurcated Navigation ── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Canonical Sector Desks */}
          <div className="space-y-3 font-mono">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8922A] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8922A]" />
              Sector Desks
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/section/ai-infrastructure" className="hover:text-[#F7F2EE] transition-colors">
                  AI &amp; Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/markets" className="hover:text-[#F7F2EE] transition-colors">
                  Islamic Finance &amp; Capital
                </Link>
              </li>
              <li>
                <Link href="/stack" className="hover:text-[#F7F2EE] transition-colors">
                  Operator Stack &amp; Tools
                </Link>
              </li>
              <li>
                <Link href="/section/builder-economy" className="hover:text-[#F7F2EE] transition-colors">
                  Builder Economy
                </Link>
              </li>
              <li>
                <Link href="/section/governance-geopolitics" className="hover:text-[#F7F2EE] transition-colors">
                  Governance &amp; Policy
                </Link>
              </li>
              <li>
                <Link href="/section/research-sacred-ethics-review" className="hover:text-[#F7F2EE] transition-colors">
                  Sacred Ethics &amp; Fiqh
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform & Terminal */}
          <div className="space-y-3 font-mono">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D42535] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D42535]" />
              Platform Hubs
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#F7F2EE] transition-colors">
                  Today&apos;s Daily Newsroom
                </Link>
              </li>
              <li>
                <Link href="/markets" className="hover:text-[#F7F2EE] transition-colors">
                  AAOIFI 21 Screener Terminal
                </Link>
              </li>
              <li>
                <Link href="/stack" className="hover:text-[#F7F2EE] transition-colors">
                  Production Operator Stack
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-[#F7F2EE] transition-colors text-[#B8922A] flex items-center gap-1.5 font-bold">
                  <span className="h-1 w-1 rounded-full bg-[#B8922A]" />
                  KP Frontier Radar &amp; Cadence
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-[#F7F2EE] transition-colors">
                  Archival Dispatch Registry
                </Link>
              </li>
              <li>
                <Link href="/#subscribe" className="text-[#E5C058] hover:text-white transition-colors">
                  Join Free Briefing →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Standards & Organization */}
          <div className="space-y-3 font-mono">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4ADE80] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
              Standards &amp; Team
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#F7F2EE] transition-colors">
                  About The Lantern Daily
                </Link>
              </li>
              <li>
                <Link href="/about/editorial-standards" className="hover:text-[#F7F2EE] transition-colors">
                  Editorial Doctrine &amp; Standards
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#F7F2EE] transition-colors">
                  Sovereign Careers ($100K+ Floor)
                </Link>
              </li>
              <li>
                <a
                  href="mailto:help@byredllc.com"
                  className="text-[#B8922A] hover:text-[#E5C058] underline decoration-[#374151] underline-offset-2 transition-colors"
                >
                  help@byredllc.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Sovereign Publisher Covenant */}
          <div className="space-y-3">
            <div className="font-serif font-extrabold text-lg tracking-tight text-[#F7F2EE]">
              The Lantern<span className="text-[#D42535]">DAI</span>LY
            </div>
            <p className="text-xs leading-relaxed text-[#9CA3AF]">
              An independent daily intelligence publication covering sovereign AI infrastructure, Islamic finance, and the builder economy. Published by RedLantern Studios™ · By Red, LLC.
            </p>
            <div className="rounded border border-[#1A1F2E] bg-[#0A0C14] p-2.5 font-mono text-[11px] text-[#6B7280] space-y-1">
              <div className="flex items-center gap-1.5 text-[#4ADE80]">
                <span>✓</span>
                <span className="font-semibold text-[#D1D5DB]">AAOIFI Standard 21 Compliant</span>
              </div>
              <div>Citations verified against authentic Sahih Kutub al-Sittah.</div>
            </div>
          </div>

        </div>

        {/* ── Sub-Footer Bar ── */}
        <div className="mt-12 border-t border-[#141722] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#6B7280]">
          <div>
            © {new Date().getFullYear()} RedLantern Studios™ · By Red, LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#9CA3AF] transition-colors">
              Privacy &amp; Terms
            </Link>
            <span>·</span>
            <Link href="/about/editorial-standards" className="hover:text-[#9CA3AF] transition-colors">
              Ethics Review
            </Link>
            <span>·</span>
            <a href="mailto:help@byredllc.com" className="hover:text-[#9CA3AF] transition-colors">
              Publisher Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
