"use client";

interface RepoCardProps {
  repoName: string;
  repoUrl: string;
  description: string;
  language?: string;
  stars?: number;
  trustStatus: "OFFICIAL" | "ACADEMIC" | "COMMUNITY" | "VERIFY_FIRST" | "AVOID";
  builderRating: 1 | 2 | 3 | 4 | 5;
  whyFeatured: string;
  license?: string;
}

const trustColors: Record<string, string> = {
  OFFICIAL: "bg-green-900 text-green-300 border-green-700",
  ACADEMIC: "bg-blue-900 text-blue-300 border-blue-700",
  COMMUNITY: "bg-gray-700 text-gray-300 border-gray-500",
  VERIFY_FIRST: "bg-amber-900 text-amber-300 border-amber-700",
  AVOID: "bg-red-900 text-red-300 border-red-700",
};

export default function RepoCard({
  repoName,
  repoUrl,
  description,
  language,
  stars,
  trustStatus,
  builderRating,
  whyFeatured,
  license,
}: RepoCardProps) {
  return (
    <div className="rounded-lg bg-[#0D0F14] border border-[#2A2D35] p-4">
      <div className="flex items-start justify-between mb-2">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F7F2EE] font-semibold hover:text-[#B8922A] transition-colors"
        >
          {repoName}
        </a>
        <span
          className={`text-xs px-2 py-0.5 rounded border ${trustColors[trustStatus]}`}
        >
          {trustStatus.replace(/_/g, " ")}
        </span>
      </div>

      <p className="text-sm text-gray-300 mb-3">{description}</p>

      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
        {language && <span>{language}</span>}
        {stars !== undefined && <span>★ {stars.toLocaleString()}</span>}
        {license && <span>{license}</span>}
      </div>

      <div className="mb-2">
        <span className="text-xs text-gray-500">Builder rating: </span>
        <span className="text-[#B8922A]">
          {"★".repeat(builderRating)}
          {"☆".repeat(5 - builderRating)}
        </span>
      </div>

      <p className="text-sm text-[#2D7A4F]">{whyFeatured}</p>
    </div>
  );
}
