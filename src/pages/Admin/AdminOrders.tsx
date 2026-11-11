import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, CheckCircle2, Clock, Truck, Layers, MapPin, User, ChevronRight } from 'lucide-react';
import { samplePastOrders } from '../../data/mockData';
import { Order } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(samplePastOrders);
  const [search, setSearch] = useState('');

  const filtered = orders.filter(
    o =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.vendorGroups.some(vg => vg.vendorName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Platform Orders & Multi-Vendor Dispatch
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time oversight of multi-store checkout orders, single courier assignments, and delivery fulfillment
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by order number (e.g. MW-12345) or vendor name..."
          className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Orders Ledger */}
      <div className="space-y-4">
        {filtered.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <span className="font-black text-base text-slate-900">
                  Order #{order.orderNumber}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">{order.createdAt}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {order.status}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500">Total Charged: </span>
                <span className="font-black text-base text-slate-900">
                  Rs. {order.total}
                </span>
                <span className="text-[11px] text-slate-400 ml-1">
                  ({order.paymentMethod.toUpperCase()})
                </span>
              </div>
            </div>

            {/* Vendors & Courier Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Layers className="w-3.5 h-3.5 text-[#F9541E]" />
                  <span>Participating Merchants ({order.vendorGroups.length})</span>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {order.vendorGroups.map((vg, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                    >
                      {vg.vendorName}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Assigned Courier Rider</span>
                </p>
                <p className="font-semibold text-slate-700">
                  {order.rider?.name || 'Ahmad Khan'} ({order.rider?.phone || '+92 301 5551234'})
                </p>
                <p className="text-[11px] text-slate-400">
                  Vehicle: Honda CG-125 • Thermal Delivery Bag
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Delivery Destination</span>
                </p>
                <p className="font-semibold text-slate-700">
                  {order.deliveryAddress.fullAddress}
                </p>
                <p className="text-[11px] text-slate-400">
                  Area: {order.deliveryAddress.area}, {order.deliveryAddress.city}
                </p>
              </div>
            </div>

            {/* Order Items summary */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <div className="flex items-center gap-4">
                <span>
                  Items: <strong className="text-slate-800">{order.items.length} products</strong>
                </span>
                <span>•</span>
                <span>
                  Consolidated Delivery Fee: <strong className="text-emerald-600">Rs. {order.deliveryFee}</strong>
                </span>
              </div>

              <Link
                to={`/tracking/${order.id}`}
                className="font-bold text-[#F9541E] hover:underline flex items-center gap-1 text-xs"
              >
                <span>View Customer Tracking View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
