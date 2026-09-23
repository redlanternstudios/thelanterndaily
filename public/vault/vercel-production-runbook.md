# How to Use Vercel: The Sovereign Production Deployment Runbook
**The Lantern Daily & RedLantern Studios — Operator Stack Reference**
*Target: Frontend Cloud, Edge Runtimes, and Serverless Infrastructure*

---

## 1. Executive Summary & Architecture
Vercel is the production hosting and edge routing plane for high-performance applications (Next.js, Remix, SvelteKit). In a sovereign Muslim-built AI stack, Vercel acts as the presentation edge—routing requests to regional microservices while terminating TLS and caching static intelligence at the edge.

```
[Global Edge CDN (Anycast)]
       │
       ▼ (Edge Middleware / Auth Gate)
[Next.js 15 Server Components (SSR / ISR)]
       │
       ├──► Supabase / Neon (Direct Data Fetch)
       └──► FastMCP / n8n Private Workflows (Autonomous Webhooks)
```

---

## 2. Step-by-Step Operator Guide: How to Use Vercel

### Step 1: Project Initialization & Git Binding
1. Connect your GitHub repository to your Vercel team (`redlanternstudios`):
   ```bash
   pnpm dlx vercel link
   ```
2. Set root directory and build framework:
   - Framework Preset: **Next.js**
   - Root Directory: `projects/Red-Lantern-Daily/frontend`
   - Build Command: `pnpm build`
   - Output Directory: `.next`

### Step 2: Environment Variable Configuration
Inject required secrets into Vercel via CLI without exposing them in git:
```bash
# Set Supabase connection
pnpm dlx vercel env add NEXT_PUBLIC_SUPABASE_URL production
pnpm dlx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
pnpm dlx vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Set Security & Analytics
pnpm dlx vercel env add ADMIN_KEY production
pnpm dlx vercel env add RESEND_API_KEY production
```

### Step 3: Production Edge Caching & ISR (Incremental Static Regeneration)
To balance instant read speeds with real-time editorial breaking news:
```typescript
// Enable ISR on reader pages (revalidate every 60 seconds)
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### Step 4: Zero-Downtime Deployment & Domain Verification
1. Push to `main` branch to trigger instant Vercel Git Hook deployment.
2. Verify live deployment:
   ```bash
   pnpm dlx vercel inspect https://thelanterndaily.com
   ```
3. Map custom DNS in your registrar:
   - Type: `A` | Name: `@` | Value: `76.76.21.21`
   - Type: `CNAME` | Name: `www` | Value: `cname.vercel-dns.com`

---

## 3. Production vercel.json Template
Save this as `vercel.json` in your repository root:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/cron/morning-briefing",
      "schedule": "0 10 * * *"
    }
  ]
}
```

---
*Verified by The Lantern Daily Operator Stack (https://thelanterndaily.com/stack)*
