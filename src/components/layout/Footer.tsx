import React from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  Store,
} from 'lucide-react';
import { isFeatureEnabled } from '../../config/featureFlags';

export const Footer: React.FC = () => {
  const showAI = isFeatureEnabled('aiChatbot');

  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-600 pt-10 pb-8 mt-14 select-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Value Highlights (Clean, light, modern cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-8 border-b border-slate-100 mb-8">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F9541E] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-xs sm:text-sm">One Combined Delivery</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                Order pizza, burgers, groceries, and medicine simultaneously. A single rider collects all stops.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-xs sm:text-sm">Single Consolidated Fee</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                Pay standard delivery once with unified dispatch savings instead of separate rider charges.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              {showAI ? <Sparkles className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-xs sm:text-sm">
                {showAI ? 'Smart AI Assistant' : 'Express 30-Min Arrival'}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                {showAI
                  ? 'Natural shopping lists automatically converted into a multi-store basket ready for your review.'
                  : 'Optimized local courier dispatch brings your multi-store packages straight to your doorstep.'}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 text-xs">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-2.5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F9541E] flex items-center justify-center text-white shadow-xs">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Market <span className="text-[#F9541E]">on Wheels</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed text-xs">
              Hyperlocal commerce platform connecting neighbourhood restaurants, supermarkets, pharmacies, and bakeries into a single delivery experience.
            </p>
            <div className="flex items-center gap-2 text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#F9541E]" />
              <span>University Road, Sargodha</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h5 className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">Marketplace</h5>
            <ul className="space-y-1.5 text-slate-500">
              <li><Link to="/vendors?category=restaurant" className="hover:text-[#F9541E] transition-colors">Restaurants</Link></li>
              <li><Link to="/vendors?category=grocery" className="hover:text-[#F9541E] transition-colors">Groceries</Link></li>
              <li><Link to="/vendors?category=pharmacy" className="hover:text-[#F9541E] transition-colors">Pharmacy</Link></li>
              <li><Link to="/vendors?category=bakery" className="hover:text-[#F9541E] transition-colors">Bakery</Link></li>
              <li><Link to="/categories" className="hover:text-[#F9541E] transition-colors">All Categories</Link></li>
            </ul>
          </div>

          {/* Customer */}
          <div className="space-y-2.5">
            <h5 className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">Portals & Account</h5>
            <ul className="space-y-1.5 text-slate-500">
              <li><Link to="/orders" className="hover:text-[#F9541E] transition-colors">My Orders</Link></li>
              <li><Link to="/cart" className="hover:text-[#F9541E] transition-colors">Shopping Cart</Link></li>
              <li><Link to="/profile" className="hover:text-[#F9541E] transition-colors">Account Settings</Link></li>
              <li><Link to="/vendor/dashboard" className="text-slate-700 font-bold hover:text-[#F9541E] transition-colors">Vendor Portal</Link></li>
              <li><Link to="/admin/dashboard" className="text-slate-700 font-bold hover:text-[#F9541E] transition-colors">Admin Operations</Link></li>
              {showAI && (
                <li><Link to="/ai-assistant" className="text-[#F9541E] hover:text-[#EA4A15] font-bold">AI Assistant</Link></li>
              )}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-2.5">
            <h5 className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">Service Clusters</h5>
            <ul className="space-y-1.5 text-slate-500">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>University Road, Sargodha</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Gulberg III, Lahore</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>DHA Phase 5, Lahore</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Model Town, Lahore</li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Legal Row */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Market on Wheels. Final Year Project.</p>
          <p>Multi-Vendor Hyperlocal Delivery System</p>
        </div>
      </div>
    </footer>
  );
};
