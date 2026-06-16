# THE LANTERN DAILY — DATA DISCOVERY + TRUST ARCHITECTURE CTP
**Version:** 1.0 | **Date:** 2026-06-14 | **Status:** LOCKED FOR BUILD

---

## PROBLEM STATEMENT
**Type:** Strategic + Product + Trust Architecture

The Lantern Daily requires a verified, trust-preserving data architecture that sources content across Muslim tech, Islamic finance, markets, and scholarship — then surfaces it to the Ummah with zero ambiguity about its halal integrity. One trust failure at scale is not recoverable in this community.

---

## 3-PASS CTP ANALYSIS

### PASS 1 — SURFACE LAYER

We need:
- A set of RSS + API sources for news and markets
- An AI scoring layer to filter for relevance
- A Ro-approval gate before anything publishes
- Display logic to show content with Islamic credibility signals

Risk at surface: sources may not be inherently halal-safe even if they use Islamic language. Groq AI can score content highly that is actually negative toward Islamic finance. Financial content creates implicit shariah endorsement.

### PASS 2 — CHALLENGE PASS 1

What did Pass 1 miss?

**1. Beehiiv's ad network is a live, day-1 threat.**
Beehiiv's native ad program auto-inserts ads from any advertiser unless explicitly disabled or curated. A riba-based bank ad, crypto gambling product, or conventional insurance appearing inside a Muslim newsletter = 30-minute screenshot spread across Muslim Twitter/X/WhatsApp groups. This must be addressed before first issue publishes.
→ **Fix:** Disable Beehiiv boosts/ad network entirely or gate to manually approved sponsors only.

**2. "Islamic" in a headline ≠ halal content.**
salaamgateway.com covers conventional banks' "Islamic window" products, ESG funds that don't meet DJIM criteria, and analysts who argue against certain Islamic finance positions. Keyword filtering alone will pass this content.
→ **Fix:** Source-level trust classification + AI stance detection (is the article advocating FOR or AGAINST halal practice?)

**3. Groq relevance score ≠ halal stance score.**
A 9/10 relevance article could be "Why Islamic Finance is Failing" or "Halal Crypto: A Scam?" — highly relevant, potentially damaging to community trust. Need a separate halal_stance field distinct from relevance.
→ **Fix:** Dual scoring: `relevance_score` (1-10) + `halal_stance` (POSITIVE / NEUTRAL / CRITICAL / BLOCKED)

**4. Trading/market data creates implicit shariah liability.**
Displaying stock prices, market movers, or investment signals — even with Zoya screening — implies endorsement. If a reader invests based on content in The Lantern and the screening was wrong, the community will hold The Lantern accountable.
→ **Fix:** Every market display requires (a) explicit screening source cited, (b) "NOT investment advice" disclosure, (c) screening methodology link, (d) Ro's explicit approval per data set included.

**5. Cold start content problem.**
Day 0 public site with 0 issues and 0 shorts = abandoned look. Trust requires apparent longevity and editorial density before launch. First impressions with the Ummah are permanent.
→ **Fix:** Seed minimum 3 weeks of content before public launch. Write 6 backfill Shorts and 2 full issues before DNS goes live.

**6. AI disclosure is a trust decision, not a fine-print decision.**
The Ummah will eventually ask if this is AI-written. If it comes out post-discovery rather than proactive disclosure, it's a scandal. If proactively disclosed from day 1, it becomes a feature ("AI-researched, human-curated, Ummah-reviewed").
→ **Fix:** "How We Work" section on /about — explicit, proud, clear. Not fine print. Not a disclaimer. A design feature.

### PASS 3 — THE REAL TRUTH (GOVERNS RECOMMENDATION)

**The Lantern is making implicit shariah promises with every piece of content it publishes.**

By branding as Muslim-Built and covering Islamic finance + halal tech, The Lantern becomes an implicit halal endorser in the community's mental model. This is not a UX choice. It is the product's social contract with the Ummah.

