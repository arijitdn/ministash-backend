import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const storageUnit = pgEnum("storageUnit", ["Mb", "Gb"]);

export const apiTable = pgTable("api-keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId").notNull(),
  accessKey: text("accessKey").notNull().unique(),
  storageLimit: integer("storageLimit").default(50),
  storageLimitUnit: storageUnit("storageLimitUnit").default("Mb"),
  availableStorage: integer("availableStorage").default(50),
  availableStorageUnit: storageUnit("availableStorageUnit").default("Mb"),
  isBlacklisted: boolean("isBlacklisted").default(false),
  blacklistReason: text("blacklistReason"),
  createdAt: timestamp("createdAt").defaultNow(),
});
