import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/error.js";
import { prisma } from "../../lib/prisma.js";

export const alertsRouter = Router();

alertsRouter.get(
  "/",
  requireAuth,
  requireRole("shop", "admin"),
  asyncHandler(async (req, res) => {
    const user = req.session.user!;
    
    // If Admin, get ALL low stock. If Shop, get only their shop's low stock.
    const whereClause = user.role === "admin" 
      ? { stock: { lte: 5 }, active: true }
      : { stock: { lte: 5 }, active: true, shop: { ownerId: user.id } };

    const lowStock = await prisma.product.findMany({
      where: whereClause,
      include: { shop: { select: { name: true } } },
      orderBy: { stock: "asc" },
    });

    res.json(lowStock);
  })
);