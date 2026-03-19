import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing Manus auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Members table — Contracting Circle members who authenticate via Discord.
 * Links Discord identity to Stripe subscription for access control.
 */
export const members = mysqlTable("members", {
  id: int("id").autoincrement().primaryKey(),
  /** Discord user ID (snowflake) */
  discordId: varchar("discordId", { length: 64 }).notNull().unique(),
  /** Discord username */
  discordUsername: varchar("discordUsername", { length: 128 }),
  /** Discord display name */
  discordDisplayName: text("discordDisplayName"),
  /** Discord avatar hash (construct URL: https://cdn.discordapp.com/avatars/{id}/{hash}.png) */
  discordAvatar: varchar("discordAvatar", { length: 256 }),
  /** Email from Discord */
  email: varchar("email", { length: 320 }),
  /** Stripe customer ID — set when member subscribes */
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  /** Stripe subscription ID — active subscription */
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  /** Subscription status: active, canceled, past_due, trialing, etc. */
  subscriptionStatus: mysqlEnum("subscriptionStatus", [
    "active",
    "canceled",
    "past_due",
    "trialing",
    "incomplete",
    "none",
  ]).default("none").notNull(),
  /** Member role within the circle */
  memberRole: mysqlEnum("memberRole", ["member", "founding_member", "admin"]).default("member").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type InsertMember = typeof members.$inferInsert;
