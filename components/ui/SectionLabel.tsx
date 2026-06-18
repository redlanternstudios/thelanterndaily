import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
  dark?: boolean; // true when used inside a dark-zone section
}

export function SectionLabel({ children, className, dark = false }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-[11px] font-bold tracking-[0.15em] uppercase",
        dark ? "text-[#D7262E]" : "text-[#D7262E]",
        className
      )}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <span>{children}</span>
      <span
        style={{
          flex: 1,
          height: "1px",
          backgroundColor: dark ? "#2A2A2A" : "#D8D2CC",
        }}
      />
    </div>
  );
}
