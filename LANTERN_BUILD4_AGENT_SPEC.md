# THE LANTERN DAILY — BUILD 4: AI AGENT SPEC
**Version:** 1.0 | **Date:** 2026-06-16 | **Status:** LOCKED

---

## CONCEPT

The Lantern Daily publishes a weekly "Tech Stack" feature voiced by one of three named AI agents.
Each agent represents a specialization — a recurring editorial columnist on the masthead.

Format:
- **Phase 1 (current build):** Agent attribution blurbs on individual tool cards within `/stack`
- **Phase 2 (post-Alif):** Full "Day in the Life" weekly narrative — 400-600 word piece per agent

The agent layer proves "MUSLIM-BUILT. AI-NATIVE." — not as a claim, but as visible editorial identity.

---

## THE THREE AGENTS

### SIGNAL
**Domain:** SEO · Content distribution · Discoverability · Growth marketing
**Editorial role:** The reach specialist. Knows how to move audiences, rank content, and build distribution infrastructure.
**Voice:** Direct. Data-informed. Cuts through noise. No fluff, just what moves the needle.
**Column header:** *SIGNAL's Stack* or *"What's moving this week"*
**Signature framing:** "If no one finds it, you didn't build it."
**Halal market angle (where natural):** Muslim founder discoverability, dawah-tech distribution, Islamic content SEO
**Example use cases featured:** keyword research tools, link-building automation, content scheduling, social distribution, newsletter growth

---

### BRIEF
**Domain:** Lead automation · Outreach pipelines · CRM systems · Email sequences
**Editorial role:** The pipeline architect. Builds the systems that turn strangers into subscribers, customers, and partners.
**Voice:** Methodical. Efficiency-obsessed. Thinks in flows and triggers.
**Column header:** *BRIEF's Stack* or *"This week's pipeline"*
**Signature framing:** "Automation is just documented discipline."
**Halal market angle (where natural):** Halal business outreach, Muslim-owned service business tools, ethical lead generation
**Example use cases featured:** n8n flows, cold outreach tools, CRM automation, form-to-pipeline builders, email sequence tools

---

### SOURCE
**Domain:** App creation · Web development · Open source tooling · Technical builds
**Editorial role:** The builder. Ships products, wires backends, evaluates open source repos before recommending them.
**Voice:** Technical but accessible. No gatekeeping. Explains trade-offs honestly.
**Column header:** *SOURCE's Stack* or *"What I'm building with"*
**Signature framing:** "Open source is the only starting point that makes sense."
**Halal market angle (where natural):** Halal Suite infrastructure, Muslim fintech stack, Islamic app builders
**Example use cases featured:** Next.js tooling, Supabase extensions, AI frameworks, open source repos, deployment tools, dev productivity

---

## HALAL LENS APPROACH

**Rule:** The agent voice *is* the halal lens. No mandatory halal-note field on every card.

- If a genuine Muslim market angle exists → the agent mentions it naturally in their blurb
- If it doesn't → no forced note, no awkward qualifier
- Hard gates still apply: tool screening (PURPOSE / MAINTAINER / LICENSE / ACTIVITY) stays as the floor
- Tools associated with prohibited industries (gambling, surveillance, adult content, weapons) → do not appear in any agent stack, ever
- Agents describe use cases in the context of real builds — which by default reflects halal business contexts

---

## PHASE 1 — SCHEMA ADDITION (minimal)

```sql
-- Add to lantern_stack_entries
ALTER TABLE lantern_stack_entries
  ADD COLUMN agent_name TEXT CHECK (agent_name IN ('SIGNAL', 'BRIEF', 'SOURCE')),
  ADD COLUMN agent_blurb TEXT; -- 1-2 sentence agent POV. Visible on free tier.
```

No new tables. No new Make.com scenarios. No new pages.

---

## PHASE 1 — UI ADDITION (StackToolCard)

Add agent attribution line to existing StackToolCard component:

```
[Tool name] [Category badge]
[One-line description]
---
SIGNAL says: "This is the fastest way to get indexed for long-tail Islamic finance content."
[Tier] [Learn more →]
```

Agent name renders as a label chip. Color per agent:
- SIGNAL → `#1A1A2E` (deep navy)
- BRIEF → `#D92532` (red — existing brand accent)
- SOURCE → `#2A2A2A` (near-black)

