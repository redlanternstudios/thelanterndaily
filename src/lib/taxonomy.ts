// Canonical Category Taxonomy for The Lantern Daily
// Single source of truth shared across Homepage, Archive, Filters, Metadata, and Article Pages

export const CANONICAL_CATEGORIES = [
  'AI & Infrastructure',
  'Markets & Islamic Finance',
  'Governance & Geopolitics',
  'Open Source & Operator Stack',
  'Builder Economy',
  'Research & Sacred-Ethics Review',
] as const;

export type CanonicalCategory = (typeof CANONICAL_CATEGORIES)[number];

export interface CategoryMeta {
  name: CanonicalCategory;
  slug: string;
  shortLabel: string;
  tagline: string;
  accent: string;
}

export const CATEGORY_DEFINITIONS: Record<CanonicalCategory, CategoryMeta> = {
  'AI & Infrastructure': {
    name: 'AI & Infrastructure',
    slug: 'ai-infrastructure',
    shortLabel: 'AI & Infra',
    tagline: 'Compute clusters, frontier agent runtimes, and sovereign hardware rails.',
    accent: '#D92532', // Lantern Red
  },
  'Markets & Islamic Finance': {
    name: 'Markets & Islamic Finance',
    slug: 'markets-islamic-finance',
    shortLabel: 'Markets & Capital',
    tagline: 'AAOIFI Sharia equity screening, commodity reserves, and interest-free capital liquidity.',
    accent: '#B8922A', // Disciplined Gold
  },
  'Governance & Geopolitics': {
    name: 'Governance & Geopolitics',
    slug: 'governance-geopolitics',
    shortLabel: 'Governance',
    tagline: 'Algorithmic accountability, cross-border regulatory shifts, and public interest tech.',
    accent: '#4B7BEC', // Sovereign Slate Blue
  },
  'Open Source & Operator Stack': {
    name: 'Open Source & Operator Stack',
    slug: 'open-source-operator-stack',
    shortLabel: 'Operator Stack',
    tagline: 'Self-hosted open weights, edge orchestration, and battle-tested production tooling.',
    accent: '#2D7A4F', // Forest Emerald
  },
  'Builder Economy': {
    name: 'Builder Economy',
    slug: 'builder-economy',
    shortLabel: 'Builder Economy',
    tagline: 'Bootstrapped software, equity syndicates, and high-margin founder execution.',
    accent: '#E5C058', // Warm Gold
  },
  'Research & Sacred-Ethics Review': {
    name: 'Research & Sacred-Ethics Review',
    slug: 'research-sacred-ethics-review',
    shortLabel: 'Ethics & Fiqh',
    tagline: 'Classical jurisprudence (Usul al-Fiqh) applied to autonomy, AI alignment, and modern capital.',
    accent: '#A55EEA', // Deep Amethyst
  },
};

/**
 * Deterministically maps any legacy, database, or abbreviated category to the canonical taxonomy.
 */
export function normalizeCategory(rawCategory?: string | null): CanonicalCategory {
  if (!rawCategory) return 'AI & Infrastructure';
  const trimmed = rawCategory.trim().toLowerCase();

  // Direct match checks
  if (trimmed === 'ai & infrastructure' || trimmed === 'ai infrastructure') {
    return 'AI & Infrastructure';
  }
  if (
    trimmed === 'markets & islamic finance' ||
    trimmed === 'markets' ||
    trimmed === 'finance' ||
    trimmed === 'halal fintech'
  ) {
    return 'Markets & Islamic Finance';
  }
  if (
    trimmed === 'governance & geopolitics' ||
    trimmed === 'governance' ||
    trimmed === 'geopolitics' ||
    trimmed === 'world' ||
    trimmed === 'policy'
  ) {
    return 'Governance & Geopolitics';
  }
  if (
    trimmed === 'open source & operator stack' ||
    trimmed === 'open source' ||
    trimmed === 'operator stack' ||
    trimmed === 'stack' ||
    trimmed === 'tech'
  ) {
    return 'Open Source & Operator Stack';
  }
  if (
    trimmed === 'builder economy' ||
    trimmed === 'builders' ||
    trimmed === 'creator economy' ||
    trimmed === 'founder'
  ) {
    return 'Builder Economy';
  }
  if (
    trimmed === 'research & sacred-ethics review' ||
    trimmed === 'research' ||
    trimmed === 'ethics' ||
    trimmed === 'sacred ethics' ||
    trimmed === 'fiqh' ||
    trimmed === 'field notes'
  ) {
    return 'Research & Sacred-Ethics Review';
  }

  // Broad fuzzy fallback
  if (trimmed.includes('infra') || trimmed.includes('ai') || trimmed.includes('agent')) {
    return 'AI & Infrastructure';
  }
  if (trimmed.includes('market') || trimmed.includes('etf') || trimmed.includes('gold')) {
    return 'Markets & Islamic Finance';
  }
  if (trimmed.includes('law') || trimmed.includes('gov') || trimmed.includes('white house')) {
    return 'Governance & Geopolitics';
  }
  if (trimmed.includes('source') || trimmed.includes('stack') || trimmed.includes('code')) {
    return 'Open Source & Operator Stack';
  }
  if (trimmed.includes('build') || trimmed.includes('founder') || trimmed.includes('startup')) {
    return 'Builder Economy';
  }

  return 'AI & Infrastructure';
}
