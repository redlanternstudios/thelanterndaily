"use client";

export interface StackToolCardProps {
  toolName: string;
  toolUrl: string;
  category: string;
  tier: "free" | "freemium" | "paid";
  isOpenSource: boolean;
  oneLineDesc: string;
  fullBreakdown?: string;
  avoidReason?: string;
  operatorContext?: string;
  hasAffiliate: boolean;
  affiliateLink?: string;
  tierPlacement: "free_teaser" | "paid_full" | "both";
  isSubscribed?: boolean;
}

export default function StackToolCard({
  toolName,
  toolUrl,
  category,
  tier,
  isOpenSource,
  oneLineDesc,
  fullBreakdown,
  avoidReason,
  operatorContext,
  hasAffiliate,
  affiliateLink,
  tierPlacement,
  isSubscribed = false,
}: StackToolCardProps) {
  const canSeeFull = isSubscribed || tierPlacement === "free_teaser" || tierPlacement === "both";
  const showFull = canSeeFull && (fullBreakdown || operatorContext || avoidReason);

  return (
    <div className="rounded-lg bg-[#0D0F14] border border-[#2A2D35] p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <a
            href={toolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F7F2EE] font-semibold hover:text-[#B8922A] transition-colors"
          >
            {toolName}
          </a>
          <div className="flex gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 rounded bg-[#2A2D35] text-gray-300">{tier}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#2A2D35] text-gray-300">{category}</span>
            {isOpenSource && (
              <span className="text-xs px-2 py-0.5 rounded bg-green-900 text-green-300">Open Source</span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300">{oneLineDesc}</p>

      {tierPlacement === "paid_full" && !isSubscribed && (
        <div className="mt-3 p-3 rounded bg-[#07080D] border border-[#2A2D35]">
          <p className="text-sm text-gray-400">
            Full breakdown available to subscribers.
          </p>
        </div>
      )}

      {showFull && fullBreakdown && (
        <details className="mt-3">
          <summary className="text-sm text-[#B8922A] cursor-pointer hover:text-amber-400">
            Full breakdown
          </summary>
          <div className="mt-2 text-sm text-gray-300 space-y-2">
            <p>{fullBreakdown}</p>
            {operatorContext && (
              <p className="text-xs italic text-gray-500">{operatorContext}</p>
            )}
          </div>
        </details>
      )}

      {avoidReason && (
        <div className="mt-3 p-2 rounded bg-red-900/30 border border-red-800/50">
          <p className="text-xs text-red-300">Avoid: {avoidReason}</p>
        </div>
      )}

      {hasAffiliate && affiliateLink && (
        <p className="text-xs text-gray-500 mt-2">
          <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
            Check price
          </a>
          {" "}(affiliate — The Lantern earns a commission)
        </p>
      )}
    </div>
  );
}
