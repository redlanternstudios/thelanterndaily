# SWARMCLAW MISSION — THE LANTERN DAILY — MAKE.COM AUTOMATION
Version: 1.0 | Created: 2026-06-13
Agent: SC-BACKEND (or Ro manually in Make.com UI)
Priority: HIGH
Status: READY — replaces all prior n8n flows

---

## ROLE

Make.com is the ONLY automation layer for The Lantern Daily.
n8n is not in the stack.
Supabase Edge Functions handle data — Make.com handles workflows and external triggers.

---

## SCENARIO 1: CONTENT RADAR — RSS Ingestion + Scoring
Schedule: Every 6 hours

```
[Schedule trigger: every 6 hours]
  ↓
[RSS module] — pull each source in parallel:
  - https://islamicfinanceguru.com/feed
  - https://www.salaamgateway.com/rss
  - https://tldr.tech/ai/rss
  - https://bensbites.beehiiv.com/feed
  - https://techcrunch.com/feed
  - https://www.wired.com/feed/rss
  ↓
[Iterator] — loop each article
  ↓
[Supabase: Search rows] — check lantern_content_queue WHERE url = {{article.link}}
  ↓
[Filter] — only continue if NO match (dedup gate)
  ↓
[HTTP module: POST to Groq API]
  URL: https://api.groq.com/openai/v1/chat/completions
  Auth: Bearer {{GROQ_API_KEY}}
  Body:
  {
    "model": "llama-3.3-70b-versatile",
    "messages": [{
      "role": "user",
      "content": "Score this article 1-10 for relevance to Muslim founders and builders working in AI and halal tech. Return only JSON: {\"score\": number, \"summary\": \"one sentence\"}\n\nTitle: {{article.title}}\nSummary: {{article.summary}}"
    }],
    "response_format": { "type": "json_object" }
  }
  ↓
[JSON Parse] — extract score + summary
  ↓
[Filter] — only continue if score >= 7
  ↓
[Supabase: Insert row] → lantern_content_queue
  title: {{article.title}}
  url: {{article.link}}
  source: {{feed_name}}
  ai_summary: {{parsed.summary}}
  relevance_score: {{parsed.score}}
  status: 'pending'
  queued_at: {{now}}
```

---

## SCENARIO 2: DAILY APPROVAL DIGEST
Schedule: 2:00 PM MST daily (21:00 UTC)

```
[Schedule trigger: 21:00 UTC daily]
  ↓
[Supabase: Search rows] — lantern_content_queue WHERE status='pending' ORDER BY relevance_score DESC LIMIT 10
  ↓
[Text aggregator] — build digest message from top 10 results
  Format per story:
  "[score/10] {{title}}
   {{source}} — {{ai_summary}}
   Approve: {{NEXT_PUBLIC_SITE_URL}}/api/admin/approve/{{id}}?key={{ADMIN_KEY}}
   Reject: {{NEXT_PUBLIC_SITE_URL}}/api/admin/reject/{{id}}?key={{ADMIN_KEY}}"
  ↓
Run 3 parallel branches:

BRANCH A — Telegram
  [Telegram Bot: Send message]
    Chat ID: {{RO_TELEGRAM_CHAT_ID}}
    Parse mode: HTML
    Message: "📡 <b>Lantern Content Radar</b> — {{date}}

{{aggregated_digest}}

Reply with story number to approve, or use links above."

BRANCH B — Resend Email
  [HTTP module: POST https://api.resend.com/emails]
    Auth: Bearer {{RESEND_API_KEY}}
    Body: {
      "from": "editorial@thelanterndaily.com",
      "to": "{{RO_EMAIL}}",
      "subject": "📡 Lantern Content Radar — {{date}} ({{count}} stories)",
      "html": "{{full_digest_html}}"
    }

BRANCH C — Twilio SMS (fallback)
  [Twilio: Send SMS]
    To: {{RO_PHONE_NUMBER}}
    From: {{TWILIO_NUMBER}}
    Body: "📡 Lantern: {{count}} stories ready for review. Check Telegram or email."
```

---

## SCENARIO 3: WELCOME EMAIL SEQUENCE
Trigger: Webhook POST from /api/subscribe (Make.com webhook URL in MAKE_SUBSCRIBE_WEBHOOK env var)

