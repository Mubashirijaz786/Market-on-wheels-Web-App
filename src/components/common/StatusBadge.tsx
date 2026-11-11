import React from 'react';
import { OrderStatus } from '../../types';

export const StatusBadge: React.FC<{
  status: OrderStatus | 'open' | 'closed' | 'available' | 'out_of_stock' | 'ready' | 'picked_up' | 'received';
  className?: string;
}> = ({ status, className = '' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'received':
        return { label: 'Received by Store', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'placed':
        return { label: 'Order Placed', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'confirmed':
        return { label: 'Confirmed', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'preparing':
        return { label: 'Preparing', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'rider_assigned':
        return { label: 'Rider Assigned', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      case 'picking_up':
        return { label: 'Picking Up (Multi-Store)', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'on_the_way':
        return { label: 'Out for Delivery', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'delivered':
        return { label: 'Delivered', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'cancelled':
        return { label: 'Cancelled', bg: 'bg-red-50 text-red-700 border-red-200' };
      case 'open':
      case 'available':
        return { label: 'Open Now', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'closed':
      case 'out_of_stock':
        return { label: 'Closed', bg: 'bg-slate-100 text-slate-600 border-slate-200' };
      case 'ready':
        return { label: 'Ready for Pickup', bg: 'bg-teal-50 text-teal-700 border-teal-200' };
      case 'picked_up':
        return { label: 'Collected by Rider', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: status, bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const { label, bg } = getBadgeConfig();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bg} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {label}
    </span>
  );
};
