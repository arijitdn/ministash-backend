import env from "@/lib/env";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(env.DATABASE_URL, {
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
