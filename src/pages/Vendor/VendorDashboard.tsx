import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  DollarSign,
  Package,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Store,
  Layers,
  Phone,
  MapPin,
} from 'lucide-react';
import { vendors, products } from '../../data/mockData';

export const VendorDashboardPage: React.FC = () => {
  const currentVendor = vendors[0]; // Pizza Palace
  const [isOpen, setIsOpen] = useState(currentVendor.isOpen);
  const [orders, setOrders] = useState([
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
      status: 'incoming', // incoming | preparing | ready | completed
      time: '10 mins ago',
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
      time: '25 mins ago',
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
      time: '40 mins ago',
      courierNote: 'Awaiting rider handover at pickup desk',
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const vendorProducts = products.filter(p => p.vendorId === currentVendor.id);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner & Store Status Toggle */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F9541E] flex items-center justify-center font-bold text-2xl border border-orange-100 shrink-0">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {currentVendor.name} Portal
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F9541E] text-xs font-bold uppercase tracking-wider">
                {currentVendor.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {currentVendor.address}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                {currentVendor.rating} ({currentVendor.reviewsCount} reviews)
              </span>
            </p>
          </div>
        </div>

        {/* Store Open/Closed Toggle */}
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl border border-slate-200/80 self-start md:self-auto">
          <span className="text-xs font-bold text-slate-700 pl-2">
            Store Status:
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
              isOpen
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-white' : 'bg-red-200'} animate-pulse`} />
            <span>{isOpen ? 'Open for Orders' : 'Store Closed'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Today's Orders</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F9541E] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">18</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +24% vs yesterday
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Today's Sales</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">Rs. 24,850</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Settled via COD & Card
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Active Catalog</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{vendorProducts.length} Items</p>
          <p className="text-[11px] text-slate-400 font-medium">All items in stock</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Avg. Prep Time</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">16 Mins</p>
          <p className="text-[11px] text-emerald-600 font-bold">Within 20 min SLA</p>
        </div>
      </div>

      {/* Incoming Orders Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Live Incoming Orders
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage multi-vendor order pick-ups from your kitchen desk
            </p>
          </div>
          <Link
            to="/vendor/orders"
            className="text-xs font-bold text-[#F9541E] hover:underline flex items-center gap-1"
          >
            <span>All Orders ({orders.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="p-5 rounded-2xl border border-slate-200/90 hover:border-orange-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm text-slate-900">
                    Order {order.orderNumber}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{order.time}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      order.status === 'incoming'
                        ? 'bg-amber-100 text-amber-800'
                        : order.status === 'preparing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm text-slate-900">
                    Rs. {order.total}
                  </span>
                </div>
              </div>

              {/* Customer & Item details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500 font-semibold mb-1">Customer Details:</p>
                  <p className="font-bold text-slate-800">{order.customer}</p>
                  <p className="text-slate-500">{order.phone} • {order.address}</p>
                  <p className="text-[11px] text-[#F9541E] mt-1 font-semibold flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> {order.courierNote}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 font-semibold mb-1">Items to Prepare:</p>
                  <ul className="space-y-1">
                    {order.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between text-slate-700">
                        <span>{it.qty}x {it.name}</span>
                        <span className="font-semibold">Rs. {it.price * it.qty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-end gap-2 border-t border-slate-200/60">
                {order.status === 'incoming' && (
                  <button
                    type="button"
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="px-4 py-2 rounded-xl bg-[#F9541E] hover:bg-[#EA4A15] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Accept & Start Preparing
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    type="button"
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Ready for Courier
                  </button>
                )}
                {order.status === 'ready' && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Ready for pickup at dispatch counter
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
