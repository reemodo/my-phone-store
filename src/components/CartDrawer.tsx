"use client";

import { useCartStore } from "@/src/store/cartStore"; 
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isDrawerOpen) return null;

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* 1. THE INVISIBLE OVERLAY */}
      <div 
        className="fixed inset-0 z-40"
        onClick={closeDrawer} 
      />

      {/* 2. THE FLOATING DROPDOWN BOX 
          - w-[90vw]: Takes up 90% of the screen on tiny mobile phones
          - md:w-[25vw]: Forces it to be EXACTLY 1/4 (25%) of the screen on desktop
      */}
      <div className="fixed top-20 right-4 w-[90vw] md:w-[25vw] bg-white shadow-2xl z-50 rounded-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
          <h2 className="text-lg font-bold text-black flex items-center gap-2 font-outfit">
            <ShoppingBag size={18} /> My Cart
          </h2>
          <button onClick={closeDrawer} className="p-1.5 hover:bg-gray-200 rounded-full transition">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Item List */}
        <div className="max-h-[50vh] overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8 text-sm">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="relative w-16 h-16 bg-[#fbfbfd] rounded-lg flex-shrink-0 p-1 border border-gray-50">
                  <Image src={item.imageUrl || "/media/hero-phone.jpg"} alt={item.name} fill className="object-contain" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-bold text-black truncate font-outfit">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                  <p className="text-sm font-extrabold text-black mt-0.5">₪{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500 font-medium">Subtotal</span>
              <span className="text-lg font-extrabold text-black font-outfit">₪{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <Link 
                href="/checkout" 
                onClick={closeDrawer}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm text-center hover:bg-blue-700 transition shadow-sm"
              >
                Checkout
              </Link>
              <Link 
                href="/cart" 
                onClick={closeDrawer}
                className="w-full bg-white text-black border border-gray-200 py-2.5 rounded-xl font-bold text-sm text-center hover:bg-gray-50 transition"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}