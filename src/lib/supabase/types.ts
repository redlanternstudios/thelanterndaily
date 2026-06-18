import type { Database } from "./database.types";

export type HalalStance = "positive" | "critical" | "blocked" | "nuanced";

export type Post = {
  id: string;
  type: string;
  title: string;
  slug: string;
  content_markdown: string | null;
  summary: string | null;
  hero_image_url: string | null;
  reading_time_minutes: number | null;
  category: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  halal_stance: HalalStance | null;
  editorial_note: string | null;
  is_premium: boolean;
};

export type HalalBadgeProps = {
  stance: HalalStance;
  editorial_note?: string | null;
};
