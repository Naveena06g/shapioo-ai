// import { prisma } from "../../lib/prisma.js";
// import { AppError } from "../../middleware/error.js";

// export async function createOffer(traderId: string, cropId: string, input: any) {
//   const crop = await prisma.cropListing.findUnique({ where: { id: cropId } });
//   if (!crop) throw new AppError(404, "Crop not found");
//   if (input.qty > Number(crop.qty)) throw new AppError(400, "Not enough quantity available");

//   return prisma.offer.create({
//     data: {
//       cropId,
//       traderId,
//       qty: input.qty,
//       price: input.price,
//       status: "pending",
//     },
//   });
// }

// export async function getFarmerOffers(farmerId: string) {
//   return prisma.offer.findMany({
//     where: { crop: { farmerId } },
//     include: { crop: true, trader: { select: { name: true, phone: true } } },
//     orderBy: { createdAt: "desc" },
//   });
// }

// export async function updateOfferStatus(farmerId: string, offerId: string, status: "accepted" | "rejected") {
//   const offer = await prisma.offer.findUnique({ where: { id: offerId }, include: { crop: true } });
//   if (!offer || offer.crop.farmerId !== farmerId) throw new AppError(404, "Offer not found");

//   return prisma.offer.update({
//     where: { id: offerId },
//     data: { status },
//   });
// }

// export async function getTraderOffers(traderId: string) {
//   return prisma.offer.findMany({
//     where: { traderId },
//     include: { 
//       crop: { 
//         include: { farmer: { select: { name: true, phone: true } } } 
//       } 
//     },
//     orderBy: { createdAt: "desc" },
//   });
// }

import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

export async function createOffer(traderId: string, cropId: string, input: any) {
  const crop = await prisma.cropListing.findUnique({ where: { id: cropId } });
  if (!crop) throw new AppError(404, "Crop not found");
  if (input.qty > Number(crop.qty)) throw new AppError(400, "Not enough quantity available");

  return prisma.offer.create({
    data: {
      cropId,
      traderId,
      qty: input.qty,
      price: input.price,
      status: "pending",
    },
  });
}

export async function getFarmerOffers(farmerId: string) {
  return prisma.offer.findMany({
    where: { crop: { farmerId } },
    include: { crop: true, trader: { select: { name: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOfferStatus(farmerId: string, offerId: string, status: "accepted" | "rejected") {
  const offer = await prisma.offer.findUnique({ where: { id: offerId }, include: { crop: true } });
  if (!offer || offer.crop.farmerId !== farmerId) throw new AppError(404, "Offer not found");

  return prisma.offer.update({
    where: { id: offerId },
    data: { status },
  });
}

export async function getTraderOffers(traderId: string) {
  return prisma.offer.findMany({
    where: { traderId },
    include: { 
      crop: { 
        include: { farmer: { select: { name: true, phone: true } } } 
      } 
    },
    orderBy: { createdAt: "desc" },
  });
}

// --- NEW FUNCTIONS FOR BULK ORDERS & SIMULATION ---

export async function simulateFarmerReply(offerId: string) {
  const offer = await prisma.offer.findUnique({ where: { id: offerId } });
  if (!offer) throw new AppError(404, "Offer not found");
  
  // 80% chance to accept, 20% chance to reject (for demo purposes)
  const newStatus = Math.random() > 0.2 ? "accepted" : "rejected";
  
  return prisma.offer.update({
    where: { id: offerId },
    data: { status: newStatus }
  });
}

export async function confirmOrder(traderId: string, offerId: string) {
  const offer = await prisma.offer.findUnique({ 
    where: { id: offerId },
    include: { crop: true }
  });
  
  if (!offer || offer.traderId !== traderId) throw new AppError(404, "Offer not found");
  if (offer.status !== "accepted") throw new AppError(400, "Offer must be accepted first");

  return prisma.$transaction(async (tx) => {
    // 1. Mark offer as ordered
    await tx.offer.update({
      where: { id: offerId },
      data: { status: "ordered" }
    });

    // 2. Deduct stock from the crop
    await tx.cropListing.update({
      where: { id: offer.cropId },
      data: { qty: { decrement: offer.qty } }
    });

    // 3. Create the Bulk Order
    return tx.bulkOrder.create({
      data: {
        cropName: offer.crop.name,
        qty: offer.qty,
        price: offer.price,
        traderId: traderId,
        farmerId: offer.crop.farmerId,
        status: "confirmed"
      }
    });
  });
}

export async function getMyBulkOrders(traderId: string) {
  return prisma.bulkOrder.findMany({
    where: { traderId },
    orderBy: { createdAt: "desc" }
  });
}

export async function counterOffer(farmerId: string, offerId: string, counterPrice: number) {
  const offer = await prisma.offer.findUnique({ where: { id: offerId }, include: { crop: true } });
  if (!offer || offer.crop.farmerId !== farmerId) throw new AppError(404, "Offer not found");

  return prisma.offer.update({
    where: { id: offerId },
    data: { status: "countered", price: counterPrice },
  });
}

export async function getFarmerBulkOrders(farmerId: string) {
  return prisma.bulkOrder.findMany({
    where: { farmerId },
    orderBy: { createdAt: "desc" }
  });
}