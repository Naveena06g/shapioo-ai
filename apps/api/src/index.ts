import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import rateLimit from "express-rate-limit";
import { env } from "./lib/env.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { shopsRouter } from "./modules/shop/shops.routes.js";
import { productsRouter } from "./modules/products/products.routes.js";
import { cartRouter } from "./modules/cart/cart.routes.js";
import { ordersRouter } from "./modules/orders/orders.routes.js";
import { cropsRouter } from "./modules/crops/crops.routes.js";
import { offersRouter } from "./modules/offers/offers.routes.js";
import { jobsRouter } from "./modules/jobs/jobs.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { alertsRouter } from "./modules/products/alerts.routes.js";
import { warehousesRouter } from "./modules/warehouses/warehouses.routes.js";
import { coursesRouter } from "./modules/courses/courses.routes.js";
// ...



const app = express();
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser(env.SESSION_SECRET));

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 },
}));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many attempts, try again later" },
});

app.get("/api/v1/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.use("/api/v1/auth", authLimiter, authRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1/shops", shopsRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/offers", offersRouter);
// ...
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/warehouses", warehousesRouter);
app.use("/api/v1/courses", coursesRouter);

// ...
app.use("/api/v1/alerts", alertsRouter);

// ...
app.use("/api/v1/crops", cropsRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(env.API_PORT, () => {
  console.log(`🌾 SHOPPIOO API on http://localhost:${env.API_PORT} (${env.NODE_ENV})`);
});