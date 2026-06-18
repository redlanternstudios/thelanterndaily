"use client";

import Image from "next/image";

interface VideoCardProps {
  title: string;
  videoUrl: string;
  channelName: string;
  channelType: "MUSLIM_RUN" | "HALAL_SAFE" | "OPERATOR_RECOMMENDED";
  thumbnailUrl?: string;
  contentType: string;
  summary: string;
}

const badgeColors: Record<string, string> = {
  MUSLIM_RUN: "bg-green-700 text-white",
  HALAL_SAFE: "bg-blue-700 text-white",
  OPERATOR_RECOMMENDED: "bg-amber-700 text-white",
};

export default function VideoCard({
  title,
  videoUrl,
  channelName,
  channelType,
  thumbnailUrl,
  contentType,
  summary,
}: VideoCardProps) {
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg bg-[#0D0F14] border border-[#2A2D35] p-4 hover:border-[#B8922A] transition-colors group"
    >
      {thumbnailUrl && (
        <div className="relative w-full aspect-video mb-3 rounded overflow-hidden bg-[#07080D]">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded ${badgeColors[channelType]}`}>
          {channelType.replace(/_/g, " ")}
        </span>
        <span className="text-xs text-gray-400">{channelName}</span>
      </div>
      <h3 className="text-[#F7F2EE] font-semibold group-hover:text-[#B8922A] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{summary}</p>
    </a>
  );
}
