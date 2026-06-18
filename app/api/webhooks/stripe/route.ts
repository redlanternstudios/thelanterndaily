import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

// ─── Make.com webhook URLs ─────────────────────────────────────────────────
const MAKE_PAID_WEBHOOK = process.env.MAKE_PAID_WEBHOOK;             // U2
const MAKE_SPOTLIGHT_PAID_WEBHOOK = process.env.MAKE_SPOTLIGHT_PAID_WEBHOOK; // SP2
// Allowed price IDs for the subscribe route
const ALLOWED_PRICE_IDS = new Set([
  process.env.STRIPE_PRICE_MONTHLY,
  process.env.STRIPE_PRICE_ANNUAL,
  process.env.STRIPE_PRICE_LIFETIME,
  process.env.STRIPE_SPOTLIGHT_UPGRADE_PRICE_ID,
]);

// Must use raw body for signature verification
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getUser(
  supabase: ReturnType<typeof createClient>,
  email: string
) {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("email", email.toLowerCase().trim())
    .single();
  return data?.id ?? null;
}

// ─── Notify Make.com with fire-and-forget ──────────────────────────────────
function notifyMake(url: string | undefined, payload: Record<string, unknown>) {
  if (!url) return;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) =>
    console.error("[stripe-webhook] Make.com notify failed:", err)
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient();

  // ── Handle events ──────────────────────────────────────────────────────────
  switch (event.type) {
    // ── Checkout completed (all types: subscription, payment, spotlight) ────
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email =
        session.customer_details?.email ?? session.customer_email;
      const priceId = session.metadata?.priceId;
      const isLifetime = priceId === process.env.STRIPE_PRICE_LIFETIME;
      const isSpotlight =
        priceId === process.env.STRIPE_SPOTLIGHT_UPGRADE_PRICE_ID;

      if (!email) {
        console.warn(
          "[stripe-webhook] checkout.session.completed: no email on session",
          session.id
        );
        break;
      }

      if (isSpotlight) {
        // Mark spotlight as paid
        const operatorNumber = session.metadata?.operatorNumber;
        if (operatorNumber) {
          await supabase
            .from("lantern_user_spotlights")
            .update({
              spotlight_tier: "paid",
              stripe_payment_id: session.payment_intent as string,
              paid_at: new Date().toISOString(),
              paid_amount_usd: session.amount_total
                ? session.amount_total / 100
                : null,
            })
            .eq("user_number", parseInt(operatorNumber, 10));
        }

        // Notify Make.com SP2
        notifyMake(MAKE_SPOTLIGHT_PAID_WEBHOOK, {
          id: session.id,
          customer_email: email,
          payment_intent: session.payment_intent,
          metadata: session.metadata,
        });
        break;
      }

      // ── Subscription or lifetime — grant premium access ──────────────────
      const tier = isLifetime ? "lifetime" : "monthly";
      const expiresAt = isLifetime
        ? null
        : new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString();

      const userId = await getUser(supabase, email);
      const record = {
        email,
        tier,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: (session.subscription as string) ?? null,
        price_id: priceId,
        status: "active" as const,
        expires_at: expiresAt,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (userId) {
        await supabase
          .from("lantern_subscriptions")
          .upsert({ ...record, user_id: userId }, { onConflict: "email" });
      } else {
        await supabase
          .from("lantern_subscriptions")
          .upsert(record, { onConflict: "email" });
      }

      break;
    }

    // ── Subscription created (fires after customer.subscription.created) ────
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const subEmail =
        typeof subscription.customer === "object"
          ? (subscription.customer as Stripe.Customer).email
          : null;

      // Update subscription record
      await supabase
        .from("lantern_subscriptions")
        .update({
          status: "active",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId);

      // Notify Make.com U2
      notifyMake(MAKE_PAID_WEBHOOK, {
        type: "subscription.created",
        customer: {
          id: customerId,
          email: subEmail,
        },
        subscription: {
          id: subscription.id,
          plan: {
            amount: subscription.items.data[0]?.price?.unit_amount ?? 0,
          },
        },
      });

      break;
    }

    // ── Payment intent succeeded ──────────────────────────────────────────
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const productType = pi.metadata?.product_type;

      if (productType === "spotlight_upgrade") {
        // Notify Make.com SP2 directly
        notifyMake(MAKE_SPOTLIGHT_PAID_WEBHOOK, {
          type: "payment_intent.succeeded",
          id: pi.id,
          customer_email: pi.receipt_email ?? pi.metadata?.email,
          metadata: pi.metadata,
          amount: pi.amount / 100,
        });
      }

      break;
    }

    // ── Subscription deleted ──────────────────────────────────────────────
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;

      await supabase
        .from("lantern_subscriptions")
        .update({
          status: "cancelled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId);

      break;
    }

    default:
      console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
