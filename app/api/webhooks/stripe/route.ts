import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

// Must use raw body for signature verification
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getUser(supabase: ReturnType<typeof createClient>, email: string) {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();
  return data?.id ?? null;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient();

  // ── Handle events ──────────────────────────────────────────────────────────
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email ?? session.customer_email;
      const priceId = session.metadata?.priceId;
      const isLifetime = priceId === process.env.STRIPE_PRICE_LIFETIME;
      const isSpotlight = priceId === process.env.STRIPE_SPOTLIGHT_UPGRADE_PRICE_ID;

      if (!email) {
        console.warn("[stripe-webhook] checkout.session.completed: no email on session", session.id);
        break;
      }

      if (isSpotlight) {
        // Mark spotlight as paid — spotlight operator number stored in metadata
        const operatorNumber = session.metadata?.operatorNumber;
        if (operatorNumber) {
          await supabase
            .from("lantern_spotlights")
            .update({ is_paid: true, status: "published" })
            .eq("operator_number", parseInt(operatorNumber, 10));
        }
        break;
      }

      // Subscription or lifetime — grant premium access
      const tier = isLifetime ? "lifetime" : "monthly";
      const expiresAt = isLifetime
        ? null // lifetime = no expiry
        : new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(); // 31 days

      const userId = await getUser(supabase, email);

      if (userId) {
        // Existing user — update subscription record
        await supabase.from("lantern_subscriptions").upsert({
          user_id: userId,
          email,
          tier,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string | null,
          price_id: priceId,
          status: "active",
          expires_at: expiresAt,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: "email" });
      } else {
        // New user — create minimal subscription record (no auth user yet)
        await supabase.from("lantern_subscriptions").upsert({
          email,
          tier,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string | null,
          price_id: priceId,
          status: "active",
          expires_at: expiresAt,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: "email" });
      }

      // Trigger Make.com paid subscriber flow
      const makeWebhook = process.env.MAKE_PAID_WEBHOOK;
      if (makeWebhook) {
        await fetch(makeWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, tier, priceId }),
        }).catch((err) => console.error("[stripe-webhook] Make.com notify failed:", err));
      }

      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;

      await supabase
        .from("lantern_subscriptions")
        .update({ status: "cancelled", updated_at: new Date().toISOString() })
        .eq("stripe_customer_id", customerId);

      break;
    }

    case "payment_intent.succeeded": {
      // Handled via checkout.session.completed for The Lantern — no additional action needed
      break;
    }

    default:
      // Log unhandled events for debugging
      console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