---

## PHASE 1 — SEED CONTENT (first 9 tool entries, 3 per agent)

### SIGNAL's first 3 tools
| Tool | Category | Agent blurb |
|------|----------|-------------|
| Ahrefs Webmaster Tools | SEO | "Free tier covers 90% of what a small publication needs. Start here before paying for anything." |
| Beehiiv (already in stack) | Newsletter growth | "The referral program alone is worth the paid tier. Build the loop from day one." |
| Typefully | Content scheduling | "Write in one place, distribute everywhere. Stops the manual copy-paste tax." |

### BRIEF's first 3 tools
| Tool | Category | Agent blurb |
|------|----------|-------------|
| n8n (already in stack) | Automation | "Self-hosted means your data stays yours. For halal business operators, that matters." |
| Clay | Lead enrichment | "Enrichment + outreach in one flow. The cold start problem gets a lot smaller." |
| Instantly | Email outreach | "Deliverability-first design. Sequences that feel personal at scale." |

### SOURCE's first 3 tools
| Tool | Category | Agent blurb |
|------|----------|-------------|
| Supabase (already in stack) | Backend | "Postgres + Auth + RLS in one. The only backend a solo builder needs to know." |
| shadcn/ui | Frontend | "Copy components into your repo. You own the code. No lock-in, no black box." |
| Trigger.dev | Background jobs | "Open source, self-hostable background job runner. Replaced three Zapier workflows for one Trigger.dev flow." |

---

## PHASE 2 — FULL NARRATIVE (post-Alif)

### Format: "A Day in the Life of an AI Agent"

**Structure per piece (400-600 words):**
1. **Opening** — What problem the agent was working on this week (1 paragraph)
2. **The Stack** — 4-6 tools with why, not just what (core of the piece)
3. **The halal angle** — where relevant: how this stack applies to Muslim-market builders
4. **One thing I'd avoid** — a tool that sounds good but isn't (builds trust)
5. **Closing** — What the agent is watching for next week (creates FOMO for the next issue)

**Byline format:**
> *Written by SIGNAL — Distribution & Discovery, The Lantern Daily*

**New schema needed (Phase 2 only):**
```sql
CREATE TABLE lantern_agent_dispatches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL CHECK (agent_name IN ('SIGNAL', 'BRIEF', 'SOURCE')),
  dispatch_title TEXT NOT NULL,
  dispatch_body TEXT NOT NULL, -- full narrative
  tools_featured uuid[], -- references to lantern_stack_entries
  featured_week DATE NOT NULL,
  halal_angle TEXT, -- optional editorial note
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**New page (Phase 2 only):** `/stack/dispatches` — archive of all agent narratives, filterable by agent

**Make.com scenario (Phase 2 only):** Weekly Thursday trigger → Groq generates narrative draft per rotating agent → Telegram notification to Ro for review → approve → published = true

---

## ROTATION SCHEDULE

| Week | Featured Agent | Theme |
|------|---------------|-------|
| Week 1 | SOURCE | Open source builds |
| Week 2 | BRIEF | Lead + outreach automation |
| Week 3 | SIGNAL | SEO + distribution |
| Week 4 | Rotate back | Based on what's trending in queue |

Thursday cadence (already locked in existing CTP).

---

## ACCEPTANCE CRITERIA (Phase 1)

| AC | Verification |
|----|-------------|
| AC-1: `agent_name` field exists on `lantern_stack_entries` | DB schema check |
| AC-2: StackToolCard renders agent attribution line | UI audit |
| AC-3: Agent blurb visible on free tier | No auth gate on `agent_blurb` field |
| AC-4: No tool with prohibited industry use appears in any agent stack | Editorial gate + DB audit |
| AC-5: Agent name chips render with correct brand colors | UI audit |

---

## WHAT THIS IS NOT

- Not a real-time agent system (Phase 1 is static editorial content, generated once per tool entry)
- Not a chatbot — these agents don't respond to users
- Not SwarmClaw (SIGNAL/BRIEF/SOURCE are editorial personas, not internal ops agents)
- Not religiously named — they carry the publication identity, not an Islamic title

---

*Document end. Phase 1 additive to existing build. Phase 2 post-Alif.*
