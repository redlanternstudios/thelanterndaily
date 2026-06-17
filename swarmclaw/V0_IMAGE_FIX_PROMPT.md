# V0 PROMPT — Wire article-images.ts into all card components

Paste this into the Lantern Daily v0 chat to fix image mismatch permanently.

---

## PROMPT

The article and video card images are broken — showing irrelevant stock photos (shopping carts, random meetings) instead of content-relevant imagery. The root cause is ad-hoc Unsplash URL generation with no category→image contract.

A utility file has been written at `lib/article-images.ts`. Wire it into all card components now.

**Step 1 — Import the utility wherever article images are rendered:**

```ts
import { getArticleImage } from "@/lib/article-images"
```

**Step 2 — Replace every hardcoded article image URL with the utility call:**

Before (any variation of this pattern):
```tsx
<img src={`https://images.unsplash.com/photo-SOME_ID?...`} />
<img src={article.image} />  // if article.image is a hardcoded or random URL
<Image src={unsplashUrl} />
```

After:
```tsx
<Image
  src={getArticleImage(article.category, article.slug)}
  alt={article.title}
  fill
  className="object-cover"
/>
```

**Step 3 — For the VIDEO card specifically**, use the "VIDEO" category:
```tsx
src={getArticleImage("VIDEO", article.slug)}
```

**Step 4 — Remove any existing image URL generation logic** (random ID pickers, Math.random(), hardcoded Unsplash IDs). The utility is now the single source of truth.

**Step 5 — Do NOT use `source.unsplash.com`** — that endpoint is deprecated and unreliable. The utility uses `images.unsplash.com/photo-{ID}` with verified IDs only.

**Expected result:** Every article card shows an image that matches its category (AI infrastructure → server/data center photos, Islamic Finance → financial/architecture photos, Field Notes → notebook/writing photos, etc.). The same article always gets the same image across renders.

---

## CATEGORIES AND THEIR VISUAL THEME (for reference)

| Category Tag | Visual Theme |
|---|---|
| AI INFRASTRUCTURE | Server rooms, data centers, circuit boards, cables |
| ISLAMIC FINANCE | Financial charts, architecture, currency |
| OPEN SOURCE AGENTS | Code on screens, terminals, laptops, dark UI |
| OPERATOR STACK | Server racks, organized tools, infrastructure |
| MUSLIM DEEP TECH | Research, space, AI abstract, labs |
| FIELD NOTES | Notebooks, writing, focused desk work |
| MARKET SIGNALS | Trading charts, financial dashboards |
| FOUNDER INTELLIGENCE | Leaders, strategy meetings, whiteboards |
| GOVERNANCE | Architecture, formal settings, compliance |
| PRODUCT CALLS | Presentations, demos, product screens |
| VIDEO | Stage, studio, microphone, broadcast |
| AI | AI abstract, circuit boards, code |
| MARKETS | Charts, trading, financial data |
| TECH | Laptops, code, developer environments |
| STACK | Servers, tools, infrastructure |
