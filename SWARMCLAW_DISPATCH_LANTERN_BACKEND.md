# SWARMCLAW MISSION — THE LANTERN DAILY — BACKEND
Version: 2.0 | Updated: 2026-06-13
Agent: SC-BACKEND
Priority: HIGH
Status: READY — n8n REMOVED. Make.com replaces all automation. Supabase = RLS project (wired).

---

## STACK CORRECTION (v2.0)

n8n is NOT in the stack. Remove all prior n8n references.

Automation layer: Make.com (all scheduled flows, webhooks, notifications)
Supabase: existing RedLantern Studios project — use lantern_ table prefix
Logic: Next.js API routes handle webhooks from Make.com, Stripe, Beehiiv
Content scoring: Groq API called directly from Make.com HTTP module

---

## BLOCKERS — RO MUST DO THESE FIRST

| # | Action | Status |
|---|---|---|
| 1 | Supabase wired to RLS project — env vars in .env.local | ✅ DONE |
| 2 | Beehiiv paid tier active | ✅ DONE |
| 3 | Create Stripe products: "The Lantern Monthly" ($15/mo) + "The Lantern Annual" ($120/yr) | ❌ PENDING |
| 4 | Create Telegram bot via BotFather — get token + Ro's chat ID | ❌ PENDING |
| 5 | Create Twilio account — get phone number + API credentials | ❌ PENDING |
| 6 | Create Make.com account — connect Supabase, Resend, Telegram, Twilio modules | ❌ PENDING |

---

## INSTALL FIRST

```bash
npm install @supabase/supabase-js @supabase/ssr stripe @supabase/auth-helpers-nextjs
```

---

## SUPABASE SCHEMA

All tables prefixed with `lantern_` — shares RLS project with other RedLantern products.

Run in Supabase SQL editor:

```sql
-- SUBSCRIBERS
CREATE TABLE lantern_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  operator_number integer UNIQUE NOT NULL,
  tier text NOT NULL DEFAULT 'free',
  beehiiv_id text,
  stripe_customer_id text,
  stripe_price_id text,
  subscribed_at timestamptz DEFAULT now(),
  upgraded_at timestamptz,
  cancelled_at timestamptz
);

-- ISSUES + SHORTS (unified, separated by content_type)
CREATE TABLE lantern_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text,
  published_at timestamptz,
  tier text NOT NULL DEFAULT 'free',
  content_type text NOT NULL DEFAULT 'issue', -- 'issue' | 'short'
  issue_number integer,
  beehiiv_post_id text,
  created_at timestamptz DEFAULT now()
);

-- CONTENT QUEUE (Content Radar pipeline)
CREATE TABLE lantern_content_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text UNIQUE NOT NULL,
  source text,
  ai_summary text,
  relevance_score integer,
  status text DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  queued_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

-- OPERATOR NUMBER SEQUENCE (race-condition safe)
CREATE SEQUENCE lantern_operator_number_seq START 1;

-- RLS
ALTER TABLE lantern_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lantern_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE lantern_content_queue ENABLE ROW LEVEL SECURITY;

-- Issues: free = public, paid = requires auth + paid tier
CREATE POLICY "lantern_free_issues_public" ON lantern_issues
  FOR SELECT USING (tier = 'free' AND published_at IS NOT NULL);

CREATE POLICY "lantern_paid_issues_subscribers" ON lantern_issues
  FOR SELECT USING (
    tier = 'paid' AND published_at IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM lantern_subscribers
      WHERE email = auth.jwt() ->> 'email' AND tier = 'paid'
    )
  );

-- Subscribers: own row only
CREATE POLICY "lantern_own_subscriber_row" ON lantern_subscribers
  FOR SELECT USING (email = auth.jwt() ->> 'email');

-- Content queue: service role only (Make.com uses service key)
CREATE POLICY "lantern_content_queue_service_only" ON lantern_content_queue
  FOR ALL USING (auth.role() = 'service_role');
```

---

## API ROUTES

