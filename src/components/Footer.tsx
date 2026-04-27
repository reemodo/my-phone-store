import Link from "next/link";
import { Facebook, Instagram, Twitter, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#fbfbfd] border-t border-gray-200 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex flex-col font-outfit">
              <span className="text-xl font-bold text-laqta italic">Laqta.</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Shop</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your trusted destination for premium smartphones and accessories. We bring you the best deals with no compromise on quality.
            </p>
            <div className="flex gap-4 text-gray-400">
              <Link href="#" className="hover:text-laqta transition"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-laqta transition"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-laqta transition"><Twitter size={20} /></Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-black">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/products?category=Used" className="hover:text-laqta transition">Used iPhones</Link></li>
              <li><Link href="/products?category=New" className="hover:text-laqta transition">New Devices</Link></li>
              <li><Link href="/products?category=Watches" className="hover:text-laqta transition">Apple Watches</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-black">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/shipping" className="hover:text-laqta transition">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-laqta transition">Returns & Warranty</Link></li>
              <li><Link href="/faq" className="hover:text-laqta transition">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-laqta transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-black">Pickup Points</h4>
            <p className="text-sm text-gray-500 mb-2">Check our dynamic pickup slots for university deliveries.</p>
            <Link href="/slots" className="text-sm font-semibold text-laqta hover:underline">
              View Available Slots →
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Laqta Shop. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}