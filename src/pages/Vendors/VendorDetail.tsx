import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Clock,
  Truck,
  Heart,
  Search,
  SlidersHorizontal,
  Plus,
  Minus,
  ChevronRight,
  Check,
} from 'lucide-react';
import { vendors, products } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { ProductDetailsModal } from '../../components/products/ProductDetailsModal';

export const VendorDetailPage: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const { cart, addToCart, updateQuantity, toggleWishlist, isWishlisted } = useApp();

  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'about'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('Popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const vendor = vendors.find(v => v.id === vendorId) || vendors[0];

  const menuCategories = ['Popular', 'Pizzas', 'Burgers', 'Sides', 'Drinks', 'Deals'];

  const vendorProducts = useMemo(() => {
    let items = products.filter(p => p.vendorId === vendor.id);

    // If mock vendor has fewer items, include category products to make menu rich
    if (items.length < 6) {
      items = products.filter(
        p => p.vendorId === vendor.id || p.category === vendor.category || p.category === 'restaurant'
      );
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      items = items.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'Popular' && selectedCategory !== 'Deals') {
      items = items.filter(p =>
        p.name.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 4)) ||
        p.tags?.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    return items;
  }, [vendor, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Breadcrumb Matching Reference Image */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/vendors" className="hover:text-slate-800 transition-colors">Restaurants</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">{vendor.name}</span>
      </nav>

      {/* 2. Store Header Banner Matching Reference Image */}
      <div className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={vendor.coverImage}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Store Title Bar with Circular Logo */}
        <div className="p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white shrink-0">
                <img
                  src={vendor.logoImage}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-2 sm:pt-4">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {vendor.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>{vendor.rating}</span>
                    <span className="font-normal text-slate-400">({vendor.reviewsCount} reviews)</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {vendor.deliveryTimeMin - 5} - {vendor.deliveryTimeMin + 5} min
                  </span>
                  <span>•</span>
                  {vendor.deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Free delivery
                    </span>
                  ) : (
                    <span className="text-slate-600 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Rs. {vendor.deliveryFee} delivery
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  {vendor.tags.map(t => (
                    <span key={t} className="font-medium text-slate-500">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(vendor.id)}
              className="self-start sm:self-center p-3 rounded-full bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 transition-colors"
              title="Add to favorites"
            >
              <Heart className={`w-5 h-5 ${isWishlisted(vendor.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Store Tabs: Menu, Reviews, About */}
          <div className="flex items-center gap-8 border-b border-slate-200 text-sm font-bold text-slate-500 pt-4">
            {[
              { id: 'menu', label: 'Menu' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'about', label: 'About' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 relative transition-colors ${
                  activeTab === tab.id
                    ? 'text-brand-500 font-extrabold'
                    : 'hover:text-slate-800'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Search in Menu + Filter Icon */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search in menu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>

        <button
          type="button"
          className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          title="Filter menu"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Two-Column Menu (Categories on Left, Products on Right) Matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Sub-Sidebar Categories */}
        <div className="md:col-span-3 rounded-2xl bg-white border border-slate-200/80 p-3 shadow-xs space-y-1">
          {menuCategories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-brand-50 text-brand-600 border-l-4 border-brand-500 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Right Menu Items Grid Matching Reference Image */}
        <div className="md:col-span-9 space-y-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {selectedCategory === 'Popular' ? 'Popular Items' : selectedCategory}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendorProducts.map(product => {
              const cartItem = cart.find(i => i.productId === product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs hover:shadow-md hover:border-brand-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex gap-3 items-start">
                    {/* Square food image on left matching screenshot */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Title & description */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-brand-500 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price and Orange Plus Button matching screenshot */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-black text-xs sm:text-sm text-slate-900">
                      Rs. {product.price.toLocaleString()}
                    </span>

                    <div onClick={e => e.stopPropagation()}>
                      {cartItem ? (
                        <div className="flex items-center gap-1.5 bg-brand-50 border border-brand-200 rounded-xl px-2 py-1 text-xs font-bold text-brand-700">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                            className="hover:text-brand-900 p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="min-w-4 text-center">{cartItem.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                            className="hover:text-brand-900 p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center font-bold transition-all shadow-xs active:scale-90"
                          aria-label="Add to cart"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
