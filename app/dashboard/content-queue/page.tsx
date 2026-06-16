"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { LanternLogoText } from "@/components/LanternMasthead";

/* ─── TYPES ──────────────────────────────────────────────────────────────── */

type ContentType = "article" | "market" | "video";
type HalalVerdict = "pending_screen" | "pass" | "review" | "fail";
type QueueStatus = "pending" | "approved" | "rejected" | "published";

type QueueItem = {
  id: string;
  title: string;
  url: string | null;
  source: string | null;
  ai_summary: string | null;
  relevance_score: number | null;
  status: QueueStatus;
  queued_at: string;
  reviewed_at: string | null;
  content_type: ContentType;
  editorial_commentary: string | null;
  source_headline: string | null;
  source_excerpt: string | null;
  halal_score: number | null;
  halal_flags: string[];
  halal_verdict: HalalVerdict;
  reject_reason: string | null;
  youtube_video_id: string | null;
  market_ticker: string | null;
  market_data: Record<string, unknown> | null;
  scheduled_for: string | null;
};

type ActiveFilter = "all" | ContentType | "pending" | "approved" | "rejected" | "published";

/* ─── FILTER CONFIG ──────────────────────────────────────────────────────── */

const FILTERS: { label: string; value: ActiveFilter }[] = [
  { label: "All", value: "all" },
  { label: "Articles", value: "article" },
  { label: "Market", value: "market" },
  { label: "Videos", value: "video" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "var(--gold)",
  approved: "var(--green)",
  rejected: "var(--red)",
  published: "var(--blue)",
};

const VERDICT_COLORS: Record<string, string> = {
  pass: "var(--green)",
  review: "var(--gold)",
  fail: "var(--red)",
  pending_screen: "var(--dim)",
};

const TYPE_ICONS: Record<ContentType, string> = {
  article: "📰",
  market: "📊",
  video: "🎬",
};

/* ─── SIDEBAR ────────────────────────────────────────────────────────────── */

const NAV_SECTIONS = [
  {
    label: "Content",
    items: ["Dashboard", "Content Queue", "Articles", "Videos", "Market Modules", "Series", "Tags", "Authors"],
  },
  { label: "Publishing", items: ["Issues", "Sections", "Landing Pages", "Navigation"] },
  { label: "Assets", items: ["Media Library"] },
  { label: "Growth", items: ["Subscribers", "Emails", "Beehiiv Sync", "Sponsors"] },
  { label: "System", items: ["Analytics", "Settings"] },
];

function Sidebar() {
  return (
    <aside
      style={{
        background: "var(--panel)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        width: "280px",
        flexShrink: 0,
      }}
    >
      <div style={{ padding: "24px 20px", borderBottom: "1px solid var(--border)" }}>
        <LanternLogoText />
      </div>
      <nav style={{ flex: 1, paddingBottom: "24px" }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            {section.items.map((item) => {
              const href = `/dashboard/${item.toLowerCase().replace(/\s+/g, "-")}`;
              const isActive = item === "Content Queue";
              return (
                <a
                  key={item}
                  className={`sidebar-nav-item${isActive ? " active" : ""}`}
                  href={href}
                >
                  {item}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            background: "var(--dim)",
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>
            AI Queue Active
          </div>
          <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "Space Mono, monospace" }}>
            n8n → SwarmClaw pipeline
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── CONTENT QUEUE CARD ─────────────────────────────────────────────────── */

function ContentQueueCard({
  item,
  onStatusChange,
}: {
  item: QueueItem;
  onStatusChange: (id: string, newStatus: QueueStatus) => void;
}) {
  const [commentary, setCommentary] = useState(item.editorial_commentary ?? "");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync commentary when real-time update arrives (only if not actively editing)
  useEffect(() => {
    if (!editing) {
      setCommentary(item.editorial_commentary ?? "");
    }
  }, [item.editorial_commentary, editing]);

  // Auto-resize textarea
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      textareaRef.current.focus();
    }
  }, [editing]);

  const saveCommentary = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/dashboard/queue/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, editorial_commentary: commentary }),
      });
      if (!res.ok) throw new Error("Save failed");
      setEditing(false);
    } catch {
      alert("Failed to save commentary. Try again.");
    } finally {
      setSaving(false);
    }
  }, [item.id, commentary]);

  const handleAction = useCallback(
    async (action: "approve" | "reject" | "publish", extra?: Record<string, unknown>) => {
      setActionLoading(action);
      try {
        const res = await fetch(`/api/dashboard/queue/${action}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, ...extra }),
        });
        if (!res.ok) throw new Error(`${action} failed`);
        const newStatus: QueueStatus =
          action === "approve" ? "approved" : action === "reject" ? "rejected" : "published";
        onStatusChange(item.id, newStatus);
      } catch {
        alert(`Failed to ${action}. Try again.`);
      } finally {
        setActionLoading(null);
        setScheduling(false);
      }
    },
    [item.id, onStatusChange]
  );

  const timeAgo = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor(diff / 60_000);
    if (h >= 24) return `${Math.floor(h / 24)}d ago`;
    if (h >= 1) return `${h}h ago`;
    return `${m}m ago`;
  };

  const halalScoreColor = (score: number | null) => {
    if (score === null) return "var(--dim)";
    if (score >= 80) return "var(--green)";
    if (score >= 60) return "var(--gold)";
    return "var(--red)";
  };

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderLeft: `3px solid ${STATUS_COLORS[item.status] ?? "var(--dim)"}`,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.15s",
      }}
    >
      {/* ── ROW 1: Badges + meta ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        {/* Content type */}
        <span
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            fontWeight: 700,
            color: "var(--off)",
            background: "var(--panel)",
            border: "1px solid var(--border-2)",
            padding: "3px 8px",
            letterSpacing: "0.08em",
          }}
        >
          {TYPE_ICONS[item.content_type]} {item.content_type.toUpperCase()}
        </span>

        {/* Halal score */}
        {item.halal_score !== null && (
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              fontWeight: 700,
              color: halalScoreColor(item.halal_score),
              border: `1px solid ${halalScoreColor(item.halal_score)}`,
              padding: "3px 8px",
            }}
          >
            HALAL {item.halal_score}/100
          </span>
        )}

        {/* Halal verdict */}
        <span
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            color: VERDICT_COLORS[item.halal_verdict] ?? "var(--dim)",
            padding: "3px 8px",
            border: `1px solid ${VERDICT_COLORS[item.halal_verdict] ?? "var(--dim)"}`,
          }}
        >
          {item.halal_verdict.replace("_", " ").toUpperCase()}
        </span>

        {/* Status */}
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            fontWeight: 700,
            color: STATUS_COLORS[item.status] ?? "var(--dim)",
            letterSpacing: "0.06em",
          }}
        >
          {item.status.toUpperCase()}
        </span>
      </div>

      {/* ── ROW 2: Headline ── */}
      <div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--off)",
            lineHeight: 1.35,
            marginBottom: "4px",
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "11px",
            color: "var(--dim)",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {item.source && <span>{item.source}</span>}
          {item.market_ticker && (
            <span style={{ color: "var(--blue)" }}>${item.market_ticker}</span>
          )}
          <span>queued {timeAgo(item.queued_at)}</span>
          {item.scheduled_for && (
            <span style={{ color: "var(--gold)" }}>
              scheduled {new Date(item.scheduled_for).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* ── ROW 3: Source excerpt (if present) ── */}
      {item.source_excerpt && (
        <div
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            fontStyle: "italic",
            borderLeft: "2px solid var(--border-2)",
            paddingLeft: "12px",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{item.source_excerpt}&rdquo;
        </div>
      )}

      {/* ── ROW 4: Editorial commentary (editable) ── */}
      <div
        style={{
          background: "var(--panel)",
          border: `1px solid ${editing ? "var(--border-2)" : "var(--border)"}`,
          padding: "14px",
        }}
      >
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "9px",
            color: "var(--dim)",
            letterSpacing: "0.1em",
            marginBottom: "8px",
          }}
        >
          LANTERN COMMENTARY {editing ? "(editing)" : "(ai draft)"}
        </div>
        {editing ? (
          <textarea
            ref={textareaRef}
            value={commentary}
            onChange={(e) => setCommentary(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "var(--off)",
              fontSize: "14px",
              lineHeight: 1.6,
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              minHeight: "80px",
            }}
            placeholder="Write the editorial commentary for this piece…"
          />
        ) : (
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: commentary ? "var(--off)" : "var(--dim)",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {commentary || "No commentary yet. AI pipeline will populate this, or click Edit to write manually."}
          </p>
        )}
      </div>

      {/* ── ROW 5: Halal flags ── */}
      {item.halal_flags && item.halal_flags.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {item.halal_flags.map((flag, i) => (
            <span
              key={i}
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                color: "var(--red)",
                border: "1px solid var(--red)",
                padding: "2px 6px",
              }}
            >
              ⚠ {flag}
            </span>
          ))}
        </div>
      )}

      {/* ── ROW 6: Reject reason ── */}
      {item.status === "rejected" && item.reject_reason && (
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "11px",
            color: "var(--red)",
            padding: "8px 12px",
            border: "1px solid var(--red)",
          }}
        >
          REJECTED: {item.reject_reason}
        </div>
      )}

      {/* ── ROW 7: YouTube embed (if video + approved/pending) ── */}
      {item.content_type === "video" && item.youtube_video_id && item.status !== "rejected" && (
        <div style={{ aspectRatio: "16/9", background: "var(--panel)", position: "relative" }}>
          <iframe
            src={`https://www.youtube.com/embed/${item.youtube_video_id}`}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* ── ROW 8: Market data (if market type) ── */}
      {item.content_type === "market" && item.market_data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}
        >
          {Object.entries(item.market_data)
            .slice(0, 6)
            .map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: "var(--panel)",
                  padding: "10px",
                  borderTop: "2px solid var(--border-2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "9px",
                    color: "var(--dim)",
                    marginBottom: "4px",
                  }}
                >
                  {k.toUpperCase().replace(/_/g, " ")}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--off)" }}>
                  {String(v)}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* ── ROW 9: Schedule picker ── */}
      {scheduling && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            padding: "12px",
            background: "var(--panel)",
            border: "1px solid var(--border-2)",
          }}
        >
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "var(--muted)",
            }}
          >
            PUBLISH AT
          </span>
          <input
            type="datetime-local"
            value={scheduleDate}
            min={new Date().toISOString().slice(0, 16)}
            onChange={(e) => setScheduleDate(e.target.value)}
            style={{
              background: "transparent",
              border: "1px solid var(--border-2)",
              color: "var(--off)",
              padding: "6px 10px",
              fontSize: "12px",
              fontFamily: "Space Mono, monospace",
              flex: 1,
            }}
          />
          <button
            onClick={() =>
              scheduleDate &&
              handleAction("approve", {
                scheduled_for: new Date(scheduleDate).toISOString(),
              })
            }
            disabled={!scheduleDate || actionLoading === "approve"}
            style={{
              background: "var(--gold)",
              color: "#07080F",
              border: "none",
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: scheduleDate ? "pointer" : "not-allowed",
              opacity: scheduleDate ? 1 : 0.5,
            }}
          >
            Confirm
          </button>
          <button
            onClick={() => setScheduling(false)}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              padding: "8px 12px",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── ROW 10: Source link + actions ── */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap",
          paddingTop: "4px",
          borderTop: "1px solid var(--border)",
        }}
      >
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "var(--blue)",
              textDecoration: "underline",
              marginRight: "auto",
            }}
          >
            SOURCE ↗
          </a>
        )}

        {/* Edit / Save commentary */}
        {editing ? (
          <>
            <button
              onClick={saveCommentary}
              disabled={saving}
              style={actionBtnStyle("var(--gold)", "#07080F")}
            >
              {saving ? "Saving…" : "💾 Save"}
            </button>
            <button
              onClick={() => { setEditing(false); setCommentary(item.editorial_commentary ?? ""); }}
              style={actionBtnStyle("transparent", "var(--muted)", "var(--border)")}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            style={actionBtnStyle("transparent", "var(--muted)", "var(--border)")}
          >
            ✏️ Edit
          </button>
        )}

        {/* Status-based actions */}
        {item.status === "pending" && !editing && (
          <>
            <button
              onClick={() => setScheduling((s) => !s)}
              disabled={!!actionLoading}
              style={actionBtnStyle("transparent", "var(--gold)", "var(--gold)")}
            >
              📅 Schedule
            </button>
            <button
              onClick={() => {
                const reason = window.prompt("Reject reason (optional):");
                handleAction("reject", { reject_reason: reason ?? "" });
              }}
              disabled={!!actionLoading}
              style={actionBtnStyle("transparent", "var(--red)", "var(--red)")}
            >
              {actionLoading === "reject" ? "…" : "❌ Reject"}
            </button>
            <button
              onClick={() => handleAction("approve")}
              disabled={!!actionLoading}
              style={actionBtnStyle("var(--green)", "#07080F")}
            >
              {actionLoading === "approve" ? "…" : "✅ Approve"}
            </button>
          </>
        )}

        {item.status === "approved" && !editing && (
          <button
            onClick={() => handleAction("publish")}
            disabled={!!actionLoading}
            style={actionBtnStyle("var(--blue)", "#fff")}
          >
            {actionLoading === "publish" ? "Publishing…" : "🚀 Publish Now"}
          </button>
        )}
      </div>
    </div>
  );
}

