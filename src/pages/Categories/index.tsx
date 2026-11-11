import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Store, ShoppingBag } from 'lucide-react';
import { categories } from '../../data/mockData';
import { CategoryCard } from '../../components/products/CategoryCard';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Layers className="w-4 h-4" />
          <span>Marketplace Departments</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          All Product Categories
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Browse verified merchants across all everyday lifestyle categories. You can add items across different departments into the same shopping basket and receive them together in one combined delivery!
        </p>
      </div>

      {/* Grid of All 10 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="flex flex-col">
            <CategoryCard category={cat} />
            <div className="mt-2 flex items-center justify-between px-2 text-xs">
              <Link
                to={`/vendors?category=${cat.id}`}
                className="text-slate-500 hover:text-brand-700 font-semibold flex items-center gap-1"
              >
                <Store className="w-3.5 h-3.5" /> View Stores
              </Link>
              <Link
                to={`/products?category=${cat.id}`}
                className="text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1"
              >
                Browse Items <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Category Delivery Banner */}
      <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-emerald-950">
            Mix & Match Across Any Department
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-xl">
            Want fresh whole milk from the dairy farm, headache medicine from the pharmacy, and a hot burger from a street eatery? All 3 categories can be ordered together on Market on Wheels.
          </p>
        </div>
        <Link
          to="/products"
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-sm shrink-0 transition-all"
        >
          Explore All Products
        </Link>
      </div>
    </div>
  );
};
