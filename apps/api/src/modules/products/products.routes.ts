import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./products.service.js";

export const productsRouter = Router();

const productSchema = z.object({
  name: z.string().min(2).max(120),
  category: z.string().min(2).max(60),
  price: z.number().positive(),
  unit: z.string().min(1).max(20),
  stock: z.number().int().nonnegative(),
});

const updateSchema = productSchema.partial().extend({ active: z.boolean().optional() });

// All product management is for shopkeepers only
productsRouter.use(requireAuth, requireRole("shop"));

productsRouter.post("/", validateBody(productSchema), asyncHandler(async (req, res) => {
  const product = await svc.addProduct(req.session.user!.id, req.body);
  res.status(201).json(product);
}));

productsRouter.patch("/:id", validateBody(updateSchema), asyncHandler(async (req, res) => {
  const product = await svc.updateProduct(req.session.user!.id, req.params.id as string, req.body);
  res.json(product);
}));

productsRouter.delete("/:id", asyncHandler(async (req, res) => {
await svc.deleteProduct(req.session.user!.id, req.params.id as string);
  res.status(204).end();
}));