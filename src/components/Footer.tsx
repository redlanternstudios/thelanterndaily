import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1F2E] bg-[#07080F] px-4 py-12 text-center text-xs text-[#6B7280]">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono">
          <Link href="/" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Today</Link>
          <Link href="/vault" className="text-[#B8922A] transition-colors hover:text-[#E5C058]">✦ The Vault</Link>
          <Link href="/creators" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Creators</Link>
          <Link href="/stack" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Build Stack</Link>
          <Link href="/archive" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Archive</Link>
          <Link href="/about" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">About</Link>
          <Link href="/about/editorial-standards" className="text-[#9CA3AF] transition-colors hover:text-[#F7F2EE]">Editorial Standards</Link>
        </div>
        <p className="text-xs text-[#9CA3AF]">
          The Lantern Daily is an independent intelligence briefing by RedLantern Studios™.
        </p>
        <p className="text-[11px] text-[#6B7280]">
          Classical citations verified against authentic Sahih Kutub al-Sittah and authoritative tafsir.
        </p>
      </div>
    </footer>
  );
}
