"use client";

import { useState, useMemo } from "react";
import ArticleCard from "@/components/ArticleCard";
import { ALL_ARTICLES, CATEGORIES } from "@/lib/content";

const PAGE_SIZE = 8;

export default function ArchiveGrid({ initialCat = "All" }: { initialCat?: string }) {
  const [active, setActive] = useState(
    CATEGORIES.includes(initialCat) ? initialCat : "All"
  );
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (active === "All") return ALL_ARTICLES;
    return ALL_ARTICLES.filter((a) => a.category === active);
  }, [active]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-0.5 border-y border-[var(--color-border)] bg-[var(--color-border)]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActive(cat);
              setVisible(PAGE_SIZE);
            }}
            className={`px-5 py-3 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
              active === cat
                ? "bg-[var(--color-red)] text-[var(--color-text)] font-bold"
                : "bg-[var(--color-bg)] text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-0.5 grid gap-0.5 bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-16 text-center font-mono text-sm uppercase tracking-[0.12em] text-[var(--color-text-dim)]">
          No dispatches in this section yet.
        </p>
      )}

      {/* Load more */}
      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="border border-[var(--color-border)] px-8 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-text)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] transition-colors"
          >
            Load more dispatches
          </button>
        </div>
      )}
    </div>
  );
}
