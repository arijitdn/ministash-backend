import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const plansEnum = pgEnum("plansEnum", [
  "free",
  "basic",
  "professional",
  "enterprise",
  "custom",
  "dev-instance",
]);

export const plansTable = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId"),
  plan: plansEnum("plan"),
  createdAt: timestamp("createdAt").defaultNow(),
});
