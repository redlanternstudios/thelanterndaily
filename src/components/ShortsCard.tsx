interface ShortsCardProps {
  tag: string;
  date: string;
  body: string;
}

export default function ShortsCard({ tag, date, body }: ShortsCardProps) {
  return (
    <article className="atmos-card border border-lantern-border/30 rounded-xl p-5 hover:border-lantern-accent/20 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono text-lantern-accent uppercase tracking-wider">{tag}</span>
        <time className="text-xs text-lantern-muted-text">{date}</time>
      </div>
      <p className="text-sm text-lantern-text leading-relaxed">{body}</p>
    </article>
  );
}
