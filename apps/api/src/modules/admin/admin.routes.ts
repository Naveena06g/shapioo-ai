import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/error.js";
import { prisma } from "../../lib/prisma.js";
import { getPendingVerifications, approveVerification } from "./admin.service.js";


export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

adminRouter.get("/stats", asyncHandler(async (req, res) => {
  const [users, shops, crops, orders] = await Promise.all([
    prisma.user.count(),
    prisma.shop.count(),
    prisma.cropListing.count(),
    prisma.order.count(),
  ]);
  res.json({ users, shops, crops, orders });
}));

adminRouter.get("/verifications", asyncHandler(async (req, res) => {
  res.json(await getPendingVerifications());
}));

adminRouter.post("/verifications/:userId/approve", asyncHandler(async (req, res) => {
  res.json(await approveVerification(req.params.userId as string));
}));