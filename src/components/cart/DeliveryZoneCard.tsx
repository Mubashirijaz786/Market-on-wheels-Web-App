import React from 'react';
import { Truck, Info, CheckCircle2, TrendingDown, Layers, MapPin } from 'lucide-react';
import { DeliveryCalculation } from '../../types';
import { useApp } from '../../context/AppContext';

interface DeliveryZoneCardProps {
  calculation: DeliveryCalculation;
}

export const DeliveryZoneCard: React.FC<DeliveryZoneCardProps> = ({ calculation }) => {
  const { currentLocation, vendorGroups } = useApp();

  return (
    <div className="rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50/60 to-white p-5 sm:p-6 shadow-sm mb-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
              Smart Combined Delivery Simulation
            </h4>
            <p className="text-xs text-brand-700 font-medium">
              Hyperlocal Consolidated Route Optimization
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-100 text-brand-800 border border-brand-200 shrink-0">
          {calculation.vendorCount} Store{calculation.vendorCount > 1 ? 's' : ''} in One Bag
        </span>
      </div>

      {/* Route & Geographic Zone details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white border border-emerald-100 mb-4 text-xs">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery Destination</span>
            <span className="font-bold text-slate-800">{currentLocation.name}</span>
            <span className="text-[11px] text-slate-500 block">({currentLocation.zone})</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Layers className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Consolidated Route Est.</span>
            <span className="font-bold text-slate-800">~{calculation.totalDistanceKm} km total travel</span>
            <span className="text-[11px] text-slate-500 block">ETA: {calculation.estimatedTotalMinutes} mins total</span>
          </div>
        </div>
      </div>

      {/* Fee Breakdown calculation */}
      <div className="space-y-2 text-xs border-t border-emerald-100/80 pt-3 mb-4">
        <div className="flex items-center justify-between text-slate-600">
          <span>Primary Dropoff Base Charge (Store 1):</span>
          <span className="font-semibold text-slate-900">Rs. {calculation.baseFee}</span>
        </div>

        {calculation.vendorCount > 1 && (
          <div className="flex items-center justify-between text-slate-600">
            <span>Additional Pickup Surcharge ({calculation.vendorCount - 1} extra stop):</span>
            <span className="font-semibold text-slate-900">+ Rs. {calculation.additionalPickupFee}</span>
          </div>
        )}

        <div className="flex items-center justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-dashed border-slate-200">
          <span>Total Combined Delivery Fee:</span>
          <span className="text-brand-700">Rs. {calculation.totalDeliveryFee}</span>
        </div>
      </div>

      {/* Multi-Vendor Savings Box */}
      {calculation.savingsVsIndividual > 0 && (
        <div className="p-3 rounded-xl bg-brand-100/70 border border-brand-200 text-brand-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-brand-700" />
            <span className="text-xs font-bold">
              Consolidation Savings vs. Separate Deliveries:
            </span>
          </div>
          <span className="text-xs font-extrabold text-brand-800 px-2 py-0.5 rounded bg-white shadow-xs">
            Save Rs. {calculation.savingsVsIndividual}
          </span>
        </div>
      )}

      {/* Simulation note */}
      <div className="flex items-start gap-1.5 mt-3 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
        <span>
          Simulated dynamic rate for academic prototype: Consolidated route dispatch formula aggregates nearby merchant stops into a unified rider manifest.
        </span>
      </div>
    </div>
  );
};