**The corollary:** Every trust gate is not infrastructure overhead. It IS the product.

"Screams HALAL" is not a design aesthetic applied after the fact. It is a proof system. The design must surface the invisible trust machinery — making readers able to SEE that content went through gates, not just feel it.

**The 6-month risk:**
At 5,000+ operators, one slip — a riba product covered favorably, an unscreened stock flagged by a halal finance scholar, a Beehiiv ad for conventional banking — triggers a scholar callout on social media. That callout spreads via WhatsApp groups, Muslim Twitter, Islamic finance communities, and masjid networks faster than any email campaign. Conservative estimate: 500-800 unsubscribes in 48 hours, negative brand association that takes 6 months to repair.

**The 24-month opportunity:**
If The Lantern establishes itself as the editorial record of the halal tech movement — trusted by scholars, Muslim founders, Islamic finance professionals — it becomes the distribution asset that makes the entire Halal Suite more valuable. The newsletter is the trust flywheel for every other product.

**Pass 3 Conclusion:**
Build the trust architecture first. Design the trust signals second. Fill the content pipeline third. In that order. Not reversed.

---

## DATA DISCOVERY — COMPLETE SOURCE MAP

### CATEGORY 1: Muslim Tech & Islamic Finance News

| Source | URL | Type | Trust Level | Update Freq |
|--------|-----|------|-------------|-------------|
| Salaam Gateway | salaamgateway.com | RSS | CONDITIONAL — covers conventional adjacent | Daily |
| Islamic Finance Guru | islamicfinanceguru.com | RSS | VERIFIED | 2-3x/week |
| IFN (Islamic Finance News) | islamicfinancenews.com | RSS | VERIFIED | Daily |
| Zawya (Reuters) | zawya.com | RSS | CONDITIONAL — wide coverage | Daily |
| alif.build | alif.build | Manual/scrape | VERIFIED | Weekly |
| Arab News Tech | arabnews.com/tech | RSS | CONDITIONAL | Daily |
| IslamicMarkets.com | islamicmarkets.com | RSS | VERIFIED | Weekly |
| ProductHunt | producthunt.com | API (keyword: halal, islamic, muslim) | CONDITIONAL | Daily |
| TechCrunch | techcrunch.com | RSS (keyword filtered) | CONDITIONAL — filter required | Daily |
| Wired | wired.com | RSS (keyword filtered) | CONDITIONAL — filter required | Daily |
| Wahed Invest Blog | wahedinvest.com/blog | RSS | VERIFIED | Monthly |
| Islamicly Blog | islamicly.com | Manual | VERIFIED | Weekly |

**CONDITIONAL = requires Groq dual-score + Ro approval before inclusion**
**VERIFIED = source-level trust, still requires Groq score ≥ 7**

---

### CATEGORY 2: Market & Trading Data

| Source | Type | Halal Status | Update Freq | Display Rule |
|--------|------|-------------|-------------|-------------|
| Zoya API | Stock halal screener | VERIFIED HALAL | On-demand | Always show Zoya badge |
| DJIM (S&P Dow Jones) | Islamic equity benchmark | VERIFIED HALAL | Daily close | Show index value + description |
| S&P 500 Shariah | Screened equity index | VERIFIED HALAL | Daily close | With screening disclosure |
| AAOIFI.com | Shariah standards updates | AUTHORITATIVE | Irregular | Editorial only |
| Islamicly API | Crypto halal screening | CONDITIONAL (methodology disputed) | Real-time | Show WITH methodology caveat |
| Bursa Malaysia Islamic | Halal REITs | VERIFIED HALAL | Daily | Regional — label as Malaysia market |
| Sukuk.com | Global sukuk issuance | VERIFIED | Weekly | With asset class explanation |

**CRITICAL RULE:** No market data appears without:
1. Screening source named explicitly
2. "Not investment advice" label visible (not hidden)
3. Methodology link available
4. Ro approval on initial data set inclusion

