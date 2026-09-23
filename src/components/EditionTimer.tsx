'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EditionTimer() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    function calculateTimeUntilNextEdition() {
      const now = new Date();
      // Target next 6:00 AM EST (10:00 UTC or 11:00 UTC depending on DST; 6 AM local publication target)
      const target = new Date(now);
      target.setHours(6, 0, 0, 0);

      // If 6 AM has already passed today, target tomorrow 6 AM
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    }

    setTimeLeft(calculateTimeUntilNextEdition());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilNextEdition());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#2A2D35] bg-[#0E1017] px-3 py-1 font-mono text-[11px] text-[#9CA3AF]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#B8922A] animate-pulse" />
        <span>Today&apos;s Edition Active</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#B8922A]/30 bg-[#0E1017] px-3.5 py-1 text-[11px] font-mono">
      <div className="flex items-center gap-1.5 text-[#B8922A]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        <span className="font-semibold uppercase tracking-wider">Edition Archives In:</span>
      </div>
      <div className="flex items-center gap-1 font-bold text-[#F7F2EE]">
        <span className="bg-[#1A1F2C] px-1.5 py-0.5 rounded text-[#E5C058]">{pad(timeLeft.hours)}h</span>
        <span>:</span>
        <span className="bg-[#1A1F2C] px-1.5 py-0.5 rounded text-[#E5C058]">{pad(timeLeft.minutes)}m</span>
        <span>:</span>
        <span className="bg-[#1A1F2C] px-1.5 py-0.5 rounded text-[#E5C058]">{pad(timeLeft.seconds)}s</span>
      </div>
      <span className="text-[#4B5563]">·</span>
      <Link
        href="/archive"
        className="text-[#9CA3AF] hover:text-[#B8922A] transition-colors flex items-center gap-1"
        title="View past archived editions"
      >
        <span>View Archive</span>
        <span>→</span>
      </Link>
    </div>
  );
}
