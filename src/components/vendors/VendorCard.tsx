import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Truck, ChevronRight } from 'lucide-react';
import { Vendor } from '../../types';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <Link
      to={`/vendors/${vendor.id}`}
      className="group rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={vendor.coverImage}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {vendor.deliveryFee === 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white text-[10px] font-extrabold shadow-sm">
            Free Delivery
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand-500 transition-colors">
          {vendor.name}
        </h3>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>{vendor.rating}</span>
            <span className="text-slate-400 font-normal">({vendor.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{vendor.deliveryTimeMin} min</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          {vendor.deliveryFee === 0 ? (
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Free delivery
            </span>
          ) : (
            <span className="text-slate-500 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Rs. {vendor.deliveryFee} delivery
            </span>
          )}
          <span className="text-[11px] font-bold text-brand-500 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            Visit Store <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};
