// src/actions/pickupSlots.ts
"use server";

import prisma from "@/src/lib/prisma";

export async function getAvailablePickupSlots() {
  try {
    const slots = await prisma.pickupSlot.findMany({
      where: {
        // Only get slots where the end time hasn't passed yet
        endTime: {
          gte: new Date(), 
        },
      },
      orderBy: {
        startTime: "asc", // Show the earliest slots first
      },
    });
    
    return slots;
  } catch (error) {
    console.error("Error fetching pickup slots:", error);
    return [];
  }
}