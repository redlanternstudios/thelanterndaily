# The Lantern Daily — Editorial Product Interface

## Overview

A polished editorial product interface for The Lantern Daily publication featuring 4 professional screens with modern magazine + dashboard aesthetic.

---

## 4 Core Screens

### 1. **Editorial Home Feed** (`/editorial`)
- **Hero section**: Featured article with large title, excerpt, CTA button
- **Latest articles grid**: 4-column responsive grid with image cards
- **Image hover states**: Scale 1.02 on hover for subtle interaction
- **Dark theme**: #07080F background, #F7F2EE headings, #D42535 red accents
- **Professional typography**: Georgia serif for headlines, optimized spacing

### 2. **Article Detail** (`/editorial/article`)
- **Full editorial treatment**: Category tag, headline, subtitle, author byline
- **Article metadata**: Author, publication date, read time, view count
- **Featured hero image**: Full-width image with border treatment
- **Rich body copy**: 18px font, 1.8 line-height, optimized readability
- **Author bio card**: Background styling with contextual information
- **Related reading section**: 3 related articles with category tags

### 3. **Archive** (`/editorial/archive`)
- **Category filters**: All, Intelligence, Analysis, Product, Operations, Culture
- **Filterable grid**: Real-time filtering, shows result count
- **Article cards**: 280px cards with images, category tags, dates
- **Responsive**: Auto-fill grid that adapts to viewport
- **Active state styling**: Red background for selected filter

### 4. **Publish/Editor Dashboard** (`/editorial/publish`)
- **Article editor**: Title, subtitle, category, author inputs
- **Edit mode toggle**: Switches between view and edit states
- **Draft management**: 3-column draft list with status badges (Draft, In Review)
- **Published metrics**: Recently published articles with view counts
- **Status indicator**: Visual badge showing article publication state
- **Input styling**: Consistent dark theme with focused border colors

---

## Design System

### Colors
- **Background**: #07080F (near-black)
- **Text**: #F7F2EE (off-white, headings)
- **Secondary**: #9CA3AF (gray, body text)
- **Accent**: #D42535 (red, calls-to-action, highlights)
- **Border**: #1A1F2E (subtle dividers)

### Typography
- **Headlines**: Georgia, serif (48px, 52px, 20px)
- **Body**: System sans-serif (14-18px)
- **Metadata**: 12px, monospace letter-spacing

### Components
- Cards with 1px borders, subtle hover effects
- Tags for categorization and status
- Responsive grids (3-col desktop, 2-col tablet, 1-col mobile)
- Smooth transitions (0.2s default)

---

## Generated Images (Downloadable from `/public`)

All images are pre-generated and stored in the project's `/public` directory:

1. **editorial-hero.png** — Abstract editorial hero (circuit board aesthetic)
2. **editorial-article-1.png** — Tech/circuit board close-up
3. **editorial-article-2.png** — Studio workspace with MacBook
4. **editorial-article-3.png** — Data visualization graphics
5. **editorial-article-4.png** — Diverse team collaboration

**To download images from this project:**
- Navigate to `/public/` in the repository
- Right-click each `editorial-*.png` file
- Select "Download" or "Save image"
- Files are ready for immediate use in other projects

---

## File Structure

```
src/app/editorial/
├── page.tsx              # Home feed (featured + grid)
├── article/
│   └── page.tsx         # Article detail page
├── archive/
│   └── page.tsx         # Archive with filters
└── publish/
    └── page.tsx         # Editor/publish dashboard

public/
├── editorial-hero.png
├── editorial-article-1.png
├── editorial-article-2.png
├── editorial-article-3.png
└── editorial-article-4.png
```

---

## Technical Features

- **'use client'** directive for interactive state (filters, edit mode)
- **Next.js Image component** for optimized image delivery
- **Responsive grid layouts** with CSS Grid and Flexbox
- **Inline styles** for rapid iteration (easily convert to Tailwind/CSS modules)
- **Hover states** with transition effects
- **Form inputs** with disabled state for view/edit toggling
- **Dynamic filtering** on archive with real-time result counting

---

## Integration Notes

All 4 screens are standalone and ready to integrate:
1. Add links to `/editorial` in main navigation
2. Images in `/public/` are immediately available
3. Replace placeholder content (article titles, metadata) with real data
4. Connect to Supabase `published_articles` table for dynamic content
5. Apply same dark theme to existing pages for consistency

---

## Live Deployment

- Repository: `redlanternstudios/thelanterndaily`
- Branch: `main` (commit `7e14167`)
- Deploy: `thelanterndaily.com/editorial`
- Screenshot showcase: `thelanterndaily.com/screenshots`

---

## Design Inspiration

The editorial interface draws from professional studio publications:
- **Darden Studio** — Minimalist layout with strong typography
- **TK Creative** — Professional grid-based design system
- **StudioSimms** — Branded color accent patterns

Visual characteristics:
- Restrained color palette (dark backgrounds, red accents)
- Strong editorial hierarchy
- Professional magazine aesthetics
- Clean, scannable layouts
- Modern dashboard elements
