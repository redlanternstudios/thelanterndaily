import Link from 'next/link'

interface IssueCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tier: 'free' | 'premium'
  imageUrl?: string
  readTime?: string
}

export default function IssueCard({
  slug,
  title,
  excerpt,
  date,
  category,
  tier,
  imageUrl,
  readTime,
}: IssueCardProps) {
  return (
    <Link href={`/issues/${slug}`} className="group block">
      <article className="border border-stone-800 bg-stone-900/50 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300">
        {/* Image */}
        {imageUrl ? (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-stone-800 to-stone-950 flex items-center justify-center">
            <span className="font-serif text-4xl text-stone-600 italic">TL</span>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">{category}</span>
            {tier === 'premium' && (
              <span className="text-[10px] font-semibold uppercase tracking-widest bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                Premium
              </span>
            )}
            {tier === 'free' && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                Free
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-200 leading-snug mb-2">
            {title}
          </h3>

          <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <time className="text-xs font-mono text-stone-500">{date}</time>
            {readTime && <span className="text-xs text-stone-500">{readTime} read</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
