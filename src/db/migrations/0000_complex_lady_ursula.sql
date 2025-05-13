CREATE TYPE "public"."storageUnit" AS ENUM('Mb', 'Gb');--> statement-breakpoint
CREATE TABLE "api-keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"accessKey" text NOT NULL,
	"storageLimit" integer DEFAULT 50,
	"storageLimitUnit" "storageUnit" DEFAULT 'Mb',
	"availableStorage" integer DEFAULT 50,
	"availableStorageUnit" "storageUnit" DEFAULT 'Mb',
	"isBlacklisted" boolean DEFAULT false,
	"blacklistReason" text,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "api-keys_accessKey_unique" UNIQUE("accessKey")
);
