import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md' | 'lg';
  showTrashAtOne?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md',
  showTrashAtOne = true,
}) => {
  const sizeClasses = {
    sm: 'h-7 text-xs px-1',
    md: 'h-9 text-sm px-1.5',
    lg: 'h-11 text-base px-2',
  };

  const btnClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-7 h-7 p-1.5',
    lg: 'w-9 h-9 p-2',
  };

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm font-semibold select-none ${sizeClasses[size]}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        className={`rounded-lg flex items-center justify-center text-slate-600 hover:text-brand-700 hover:bg-brand-50 transition-colors ${btnClasses[size]}`}
        aria-label="Decrease quantity"
      >
        {quantity === 1 && showTrashAtOne ? (
          <Trash2 className="w-3.5 h-3.5 text-red-500" />
        ) : (
          <Minus className="w-3.5 h-3.5" />
        )}
      </button>

      <span className="min-w-8 text-center px-2 font-bold text-slate-800">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className={`rounded-lg flex items-center justify-center text-slate-600 hover:text-brand-700 hover:bg-brand-50 transition-colors ${btnClasses[size]}`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
