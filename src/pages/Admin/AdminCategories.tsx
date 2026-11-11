import React from 'react';
import { Layers, Grid, Plus, Edit2, CheckCircle2 } from 'lucide-react';
import { categories } from '../../data/mockData';

export const AdminCategoriesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Marketplace Categories & Taxonomy
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize multi-vendor category taxonomy, catalog limits, and department badges
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              {cat.badgeText && (
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase">
                  {cat.badgeText}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {cat.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                {cat.itemCount} Active Items
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3 h-3" /> Published
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
