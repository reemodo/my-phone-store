"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[], name: string }) {
  // Use the first image as the default main image
  const [activeImage, setActiveImage] = useState(images[0] || "/media/placeholder.jpg");

  return (
    <div className="lg:col-span-7 space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-square w-full bg-[#fbfbfd] rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500">
        <Image 
          src={activeImage} 
          alt={name} 
          fill 
          className="object-contain p-12 transition-opacity duration-300"
          priority 
        />
      </div>

      {/* Interactive Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`relative aspect-square rounded-2xl border-2 overflow-hidden transition-all hover:opacity-80 ${
              activeImage === img ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-100"
            }`}
          >
            <Image 
              src={img} 
              alt={`${name} thumbnail ${i}`} 
              fill 
              className="object-contain p-2" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
