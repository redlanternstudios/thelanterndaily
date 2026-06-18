import { cn } from "@/lib/utils";

interface StackCardProps {
  name: string;
  description: string;
  whyOperatorsUse: string;
  ctaText?: string;
  ctaHref: string;
  isAffiliate?: boolean;
  logoInitial?: string;
  className?: string;
}

export function StackCard({
  name,
  description,
  whyOperatorsUse,
  ctaText = "Get started →",
  ctaHref,
  isAffiliate = false,
  logoInitial,
  className,
}: StackCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-7 bg-white border-t-2 border-t-[#D7262E] relative",
        className
      )}
    >
      {/* Logo initial */}
      <div className="w-9 h-9 bg-[#EAE6E0] flex items-center justify-center mb-4">
        <span className="text-[#D7262E] text-sm font-bold">
          {logoInitial ?? name[0]}
        </span>
      </div>

      <p className="text-[#08080C] font-bold text-sm mb-1">{name}</p>
      <p className="text-[#6B6B72] text-sm leading-relaxed mb-3">{description}</p>
      <p className="text-[#08080C] text-xs italic leading-relaxed mb-5 flex-1">
        {whyOperatorsUse}
      </p>

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D7262E] text-sm font-semibold hover:opacity-70 transition-opacity self-start"
      >
        {ctaText}
      </a>

      {isAffiliate && (
        <span className="absolute bottom-3 right-3 text-[#9A9A9E] text-[10px] tracking-wide">
          affiliate
        </span>
      )}
    </div>
  );
}
