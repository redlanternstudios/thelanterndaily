# THE LANTERN — REVENUE MODEL
Version: 1.0 | 2026-06-13
Critical Thought Process: 10-layer deep. Upstream/downstream logic. Real numbers only.

---

## REALITY CHECK FIRST

**What we have:**
- Stripe (payment processing) ✅
- RevenueCat (subscription management — mobile-first, but works for web) ✅
- Wells Fargo Business Account (By Red LLC) ✅
- Beehiiv (newsletter with paid tier support built-in) ✅

**The honest truth:**
Beehiiv has native paid subscriptions. Using RevenueCat for a newsletter is unnecessary complexity unless you're building a native mobile app. Stripe direct or Beehiiv's built-in monetization is the right architecture for v1.

**Decision:**
- v1: Beehiiv paid subscriptions + Stripe for one-time payments (sponsorships, Stack Spotlight packages)
- v2 (when mobile app exists): RevenueCat for in-app subscription management
- Wells Fargo: receives all payouts from Stripe + Beehiiv via By Red LLC EIN

---

## REVENUE STREAMS (4 nets, not 1)

### NET 1: AFFILIATE LINKS (passive, automated)
**How:** Every Daily Dispatch has 1 rotating Stack Card. Every issue links to The Stack page. UTM-tracked.
**Revenue:** Commission per referred subscriber/customer
**Tools:** Beehiiv affiliate links + PostHog UTM tracking + custom `?via=thelantern` params

| Tool | Program | Commission |
|------|---------|-----------|
| Beehiiv | Partner program | $30–50 per referred subscriber who upgrades |
| n8n | Partner program | 20% recurring for 12 months |
| Supabase | Partner program | 20% first year |
| Vercel | Partner program | Apply via vercel.com/partners |
| Groq | Contact for affiliate | TBD |
| Resend | Affiliate program | 20% first 12 months |

**ROI at scale:**
- 5k subscribers, 2% daily CTR on affiliate = 100 clicks/day
- $2 average EPC → $200/day → $6k/month
- 10k subscribers → $12k/month

**Setup required:**
- [ ] Apply to each affiliate program (takes 1-2 weeks to approve)
- [ ] Add `?via=thelantern` UTM to all Stack Card links (already done in stack/page.tsx)
- [ ] Configure PostHog `lantern_affiliate_clicked` event with tool + post_id
- [ ] Set up Beehiiv referral program for subscriber referrals

---

### NET 2: PAID SUBSCRIPTION (Beehiiv native)
**How:** Free tier = Daily Dispatch. Operator tier = Weekly Intelligence Brief + Field Notes + archive access
**Price:** $15/month or $120/year (20% discount = 2 months free)
**Platform:** Beehiiv paid subscriptions (built-in, no Stripe setup needed)

**Beehiiv Operator Tier unlocks:**
- Weekly Intelligence Brief (full issue)
- Field Notes (raw build dispatches from inside RLS)
- Full archive access (free tier sees last 3 issues only)
- "Operator #XXXX" badge (identity signal — makes it feel exclusive)

**Conversion mechanics:**
- Free subscribers see locked content → "Operator only — join to unlock"
- Issue #003+ locked in archive = FOMO
- Onboarding sequence: Day 0 welcome → Day 3 "here's what operators are reading" → Day 7 "unlock the full brief"

**ROI at scale:**
- 5k subscribers, 5% conversion = 250 operators × $15 = $3,750/month
- 10k subscribers, 8% conversion = 800 × $15 = $12,000/month
- Annual plan uptake (30% of paid): smooths cash flow

**Setup required:**
- [ ] Enable Beehiiv paid subscriptions in dashboard
- [ ] Set price: $15/month + $120/year
- [ ] Tag premium content with `audience: 'premium'` in Beehiiv API posts
- [ ] Build upgrade flow in Next.js (Beehiiv hosted OR Stripe checkout)
- [ ] Configure subscriber tier sync: Beehiiv paid → Supabase subscribers.tier = 'operator'

---

### NET 3: STACK SPOTLIGHT SPONSORSHIPS (Stripe, manual)
**How:** Once/month, a tool pays to be the featured Stack Spotlight issue
**Price:** $500 at launch → $2,000 at 5k subscribers → $5,000+ at 20k
**Platform:** Stripe Payment Link (one-time invoice) → Wells Fargo via Stripe Connect

**What sponsors get:**
- Full dedicated issue (web + email)
- 30-day featured placement on /stack page
- "Presented by [Tool]" in that month's daily dispatches
- PostHog-tracked affiliate link performance report

