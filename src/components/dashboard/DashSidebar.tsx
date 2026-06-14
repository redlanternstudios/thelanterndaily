"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { group: "Workspace", items: ["Overview", "Articles", "Queue", "Drafts"] },
  { group: "Audience", items: ["Subscribers", "Segments", "Campaigns"] },
  { group: "Insights", items: ["Analytics", "Revenue", "Sources"] },
  { group: "Settings", items: ["Team", "Billing", "Integrations"] },
];

export default function DashSidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-card)] min-h-screen sticky top-0">
      <div className="p-6 border-b border-[var(--color-border)]">
        <Link href="/" className="font-headline text-[22px] leading-none block">
          <span className="text-[var(--color-text)]">The </span>
          <span className="text-[var(--color-red)]">Lantern </span>
          <span className="text-[var(--color-text)]">D</span>
          <span className="text-[var(--color-red)]">AI</span>
          <span className="text-[var(--color-text)]">LY</span>
        </Link>
        <span className="label-mono mt-2 block">Studio · CMS</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {NAV.map((section) => (
          <div key={section.group}>
            <h3 className="label-mono px-3 mb-2">{section.group}</h3>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActive(item)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      active === item
                        ? "bg-[var(--color-red)] text-[var(--color-text)] font-medium"
                        : "text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--color-border)] flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center bg-[var(--color-red)] font-mono text-sm font-bold text-[var(--color-text)]">
          LR
        </span>
        <div className="min-w-0">
          <p className="text-sm text-[var(--color-text)] truncate">Layla Rahman</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-dim)] truncate">
            Editor-in-chief
          </p>
        </div>
      </div>
    </aside>
  );
}
