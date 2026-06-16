# THE LANTERN DAILY — SOURCING STRATEGY
## CTP Analysis + Editorial Framework
**Version:** 1.0 | **Date:** 2026-06-14 | **Status:** EXECUTION-READY

---

## CTP VERDICT ON THE CHATGPT SOURCING MAP

### PASS 1 — Surface
The ChatGPT list is well-researched and covers most major Islamic tech resource categories. Good taxonomy. Solid starting index. The 5-section editorial structure and trust scoring framework are reasonable. This is useful raw material.

**Verdict: necessary but insufficient.**

---

### PASS 2 — What Pass 1 Missed

**1. Wrong audience filter applied throughout.**
The list was built for "a Muslim tech newsletter" generically. The Lantern serves Muslim FOUNDERS AND BUILDERS — not general Muslim app users. A founder doesn't need to know `meypod/al-azan` is a React Native adhan app unless it competes with or feeds into something they're building. Most of the "Media Resource" category is end-user Islamic content, not builder intelligence. Filtered out below.

**2. "Signal Before Consensus" is violated by the most-featured items.**
`fawazahmed0/quran-api`, GitHub topics `islamic-app`/`islamic-api` — any developer finds these in 60 seconds. Featuring them in Issue #1 is not signal before consensus, it's consensus. High-signal items are the ArXiv papers, the Quran-MD dataset, the IslamicMMLU benchmark, the Quranic Arabic Corpus linguistics layer — things most Muslim builders haven't found yet.

**3. The content structure is a directory, not intelligence.**
"Today's Repo" + "Today's API" = a directory. Directories get bookmarked once and abandoned. The reader goes directly to the source and stops needing The Lantern. The Lantern must create EDITORIAL INTELLIGENCE on top of sources — what does this repo mean for someone building a halal fintech? What product opportunity does this dataset open that doesn't exist yet?

**4. Religious trust is framed defensively, not as a brand asset.**
The ChatGPT trust layer is a risk filter. The Lantern should make trust a POSITIONING STRENGTH. Being the newsletter that calls out weak hadith grading, flags scholarship gaps, and names when something is community-built vs. institutionally verified — that IS the differentiation. No other tech newsletter does this. In tight knowledge communities (Muslim scholars, learned readers), accurate attribution is amplified, not ignored.

**5. No moat analysis.**
The list itself is replicable. Anyone can compile Islamic repos. What's NOT replicable: editorial voice + scholarship relationships + accumulated trust from consistent accuracy + 12 months of instrumented reader behavior. The moat is in the editorial layer and the relationship network — not the source index.

---

### PASS 3 — The Real Truth (governs all recommendations)

**The list is raw material. The Lantern's value is the editorial judgment applied to the list.**

The category The Lantern should own: **Islamic AI infrastructure.**

Not apps. Not general Islamic tech. The *infrastructure layer* — datasets, benchmarks, models, fine-tuning pipelines, embeddings, inference systems — for Islamic knowledge at machine scale. This category is early. Nobody has strong editorial ownership here. IslamicMMLU, Quran-MD, Tadabur, Quranic Arabic Corpus for NLP — these are the foundation of a category that will be significant in 3-5 years. The Lantern can own this NOW before anyone else does.

**The moat is accumulated trust + scholarship network.**
If The Lantern builds verifiable accuracy and a relationship with Islamic scholars who validate content, that is not purchasable. It compounds over time. No other Muslim tech newsletter is building this. Start now.

**The 21-day retention truth:**
Readers are retained when they feel ahead of the curve — that The Lantern told them something that mattered before everyone else knew it. If they feel like they're reading a GitHub trending list with Islamic branding, they churn. Every issue must pass the "did I know this before The Lantern told me?" test.

**Instrumentation moat:**
Click patterns on resource types (repos vs. papers vs. APIs vs. build ideas) → 12 months of this data = a product intelligence report that Islamic tech VCs, Alif.build, and accelerators would pay for. Build the tracking from day 1.

---

## BEHAVIORAL DRIVER SEPARATION

**Behavioral driver (why a Muslim founder subscribes):**
Identity reinforcement — "I am a Muslim builder who is ahead of the curve."
Secondary: FOMO — "I don't want to miss a key Islamic tech signal my competitors find first."
Tertiary: Community belonging — "I am part of the Muslim builder movement."

