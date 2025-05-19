import db from "@/db";
import { apiTable, plansTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import env from "@/lib/env";

const router = Router();

const reqParams = z.object({
  userId: z.string(),
  storageLimit: z.number().optional(),
  storageLimitUnit: z.enum(["Mb", "Gb"]).optional(),
});

router.post("/generate-api-key", async (req, res) => {
  const { data, error } = reqParams.safeParse(req.params);

  if (error) {
    res.status(400).json({
      success: false,
      error,
    });

    return;
  }

  const userPlan = await db.query.plansTable.findFirst({
    where: eq(plansTable.userId, data.userId),
  });

  if (!userPlan || !userPlan.id) {
    res.status(404).json({
      success: false,
      error: "Invalid request - user does not have a plan",
    });

    return;
  }

  const apiKey = jwt.sign(
    {
      userId: data.userId,
    },
    env.JWT_SECRET
  );

  await db.insert(apiTable).values({
    userId: data.userId,
    accessKey: apiKey,
    storageLimit: data.storageLimit,
    storageLimitUnit: data.storageLimitUnit,
    availableStorage: data.storageLimit,
    availableStorageUnit: data.storageLimitUnit,
  });

  res.status(200).json({
    success: true,
    key: apiKey,
  });
});

export default router;
