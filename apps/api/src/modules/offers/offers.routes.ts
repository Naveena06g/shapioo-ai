// import { Router } from "express";
// import { z } from "zod";
// import { requireAuth, requireRole } from "../../middleware/auth.js";
// import { validateBody } from "../../middleware/validate.js";
// import { asyncHandler } from "../../middleware/error.js";
// import * as svc from "./offers.service.js";

// export const offersRouter = Router();

// const createSchema = z.object({
//   qty: z.number().positive(),
//   price: z.number().positive(),
// });

// // Trader makes an offer
// offersRouter.post("/:cropId", requireAuth, requireRole("trader"), validateBody(createSchema), asyncHandler(async (req, res) => {
//   res.status(201).json(await svc.createOffer(req.session.user!.id, req.params.cropId, req.body));
// }));

// // Farmer views their offers
// offersRouter.get("/", requireAuth, requireRole("farmer"), asyncHandler(async (req, res) => {
//   res.json(await svc.getFarmerOffers(req.session.user!.id));
// }));

// // Farmer accepts/rejects
// offersRouter.patch("/:id", requireAuth, requireRole("farmer"), asyncHandler(async (req, res) => {
//   const status = req.body.status;
//   if (status !== "accepted" && status !== "rejected") throw new Error("Invalid status");
//   res.json(await svc.updateOfferStatus(req.session.user!.id, req.params.id, status));
// }));

// // Trader views their sent offers
// offersRouter.get("/mine", requireAuth, requireRole("trader"), asyncHandler(async (req, res) => {
//   res.json(await svc.getTraderOffers(req.session.user!.id));
// }));

import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./offers.service.js";
const counterSchema = z.object({ price: z.number().positive() });


export const offersRouter = Router();

const createSchema = z.object({
  qty: z.number().positive(),
  price: z.number().positive(),
});

// --- EXISTING ROUTES ---

// Trader makes an offer
offersRouter.post("/:cropId", requireAuth, requireRole("trader"), validateBody(createSchema), asyncHandler(async (req, res) => {
  res.status(201).json(await svc.createOffer(req.session.user!.id, req.params.cropId, req.body));
}));

// Farmer views their offers
offersRouter.get("/", requireAuth, requireRole("farmer"), asyncHandler(async (req, res) => {
  res.json(await svc.getFarmerOffers(req.session.user!.id));
}));

// Farmer accepts/rejects
offersRouter.patch("/:id", requireAuth, requireRole("farmer"), asyncHandler(async (req, res) => {
  const status = req.body.status;
  if (status !== "accepted" && status !== "rejected") throw new Error("Invalid status");
  res.json(await svc.updateOfferStatus(req.session.user!.id, req.params.id, status));
}));

// Trader views their sent offers
offersRouter.get("/mine", requireAuth, requireRole("trader"), asyncHandler(async (req, res) => {
  res.json(await svc.getTraderOffers(req.session.user!.id));
}));


// --- NEW ROUTES FOR BULK ORDERS & SIMULATION ---

// Trader simulates a farmer reply
offersRouter.post("/:id/simulate", requireAuth, requireRole("trader"), asyncHandler(async (req, res) => {
  res.json(await svc.simulateFarmerReply(req.params.id));
}));

// Trader confirms the accepted offer
offersRouter.post("/:id/confirm", requireAuth, requireRole("trader"), asyncHandler(async (req, res) => {
  res.status(201).json(await svc.confirmOrder(req.session.user!.id, req.params.id));
}));

// Trader views bulk orders
offersRouter.get("/bulk", requireAuth, requireRole("trader"), asyncHandler(async (req, res) => {
  res.json(await svc.getMyBulkOrders(req.session.user!.id));
}));


offersRouter.post("/:id/counter", requireAuth, requireRole("farmer"), validateBody(counterSchema), asyncHandler(async (req, res) => {
  res.json(await svc.counterOffer(req.session.user!.id, req.params.id, req.body.price));
}));

offersRouter.get("/farmer-bulk", requireAuth, requireRole("farmer"), asyncHandler(async (req, res) => {
  res.json(await svc.getFarmerBulkOrders(req.session.user!.id));
}));