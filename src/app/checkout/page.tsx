'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Script from 'next/script';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return <div className="min-h-screen bg-[#0C0C0C] text-white p-12">Loading...</div>;
  if (items.length === 0) return <div className="min-h-screen bg-[#0C0C0C] text-white p-12 text-center text-xl mt-24">Your cart is empty. <br/><br/><button onClick={() => router.push('/')} className="text-[#1B7A53] hover:underline">Go back home</button></div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create order ID via Razorpay API
      const res = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: getCartTotal() }),
      });

      if (!res.ok) throw new Error('Failed to initialize payment');
      
      const orderData = await res.json();

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_T6mlMH1qW0sPJd',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Anant Ayurveda',
        description: 'Store Purchase',
        order_id: orderData.id,
        handler: async function (response: any) {
          // 3. On success, verify signature and save to database
          const verifyRes = await fetch('/api/checkout/success', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              items,
              total: getCartTotal(),
              shippingAddress: formData
            }),
          });

          if (verifyRes.ok) {
            alert('Payment Successful and Order Placed!');
            clearCart();
            router.push('/');
          } else {
            alert('Payment verified, but failed to save order to database. Please contact support.');
          }
        },
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          contact: formData.phone,
        },
        theme: {
          color: '#1B7A53',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-7xl mx-auto">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white mb-8">&larr; Back to Store</button>
        
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#1B7A53] mb-12">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Shipping Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#1B7A53] text-white flex items-center justify-center text-sm font-bold">1</span>
                Shipping Address
              </h2>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1B7A53] transition-colors" placeholder="123 Main St, Apt 4B" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1B7A53] transition-colors" placeholder="Mumbai" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1B7A53] transition-colors" placeholder="Maharashtra" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">PIN Code / ZIP</label>
                    <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1B7A53] transition-colors" placeholder="400001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#1B7A53] transition-colors" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 shadow-xl opacity-50 pointer-events-none">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                Payment Method
              </h2>
              <p className="text-gray-400 text-sm">You will securely enter your payment details via Razorpay in the next step.</p>
            </div>

          </motion.div>

          {/* Right Column: Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 shadow-xl sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-200 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-white">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#1B7A53]">Free</span>
                </div>
                <div className="flex justify-between text-xl font-playfair font-bold text-white pt-3 border-t border-white/10 mt-3">
                  <span>Total</span>
                  <span>₹{getCartTotal()}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full mt-8 bg-[#1B7A53] text-white py-4 rounded-xl uppercase tracking-wider font-bold hover:bg-[#166040] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">Secured by Razorpay. 100% encrypted.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
