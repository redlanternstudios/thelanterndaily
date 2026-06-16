import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key);
}

function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }
  return secret;
}

/**
 * Stripe webhook handler.
 * Events handled:
 *   - checkout.session.completed   → set tier='paid', store stripe_customer_id
 *   - customer.subscription.created → set tier='paid'
 *   - customer.subscription.updated → sync status changes
 *   - customer.subscription.deleted → set tier='free'
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, getWebhookSecret());
  } catch (err) {
    console.error("Stripe webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email || session.customer_details?.email;
      const stripeCustomerId = session.customer as string;

      if (email && stripeCustomerId) {
        console.log(`[stripe webhook] checkout.session.completed: ${email}`);
        const { error } = await supabase
          .from("lantern_subscribers")
          .update({
            stripe_customer_id: stripeCustomerId,
            tier: "paid",
            updated_at: new Date().toISOString(),
          })
          .eq("email", email);

        if (error) {
          console.error("Failed to update subscriber after checkout:", error);
          return NextResponse.json({ error: "Update failed" }, { status: 500 });
        }
      }
      break;
    }

    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId = subscription.customer as string;
      console.log(`[stripe webhook] subscription.created: ${stripeCustomerId}`);

      const { error } = await supabase
        .from("lantern_subscribers")
        .update({ tier: "paid", updated_at: new Date().toISOString() })
        .eq("stripe_customer_id", stripeCustomerId);

      if (error) {
        console.error("Failed to set tier=paid on subscription.created:", error);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId = subscription.customer as string;
      const status = subscription.status;
      const tier = status === "active" || status === "trialing" ? "paid" : "free";

      console.log(`[stripe webhook] subscription.updated: ${stripeCustomerId} \u2192 ${status} \u2192 tier=${tier}`);

      const { error } = await supabase
        .from("lantern_subscribers")
        .update({ tier, updated_at: new Date().toISOString() })
        .eq("stripe_customer_id", stripeCustomerId);

      if (error) {
        console.error("Failed to sync subscription.updated:", error);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId = subscription.customer as string;

      console.log(`[stripe webhook] subscription.deleted: ${stripeCustomerId}`);

      const { error } = await supabase
        .from("lantern_subscribers")
        .update({ tier: "free", updated_at: new Date().toISOString() })
        .eq("stripe_customer_id", stripeCustomerId);

      if (error) {
        console.error("Failed to set tier=free on subscription.deleted:", error);
      }
      break;
    }

    default: {
      console.log(`[stripe webhook] unhandled event type: ${event.type}`);
    }
  }

  return NextResponse.json({ received: true });
}
