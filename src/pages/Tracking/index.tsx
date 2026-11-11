import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Truck,
  Home,
  Phone,
  MessageSquare,
  Star,
  MapPin,
  HelpCircle,
  Plus,
  Minus,
  LocateFixed,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';

export const TrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, orders } = useApp();

  const order = getOrderById(orderId || '') || orders[0];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-16">
        <EmptyState
          title="Order Not Found"
          description="We couldn't locate an order with this ID."
          actionText="View Orders"
          onAction={() => (window.location.href = '/orders')}
        />
      </div>
    );
  }

  // Stepper steps matching screenshot
  const stepperSteps = [
    { label: 'Order Placed', time: '12:15 PM', status: 'completed' },
    { label: 'Vendors Preparing', time: '12:28 PM', status: 'completed' },
    { label: 'Rider Picked Up', time: '12:45 PM', status: 'current' },
    { label: 'On the Way', time: '--', status: 'pending' },
    { label: 'Delivered', time: '--', status: 'pending' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Matching Panel 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Order #{order.orderNumber} • {order.createdAt}
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Support team is available 24/7. Live chat connected.')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brand-500 text-brand-600 hover:bg-brand-50 font-bold text-xs transition-colors self-start sm:self-auto"
        >
          <HelpCircle className="w-4 h-4 text-brand-500" />
          <span>Need Help?</span>
        </button>
      </div>

      {/* 2. Horizontal Order Progress Tracker Matching Reference Image */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-5 gap-2 relative">
          {/* Connector Line behind steps */}
          <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 -z-0" />
          <div className="absolute top-5 left-10 w-1/2 h-0.5 bg-emerald-500 -z-0" />

          {stepperSteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-brand-500 text-white ring-4 ring-brand-100 animate-pulse'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Truck className="w-5 h-5" />
                  ) : idx === 4 ? (
                    <Home className="w-5 h-5" />
                  ) : (
                    <Truck className="w-5 h-5" />
                  )}
                </div>

                <p
                  className={`text-xs font-bold mt-2 leading-tight ${
                    isCurrent
                      ? 'text-brand-600'
                      : isCompleted
                      ? 'text-slate-900'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{step.time}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Map on Left & Order Details on Right Matching Reference Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Map Visualization Card */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
          <div className="relative h-[420px] bg-[#EBF0F5] overflow-hidden p-6 flex flex-col justify-between">
            {/* Map Roads & Stylized Grid lines */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(#CBD5E1 1.5px, transparent 1.5px), radial-gradient(#CBD5E1 1.5px, #F1F5F9 1.5px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* SVG Connecting Route Polyline */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 100 80 Q 150 140 180 200 T 260 260 T 420 340"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Map Controls (+ / - / target) on top right */}
            <div className="absolute top-4 right-4 flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-slate-700 z-20">
              <button className="p-2 hover:bg-slate-50 border-b border-slate-100">
                <Plus className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-50 border-b border-slate-100">
                <Minus className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-50">
                <LocateFixed className="w-4 h-4 text-brand-500" />
              </button>
            </div>

            {/* Vendor Waypoint 1 (Pizza Palace) */}
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                🍕
              </div>
            </div>

            {/* Vendor Waypoint 2 (Burger Hub) */}
            <div className="relative z-10 flex items-center gap-2 ml-16">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                🍔
              </div>
            </div>

            {/* Vendor Waypoint 3 (Fresh Mart) */}
            <div className="relative z-10 flex items-center gap-2 ml-36">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                🍎
              </div>
            </div>

            {/* Animated Rider on Scooter with Popup Bubble */}
            <div className="relative z-10 flex items-center gap-3 ml-44 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm shadow-xl ring-4 ring-brand-100">
                🛵
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white shadow-md border border-slate-200 text-xs font-bold text-slate-800">
                Rider is on the way <span className="text-slate-400 font-normal">• 5 minutes away</span>
              </div>
            </div>

            {/* Destination Home Pin */}
            <div className="relative z-10 flex items-center gap-2 self-end mr-6">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-xl ring-4 ring-rose-100">
                🏠
              </div>
            </div>
          </div>
        </div>

        {/* Right: Rider Info + Delivery Address + Order Items */}
        <div className="lg:col-span-5 space-y-4">
          {/* Rider Card matching screenshot */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Rider Information
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={order.rider?.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                  alt={order.rider?.name || 'Ahmad Khan'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500"
                />
                <div>
                  <h5 className="font-extrabold text-sm text-slate-900">
                    {order.rider?.name || 'Ahmad Khan'}
                  </h5>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>4.8</span>
                    <span className="text-slate-400 font-normal">(1200+ deliveries)</span>
                  </div>
                </div>
              </div>

              {/* Call & Message Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${order.rider?.phone || '+923015544332'}`}
                  className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-xs"
                  title="Call Courier"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => alert(`Direct rider messaging opened with ${order.rider?.name || 'Ahmad Khan'}`)}
                  className="w-10 h-10 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-colors shadow-xs"
                  title="Message Courier"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Address matching screenshot */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Delivery Address
            </h4>
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span>{order.deliveryAddress.fullAddress}</span>
            </p>
          </div>

          {/* Order Items (4) matching screenshot */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Order Items ({order.items.length})
            </h4>

            <div className="space-y-2.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate max-w-[170px]">
                        {item.productName}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 shrink-0">
                    Rs. {item.price} <span className="text-slate-400 font-normal">×{item.quantity}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