**Positioning:** Not "sponsored content." "The Stack Spotlight." Operators trust it because it's curated, not sold to anyone.

**Sales process (manual, Ro-owned for now):**
1. Ro DMs tool founders directly (you're already using their products)
2. Send one-page media kit (Gamma or PDF)
3. Stripe Payment Link → paid → schedule Spotlight
4. SwarmClaw generates draft → Ro edits → publish

**Setup required:**
- [ ] Create Stripe account under By Red LLC EIN
- [ ] Connect Stripe to Wells Fargo business account
- [ ] Create Stripe Payment Links for Spotlight packages ($500, $1,000, $2,000 tiers)
- [ ] Build 1-page media kit (Gamma is fine for v1)

---

### NET 4: OPERATOR COMMUNITY (future — not v1)
**How:** Paid Slack/Discord for The Lantern operators
**Price:** $50/month or included with annual Operator tier
**When:** After 500 paid subscribers — community value requires critical mass
**Platform:** Slack (already in stack) or a purpose-built Luma/Circle

**Don't build this yet.** A ghost-town community kills the brand. Build after the list hits 500 paid.

---

## STRIPE ARCHITECTURE

**What Stripe handles:**
1. One-time payments (Stack Spotlight packages)
2. Annual subscription payments (if Beehiiv can't handle annual billing)
3. Future: course, templates, or tools sold from The Lantern

**What Beehiiv handles:**
- Monthly paid subscriptions (no Stripe config needed — Beehiiv has native checkout)

**What RevenueCat handles:**
- Nothing for v1. Re-evaluate when/if a mobile app exists.

**Stripe setup for By Red LLC:**
- Entity: By Red LLC (Colorado)
- EIN: confirmed ✅
- Bank: Wells Fargo business checking → Stripe Express payout
- Statement descriptor: "REDLANTERN STUDIOS"
- Payout schedule: Daily (when volume justifies it) → start with weekly

**Stripe products to create:**
```
Product 1: Stack Spotlight — Launch Package
  Price: $500 one-time

Product 2: Stack Spotlight — Growth Package  
  Price: $2,000 one-time

Product 3: The Lantern — Operator Annual
  Price: $120/year (use if Beehiiv doesn't handle annual gracefully)
```

---

## REVENUE PROJECTION (HONEST)

### Month 1–3 (Building the list)
- Target: 0 → 500 subscribers
- Revenue: $0–200 (early affiliate clicks, no paid subs yet)
- Focus: list growth, daily dispatch habit, content quality

### Month 3–6 (First monetization)
- Target: 500 → 2,000 subscribers
- Paid conversions: 50 operators × $15 = $750/month
- Affiliate: ~$600/month
- First Spotlight sponsorship: $500 one-time
- **Run rate: ~$1,850/month**

### Month 6–12 (Growth phase)
- Target: 2,000 → 8,000 subscribers
- Paid conversions: 300 × $15 = $4,500/month
- Affiliate: ~$3,000/month
- Spotlight (2/month): $2,000/month
- **Run rate: ~$9,500/month**

### Year 2 (Scale)
- Target: 8,000 → 20,000 subscribers
- Paid: 1,200 × $15 = $18,000/month
- Affiliate: $8,000/month
- Spotlight (3/month): $12,000/month
- **Run rate: ~$38,000/month**

### The million-dollar math:
$38k/month × 12 = $456k/year from The Lantern alone.
Add HireWire affiliate (career tools), TradeSwarm, and other RLS products crossing this distribution list:
**$1M/year ARR is achievable by Month 18–24 across the portfolio.**

---

## THE FISH-CATCHING SEQUENCE (what to build in order)

1. **Affiliate links** — zero setup cost, starts earning day 1. Apply to programs NOW.
2. **Beehiiv paid tier** — enable in dashboard this week. Gate weekly brief immediately.
3. **Stripe account** — set up under By Red LLC, connect Wells Fargo.
4. **First Spotlight pitch** — DM 3 tool founders after list hits 200 subscribers.
5. **Annual plan** — offer after paid tier is running 60 days.
6. **Community** — after 500 paid subscribers only.

---

## OPEN QUESTIONS

| ID | Question | Impact |
|----|----------|--------|
| OQ-M1 | Is Beehiiv paid subscription enough or do you want Stripe-native checkout? | Architecture choice |
| OQ-M2 | Does By Red LLC have a Stripe account yet? | Blocking for Spotlight sales |
| OQ-M3 | Operator tier price — $15/mo feels right for builders. Agree? | Revenue math |
| OQ-M4 | RevenueCat — confirm you don't need this for The Lantern v1 | Can remove from stack |
