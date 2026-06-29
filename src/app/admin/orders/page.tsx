'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, RefreshCcw } from 'lucide-react';

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else if (res.status === 403) {
        alert('You are not authorized to view this page.');
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (orderId: string, currentData: any) => {
    setIsUpdating(orderId);
    try {
      const form = document.getElementById(`form-${orderId}`) as HTMLFormElement;
      const formData = new FormData(form);
      const status = formData.get('status');
      const courier = formData.get('courier');
      const trackingNumber = formData.get('trackingNumber');

      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, courier, trackingNumber }),
      });

      if (res.ok) {
        alert('Order updated successfully!');
        fetchOrders();
      } else {
        alert('Failed to update order');
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed');
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID': return <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">PAID</span>;
      case 'PROCESSING': return <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">PROCESSING</span>;
      case 'SHIPPED': return <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-bold">SHIPPED</span>;
      case 'DELIVERED': return <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">DELIVERED</span>;
      default: return <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs font-bold">{status}</span>;
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#0C0C0C] text-white p-12 text-center mt-24 flex items-center justify-center"><RefreshCcw className="animate-spin text-[#1B7A53] mr-2" /> Loading Orders...</div>;

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#1B7A53] mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 mb-12">Manage and track customer orders</p>

        {orders.length === 0 ? (
          <div className="bg-[#111111] p-12 rounded-2xl border border-white/5 text-center text-gray-500">
            No orders have been placed yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111111] p-6 rounded-2xl border border-white/5 shadow-xl flex flex-col lg:flex-row gap-8"
              >
                
                {/* Left: Order Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 font-mono">#{order.id.slice(-8)}</span>
                    {getStatusBadge(order.status)}
                    <span className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{order.user.name}</h3>
                    <p className="text-sm text-gray-400">{order.user.email} • {order.phone}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {order.address}, {order.city}, {order.state} {order.zipCode}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm font-semibold mb-2">Order Items:</p>
                    <ul className="space-y-1">
                      {order.items.map((item: any) => (
                        <li key={item.id} className="text-sm text-gray-400">
                          {item.quantity}x {item.product.name} - ₹{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p className="font-bold text-[#1B7A53] mt-3">Total: ₹{order.total}</p>
                  </div>
                </div>

                {/* Right: Management Form */}
                <div className="flex-1 bg-[#1A1A1A] p-6 rounded-xl border border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
                    <Truck size={16} /> Manage Fulfillment
                  </h3>
                  
                  <form id={`form-${order.id}`} className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleUpdate(order.id, order); }}>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Update Status</label>
                      <select name="status" defaultValue={order.status} className="w-full bg-[#111111] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#1B7A53]">
                        <option value="PAID">PAID (Awaiting Processing)</option>
                        <option value="PROCESSING">PROCESSING (Packing)</option>
                        <option value="SHIPPED">SHIPPED (In Transit)</option>
                        <option value="DELIVERED">DELIVERED (Complete)</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Courier Name</label>
                        <input type="text" name="courier" defaultValue={order.courier || ''} placeholder="e.g. BlueDart" className="w-full bg-[#111111] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#1B7A53]" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Tracking Number</label>
                        <input type="text" name="trackingNumber" defaultValue={order.trackingNumber || ''} placeholder="AWB123456789" className="w-full bg-[#111111] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#1B7A53]" />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isUpdating === order.id}
                      className="w-full mt-4 bg-[#1B7A53] hover:bg-[#166040] text-white py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                      {isUpdating === order.id ? <RefreshCcw className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                      {isUpdating === order.id ? 'Updating...' : 'Save Changes'}
                    </button>
                  </form>
                </div>

              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
