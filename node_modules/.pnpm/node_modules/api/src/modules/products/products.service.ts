import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

async function getMyShop(ownerId: string) {
  const shop = await prisma.shop.findUnique({ where: { ownerId } });
  if (!shop) throw new AppError(404, "You must create a shop first");
  return shop;
}

export async function addProduct(ownerId: string, input: any) {
  const shop = await getMyShop(ownerId);
  return prisma.product.create({
    data: {
      shopId: shop.id,
      name: input.name,
      category: input.category,
      price: input.price,
      unit: input.unit,
      stock: input.stock,
    },
  });
}

export async function updateProduct(ownerId: string, productId: string, input: any) {
  const shop = await getMyShop(ownerId);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  
  if (!product || product.shopId !== shop.id) {
    throw new AppError(404, "Product not found in your shop");
  }
  
  return prisma.product.update({
    where: { id: productId },
    data: {
      name: input.name,
      price: input.price,
      stock: input.stock,
      active: input.active,
    },
  });
}

export async function deleteProduct(ownerId: string, productId: string) {
  const shop = await getMyShop(ownerId);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  
  if (!product || product.shopId !== shop.id) {
    throw new AppError(404, "Product not found in your shop");
  }
  
  // Soft delete
  return prisma.product.update({
    where: { id: productId },
    data: { active: false },
  });
}