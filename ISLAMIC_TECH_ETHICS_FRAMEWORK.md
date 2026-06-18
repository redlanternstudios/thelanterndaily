# THE LANTERN DAILY — ISLAMIC TECHNOLOGY ETHICS FRAMEWORK
**Version:** 1.0 | **Established:** 2026-06-16  
**Authority:** Editorial — this is the framework. It applies consistently. Individual articles are verdicted against it, not against feelings.

---

## FOUNDATION: MAQASID AL-SHARIAH

The organizing principle is not a list of rules. It is the objective of Islamic law: the preservation of five necessities (daruriyyat). Every technology product is evaluated against harm or benefit to these five.

| Maqsad | What it protects | Tech threat examples |
|--------|-----------------|---------------------|
| **Din** — Faith | Religious practice, spiritual integrity | Algorithmic deradicalization of belief, anti-Islamic content promotion, faith-washing halal branding |
| **Nafs** — Life/Self | Physical and mental wellbeing | Addictive design, mental health exploitation, content that normalizes self-harm |
| **Aql** — Intellect | Reason, sound judgment, capacity for informed decision | Dark patterns, manipulative UX, addiction loops, misinformation engines |
| **Nasl** — Lineage/Family | Family structure, progeny, community bonds | Platforms that atomize families, destroy community, exploit children |
| **Mal** — Wealth | Rightful ownership, economic integrity, fair exchange | Riba, gharar, maysir, hidden fees, rent extraction, data colonialism |

**A product that attacks any of these five without proportionate benefit is not neutral.**  
The question is never "is this tech" — it is "what does this do to human beings."

---

## TIER 1 — BLOCKED

Any single criterion in this tier results in a BLOCKED verdict. There is no partial credit.

### 1.1 Riba (Interest / Usury)
Any product whose core revenue mechanism includes:
- Interest-bearing credit (APR > 0 on any loan product)
- Revolving credit lines (credit cards, BNPL with interest)
- Predatory lending (payday loans, cash advance apps with mandatory tips/fees that function as interest)
- Margin lending (investment platforms offering leveraged positions with interest charges)

**Note on BNPL:** "Buy Now Pay Later" with zero interest in the stated period is NUANCED if there are late fees. BLOCKED if interest accrues automatically.

**Note on crypto:** Staking mechanisms that function as guaranteed returns on held capital are NUANCED-to-BLOCKED depending on mechanism. Proof-of-stake validation rewards are NUANCED (scholarly disagreement active).

### 1.2 Maysir (Gambling)
Any product whose core engagement mechanic involves:
- Wagering on outcomes of chance for financial gain (sports betting, casino apps, poker)
- Loot boxes with real-money purchase and randomized valuable outcomes (ESRB pay-to-win)
- Prediction markets where users stake money on binary events
- NFT speculation platforms where the primary value proposition is flipping for profit with no underlying utility

**Note on skill games:** Games with real prizes where skill is the primary determinant are NUANCED. Pure chance = BLOCKED.

### 1.3 Gharar (Deception / Excessive Uncertainty)
Any product that systematically:
- Conceals the true cost of a transaction from users at the point of decision (hidden fees revealed post-signup, drip pricing)
- Uses deceptive user interfaces to induce consent users would not give with full information (dark patterns that result in unauthorized charges)
- Misrepresents the nature of the product to induce purchase (AI claims that are demonstrably false, results guarantees that are engineered to fail)
- Operates a two-sided market while concealing the conflict of interest from one side (platforms that claim neutrality while selling prioritization)

**Note:** This is about systematic, structural deception — not poor UX. The test is: if users had full information, would they have made the same decision?

### 1.4 Haram Primary Revenue
Any product whose primary revenue comes from:
- Alcohol (distribution, subscription, marketplace)
- Pornography
- Weapons sales to civilians
- Human trafficking facilitation (certain "dating" and "escort" platforms)
- Tobacco / vaping (marketing platforms)

### 1.5 Zulm (Oppression) — Severe
Any product that is the primary mechanism for:
- State surveillance of persecuted minorities
- Facilitating forced labor supply chains
- Targeting marginalized populations with predatory financial products by design

