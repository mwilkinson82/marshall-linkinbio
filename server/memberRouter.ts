/**
 * Member-specific tRPC router for the Contracting Circle portal.
 * Uses Discord session (member_session cookie) instead of Manus auth.
 */
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { parseMemberCookie, verifyMemberSession, getMemberById } from "./discord";
import { stripe } from "./stripe";
import type { Member } from "../drizzle/schema";

/**
 * Middleware that extracts the member from the Discord session cookie.
 * Returns null if not authenticated (for public queries).
 */
async function getMemberFromRequest(req: any): Promise<Member | null> {
  const cookie = parseMemberCookie(req);
  const session = await verifyMemberSession(cookie);
  if (!session) return null;
  const member = await getMemberById(session.memberId);
  return member || null;
}

export const memberRouter = router({
  /**
   * Get current member info from Discord session.
   */
  me: publicProcedure.query(async ({ ctx }) => {
    const member = await getMemberFromRequest(ctx.req);
    if (!member) return null;

    const avatarUrl = member.discordAvatar
      ? `https://cdn.discordapp.com/avatars/${member.discordId}/${member.discordAvatar}.png?size=128`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(member.discordId) % 5}.png`;

    return {
      id: member.id,
      discordId: member.discordId,
      discordUsername: member.discordUsername,
      displayName: member.discordDisplayName || member.discordUsername,
      avatarUrl,
      email: member.email,
      subscriptionStatus: member.subscriptionStatus,
      memberRole: member.memberRole,
      createdAt: member.createdAt,
    };
  }),

  /**
   * Get subscription details from Stripe for the current member.
   */
  subscription: publicProcedure.query(async ({ ctx }) => {
    const member = await getMemberFromRequest(ctx.req);
    if (!member) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
    }

    if (!member.stripeSubscriptionId || !stripe) {
      return {
        status: member.subscriptionStatus || "none",
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
        plan: "The Contracting Circle",
        amount: 497_00,
        currency: "usd",
        interval: "month",
      };
    }

    try {
      const sub = await stripe.subscriptions.retrieve(member.stripeSubscriptionId) as any;
      const price = sub.items?.data?.[0]?.price;

      return {
        status: sub.status,
        currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
        cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
        plan: "The Contracting Circle",
        amount: price?.unit_amount || 497_00,
        currency: price?.currency || "usd",
        interval: (price?.recurring?.interval as string) || "month",
      };
    } catch (err) {
      console.warn("[Member] Failed to fetch subscription:", err);
      return {
        status: member.subscriptionStatus || "none",
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
        plan: "The Contracting Circle",
        amount: 497_00,
        currency: "usd",
        interval: "month",
      };
    }
  }),

  /**
   * Get payment history from Stripe for the current member.
   */
  payments: publicProcedure.query(async ({ ctx }) => {
    const member = await getMemberFromRequest(ctx.req);
    if (!member) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
    }

    if (!member.stripeCustomerId || !stripe) {
      return { payments: [] };
    }

    try {
      const charges = await stripe.charges.list({
        customer: member.stripeCustomerId,
        limit: 20,
      });

      return {
        payments: charges.data.map(charge => ({
          id: charge.id,
          amount: charge.amount,
          currency: charge.currency,
          status: charge.status,
          description: charge.description || "The Contracting Circle",
          createdAt: new Date(charge.created * 1000),
          receiptUrl: charge.receipt_url,
        })),
      };
    } catch (err) {
      console.warn("[Member] Failed to fetch payments:", err);
      return { payments: [] };
    }
  }),
});
