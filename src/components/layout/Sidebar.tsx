import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  HeartPulse,
  Croissant,
  Beef,
  Apple,
  GlassWater,
  PackageCheck,
  Grid,
  ShoppingCart,
  Sparkles,
  LayoutDashboard,
  Store,
  Package,
  Users,
  Layers,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { isFeatureEnabled } from '../../config/featureFlags';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { totalItemCount } = useApp();

  const isVendorPortal = location.pathname.startsWith('/vendor');
  const isAdminPortal = location.pathname.startsWith('/admin');

  // Customer navigation items
  const customerNavItems = [
    { name: 'Home', path: '/', icon: Home, exact: true },
    { name: 'Restaurants', path: '/vendors?category=restaurant', icon: UtensilsCrossed },
    { name: 'Groceries', path: '/vendors?category=grocery', icon: ShoppingBag },
    { name: 'Pharmacy', path: '/vendors?category=pharmacy', icon: HeartPulse },
    { name: 'Bakery', path: '/vendors?category=bakery', icon: Croissant },
    { name: 'Meat & Fish', path: '/vendors?category=meat', icon: Beef },
    { name: 'Fruits & Vegetables', path: '/vendors?category=fruits_vegetables', icon: Apple },
    { name: 'Beverages', path: '/vendors?category=beverages', icon: GlassWater },
    { name: 'Orders', path: '/orders', icon: PackageCheck },
    ...(isFeatureEnabled('aiChatbot')
      ? [{ name: 'AI Assistant', path: '/ai-assistant', icon: Sparkles }]
      : []),
    { name: 'More', path: '/categories', icon: Grid },
  ];

  // Vendor navigation items (Task 13)
  const vendorNavItems = [
    { name: 'Dashboard', path: '/vendor/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Menu & Products', path: '/vendor/products', icon: Package },
    { name: 'Incoming Orders', path: '/vendor/orders', icon: ShoppingBag },
    { name: 'Store Profile', path: '/vendor/profile', icon: Store },
  ];

  // Admin navigation items (Task 13)
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Merchants', path: '/admin/vendors', icon: Store },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Platform Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
  ];

  const currentNav = isVendorPortal
    ? vendorNavItems
    : isAdminPortal
    ? adminNavItems
    : customerNavItems;

  const isCartActive = location.pathname === '/cart';

  return (
    <aside className="w-56 shrink-0 hidden md:flex flex-col justify-between py-6 pr-2 sticky top-20 h-[calc(100vh-5rem)] select-none">
      <div className="space-y-4">
        {/* Portal Context Badge */}
        {isVendorPortal && (
          <div className="px-3 py-2 rounded-xl bg-orange-50 border border-orange-200/70 text-[#F9541E] text-xs font-bold flex items-center gap-2">
            <Store className="w-4 h-4" />
            <span>Vendor Portal</span>
          </div>
        )}
        {isAdminPortal && (
          <div className="px-3 py-2 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-700 text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
          </div>
        )}

        {/* Navigation list */}
        <nav className="space-y-1 overflow-y-auto no-scrollbar pr-1">
          {currentNav.map(item => {
            const Icon = item.icon;
            const isCategoryMatch =
              item.path.includes('category=') &&
              location.search.includes(item.path.split('?')[1]);
            const isExactMatch = item.exact && location.pathname === item.path && !location.search;
            const isPathMatch =
              !item.exact && !item.path.includes('?') && location.pathname.startsWith(item.path);

            const isActive = isExactMatch || isCategoryMatch || isPathMatch;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-[#F9541E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom context action */}
      <div className="pt-3 border-t border-slate-100">
        {isVendorPortal || isAdminPortal ? (
          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>
        ) : (
          <NavLink
            to="/cart"
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              isCartActive
                ? 'bg-[#F9541E] text-white shadow-xs'
                : 'bg-orange-50 text-[#F9541E] hover:bg-orange-100 border border-orange-200/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span>Cart</span>
            </div>
            {totalItemCount > 0 && (
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isCartActive ? 'bg-white text-[#F9541E]' : 'bg-[#F9541E] text-white'
                }`}
              >
                {totalItemCount}
              </span>
            )}
          </NavLink>
        )}
      </div>
    </aside>
  );
};
