import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middleware/error.js";

export async function getWarehouses() {
  const warehouses = await prisma.warehouse.findMany();
  // If database is empty, seed them on the fly
  if (warehouses.length === 0) {
    await prisma.warehouse.createMany({
      data: [
        { name: "Kisan Cold Storage", location: "Guntur", capacity: 5000, used: 3200, price: 4, type: "Cold storage" },
        { name: "Sri Sai Godown", location: "Nizamabad", capacity: 12000, used: 5400, price: 2.5, type: "Dry storage" },
        { name: "Deccan Agri Hub", location: "Kurnool", capacity: 8000, used: 7600, price: 3, type: "Ventilated" },
      ]
    });
    return prisma.warehouse.findMany();
  }
  return warehouses;
}

export async function createBooking(farmerId: string, warehouseId: string, input: any) {
  const wh = await prisma.warehouse.findUnique({ where: { id: warehouseId } });
  if (!wh) throw new AppError(404, "Warehouse not found");

  const freeSpace = Number(wh.capacity) - Number(wh.used);
  if (input.qty > freeSpace) throw new AppError(400, `Only ${freeSpace} kg free`);

  return prisma.$transaction(async (tx) => {
    // 1. Deduct capacity
    await tx.warehouse.update({
      where: { id: warehouseId },
      data: { used: { increment: input.qty } }
    });

    // 2. Create booking
    return tx.storageBooking.create({
      data: {
        warehouseId,
        farmerId,
        cropName: input.cropName,
        qty: input.qty,
        months: input.months,
        startDate: new Date(input.startDate),
      }
    });
  });
}

export async function getMyBookings(farmerId: string) {
  return prisma.storageBooking.findMany({
    where: { farmerId },
    include: { warehouse: true },
    orderBy: { createdAt: "desc" }
  });
}