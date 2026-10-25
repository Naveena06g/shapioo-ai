import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

export async function getCart(userId: string) {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: { include: { shop: true } } },
  });

  // Group by shop for the frontend
  const byShop: Record<string, any> = {};
  for (const item of items) {
    const shopId = item.product.shopId;
    if (!byShop[shopId]) {
      byShop[shopId] = { shop: item.product.shop, items: [], subtotal: 0 };
    }
    const lineTotal = Number(item.product.price) * item.qty;
    byShop[shopId].subtotal += lineTotal;
    byShop[shopId].items.push({ ...item, lineTotal });
  }
  return Object.values(byShop);
}

export async function updateCart(userId: string, productId: string, qty: number) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.active) throw new AppError(404, "Product not found");
  if (qty > product.stock) throw new AppError(400, `Only ${product.stock} in stock`);

  if (qty <= 0) {
    await prisma.cartItem.deleteMany({ where: { userId, productId } });
    return { removed: true };
  }

  return prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: { qty },
    create: { userId, productId, qty },
  });
}