**Mechanism:** the newsletter format.

**Real constraint:** NOT the mechanism. Whether The Lantern actually delivers "signal before consensus" consistently is the constraint. If it does, the behavioral driver sustains subscription. No mechanism optimization saves a newsletter that isn't actually early.

**Implication for sourcing:** Every featured item must pass the "signal test" before the format or design matters.

---

## THE SIGNAL TEST (gates every feature decision)

Before anything gets featured, answer these three questions:

1. **Is it signal?** Has this appeared in Hacker News, TechCrunch, or a major tech newsletter in the last 30 days? If yes → it's consensus. Either find a new angle, or don't feature it.
2. **Is there a builder angle?** What can a Muslim founder DO with this? If the answer is "nothing specific" → don't feature it as a lead.
3. **Is the trust status clear?** Can The Lantern clearly label: official / academic / community / unknown? If it can't be labeled, it can't be featured without that disclaimer being the editorial hook.

---

## SOURCE TIER TABLE

### TIER 1 — Feature Regularly
*High signal. Builder-relevant. Trust status clear. Consistent with "Signal Before Consensus."*

| Source | Category | Why The Lantern Features It | Trust Status | License |
|--------|----------|----------------------------|-------------|---------|
| IslamicMMLU (arXiv 2603.23750) | AI Benchmark | 10,013 Q&A across Quran/Hadith/Fiqh + madhab-bias evaluation. No Muslim builder should launch an Islamic AI product without knowing this exists. | Academic | Open |
| Quran-MD (arXiv 2601.17880) | Multimodal Dataset | 32 reciters, word-level audio alignment, Arabic + English + transliteration. The dataset that makes tajweed AI products possible. | Academic | Open |
| Tadabur (arXiv 2604.18932) | Audio Dataset | 1,400+ hours, 600+ reciters. Foundation for Quran ASR. The most comprehensive open Quran audio dataset in existence. | Academic | Open |
| Quranic Arabic Corpus (kaisdukes) | Linguistics / NLP | Morphological annotation of entire Quran. Foundation for Arabic NLP, grammar tooling, computational Quran study. Underused by builders. | Academic | Open |
| Quran Foundation API (api-docs.quran.foundation) | Official API | Chapter audio with verse/word timing segments. Officially maintained. The production-grade option for any Quran app. | Official (Quran Foundation) | Free |
| Sunnah.com API | Official API | Manually checked hadith data. Requires API key. The closest thing to authoritative open hadith infrastructure. | Official (Sunnah.com) | API key required |
| IslamHouse API (IslamHouse-API hub) | Content Platform | 132 languages, books, articles, fatwas, videos, audio. Multilingual Islamic content at scale. Officially supervised. | Official (IslamHouse.com) | Free for dawah use |
| fawazahmed0/quran-api | API | 440+ translations, 90+ languages, no rate limits, free. Best free option for prototyping. Well maintained. | Community (high quality) | Unlicensed / free use |
| AlAdhan API (aladhan.com) | Prayer Times API | REST endpoints, JSON, Hijri calendar, qibla. De facto standard for prayer time tooling. | Community (established) | Free |
| EveryAyah (everyayah.com) | Audio Archive | Ayah-level MP3, timing files, text images, multiple reciters. Deep resource for audio-synced Quran UX. | Community (established) | Verify per file |

---

### TIER 2 — Feature Occasionally
*Good signal. Requires editorial framing and caveats. Don't feature without context.*

| Source | Why Occasional | What To Watch |
|--------|---------------|---------------|
| spa5k/tafsir_api | Useful for tafsir UX, but community-built. Feature with explicit "community, not scholar-reviewed" label. | Scholarship sourcing unclear |
| Tarteel AI EveryAyah dataset (HuggingFace) | Good for tajweed AI builders. Feature in "Building With" angle. | License: verify before production use |
| Muslim Open Source Foundation (muslimopensource.org) | Community signal. Feature for ecosystem stories, not as authoritative resource. | Nascent org, verify currency |
| Ummah Build directory (ummah.build) | Market intelligence. Use for "what's being built" angle, not as data source. | Quality variable |
| AhmedBaset/hadith-api | 17 books, REST. Feature only with clear scholarly grading disclaimer. Never feature hadith content without grade. | Grading not always present |
| Tarteel AI (tarteel.ai products) | Tajweed and Quran ASR tooling company. Story angle: Muslim-built AI company. | Not open source — editorial coverage only |
| awesome-islamic-open-source-apps (tarekeldeeb) | Use as discovery meta-index. Never feature the repo itself — feature what you find through it. | Index quality varies by subcategory |

