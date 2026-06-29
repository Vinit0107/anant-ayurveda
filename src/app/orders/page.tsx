'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';

export default function MyOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders/me');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressWidth = (status: string) => {
    switch (status) {
      case 'PAID': return '25%';
      case 'PROCESSING': return '50%';
      case 'SHIPPED': return '75%';
      case 'DELIVERED': return '100%';
      case 'CANCELLED': return '100%';
      default: return '0%';
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'CANCELLED') return 'bg-red-500';
    if (status === 'DELIVERED') return 'bg-green-500';
    return 'bg-[#1B7A53]';
  };

  if (isLoading) return <div className="min-h-screen bg-[#0C0C0C] text-white p-12 text-center mt-24">Loading Orders...</div>;

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.push('/')} className="text-gray-400 hover:text-white mb-8">&larr; Back to Store</button>
        
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#1B7A53] mb-2">My Orders</h1>
        <p className="text-gray-400 mb-12">Track your recent purchases and delivery status</p>

        {orders.length === 0 ? (
          <div className="bg-[#111111] p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center">
            <Package size={48} className="text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't made any purchases yet.</p>
            <button onClick={() => router.push('/')} className="bg-[#1B7A53] text-white px-6 py-3 rounded-xl uppercase tracking-wider font-semibold hover:bg-[#166040] transition-colors">Start Shopping</button>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111111] rounded-2xl border border-white/5 shadow-xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-[#1A1A1A] p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-mono">ORDER ID: #{order.id.slice(-8)}</p>
                    <p className="text-sm text-gray-300 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500 uppercase">Total Amount</p>
                    <p className="text-lg font-bold text-white">₹{order.total}</p>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-10">
                  
                  {/* Status Tracker */}
                  <div className="relative pt-8">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStatusColor(order.status)} transition-all duration-1000 ease-in-out`}
                        style={{ width: getProgressWidth(order.status) }}
                      />
                    </div>
                    
                    <div className="relative flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#111111] z-10 ${['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? getStatusColor(order.status) : 'bg-gray-800'} text-white`}>
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 mt-3 absolute top-10 w-24 text-center -ml-8">Paid</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#111111] z-10 ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? getStatusColor(order.status) : 'bg-gray-800'} text-white`}>
                          <Clock size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 mt-3 absolute top-10 w-24 text-center -ml-8">Processing</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#111111] z-10 ${['SHIPPED', 'DELIVERED'].includes(order.status) ? getStatusColor(order.status) : 'bg-gray-800'} text-white`}>
                          <Truck size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 mt-3 absolute top-10 w-24 text-center -ml-8">Shipped</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#111111] z-10 ${order.status === 'DELIVERED' ? getStatusColor(order.status) : 'bg-gray-800'} text-white`}>
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 mt-3 absolute top-10 w-24 text-center -ml-8">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Details Alert */}
                  {order.trackingNumber && (
                    <div className="bg-[#1B7A53]/10 border border-[#1B7A53]/30 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center mt-12">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1B7A53]/20 flex items-center justify-center text-[#1B7A53]">
                          <Truck size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Shipped via {order.courier || 'Courier'}</p>
                          <p className="text-xs text-gray-400">Your package is on its way!</p>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-xs text-gray-500 uppercase mb-1">Tracking Number</p>
                        <p className="font-mono text-lg font-bold text-[#1B7A53] bg-black/30 px-3 py-1 rounded">{order.trackingNumber}</p>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="mt-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Items in this order</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex gap-4 items-center bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                          <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white line-clamp-1">{item.product.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity} × ₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
