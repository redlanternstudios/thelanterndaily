"use client";

import { useState, useMemo } from "react";
import ArticleCard from "@/components/ArticleCard";
import type { Post } from "@/lib/supabase/types";
import { normalizeCategory } from "@/lib/taxonomy";

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
    return posts.filter((p) => normalizeCategory(p.category) === active);
  }, [active, posts]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[#1E2028] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActive(cat);
              setVisible(PAGE_SIZE);
            }}
            className={`min-h-[44px] px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors border ${
              active === cat
                ? "border-[#D92532] bg-[#D92532] text-white font-bold"
                : "border-[#1E2028] bg-[#0A0C12] text-[#9CA3AF] hover:border-[#2A2D35] hover:text-[#F7F2EE]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      {shown.length === 0 && (
        <div className="py-16 text-center border border-[#1E2028] bg-[#0A0C12] mt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
            No dispatches recorded in this pillar yet.
          </p>
        </div>
      )}

      {/* Load more */}
      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="min-h-[44px] border border-[#2A2D35] bg-[#0A0C12] px-8 py-3 font-mono text-xs uppercase tracking-wider text-[#F7F2EE] hover:border-[#D92532] hover:text-[#D92532] transition-colors"
          >
            Load more dispatches ({filtered.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
