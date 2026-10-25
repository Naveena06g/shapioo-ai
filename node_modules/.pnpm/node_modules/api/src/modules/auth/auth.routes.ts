import { Router } from "express";
import { registerSchema, loginSchema } from "../../lib/shared.js"; // <--- .js added
import { validateBody } from "../../middleware/validate.js"; // <--- .js added
import { asyncHandler } from "../../middleware/error.js"; // <--- .js added
import * as svc from "./auth.service.js"; // <--- .js added
// ... rest remains the same

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), asyncHandler(async (req, res) => {
  const user = await svc.register(req.body);
  req.session.user = { id: user.id, name: user.name, role: user.role };
  res.status(201).json(user);
}));

authRouter.post("/login", validateBody(loginSchema), asyncHandler(async (req, res) => {
  const user = await svc.login(req.body);
  req.session.user = { id: user.id, name: user.name, role: user.role };
  res.json(user);
}));

authRouter.post("/logout", (req, res) => {
  req.session.destroy(() => res.status(204).end());
});