import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";
import type { RegisterInput, LoginInput } from "../../lib/shared.js";

const BCRYPT_ROUNDS = 12;

export async function register(input: RegisterInput) {
  const exists = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (exists) throw new AppError(409, "Phone already registered");

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
  const user = await prisma.user.create({
    data: { name: input.name, phone: input.phone, role: input.role, passwordHash },
  });
  return { id: user.id, name: user.name, phone: user.phone, role: user.role };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (!user || !user.active) throw new AppError(401, "Invalid credentials");

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw new AppError(401, "Invalid credentials");

  return { id: user.id, name: user.name, phone: user.phone, role: user.role };
}