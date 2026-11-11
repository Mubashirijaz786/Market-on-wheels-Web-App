import React, { useState } from 'react';
import { Store, Search, CheckCircle2, Star, MapPin, Phone, ShieldCheck, Filter } from 'lucide-react';
import { vendors } from '../../data/mockData';
import { Vendor } from '../../types';

export const AdminVendorsPage: React.FC = () => {
  const [vendorList, setVendorList] = useState<Vendor[]>(vendors);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleVerification = (vendorId: string) => {
    setVendorList(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, isOpen: !v.isOpen } : v))
    );
  };

  const filtered = vendorList.filter(v => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.address.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || v.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Merchant & Vendor Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Approve, review, and monitor verified store partners across all delivery clusters
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2.5 w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search stores by name, area, or zone..."
            className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto self-end">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none text-slate-700"
          >
            <option value="all">All Categories</option>
            <option value="restaurant">Restaurants</option>
            <option value="grocery">Groceries</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="bakery">Bakery</option>
          </select>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Merchant Store</th>
                <th className="p-4">Category</th>
                <th className="p-4">Cluster Zone</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(vendor => (
                <tr key={vendor.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vendor.logoImage || vendor.coverImage}
                        alt={vendor.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {vendor.name}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {vendor.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-600 capitalize">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F9541E] text-[10px] font-bold">
                      {vendor.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {vendor.zone}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-800">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      <span>{vendor.rating}</span>
                      <span className="text-slate-400 font-normal">({vendor.reviewsCount})</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        vendor.isOpen
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{vendor.isOpen ? 'Active Partner' : 'Suspended'}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleVerification(vendor.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      {vendor.isOpen ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
