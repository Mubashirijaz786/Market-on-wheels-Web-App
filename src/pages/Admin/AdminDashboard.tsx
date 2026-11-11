import React from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { vendors, currentUser } from '../../data/mockData';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Admin Operations Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Hyperlocal commerce platform overview across Sargodha & Lahore clusters
        </p>
      </div>

      {/* Platform KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Active Merchants</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F9541E] flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{vendors.length} Stores</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Verified Partners
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Registered Users</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">1,248</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18 new today
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Orders Today</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">84 Orders</p>
          <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#F9541E]" /> 62% Multi-Vendor Baskets
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Platform GMV</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">Rs. 114,850</p>
          <p className="text-[11px] text-emerald-600 font-bold">COD & Digital</p>
        </div>
      </div>

      {/* Cluster Overview & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Clusters */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Active Hyperlocal Service Clusters
            </h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              All 4 Hubs Operational
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900">University Road (Hub 1)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-500">City: Sargodha • Central Zone A</p>
              <div className="flex justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 font-semibold">
                <span>12 Active Stores</span>
                <span>38 Orders Today</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900">Gulberg III (Hub 2)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-500">City: Lahore • Central Zone B</p>
              <div className="flex justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 font-semibold">
                <span>16 Active Stores</span>
                <span>28 Orders Today</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900">DHA Phase 5 (Hub 3)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-500">City: Lahore • East Zone A</p>
              <div className="flex justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 font-semibold">
                <span>10 Active Stores</span>
                <span>18 Orders Today</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900">Satellite Town (Hub 4)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-500">City: Sargodha • West Zone A</p>
              <div className="flex justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 font-semibold">
                <span>8 Active Stores</span>
                <span>12 Orders Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Navigation Quick Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Management Tools
          </h2>
          <div className="space-y-2.5">
            <Link
              to="/admin/vendors"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/70 border border-slate-200/80 hover:border-orange-200 transition-all text-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#F9541E] flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 group-hover:text-[#F9541E] transition-colors">
                    Merchant Directory
                  </p>
                  <p className="text-[11px] text-slate-400">Review & verify vendors</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin/customers"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 transition-all text-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Customer Accounts
                  </p>
                  <p className="text-[11px] text-slate-400">Manage user profiles</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/70 border border-slate-200/80 hover:border-purple-200 transition-all text-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Platform Orders
                  </p>
                  <p className="text-[11px] text-slate-400">Multi-vendor dispatch logs</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin/categories"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-200 transition-all text-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Categories & Catalogs
                  </p>
                  <p className="text-[11px] text-slate-400">Taxonomy & item counts</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
