"use client";

import { useState, useCallback } from "react";
import type { LanternPortfolioPick } from "@/lib/lantern/queries";

function statusColor(status: string): string {
  if (status === "compliant") return "#16a34a";
  if (status === "questionable") return "#ca8a04";
  return "#D92532";
}

function statusLabel(status: string): string {
  if (status === "compliant") return "COMPLIANT";
  if (status === "questionable") return "QUESTIONABLE";
  return "REVIEW";
}

const COL = "80px 1fr 80px 120px 120px 80px";

export function PortfolioTable({ picks }: { picks: LanternPortfolioPick[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div style={{ border: "1px solid var(--border)" }}>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: COL,
          gap: "12px",
          padding: "10px 20px",
          borderBottom: "2px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        {["TICKER", "COMPANY", "ALLOC", "HALAL STATUS", "SOURCE", "ASSET"].map((h) => (
          <div
            key={h}
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              fontWeight: 700,
              color: "var(--dim)",
              letterSpacing: "0.12em",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {picks.map((pick) => (
        <div key={pick.id}>
          {/* Main row */}
          <button
            onClick={() => toggle(pick.id)}
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: COL,
              gap: "12px",
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              background: expanded === pick.id ? "var(--surface)" : "transparent",
              cursor: "pointer",
              textAlign: "left",
              alignItems: "center",
              border: "none",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--off)",
              }}
            >
              {pick.ticker}
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)" }}>{pick.company_name}</div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--red)",
              }}
            >
              {pick.allocation_pct}%
            </div>
            <div>
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: statusColor(pick.halal_status),
                  letterSpacing: "0.08em",
                }}
              >
                {statusLabel(pick.halal_status)}
              </span>
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                color: "var(--dim)",
              }}
            >
              {pick.halal_source.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                color: "var(--dim)",
                textTransform: "uppercase",
              }}
            >
              {pick.asset_class}
            </div>
          </button>

          {/* Expanded rationale */}
          {expanded === pick.id && (
            <div
              style={{
                padding: "20px 20px 24px",
                borderBottom: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              {pick.editorial_rationale && (
                <div style={{ marginBottom: pick.scholar_note ? "16px" : 0 }}>
                  <div
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "9px",
                      color: "var(--dim)",
                      letterSpacing: "0.12em",
                      marginBottom: "8px",
                    }}
                  >
                    EDITORIAL RATIONALE
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {pick.editorial_rationale}
                  </p>
                </div>
              )}
              {pick.scholar_note && (
                <div
                  style={{
                    marginTop: "14px",
                    padding: "12px 16px",
                    background: "rgba(184, 146, 42, 0.06)",
                    borderLeft: "3px solid #B8922A",
                    fontSize: "12px",
                    color: "#B8922A",
                    lineHeight: 1.65,
                  }}
                >
                  📚 {pick.scholar_note}
                </div>
              )}
              {pick.source_url && (
                <a
                  href={pick.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "14px",
                    fontFamily: "Space Mono, monospace",
                    fontSize: "10px",
                    color: "var(--red)",
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                  }}
                >
                  Verify on Musaffa →
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
