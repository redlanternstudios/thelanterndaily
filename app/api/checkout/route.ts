import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

const ALLOWED_PRICE_IDS = new Set([
  process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
  process.env.STRIPE_PRICE_LIFETIME,
  process.env.STRIPE_SPOTLIGHT_UPGRADE_PRICE_ID,
]);

export async function POST(req: NextRequest) {
  let priceId: string;
  let email: string | undefined;

  try {
    const body = await req.json();
    priceId = body.priceId;
    email = body.email?.trim()?.toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ── Gate: only allow known price IDs ──────────────────────────────────────
  if (!priceId || !ALLOWED_PRICE_IDS.has(priceId)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thelanterndaily.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: priceId === process.env.STRIPE_PRICE_LIFETIME ? "payment" : "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
      ...(email ? { customer_email: email } : {}),
      metadata: {
        priceId,
        source: "lantern-web",
      },
      // Collect billing address for compliance
      billing_address_collection: "auto",
      // Allow promo codes
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
