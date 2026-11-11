import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CategoryItem } from '../../types';

interface CategoryCardProps {
  category: CategoryItem;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative flex flex-col justify-between rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-brand-400 transition-all duration-300 p-4"
    >
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 mb-3">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {category.badgeText && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-brand-600 text-white text-[10px] font-extrabold shadow-sm">
            {category.badgeText}
          </span>
        )}

        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow">
          <ArrowUpRight className="w-4 h-4 text-brand-700" />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
          {category.description}
        </p>
        <span className="text-[11px] font-semibold text-brand-700 mt-2 block">
          {category.itemCount}+ Items available
        </span>
      </div>
    </Link>
  );
};
