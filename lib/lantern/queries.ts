import { createClient } from '@/lib/supabase/server';

// ── Types ──────────────────────────────────────────────────────────────────────

export type ContentType = 'article' | 'video' | 'market' | 'spotlight';

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

// ── Content Queue ──────────────────────────────────────────────────────────────

export async function getApprovedContent(limit = 20): Promise<LanternArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select(`
      id, title, excerpt, author, content_type, category,
      image_url, youtube_video_id, url, published_at,
      read_time_minutes, is_premium, halal_classification, halal_score
    `)
    .eq('status', 'approved')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[lantern/queries] getApprovedContent error:', error.message);
    return [];
  }
  return (data ?? []) as LanternArticle[];
}

export async function getArticles(limit = 10): Promise<LanternArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select(`
      id, title, excerpt, author, content_type, category,
      image_url, youtube_video_id, url, published_at,
      read_time_minutes, is_premium, halal_classification, halal_score
    `)
    .eq('status', 'approved')
    .eq('content_type', 'article')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[lantern/queries] getArticles error:', error.message);
    return [];
  }
  return (data ?? []) as LanternArticle[];
}

export async function getVideos(limit = 4): Promise<LanternArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select(`
      id, title, excerpt, author, content_type, category,
      image_url, youtube_video_id, url, published_at,
      read_time_minutes, is_premium, halal_classification, halal_score
    `)
    .eq('status', 'approved')
    .eq('content_type', 'video')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[lantern/queries] getVideos error:', error.message);
    return [];
  }
  return (data ?? []) as LanternArticle[];
}

export async function getMarketContent(): Promise<LanternArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lantern_content_queue')
    .select(`
      id, title, excerpt, author, content_type, category,
      image_url, youtube_video_id, url, published_at,
      read_time_minutes, is_premium, halal_classification, halal_score
    `)
    .eq('status', 'approved')
    .eq('content_type', 'market')
    .order('published_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('[lantern/queries] getMarketContent error:', error.message);
    return [];
  }
  return (data ?? []) as LanternArticle[];
}

// ── Stack Entries ──────────────────────────────────────────────────────────────

export async function getStackEntries(limit = 12): Promise<LanternStackEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lantern_stack_entries')
    .select(`
      id, tool_name, tool_url, category, tier, one_line_desc,
      full_breakdown, halal_screened, halal_notes,
      has_affiliate, affiliate_link, tier_placement
    `)
    .eq('published', true)
    .eq('ro_approved', true)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('[lantern/queries] getStackEntries error:', error.message);
    return [];
  }
  return (data ?? []) as LanternStackEntry[];
}

export async function getFeaturedStackEntries(): Promise<LanternStackEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lantern_stack_entries')
    .select(`
      id, tool_name, tool_url, category, tier, one_line_desc,
      full_breakdown, halal_screened, halal_notes,
      has_affiliate, affiliate_link, tier_placement
    `)
    .eq('published', true)
    .eq('ro_approved', true)
    .not('featured_week', 'is', null)
    .order('created_at', { ascending: true })
    .limit(6);

  if (error) {
    console.error('[lantern/queries] getFeaturedStackEntries error:', error.message);
    return [];
  }
  return (data ?? []) as LanternStackEntry[];
}

// ── Helpers ────────────────────────────────────────────────────────────────────

export function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function readTime(minutes: number | null): string {
  if (!minutes) return '5 min read';
  return `${minutes} min read`;
}

export function articleHref(article: LanternArticle): string {
  if (article.content_type === 'video' && article.youtube_video_id) {
    return `https://www.youtube.com/watch?v=${article.youtube_video_id}`;
  }
  if (article.url) return article.url;
  return `/issues/${article.id}`;
}
