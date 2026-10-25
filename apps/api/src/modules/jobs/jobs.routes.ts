import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/error.js";
import * as svc from "./jobs.service.js";
import { z } from "zod"; // Add this import at the top
import { validateBody } from "../../middleware/validate.js"; // Add this import


export const jobsRouter = Router();

jobsRouter.get("/", asyncHandler(async (req, res) => {
  res.json(await svc.getAllJobs());
}));

jobsRouter.post("/:id/apply", requireAuth, requireRole("seeker"), asyncHandler(async (req, res) => {
  res.status(201).json(await svc.applyForJob(req.session.user!.id, req.params.id as string));
}));

jobsRouter.get("/mine", requireAuth, requireRole("seeker"), asyncHandler(async (req, res) => {
  res.json(await svc.getMyApplications(req.session.user!.id));
}));


// Add this route:
const jobSchema = z.object({
  title: z.string().min(2),
  organization: z.string().min(2),
  location: z.string().min(2),
  type: z.string().min(2),
  category: z.string().min(2),
});

jobsRouter.post("/", requireAuth, requireRole("admin"), validateBody(jobSchema), asyncHandler(async (req, res) => {
  res.status(201).json(await svc.createJob(req.body));
}));