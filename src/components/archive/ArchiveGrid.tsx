"use client";

import { useState, useMemo } from "react";
import ArticleCard from "@/components/ArticleCard";
import type { Post } from "@/lib/supabase/types";

const PAGE_SIZE = 8;

export default function ArchiveGrid({
  posts,
  categories,
  initialCat = "All",
}: {
  posts: Post[];
  categories: string[];
  initialCat?: string;
}) {
  const [active, setActive] = useState(
    categories.includes(initialCat) ? initialCat : "All"
  );
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-0.5 border-y border-[var(--color-border)] bg-[var(--color-border)]">
        {categories.map((cat) => (
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
        {shown.map((post) => (
          <ArticleCard key={post.slug} post={post} />
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