function actionBtnStyle(
  bg: string,
  color: string,
  borderColor?: string
): React.CSSProperties {
  return {
    background: bg,
    color,
    border: `1px solid ${borderColor ?? "transparent"}`,
    padding: "8px 14px",
    fontSize: "11px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  };
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */

export default function ContentQueuePage() {
  const supabase = createClient();
  const [items, setItems] = useState<QueueItem[]>([]);
  const [filter, setFilter] = useState<ActiveFilter>("all");
  const [loading, setLoading] = useState(true);
  const [liveCount, setLiveCount] = useState(0);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // ── Fetch items
  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lantern_content_queue")
      .select("*")
      .order("queued_at", { ascending: false })
      .limit(100);

    if (!error && data) {
      setItems(
        data.map((row) => ({
          ...row,
          content_type: row.content_type ?? "article",
          halal_flags: row.halal_flags ?? [],
          halal_verdict: row.halal_verdict ?? "pending_screen",
          status: row.status ?? "pending",
        }))
      );
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ── Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("content_queue_live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lantern_content_queue" },
        (payload) => {
          const newItem = payload.new as QueueItem;
          setItems((prev) => [
            {
              ...newItem,
              content_type: newItem.content_type ?? "article",
              halal_flags: newItem.halal_flags ?? [],
              halal_verdict: newItem.halal_verdict ?? "pending_screen",
              status: newItem.status ?? "pending",
            },
            ...prev,
          ]);
          setLiveCount((c) => c + 1);
          setTimeout(() => setLiveCount((c) => Math.max(0, c - 1)), 5000);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "lantern_content_queue" },
        (payload) => {
          const updated = payload.new as QueueItem;
          setItems((prev) =>
            prev.map((item) =>
              item.id === updated.id
                ? {
                    ...updated,
                    content_type: updated.content_type ?? "article",
                    halal_flags: updated.halal_flags ?? [],
                    halal_verdict: updated.halal_verdict ?? "pending_screen",
                    status: updated.status ?? "pending",
                  }
                : item
            )
          );
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase]);

  // ── Filter logic
  const filtered = items.filter((item) => {
    if (filter === "all") return true;
    if (["article", "market", "video"].includes(filter)) return item.content_type === filter;
    return item.status === filter;
  });

  // ── Stats
  const stats = {
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    published: items.filter((i) => i.status === "published").length,
  };

  // ── Status change (optimistic)
  const handleStatusChange = useCallback((id: string, newStatus: QueueStatus) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, reviewed_at: new Date().toISOString() }
          : item
      )
    );
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <Sidebar />

      <main style={{ minWidth: 0 }}>
        {/* Header */}
        <header
          style={{
            height: "64px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            background: "rgba(7, 8, 15, 0.95)",
            backdropFilter: "blur(14px)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="kicker">Content Queue</span>
            <span style={{ color: "var(--dim)", fontSize: "13px" }}>·</span>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>{today}</span>
            {liveCount > 0 && (
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "var(--green)",
                  border: "1px solid var(--green)",
                  padding: "2px 8px",
                  animation: "pulse 1s infinite",
                }}
              >
                +{liveCount} NEW
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              onClick={fetchItems}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--muted)",
                padding: "6px 12px",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "Space Mono, monospace",
              }}
            >
              ↺ Refresh
            </button>
            <span
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                fontFamily: "Space Mono, monospace",
              }}
            >
              Operator #0001
            </span>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "var(--red)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "12px",
              }}
            >
              R
            </div>
          </div>
        </header>

        <div style={{ padding: "24px 32px" }}>
          {/* ── KPI row ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2px",
              marginBottom: "24px",
            }}
          >
            {[
              { label: "Total in Queue", value: String(stats.total), color: "var(--off)" },
              { label: "Pending Review", value: String(stats.pending), color: "var(--gold)" },
              { label: "Approved", value: String(stats.approved), color: "var(--green)" },
              { label: "Published", value: String(stats.published), color: "var(--blue)" },
            ].map((kpi) => (
              <div key={kpi.label} className="kpi-card">
                <div className="kpi-label">{kpi.label}</div>
                <div className="kpi-value" style={{ color: kpi.color }}>
                  {kpi.value}
                </div>
                <div
                  className="kpi-delta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      background: "var(--green)",
                      borderRadius: "50%",
                    }}
                  />
                  live
                </div>
              </div>
            ))}
          </div>

          {/* ── Filter bar ── */}
          <div
            style={{
              display: "flex",
              gap: "2px",
              marginBottom: "20px",
              overflowX: "auto",
              paddingBottom: "2px",
            }}
          >
            {FILTERS.map((f) => {
              const count =
                f.value === "all"
                  ? items.length
                  : ["article", "market", "video"].includes(f.value)
                  ? items.filter((i) => i.content_type === f.value).length
                  : items.filter((i) => i.status === f.value).length;

              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  style={{
                    background: filter === f.value ? "var(--red)" : "var(--panel)",
                    color: filter === f.value ? "#fff" : "var(--muted)",
                    border: `1px solid ${filter === f.value ? "var(--red)" : "var(--border)"}`,
                    padding: "8px 16px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "Space Mono, monospace",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                  }}
                >
                  {f.label}
                  <span
                    style={{
                      fontSize: "9px",
                      color: filter === f.value ? "rgba(255,255,255,0.7)" : "var(--dim)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Queue items ── */}
          {loading ? (
            <div
              style={{
                padding: "80px",
                textAlign: "center",
                fontFamily: "Space Mono, monospace",
                fontSize: "12px",
                color: "var(--dim)",
              }}
            >
              Loading queue…
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: "80px",
                textAlign: "center",
                border: "1px dashed var(--border)",
              }}
            >
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "11px",
                  color: "var(--dim)",
                  marginBottom: "8px",
                }}
              >
                NO ITEMS IN THIS VIEW
              </div>
              <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                The AI pipeline will populate this queue automatically.
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {filtered.map((item) => (
                <ContentQueueCard
                  key={item.id}
                  item={item}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