---

### CATEGORY 3: Scholarship & Islamic Content

| Source | Type | Trust Gate |
|--------|------|-----------|
| Authentic Hadith (Supabase) | Hadith database | OWN PRODUCT — trusted, always cite collection + number |
| Quran (Supabase) | 6,236 ayahs | OWN PRODUCT — always show surah + ayah number |
| IslamQA.info | Fatwa library | CURATED — editorial quote only, link to source, scholar named |
| FCNA (Fiqh Council NA) | Rulings | AUTHORITATIVE — cite ruling number and date |
| AAOIFI Standards | Shariah accounting rulings | AUTHORITATIVE — cite standard number |
| Scholar network | Human scholars | VERIFIED by Ro — require named attribution |

**RULE:** No hadith published without collection name + book/hadith number.
**RULE:** No fatwa referenced without scholar name + issuing body + date.
**RULE:** Quran quotes always show Arabic + transliteration + surah:ayah.

---

### CATEGORY 4: Community & Founder Content

| Source | Type | Gate |
|--------|------|------|
| Community tip form | Reader submissions | Moderation queue → Ro approval |
| Founder interviews | Scheduled editorial | Ro-conducted, always on-record |
| Alif.build portfolio | Startup coverage | Ro-approved, editorially independent |
| Bilal / Deixis community | Distribution partner | Editorial, not sponsored unless disclosed |
| Reader Operator Number | Identity signal | System-generated, never editorial |

---

### CATEGORY 5: Sponsored / Operator Stack

| Rule | Detail |
|------|--------|
| Manual approval only | Ro approves every sponsor personally |
| Halal sector screen | Against haram list before any approach |
| Editorial separation | "OPERATOR STACK" label — never disguised as editorial |
| Pricing transparency | Public rate card available |
| Withdrawal right | Lantern can remove any sponsor for trust concerns at any time |

**BLOCKED SPONSOR CATEGORIES (permanent):**
- Conventional banks promoting interest products
- Any company with >5% non-halal revenue per DJIM methodology
- Alcohol / tobacco / gambling adjacent
- Conventional insurance (non-takaful)
- Adult entertainment adjacent
- Weapons manufacturers
- Predatory lending or BNPL without Islamic structure

---

## THE 6 TRUST GATES (PIPELINE ARCHITECTURE)

```
SOURCE LAYER
↓
GATE 0: SOURCE WHITELIST
  - Is this source on the approved list?
  - BLOCKED sources never enter pipeline
  - New source addition: Ro approval + halal audit required
↓
GATE 1: AI DUAL SCORE (Groq llama-4-scout)
  - relevance_score: 1-10 (Muslim tech relevance)
  - halal_stance: POSITIVE / NEUTRAL / CRITICAL / BLOCKED
  - haram_keyword_detected: boolean
  - Score < 7 OR stance = BLOCKED → REJECTED, logged in rejection_log
  - Score ≥ 7, stance = POSITIVE/NEUTRAL → PASSES TO QUEUE
  - stance = CRITICAL → FLAG for Ro attention, not auto-reject
↓
GATE 2: CONTENT QUEUE (Supabase: lantern_content_queue)
  - status: pending | approved | rejected | flagged
  - Ro receives 8am digest via Telegram (primary) + Resend email
  - Ro approves/rejects each item
  - NO CONTENT BYPASSES THIS GATE
↓
GATE 3: ISLAMIC CLAIM CHECK
  - Does this article make Islamic rulings, fatwa references, or shariah claims?
  - YES → routes to scholar_review_queue
  - Scholar review required before publish
  - Scholar attribution added to published piece
↓
GATE 4: FINANCIAL CONTENT SCREEN
  - Does this article cover investable products, stocks, funds, crypto?
  - YES → halal_verification_status must be attached
  - Verification source (Zoya / DJIM / AAOIFI) must be cited
  - "Not investment advice" disclosure auto-appended
↓
GATE 5: PUBLISH (Beehiiv + Supabase)
  - Approved content → Beehiiv CMS for issue writing
  - Beehiiv webhook → Supabase lantern_issues / lantern_shorts
  - Trust badges auto-rendered based on content_type + verification fields
  - All gates logged to lantern_audit_log (permanent, append-only)
```

