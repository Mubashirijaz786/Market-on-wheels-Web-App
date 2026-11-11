import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Store, Truck, ShieldCheck, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { QuantitySelector } from '../common/QuantitySelector';
import { Button } from '../common/Button';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { cart, addToCart, updateQuantity, toggleWishlist, isWishlisted } = useApp();
  const [selectedQty, setSelectedQty] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const cartItem = cart.find(item => item.productId === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedQty);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Product Image */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 sm:h-96 object-cover"
          />
          {discountPercent && (
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md">
              Save {discountPercent}%
            </span>
          )}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              wishlisted
                ? 'bg-red-50 text-red-500'
                : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right: Details & Multi-vendor context */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
                {product.categoryName}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.inStock || 25})
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug mb-2">
              {product.name}
            </h2>

            {/* Vendor link badge */}
            <Link
              to={`/vendors/${product.vendorId}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-brand-50 hover:border-brand-200 transition-colors mb-4 group"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-medium">Fulfilled By</p>
                <p className="text-xs font-bold text-slate-800 group-hover:text-brand-700">
                  {product.vendorName}
                </p>
              </div>
            </Link>

            {/* Rating and Unit */}
            <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">(Verified buyers)</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-slate-700">Unit: {product.unit}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Multi-Vendor Single Delivery Promise */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 mb-6 text-xs text-emerald-900 flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Combined Delivery Compatible</p>
                <p className="text-[11px] text-emerald-700">
                  You can combine this product with items from other nearby grocery, bakery, or medicine stores into a single checkout delivery!
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Add to cart */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-slate-500 ml-auto">Inclusive of all taxes</span>
            </div>

            {cartItem ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Currently in Cart:</span>
                <QuantitySelector
                  quantity={cartItem.quantity}
                  size="md"
                  onIncrease={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  onDecrease={() => updateQuantity(product.id, cartItem.quantity - 1)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <QuantitySelector
                  quantity={selectedQty}
                  size="md"
                  onIncrease={() => setSelectedQty(q => q + 1)}
                  onDecrease={() => setSelectedQty(q => Math.max(1, q - 1))}
                  showTrashAtOne={false}
                />
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={handleAddToCart}
                  leftIcon={addedNotice ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                >
                  {addedNotice ? 'Added to Cart!' : `Add to Cart • Rs. ${(product.price * selectedQty).toLocaleString()}`}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