---

### TIER 3 — Research Only
*Use for discovery. Do not feature directly. No standalone issues.*

| Source | Why Research Only |
|--------|-----------------|
| fawazahmed0/hadith-api | Grading unclear, no chain data. Religious sensitivity HIGH. Suitable for prototyping only, never cite for content. |
| abdelrahmaan/Hadith-Data-Sets | Academic dataset. Feature only in "Islamic AI research" context with explicit disclaimer. |
| GitHub topics: islamic-app / muslim-app / islamic-api | Use for discovery sweeps, not as featured "resources." |
| ShathaTm/Quran_Hadith_Datasets | LREC academic paper dataset. Research context only. |
| misraj-ai/quranhub | Community REST API. Quality unverified. Prototype use only. |

---

### TIER 4 — Avoid / Handle Extreme Care

| Category | Rule |
|----------|------|
| Hadith content without grading or chain | Never feature. Featuring ungraded hadith = reputational risk in Muslim community. Corrections spread faster than praise. |
| Prophet depictions | Never. No exceptions. |
| Shrine / grave imagery | Avoid. Fiqh-sensitive across all madhabs. |
| Fatwa content from non-scholar sources | Never. Flag always. |
| Politically charged Islamic conflict content | Avoid unless explicitly covered as "news context" with sourcing. |
| Sectarian / madhab-polemical content | Never feature without explicit context and scholar sourcing. |
| Wikimedia Commons images | Verify EVERY file individually. Category-level browsing is insufficient. |

---

## EDITORIAL STRUCTURE (per issue)

Replace the ChatGPT 5-section structure with this:

### Free Tier — Daily Dispatch

```
SIGNAL [200–300 words]
The editorial take. One resource, one development, one build opportunity.
Why it matters. Why now. What most builders have missed.
Byline: "By Lantern Editorial"

BUILD ANGLE [100 words]
Specific. What can a Muslim founder DO with this in the next 30 days?
Not theory. A concrete starting point.

TRUST SIGNAL [50 words]
[ OFFICIAL ] / [ ACADEMIC ] / [ COMMUNITY ] / [ VERIFY FIRST ]
Scholarship status. License. What to check before using.

QUICK LINKS [3–5 bullets]
Adjacent resources. No descriptions — just links with 5-word context.
```

### Paid Tier — Weekly Brief

```
WEEK IN ISLAMIC TECH [500 words]
Synthesized weekly signal: what moved, what shipped, what matters.

DEEP STACK [400 words]
One resource taken 3 layers deep. Technical + product + market implications.

BUILDER INTELLIGENCE [300 words]
Gap analysis: what's missing in Islamic tech that this resource illuminates.

TRUST AUDIT [100 words]
Scholarship review of any hadith/tafsir/fiqh content featured this week.

MARKET MAP [one table]
What got built, funded, or shipped this week in Muslim tech globally.
```

---

## CONTENT LANES

Every issue comes from one of five lanes. Rotate intentionally.

| Lane | What It Covers | Frequency | Behavioral Hook |
|------|---------------|-----------|----------------|
| **INFRASTRUCTURE** | Datasets, benchmarks, models, embeddings for Islamic AI | 2x/week | "You need this before you start building" |
| **BUILD STACK** | Open source tools, APIs, repos with clear production value | 2x/week | "You can ship with this today" |
| **MARKET SIGNAL** | What's being built, funded, launched in Muslim tech | 1x/week | "You need to know this about your market" |
| **TRUST LAYER** | Scholarship accuracy, source verification, grading quality | 1x/week | "Don't get this wrong" |
| **PRODUCT INTELLIGENCE** | Gaps, opportunities, ideas worth building | 1x/week | "Nobody has built this yet" |

---

## 30-DAY EDITORIAL CALENDAR

