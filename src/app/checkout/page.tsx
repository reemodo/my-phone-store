"use client";

import { useCartStore } from "@/src/store/cartStore";
import { useState, useEffect } from "react";
import { CheckCircle, Loader2, MapPin } from "lucide-react";
import Link from "next/link";
import { createOrder } from "@/src/actions/order";
import toast from "react-hot-toast";


export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
 const [city, setCity] = useState("");
const [street, setStreet] = useState("");
const [isLocating, setIsLocating] = useState(false);
const [locationUrl, setLocationUrl] = useState("");


  useEffect(() => {
    setMounted(true);
   }
 
  , []);

  const cartTotal = items.reduce((total: number, item) => total + (Number(item.price) * Number(item.quantity)), 0);

  // Handle the handle Get Location 
  const handleGetLocation = () => {
  setIsLocating(true);
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationUrl(`https://www.google.com/maps?q=${latitude},${longitude}`);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            // استخراج أفضل مسمى للمدينة والشارع
            const detectedCity = data.address.city || data.address.town || data.address.village || "";
            const detectedStreet = data.address.road || data.address.suburb || data.address.neighbourhood || "";

            // تحديث الـ State (سيظهر النص فوراً في الإنبوت)
            setCity(detectedCity);
            setStreet(detectedStreet);
            
             toast.success('تم تحديث موقعك بنجاح!', {
          duration: 3000,
          icon: '📍',
          style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
          }
        } catch (error) {
          toast.error('تعذر الوصول للموقع. يرجى تفعيل الـ GPS وإعطاء الإذن.', {
          duration: 4000,
          style: { borderRadius: '10px', background: '#b91c1c', color: '#fff' },
        });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        toast.error('متصفحك لا يدعم تحديد الموقع الجغرافي.');
        setIsLocating(false);
      }
    );
  }
};

  // Handle the real order submission
  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    // 1. Grab data directly from the form inputs using their 'name' attributes
    const formData = new FormData(e.currentTarget);
    const orderData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      street: formData.get("street"),
      locationUrl: locationUrl,
    };

    // 2. Send data to the Server Action
    const result = await createOrder(items, orderData);



    // 3. Handle the response
    if (result.success) {
      clearCart();
      setIsSuccess(true);
    } else {
      toast.error('Something went wrong. Please try again.');
      
    }
  };

  if (!mounted) return null;

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-4 text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-4xl font-extrabold text-black font-outfit mb-4">Order Received!</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Thank you for shopping at Laqta Shop. We have received your order and it is pending manager approval.
        </p>
        <Link href="/products" className="bg-laqta text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // CHECKOUT FORM
  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-12 pb-24 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Delivery Details Form */}
        <div className="flex-grow">
          <h1 className="text-3xl font-extrabold text-black font-outfit mb-8">Checkout</h1>
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-black mb-4">Delivery Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input required name="firstName"  type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-laqta outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input required name="lastName" type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-laqta outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input required name="phone" type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-laqta outline-none" placeholder="05X-XXXXXXX" />
            </div>

            
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h2 className="text-lg font-bold text-black mb-4">Address Information</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                 <input 
      required 
      name="city" 
      type="text" 
      value={city} 
      onChange={(e) => setCity(e.target.value)} 
      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-laqta outline-none" 
    />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Street / Neighborhood</label>
                  <input 
      required 
      name="street" 
      type="text" 
      value={street} 
      onChange={(e) => setStreet(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-laqta outline-none" 
    />
                </div>
              </div>
            <div className="space-y-2 mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-3">For faster delivery, share your exact GPS location with the driver.</p>
                <button 
                  type="button" 
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    locationUrl ? "bg-green-100 text-green-700 border border-green-300" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {isLocating ?( <><Loader2 className="animate-spin w-5 h-5" /> <span>جاري تحديد موقعك...</span> </>): <MapPin className="w-5 h-5" />}
                  {locationUrl ? (<span>{locationUrl ? "تحديث الموقع الحالي" : "تحديد موقعي التلقائي"}</span>) : "Share Current Location"}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Order Notes</label>
              <textarea  rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-laqta outline-none" placeholder="City, Street, Building, Apartment..."></textarea>
            </div>
          </form>
        </div>
        

        
        {/* Right Side: Simple Summary */}
        <div className="w-full md:w-96 flex-shrink-0">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-black font-outfit mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6 border-b border-gray-100 pb-6 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate pr-4">{item.quantity}x {item.name}</span>
                  <span className="font-medium text-black">₪{(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-black">Total</span>
              <span className="text-2xl font-extrabold text-black">₪{cartTotal.toFixed(2)}</span>
            </div>

            <button type="submit" form="checkout-form" className="w-full bg-green-600 text-white py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl">
              Confirm & Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}