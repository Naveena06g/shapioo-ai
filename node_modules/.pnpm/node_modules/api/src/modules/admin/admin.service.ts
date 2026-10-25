import { prisma } from "../../lib/prisma.js";

export async function getPendingVerifications() {
  // Find all users who are shopkeepers or farmers and haven't been verified yet
  return prisma.user.findMany({
    where: {
      role: { in: ["shop", "farmer"] },
      verification: { is: null } // Or check if status is pending
    },
    select: {
      id: true,
      name: true,
      phone: true,
      role: true,
      createdAt: true,
    }
  });
}

export async function approveVerification(userId: string) {
  // Mark the user as verified
  return prisma.user.update({
    where: { id: userId },
    data: {
      verification: {
        create: { status: "approved" }
      }
    }
  });
}