Ordered by "signal before consensus" priority. Highest-signal first.

| Day | Lane | Lead Source | Editorial Hook |
|-----|------|------------|---------------|
| 1 | INFRASTRUCTURE | IslamicMMLU (arXiv 2603.23750) | "Before you ship any Islamic AI product, run it against this benchmark. Most builders don't know it exists." |
| 2 | BUILD STACK | Quran Foundation API | "The production-grade Quran API. Not the most famous, but the most defensible for a real product." |
| 3 | INFRASTRUCTURE | Quran-MD multimodal dataset | "32 reciters. Word-level audio alignment. This is what tajweed AI products are built on." |
| 4 | TRUST LAYER | Sunnah.com API vs. community hadith APIs | "Not all hadith APIs are equal. Here's what verified looks like vs. what's community-built." |
| 5 | PRODUCT INTELLIGENCE | Quranic Arabic Corpus (linguistics gap) | "The most linguistically complete Quran resource nobody has built a product on. Why?" |
| 6 | BUILD STACK | AlAdhan API | "Prayer times are solved infrastructure. Here's how to use it so you don't rebuild it." |
| 7 | MARKET SIGNAL | Muslim Open Source Foundation + Ummah Build overview | "Who's building in the open. The Muslim dev community is larger than the headlines suggest." |
| 8 | INFRASTRUCTURE | Tadabur — 1,400-hour Quran audio dataset | "More audio. More reciters. The dataset that makes Quran voice products viable." |
| 9 | BUILD STACK | IslamHouse API | "132 languages. Books, articles, video, audio. The underused backbone of Islamic content infrastructure." |
| 10 | PRODUCT INTELLIGENCE | Islamic lifestyle apps research (arXiv 2402.02061) | "The research that tells you exactly where current Muslim apps fail. That's your product map." |
| 11 | TRUST LAYER | IslamicMMLU madhab-bias findings | "AI models have madhab bias. Here's what that means for your product." |
| 12 | BUILD STACK | fawazahmed0/quran-api | "440+ translations. No rate limits. Free. The fastest path from idea to Quran prototype." |
| 13 | INFRASTRUCTURE | Tarteel AI EveryAyah dataset (HuggingFace) | "Tarteel's Quran ASR dataset: what it contains, what it enables, what it doesn't do." |
| 14 | MARKET SIGNAL | What shipped in Islamic open source this month | "Sweep of new activity across GitHub islamic-app/islamic-api topics. Signal from the community." |
| 15 | PRODUCT INTELLIGENCE | Hadith verification gap | "17 hadith books exist in open APIs. Grading + chain data mostly doesn't. That's the product gap." |
| 16 | BUILD STACK | EveryAyah deep dive | "Ayah-level MP3. Timing files. Text images. Most builders use 20% of what EveryAyah offers." |
| 17 | INFRASTRUCTURE | Arabic NLP state-of-the-art (what models handle Quranic Arabic well) | "Standard Arabic ≠ Quranic Arabic. Here's what that means for builders." |
| 18 | TRUST LAYER | How hadith circulates on Arabic social media (arXiv 2412.20581) | "Research on how unverified hadith spreads online. What it means for your product's trust model." |
| 19 | BUILD STACK | spa5k/tafsir_api | "Community-built tafsir API. What it covers, what's missing, what you'd need to add for production." |
| 20 | PRODUCT INTELLIGENCE | Quran Foundation's open data strategy | "The org behind quran.com is building open infrastructure. What they've opened and what they haven't." |
| 21 | MARKET SIGNAL | Alif.build portfolio — what's getting funded in halal tech | "What the only halal tech accelerator is backing. Pattern recognition for founders." |
| 22 | INFRASTRUCTURE | Quran-MD vs Tadabur — dataset comparison | "Two Quran audio datasets. Which one for which use case. Side-by-side technical breakdown." |
| 23 | BUILD STACK | Quranic Arabic Corpus — practical NLP use cases | "Three concrete things you can build with the Quranic Arabic Corpus that nobody has built." |
| 24 | TRUST LAYER | License audit — what "free" Islamic content actually means | "Open source ≠ free to use commercially. License audit of the top 10 Islamic APIs." |
| 25 | PRODUCT INTELLIGENCE | Masjid data infrastructure gap | "Prayer times are solved. Masjid identity, iqamah times, services — completely unsolved. Map of the gap." |
| 26 | BUILD STACK | IslamHouse multilingual content — production integration guide | "How to use 132 languages of supervised Islamic content in a real product. Step-by-step." |
| 27 | MARKET SIGNAL | Muslim-built tech on Product Hunt — last 90 days | "What launched. What stuck. What failed quietly. Signal from the front lines." |
| 28 | INFRASTRUCTURE | Islamic finance data infrastructure | "Halal screening APIs, DJIM data, zakat calculators in the open. What's real vs. what's missing." |
| 29 | PRODUCT INTELLIGENCE | The Quran app saturation problem | "100+ Quran apps. Most do the same 5 things. The white space that isn't yet owned." |
| 30 | TRUST LAYER + INFRASTRUCTURE | Month 1 Islamic AI infrastructure summary | "Everything we covered in 30 days. What to build with it. What the gaps are. Where it goes next." |