---

## DATA SCHEMA (Supabase Tables)

### lantern_content_queue
```sql
- id uuid
- source_name text
- source_url text
- article_url text
- headline text
- excerpt text
- relevance_score integer (1-10)
- halal_stance text ('POSITIVE' | 'NEUTRAL' | 'CRITICAL' | 'BLOCKED')
- haram_keyword_detected boolean
- contains_islamic_claim boolean
- contains_financial_product boolean
- status text ('pending' | 'approved' | 'rejected' | 'flagged' | 'scholar_review')
- ro_reviewed_at timestamptz
- ro_decision text
- created_at timestamptz
```

### lantern_market_data
```sql
- id uuid
- ticker text
- company_name text
- screening_source text ('ZOYA' | 'DJIM' | 'SP_SHARIAH' | 'ISLAMICLY')
- halal_status text ('COMPLIANT' | 'NON_COMPLIANT' | 'DOUBTFUL' | 'UNSCREENED')
- screening_date date
- debt_ratio numeric
- non_compliant_income_ratio numeric
- methodology_url text
- display_approved boolean
- display_approved_by text
- created_at timestamptz
```

### lantern_audit_log
```sql
- id uuid
- event_type text
- content_id uuid
- gate_name text
- gate_decision text
- decision_reason text
- decided_by text ('AI' | 'RO' | 'SCHOLAR' | 'SYSTEM')
- created_at timestamptz
-- Append-only. No updates. No deletes.
```

### lantern_trust_signals (per published article)
```sql
- issue_id uuid
- has_scholar_review boolean
- scholar_name text
- scholar_body text
- has_financial_screening boolean
- screening_source text
- has_hadith_citation boolean
- hadith_collection text
- hadith_number text
- has_quran_citation boolean
- quran_surah integer
- quran_ayah integer
- is_sponsored boolean
- sponsor_name text
- sponsor_halal_verified boolean
- correction_issued boolean
- correction_date timestamptz
- correction_notes text
```

---

## DISPLAY LOGIC — TRUST SIGNAL SYSTEM

### Article Trust Badges (visible to reader)

**SCHOLARLY REVIEWED**
- Shows when: scholar_name is set
- Display: green shield icon + "Reviewed by [Name], [Body]"
- Placement: byline area

**HALAL SCREENED**
- Shows when: has_financial_screening = true
- Display: green checkmark + "Halal verified via [Zoya/DJIM/AAOIFI]"
- Placement: inline with any financial product mention

**SOURCE CITED**
- Shows when: has_hadith_citation OR has_quran_citation
- Display: Arabic calligraphy icon + collection/surah reference
- Placement: adjacent to the quoted text

**SPONSORED**
- Shows when: is_sponsored = true
- Display: high-contrast "SPONSORED" label, distinct visual treatment
- Placement: above content, in article header, cannot be missed

**COMMUNITY CORRECTED**
- Shows when: correction_issued = true
- Display: correction notice inline with date + what changed
- Placement: top of article, above fold, permanent

---

## THE HALAL CONTENT TAXONOMY

### Content Types → Trust Requirements

