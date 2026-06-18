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

const SIZE_CLASSES = {
  sm: "text-[9px] px-2 py-1",
  md: "text-[10px] px-2.5 py-1.5",
  lg: "text-[11px] px-3 py-2",
};

export default function HalalBadge({
  stance,
  size = "md",
  position = "inline",
}: {
  stance: HalalStance;
  size?: "sm" | "md" | "lg";
  position?: "inline" | "overlay";
}) {
  const config = BADGE_CONFIG[stance];
  const sizeClass = SIZE_CLASSES[size];

  const baseClasses = `font-mono uppercase tracking-[0.12em] leading-none border ${sizeClass}`;

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
