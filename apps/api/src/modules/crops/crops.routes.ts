import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./crops.service.js";

export const cropsRouter = Router();


const cropSchema = z.object({
  name: z.string().min(2),
  variety: z.string().min(2),
  qty: z.number().positive(),
  unit: z.string().default("kg"),
  price: z.number().positive(),
  moq: z.number().positive(),
  grade: z.string(),
  location: z.string().min(2),
  harvestDate: z.string(),
  imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
});
cropsRouter.get("/", asyncHandler(async (req, res) => {
  res.json(await svc.getAllCrops());
}));

cropsRouter.get("/mine", requireAuth, requireRole("farmer"), asyncHandler(async (req, res) => {
  res.json(await svc.getMyCrops(req.session.user!.id));
}));

cropsRouter.post("/", requireAuth, requireRole("farmer"), validateBody(cropSchema), asyncHandler(async (req, res) => {
  res.status(201).json(await svc.createCrop(req.session.user!.id, req.body));
}));

cropsRouter.patch("/:id/toggle", requireAuth, requireRole("farmer"), asyncHandler(async (req, res) => {
  res.json(await svc.toggleCropStatus(req.session.user!.id, req.params.id));
}));