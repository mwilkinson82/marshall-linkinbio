import express, { type Express, type Request, type Response } from "express";
import Stripe from "stripe";
import { stripe } from "./stripe";
import { notifyOwner } from "./_core/notification";

/**
 * Register the Stripe webhook endpoint.
 * MUST be called BEFORE express.json() middleware to preserve raw body for signature verification.
 */
export function registerStripeWebhook(app: Express) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set — webhook endpoint disabled");
    return;
  }

  if (!stripe) {
    console.warn("[Stripe Webhook] Stripe not configured — webhook endpoint disabled");
    return;
  }

  // Use express.raw() for this specific route to preserve the raw body for signature verification
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"] as string;

      let event: Stripe.Event;

      try {
        event = stripe!.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error(`[Stripe Webhook] Signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle test events — required for webhook verification
      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Received event: ${event.type} (${event.id})`);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log(
              `[Stripe Webhook] Checkout completed — session: ${session.id}, customer: ${session.customer}, email: ${session.customer_email}`
            );
            // Notify Marshall of new member
            try {
              await notifyOwner({
                title: "🎉 New Contracting Circle Member!",
                content: `New founding member just subscribed!\n\nEmail: ${session.customer_email || "N/A"}\nName: ${session.metadata?.customer_name || "N/A"}\nSession: ${session.id}\nAmount: $497/mo\n\nWelcome them to the Discord community!`,
              });
            } catch (err) {
              console.warn("[Stripe Webhook] Failed to send owner notification:", err);
            }
            break;
          }

          case "customer.subscription.created": {
            const subscription = event.data.object as Stripe.Subscription;
            console.log(
              `[Stripe Webhook] Subscription created — id: ${subscription.id}, customer: ${subscription.customer}, status: ${subscription.status}`
            );
            break;
          }

          case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription;
            console.log(
              `[Stripe Webhook] Subscription updated — id: ${subscription.id}, status: ${subscription.status}`
            );
            break;
          }

          case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            console.log(
              `[Stripe Webhook] Subscription cancelled — id: ${subscription.id}, customer: ${subscription.customer}`
            );
            // Future: Revoke Discord access, send cancellation email
            break;
          }

          case "invoice.paid": {
            const invoice = event.data.object as Stripe.Invoice;
            console.log(
              `[Stripe Webhook] Invoice paid — id: ${invoice.id}, amount: $${(invoice.amount_paid / 100).toFixed(2)}`
            );
            break;
          }

          case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;
            console.log(
              `[Stripe Webhook] Invoice payment failed — id: ${invoice.id}, customer: ${invoice.customer}`
            );
            // Future: Notify member, retry logic
            break;
          }

          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }
      } catch (err: any) {
        console.error(`[Stripe Webhook] Error processing event ${event.type}: ${err.message}`);
      }

      res.json({ received: true });
    }
  );

  console.log("[Stripe Webhook] Registered at /api/stripe/webhook");
}
