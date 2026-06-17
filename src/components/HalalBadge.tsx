"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type HalalVerdict = "positive" | "critical" | "blocked" | "nuanced" | "pending";

export interface HalalReview {
  verdict: HalalVerdict;
  editorialNote?: string;    // legacy alias → rulingDetail
  rulingSummary?: string;    // one sentence teaser shown in header row
  rulingDetail?: string;     // 2–3 sentences in drawer
  reviewedBy?: string;
  reviewedDate?: string;
  methodologyUrl?: string;
}

// ─── Variant config ───────────────────────────────────────────────────────────

const V = {
  positive: {
    color: "#16a34a",
    bg: "rgba(22,163,74,0.10)",
    border: "rgba(22,163,74,0.30)",
    label: "HALAL-ALIGNED",
    defaultSummary: "Delivers genuine benefit; no prohibited mechanisms found",
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1.5 6L4.5 9.5L10.5 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  critical: {
    color: "#d97706",
    bg: "rgba(217,119,6,0.10)",
    border: "rgba(217,119,6,0.30)",
    label: "CRITICAL",
    defaultSummary: "Contains design patterns that conflict with Islamic ethics",
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1.5L11 10.5H1L6 1.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6 5.5V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="6" cy="9" r="0.55" fill="currentColor" />
      </svg>
    ),
  },
  blocked: {
    color: "#D92532",
    bg: "rgba(217,37,50,0.10)",
    border: "rgba(217,37,50,0.30)",
    label: "BLOCKED",
    defaultSummary: "Contains riba, maysir, or gharar — hard prohibitions under all major madhabs",
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  nuanced: {
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.10)",
    border: "rgba(79,70,229,0.30)",
    label: "NUANCED",
    defaultSummary: "Active scholarly disagreement; editorial analysis provided",
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1.5 7C3 4 4.5 4 6 6C7.5 8 9 8 10.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  pending: {
    color: "#6b7280",
    bg: "rgba(107,114,128,0.10)",
    border: "rgba(107,114,128,0.30)",
    label: "PENDING",
    defaultSummary: "Compliance review in progress",
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2.2 1.8" />
      </svg>
    ),
  },
} as const;

// ─── Layer 1 — CardBadge ──────────────────────────────────────────────────────

export function CardBadge({ verdict }: { verdict: HalalVerdict }) {
  const cfg = V[verdict];
  const { Icon } = cfg;
  return (
    <div
      title={cfg.label}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        background: "rgba(7,8,13,0.78)",
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
        backdropFilter: "blur(6px)",
        flexShrink: 0,
      }}
    >
      <Icon />
    </div>
  );
}

// ─── Drawer contents (shared between desktop accordion + mobile sheet) ────────

function DrawerBody({ review, onClose }: { review: HalalReview; onClose: () => void }) {
  const cfg = V[review.verdict];
  const { Icon } = cfg;
  const isPending = review.verdict === "pending";
  const summary = review.rulingSummary ?? cfg.defaultSummary;
  const detail = review.rulingDetail ?? review.editorialNote;

  return (
    <>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: cfg.color }}>
          <Icon />
          <span style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: cfg.color,
          }}>
            {cfg.label}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close classification drawer"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4, display: "flex" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2.5 2.5L12.5 12.5M12.5 2.5L2.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {isPending ? (
        <p style={{ textAlign: "center", color: "#9ca3af", fontStyle: "italic", fontSize: 14, lineHeight: 1.7, padding: "16px 0" }}>
          Compliance review in progress. Check back before acting on this content.
        </p>
      ) : (
        <>
          <p style={{ fontSize: 16, color: "#F7F2EE", lineHeight: 1.65, margin: 0 }}>
            {summary}
          </p>

          {detail && (
            <div style={{ marginTop: 16, paddingLeft: 14, borderLeft: `3px solid ${cfg.color}` }}>
              <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.75, margin: 0 }}>
                {detail}
              </p>
            </div>
          )}

          <p style={{
            marginTop: 16,
            fontSize: 11,
            color: "#6b7280",
            fontFamily: "var(--font-jetbrains), monospace",
            letterSpacing: "0.05em",
            margin: "16px 0 0",
          }}>
            Reviewed by {review.reviewedBy ?? "The Lantern Daily Editorial Team"}
            {review.reviewedDate ? ` · ${review.reviewedDate}` : ""}
          </p>

          {review.methodologyUrl && (
            <a
              href={review.methodologyUrl}
              style={{ display: "inline-block", marginTop: 10, fontSize: 12, color: cfg.color, textDecoration: "none", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.08em" }}
            >
              View our methodology →
            </a>
          )}
        </>
      )}
    </>
  );
}

