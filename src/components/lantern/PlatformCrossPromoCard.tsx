"use client";

interface PlatformCrossPromoCardProps {
  platformName: string;
  platformUrl: string;
  category?: string;
  isRlProduct: boolean;
  featureType: "editorial" | "sponsored" | "affiliate" | "co-promo";
  hasAffiliate: boolean;
  affiliateLink?: string;
}

export default function PlatformCrossPromoCard({
  platformName,
  platformUrl,
  category,
  isRlProduct,
  featureType,
  hasAffiliate,
  affiliateLink,
}: PlatformCrossPromoCardProps) {
  return (
    <a
      href={affiliateLink || platformUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg bg-[#0D0F14] border border-[#2A2D35] p-4 hover:border-[#2D7A4F] transition-colors group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[#F7F2EE] font-semibold group-hover:text-[#2D7A4F] transition-colors">
          {platformName}
        </h3>
        <div className="flex gap-1">
          {isRlProduct && (
            <span className="text-xs px-2 py-0.5 rounded bg-[#2D7A4F]/20 text-[#2D7A4F] border border-[#2D7A4F]/40">
              REDLANTERN
            </span>
          )}
          <span className="text-xs px-2 py-0.5 rounded bg-[#2A2D35] text-gray-300">
            {featureType}
          </span>
        </div>
      </div>

      {category && (
        <p className="text-xs text-gray-500 mb-2">{category}</p>
      )}

      {hasAffiliate && affiliateLink && (
        <p className="text-xs text-gray-500 mt-2">
          (affiliate — The Lantern earns a commission)
        </p>
      )}
    </a>
  );
}