---

## TIER 2 — CRITICAL

No single criterion here is an automatic BLOCKED. But each represents a real harm vector. Two or more Tier 2 factors in the same product = CRITICAL verdict. One significant factor with large-scale impact = CRITICAL.

### 2.1 Aql Attacks — Engineered Compulsion
Design patterns whose explicit purpose is to reduce deliberate decision-making:
- **Variable reward schedules** — unpredictable reward timing to induce compulsive checking (slot machine mechanic applied to feeds, notifications, social validation)
- **Streak mechanics** — artificial loss aversion attached to daily usage (Duolingo streaks, Snapchat streaks, productivity apps with "break your streak" warnings)
- **Social comparison loops** — continuous relative ranking of users to induce status anxiety and re-engagement (follower counts, like counts, leaderboards as core engagement)
- **FOMO architecture** — time-limited content, disappearing messages, live events designed to make non-participation feel like loss
- **Infinite scroll** — no natural stopping point; pagination that never terminates

**Test:** Does the product benefit when users cannot stop? If yes, and the design reflects that incentive, this criterion fires.

### 2.2 Mal Attacks — Extraction Without Fair Exchange
Revenue models that extract value disproportionate to value delivered:
- **Surveillance capitalism** — primary revenue from selling behavioral data while presenting the product as free (the user is the product, not the customer)
- **Artificial scarcity** — manufactured urgency that inflates prices beyond fair market value (countdown timers that reset, fake "only 2 left" inventory)
- **Subscription traps** — intentional friction in cancellation flows; subscriptions that are trivial to start and require phone calls or written letters to cancel
- **Rent extraction from captive markets** — platforms that create lock-in and then raise prices once exit cost is prohibitive (app stores at 30%, platform fees that escalate post-adoption)
- **Exploitative in-app purchases** — targeting children or addiction-vulnerable users with high-cost microtransactions

### 2.3 Nafs Attacks — Mental Health Exploitation
Products documented to cause measurable harm to psychological wellbeing:
- **Appearance comparison engines** — platforms with documented links to eating disorders, body dysmorphia (Instagram internal research admitted this)
- **Outrage amplification** — algorithmic prioritization of anger, fear, and moral outrage over accuracy (engagement maximization that trades on psychological distress)
- **Isolation mechanics** — platforms that replace human connection while simulating it, increasing loneliness while measuring "engagement"
- **Mental health app exploitation** — apps targeting mental health needs that monetize vulnerability without clinical grounding

### 2.4 Nasl Attacks — Family and Community Harm
- **Child exploitation by design** — platforms built for adults that are known to be used by children and have deliberately avoided enforcement to preserve growth metrics
- **Family atomization** — products that replace community institutions with algorithmic substitutes (content that replaces religious gatherings, family dinners, community spaces)
- **Predatory design targeting minors** — any product that uses Tier 2.1 mechanics with knowledge that a significant portion of its user base is under 18

### 2.5 Din Attacks — Faith Integrity
- **Faith-washing** — products that claim Islamic compliance without independent verification or transparent methodology (fake halal certification)
- **Algorithmic suppression of religious content** — documented cases of Islamic content being deprioritized relative to comparable non-religious content on the same platform
- **Active promotion of content incompatible with Islamic values** — platforms whose algorithms demonstrably amplify anti-Islamic, pornographic, or gambling content

---

## TIER 3 — POSITIVE

No single factor here guarantees POSITIVE. The absence of Tier 1 and Tier 2 factors is a prerequisite. Presence of Tier 3 factors, combined with clean Tier 1/2, results in POSITIVE.

### 3.1 Maslaha (Public Benefit)
Products that deliver genuine, measurable benefit to users and communities:
- **Access expansion** — tools that lower barriers to education, healthcare, legal resources, or economic participation for underserved communities
- **Knowledge preservation** — archiving, digitizing, and distributing knowledge that would otherwise be lost or inaccessible
- **Infrastructure commons** — open source tools, protocols, and platforms that create shared value without private capture
- **Economic enablement** — tools that help people build sustainable livelihoods without extraction (halal freelancing platforms, skill-building tools, small business infrastructure)

