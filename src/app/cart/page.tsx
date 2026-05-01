"use client";

import { useCartStore } from "@/src/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();
  
  // 1. Hydration fix (prevents mismatch errors between server and client)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Calculate the total price
  const cartTotal = items.reduce((total: number, item) => total + (Number(item.price) * item.quantity), 0);

  // 3. Don't render anything until the client has loaded the saved Zustand data
  if (!mounted) return null;

  // 4. What to show if the cart is EMPTY
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-4">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h1 className="text-3xl font-extrabold text-black font-outfit mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added any devices to your cart yet. Let's get you back to the shop!
        </p>
        <Link href="/products" className="bg-laqta text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
          Start Shopping
        </Link>
      </div>
    );
  }

  // 5. What to show if the cart HAS ITEMS
  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-12 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black font-outfit mb-10 tracking-tight">Review your bag.</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDE: The List of Items */}
          <div className="flex-grow space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                
                {/* Product Image */}
                <div className="relative w-32 h-32 bg-gray-50 rounded-2xl p-4 flex-shrink-0">
                  <Image 
                    src={item.imageUrl || "/media/hero-phone.jpg"} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-2"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl font-bold text-black font-outfit">{item.name}</h3>
                  <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>
                </div>

                {/* Price and Delete Button */}
                <div className="flex flex-col items-center sm:items-end gap-4">
                  <span className="text-2xl font-extrabold text-black">
                    ₪{(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-2 text-sm text-red-500 font-semibold hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-start">
              <button 
                onClick={clearCart}
                className="text-gray-400 hover:text-black font-medium text-sm transition underline"
              >
                Empty entire cart
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold text-black font-outfit mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">₪{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-black">Total</span>
                <span className="text-3xl font-extrabold text-black font-outfit">₪{cartTotal.toFixed(2)}</span>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-laqta text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                Checkout <ArrowRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}