import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Search,
  ShoppingCart,
  ChevronDown,
  Truck,
  User,
  LogOut,
  Clock,
  Menu,
  X,
  Store,
  ShieldCheck,
  Layers,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LocationModal } from './LocationModal';
import { featureFlags, setSupervisorDemoMode } from '../../config/featureFlags';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    logout,
    currentLocation,
    totalItemCount,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(featureFlags.supervisorDemoMode);

  const userRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const isVendorPortal = location.pathname.startsWith('/vendor');
  const isAdminPortal = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
        setIsPortalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const toggleDemoScope = () => {
    const nextState = !demoMode;
    setSupervisorDemoMode(nextState);
    setDemoMode(nextState);
    window.location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 select-none">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-3 sm:gap-6">
            {/* Logo matching reference image */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#F9541E] flex items-center justify-center text-white shadow-xs group-hover:scale-102 transition-transform">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Market <span className="text-[#F9541E]">on Wheels</span>
                  </span>
                </div>
              </Link>

              {/* Deliver to Location selector (Visible on Customer store) */}
              {!isVendorPortal && !isAdminPortal && (
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#F9541E] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider leading-none">
                      Deliver to
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[180px]">
                        {currentLocation.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Search Bar (Customer Store) or Portal Header */}
            {!isVendorPortal && !isAdminPortal ? (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden sm:flex flex-1 max-w-xl relative items-center"
              >
                <div className="relative w-full flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search for restaurants, groceries, pharmacies..."
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#F9541E] focus:ring-1 focus:ring-[#F9541E] transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-8 h-8 rounded-lg bg-[#F9541E] hover:bg-[#EA4A15] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    aria-label="Submit search"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Interface:
                </span>
                <span className="text-xs font-extrabold text-slate-800 px-3 py-1 rounded-full bg-slate-100">
                  {isVendorPortal ? '🏪 Vendor Merchant Portal' : '🛡️ Admin Operations Portal'}
                </span>
              </div>
            )}

            {/* Right Action Controls: Portal Switcher, Cart & User Menu */}
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              {/* Demo Portal Switcher Pill for Supervisor Presentation */}
              <div className="relative" ref={portalRef}>
                <button
                  type="button"
                  onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                >
                  {isVendorPortal ? (
                    <Store className="w-3.5 h-3.5 text-[#F9541E]" />
                  ) : isAdminPortal ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  ) : (
                    <Layers className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span className="hidden sm:inline">
                    {isVendorPortal
                      ? 'Vendor Portal'
                      : isAdminPortal
                      ? 'Admin Portal'
                      : 'Customer View'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isPortalDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Switch Role Interface
                    </p>
                    <Link
                      to="/"
                      onClick={() => setIsPortalDropdownOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        !isVendorPortal && !isAdminPortal
                          ? 'bg-orange-50 text-[#F9541E] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>Customer Website</span>
                      </div>
                      {!isVendorPortal && !isAdminPortal && <Check className="w-3.5 h-3.5" />}
                    </Link>

                    <Link
                      to="/vendor/dashboard"
                      onClick={() => setIsPortalDropdownOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isVendorPortal
                          ? 'bg-orange-50 text-[#F9541E] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4" />
                        <span>Vendor Portal</span>
                      </div>
                      {isVendorPortal && <Check className="w-3.5 h-3.5" />}
                    </Link>

                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsPortalDropdownOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isAdminPortal
                          ? 'bg-purple-50 text-purple-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Operations</span>
                      </div>
                      {isAdminPortal && <Check className="w-3.5 h-3.5" />}
                    </Link>
                  </div>
                )}
              </div>

              {/* Shopping Cart (Customer Store) */}
              {!isVendorPortal && !isAdminPortal && (
                <Link
                  to="/cart"
                  className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  title="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5 text-slate-700" />
                  {totalItemCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#F9541E] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                      {totalItemCount}
                    </span>
                  )}
                </Link>
              )}

              {/* User Profile Pill matching reference image */}
              <div className="relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.name || 'Mubashir'}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/30"
                  />
                  <span className="hidden sm:inline-block text-xs font-bold text-slate-800">
                    {user?.name || 'Mubashir'}
                  </span>
                  <ChevronDown className="hidden sm:inline-block w-3 h-3 text-slate-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">{user?.name || 'Mubashir'}</p>
                      <p className="text-[10px] text-slate-400">{user?.email || 'mubashir@example.com'}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" /> Profile & Addresses
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Clock className="w-4 h-4 text-slate-400" /> Order History
                    </Link>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Role Switcher
                      </p>
                      <Link
                        to="/vendor/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Store className="w-3.5 h-3.5 text-[#F9541E]" /> Vendor Portal
                      </Link>
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Admin Portal
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        type="button"
                        onClick={toggleDemoScope}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-[11px] font-semibold text-slate-500 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                        title="Toggle supervisor demo scope on/off"
                      >
                        <span>Demo Scope:</span>
                        <span className={`font-bold ${demoMode ? 'text-emerald-600' : 'text-blue-600'}`}>
                          {demoMode ? 'Gantt 9-14' : 'Full Web'}
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-slate-100 pt-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu trigger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};