### `POST /api/subscribe`
```
Input: { email: string }
Flow:
  1. Validate email format
  2. Check if exists in lantern_subscribers
     → exists: return { operator_number: existing_number }
  3. Call Beehiiv API to create subscriber
  4. Assign operator_number using sequence (race-condition safe):
     SELECT nextval('lantern_operator_number_seq') as num
     INSERT INTO lantern_subscribers (email, operator_number, beehiiv_id)
     VALUES ($email, $num, $beehiiv_id)
  5. Call Make.com webhook (async, fire-and-forget) — triggers welcome sequence
  6. Return { operator_number: number }
  7. Frontend redirects to /confirmed?operator=[zero-padded-4-digits]

PostHog: subscribe_free
Sentry: alert on Supabase write failure
```

### `GET /api/check-tier`
```
Input: Supabase session cookie
Flow: get email from auth → query lantern_subscribers.tier → return { tier }
```

### `POST /api/webhooks/stripe`
```
Input: Stripe webhook event
Flow:
  1. Verify Stripe-Signature header (HMAC)
  2. checkout.session.completed:
     → UPDATE lantern_subscribers SET tier='paid', stripe_customer_id=..., upgraded_at=now()
     → Call Make.com webhook (triggers premium welcome email)
  3. customer.subscription.deleted:
     → UPDATE lantern_subscribers SET tier='free', cancelled_at=now()

Sentry: alert on signature fail, Supabase update fail
PostHog: subscribe_paid on success
```

### `POST /api/webhooks/beehiiv`
```
Input: Beehiiv post.published webhook (sent by Make.com after Beehiiv publishes)
Flow:
  1. Receive: title, slug, content (HTML), tier, beehiiv_post_id, category
  2. Strip and sanitize HTML content
  3. Generate excerpt (first 200 chars, no HTML)
  4. UPSERT lantern_issues on beehiiv_post_id
  5. Return 200
```

### `POST /api/admin/approve/[id]`
```
Auth: service role key check (header X-Admin-Key)
Flow: UPDATE lantern_content_queue SET status='approved', reviewed_at=now() WHERE id=$id
Used by: Make.com approval webhook
```

### `POST /api/admin/reject/[id]`
```
Same as approve but status='rejected'
```

### `GET /api/issues`
```
Input: ?tier=free|paid|all&content_type=issue|short&page=1&limit=12
Flow: query lantern_issues with filters, paginate
Return: { issues, total, page }
Cache: 60s revalidation
```

### `GET /api/issues/[slug]`
```
Flow: query lantern_issues by slug
Return: full issue object
```

### `GET /api/shorts`
```
Input: ?cursor=ISO-timestamp (for infinite scroll)
Flow: query lantern_issues WHERE content_type='short' ORDER BY published_at DESC LIMIT 10
Return: { shorts, next_cursor }
```

### `GET /api/subscriber-count`
```
Flow: SELECT COUNT(*) FROM lantern_subscribers
Return: { count: number }
Cache: 5 min revalidation
```

---

## POSTHOG EVENTS

| Event | Where | Properties |
|---|---|---|
| `lantern_subscribe_free` | /api/subscribe success | { operator_number } |
| `lantern_subscribe_paid` | /api/webhooks/stripe | { operator_number, price_id } |
| `lantern_gate_hit` | Client-side PremiumGate render | { issue_slug } |
| `lantern_upgrade_clicked` | Client-side upgrade CTA | { source_page } |

---

## SENTRY ALERTS

| Alert name | Trigger |
|---|---|
| `lantern.subscribe.write_failed` | Supabase insert fails in /api/subscribe |
| `lantern.stripe.signature_invalid` | Stripe webhook HMAC check fails |
| `lantern.stripe.tier_update_failed` | Supabase tier update fails after payment |

---

## ENV VARS (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_MONTHLY=
STRIPE_PRICE_ANNUAL=
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
MAKE_SUBSCRIBE_WEBHOOK=
MAKE_PAID_WEBHOOK=
ADMIN_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
SENTRY_DSN=
RESEND_API_KEY=
```

---

## DEFINITION OF DONE

- [ ] All lantern_ tables created with correct RLS
- [ ] /api/subscribe assigns unique operator numbers, no race condition
- [ ] /api/webhooks/stripe verifies signature, updates tier
- [ ] /api/webhooks/beehiiv upserts issues to Supabase
- [ ] /api/admin/approve + reject protected and functional
- [ ] PostHog events firing on free + paid subscribe
- [ ] Sentry alerts configured
- [ ] All env vars documented in .env.example