| Content Type | Screening Required | Badge Shown | Scholar Review |
|---|---|---|---|
| Muslim Tech News | AI triage + Ro approval | None (general news) | If Islamic claims present |
| Islamic Finance News | AI triage + Ro approval + financial screen | HALAL SCREENED | If ruling cited |
| Market Data / Screener | Zoya/DJIM verification | HALAL SCREENED + source | Never shown without this |
| Hadith / Quran Quote | Supabase citation check | SOURCE CITED | Recommended |
| Fatwa / Ruling | Human scholar source | SCHOLARLY REVIEWED | REQUIRED |
| Founder Story | Ro-interviewed only | None (editorial) | No |
| Sponsored Content | Sector + revenue screen | SPONSORED (always visible) | No |
| Opinion / Commentary | Ro-approved + labeled | None (labeled OPINION) | If Islamic claims present |

---

## THE "SCREAMS HALAL" DESIGN SYSTEM

### Trust Signal Colors
- **Halal Green** `#2D7A4F` — verification badges, compliant status
- **Warning Amber** `#C47A2A` — CONDITIONAL / DOUBTFUL items
- **Block Red** `#D92532` — category labels + NON_COMPLIANT status (distinct from trust red)
- **Background Dark** `#07080D` — editorial base
- **Cream** `#F7F2EE` — body text on dark sections
- **Scholar Gold** `#B8922A` — scholar attribution, wisdom elements

### Typography Trust Signals
- Arabic accent typography (right-aligned, specific sections)
- Hijri date alongside Gregorian on every issue header
- "بسم الله" (Bismillah) as editorial opening signature
- Scholar names always in full — no initials, no abbreviations
- Collection names always spelled out — not abbreviated (Sahih al-Bukhari, not BUK)

### UI Components That Signal Trust
1. **Halal Gate Badge** — top right of financial articles, shows screening status
2. **Source Chain Component** — expandable "How we sourced this" panel
3. **Scholar Seal** — named scholar with institution, appears on reviewed content
4. **Correction Banner** — full-width, unmissable, shows what changed and why
5. **Bismillah Header** — on every issue, before editorial content begins
6. **Hijri Calendar Display** — date chip on every issue/short
7. **Pipeline Transparency Page** — /how-we-work explains the 6 gates publicly
8. **Community Concern Link** — "Have a concern about this content?" on every article

---

## 10-LAYER ANALYSIS — KEY RISKS

### Risk: Beehiiv Ad Network

| Layer | Analysis |
|-------|---------|
| 1 — Surface | Beehiiv shows ads in emails and web |
| 2 — Root Cause | Beehiiv's business model monetizes reader attention through ad placement |
| 3 — First Order | A haram ad appears in The Lantern's email to subscribers |
| 4 — Second Order | Screenshot shared in Muslim WhatsApp groups, Twitter |
| 5 — Third Order | Scholar community callout, mass unsubscribe event, media reputation damaged |
| 6 — Upstream Dep | Beehiiv tier + ad settings must be configured before first send |
| 7 — Downstream Dep | Entire newsletter distribution trust chain compromised |
| 8 — Failure Mode | Beehiiv quietly enables ad network on plan upgrade |
| 9 — Recovery | No clean recovery — must post public apology + disable immediately |
| 10 — Strategic | Single event can end the product's trust positioning permanently |
| **FIX** | Disable Beehiiv Boosts entirely. Use manual sponsor-only monetization. |

### Risk: AI Triage Failure (Groq)

| Layer | Analysis |
|-------|---------|
| 1 — Surface | Groq scores article 8/10 but it promotes conventional finance |
| 2 — Root Cause | Relevance score ≠ halal stance score |
| 3 — First Order | Article enters content_queue as "approved for review" |
| 4 — Second Order | Ro approves during busy morning without reading full article |
| 5 — Third Order | Article published praising a riba product |
| 6 — Upstream Dep | Dual scoring system (relevance + halal_stance) must be implemented |
| 7 — Downstream Dep | All published financial content credibility |
| 8 — Failure Mode | High article volume causes Ro approval fatigue |
| 9 — Recovery | Correction published, article removed, source blocked |
| 10 — Strategic | Without dual scoring, AI triage provides false safety |
| **FIX** | Separate relevance_score from halal_stance in Groq prompt. Both fields required. |

