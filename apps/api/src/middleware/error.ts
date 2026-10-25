import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { env } from "../lib/env.js";

export class AppError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
  }
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message, code: err.code });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Validation failed", issues: err.flatten().fieldErrors });
  }
  console.error("[unhandled]", err);
  res.status(500).json({ error: env.NODE_ENV === "production" ? "Internal error" : String(err) });
}

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };