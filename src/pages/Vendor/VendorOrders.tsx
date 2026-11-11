import React, { useState } from 'react';
import { Package, Clock, CheckCircle2, User, Phone, MapPin, Layers, Search, Filter } from 'lucide-react';
import { vendors } from '../../data/mockData';

export const VendorOrdersPage: React.FC = () => {
  const currentVendor = vendors[0]; // Pizza Palace
  const [filter, setFilter] = useState<'all' | 'incoming' | 'preparing' | 'ready' | 'completed'>('all');

  const [orderList, setOrderList] = useState([
    {
      id: 'ord_v1',
      orderNumber: 'MW-9821',
      customer: 'Ahmed Malik',
      phone: '+92 300 1234567',
      address: 'University Road, Sargodha',
      items: [
        { name: 'Margherita Pizza (Large)', qty: 1, price: 850 },
        { name: 'Cheesy Garlic Bread', qty: 2, price: 320 },
      ],
      total: 1490,
      status: 'incoming',
      time: '12:15 PM today',
      courierNote: 'Consolidated pickup with Metro Supermarket',
    },
    {
      id: 'ord_v2',
      orderNumber: 'MW-9815',
      customer: 'Usman Tariq',
      phone: '+92 321 9876543',
      address: 'Satellite Town, Sargodha',
      items: [
        { name: 'Pepperoni Pizza (Medium)', qty: 2, price: 950 },
      ],
      total: 1900,
      status: 'preparing',
      time: '11:45 AM today',
      courierNote: 'Courier assigned: Ahmad Khan',
    },
    {
      id: 'ord_v3',
      orderNumber: 'MW-9790',
      customer: 'Sara Khan',
      phone: '+92 333 4567890',
      address: 'Fatima Jinnah Town, Sargodha',
      items: [
        { name: 'BBQ Chicken Pizza (Large)', qty: 1, price: 950 },
      ],
      total: 950,
      status: 'ready',
      time: '11:10 AM today',
      courierNote: 'Awaiting rider handover at pickup desk',
    },
    {
      id: 'ord_v4',
      orderNumber: 'MW-9742',
      customer: 'Zainab Bibi',
      phone: '+92 345 1122334',
      address: 'Club Road, Sargodha',
      items: [
        { name: 'Vegetarian Delight Pizza', qty: 1, price: 800 },
        { name: 'Coca Cola 1.5L', qty: 1, price: 220 },
      ],
      total: 1020,
      status: 'completed',
      time: '10:05 AM today',
      courierNote: 'Delivered successfully by rider',
    },
  ]);

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrderList(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const filteredOrders =
    filter === 'all'
      ? orderList
      : orderList.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Store Orders
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Process, prepare, and hand over incoming orders to consolidated couriers
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['all', 'incoming', 'preparing', 'ready', 'completed'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
              filter === tab
                ? 'bg-[#F9541E] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {tab === 'all' ? 'All Orders' : tab}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-extrabold text-sm text-slate-900">
                  {order.orderNumber}
                </span>
                <p className="text-[11px] text-slate-400">{order.time}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                  order.status === 'incoming'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : order.status === 'preparing'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : order.status === 'ready'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Customer & Location */}
            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {order.customer} ({order.phone})
              </p>
              <p className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {order.address}
              </p>
              <p className="text-[11px] text-[#F9541E] font-medium flex items-center gap-1.5 pt-1">
                <Layers className="w-3.5 h-3.5" />
                {order.courierNote}
              </p>
            </div>

            {/* Items */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Order Items
              </p>
              <ul className="space-y-1 text-xs text-slate-700">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.qty}x {item.name}</span>
                    <span className="font-semibold">Rs. {item.price * item.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 mt-2 border-t border-slate-100 flex justify-between font-black text-sm text-slate-900">
                <span>Vendor Total</span>
                <span>Rs. {order.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
              {order.status === 'incoming' && (
                <button
                  type="button"
                  onClick={() => updateStatus(order.id, 'preparing')}
                  className="px-4 py-2 rounded-xl bg-[#F9541E] hover:bg-[#EA4A15] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Accept & Prepare
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  type="button"
                  onClick={() => updateStatus(order.id, 'ready')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Mark Ready
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  type="button"
                  onClick={() => updateStatus(order.id, 'completed')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Handed to Courier
                </button>
              )}
              {order.status === 'completed' && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Order Complete
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
