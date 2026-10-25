import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/error.js";

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, asyncHandler(async (req, res) => {
  const u = await prisma.user.findUnique({
    where: { id: req.session.user!.id },
    select: { id: true, name: true, phone: true, role: true, createdAt: true },
  });
  res.json(u);
}));