import type { Request, Response, NextFunction } from "express";
import type { Role } from "../lib/shared.js";

declare module "express-session" {
  interface SessionData {
    user: { id: string; name: string; role: Role } | null;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) return res.status(401).json({ error: "Not authenticated" });
  next();
}

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const u = req.session.user;
    if (!u) return res.status(401).json({ error: "Not authenticated" });
    if (!roles.includes(u.role)) return res.status(403).json({ error: `Requires role: ${roles.join(" | ")}` });
    next();
  };
}