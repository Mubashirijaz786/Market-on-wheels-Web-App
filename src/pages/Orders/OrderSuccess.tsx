import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Truck, MapPin, Store, Calendar, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useApp();

  const order = getOrderById(orderId || '');

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl text-center space-y-8">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/20 animate-in zoom-in-75 duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Consolidated Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Order <strong className="text-slate-800">#{order?.orderNumber || orderId}</strong> has been transmitted to all participating vendors.
          </p>
        </div>

        {/* Order Card Brief */}
        {order && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-left text-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery To</span>
                  <span className="font-bold text-slate-800">{order.deliveryAddress.fullAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Delivery</span>
                  <span className="font-bold text-slate-800">~{order.estimatedDeliveryTime}</span>
                  <span className="text-[10px] text-brand-700 block font-semibold">
                    {order.vendorGroups.length} store pickups combined
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-600">Total Billed ({order.items.length} items):</span>
              <span className="text-base font-extrabold text-slate-900">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {order && (
            <Link
              to={`/tracking/${order.id}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Track Live Delivery Route</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <Link
            to="/products"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
