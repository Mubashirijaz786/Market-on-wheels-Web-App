import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Trash2, MapPin, ExternalLink } from 'lucide-react';
import { CartVendorGroup } from '../../types';
import { useApp } from '../../context/AppContext';
import { QuantitySelector } from '../common/QuantitySelector';

interface VendorCartSectionProps {
  group: CartVendorGroup;
}

export const VendorCartSection: React.FC<VendorCartSectionProps> = ({ group }) => {
  const { updateQuantity, removeFromCart } = useApp();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm overflow-hidden mb-6">
      {/* Vendor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900">{group.vendorName}</h3>
              <Link
                to={`/vendors/${group.vendorId}`}
                className="text-slate-400 hover:text-brand-600 transition-colors"
                title="View storefront"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3 h-3 text-brand-600" />
              <span>{group.vendorZone}</span>
              <span>•</span>
              <span>~{group.estimatedPickupDistanceKm} km pickup leg</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <span>Vendor Subtotal:</span>
          <span className="text-sm font-extrabold text-brand-900">
            Rs. {group.vendorSubtotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Items list */}
      <div className="divide-y divide-slate-100">
        {group.items.map(item => (
          <div
            key={item.productId}
            className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <img
                src={item.image}
                alt={item.productName}
                className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-slate-900 truncate max-w-xs sm:max-w-md">
                  {item.productName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rs. {item.price.toLocaleString()} / {item.unit}
                </p>
                <p className="text-xs font-extrabold text-slate-800 mt-1 sm:hidden">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <span className="hidden sm:block text-sm font-extrabold text-slate-900">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </span>

              <QuantitySelector
                quantity={item.quantity}
                size="sm"
                onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
              />

              <button
                type="button"
                onClick={() => removeFromCart(item.productId)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