### 3.2 Amanah (Trustworthiness)
Products built on principles of honest dealing:
- **Privacy by design** — data minimization, no third-party data sales, user control over data
- **Transparent pricing** — all costs visible before commitment, no hidden fees
- **Open methodology** — for AI products: transparent about training data, limitations, and failure modes
- **User interests aligned with business model** — company profits when users genuinely benefit (not when users are manipulated into spending)

### 3.3 Ihsan (Excellence / Craft)
Products that represent genuine craft and care in their domain:
- Solving a real problem, not manufacturing a problem to solve
- Built to last, not to extract and abandon
- Documentation, support, and maintenance that reflects respect for users
- Security practices that protect users from harm

### 3.4 Taysir (Facilitation / Removing Hardship)
Products that make legitimate, beneficial activity easier:
- Accessibility tools (screen readers, communication aids, translation)
- Developer infrastructure that reduces unnecessary complexity
- Healthcare navigation tools
- Islamic finance tools (halal mortgages, zakat calculators, Islamic investment screening)

---

## TIER 4 — NUANCED

Verdicts where scholarly disagreement is substantive, where context determines halal/haram, or where the product itself is legitimate but specific use cases are not.

### 4.1 Active Scholarly Disagreement
Topics where qualified Islamic scholars hold documented, substantive positions on both sides:
- **Cryptocurrency** — Bitcoin as store of value (multiple positions), DeFi (multiple positions), staking (multiple positions)
- **Life insurance** — traditional life insurance vs. takaful (cooperative insurance); some scholars permit, many do not
- **Certain derivatives** — futures and options for hedging vs. speculation; scholarly disagreement on permissibility for specific instruments
- **Music streaming** — platforms that distribute music; classical position on music is complex, contemporary scholars diverge
- **AI-generated imagery** — some scholars apply photography rulings (permitted), others apply drawing rulings (contested)

### 4.2 Use-Case Dependent
Products where the tool is legitimate but application determines verdict:
- **Social media platforms** — tool is neutral; business model and algorithm are the variable
- **Fintech infrastructure** — payment rails, KYC tools: neutral if used for halal products
- **AI models** — the model is infrastructure; what it's used for determines verdict
- **Marketplaces** — depends entirely on what is sold and how sellers are treated

### 4.3 Emerging / Insufficient Evidence
Products too new for scholarly consensus:
- Brain-computer interfaces
- Certain synthetic biology tools
- Novel financial instruments without precedent in fiqh

---

## VERDICT DECISION TREE

```
1. Does any Tier 1 criterion fire?
   YES → BLOCKED (regardless of anything else)
   NO → continue

2. Do two or more Tier 2 criteria fire?
   YES → CRITICAL
   Does one major Tier 2 criterion fire with large-scale impact?
   YES → CRITICAL
   NO → continue

3. Is there documented scholarly disagreement on core mechanism?
   YES → NUANCED (even if generally positive)
   NO → continue

4. Do Tier 3 criteria fire with no Tier 1/2 present?
   YES → POSITIVE
   NO → no verdict warranted (not everything needs coverage)
```

---

## EDITORIAL NOTE TEMPLATE

After verdict is assigned, the agent generates an editorial note using this structure:

```
[1 sentence: what this product does, factually.]
[1 sentence: which Islamic principle applies and why.]
[1 sentence: what this means for Muslim builders/users — practical implication.]
[Optional 4th sentence: where scholarly disagreement exists, name it.]
```

**Maximum 4 sentences. No hedging language. No "some scholars say." State the framework position clearly.**

Examples:

**BLOCKED (riba):**  
"Klarna's core product is a revolving line of credit with APRs up to 33.99% on unpaid balances. This constitutes riba under all four major madhabs — the interest accrues on a loan, regardless of the UX wrapper. Muslim builders integrating Klarna as a payment option are offering their users access to an interest-bearing instrument."

