import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, Watch, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. APPLE-STimport Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, Watch, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. FULL BACKGROUND HERO SECTION */}
      <section className="relative w-full h-[600px] flex items-center justify-center text-center px-4 overflow-hidden border-b">
        
        {/* The Background Image */}
        <Image 
          src="/media/hero-phone.jpg" 
          alt="Laqta Shop Premium Phones" 
          fill
          className="object-cover object-center z-0"
          priority
        />

        {/* Dark Overlay (makes the white text easy to read) */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* The Text Content (Sits on top of the image) */}
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
            The Best Deals. <br className="hidden md:block" />
            No Compromise.
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow">
            Premium new and certified used tech. Backed by quality, delivered to you.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link 
              href="/products" 
              className="bg-laqta text-white px-8 py-3 rounded-full font-semibold hover:bg-laqta-light transition flex items-center gap-2 shadow-lg"
            >
              Shop All Devices <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/products?category=Used" 
              className="text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition backdrop-blur-sm"
            >
              Browse Used Phones
            </Link>
          </div>
        </div>
      </section>

       {/* ... your category cards ... */}

      {/* 2. CATEGORY CARDS SECTION (Refined Hover Interactions) */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-black tracking-tight font-outfit">Explore Categories</h2>
          <p className="text-gray-500 mt-3 text-lg">Find exactly what you are looking for.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Smartphones */}
          <Link href="/products?category=Phones" className="group relative bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-6 text-center cursor-pointer">
            
            {/* REFINED ICON CONTAINER:
              - Removed initial bg-blue-50 and shadow-sm.
              - Added a subtle grey border that turns blue on hover.
              - Added a 'ring' (outline box shadow) that appears on hover.
            */}
            <div className="relative p-5 bg-white border border-gray-100 text-black rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-laqta group-hover:border-laqta group-hover:ring-2 group-hover:ring-laqta/20 group-hover:ring-offset-2">
              <Smartphone className="w-10 h-10" strokeWidth={1.5} />
            </div>
            
            {/* Text Content */}
            <div className="relative z-10">
              <h3 className="font-bold text-2xl text-black mb-2 group-hover:text-laqta transition-colors">Smartphones</h3>
              <p className="text-gray-500 text-sm">New & Pre-owned Apple & Samsung</p>
            </div>
          </Link>
          
          {/* Card 2: Watches */}
          <Link href="/products?category=Watches" className="group relative bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-6 text-center cursor-pointer">
            
            <div className="relative p-5 bg-white border border-gray-100 text-black rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-laqta group-hover:border-laqta group-hover:ring-2 group-hover:ring-laqta/20 group-hover:ring-offset-2">
              <Watch className="w-10 h-10" strokeWidth={1.5} />
            </div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-2xl text-black mb-2 group-hover:text-laqta transition-colors">Smartwatches</h3>
              <p className="text-gray-500 text-sm">Apple Watch Series & Ultra</p>
            </div>
          </Link>

          {/* Card 3: Audio */}
          <Link href="/products?category=Audio" className="group relative bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-6 text-center cursor-pointer">
            
            <div className="relative p-5 bg-white border border-gray-100 text-black rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-laqta group-hover:border-laqta group-hover:ring-2 group-hover:ring-laqta/20 group-hover:ring-offset-2">
              <Headphones className="w-10 h-10" strokeWidth={1.5} />
            </div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-2xl text-black mb-2 group-hover:text-laqta transition-colors">Premium Audio</h3>
              <p className="text-gray-500 text-sm">AirPods Pro & Max</p>
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}