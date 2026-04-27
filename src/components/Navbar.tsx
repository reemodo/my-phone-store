"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu } from 'lucide-react'; // Removed the X icon
import { useCartStore } from '@/src/store/cartStore';
import CartDrawer from './CartDrawer';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

 
  
  // This hook detects if the user clicks outside the navbar to close the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    // Listen for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 2. Get the total items from Zustand
  const totalItems = useCartStore((state) => state.totalItems());
  const openDrawers = useCartStore((state) => state.openDrawer);
  
  // 3. Hydration fix (prevents Next.js errors when loading saved carts)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    }, []);
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
   
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto w-full">
        
        {/* Your New Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-black">
      
  
  <div className="flex flex-col leading-none font-outfit ">
    <div className="flex items-center gap-1">
      <span className="text-2xl font-bold tracking-tighter text-laqta ">Laqta</span>
      {/* The Blue Circle replacing the sparkles */}
      <span className="w-2 h-2 rounded-full bg-laqta mt-1 animate-pulse" />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 pl-0.5">
      Shop
    </span>
  </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link href="/products?category=New Phones" className="hover:text-black transition">New Phones</Link>
          <Link href="/products?category=Used Phones" className="hover:text-black transition">Used Phones</Link>
          <Link href="/products?category=Accessories" className="hover:text-black transition">Accessories</Link>
        </div>


 

     {/* Right Section: Cart & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          
          <button 
            onClick={openDrawers}
            className="relative p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ShoppingCart className="w-6 h-6 text-black" />
            
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-laqta text-[10px] font-bold text-white shadow-sm animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Button (Always the Menu icon now) */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu (Now a floating card instead of full width) */}
      {isOpen && (
        <div className="md:hidden absolute top-16 right-4 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 transition-all z-50">
          <div className="flex flex-col text-base font-medium text-gray-700">
            <Link 
              href="/products?category=Used" 
              className="px-5 py-3 hover:bg-blue-50 hover:text-laqta transition block"
              onClick={() => setIsOpen(false)}
            >
              Used Phones
            </Link>
            <Link 
              href="/products?category=New" 
              className="px-5 py-3 hover:bg-blue-50 hover:text-laqta transition block"
              onClick={() => setIsOpen(false)}
            >
              New Phones
            </Link>
            <Link 
              href="/products?category=Accessories" 
              className="px-5 py-3 hover:bg-blue-50 hover:text-laqta transition block"
              onClick={() => setIsOpen(false)}
            >
              Accessories
            </Link>
          </div>
        </div>
      )}
    </nav>
    <CartDrawer />
    </header>
    
  );
}