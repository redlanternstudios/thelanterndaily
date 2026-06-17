/**
 * LANTERN DAILY — ARTICLE IMAGE SYSTEM
 *
 * Single source of truth for all article images.
 * Never hardcode Unsplash URLs elsewhere in the codebase.
 *
 * Rules:
 * - Every category tag maps to a curated pool of verified photo IDs
 * - getArticleImage() deterministically picks one per article slug (no randomness)
 * - Fallback chain: category pool → DEFAULT_FALLBACK
 * - All IDs verified against Unsplash API as of 2026-06-17
 *
 * To add a category: add it to CATEGORY_IMAGE_POOLS below.
 * To replace a broken ID: update the pool — the slug hash will
 * re-select from the new pool but remain stable for that slug.
 */

const UNSPLASH_BASE = "https://images.unsplash.com/photo-"
const UNSPLASH_PARAMS = "?w=900&auto=format&fit=crop&q=80"

// ─── VERIFIED PHOTO POOLS ────────────────────────────────────────────────────
// Each array contains verified Unsplash photo IDs relevant to the category.
// Keep at least 4 per category to allow variation across articles.

const CATEGORY_IMAGE_POOLS: Record<string, string[]> = {
  "AI INFRASTRUCTURE": [
    "1558494949-ef010cbdcc31", // server room, blue cables
    "1639762681485-074b7f938ba0", // data center corridor
    "1451187580459-43490279c0fa", // satellite dish / infrastructure at night
    "1518770660439-4636190af475", // circuit board macro
    "1518709268805-4e9042af9f23", // network cables
  ],

  "ISLAMIC FINANCE": [
    "1611532736597-de2d4265fba3", // financial chart on screen
    "1611974789855-9c2a0a7236a3", // trading dashboard
    "1554260924-3e3a6c2b4d91", // architecture / geometric pattern
    "1567427018141-43a4b2e3a80c", // currency / finance
    "1529612700005-e35377bf1415", // money / banking abstract
  ],

  "OPEN SOURCE AGENTS": [
    "1555066931-4365d14bab8c", // code on monitor, dark
    "1517694712202-14dd9538aa97", // laptop with code
    "1461749280684-dccba630e2f6", // multiple screens, code
    "1504384308090-c894fdcc538d", // pair programming
    "1550751827-4bd374c3f58b", // AI / neural network abstract
  ],

  "OPERATOR STACK": [
    "1551288049-bebda4e38f71", // server rack, blue light
    "1563013544-824ae1b704d3", // tools/workbench organized
    "1558494949-ef010cbdcc31", // server room
    "1518770660439-4636190af475", // circuit board
    "1597852074816-d8c2a3a85d43", // cloud infrastructure abstract
  ],

  "MUSLIM DEEP TECH": [
    "1451187580459-43490279c0fa", // space / satellite
    "1550751827-4bd374c3f58b", // AI neural net
    "1516321497487-e288fb19713f", // tech presentation
    "1581092580497-e0d23cbdf1dc", // lab / research
    "1504384308090-c894fdcc538d", // collaborative tech
  ],

  "FIELD NOTES": [
    "1455390582262-044cdead277a", // open notebook on desk
    "1501504905252-8679c61e7c1a", // writing / journal
    "1486312338219-ce68d2c6f44d", // laptop + notebook
    "1434030216411-0b793f4b6872", // handwritten notes
    "1522202176988-66273c2fd55f", // focused work / desk
  ],

  "MARKET SIGNALS": [
    "1611974789855-9c2a0a7236a3", // trading charts
    "1611532736597-de2d4265fba3", // financial screens
    "1535320903710-a17afadb9a07", // stock graph
    "1559526324-593bc073d938", // market data
    "1642790551116-18a150d10b07", // crypto / finance
  ],

  "FOUNDER INTELLIGENCE": [
    "1521737711867-e3b97375f902", // founder / leader portrait
    "1553484771-371a1bf2e438", // strategic meeting, minimal
    "1552664730-d307ca884978", // whiteboard / strategy
    "1507003211169-0a1dd7228f2d", // confident professional
    "1519389950473-47ba0277781c", // team collaboration
  ],

  "GOVERNANCE": [
    "1436491865332-7a61a109cc05", // official architecture / columns
    "1554224155-8d04cb21cd6c", // legal / formal document
    "1507679799987-c73779587ccf", // handshake / trust
    "1589829545856-ec4e9b5a8e0a", // compliance / formal
    "1521791055366-0d553872952f", // policy / governance abstract
  ],

  "PRODUCT CALLS": [
    "1516321497487-e288fb19713f", // presentation / product demo
    "1552664730-d307ca884978", // product strategy
    "1498050108023-c5249f4df085", // user on laptop, product UX
    "1454165804606-c3d57bc86b40", // collaboration / call
    "1519389950473-47ba0277781c", // team product review
  ],

  // Generic fallbacks for nav categories without dedicated pools
  "AI": [
    "1550751827-4bd374c3f58b", // AI abstract
    "1518770660439-4636190af475", // circuit board
    "1461749280684-dccba630e2f6", // code
    "1451187580459-43490279c0fa", // tech infrastructure
  ],

  "MARKETS": [
    "1611974789855-9c2a0a7236a3", // trading
    "1611532736597-de2d4265fba3", // financial screens
    "1535320903710-a17afadb9a07", // charts
  ],

  "TECH": [
    "1517694712202-14dd9538aa97", // laptop code
    "1555066931-4365d14bab8c", // code dark
    "1498050108023-c5249f4df085", // developer
    "1516321497487-e288fb19713f", // tech presentation
  ],

  "STACK": [
    "1551288049-bebda4e38f71", // server rack
    "1563013544-824ae1b704d3", // organized tools
    "1518770660439-4636190af475", // circuit board
  ],

  "VIDEO": [
    "1516321497487-e288fb19713f", // presentation / stage
    "1598550874175-4d0ef436c909", // recording / studio
    "1540575467537-c21d49ee0138", // microphone / interview
    "1574717024653-b3b2f2fb5c53", // screen / broadcast
  ],
}

