import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Store, Check, Plus } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { QuantitySelector } from '../common/QuantitySelector';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { cart, addToCart, updateQuantity, toggleWishlist, isWishlisted } = useApp();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = cart.find(item => item.productId === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(product)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top badges & Wishlist */}
      <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {discountPercent && (
            <span className="px-2 py-0.5 rounded-lg bg-red-600 text-white text-[11px] font-extrabold shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isAiPick && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-sm">
              AI Pick
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-red-50 text-red-500 hover:bg-red-100 shadow-sm'
              : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 mb-3.5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Vendor tag */}
          <Link
            to={`/vendors/${product.vendorId}`}
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:text-brand-800 hover:underline mb-1"
          >
            <Store className="w-3 h-3 text-brand-600" />
            <span className="truncate max-w-[160px]">{product.vendorName}</span>
          </Link>

          {/* Title */}
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h4>

          {/* Unit & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mt-1 mb-2">
            <span>{product.unit}</span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-slate-900">
                Rs. {product.price.toLocaleString()}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div onClick={e => e.stopPropagation()}>
            {cartItem ? (
              <QuantitySelector
                quantity={cartItem.quantity}
                size="sm"
                onIncrease={() => updateQuantity(product.id, cartItem.quantity + 1)}
                onDecrease={() => updateQuantity(product.id, cartItem.quantity - 1)}
              />
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all shadow-xs active:scale-90 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-500 hover:bg-brand-600 text-white'
                }`}
                title="Add to cart"
              >
                {justAdded ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
