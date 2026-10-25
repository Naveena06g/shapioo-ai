import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

export async function getAllJobs() {
  return prisma.job.findMany({ orderBy: { createdAt: "desc" } });
}

export async function applyForJob(userId: string, jobId: string) {
  const existing = await prisma.jobApplication.findFirst({ where: { jobId, userId } });
  if (existing) throw new AppError(409, "You already applied for this job");
  
  return prisma.jobApplication.create({
    data: { jobId, userId },
  });
}

export async function getMyApplications(userId: string) {
  return prisma.jobApplication.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createJob(input: any) {
  return prisma.job.create({
    data: {
      title: input.title,
      organization: input.organization,
      location: input.location,
      type: input.type,
      category: input.category,
    },
  });
}