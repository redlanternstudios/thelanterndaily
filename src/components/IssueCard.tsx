"use client";

import Link from "next/link";

export interface IssueCardProps {
  title: string;
  date: string;
  excerpt: string;
  topics: string[];
  readTime?: string;
  slug: string;
  tier?: "free" | "premium";
}

export default function IssueCard({
  title,
  date,
  excerpt,
  topics,
  slug,
  tier = "free",
}: IssueCardProps) {
  return (
    <article
      style={{
        borderRadius: "12px",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        padding: "24px",
        transition: "all 0.3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <time style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {date}
        </time>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 8px",
            border: "1px solid",
            color: tier === "premium" ? "var(--red)" : "var(--muted)",
            borderColor: tier === "premium" ? "var(--red-border)" : "var(--dim)",
          }}
        >
          {tier === "premium" ? "Premium" : "Free"}
        </span>
      </div>

      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 700, lineHeight: 1.3, color: "var(--off-white)", marginBottom: "10px" }}>
        <Link href={`/issues/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          {title}
        </Link>
      </h3>

      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--muted)", marginBottom: "16px" }}>
        {excerpt}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {topics.map((topic) => (
          <span
            key={topic}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              padding: "4px 10px",
              background: "rgba(255,255,255,0.04)",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {topic}
          </span>
        ))}
      </div>
    </article>
  );
}
