import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

export async function listShops(query?: string) {
  const where: any = {};
  if (query) {
    where.OR = [
      { name: { contains: query } },
      { type: { contains: query } },
      { area: { contains: query } },
    ];
  }
  return prisma.shop.findMany({
    where,
    orderBy: { name: "asc" },
    include: { products: { where: { active: true }, take: 5 } }, // Preview 5 products
  });
}

// export async function getShop(id: string) {
//   const shop = await prisma.shop.findUnique({
//     where: { id },
//     include: { products: { where: { active: true }, orderBy: { name: "asc" } } },
//   });
//   if (!shop) throw new AppError(404, "Shop not found");
//   return shop;
// }

export async function createShop(ownerId: string, input: any) {
  const exists = await prisma.shop.findUnique({ where: { ownerId } });
  if (exists) throw new AppError(409, "You already own a shop");
  
  return prisma.shop.create({
    data: {
      ownerId,
      name: input.name,
      type: input.type,
      area: input.area,
      deliveryFee: input.deliveryFee,
      minOrder: input.minOrder,
    },
  });
}

export async function getShop(id: string) {
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: { products: { where: { active: true }, orderBy: { name: "asc" } } },
  });
  if (!shop) throw new AppError(404, "Shop not found");
  return shop;
}