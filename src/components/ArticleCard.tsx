import React from 'react';
import Link from 'next/link';
import HalalBadge from './HalalBadge';

export interface ArticleCardProps {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  section?: string;
  published_at?: string;
  read_time?: string;
  image_url?: string;
  halal_stance?: string;
  source_name?: string;
  post?: any;
}

export default function ArticleCard(props: ArticleCardProps) {
  const p = props.post || {};
  const title = props.title || p.title || 'Untitled';
  const slug = props.slug || p.slug || '';
  const excerpt = props.excerpt || p.excerpt || p.content || '';
  const section = props.section || p.section || props.category || p.category || '';
  const published_at = props.published_at || p.published_at || p.created_at;
  const read_time = props.read_time || p.read_time || '3 min';
  const image_url = props.image_url || p.image_url;
  const halal_stance = props.halal_stance || p.halal_stance;
  const source_name = props.source_name || p.source_name;
  return (
    <article className="group overflow-hidden rounded-xl border border-[#2A2D35] bg-[#0D0F14] transition-all hover:border-[#3E434F]">
      {image_url && (
        <div className="relative aspect-video w-full overflow-hidden bg-[#050608]">
          <img
            src={image_url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {halal_stance && (
            <div className="absolute right-3 top-3">
              <HalalBadge stance={halal_stance} size="sm" />
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between text-xs text-[#9CA3AF]">
          <span className="font-mono uppercase tracking-wider text-[#B8922A]">
            {section || source_name || 'Signal'}
          </span>
          <span className="font-mono">{read_time}</span>
        </div>

        <Link href={`/article/${slug}`} className="block">
          <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-[#F7F2EE] group-hover:text-white">
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="line-clamp-2 text-xs leading-relaxed text-[#9CA3AF]">
            {excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-[#1F2430] pt-3 text-xs text-[#6B7280]">
          <span>{published_at ? new Date(published_at).toLocaleDateString() : 'Recent'}</span>
          <Link href={`/article/${slug}`} className="font-medium text-[#B8922A] hover:underline">
            Read take →
          </Link>
        </div>
      </div>
    </article>
  );
}
