"use client";

import { useEffect, useState } from "react";
import { LanternLogoText } from "@/components/LanternMasthead";
import { lanternArticles } from "@/data/lanternArticles";

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

const QUEUE = [
  { title: "The Infrastructure Collapse Nobody Is Talking About", status: "ready", readTime: "6 min" },
  { title: "Agent Reliability: A Video Breakdown", status: "review", readTime: "12 min" },
  { title: "The Real Agent Reliability Numbers", status: "scheduled", readTime: "8 min" },
  { title: "The AI Product Playbook Muslim Founders Aren't Using", status: "draft", readTime: "7 min" },
];

function StatusBadge({ status }: { status: string }) {
  return <span className={`badge ${status}`}>{status}</span>;
}

export default function DashboardPage() {
  const featured = lanternArticles[0];
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
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
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <LanternLogoText />
        </div>

        {/* Nav */}
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

        {/* Beehiiv Sync Status */}
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
            <div
              style={{
                fontSize: "10px",
                color: "var(--dim)",
                fontFamily: "Space Mono, monospace",
              }}
            >
              Add BEEHIIV_API_KEY to connect
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────── */}
      <main>
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
          <div>
            <span className="kicker">Dashboard</span>
            <span style={{ color: "var(--dim)", margin: "0 10px" }}>·</span>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {today}
            </span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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
              { label: "Total Subscribers", value: "—", delta: "Beehiiv sync required" },
              { label: "Open Rate (30d avg)", value: "—", delta: "Beehiiv sync required" },
              { label: "Articles Published", value: String(lanternArticles.length), delta: "from local data" },
              { label: "Queue Ready", value: String(QUEUE.filter(q => q.status === "ready").length), delta: "→ ready to publish" },
            ].map((kpi) => (
              <div key={kpi.label} className="kpi-card">
                <div className="kpi-label">{kpi.label}</div>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-delta">{kpi.delta}</div>
              </div>
            ))}
          </section>

          {/* ── FEATURED + QUEUE GRID ──────────────────────────────── */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              marginBottom: "2px",
            }}
          >
            {/* Featured Article */}
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
                  <div className="kicker">Today&apos;s Lead</div>
                  <StatusBadge status="ready" />
                </div>
                <h3 style={{ marginBottom: "12px", fontSize: "20px" }}>
                  {featured.title}
                </h3>
                <p className="excerpt" style={{ fontSize: "14px", marginBottom: "20px" }}>
                  {featured.excerpt}
                </p>
                <div
                  className="byline"
                  style={{ display: "flex", gap: "12px", marginBottom: "24px" }}
                >
                  <span>{featured.date}</span>
                  <span style={{ color: "var(--dim)" }}>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="join-button" style={{ fontSize: "11px", padding: "10px 18px" }}>
                    Publish Now ↓
                  </button>
                  <button className="btn outline" style={{ fontSize: "11px", padding: "10px 18px" }}>
                    Edit
                  </button>
                  <button className="btn outline" style={{ fontSize: "11px", padding: "10px 18px" }}>
                    Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Content Queue */}
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
                  <div className="kicker">Content Queue</div>
                  <button className="btn outline" style={{ fontSize: "10px", padding: "8px 14px" }}>
                    + New Article
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {QUEUE.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 0",
                        borderBottom: i < QUEUE.length - 1 ? "1px solid var(--border)" : "none",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "var(--off)",
                            fontWeight: 600,
                            marginBottom: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "Space Mono, monospace",
                            fontSize: "10px",
                            color: "var(--dim)",
                          }}
                        >
                          {item.readTime}
                        </div>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── ANALYTICS + SYNC ROW ───────────────────────────────── */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2px",
            }}
          >
            {/* Top Articles */}
            <div className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: "20px" }}>Top Articles (30d)</div>
                {lanternArticles.slice(0, 4).map((a, i) => (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Space Mono, monospace",
                        fontSize: "11px",
                        color: "var(--dim)",
                        fontWeight: 700,
                        flexShrink: 0,
                        paddingTop: "2px",
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "var(--off)", fontWeight: 600, marginBottom: "4px" }}>
                        {a.title.slice(0, 48)}…
                      </div>
                      <div className="byline">{a.readTime} · {a.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscriber Growth */}
            <div className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: "20px" }}>Subscriber Growth</div>
                {[
                  { week: "Jun 7", subs: "+42", openRate: "58%" },
                  { week: "Jun 14", subs: "+84", openRate: "61%" },
                  { week: "Jun 21", subs: "—", openRate: "—" },
                  { week: "Jun 28", subs: "—", openRate: "—" },
                ].map((row, i) => (
                  <div
                    key={row.week}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "12px",
                      padding: "12px 0",
                      borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace", fontSize: "11px" }}>
                      {row.week}
                    </span>
                    <span style={{ color: row.subs !== "—" ? "var(--green)" : "var(--dim)", fontWeight: 700 }}>
                      {row.subs}
                    </span>
                    <span style={{ color: "var(--muted)", textAlign: "right" }}>{row.openRate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beehiiv Sync */}
            <div className="card">
              <div className="card-body">
                <div className="kicker" style={{ marginBottom: "20px" }}>Beehiiv Sync</div>
                {[
                  { label: "Subscribers synced", value: "Not connected", ok: false },
                  { label: "Last issue sent", value: "—", ok: false },
                  { label: "Open rate sync", value: "—", ok: false },
                  { label: "Pending tags", value: "—", ok: false },
                  { label: "API status", value: "Awaiting key", ok: false },
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
                    <span style={{ color: row.ok ? "var(--green)" : "var(--red)", fontWeight: 600 }}>
                      {row.value}
                    </span>
                  </div>
                ))}
                <button
                  className="btn outline"
                  style={{ width: "100%", marginTop: "16px", fontSize: "11px", padding: "10px" }}
                >
                  Force Sync
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
