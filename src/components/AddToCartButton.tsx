"use client";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      images: product.images,
    });
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
    >
      <ShoppingBag size={20} />
      Add to Cart
    </button>
  );
}
