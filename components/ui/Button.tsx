import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base — no border-radius, precise
        "inline-flex items-center justify-center font-semibold tracking-wide transition-opacity cursor-pointer",
        // Sizes
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        // Variants
        variant === "primary" && "bg-[#D7262E] text-white hover:opacity-90",
        variant === "outline" && "border border-[#D7262E] text-[#D7262E] hover:bg-[#D7262E] hover:text-white",
        variant === "ghost" && "text-[#D7262E] hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
