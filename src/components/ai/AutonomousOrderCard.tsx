import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, ShoppingBag, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

interface AutonomousOrderCardProps {
  proposal: {
    items: Array<{ product: Product; quantity: number }>;
    subtotal: number;
    deliveryFee: number;
    total: number;
    vendorCount: number;
    vendorNames: string[];
  };
  onDismiss?: () => void;
}

export const AutonomousOrderCard: React.FC<AutonomousOrderCardProps> = ({ proposal, onDismiss }) => {
  const navigate = useNavigate();
  const { confirmAiProposal, addToCart } = useApp();
  const [isConfirming, setIsConfirming] = useState(false);
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      const order = confirmAiProposal(proposal.items);
      setIsConfirming(false);
      setStatus('confirmed');
      setTimeout(() => {
        navigate(`/tracking/${order.id}`);
      }, 1400);
    }, 800);
  };

  const handleModifyInCart = () => {
    for (const item of proposal.items) {
      addToCart(item.product, item.quantity);
    }
    navigate('/cart');
  };

  if (status === 'confirmed') {
    return (
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50/90 p-4 sm:p-5 text-emerald-900 animate-in fade-in">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-bounce" />
          <div>
            <h4 className="font-extrabold text-sm text-emerald-900">
              Autonomous Order Placed Successfully!
            </h4>
            <p className="text-xs text-emerald-700">
              Redirecting you to the live multi-vendor route tracking dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'cancelled') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
        Autonomous order bundle was cancelled. You can type another request anytime.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-200 bg-white p-4 shadow-sm my-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
              Multi-Store Order Suggestion
            </h4>
            <p className="text-[11px] text-brand-600 font-semibold">
              Grouped from {proposal.vendorCount} nearby stores
            </p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Itemized List */}
      <div className="py-2.5 divide-y divide-slate-100 max-h-56 overflow-y-auto">
        {proposal.items.map((item, idx) => (
          <div key={idx} className="py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-100"
              />
              <div className="min-w-0">
                <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                <p className="text-[10px] text-slate-400">
                  {item.quantity} × Rs. {item.product.price} • From{' '}
                  <span className="text-brand-600 font-medium">{item.product.vendorName}</span>
                </p>
              </div>
            </div>
            <span className="font-bold text-slate-900 shrink-0 ml-2">
              Rs. {(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Bill summary */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs mb-3">
        <div className="flex justify-between text-slate-600">
          <span>Items Subtotal:</span>
          <span>Rs. {proposal.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Delivery Fee:</span>
          <span className="text-emerald-600 font-semibold">Rs. {proposal.deliveryFee} (Free)</span>
        </div>
        <div className="flex justify-between font-extrabold text-xs sm:text-sm text-slate-900 pt-1 border-t border-slate-200">
          <span>Total:</span>
          <span className="text-brand-600">Rs. {proposal.total.toLocaleString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button
          variant="primary"
          size="sm"
          className="col-span-1 sm:col-span-2 bg-brand-500 hover:bg-brand-600 text-white font-bold"
          isLoading={isConfirming}
          onClick={handleConfirm}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Confirm & Place Order (Rs. {proposal.total.toLocaleString()})
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleModifyInCart}
        >
          Review In Cart
        </Button>
      </div>
    </div>
  );
};
