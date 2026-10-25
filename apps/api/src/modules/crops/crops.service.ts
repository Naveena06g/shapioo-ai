// import { prisma } from "../../lib/prisma.js";
// import { AppError } from "../../middleware/error.js";

// export async function getMyCrops(farmerId: string) {
//   return prisma.cropListing.findMany({ where: { farmerId } });
// }

// // export async function createCrop(farmerId: string, input: any) {
// //   return prisma.cropListing.create({
// //     data: {
// //       farmerId,
// //       name: input.name,
// //       variety: input.variety,
// //       qty: input.qty,
// //       unit: input.unit || "kg",
// //       price: input.price,
// //       moq: input.moq,
// //       grade: input.grade,
// //       location: input.location,
// //       harvestDate: new Date(input.harvestDate),
// //       active: true,
// //     },
// //   });
// // }

// export async function getAllCrops() {
//   return prisma.cropListing.findMany({ where: { active: true }, include: { farmer: { select: { name: true } } } });
// }

// export async function createCrop(farmerId: string, input: any) {
//   return prisma.cropListing.create({
//     data: {
//       farmerId,
//       name: input.name,
//       variety: input.variety,
//       qty: input.qty,
//       unit: input.unit || "kg",
//       price: input.price,
//       moq: input.moq,
//       grade: input.grade,
//       location: input.location,
//       harvestDate: new Date(input.harvestDate),
//       imageUrl: input.imageUrl || null, // <--- ADD THIS
//       active: true,
//     },
//   });
// }

import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

export async function getMyCrops(farmerId: string) {
  return prisma.cropListing.findMany({ where: { farmerId } });
}

export async function getAllCrops() {
  return prisma.cropListing.findMany({ 
    where: { active: true }, 
    include: { farmer: { select: { name: true } } } 
  });
}

export async function createCrop(farmerId: string, input: any) {
  return prisma.cropListing.create({
    data: {
      farmerId,
      name: input.name,
      variety: input.variety,
      qty: input.qty,
      unit: input.unit || "kg",
      price: input.price,
      moq: input.moq,
      grade: input.grade,
      location: input.location,
      harvestDate: new Date(input.harvestDate),
      imageUrl: input.imageUrl || null,
      active: true,
    },
  });
}

// Add this new function for the Deactivate/Activate button
export async function toggleCropStatus(farmerId: string, cropId: string) {
  const crop = await prisma.cropListing.findUnique({ where: { id: cropId } });
  
  if (!crop || crop.farmerId !== farmerId) {
    throw new AppError(404, "Crop not found");
  }

  return prisma.cropListing.update({
    where: { id: cropId },
    data: { active: !crop.active },
  });
}