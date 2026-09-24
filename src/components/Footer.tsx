import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1F2E] bg-[#07080F] px-4 py-12 text-center text-xs text-[#6B7280]">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
          <Link href="/" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Today</Link>
          <Link href="/markets" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Islamic Finance</Link>
          <Link href="/stack" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Stack</Link>
          <Link href="/careers" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Careers</Link>
          <Link href="/about" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">About</Link>
          <Link href="/about/editorial-standards" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Editorial Standards</Link>
        </div>
        <p className="text-xs text-[#9CA3AF]">
          The Lantern Daily is an independent intelligence briefing by RedLantern Studios™ · By Red, LLC.
        </p>
        <p className="text-xs font-mono text-[#D1D5DB]">
          Contact &amp; Inquiries:{' '}
          <a
            href="mailto:help@byredllc.com"
            className="text-[#B8922A] hover:text-[#E5C058] underline decoration-[#4B5563] underline-offset-2"
          >
            help@byredllc.com
          </a>
        </p>
        <p className="text-[11px] text-[#6B7280]">
          Classical citations verified against authentic Sahih Kutub al-Sittah and authoritative tafsir.
        </p>
      </div>
    </footer>
  );
}
