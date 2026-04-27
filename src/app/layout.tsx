import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar"; // <-- Import your new component
import { Inter, Outfit } from "next/font/google"; // Add Outfit here
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' }); // Initialize it


export const metadata: Metadata = {
  title: "Phone Store",
  description: "Premium new and used smartphones and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Navbar /> {/* <-- Place it above the children (your pages) */}
        <main className="min-h-screen bg-gray-50 flex flex-col">
          <Toaster position="top-center" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}