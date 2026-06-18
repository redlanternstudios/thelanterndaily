/**
 * Beehiiv API v2 client
 * Docs: https://developers.beehiiv.com/docs
 */

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY!;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID!;
const BASE_URL = "https://api.beehiiv.com/v2";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface BeehiivPost {
  id: string;
  audience: "free" | "premium";
  status: "draft" | "confirmed" | "archived";
  platform: "web" | "email" | "both";
  publish_date: number; // unix timestamp
  displayed_date: number;
  meta_default_title: string;
  meta_default_description: string;
  slug: string;
  subtitle?: string;
  thumbnail_url?: string;
  web_url: string;
  authors?: { name: string; photo_url?: string }[];
  content?: { free?: { web?: string }; premium?: { web?: string } };
  stats?: { opens: number; clicks: number; recipients: number };
}

export interface BeehiivPostsResponse {
  data: BeehiivPost[];
  limit: number;
  page: number;
  total_results: number;
  total_pages: number;
}

export interface BeehiivSubscription {
  id: string;
  email: string;
  status: "active" | "inactive" | "pending" | "validating";
  created: number;
  utm_source?: string;
  utm_medium?: string;
}

// ─── CLIENT ──────────────────────────────────────────────────────────────────

function headers() {
  return {
    Authorization: `Bearer ${BEEHIIV_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/**
 * Fetch published posts for the landing page / archive.
 */
export async function getPosts(options?: {
  limit?: number;
  page?: number;
  audience?: "free" | "premium";
  status?: "draft" | "confirmed" | "archived";
}): Promise<BeehiivPostsResponse> {
  const params = new URLSearchParams({
    limit: String(options?.limit ?? 20),
    page: String(options?.page ?? 1),
    status: options?.status ?? "confirmed",
    ...(options?.audience ? { audience: options.audience } : {}),
    expand: "stats",
  });

  const res = await fetch(
    `${BASE_URL}/publications/${BEEHIIV_PUBLICATION_ID}/posts?${params}`,
    {
      headers: headers(),
      // Revalidate every 5 minutes in Next.js
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(`Beehiiv getPosts failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(slug: string): Promise<BeehiivPost | null> {
  const posts = await getPosts({ limit: 100, status: "confirmed" });
  return posts.data.find((p) => p.slug === slug) ?? null;
}

/**
 * Subscribe an email to the publication.
 */
export async function subscribeEmail(options: {
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referring_site?: string;
}): Promise<{ success: true; subscription: BeehiivSubscription } | { success: false; error: string; alreadySubscribed?: boolean }> {
  const res = await fetch(
    `${BASE_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        email: options.email,
        utm_source: options.utm_source ?? "the-lantern-site",
        utm_medium: options.utm_medium ?? "organic",
        utm_campaign: options.utm_campaign,
        referring_site: options.referring_site ?? "thelantern.com",
        send_welcome_email: true,
      }),
    }
  );

  if (res.status === 201 || res.status === 200) {
    const data = await res.json();
    return { success: true, subscription: data.data };
  }

  if (res.status === 400) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.errors?.[0]?.message ?? "Invalid request";
    const alreadySubscribed = msg.toLowerCase().includes("already");
    return { success: false, error: msg, alreadySubscribed };
  }

  return {
    success: false,
    error: `Beehiiv API error ${res.status}: ${res.statusText}`,
  };
}
