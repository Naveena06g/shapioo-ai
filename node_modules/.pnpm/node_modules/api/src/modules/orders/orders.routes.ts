// import { Router } from "express";
// import { requireAuth, requireRole } from "../../middleware/auth.js";
// import { asyncHandler } from "../../middleware/error.js";
// import * as svc from "./orders.service.js";
// // Add this import at the top:
// // import { requireRole } from "../../middleware/auth.js";

// export const ordersRouter = Router();

// ordersRouter.use(requireAuth, requireRole("customer"));

// ordersRouter.post("/checkout", asyncHandler(async (req, res) => {
//   const order = await svc.placeOrder(req.session.user!.id);
//   res.status(201).json(order);
// }));

// ordersRouter.get("/", asyncHandler(async (req, res) => {
//   res.json(await svc.getMyOrders(req.session.user!.id));
// }));


// // Add this route at the bottom:
// ordersRouter.get("/shop", requireRole("shop"), asyncHandler(async (req, res) => {
//   res.json(await svc.getShopOrders(req.session.user!.id));
// }));

import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./orders.service.js";

export const ordersRouter = Router();

// 1. Customer Checkout
ordersRouter.post(
  "/checkout",
  requireAuth,
  requireRole("customer"),
  asyncHandler(async (req, res) => {
    const order = await svc.placeOrder(req.session.user!.id);
    res.status(201).json(order);
  })
);

// 2. Customer Order History
ordersRouter.get(
  "/",
  requireAuth,
  requireRole("customer"),
  asyncHandler(async (req, res) => {
    res.json(await svc.getMyOrders(req.session.user!.id));
  })
);

// 3. Shopkeeper Incoming Orders
ordersRouter.get(
  "/shop",
  requireAuth,
  requireRole("shop"),
  asyncHandler(async (req, res) => {
    res.json(await svc.getShopOrders(req.session.user!.id));
  })
);