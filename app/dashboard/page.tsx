"use client";

import { useEffect, useState } from "react";
import { LanternLogoText } from "@/components/LanternMasthead";
import { createClient } from "@/lib/supabase/client";

const NAV_SECTIONS = [
  {
    label: "Content",
    items: ["Dashboard", "Articles", "Videos", "Market Modules", "Series", "Tags", "Authors"],
  },
  {
    label: "Publishing",
    items: ["Issues", "Sections", "Landing Pages", "Navigation"],
  },
  {
    label: "Assets",
    items: ["Media Library"],
  },
  {
    label: "Growth",
    items: ["Subscribers", "Emails", "Beehiiv Sync", "Sponsors"],
  },
  {
    label: "System",
    items: ["Analytics", "Settings"],
  },
];

type QueueItem = {
  id: string;
  title: string;
  status: string;
  content_type: string;
  halal_score: number | null;
  queued_at: string;
  url: string | null;
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "var(--gold)",
    approved: "var(--green)",
    rejected: "var(--red)",
    published: "var(--blue)",
  };
  return (
    <span
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: colors[status] ?? "var(--dim)",
        fontFamily: "Space Mono, monospace",
      }}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [today, setToday] = useState("");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [counts, setCounts] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    async function load() {
      const supabase = createClient();

      // Fetch latest 10 queue items
      const { data: queueData } = await supabase
        .from("lantern_content_queue")
        .select("id, title, status, content_type, halal_score, queued_at, url")
        .order("queued_at", { ascending: false })
        .limit(10);

      if (queueData) setQueue(queueData as QueueItem[]);

      // Count by status
      const statuses = ["pending", "approved", "rejected"];
      const countResults = await Promise.all(
        statuses.map((s) =>
          supabase
            .from("lantern_content_queue")
            .select("id", { count: "exact", head: true })
            .eq("status", s)
        )
      );

      const [pendingRes, approvedRes, rejectedRes] = countResults;
      const totalRes = await supabase
        .from("lantern_content_queue")
        .select("id", { count: "exact", head: true });

      setCounts({
        total: totalRes.count ?? 0,
        pending: pendingRes.count ?? 0,
        approved: approvedRes.count ?? 0,
        rejected: rejectedRes.count ?? 0,
      });

      setLoading(false);
    }

    load();
  }, []);

  const lead = queue.find((q) => q.status === "approved") ?? queue[0];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* ── SIDEBAR ──────────────────────────────────────────────── */}
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
        }}
      >
        <div style={{ padding: "24px 20px", borderBottom: "1px solid var(--border)" }}>
          <LanternLogoText />
        </div>
        <nav style={{ flex: 1, paddingBottom: "24px" }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => (
                <a
                  key={item}
                  className={`sidebar-nav-item${item === "Dashboard" ? " active" : ""}`}
                  href={`/dashboard/${item.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item}
                </a>
              ))}
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
              Beehiiv Not Connected
            </div>
            <div style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "Space Mono, monospace" }}>
              Add BEEHIIV_API_KEY to connect
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────── */}
      <main>
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
          <div>
            <span className="kicker">Dashboard</span>
            <span style={{ color: "var(--dim)", margin: "0 10px" }}>·</span>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>{today}</span>
          </div>
          <a
            href="/dashboard/content-queue"
            className="btn outline"
            style={{ fontSize: "11px", padding: "8px 16px" }}
          >
            Content Queue →
          </a>
        </header>

        <div style={{ padding: "32px" }}>
          {/* ── KPI CARDS ──────────────────────────────────────────── */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2px",
              marginBottom: "2px",
            }}
          >
            {[
              { label: "Total in Queue", value: loading ? "…" : String(counts.total), delta: "all time" },
              { label: "Pending Review", value: loading ? "…" : String(counts.pending), delta: "awaiting approval" },
              { label: "Approved", value: loading ? "…" : String(counts.approved), delta: "live on site" },
              { label: "Subscribers", value: "—", delta: "Beehiiv sync required" },
            ].map((kpi) => (
              <div key={kpi.label} className="kpi-card">
                <div className="kpi-label">{kpi.label}</div>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-delta">{kpi.delta}</div>
              </div>
            ))}
          </section>

          {/* ── LEAD + QUEUE ───────────────────────────────────────── */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              marginBottom: "2px",
            }}
          >
            {/* Lead item */}
            <div className="card">
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div className="kicker">Latest Approved</div>
                  {lead && <StatusBadge status={lead.status} />}
                </div>
                {loading ? (
                  <p style={{ color: "var(--dim)", fontSize: "14px" }}>Loading…</p>
                ) : lead ? (
                  <>
                    <h3 style={{ marginBottom: "12px", fontSize: "18px" }}>{lead.title}</h3>
                    <div className="byline" style={{ marginBottom: "20px" }}>
                      {lead.content_type} · {new Date(lead.queued_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      {lead.halal_score ? ` · Halal: ${lead.halal_score}` : ""}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {lead.url && (
                        <a
                          href={lead.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn outline"
                          style={{ fontSize: "11px", padding: "10px 18px" }}
                        >
                          Source →
                        </a>
                      )}
                      <a
                        href="/dashboard/content-queue"
                        className="join-button"
                        style={{ fontSize: "11px", padding: "10px 18px", display: "inline-block" }}
                      >
                        Review Queue →
                      </a>
                    </div>
                  </>
                ) : (
                  <p style={{ color: "var(--dim)", fontSize: "14px" }}>No content in queue yet.</p>
                )}
              </div>
            </div>

            {/* Recent queue */}
            <div className="card">
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div className="kicker">Recent Queue</div>
                  <a
                    href="/dashboard/content-queue"
                    className="btn outline"
                    style={{ fontSize: "10px", padding: "8px 14px" }}
                  >
                    View All
                  </a>
                </div>
                {loading ? (
                  <p style={{ color: "var(--dim)", fontSize: "14px" }}>Loading…</p>
                ) : queue.length === 0 ? (
                  <p style={{ color: "var(--dim)", fontSize: "14px" }}>Queue is empty. C1 will populate it on its next run.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {queue.slice(0, 6).map((item, i) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom: i < Math.min(queue.length, 6) - 1 ? "1px solid var(--border)" : "none",
                          gap: "16px",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "var(--off)",
                              fontWeight: 600,
                              marginBottom: "2px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.title}
                          </div>
                          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "var(--dim)" }}>
                            {item.content_type} · {new Date(item.queued_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── PIPELINE STATUS ────────────────────────────────────── */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2px",
            }}
          >
            {/* Queue breakdown */}
            <div className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: "20px" }}>Queue Breakdown</div>
                {[
                  { label: "Pending review", value: loading ? "…" : String(counts.pending), color: "var(--gold)" },
                  { label: "Approved (live)", value: loading ? "…" : String(counts.approved), color: "var(--green)" },
                  { label: "Rejected", value: loading ? "…" : String(counts.rejected), color: "var(--red)" },
                  { label: "Total processed", value: loading ? "…" : String(counts.total), color: "var(--off)" },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>{row.label}</span>
                    <span style={{ color: row.color, fontWeight: 700, fontFamily: "Space Mono, monospace" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation status */}
            <div className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: "20px" }}>Automation Status</div>
                {[
                  { label: "C1 Content Radar", value: "Active · 4h", ok: true },
                  { label: "C2 Approval Digest", value: "Active · 18:00 UTC", ok: true },
                  { label: "U1 Welcome Sequence", value: "Active", ok: true },
                  { label: "D1 Beehiiv Sync", value: "Active", ok: true },
                  { label: "Beehiiv API", value: "Not connected", ok: false },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "11px 0",
                      borderBottom: "1px solid rgba(37, 43, 59, 0.5)",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>{row.label}</span>
                    <span style={{ color: row.ok ? "var(--green)" : "var(--red)", fontWeight: 600, fontSize: "11px" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscriber sync */}
            <div className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: "20px" }}>Subscriber Data</div>
                {[
                  { label: "Subscribers synced", value: "—" },
                  { label: "Last issue sent", value: "—" },
                  { label: "Open rate", value: "—" },
                  { label: "API status", value: "Awaiting BEEHIIV_API_KEY" },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "11px 0",
                      borderBottom: "1px solid rgba(37, 43, 59, 0.5)",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>{row.label}</span>
                    <span style={{ color: "var(--dim)", fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
                <p style={{ fontSize: "11px", color: "var(--dim)", marginTop: "16px", lineHeight: 1.5 }}>
                  Add BEEHIIV_API_KEY to Vercel env vars to enable subscriber analytics.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
