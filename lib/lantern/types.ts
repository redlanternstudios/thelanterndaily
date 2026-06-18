// ── Pure types + client-safe utilities ────────────────────────────────────────
// No Supabase imports. Safe to use in "use client" components.

export type ContentType = "article" | "video" | "market" | "spotlight";

export interface LanternArticle {
  id: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  content_type: ContentType;
  category: string | null;
  image_url: string | null;
  youtube_video_id: string | null;
  url: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  is_premium: boolean;
  halal_classification: string | null;
  halal_score: number | null;
}

export interface LanternStackEntry {
  id: string;
  tool_name: string;
  tool_url: string;
  category: string;
  tier: string;
  one_line_desc: string | null;
  full_breakdown: string | null;
  halal_screened: boolean;
  halal_notes: string | null;
  has_affiliate: boolean;
  affiliate_link: string | null;
  tier_placement: string;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function readTime(minutes: number | null): string {
  if (!minutes) return "5 min read";
  return `${minutes} min read`;
}

export function articleHref(article: LanternArticle): string {
  if (article.content_type === "video" && article.youtube_video_id) {
    return `https://www.youtube.com/watch?v=${article.youtube_video_id}`;
  }
  if (article.url) return article.url;
  return `/issues/${article.id}`;
}
