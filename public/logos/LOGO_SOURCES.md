# Logo Status — Operator Stack

**Delivered: 15 SVG files in `public/logos/`**

## Real Brand SVGs (8)
| File | Source |
|---|---|
| `aws.svg` | Wikimedia Commons (Amazon Web Services Logo) |
| `azure.svg` | Wikimedia Commons (Microsoft Azure) |
| `nvidia.svg` | Wikimedia Commons (Nvidia logo) |
| `openai.svg` | Wikimedia Commons (OpenAI Logo) |
| `mistral.svg` | mistral.ai (favicon) |
| `databricks.svg` | simpleicons.org |
| `retool.svg` | simpleicons.org |
| `supabase.svg` | simpleicons.org |
| `okta.svg` | simpleicons.org |

## Placeholder SVGs (6 — need replacement)
These tools don't have publicly accessible brand SVGs. Minimal dark-background tiles with initials were created instead:

| File | Needs Official SVG |
|---|---|
| `anthropic.svg` | Anthropic brand page (no public SVG link) |
| `pinecone.svg` | Pinecone brand page |
| `langsmith.svg` | LangChain brand page |
| `vercel.svg` | Vercel triangle (simple poly placeholder) |
| `vanta.svg` | Vanta brand page |
| `trustlayer.svg` | TrustLayer brand page |

## Render Treatment
All logos on dark background → apply CSS: `filter: grayscale(1) brightness(1.5)`

## To Replace a Placeholder
1. Download official SVG from tool's brand page
2. Save as `public/logos/[tool-name-lowercase].svg`
3. Ensure it's white/light on transparent (or CSS filter handles it)