---

## TRUST SCORING SYSTEM

Use this label on every featured resource. Non-negotiable.

```
[ OFFICIAL ]    — Maintained by an Islamic organization or institution with known scholarly oversight
[ ACADEMIC ]    — Peer-reviewed paper, university research, or institutionally-verified dataset
[ COMMUNITY ]   — Open source / community-built. Quality varies. Use with stated caveats.
[ VERIFY FIRST ]— License unclear, scholarship status unknown, or potentially sensitive. Always note explicitly.
[ AVOID ]       — Unverified hadith, imam/prophet depictions, politically charged, sectarian content
```

Religious content rule: **Hadith content is never featured without a grade and collection source.** If a source doesn't include this, it gets `[ VERIFY FIRST ]` and a note that production use requires scholar review.

---

## INSTRUMENTATION MODEL

Track from Issue #1. This is the intelligence moat.

| Event | What It Tells You |
|-------|-----------------|
| Open rate by issue | Overall quality signal |
| Click-through by resource type (repo / paper / API / product idea) | What The Lantern audience actually builds with |
| Click-through by lane (Infrastructure / Build Stack / Market Signal / Trust / Product Intel) | Which lanes drive subscriber behavior |
| Shares per issue | Viral coefficient per content type |
| Free → paid conversion by issue | Which issues convert — what are founders willing to pay for? |
| Churn timing | Which week did they stop opening? What was the last issue they read? |

**Business question every event must answer:**
- Open rate → "Is this issue delivering signal?"
- Resource clicks → "What do Muslim founders actually build?"
- Lane clicks → "What content justifies a paid subscription?"
- Shares → "What does this community share?"
- Conversion → "What turns a free reader into a paying subscriber?"
- Churn → "What broke the trust that kept them subscribed?"

**12-month payoff:** Click pattern data across lanes + resource types = a Muslim tech product intelligence report. This is sellable to Alif.build, Islamic finance VCs, and enterprise buyers doing due diligence on halal tech. Build the tracking before launch, not after.

---

## COLD START PROTOCOL

Issue #1 has 0 subscribers. Design for N=1 value.

**The test:** Can Issue #1 be shared by someone who just read it, to someone who doesn't know The Lantern exists, and create an immediate subscription?

**To pass this test, Issue #1 must:**
- Surface something genuinely non-obvious (IslamicMMLU is the right lead)
- Make the builder angle so specific that a Muslim founder thinks "I need this"
- Demonstrate the trust layer explicitly so readers know this isn't another content aggregator
- Be completable in 3 minutes

**What does NOT work at N=1:**
- "This week in Islamic tech" roundups (requires established context)
- Community features (requires community density)
- "Join the conversation" hooks (requires conversation to exist)

**Seed strategy for first 10 issues:**
Use the top 10 Tier 1 resources, one per issue. These are the strongest, cleanest, highest-signal items in the entire index. Don't scatter them across 30 days. Concentrate signal in the first 10 issues to establish The Lantern's intelligence reputation before the audience gets large enough that quality lapses matter.

---

## COMMUNITY CORRECTION RISK MODEL

Muslim knowledge communities correct publicly and permanently. Wrong moves:

