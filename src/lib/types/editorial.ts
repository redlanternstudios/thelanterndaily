import { CanonicalCategory } from '../taxonomy';

export type EditorialStatus =
  | 'VERIFIED'
  | 'EDITORIAL REVIEW'
  | 'DEVELOPING'
  | 'SOURCE UNCONFIRMED'
  | 'CORRECTION ISSUED';

export type ConfidenceLevel = 'HIGH' | 'CONFIRMED' | 'ANALYSIS';

export type HalalStance = 'positive' | 'nuanced' | 'concern' | 'blocked';

export interface StructuredStory {
  id: string;
  slug: string;
  category: CanonicalCategory;
  headline: string;
  summary: string;
  editorialStatus: EditorialStatus;
  confidence: ConfidenceLevel;
  sourceName: string;
  sourceUrl: string;
  sourcePublishedAt: string;
  lastVerifiedAt: string;
  authorOrReviewer: string;
  readTimeMinutes: number;
  correctionState?: 'ORIGINAL' | 'CORRECTION ISSUED';
  // Rich editorial layers — reserved for article pages or user-controlled expansion
  islamicLens?: string;
  halalStance?: HalalStance;
  pullQuote?: {
    text: string;
    source: string;
    narrator?: string;
    arabic?: string;
  };
  primaryActionLabel?: string;
}
