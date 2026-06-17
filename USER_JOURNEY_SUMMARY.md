# The Lantern Daily — User Journey & Site Map

## Architecture Overview

**Stack**: Next.js 16 + Tailwind CSS v4 + Supabase (auth-ready)  
**Responsive Breakpoints**: Desktop (1440px) → Tablet (768px) → Mobile (375px)  
**Color System**: Dark theme (#07080D base), Red accents (#D92532), Gold highlights (#C9A84C)  

---

## Primary User Flows

### Flow 1: Browse → Read Article → Engage with Content
```
Homepage (/)
  ↓ Click "READ THE STORY" or article card
Article Page (/article/[slug])
  ↓ Read content, expand halal badge drawer
Classification Details
  ↓ Return via back button or navigation
Archive (/archive) with category filters
```

### Flow 2: Discover Content via Archive
```
Archive Page (/archive)
  ↓ Filter by category (All, AI, Markets, Tech, Open Source, Governance)
Filtered Article List
  ↓ Click article card
Article Page (/article/[slug])
```

### Flow 3: Reference the Operator Stack
```
Stack Page (/stack)
  ↓ View curated tool matrix (20+ tools profiled)
About Publication (/about)
  ↓ Learn mission + values
```

---

## Button Navigation Map

| Button | Current Behavior | Destination | Status |
|--------|------------------|-------------|--------|
| **Logo** (top-left) | Click | Home (/) | ✓ Live |
| **Today** (nav) | Click | Home (/) | ✓ Live |
| **Stack** (nav) | Click | /stack | ✓ Live |
| **Archive** (nav) | Click | /archive | ✓ Live |
| **About** (nav) | Click | /about | ✓ Live |
| **JOIN THE LANTERN** (top-right) | Click | Auth flow | ⚠ TODO - Needs sign-up/login |
| **READ THE STORY** (hero) | Click | /article/[slug] | ✓ Live |
| **Play Video Button** (video card) | Click | Inline YouTube embed | ✓ Live (12:04) |
| **Article Cards** (grid) | Click | /article/[slug] | ✓ Live |
| **Halal Badge** (article header) | Click | Classification drawer | ✓ Live (3 layers) |
| **JOIN FREE** (subscribe CTA) | Click | Subscription flow | ⚠ TODO |
| **Stack link** (footer) | Click | /stack | ✓ Live |
| **Archive link** (footer) | Click | /archive | ✓ Live |
| **About link** (footer) | Click | /about | ✓ Live |
| **Privacy link** (footer) | Click | /privacy | ✓ Live |
| **Terms link** (footer) | Click | /terms (if exists) | ⚠ Check |

---

## Page Details

### Homepage (/)
- **Hero Section**: 55/45 split (text left, image right) on desktop; stacked on mobile
- **Badge Legend**: 4-column strip explaining halal classification verdicts
- **Content Rows**:
  - Row 1 (Hero): Lead article with classification
  - Row 2: Video card + 2 featured articles
  - Row 3: Section divider ("LATEST INTELLIGENCE")
  - Row 4: 4-column grid of recent articles
  - Row 5: Subscribe CTA section
  - Footer: 4-column links + copyright

### Article Page (/article/[slug])
- **Header**: Kicker, headline, byline (attribution + dates + read time)
- **Classification Badge**: Full-width trigger row below byline
- **Classification Drawer** (3 layers):
  - Desktop: Expands inline below badge row
  - Mobile: Bottom sheet with drag handle + blur backdrop
  - Content: Large label, ruling summary, detailed analysis, reviewer credit, optional methodology link
- **Body**: Article content with pull quotes
- **Related Articles**: List of other pieces by category

### Stack Page (/stack)
- Hero section with "The Operator Stack" title
- Statistics panel (5 layers, 20+ tools, 18K+ operators reading)
- Interactive tool matrix organized by category (Infrastructure, Compute, Edge, Database, etc.)

### Archive Page (/archive)
- Hero: "Every dispatch, in one place"
- Category tabs: All, AI, Markets, Tech, Open Source, Governance
- Article grid (4-column desktop, 2-column tablet, 1-column mobile)
- Article cards include halal badges if present

### About Page (/about)
- Hero section with "A Muslim-founded newsletter..." narrative
- Value propositions: "Signal over noise", "Principle over hype", "Open by default"
- Social proof stats (18,472+ readers)

---

## Responsive Behavior

### Desktop (1440px)
- Hero: 55% left (text) | 45% right (image), min-height 460px
- Row 2: 3-column (1.1fr 0.85fr 0.85fr)
- 4-column grid: 4 equal columns
- Typography: 44px headings, 17px body

### Tablet (1024px)
- Hero: Stacks vertically
- Row 2: 2 columns
- 4-column grid: 3 columns
- Typography: 32px headings, 16px body
- Gaps: 16px instead of 2px

### Mobile (375px)
- Hero: Full-width stack
- Row 2: Single column
- 4-column grid: Single column
- Typography: 26px headings, 14px body
- Padding: 12px instead of 24px
- Gaps: 12px

---

## Missing / TODO Items

1. **Authentication Flow**: "JOIN THE LANTERN" button needs sign-up/login page
2. **Subscription CTA**: "JOIN FREE" button needs payment/email collection flow
3. **Video Playback**: YouTube video still showing placeholder (ID: `7dPT8cJRgfY`) — confirm real video loads
4. **Email Capture**: Footer and subscribe CTA need backend integration
5. **Terms & Conditions**: /terms route may not exist yet
6. **Draft/Premium Content**: No authentication-protected content yet
7. **Search**: No article search functionality
8. **Category Filtering**: Archive filters work via URL params but no UI state persistence

---

## Screenshots Included

1. **01-homepage-desktop.png** — Full homepage desktop view
2. **02-join-the-lantern.png** — State after JOIN button click (shows need for auth)
3. **03-article-page.png** — Article page header with classification badge
4. **03b-article-page-body.png** — Article body content
5. **04-stack-page.png** — Operator stack reference page
6. **05-archive-page.png** — Archive with category tabs
7. **06-about-page.png** — About / mission page
8. **07-mobile-homepage.png** — Mobile homepage (375px)
9. **08-mobile-article.png** — Mobile article page (375px)
10. **09-footer-subscribe.png** — Footer and subscribe section

---

## How to Use This Map

1. Open **USER_JOURNEY_MAP.html** in your browser for an interactive, visual walkthrough
2. Reference this markdown file for detailed button destinations and page descriptions
3. Use the screenshots to verify layout, spacing, and responsive behavior across devices
4. Check the TODO items to identify features needing backend integration

---

Generated: June 17, 2026  
Site: https://thelanterndaily.com  
Next: Implement auth flow and test article delivery workflow