| Risk | Trigger | Impact | Mitigation |
|------|---------|--------|-----------|
| Ungraded hadith featured as authoritative | Quoting hadith from community API without grade | Immediate public correction from scholars | Trust label `[VERIFY FIRST]` on all hadith content. Never imply authenticity without grade. |
| Misidentified scholar attribution | Incorrect source citation | Community shares the correction, not the original content | Cite exactly: collection, book, number. No paraphrasing without the citation. |
| Sectarian content featuring | Featuring content that favors one madhab | Alienates significant portion of audience permanently | Avoid madhab-specific fiqh content. When it appears, frame explicitly as one school's position. |
| Inaccurate technical claim | Saying an API/dataset does something it doesn't | Developer community calls it out | Test all Tier 1 and Tier 2 resources before featuring. "We tested this" is a strong trust signal. |

**Rule:** Accuracy infrastructure precedes distribution infrastructure. Build the trust layer before building the viral layer.

---

## CONTENT PIPELINE INTEGRATION (Make.com)

How these sources feed the automated content radar:

```
RSS Feeds to monitor:
- github.com/trending (filter: islamic, quran, hadith, muslim, arabic-nlp)
- arxiv.org/search (query: Quran OR hadith OR Islamic AI OR Arabic NLP)
- producthunt.com (keyword: Islamic, Muslim, halal, Quran)
- islamicfinancenews.com RSS
- salaamgateway.com RSS
- alif.build (manual check weekly — no RSS)

Make.com scoring (Groq llama-4-scout):
Score 1-10 on:
- Signal score (1-5): is this genuinely early? Would a Muslim founder not know this yet?
- Builder relevance (1-5): can a founder DO something with this?

Score ≥ 8 total → auto-queue for Telegram approval
Score 5-7 → weekly digest for manual review
Score < 5 → discard

Trust tag auto-assignment:
- arxiv.org domain → ACADEMIC
- quran.foundation / sunnah.com / islamhouse.com → OFFICIAL
- github.com → COMMUNITY (requires manual verification)
- unknown → VERIFY FIRST
```

---

## WHAT THE LANTERN SHOULD OWN (12-month category goal)

**Category:** Islamic AI Infrastructure

**Definition:** The datasets, benchmarks, models, tooling, and evaluation frameworks that make AI-powered Islamic knowledge products possible and trustworthy.

**Why The Lantern wins this category:**
- Nobody else is covering it with editorial consistency
- The category is pre-mainstream — 12-18 months from being obvious
- The trust layer (scholarship verification, grading standards) is something a tech newsletter alone can't replicate — The Lantern's Islamic-first identity makes it credible
- The builder audience (Muslim founders) is exactly who will need this as they build products

**Category ownership signals:**
- Scholars and researchers submit their work to The Lantern before it goes anywhere else
- When a Muslim founder is evaluating an Islamic AI tool, they cite "The Lantern covered this"
- Alif.build references The Lantern in due diligence

**KPIs at month 12:**
- Open rate: >40% (strong for newsletter, floor for knowledge-community newsletter)
- Day 21 paid subscriber retention: >60%
- At least 1 paid partnership / sponsorship from Islamic tech company
- At least 1 inbound submission from researcher or builder before publishing

---

## IMMEDIATE ACTIONS (in order)

1. **Lock the first 10 issues** using Tier 1 sources in this order: IslamicMMLU → Quran Foundation API → Quran-MD → Sunnah.com API → Quranic Arabic Corpus → AlAdhan → EveryAyah → Tadabur → IslamHouse API → Islamic lifestyle apps research paper
2. **Set up Make.com content radar** with RSS feeds listed above + Groq scoring (≥8 auto-queue)
3. **Write the trust scoring label definitions** into the Beehiiv template so they appear consistently from Issue #1
4. **Instrument PostHog** with the 6 events listed in the instrumentation model before first send
5. **Test all Tier 1 APIs** before featuring them — "We tested this" in the copy is a trust signal
6. **Write the About page** with the disclosure: "The Lantern Daily is AI-researched and AI-drafted. All content is reviewed and curated before publication." — this is the full disclosure, nothing more needed per-issue

---

*The sourcing map ChatGPT produced is a good ingredients list. This document is the recipe. The Lantern's value is not knowing where the ingredients are — it's knowing which ones to use, when, and why.*
