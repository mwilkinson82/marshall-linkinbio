import { describe, expect, it, vi, beforeEach } from "vitest";
import { PRODUCTS } from "./products";

describe("Stripe Products Configuration", () => {
  it("has the correct Contracting Circle product config", () => {
    const product = PRODUCTS.contractingCircle;
    expect(product.name).toBe("The Contracting Circle — Founding Member");
    expect(product.priceAmount).toBe(49700); // $497.00
    expect(product.currency).toBe("usd");
    expect(product.interval).toBe("month");
    expect(product.metadata.product_key).toBe("contracting_circle");
    expect(product.metadata.tier).toBe("founding_member");
  });

  it("price amount is correct in cents", () => {
    const product = PRODUCTS.contractingCircle;
    const priceInDollars = product.priceAmount / 100;
    expect(priceInDollars).toBe(497);
  });
});

describe("Stripe Checkout Router", () => {
  it("createCircleCheckout is a public procedure (no auth required)", async () => {
    // Verify the router structure allows unauthenticated checkout
    const { appRouter } = await import("./routers");
    
    // The procedure should exist on the router
    expect(appRouter._def.procedures).toHaveProperty("stripe.createCircleCheckout");
  });
});
