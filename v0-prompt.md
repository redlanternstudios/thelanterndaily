# The Lantern Daily — Landing Page

Generate a Next.js App Router + Tailwind v4 landing page for **The Lantern Daily**, a daily Islamic finance intelligence newsletter.

## Design Reference
Base the visual design on the HTML file at `design_ref.html` in the project root. Match its typography, spacing, color palette, card styles, and overall layout approach.

## Requirements

### Layout
- Hero section: headline "The Lantern Daily", subtitle "Your daily dose of Islamic finance intelligence", prominent CTA to subscribe
- Features grid: 3-4 cards highlighting newsletter value props (daily briefings, expert analysis, market signals, shariah insights)
- Forced "Signals" content wall: recent topic preview cards
- Newsletter subscribe section with email input + submit button
- Footer with links and branding

### Styling
- Use Tailwind v4 syntax (`@theme` for design tokens)
- Color palette: warm amber/gold tones (matching lantern/bulletin aesthetic) with deep navy/charcoal backgrounds
- Typography: serif for headings (Playfair Display via Google Fonts), sans-serif for body (Inter)
- Responsive: single column on mobile, multi-column on md+
- Dark theme default
- Subtle animations: fade-in on scroll, hover scale on cards

### Technical
- One page only — no routing, no `/api` routes
- No business logic — static content only
- Loading/empty/error states are N/A (static page)
- Export as `export default function HomePage()`
- Use `@/components/*` imports for any extracted components
- Follow the `design_ref.html` layout closely

### Output
Generate the complete Next.js App Router page (`app/page.tsx`) plus any extracted components in `src/components/`. Use Tailwind v4 @import syntax for CSS.
