"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/src/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { Decimal } from "@prisma/client/runtime/library";

type ProductProps = {
  id: string;
  name: string;
  price: Decimal;
  condition: string | null;
  imageUrl: string | null;
  category: string;
  images: string[];
  stock: number;
};

export default function ProductCard({ product }: { product: ProductProps }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  const isSoldOut = product.stock <= 0;

  // Track scroll position to update active dot
  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigating to product page when clicking "Add"
    if (isSoldOut) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      images: product.images,
    });
  };

  const displayImages = product.images?.length > 0 
    ? product.images 
    : ["/media/hero-phone.jpg"];

  return (
    <Link 
      href={`/products/${product.id}`} 
      className={`group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 ${
        isSoldOut ? "opacity-75 grayscale-[0.5]" : "hover:shadow-2xl hover:-translate-y-1"
      }`}
    >
      {/* Top Section: Image Slider */}
      <div className="relative w-full h-64 bg-[#fbfbfd]  flex items-center justify-center overflow-hidden">
        
        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative w-full h-64 flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayImages.map((img, i) => (
            <div 
              key={i} 
              className="relative min-w-full h-full snap-center flex-shrink-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <Image 
                  src={img} 
                  alt={`${product.name} - ${i}`} 
                  fill 
                  className="object-contain p-4" 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Dots Indicator */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-10 flex gap-1.5 z-20">
            {displayImages.map((_, i) => (
              <div 
                key={i} 
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  activeIndex === i 
                    ? "w-4 bg-blue-600" // Active dot: blue and wide
                    : "w-1.5 bg-gray-300" // Inactive dot: gray and small
                }`} 
              />
            ))}
          </div>
        )}

        {/* Status Badges */}
        {isSoldOut ? (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md z-20">
            SOLD OUT
          </span>
        ) : (
          product.condition && (
            <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full shadow-sm text-gray-700 z-20">
              {product.condition}
            </span>
          )
        )}
      </div>

      {/* Bottom Section: Info */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-black mb-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-black">
            ₪{Number(product.price).toFixed(2)}
          </span>

          <button 
            disabled={isSoldOut}
            onClick={handleAddToCart}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-colors z-10 relative ${
              isSoldOut 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white"
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
