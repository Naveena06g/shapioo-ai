import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/error.js";
import { prisma } from "../../lib/prisma.js";

export const coursesRouter = Router();

// Get all courses + check if user is enrolled
coursesRouter.get("/", requireAuth, asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany();
  
  // If DB is empty, seed it automatically
  if (courses.length === 0) {
    await prisma.course.createMany({
      data: [
        { title: "Digital Shop Management", icon: "🏪", modules: 4 },
        { title: "AI & Computer Skills", icon: "💻", modules: 4 },
        { title: "Digital Marketing", icon: "📣", modules: 4 },
        { title: "Agricultural Digital Services", icon: "🌾", modules: 4 },
      ]
    });
    return res.json(await prisma.course.findMany());
  }

  // Get the user's enrollments
  const enrollments = await prisma.courseEnrollment.findMany({
    where: { userId: req.session.user!.id },
    select: { courseId: true }
  });
  const enrolledIds = enrollments.map(e => e.courseId);

  res.json(courses.map(c => ({ ...c, enrolled: enrolledIds.includes(c.id) })));
}));

// Enroll in a course
coursesRouter.post("/:id/enroll", requireAuth, requireRole("seeker"), asyncHandler(async (req, res) => {
  const enrollment = await prisma.courseEnrollment.create({
    data: {
      userId: req.session.user!.id,
      courseId: req.params.id
    }
  });
  res.status(201).json(enrollment);
}));