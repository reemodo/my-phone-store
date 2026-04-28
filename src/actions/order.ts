// src/actions/order.ts
"use server";

import prisma from "@/src/lib/prisma";

export async function createOrder(cartItems: any[], formData: any) {
  try {
    // 1. Recalculate the total securely on the server
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 2. Create the order and the order items in one Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
    const newOrder = await prisma.order.create({
      data: {
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerPhone: formData.phone,
          totalAmount: total,
          status: "PENDING",
          city: formData.city,             // إضافة المدينة
          street: formData.street,         // إضافة الشارع
          locationUrl: formData.locationUrl, // رابط الخرائط
          items: {
            create: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
        },
      },
    });
   for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity, 
            },
          },
        });
      }

      return newOrder;
    });

    return { success: true, orderId: result.id };
  } catch (error) {
    console.error("Order creation error:", error);
    return { success: false, message: "Failed to place order." };
  }
}