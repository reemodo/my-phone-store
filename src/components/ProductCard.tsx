"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/src/store/cartStore";
import { ShoppingCart } from "lucide-react";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  condition: string | null;
  imageUrl: string | null;
  category: string;
  stock: number; // 1. Added stock to your type
};

export default function ProductCard({ product }: { product: ProductProps }) {
  const addItem = useCartStore((state) => state.addItem);
  
  // 2. Check if stock is zero
  const isSoldOut = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSoldOut) return; // Guard clause
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <Link 
      href={`/products/${product.id}`} 
      className={`group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 ${
        isSoldOut ? "opacity-75 grayscale-[0.5]" : "hover:shadow-2xl hover:-translate-y-1"
      }`}
    >
      
      <div className="relative w-full h-64 bg-[#fbfbfd] p-6 flex items-center justify-center">
        <Image 
          src={product.imageUrl || "/media/hero-phone.jpg"} 
          alt={product.name}
          fill
          className={`object-contain p-4 transition-transform duration-500 ${!isSoldOut && "group-hover:scale-105"}`}
        />
        
        {/* 3. Condition Badge or Sold Out Badge */}
        {isSoldOut ? (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md z-20">
            SOLD OUT
          </span>
        ) : (
          product.condition && (
            <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full shadow-sm text-gray-700">
              {product.condition}
            </span>
          )
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-black font-outfit mb-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-black">
            ₪{Number(product.price).toFixed(2)}
          </span>
          
          {/* 4. Conditional Button State */}
          <button 
            disabled={isSoldOut}
            onClick={handleAddToCart}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-colors z-10 relative ${
              isSoldOut 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "text-laqta bg-blue-50 hover:bg-laqta hover:text-white"
            }`}
          >
            <ShoppingCart size={16} />
            {isSoldOut ? "Out of Stock" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}