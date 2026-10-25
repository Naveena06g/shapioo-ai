import { z } from "zod";

export const ROLES = ["customer", "farmer", "shop", "trader", "seeker", "admin"] as const;
export type Role = (typeof ROLES)[number];
export const RoleEnum = z.enum(ROLES);

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: RoleEnum,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;