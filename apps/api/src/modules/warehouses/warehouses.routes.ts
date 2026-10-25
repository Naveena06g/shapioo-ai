import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./warehouses.service.js";

export const warehousesRouter = Router();

warehousesRouter.get("/", asyncHandler(async (req, res) => {
  res.json(await svc.getWarehouses());
}));

warehousesRouter.get("/bookings", requireAuth, asyncHandler(async (req, res) => {
  res.json(await svc.getMyBookings(req.session.user!.id));
}));

const bookSchema = z.object({
  cropName: z.string().min(2),
  qty: z.number().positive(),
  months: z.number().int().positive(),
  startDate: z.string()
});

warehousesRouter.post("/:id/book", requireAuth, requireRole("farmer", "trader"), validateBody(bookSchema), asyncHandler(async (req, res) => {
  res.status(201).json(await svc.createBooking(req.session.user!.id, req.params.id as string, req.body));
}));