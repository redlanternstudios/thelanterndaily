"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Today',
      href: '/',
      icon: (active: boolean) => (
        <svg
          className={`h-5 w-5 transition-colors ${active ? 'text-[#D42535]' : 'text-[#6B7280]'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2.5 : 1.75}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      label: 'Radar',
      href: '/sources',
      icon: (active: boolean) => (
        <svg
          className={`h-5 w-5 transition-colors ${active ? 'text-[#B8922A]' : 'text-[#6B7280]'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" strokeWidth={active ? 2.5 : 1.75} />
          <path strokeLinecap="round" strokeWidth={active ? 2.5 : 1.75} d="M12 3v3m0 12v3M3 12h3m12 0h3" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'Markets',
      href: '/markets',
      icon: (active: boolean) => (
        <svg
          className={`h-5 w-5 transition-colors ${active ? 'text-[#4ADE80]' : 'text-[#6B7280]'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2.5 : 1.75}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      label: 'Stack',
      href: '/stack',
      icon: (active: boolean) => (
        <svg
          className={`h-5 w-5 transition-colors ${active ? 'text-[#60A5FA]' : 'text-[#6B7280]'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2.5 : 1.75}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      label: 'Careers',
      href: '/careers',
      icon: (active: boolean) => (
        <svg
          className={`h-5 w-5 transition-colors ${active ? 'text-[#E5C058]' : 'text-[#6B7280]'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2.5 : 1.75}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07080D]/95 backdrop-blur-xl border-t border-[#1A1F2E] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-md transition-all select-none ${
                isActive ? 'text-[#F7F2EE]' : 'text-[#6B7280] hover:text-[#D1D5DB]'
              }`}
            >
              {item.icon(isActive)}
              <span
                className={`font-mono text-[10px] mt-1 tracking-wider ${
                  isActive ? 'font-bold text-[#F7F2EE]' : 'text-[#6B7280]'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
