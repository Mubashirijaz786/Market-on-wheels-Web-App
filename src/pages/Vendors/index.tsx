import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Store,
  Filter,
  SlidersHorizontal,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { vendors, categories } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { VendorCard } from '../../components/vendors/VendorCard';
import { EmptyState } from '../../components/common/EmptyState';

export const VendorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { currentLocation } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'nearest' | 'rating' | 'fastest' | 'fee'>('nearest');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedVendors = useMemo(() => {
    let result = [...vendors];

    // Filter by search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        v =>
          v.name.toLowerCase().includes(q) ||
          v.categoryName.toLowerCase().includes(q) ||
          v.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(v => v.category === selectedCategory);
    }

    // Filter by open now
    if (onlyOpen) {
      result = result.filter(v => v.isOpen);
    }

    // Filter by minimum rating
    if (minRating > 0) {
      result = result.filter(v => v.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'nearest':
        result.sort((a, b) => a.distanceKm - b.distanceKm);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'fastest':
        result.sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);
        break;
      case 'fee':
        result.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, onlyOpen, minRating, sortBy, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>Hyperlocal Network • {currentLocation.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Nearby Verified Stores
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse merchants delivering in <strong>{currentLocation.zone}</strong>. Add products from multiple stores to a single order.
          </p>
        </div>

        {/* Live Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search stores or tags..."
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        {/* Categories Pill Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchParams({});
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSearchParams({ category: cat.id });
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter controls & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyOpen}
              onChange={e => setOnlyOpen(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <span>Open Now</span>
          </label>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium">Rating:</span>
            <select
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-lg p-1.5 focus:outline-none"
            >
              <option value="0">Any Rating</option>
              <option value="4.5">4.5+ ★</option>
              <option value="4.8">4.8+ ★</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-lg p-1.5 focus:outline-none"
            >
              <option value="nearest">Nearest First</option>
              <option value="rating">Highest Rated</option>
              <option value="fastest">Fastest Delivery</option>
              <option value="fee">Lowest Delivery Fee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      {filteredAndSortedVendors.length === 0 ? (
        <EmptyState
          icon={<Store className="w-10 h-10 text-slate-400" />}
          title="No stores found"
          description="Try adjusting your filters or category selection to see available merchants in this zone."
          actionText="Reset All Filters"
          onAction={() => {
            setSelectedCategory('all');
            setOnlyOpen(false);
            setMinRating(0);
            setSearchTerm('');
            setSortBy('nearest');
          }}
        />
      ) : (
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-4">
            Showing {filteredAndSortedVendors.length} store{filteredAndSortedVendors.length !== 1 ? 's' : ''} in {currentLocation.area}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
