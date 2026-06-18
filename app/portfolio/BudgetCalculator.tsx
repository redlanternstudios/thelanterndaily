"use client";

import { useEffect, useState } from "react";
import type { LanternPortfolioPick } from "@/lib/lantern/queries";

export function BudgetCalculator({ picks }: { picks: LanternPortfolioPick[] }) {
  const [budget, setBudget] = useState("1000");
  const [amount, setAmount] = useState(1000);

  useEffect(() => {
    const t = setTimeout(() => {
      const n = parseFloat(budget.replace(/,/g, ""));
      if (!isNaN(n) && n >= 0) setAmount(n);
    }, 300);
    return () => clearTimeout(t);
  }, [budget]);

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderTop: "2px solid var(--red)",
        padding: "28px 32px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          color: "var(--muted)",
          marginBottom: "20px",
          lineHeight: 1.5,
        }}
      >
        Enter any amount to see how it maps across the editorial allocation. This is{" "}
        <strong>not investment advice</strong> — allocations are editorial, not financial
        recommendations. Verify halal status independently before any decision.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <span
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "20px",
            color: "var(--off)",
          }}
        >
          $
        </span>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="1000"
          aria-label="Total budget amount"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--off)",
            fontFamily: "Space Mono, monospace",
            fontSize: "24px",
            fontWeight: 700,
            padding: "8px 14px",
            width: "200px",
            outline: "none",
          }}
        />
        <span style={{ fontSize: "12px", color: "var(--dim)" }}>
          total (illustrative)
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {picks.map((pick) => {
          const slice = (amount * pick.allocation_pct) / 100;
          return (
            <div
              key={pick.id}
              style={{
                padding: "16px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--off)",
                  }}
                >
                  {pick.ticker}
                </span>
                <span
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "10px",
                    color: "var(--red)",
                    fontWeight: 700,
                  }}
                >
                  {pick.allocation_pct}%
                </span>
              </div>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--off)",
                  marginBottom: "4px",
                }}
              >
                ${slice.toFixed(2)}
              </div>
              <div style={{ fontSize: "11px", color: "var(--dim)" }}>
                {pick.company_name}
              </div>
            </div>
          );
        })}
      </div>

      <p
        style={{
          fontSize: "10px",
          color: "var(--dim)",
          marginTop: "16px",
          fontFamily: "Space Mono, monospace",
          lineHeight: 1.5,
        }}
      >
        ⚠ Educational purposes only. Not financial advice. Verify halal status independently.
      </p>
    </div>
  );
}