// Absolute last resort if category is unknown
const DEFAULT_FALLBACK = "1518770660439-4636190af475"

// ─── DETERMINISTIC HASH ───────────────────────────────────────────────────────
// Same slug always → same index. No Math.random(). No drift between renders.

function slugToIndex(slug: string, poolLength: number): number {
  if (!slug || poolLength === 0) return 0
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }
  return hash % poolLength
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

/**
 * Returns a stable, relevant Unsplash image URL for an article.
 *
 * @param category - The article's category tag (e.g. "AI INFRASTRUCTURE")
 * @param slug     - The article's slug or unique ID (used for stable selection)
 * @param width    - Optional override for image width (default 900)
 * @returns        Full Unsplash image URL
 *
 * @example
 * getArticleImage("AI INFRASTRUCTURE", "ai-infra-commodity-trade")
 * // → "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&..."
 */
export function getArticleImage(
  category: string,
  slug: string,
  width: number = 900
): string {
  const normalizedCategory = (category ?? "").toUpperCase().trim()
  const pool = CATEGORY_IMAGE_POOLS[normalizedCategory]

  const photoId = pool && pool.length > 0
    ? pool[slugToIndex(slug, pool.length)]
    : DEFAULT_FALLBACK

  const params = `?w=${width}&auto=format&fit=crop&q=80`
  return `${UNSPLASH_BASE}${photoId}${params}`
}

/**
 * Returns a stable image URL using article ID as the slug key.
 * Use when you have an ID but no slug.
 */
export function getArticleImageById(
  category: string,
  id: string | number,
  width: number = 900
): string {
  return getArticleImage(category, String(id), width)
}

/**
 * Returns the full pool of image URLs for a category.
 * Useful for preloading or building image galleries.
 */
export function getCategoryImagePool(category: string): string[] {
  const normalizedCategory = (category ?? "").toUpperCase().trim()
  const pool = CATEGORY_IMAGE_POOLS[normalizedCategory] ?? [DEFAULT_FALLBACK]
  return pool.map((id) => `${UNSPLASH_BASE}${id}${UNSPLASH_PARAMS}`)
}

/**
 * List of all supported category tags.
 * Use to validate incoming category data.
 */
export const SUPPORTED_CATEGORIES = Object.keys(CATEGORY_IMAGE_POOLS)
