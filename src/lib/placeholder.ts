// Placeholder data for build-time rendering.
// v0 will replace these with real Supabase queries.

export const PLACEHOLDER_ISSUES = Array.from({ length: 6 }, (_, i) => ({
  id: `placeholder-${i + 1}`,
  issue_number: 42 + i,
  title: i === 0 ? 'The Fed Pivot No One Is Talking About' : `Issue #${42 + i}: Signal Edition`,
  subtitle: i === 0 ? 'Deep cuts, quantitative tightening unwind, and what it means for your portfolio.' : 'Curated signal from the week\'s noise.',
  published_at: new Date(Date.now() - i * 86400000).toISOString(),
  status: 'published' as const,
}));

export const PLACEHOLDER_TICKER = [
  { id: 't1', text: 'S&P 500 futures flat ahead of Fed minutes', source: 'Reuters', urgency: 'medium' as const },
  { id: 't2', text: 'Oil inventories draw 4.2M barrels vs 1.8M est.', source: 'EIA', urgency: 'high' as const },
  { id: 't3', text: 'Treasury yield curve steepens on long-end demand', source: 'Bloomberg', urgency: 'low' as const },
];

export const PLACEHOLDER_CONTENT = [
  {
    id: 'c1',
    section: 'Markets',
    headline: 'Quiet Before the Open',
    body: 'Equity futures are treading water this morning as traders digest a heavy slate of central bank commentary...',
  },
  {
    id: 'c2',
    section: 'Policy',
    headline: 'New Tariff Framework Emerges',
    body: 'A bipartisan group of senators is expected to introduce legislation that would reshape how the U.S. approaches trade negotiations...',
  },
  {
    id: 'c3',
    section: 'Tech',
    headline: 'OpenAI Opens Enterprise Tier',
    body: 'The company announced a new self-serve enterprise plan, signaling a push to capture more business customers...',
  },
];