// Manual Supabase types for The Lantern Daily
// Generated from schema.sql — use `supabase gen types` once auth is configured

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      signals: {
        Row: {
          id: string;
          source: string;
          raw_title: string;
          raw_url: string;
          raw_summary: string | null;
          url_hash: string;
          published_at: string | null;
          ingested_at: string;
          relevance_score: number | null;
          actionability_score: number | null;
          freshness_score: number | null;
          composite_score: number | null;
          scoring_notes: string | null;
          category: string | null;
          status: string;
          scored_at: string | null;
        };
        Insert: any;
        Update: any;
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          type: string;
          title: string;
          slug: string;
          issue_number: number | null;
          content_markdown: string | null;
          summary: string | null;
          hero_image_url: string | null;
          og_image_url: string | null;
          reading_time_minutes: number | null;
          category: string | null;
          affiliate_tool: string | null;
          affiliate_url: string | null;
          content_confidence_score: number | null;
          image_quality_score: number | null;
          flags: string[] | null;
          status: string;
          beehiiv_post_id: string | null;
          published_at: string | null;
          scheduled_for: string | null;
          created_at: string;
          updated_at: string;
          signal_ids: string[] | null;
          is_premium: boolean;
          halal_stance: string | null;
          editorial_note: string | null;
        };
        Insert: any;
        Update: any;
        Relationships: [];
      };
      shorts: {
        Row: {
          id: string;
          headline: string;
          insight: string;
          source_name: string | null;
          source_url: string | null;
          card_image_url: string | null;
          category: string | null;
          signal_id: string | null;
          published_at: string;
          created_at: string;
        };
        Insert: any;
        Update: any;
        Relationships: [];
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          tier: string;
          beehiiv_id: string | null;
          subscribed_at: string;
          unsubscribed_at: string | null;
          referral_source: string | null;
          operator_number: number | null;
          is_active: boolean;
        };
        Insert: any;
        Update: any;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
