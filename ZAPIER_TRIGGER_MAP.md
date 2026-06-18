# THE LANTERN — ZAPIER TRIGGER MAP
Version: 1.0 | 2026-06-13

5 Zaps. Build in order. Test each before enabling.

---

## ZAP 1: RSS SIGNAL INGESTOR
**Direction:** RSS feeds → n8n ingest webhook
**Trigger:** New item in RSS feed (check every 15 min)
**When to use:** Tier 2 newsletter sources that n8n can't poll directly

**Sources to configure as separate Zap steps or multi-step:**
- TLDR AI: `https://tldr.tech/ai/rss`
- Ben's Bites: `https://bensbites.beehiiv.com/feed`
- Latent Space: `https://www.latent.space/feed`
- The Rundown: `https://therundown.ai/rss`

**Action:**
```
Webhooks by Zapier → POST to n8n ingest webhook
Body:
{
  "source": "rss",
  "raw_title": "{{Title}}",
  "raw_url": "{{Link}}",
  "raw_summary": "{{Summary}}",
  "published_at": "{{Published At}}"
}
```

---

## ZAP 2: SOCIAL DISTRIBUTION (post published)
**Direction:** Supabase (post published) → Twitter/X + LinkedIn
**Trigger:** Supabase → New or Updated Row in `posts` table, where `status = 'published'`

**Step 1 — Filter:**
- Only run if `type` is `daily-dispatch` or `weekly-brief`
- Skip if `type = 'short'` (shorts are web-only)

**Step 2 — Twitter/X:**
```
Twitter → Create Tweet
Text:
{{title}}

{{summary_truncated_to_200_chars}}

→ {{web_url}}

#AIoperators #buildinpublic
```
Note: Use `https://thelantern.so/issues/{{slug}}` as web_url

**Step 3 — LinkedIn:**
```
LinkedIn → Create Share Update (Company Page)
Text:
{{title}}

{{summary}}

For AI-native operators building in production.

Read: {{web_url}}
```

---

## ZAP 3: SUBSCRIBER SYNC (Beehiiv → Supabase)
**Direction:** Beehiiv new subscription → Supabase subscribers table
**Trigger:** Beehiiv → New Subscriber

**Action:**
```
Supabase → Create Row in subscribers
email: {{subscriber_email}}
tier: 'free'
beehiiv_id: {{subscriber_id}}
subscribed_at: {{created_at}}
referral_source: {{utm_source}}
```

Note: `operator_number` is auto-assigned by Supabase trigger (see schema.sql)

**Bonus step — Welcome data:**
```
Supabase → Update Row (find by beehiiv_id)
// Store referral source for growth attribution
```

---

## ZAP 4: HITL NOTIFICATION (review needed)
**Direction:** Supabase (needs_review) → Ro iMessage via Robby-Telegram
**Trigger:** Supabase → New or Updated Row in `posts`, where `status = 'needs_review'`

**Action — Webhooks POST to Robby-Telegram n8n endpoint:**
```
POST {{ROBBY_WEBHOOK_URL}}
Body:
{
  "message": "🔴 The Lantern: Review needed\n\n{{title}}\nConfidence: {{content_confidence_score}}\nFlags: {{flags}}\n\nPreview: https://the-lantern-preview.vercel.app/preview/{{id}}\n\nApprove: POST /api/admin/approve/{{id}}\nReject: POST /api/admin/reject/{{id}}"
}
```

Note: Requires `/api/admin/approve/[id]` and `/api/admin/reject/[id]` routes in Next.js (admin-protected).

---

## ZAP 5: CONTACT FORM NOTIFICATION
**Direction:** Supabase (new contact submission) → Ro iMessage via Robby-Telegram
**Trigger:** Supabase → New Row in `contact_submissions`

**Action:**
```
Webhooks → POST to Robby-Telegram
Body:
{
  "message": "📩 The Lantern contact\n\nFrom: {{name}} ({{email}})\nSubject: {{subject}}\n\n{{message}}"
}
```

---

## BEEHIIV WEBHOOKS TO CONFIGURE
(In Beehiiv Dashboard → Settings → Webhooks)

| Event | POST to | Purpose |
|-------|---------|---------|
| `subscriber.created` | Zapier Catch Hook (Zap 3) | Subscriber sync |
| `subscriber.unsubscribed` | n8n webhook | Update subscribers.is_active = false |
| `email.clicked` | n8n webhook | Log affiliate click (affiliate UTM links) |

---

## TWITTER/X ACCOUNT
Recommended handle: **@thelanternhq**
- Create before configuring Zap 2
- Bio: "Weekly intelligence for AI-native operators. By @RedLanternStudios"
- Link: https://thelantern.so (or current domain)

---

## LINKEDIN PAGE
Create a LinkedIn company page for The Lantern before configuring Zap 2.
Or post from the RedLantern Studios company page — operator audience is on both.
