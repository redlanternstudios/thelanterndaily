import type { HalalStance } from "@/lib/supabase/types";

const BADGE_CONFIG: Record<HalalStance, { label: string; color: string; bg: string; border: string }> = {
  positive: {
    label: "✓ HALAL-ALIGNED",
    color: "#2D6A4F",
    bg: "rgba(45, 106, 79, 0.12)",
    border: "rgba(45, 106, 79, 0.35)",
  },
  critical: {
    label: "⚠ CRITICAL",
    color: "#B45309",
    bg: "rgba(180, 83, 9, 0.12)",
    border: "rgba(180, 83, 9, 0.35)",
  },
  blocked: {
    label: "✗ BLOCKED",
    color: "#D92532",
    bg: "rgba(217, 37, 50, 0.12)",
    border: "rgba(217, 37, 50, 0.35)",
  },
  nuanced: {
    label: "◈ NUANCED",
    color: "#4B5563",
    bg: "rgba(75, 85, 99, 0.15)",
    border: "rgba(75, 85, 99, 0.35)",
  },
};

export default function HalalBadge({
  stance,
  position = "inline",
}: {
  stance: HalalStance;
  position?: "inline" | "overlay";
}) {
  const config = BADGE_CONFIG[stance];

  const baseClasses =
    "font-mono text-[10px] uppercase tracking-[0.12em] leading-none px-2.5 py-1.5 border";

  if (position === "overlay") {
    return (
      <span
        className={`${baseClasses} absolute top-3 left-3 z-10`}
        style={{
          color: config.color,
          backgroundColor: config.bg,
          borderColor: config.border,
        }}
      >
        {config.label}
      </span>
    );
  }

  return (
    <span
      className={baseClasses}
      style={{
        color: config.color,
        backgroundColor: config.bg,
        borderColor: config.border,
      }}
    >
      {config.label}
    </span>
  );
}
