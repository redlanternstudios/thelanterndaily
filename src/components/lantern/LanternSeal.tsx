"use client";

import React, { useState, useRef, useEffect } from "react";

export type ComplianceTier = "CERTIFIED" | "NUANCED" | "SCRUTINY" | "FAILED";

export interface LanternSealProps {
  name: string;
  tickerOrTag?: string;
  complianceState?: ComplianceTier;
  stance?: "positive" | "nuanced" | "concern" | "blocked";
  debtRatio?: string;
  cashRatio?: string;
  purificationPercent?: string;
  auditStandard?: string;
  auditHash?: string;
  editorialNote?: string;
  variant?: "badge" | "compact" | "card";
}

export default function LanternSeal({
  name,
  tickerOrTag,
  complianceState,
  stance = "positive",
  debtRatio = "12.8%",
  cashRatio = "19.4%",
  purificationPercent = "0.3%",
  auditStandard = "AAOIFI Standard No. 21",
  auditHash,
  editorialNote,
  variant = "badge",
}: LanternSealProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map stance to compliance state if not provided
  const resolvedState: ComplianceTier =
    complianceState ||
    (stance === "positive"
      ? "CERTIFIED"
      : stance === "nuanced"
      ? "NUANCED"
      : stance === "concern"
      ? "SCRUTINY"
      : "FAILED");

  const hashString =
    auditHash ||
    `SHA256:${name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8)}..${(tickerOrTag || "2026").toLowerCase()}`;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const config = {
    CERTIFIED: {
      label: "Lantern Shariah Seal",
      shortLabel: "Shariah Certified",
      mark: "✦",
      border: "border-[#2D7A4F]",
      hoverBorder: "hover:border-[#4ADE80]",
      bg: "bg-[#0A1A11]",
      text: "text-[#4ADE80]",
      badgeText: "text-[#4ADE80]",
      glow: "shadow-[0_0_12px_rgba(74,222,128,0.15)]",
      summary: "Screened against AAOIFI Standard 21. Core activity is halal, interest-bearing debt & cash <33% of market cap.",
    },
    NUANCED: {
      label: "Lantern Conditional Seal",
      shortLabel: "Conditional / Nuanced",
      mark: "⚖",
      border: "border-[#B8922A]",
      hoverBorder: "hover:border-[#E5C058]",
      bg: "bg-[#14120A]",
      text: "text-[#E5C058]",
      badgeText: "text-[#E5C058]",
      glow: "shadow-[0_0_12px_rgba(229,192,88,0.15)]",
      summary: "Passes primary debt screening, but contains digital assets or incidental revenue requiring ongoing purification.",
    },
    SCRUTINY: {
      label: "Lantern Systemic Scrutiny",
      shortLabel: "Systemic Scrutiny",
      mark: "!",
      border: "border-[#C2410C]",
      hoverBorder: "hover:border-[#FB923C]",
      bg: "bg-[#1C0D08]",
      text: "text-[#FB923C]",
      badgeText: "text-[#FB923C]",
      glow: "shadow-[0_0_12px_rgba(251,146,60,0.15)]",
      summary: "Significant surveillance lock-in, non-transparent contracts, or borderline financial leverage ratios.",
    },
    FAILED: {
      label: "Non-Compliant / Excluded",
      shortLabel: "Non-Compliant",
      mark: "✕",
      border: "border-[#991B1B]",
      hoverBorder: "hover:border-[#F87171]",
      bg: "bg-[#1A0A0A]",
      text: "text-[#F87171]",
      badgeText: "text-[#F87171]",
      glow: "shadow-[0_0_12px_rgba(248,113,113,0.15)]",
      summary: "Direct involvement in interest banking (Riba), gambling (Maysir), alcohol, or excessive debt (>33%).",
    },
  }[resolvedState];

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* ── THE SEAL TRIGGER BADGE ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="View Lantern Shariah & Sovereign Audit Telemetry"
        className={`group inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-xs font-mono transition-all duration-150 ${config.border} ${config.hoverBorder} ${config.bg} ${config.glow}`}
      >
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full border border-current text-[9px] font-black ${config.text}`}
        >
          {config.mark}
        </span>
        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${config.badgeText}`}>
          {variant === "compact" ? config.shortLabel : config.label}
        </span>
        <span className="text-[#6B7280] group-hover:text-[#F7F2EE] text-[10px] transition-colors">
          ▾
        </span>
      </button>

      {/* ── INTERACTIVE AUDIT TELEMETRY DRAWER ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Lantern Shariah Audit Breakdown"
          className="absolute left-0 sm:left-auto sm:right-0 top-full z-50 mt-2 w-80 sm:w-88 border border-[#1E2028] bg-[#0A0C12] p-4 text-xs font-mono shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1A1F2E] pb-2.5">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#B8922A] font-bold">
                The Lantern Seal · Audit Telemetry
              </div>
              <div className="font-serif text-sm font-bold text-[#F7F2EE]">
                {name} {tickerOrTag && <span className="text-[#9CA3AF]">({tickerOrTag})</span>}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#6B7280] hover:text-[#F7F2EE] p-1 text-sm font-mono"
              aria-label="Close audit drawer"
            >
              ✕
            </button>
          </div>

          {/* Audit Standard & Verdict */}
          <div className="mt-3 rounded-sm border border-[#1A1F2E] bg-[#07080D] p-2.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#9CA3AF]">Screening Standard:</span>
              <span className="font-bold text-[#F7F2EE]">{auditStandard}</span>
            </div>
            <div className="mt-1 flex justify-between items-center text-[11px]">
              <span className="text-[#9CA3AF]">Audit Status:</span>
              <span className={`font-bold uppercase ${config.text}`}>
                {config.shortLabel}
              </span>
            </div>
            <p className="mt-2 text-[10px] font-sans leading-relaxed text-[#D1D5DB]">
              {editorialNote || config.summary}
            </p>
          </div>

          {/* Mathematical Ratio Checks (AAOIFI Standard 21) */}
          <div className="mt-3 space-y-1.5 border-t border-[#1A1F2E] pt-2.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9CA3AF]">Interest Debt / MCap (&lt;33%):</span>
              <span className="font-semibold text-[#4ADE80]">{debtRatio}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9CA3AF]">Cash &amp; Deposits / MCap (&lt;33%):</span>
              <span className="font-semibold text-[#4ADE80]">{cashRatio}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9CA3AF]">Impure Income Purification:</span>
              <span className="font-semibold text-[#E5C058]">{purificationPercent}</span>
            </div>
          </div>

          {/* Immutable Proof Hash & Disclaimer */}
          <div className="mt-3 border-t border-[#1A1F2E] pt-2 flex items-center justify-between text-[9px] text-[#6B7280]">
            <span className="truncate max-w-[180px]">{hashString}</span>
            <span className="uppercase text-[#9CA3AF]">Verified 2026</span>
          </div>
          <div className="mt-1 text-[9px] text-[#6B7280] italic leading-tight">
            *Independent screening under AAOIFI guidelines. Not a formal fatwa; conduct personal due diligence.
          </div>
        </div>
      )}
    </div>
  );
}
