import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm animate-pulse flex flex-col justify-between">
      <div className="w-full h-44 bg-slate-200 rounded-xl mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-1/3 bg-slate-200 rounded" />
        <div className="h-4 w-4/5 bg-slate-200 rounded" />
        <div className="h-3 w-1/2 bg-slate-200 rounded" />
      </div>
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="h-5 w-16 bg-slate-200 rounded" />
        <div className="h-9 w-24 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
};

export const VendorCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-36 bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-1/2 bg-slate-200 rounded" />
          <div className="h-4 w-12 bg-slate-200 rounded-full" />
        </div>
        <div className="h-3 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 rounded" />
      </div>
    </div>
  );
};
