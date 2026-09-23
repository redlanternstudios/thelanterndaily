import React from 'react';
import { EditorialStatus, ConfidenceLevel } from '@/lib/types/editorial';

interface EditorialStatusBadgeProps {
  status: EditorialStatus;
  confidence?: ConfidenceLevel;
  className?: string;
}

export default function EditorialStatusBadge({
  status,
  confidence,
  className = '',
}: EditorialStatusBadgeProps) {
  let bg = 'bg-[#0E1B13]';
  let border = 'border-[#2D7A4F]';
  let text = 'text-[#4ADE80]';
  let dot = 'bg-[#4ADE80]';

  if (status === 'EDITORIAL REVIEW') {
    bg = 'bg-[#1C1608]';
    border = 'border-[#B8922A]';
    text = 'text-[#E5C058]';
    dot = 'bg-[#E5C058]';
  } else if (status === 'DEVELOPING') {
    bg = 'bg-[#0C1524]';
    border = 'border-[#3B82F6]';
    text = 'text-[#60A5FA]';
    dot = 'bg-[#60A5FA]';
  } else if (status === 'SOURCE UNCONFIRMED' || status === 'CORRECTION ISSUED') {
    bg = 'bg-[#220B0D]';
    border = 'border-[#D92532]';
    text = 'text-[#F87171]';
    dot = 'bg-[#D92532]';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${bg} ${border} ${text} ${className}`}
      title={`Editorial Status: ${status}${confidence ? ` · Confidence: ${confidence}` : ''}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span>{status}</span>
      {confidence && (
        <>
          <span className="opacity-40">/</span>
          <span className="opacity-80">{confidence}</span>
        </>
      )}
    </span>
  );
}
