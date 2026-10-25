import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

export async function placeOrder(userId: string) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: { include: { shop: true } } },
  });

  if (cartItems.length === 0) throw new AppError(400, "Cart is empty");

  // Group by shop
  const byShop: Record<string, typeof cartItems> = {};
  for (const item of cartItems) {
    const shopId = item.product.shopId;
    if (!byShop[shopId]) byShop[shopId] = [];
    byShop[shopId].push(item);
  }

  return prisma.$transaction(async (tx) => {
    let grandTotal = 0;
   const orderGroups: any[] = [];

    for (const [shopId, items] of Object.entries(byShop)) {
      const shop = items[0].product.shop;
      let subtotal = 0;

      for (const item of items) {
        if (item.qty > item.product.stock) {
          throw new AppError(400, `Insufficient stock for ${item.product.name}`);
        }
        subtotal += Number(item.product.price) * item.qty;

        // Deduct stock safely
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.qty } },
        });
      }

      if (subtotal < Number(shop.minOrder)) {
        throw new AppError(400, `Minimum order for ${shop.name} is ₹${shop.minOrder}`);
      }

      const delivery = Number(shop.deliveryFee);
      grandTotal += (subtotal + delivery);

      orderGroups.push({
        shopId,
        subtotal,
        delivery,
        items: {
          create: items.map(i => ({
            productId: i.productId,
            name: i.product.name,
            price: i.product.price,
            qty: i.qty,
          })),
        },
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        total: grandTotal,
        groups: { create: orderGroups },
      },
      include: { groups: { include: { items: true, shop: true } } },
    });

    // Clear cart
    await tx.cartItem.deleteMany({ where: { userId } });

    return order;
  });
}

export async function getMyOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { groups: { include: { items: true, shop: true } } },
  });
}

export async function getShopOrders(ownerId: string) {
  const shop = await prisma.shop.findUnique({ where: { ownerId } });
  if (!shop) throw new AppError(404, "Shop not found");

  return prisma.orderGroup.findMany({
    where: { shopId: shop.id },
    orderBy: { id: "desc" },
    include: {
      items: true,
      order: { include: { user: { select: { name: true, phone: true } } } }
    },
  });
}