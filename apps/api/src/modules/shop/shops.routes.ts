import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./shops.service.js";

export const shopsRouter = Router();

const createShopSchema = z.object({
  name: z.string().min(2).max(120),
  type: z.string().min(2).max(60),
  area: z.string().min(2).max(120),
  deliveryFee: z.number().nonnegative(),
  minOrder: z.number().nonnegative(),
});

// Public: Anyone can browse shops
shopsRouter.get("/", asyncHandler(async (req, res) => {
  const query = req.query.q as string | undefined;
  res.json(await svc.listShops(query));
}));

shopsRouter.get("/:id", asyncHandler(async (req, res) => {
  res.json(await svc.getShop(req.params.id));
}));

// Protected: Only users with the 'shop' role can create a shop
shopsRouter.post("/", 
  requireAuth, 
  requireRole("shop"), 
  validateBody(createShopSchema), 
  asyncHandler(async (req, res) => {
    const shop = await svc.createShop(req.session.user!.id, req.body);
    res.status(201).json(shop);
  })
);