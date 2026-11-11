import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
  Layers,
  Truck,
  Clock,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    updateQuantity,
    removeFromCart,
    vendorGroups,
    cartSubtotal,
    totalItemCount,
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16">
        <EmptyState
          icon={<ShoppingBag className="w-12 h-12 text-slate-300" />}
          title="Your Multi-Vendor Cart is Empty"
          description="Explore restaurants, groceries, bakeries, and pharmacies to assemble your combined delivery."
          actionText="Start Shopping"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  // Delivery simulation: Free or standard consolidated 0
  const deliveryFee = 0;
  const serviceFee = 50;
  const totalAmount = cartSubtotal + deliveryFee + serviceFee;

  return (
    <div className="space-y-6 pb-16">
      {/* Header Matching Reference Image */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Items from multiple vendors in a single delivery
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors p-2 rounded-xl hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid: Left Vendor Items List, Right Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Grouped by Vendor Matching Panel 3 */}
        <div className="lg:col-span-8 space-y-5">
          {vendorGroups.map(group => (
            <div
              key={group.vendorId}
              className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-4"
            >
              {/* Vendor Header with Orange Check Circle + Logo + Title */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=100&q=80"
                    alt={group.vendorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {group.vendorName}
                </h3>
              </div>

              {/* Items in this vendor */}
              <div className="divide-y divide-slate-100">
                {group.items.map(item => (
                  <div
                    key={item.productId}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    {/* Item info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                          {item.productName}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.unit}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector + Price + Trash */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                      {/* Quantity Selector: [- 1 +] */}
                      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-bold shadow-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:text-brand-500 transition-colors text-slate-500"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="min-w-6 text-center text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:text-brand-500 transition-colors text-slate-500"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-black text-xs sm:text-sm text-slate-900 min-w-16 text-right">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary Matching Reference Image */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span className="font-bold text-slate-800">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-800">
                  Rs. {deliveryFee}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Service Fee</span>
                <span className="font-bold text-slate-800">
                  Rs. {serviceFee}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                <span>Total Amount</span>
                <span className="text-xl font-black text-brand-500">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Big Orange Button: Proceed to Checkout → */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature highlights below button matching screenshot */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Multiple Vendors</p>
                <p className="text-[11px] text-slate-400">Get everything in one delivery</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Single Delivery Fee</p>
                <p className="text-[11px] text-slate-400">Pay one delivery fee only</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Live Order Tracking</p>
                <p className="text-[11px] text-slate-400">Track your order in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