```
[Webhook trigger]
  ↓
[Variables] — store operator_number, email
  ↓
[Resend: Send email] — Day 0 (immediately)
  Subject: "You are Operator #{{operator_number}}. Welcome to The Lantern."
  Template: welcome_operator
  ↓
[Sleep: 2 days]
  ↓
[Supabase: Get row] — verify subscriber still active
  ↓
[Filter] — only continue if status active
  ↓
[Resend: Send email] — Day 2
  Subject: "Your first signal from The Lantern."
  Body: first issue teaser + link to /shorts
  ↓
[Sleep: 3 days]
  ↓
[Supabase: Get row] — check tier
  ↓
[Filter] — only if tier = 'free'
  ↓
[Resend: Send email] — Day 5 (upgrade prompt)
  Subject: "The Weekly Brief is ready for you, Operator #{{operator_number}}."
  Body: what paid tier unlocks + upgrade link (Stripe checkout)
```

---

## SCENARIO 4: PREMIUM WELCOME
Trigger: Webhook POST from /api/webhooks/stripe → Make.com webhook URL in MAKE_PAID_WEBHOOK

```
[Webhook trigger]
  ↓
[Supabase: Search rows] — get subscriber by stripe_customer_id
  ↓
[Resend: Send email]
  Subject: "Your Weekly Brief is unlocked, Operator #{{operator_number}}."
  Body: premium welcome + first brief link
```

---

## SCENARIO 5: BEEHIIV → SUPABASE SYNC
Trigger: Beehiiv webhook (post.published) → Make.com webhook receiver

```
[Webhook trigger — Beehiiv post.published]
  ↓
[HTTP module: POST /api/webhooks/beehiiv]
  Forward full payload to Next.js route for processing + Supabase upsert
```

Note: The actual processing (HTML sanitize, excerpt gen, Supabase write) happens in the Next.js API route. Make.com is just the relay — this keeps logic in code, not the automation UI.

---

## SCENARIO 6: SOCIAL DISTRIBUTION
Trigger: Webhook from /api/webhooks/beehiiv on successful Supabase insert

```
[Webhook trigger]
  ↓
[Filter] — only if content_type = 'issue' (not shorts)
  ↓
[Twitter/X module: Create tweet]
  Text: "{{title}}

{{excerpt_truncated_200}}

→ https://thelanterndaily.com/issues/{{slug}}

#MuslimTech #AIoperators"

[LinkedIn module: Create share]
  Text: "{{title}}

{{excerpt}}

For serious Muslim operators building in production.

→ https://thelanterndaily.com/issues/{{slug}}"
```

---

## MAKE.COM CREDENTIALS TO CONFIGURE

| Service | Module | Credential needed |
|---|---|---|
| Supabase | Supabase module | Project URL + Service Role Key |
| Groq | HTTP (custom) | API key in Authorization header |
| Resend | HTTP (custom) | API key in Authorization header |
| Telegram | Telegram Bot | Bot token + Ro's chat ID |
| Twilio | Twilio module | Account SID + Auth Token + phone number |
| Stripe | (webhooks handled in Next.js) | — |
| Beehiiv | Webhook receiver only | — |
| Twitter/X | Twitter module | OAuth app credentials |
| LinkedIn | LinkedIn module | Company page OAuth |

---

## ENVIRONMENT VARIABLES FOR MAKE.COM SCENARIOS

Store these in Make.com Data Stores or scenario variables:
- GROQ_API_KEY
- RESEND_API_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- RO_TELEGRAM_CHAT_ID
- RO_EMAIL
- RO_PHONE_NUMBER
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_NUMBER
- ADMIN_KEY
- NEXT_PUBLIC_SITE_URL

---

## BUILD ORDER

1. Scenario 1 (Content Radar) — highest value, runs independently
2. Scenario 3 (Welcome Sequence) — needed for any subscribe
3. Scenario 4 (Premium Welcome) — needed for any paid conversion
4. Scenario 5 (Beehiiv Sync) — needed for website to show content
5. Scenario 2 (Approval Digest) — needed once content is flowing
6. Scenario 6 (Social) — last, after content is proven

---

## DEFINITION OF DONE

- [ ] Content Radar pulls RSS every 6 hours, scores with Groq, inserts to Supabase
- [ ] Approval digest sends at 2pm MST to Telegram + email + SMS
- [ ] Approve/reject links update Supabase correctly
- [ ] Welcome sequence sends Day 0, Day 2, Day 5
- [ ] Premium welcome sends on Stripe paid conversion
- [ ] Beehiiv → Supabase sync triggers on publish
- [ ] Social posts fire on new issue publish
