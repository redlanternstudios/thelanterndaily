import Link from "next/link";
import { cn } from "@/lib/utils";

interface IssueCardProps {
  issueNumber: number;
  date: string;
  headline: string;
  readingTime: string;
  slug: string;
  locked?: boolean;
  className?: string;
}

export function IssueCard({
  issueNumber,
  date,
  headline,
  readingTime,
  slug,
  locked = false,
  className,
}: IssueCardProps) {
  const content = (
    <div className={cn("flex flex-col p-6 bg-white relative h-full", className)}>
      <p className="text-[#D7262E] text-[10px] font-bold tracking-[0.14em] uppercase mb-3">
        Issue #{String(issueNumber).padStart(3, "0")}
      </p>
      <p className="text-[#08080C] font-bold text-sm leading-snug flex-1">{headline}</p>
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#D8D2CC]">
        <span className="text-[#9A9A9E] text-xs">{date}</span>
        <div className="flex items-center gap-2">
          <span className="text-[#9A9A9E] text-xs">{readingTime}</span>
          <span className="text-[#D7262E] text-sm">→</span>
        </div>
      </div>
      {locked && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
          <p className="text-[#08080C] text-xs font-semibold">Operators only</p>
          <Link
            href="/#subscribe"
            className="text-[#D7262E] text-xs font-bold tracking-wide hover:opacity-70 transition-opacity"
          >
            Join →
          </Link>
        </div>
      )}
    </div>
  );

  if (locked) return content;

  return (
    <Link href={`/issues/${slug}`} className="block hover:bg-[#FAFAFA] transition-colors">
      {content}
    </Link>
  );
}