// ─── Layer 2 + 3 — ArticleHeaderBadge with inline accordion / bottom sheet ───

export function ArticleHeaderBadge({ review }: { review: HalalReview }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cfg = V[review.verdict];
  const { Icon } = cfg;
  const summary = review.rulingSummary ?? cfg.defaultSummary;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    if (!open || isMobile) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, isMobile]);

  return (
    <>
      <div ref={wrapperRef} style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>
        {/* Trigger row */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            borderRadius: open && !isMobile ? "4px 4px 0 0" : 4,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span style={{ color: cfg.color, display: "flex", flexShrink: 0 }}><Icon /></span>
          <span style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: cfg.color,
            flexShrink: 0,
            textTransform: "uppercase",
          }}>
            {cfg.label}
          </span>
          <span style={{ color: "#6b7280", fontSize: 12, flexShrink: 0 }}>·</span>
          <span style={{ fontSize: 13, color: "#9ca3af", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {summary}
          </span>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ flexShrink: 0, color: "#6b7280", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s ease" }}
          >
            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Desktop — inline accordion */}
        {open && !isMobile && (
          <div style={{
            padding: "20px 20px 24px",
            background: "#0f1117",
            border: `1px solid ${cfg.border}`,
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
          }}>
            <DrawerBody review={review} onClose={() => setOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile — bottom sheet */}
      {open && isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(7,8,13,0.65)",
              backdropFilter: "blur(2px)",
            }}
          />
          {/* Sheet */}
          <div style={{
            position: "fixed",
            bottom: 0, left: 0, right: 0,
            zIndex: 50,
            background: "#0f1117",
            borderTop: `2px solid ${cfg.color}`,
            borderRadius: "12px 12px 0 0",
            padding: "20px 20px 36px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}>
            {/* Drag handle */}
            <div style={{ width: 36, height: 4, background: "#1E2028", borderRadius: 2, margin: "0 auto 20px" }} />
            <DrawerBody review={review} onClose={() => setOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}

// ─── BadgeLegendStrip ─────────────────────────────────────────────────────────

const LEGEND: Array<{ verdict: HalalVerdict; description: string }> = [
  { verdict: "positive", description: "Delivers genuine benefit; no prohibited mechanisms found" },
  { verdict: "critical", description: "Contains design patterns that conflict with Islamic ethics" },
  { verdict: "blocked", description: "Contains riba, maysir, or gharar — hard prohibitions under all major madhabs" },
  { verdict: "nuanced", description: "Active scholarly disagreement; editorial analysis provided" },
];

export function BadgeLegendStrip() {
  return (
    <div style={{ background: "#0F1117", borderBottom: "1px solid #1E2028", padding: "32px 0" }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 48px",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "24px",
      }}>
        {LEGEND.map(({ verdict, description }) => {
          const cfg = V[verdict];
          const { Icon } = cfg;
          return (
            <div key={verdict} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ color: cfg.color, display: "flex", marginTop: 2, flexShrink: 0, fontSize: 18 }}><Icon /></div>
              <div>
                <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: cfg.color, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                  {cfg.label}
                </span>
                <span style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.6 }}>
                  {description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HalalBadge (legacy inline pill) ─────────────────────────────────────────

export function HalalBadge({ verdict, size = "sm" }: { verdict: HalalVerdict; size?: "sm" | "md" }) {
  const cfg = V[verdict];
  const { Icon } = cfg;
  const isMd = size === "md";
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: isMd ? 6 : 4,
      padding: isMd ? "4px 10px" : "3px 7px",
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 3,
      color: cfg.color,
    }}>
      <Icon />
      <span style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: isMd ? 10 : 9,
        fontWeight: 700,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
      }}>
        {cfg.label}
      </span>
    </span>
  );
}

// ─── EditorialNote (Islamic Lens block) ───────────────────────────────────────

export function EditorialNote({ text }: { text: string }) {
  return (
    <aside style={{ margin: "28px 0", paddingLeft: 20, borderLeft: "3px solid #D92532" }}>
      <p style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.18em",
        color: "#D92532",
        textTransform: "uppercase",
        marginBottom: 10,
        margin: "0 0 10px",
      }}>
        Islamic Lens
      </p>
      <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
        {text}
      </p>
    </aside>
  );
}
