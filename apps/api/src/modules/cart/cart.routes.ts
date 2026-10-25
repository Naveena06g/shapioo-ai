import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./cart.service.js";

export const cartRouter = Router();

cartRouter.use(requireAuth, requireRole("customer"));

cartRouter.get("/", asyncHandler(async (req, res) => {
  res.json(await svc.getCart(req.session.user!.id));
}));

const updateSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().min(0),
});

cartRouter.post("/update", validateBody(updateSchema), asyncHandler(async (req, res) => {
  res.json(await svc.updateCart(req.session.user!.id, req.body.productId, req.body.qty));
}));