### Risk: Market Data Liability

| Layer | Analysis |
|-------|---------|
| 1 — Surface | Market movers section shows halal-screened stocks |
| 2 — Root Cause | Screening data can be stale or methodology-disputed |
| 3 — First Order | Reader invests based on Lantern market data |
| 4 — Second Order | Company later found non-compliant, reader loses money |
| 5 — Third Order | Reader attributes loss to Lantern's halal endorsement |
| 6 — Upstream Dep | Screening freshness (Zoya updates monthly, not real-time) |
| 7 — Downstream Dep | Lantern's market section credibility |
| 8 — Failure Mode | Zoya API returns stale data without flagging it |
| 9 — Recovery | Disclaimer published, section paused pending methodology review |
| 10 — Strategic | Market data section requires stronger editorial framing |
| **FIX** | Mandatory: show screening date on every data point. Show staleness warning if >30 days. Never imply real-time compliance. |

---

## ASSUMPTIONS AUDIT

| Assumption | Status | Risk if Wrong | Resolves By |
|---|---|---|---|
| Beehiiv ads can be fully disabled on paid tier | ASSUMED | Day-1 trust failure | Check Beehiiv dashboard settings before first publish |
| Zoya API is commercially available at reasonable cost | ASSUMED | Market data section not viable | Contact Zoya for API access + pricing |
| Make.com can handle RSS + Groq API calls in single scenario | PARTIAL | Pipeline must be redesigned | Test Make.com scenario in sandbox |
| salaamgateway.com has RSS feed | ASSUMED | Manual scraping required | Check salaamgateway.com/rss |
| Groq llama-4-scout can output structured halal_stance scoring reliably | ASSUMED | Dual scoring unreliable | Prompt test with 20 sample articles before production |
| Scholar network is available for spot-check review | UNKNOWN | Scholar gate never activates | Identify 2-3 named scholars willing to review for attribution |

---

## BEHAVIORAL DRIVER SEPARATION

**Behavioral Driver:** A Muslim founder opens The Lantern because they want to be seen as — and actually be — someone who operates within Islamic principles. Reading The Lantern is an identity act, not just an information act. It signals to themselves: "I am someone who builds halal."

**Mechanism:** The newsletter, the content, the Operator Number.

**The Constraint:** The behavioral driver is identity reinforcement. The mechanism (newsletter) is necessary but not the constraint. The constraint is: "Can I trust that this content reflects my values, or will reading it make me complicit in something haram?"

**Implication:** The trust architecture is not a feature. It is the permission structure for the identity behavior. Without airtight trust, the behavioral driver inverts — the reader feels The Lantern makes them *less* safe, not more.

---

## COLD START ANALYSIS

**Day 0 content problem:** Public launch with < 3 issues and < 5 shorts = editorial ghost town.

**Fix: Pre-seed content plan before DNS goes live**

| Content | Volume | Status |
|---------|--------|--------|
| Full issues (Beehiiv) | 2 minimum | Write before launch |
| Shorts | 6 minimum | Write before launch |
| Market data section | 1 screened index only | DJIM weekly close — safest starting point |
| Scholar content | 1 Quran/hadith editorial | From our own Supabase data |
| Founder spotlight | 1 | Bilal (Deixis) or community connection |
| Operator Stack | 1-2 tools | Pre-approved halal tools only |

**Operator Number:** Start internal assignment at #0001. Ro gets #0001. First public subscribers get #0002+. Creates sense of founding cohort.

---

## COMMUNITY CORRECTION SYSTEM

Every article must have a visible correction pathway.

**Flow:**
Reader clicks "Have a concern about this content?"
→ Form (article URL auto-populated, concern text, optional contact)
→ Supabase: lantern_corrections table (status: pending)
→ Ro notified via Telegram
→ Review within 24 hours
→ If valid: correction article OR inline correction note published
→ Correction credited: "A community member identified this concern. We verified and corrected."
→ Audit log entry

