// ─── THE LANTERN DAILY — TypeScript Types ───────────────────────────────────
// Halal trust metadata, Post types, Spotlight types, Agent stack types.
// Mirrors supabase/migrations/*.sql enums and tables.

// ─── AI Agent Types (Phase 1 — Build 4) ────────────────────────────────────
// Maps to migration 003_ai_agent_stack.sql

export type AgentName = 'SIGNAL' | 'BRIEF' | 'SOURCE';

export const AGENT_META: Record<AgentName, { label: string; color: string; domain: string }> = {
  SIGNAL: {
    label: 'SIGNAL',
    color: '#1A1A2E',
    domain: 'SEO · Content distribution · Discoverability',
  },
  BRIEF: {
    label: 'BRIEF',
    color: '#D92532',
    domain: 'Lead automation · Outreach pipelines · CRM',
  },
  SOURCE: {
    label: 'SOURCE',
    color: '#2A2A2A',
    domain: 'App creation · Web development · Open source',
  },
};

export interface StackEntry {
  id: string;
  name: string;
  category: string;
  section: string;
  description: string;
  agent_name: AgentName | null;
  agent_blurb: string | null;
  tier: 'free' | 'operator';
  image_url: string | null;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Halal Badge Types ─────────────────────────────────────────────────────

export type HalalBadgeType =
  | 'halal_verified'
  | 'scholar_reviewed'
  | 'halal_finance_screened'
  | 'editorial_only';

export interface HalalBadgeMeta {
  type: HalalBadgeType;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export const HALAL_BADGE_DEFINITIONS: Record<HalalBadgeType, HalalBadgeMeta> = {
  halal_verified: {
    type: 'halal_verified',
    label: 'Halal Verified',
    icon: '✓',
    description: 'Passed all 6 trust gates. No Islamic claims or financial products present.',
    color: '#2D7A4F',
  },
  scholar_reviewed: {
    type: 'scholar_reviewed',
    label: 'Scholar Reviewed',
    icon: '📚',
    description: 'Contains Islamic claims. Reviewed and verified by a qualified scholar.',
    color: '#B8922A',
  },
  halal_finance_screened: {
    type: 'halal_finance_screened',
    label: 'Halal Finance Screened',
    icon: '🏦',
    description: 'Financial product content screened against DJIM-equivalent criteria. No riba.',
    color: '#B8922A',
  },
  editorial_only: {
    type: 'editorial_only',
    label: 'Editorial Only',
    icon: 'ℹ️',
    description: 'Non-Islamic, non-financial editorial content. Standard 6-gate pipeline.',
    color: '#4E556E',
  },
};

// ─── Post Types ────────────────────────────────────────────────────────────

export type PostType =
  | 'daily-dispatch'
  | 'weekly-brief'
  | 'short'
  | 'stack-spotlight';

export type PostStatus =
  | 'draft'
  | 'generating'
  | 'needs_review'
  | 'approved'
  | 'published'
  | 'retracted'
  | 'community_flagged';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body_html: string | null;
  author_name: string;
  post_type: PostType;
  status: PostStatus;
  halal_badge: HalalBadgeType | null;
  scholar_notes: string | null;
  contains_islamic_claim: boolean;
  contains_financial_product: boolean;
  image_url: string | null;
  video_url: string | null;
  read_time_minutes: number | null;
  is_premium: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Spotlight Types ───────────────────────────────────────────────────────

export type SpotlightTier = 'free' | 'paid';

export interface UserSpotlight {
  id: string;
  user_number: number;
  name: string;
  role_description: string | null;
  profile_image_url: string | null;
  bio_html: string | null;
  stack_highlights: Record<string, string[]> | null;
  stripe_customer_id: string | null;
  affiliate_code: string | null;
  spotlight_tier: SpotlightTier;
  homepage_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}

// ─── Legacy Article interface (kept for backward compat) ───────────────────
// New code should prefer Post. Article remains for the seed data.

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  video?: boolean;
  duration?: string;
  body?: string;
  premium?: boolean;
  halal_badge?: HalalBadgeType;
}
