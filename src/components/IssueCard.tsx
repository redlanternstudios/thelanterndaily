import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { LanternIssue } from '@/lib/types';

interface IssueCardProps {
  issue: LanternIssue;
  featured?: boolean;
}

export default function IssueCard({ issue, featured = false }: IssueCardProps) {
  return (
    <Link href={`/archive/${issue.issue_number}`} className="issue-card block">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-accent-gold uppercase tracking-wider">
              Issue #{issue.issue_number}
            </span>
            {featured && (
              <span className="text-[10px] font-mono uppercase bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded-full border border-accent-gold/30">
                Latest
              </span>
            )}
          </div>
          <h3 className={featured ? 'text-2xl' : 'text-lg'}>{issue.title}</h3>
          {issue.subtitle && (
            <p className="text-sm text-text-secondary">{issue.subtitle}</p>
          )}
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 mt-1 text-text-tertiary group-hover:text-accent-gold transition-colors"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      {issue.published_at && (
        <p className="text-xs text-text-tertiary mt-3 font-mono">
          {formatDate(issue.published_at)}
        </p>
      )}
    </Link>
  );
}