**Why this builds trust (not destroys it):** In the Ummah, speed and transparency of correction signals editorial integrity. Communities that ignore corrections lose trust. Communities that correct publicly, credit the reporter, and explain what changed gain it.

---

## ACCEPTANCE CRITERIA

| AC | Verification |
|----|-------------|
| AC-1: No content publishes without Ro approval | Audit log query: 0 records with ro_reviewed_at = NULL and status = published |
| AC-2: All financial content shows screening badge | DB query: articles with contains_financial_product = true AND has_financial_screening = false = 0 |
| AC-3: Beehiiv ad network disabled | Manual verify: Beehiiv dashboard monetization settings screenshot |
| AC-4: All hadith/Quran quotes show full citation | DB query: has_hadith_citation = true AND (hadith_collection IS NULL OR hadith_number IS NULL) = 0 |
| AC-5: Correction system live | End-to-end test: submit concern → Telegram notification received → correction_log entry created |
| AC-6: Dual AI scoring active | Sample 10 queued articles: all have both relevance_score + halal_stance fields populated |
| AC-7: Sponsor halal screen on file before any sponsor goes live | Sponsor record in DB has sponsor_halal_verified = true before display_approved = true |

---

## DEFINITION OF DONE

- [ ] All 6 trust gates implemented in Make.com scenario + Supabase
- [ ] Dual AI scoring (relevance + halal_stance) live and tested
- [ ] Beehiiv ad network explicitly disabled — screenshot logged
- [ ] All 7 ACs pass
- [ ] Trust badge components implemented in UI (Halal Gate, Source Cited, Scholar Seal, Correction Banner, Sponsored)
- [ ] /how-we-work page live on thelanterndaily.com
- [ ] Community correction form live and Telegram-wired
- [ ] Pre-seed content loaded (2 issues, 6 shorts) before DNS cutover
- [ ] lantern_audit_log table operational and append-only enforced
- [ ] Market data staleness warning implemented (>30 day flag)

---

## FINAL RECOMMENDATION

**Recommendation:** Build trust architecture before content pipeline. In this order:
1. Disable Beehiiv ads (30 minutes, do today)
2. Build lantern_content_queue schema with dual AI scoring
3. Implement Make.com scenario with all 6 gates
4. Build trust badge UI components
5. Pre-seed content (2 issues, 6 shorts)
6. Launch /how-we-work page
7. Enable community correction form
8. DNS cutover

**Confidence:** HIGH (9/10) — Pass 3 governs. The trust infrastructure IS the product.

**Precondition:** Beehiiv ad network must be confirmed disabled before ANY content is sent. This is the single highest-risk item.

**First Action:** Open Beehiiv dashboard → Monetization → Beehiiv Boosts → Disable. Screenshot. Log it.

**Decision Deadline:** Before any issue is written in Beehiiv.

---

## KPI FRAMEWORK

| KPI | Baseline | Target (90 days) | Measurement |
|-----|---------|------------------|-------------|
| Operator count | 0 | 500 | Supabase subscriber count |
| Open rate | — | >45% (Muslim niche = high intent) | Beehiiv analytics |
| Share rate | — | >8% of issues shared | PostHog share events |
| Trust complaints received | — | <1% of article views | lantern_corrections volume |
| Day 30 subscriber retention | — | >60% | Beehiiv churn data |
| Articles published per week | — | 3-5 Shorts + 1 Weekly Brief | DB count |
| Sponsored revenue | $0 | $500/mo (1-2 sponsors) | Stripe |
| Halal compliance failures | 0 | 0 (forever) | Audit log anomalies |

**Rule:** Halal compliance failures = 0 is not a target. It is a hard floor. Any non-zero value triggers immediate editorial pause + review before next publish.

---

*Document end. Next: build Make.com scenario with 6 gates. Build trust badge UI components.*
