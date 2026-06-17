"use client";

import { useState } from "react";
import { LanternArticle, formatDate, readTime, articleHref } from "@/lib/lantern/types";

const FILTERS = [
  "All",
  "AI Infrastructure",
  "Halal Fintech",
  "Tech",
  "Operator Stack",
  "Field Notes",
  "Video",
];

interface ArchiveGridProps {
  articles: LanternArticle[];
  initialCategory?: string;
}

export function ArchiveGrid({ articles, initialCategory }: ArchiveGridProps) {
  const [active, setActive] = useState(initialCategory ?? "All");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  const filtered =
    active === "All"
      ? articles
      : active === "Video"
      ? articles.filter((a) => a.content_type === "video")
      : articles.filter((a) => a.category === active);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  return (
    <>
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
            onClick={() => { setActive(f); setPage(1); }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── ARTICLE GRID ───────────────────────────────────────── */}
      {visible.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0", color: "var(--dim)" }}>
          No content yet in this category.
        </div>
      ) : (
        <section
          className="article-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}
        >
          {visible.map((article) => (
            <ArchiveArticleCard key={article.id} article={article} />
          ))}
        </section>
      )}

      {/* ── LOAD MORE ──────────────────────────────────────────── */}
      {hasMore && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <button
            className="btn outline"
            style={{ padding: "16px 40px" }}
            onClick={() => setPage((p) => p + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

function ArchiveArticleCard({ article }: { article: LanternArticle }) {
  const href = articleHref(article);
  const isVideo = article.content_type === "video";

  return (
    <a href={href} target={article.url ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "block" }}>
      <div className="card" style={{ height: "100%" }}>
        {/* Image */}
        <div
          className={`article-image${isVideo ? " video-thumb" : ""}`}
          style={{
            height: "190px",
            background: "var(--surface)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {article.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image_url}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "var(--surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--dim)",
                fontSize: "12px",
              }}
            >
              {article.category ?? "Signal"}
            </div>
          )}
          {isVideo && (
            <div className="play-button" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              ▶
            </div>
          )}
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="kicker" style={{ marginBottom: "10px" }}>
            {article.category ?? article.content_type}
          </div>
          <h3 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: 800 }}>
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="excerpt" style={{ fontSize: "14px", marginBottom: "16px" }}>
              {article.excerpt}
            </p>
          )}
          <div className="byline" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {article.author && <span>{article.author}</span>}
            {article.author && <span style={{ color: "var(--dim)" }}>·</span>}
            <span>{formatDate(article.published_at)}</span>
            <span style={{ color: "var(--dim)" }}>·</span>
            <span>{readTime(article.read_time_minutes)}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
