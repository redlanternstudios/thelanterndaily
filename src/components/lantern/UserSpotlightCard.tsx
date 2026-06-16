"use client";

interface UserSpotlightCardProps {
  displayName: string;
  attributionType: "NAMED" | "ROLE_BASED";
  roleDescription?: string;
  location?: string;
  productsBuilding: string[];
  quote?: string;
  slug: string;
  spotlightTier: "free" | "paid";
  isFeaturedBuilder?: boolean;
}

export default function UserSpotlightCard({
  displayName,
  attributionType,
  roleDescription,
  location,
  productsBuilding,
  quote,
  slug,
  spotlightTier,
  isFeaturedBuilder = false,
}: UserSpotlightCardProps) {
  return (
    <a
      href={`/builders/${slug}`}
      className="block rounded-lg bg-[#0D0F14] border border-[#2A2D35] p-4 hover:border-[#B8922A] transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[#F7F2EE] font-semibold group-hover:text-[#B8922A] transition-colors">
            {attributionType === "NAMED" ? displayName : roleDescription || "Community Builder"}
          </h3>
          {location && (
            <p className="text-xs text-gray-400">{location}</p>
          )}
        </div>
        {spotlightTier === "paid" && (
          <span className="text-xs px-2 py-0.5 rounded bg-[#B8922A]/20 text-[#B8922A] border border-[#B8922A]/40 whitespace-nowrap">
            FEATURED BUILDER ✦
          </span>
        )}
      </div>

      {attributionType === "NAMED" && roleDescription && (
        <p className="text-sm text-gray-400 mb-2">{roleDescription}</p>
      )}

      {productsBuilding.length > 0 && (
        <div className="mb-2">
          <span className="text-xs text-gray-500">Building: </span>
          <span className="text-sm text-gray-300">{productsBuilding.join(", ")}</span>
        </div>
      )}

      {quote && (
        <blockquote className="text-sm italic text-gray-400 border-l-2 border-[#2A2D35] pl-3 mt-2">
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}
    </a>
  );
}
