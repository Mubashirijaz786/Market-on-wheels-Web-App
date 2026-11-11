import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Truck, Store, ArrowRight, PackageCheck, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';

export const OrdersPage: React.FC = () => {
  const { orders } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <Clock className="w-4 h-4" />
          <span>Customer Dashboard</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Your Multi-Store Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          View full details, live pickup timelines, and consolidated delivery receipts.
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="w-12 h-12 text-slate-300" />}
          title="No Orders Found"
          description="You haven't placed any orders yet. Start exploring nearby stores!"
          actionText="Browse Stores"
          onAction={() => (window.location.href = '/vendors')}
        />
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-base text-slate-900">
                      Order #{order.orderNumber}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Placed: {order.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-slate-900">
                    Rs. {order.total.toLocaleString()}
                  </span>
                  <Link
                    to={`/tracking/${order.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white font-bold text-xs transition-colors"
                  >
                    <span>Track Route</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Vendor Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Participating Stores:</span>
                {order.vendorStatuses.map((vs, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
                  >
                    <Store className="w-3 h-3 text-brand-600" />
                    <span>{vs.vendorName}</span>
                    <span className="text-[10px] text-slate-400">({vs.status})</span>
                  </span>
                ))}
              </div>

              {/* Items Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1">
                {order.items.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-100 bg-slate-50 shrink-0 text-xs"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">
                      {item.productName}
                    </span>
                    <span className="text-[10px] text-slate-400">×{item.quantity}</span>
                  </div>
                ))}
                {order.items.length > 5 && (
                  <span className="text-xs text-slate-400 px-2 font-semibold">
                    +{order.items.length - 5} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