**CRITICAL (aql attack):**  
"TikTok's algorithm uses a variable reward schedule — the defining feature of slot machine design — applied to video content. This directly attacks aql (sound judgment) by engineering compulsive use in place of deliberate choice. The scale (1B+ users, average 95 minutes/day) makes this one of the largest aql-attack systems ever built."

**POSITIVE:**  
"Cal.com is an open source scheduling infrastructure tool released under the AGPL license. It solves a real coordination problem without behavioral manipulation, data extraction, or hidden fees. For Muslim builders running consulting or service businesses, this is clean infrastructure."

**NUANCED:**  
"Ethereum's proof-of-stake staking mechanism provides yield to validators in exchange for locking capital to secure the network. Whether this constitutes riba (a return on capital without productive risk) or legitimate compensation for a service (network security) is a live scholarly debate with substantive positions on both sides. The Lantern does not issue a verdict here — we document the disagreement."

---

## AGENT SCORING PROMPT (DeepSeek / Groq)

```
You are the scoring engine for The Lantern Daily — an Islamic technology editorial publication.

Your job is to apply the Islamic Technology Ethics Framework to a given article or product description and output a structured verdict.

FRAMEWORK SUMMARY:
- BLOCKED: Any Tier 1 criterion fires (riba, maysir, gharar, haram primary revenue, severe zulm)
- CRITICAL: Two+ Tier 2 criteria OR one major Tier 2 at scale (aql attacks, extraction, mental health harm, family harm, faith attacks)
- NUANCED: Active scholarly disagreement on core mechanism, or use-case dependent, or insufficient evidence
- POSITIVE: No Tier 1/2 present, Tier 3 criteria present (maslaha, amanah, ihsan, taysir)

INPUT:
Article title: {title}
Article content: {content}
Product/company being covered: {subject}

OUTPUT FORMAT (JSON, strict):
{
  "verdict": "BLOCKED" | "CRITICAL" | "NUANCED" | "POSITIVE",
  "tier_1_fires": ["list of specific Tier 1 criteria that fired, or empty array"],
  "tier_2_fires": ["list of specific Tier 2 criteria that fired, or empty array"],
  "tier_3_fires": ["list of specific Tier 3 criteria that fired, or empty array"],
  "scholarly_disagreement": true | false,
  "editorial_note": "2-4 sentences following editorial note template. Factual, direct, no hedging.",
  "confidence": "high" | "medium" | "low",
  "confidence_reason": "one sentence explaining confidence level — high if clear criteria match, low if context is ambiguous"
}

RULES:
- If confidence is low, still output a verdict but flag it for human review
- Do not manufacture Islamic justification — only apply criteria that clearly match
- If no criteria fire in either direction, output NUANCED with confidence "low" and explain
- The editorial_note must follow the template: [what it does] [which principle] [practical implication] [optional: disagreement]
- Maximum 4 sentences in editorial_note
- Do not use hedging phrases: "some say", "it could be argued", "many believe"
- State the framework position. If the framework doesn't resolve it, say so in confidence_reason.
```

---

## REVIEW GATE

Ro's role after agent scoring:

**For each article, Ro sees:**
- Verdict: BLOCKED / CRITICAL / NUANCED / POSITIVE
- Which criteria fired
- The generated editorial note (2-4 sentences)
- Confidence level

**Ro's action:**
- ✓ Approve — verdict and note go to database as-is
- ✗ Override verdict — change the classification (logs the override)
- ✎ Edit note — rewrite the 2-4 sentences (optional, not required)
- ⚑ Flag for scholar — escalate to informal Islamic ethics reviewer

**This is a binary gate, not an authorship task.** Average time: 30 seconds per article.

---

## MAINTENANCE

This framework is a living document.
- **Updates trigger:** new product categories emerge, scholarly consensus shifts, Lantern covers territory not addressed here
- **Update authority:** Ro (founding editor) + any named Islamic ethics advisor
- **Version control:** increment version number on any change to Tier 1 or Tier 2 criteria. Tier 3/4 additions are minor versions.
- **Archive:** old versions kept in `/the-lantern/framework-archive/` — verdicts reference the version active at publish time
