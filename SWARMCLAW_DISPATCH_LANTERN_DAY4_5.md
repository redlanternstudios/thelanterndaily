# SWARMCLAW DISPATCH — THE LANTERN DAY 4.5
**Issued:** 2026-06-16 | **Priority:** P0 | **Deadline:** Alif demo  
**Scope Lock:** `SCOPE_LOCK_LANTERN_DAY4_5.md` — read before executing

---

## CONTEXT

The Lantern Daily is a Muslim tech editorial publication. The differentiator is an Islamic lens applied to all tech coverage — halal/haram analysis, not vibes. Alif (Islamic tech accelerator) is evaluating it.

Current state:
- Homepage reads from `data/lanternArticles.ts` (static TypeScript array)
- Supabase schema designed in `supabase/schema.sql` but NOT applied to live project
- Supabase client wired at `lib/supabase/server.ts` and `lib/supabase/client.ts`
- `ArticleCard` component uses static `Article` type
- No halal badge exists anywhere in the UI
- No Supabase reads anywhere in the app

Target state:
- Homepage reads from Supabase `posts` table (server-side)
- `ArticleCard` accepts Supabase `Post` type and renders halal badge
- Article page reads from `posts` by slug and shows editorial note
- 5-8 manually seeded articles visible with all 4 halal stances

---

## MISSION 1 — DATABASE MIGRATION
**Agent:** ARCHITECT or any agent with Supabase access  
**Blocking:** all other missions

### Step 1: Confirm schema.sql is applied
Connect to The Lantern Supabase project (URL in `swarmclaw/LANTERN_KEYS_REFERENCE.md`).  
Run:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```
Expected: `signals`, `posts`, `shorts`, `subscribers`, `affiliate_clicks`, `contact_submissions`, `error_log`

If NOT present: apply `supabase/schema.sql` in full.

### Step 2: Apply halal migration
```sql
alter table posts
  add column if not exists halal_stance text 
    check (halal_stance in ('positive', 'critical', 'blocked', 'nuanced')),
  add column if not exists editorial_note text;

comment on column posts.halal_stance is 'Islamic editorial verdict: positive | critical | blocked | nuanced';
comment on column posts.editorial_note is 'Human-written Islamic reasoning note. Required before publish. Min 2 sentences.';
```

### Step 3: Verify
```sql
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name IN ('halal_stance', 'editorial_note');
```
Should return 2 rows. Done.

---

## MISSION 2 — DATA LAYER TYPES
**Agent:** ENGINEER  
**Blocked by:** Mission 1

Create `lib/types/post.ts`:

```typescript
export type HalalStance = 'positive' | 'critical' | 'blocked' | 'nuanced';

export interface Post {
  id: string;
  type: 'daily-dispatch' | 'weekly-brief' | 'short' | 'stack-spotlight';
  title: string;
  slug: string;
  issue_number: number | null;
  content_markdown: string | null;
  summary: string | null;
  hero_image_url: string | null;
  reading_time_minutes: number | null;
  category: 'ai-systems' | 'product-strategy' | 'operator-stack' | 'field-notes' | 'research' | null;
  halal_stance: HalalStance | null;
  editorial_note: string | null;
  status: 'draft' | 'generating' | 'needs_review' | 'approved' | 'published' | 'unpublished' | 'rejected';
  is_premium: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
```

Create `lib/data/posts.ts`:

```typescript
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types/post';

export async function getPublishedPosts(limit = 12): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getPublishedPosts error:', error);
    return [];
  }
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;
  return data;
}
```

---

## MISSION 3 — HALAL BADGE COMPONENT
**Agent:** ENGINEER  
**Blocked by:** Mission 2

Create `components/HalalBadge.tsx`:

```typescript
import { HalalStance } from '@/lib/types/post';

const BADGE_CONFIG: Record<HalalStance, { label: string; bg: string; color: string; icon: string }> = {
  positive: { label: 'HALAL-ALIGNED', bg: '#D1FAE5', color: '#065F46', icon: '✓' },
  critical: { label: 'CRITICAL',      bg: '#FEF3C7', color: '#92400E', icon: '⚠' },
  blocked:  { label: 'BLOCKED',       bg: '#FEE2E2', color: '#991B1B', icon: '✗' },
  nuanced:  { label: 'NUANCED',       bg: '#F1F5F9', color: '#334155', icon: '◈' },
};

interface HalalBadgeProps {
  stance: HalalStance;
  size?: 'sm' | 'md';
}

export function HalalBadge({ stance, size = 'sm' }: HalalBadgeProps) {
  const cfg = BADGE_CONFIG[stance];
  const fontSize = size === 'sm' ? '10px' : '12px';
  const padding = size === 'sm' ? '3px 8px' : '5px 12px';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: cfg.bg,
        color: cfg.color,
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.08em',
        padding,
        borderRadius: '3px',
        fontFamily: 'var(--font-sans, sans-serif)',
        textTransform: 'uppercase',
      }}
    >
      {cfg.icon} {cfg.label}
    </span>
  );
}
```

---

## MISSION 4 — ARTICLECARD COMPONENT UPDATE
**Agent:** ENGINEER  
**Blocked by:** Mission 3

Update `components/ArticleCard.tsx` to accept `Post` type:
- Replace `Article` import with `Post` from `@/lib/types/post`
- Replace `article.image` with `post.hero_image_url`
- Replace `article.category` with `post.category`
- Replace `article.title` with `post.title`
- Replace `article.excerpt` with `post.summary`
- Replace `article.author` with `'The Lantern Daily'`
- Replace `article.date` with formatted `post.published_at`
- Replace `article.readTime` with `post.reading_time_minutes ? \`${post.reading_time_minutes} min read\` : ''`
- Replace `article.id` href with `/article/${post.slug}`
- Add halal badge below kicker if `post.halal_stance` is set:

```tsx
{post.halal_stance && (
  <div style={{ marginBottom: '8px' }}>
    <HalalBadge stance={post.halal_stance} size="sm" />
  </div>
)}
```

Keep video card handling — check `post.type === 'stack-spotlight'` for video pattern or add `is_video` boolean to Post type if needed.

---

## MISSION 5 — HOMEPAGE REWRITE
**Agent:** ENGINEER  
**Blocked by:** Mission 4

Rewrite `app/page.tsx`:
- Remove `import { lanternArticles } from '@/data/lanternArticles'`
- Add `import { getPublishedPosts } from '@/lib/data/posts'`
- Make component `async`
- Replace static array destructure with:
```typescript
const posts = await getPublishedPosts(12);
const [lead, videoCard, article2, article3, article4, article5, article6] = posts;
```
- Replace all `article.xxx` prop access with `post.xxx` equivalent
- Replace all `<ArticleCard article={...}` with `<ArticleCard post={...}`
- Add null guard: if posts.length < 3, show fallback message (not crash)

Preserve all layout, grid, and styling exactly as-is. Only the data source changes.

---

## MISSION 6 — ARTICLE PAGE REWRITE
**Agent:** ENGINEER  
**Blocked by:** Mission 4

Rewrite `app/article/[id]/page.tsx` (read current file first):
- Replace static array lookup with `getPostBySlug(params.id)` — note: param is `slug`, not UUID
- If not found: `notFound()`
- Add halal badge in article header (below category kicker, above headline):
```tsx
{post.halal_stance && (
  <div style={{ marginBottom: '16px' }}>
    <HalalBadge stance={post.halal_stance} size="md" />
  </div>
)}
```
- Add editorial note block after article body:
```tsx
{post.editorial_note && (
  <div style={{
    borderLeft: '3px solid var(--red)',
    paddingLeft: '20px',
    marginTop: '40px',
    fontStyle: 'italic',
  }}>
    <div style={{ fontWeight: 700, fontStyle: 'normal', marginBottom: '8px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)' }}>
      Islamic Lens
    </div>
    <p>{post.editorial_note}</p>
  </div>
)}
```

---

## MISSION 7 — EDITORIAL STANDARDS PAGE
**Agent:** ENGINEER  
**Blocked by:** nothing (parallel)

Create `app/about/editorial-standards/page.tsx` — static, no Supabase reads.

Content must include:
1. What The Lantern is (editorial institution, not AI filter)
2. Islamic reasoning framework used (Quran, Sunnah, mu'amalat principles)
3. Four verdict types explained with examples
4. Where editorial analysis ends and scholarly consensus begins
5. How to submit scholarly feedback
6. Founding editor: Ro (RedLantern Studios)

Use existing page layout/styling. Link in footer.

---

## EXECUTION ORDER

```
Mission 1 (DB) → Mission 2 (Types) → Mission 3 (Badge) → Mission 4 (Card) → Mission 5 (Homepage) → Mission 6 (Article page)
Mission 7 (Editorial page) — parallel, no dependencies
```

---

## VERIFICATION CHECKLIST

Before marking complete:
- [ ] `SELECT * FROM posts LIMIT 1` returns rows with halal_stance populated
- [ ] Homepage loads without importing `lanternArticles.ts`
- [ ] At least 4 articles visible on homepage
- [ ] All 4 badge types visible across articles
- [ ] Click any article → article page loads from Supabase
- [ ] Editorial note section appears on articles that have it
- [ ] `/about/editorial-standards` loads and reads correctly
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No console errors on homepage or article page

---

## MISSION 8 — HALAL SCORING AGENT
**Agent:** EDITOR or any agent with Groq/DeepSeek access  
**Blocked by:** Mission 1

For each article seeded into `posts` (status = 'approved', halal_stance = null):

1. Read `ISLAMIC_TECH_ETHICS_FRAMEWORK.md` — the full criteria system
2. Read the article content
3. Call DeepSeek (preferred) or Groq llama-4-maverick using the agent scoring prompt at the bottom of the framework doc
4. Parse JSON response
5. Write to `posts` table:
   - `halal_stance` = verdict (lowercase: positive/critical/blocked/nuanced)
   - `editorial_note` = generated 2-4 sentence note
6. Set `status = 'needs_review'` — triggers Ro review gate

Ro reviews verdict + note in dashboard. Approves or overrides. On approve → status = 'published'.

**Confidence < high:** always flag. Set a `flags` array entry: `['needs_scholar_review']`.

---

## DO NOT

- Touch Make.com scenarios
- Add new Supabase tables beyond what's in schema.sql + halal migration
- Wire Beehiiv
- Change any CSS or layout — data only
- Add `lanternArticles.ts` as fallback — remove the import entirely
- Write editorial notes from scratch without applying the framework criteria first
