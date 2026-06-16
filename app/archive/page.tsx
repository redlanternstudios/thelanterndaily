"use client";

import { useState } from "react";
import { LanternMasthead } from "@/components/LanternMasthead";
import { ArticleCard } from "@/components/ArticleCard";
import { lanternArticles } from "@/data/lanternArticles";

const FILTERS = [
  "All",
  "AI Infrastructure",
  "Halal Fintech",
  "Tech",
  "Operator Stack",
  "Field Notes",
  "Video",
];

export default function ArchivePage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? lanternArticles
      : active === "Video"
      ? lanternArticles.filter((a) => a.video)
      : lanternArticles.filter((a) => a.category === active);

  const displayArticles = filtered;

  return (
    <>
      <LanternMasthead />

      <div className="page-shell">
        {/* ── PAGE HEADER ────────────────────────────────────────── */}
        <header style={{ padding: "48px 0 40px", borderBottom: "1px solid var(--border)" }}>
          <div className="kicker" style={{ marginBottom: "12px" }}>
            Intelligence Archive
          </div>
          <h1 style={{ marginBottom: "16px" }}>Every signal we&apos;ve published.</h1>
          <p className="excerpt" style={{ maxWidth: "560px" }}>
            Searchable, filterable, and fully indexed. Muslim-built. AI-native.
            Signal over noise since 2025.
          </p>
        </header>

        {/* ── FILTER BAR ─────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
            padding: "24px 0",
            borderBottom: "1px solid var(--border)",
            marginBottom: "32px",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`btn${active === f ? " active-filter" : " outline"}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── ARTICLE GRID ───────────────────────────────────────── */}
        <section
          className="article-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}
        >
          {displayArticles.map((article, i) => (
            <ArticleCard key={`${article.id}-${i}`} article={article} imageHeight="190px" />
          ))}
        </section>

        {/* ── LOAD MORE ──────────────────────────────────────────── */}
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <button className="btn outline" style={{ padding: "16px 40px" }}>
            Load More
          </button>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer className="footer">
          <div className="footer-bottom">
            <span>© 2026 By Red, LLC</span>
            <span>BUILD IN PUBLIC. OPERATE IN TRUTH.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
