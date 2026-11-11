import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User as UserIcon,
  MapPin,
  Clock,
  Heart,
  Bell,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { products } from '../../data/mockData';
import { ProductCard } from '../../components/products/ProductCard';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';

export const ProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const {
    user,
    logout,
    addresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
    orders,
    wishlist,
    notifications,
    markAllNotifsAsRead,
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile Edit fields
  const [name, setName] = useState(user?.name || 'Ahmed Malik');
  const [email, setEmail] = useState(user?.email || 'ahmed.malik@example.com');
  const [phone, setPhone] = useState(user?.phone || '+92 300 1234567');
  const [saveNotice, setSaveNotice] = useState(false);

  // Add Address Modal
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newLabel, setNewLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newArea, setNewArea] = useState('Gulberg III');
  const [newCity, setNewCity] = useState('Lahore');
  const [newNotes, setNewNotes] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2000);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;
    addAddress({
      label: newLabel,
      fullAddress: `${newStreet.trim()}, ${newArea}, ${newCity}`,
      area: newArea,
      city: newCity,
      notes: newNotes,
      isDefault: false,
    });
    setIsAddAddressOpen(false);
    setNewStreet('');
    setNewNotes('');
  };

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Customer Account & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal details, delivery locations, wishlist, and notification preferences.
        </p>
      </div>

      {/* Main Grid: Sidebar & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          {/* User Brief */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'Customer'}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500"
            />
            <div>
              <h3 className="font-extrabold text-base text-slate-900">{user?.name || 'Ahmed Malik'}</h3>
              <p className="text-xs text-slate-400">{user?.email || 'ahmed.malik@example.com'}</p>
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full inline-block mt-1">
                Verified Customer
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'profile', label: 'Personal Information', icon: UserIcon },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'orders', label: 'Order History', icon: Clock },
              { id: 'wishlist', label: `My Wishlist (${wishlist.length})`, icon: Heart },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings', label: 'Preferences & Security', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSearchParams({ tab: item.id });
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors pt-4 border-t border-slate-100"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* TAB 1: Profile Information */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500">Update your account identity details</p>
              </div>

              {saveNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  leftIcon={<UserIcon className="w-4 h-4" />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <Input
                  label="Mobile Phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4" />}
                />

                <Button type="submit" variant="primary" size="md" className="font-bold">
                  Save Changes
                </Button>
              </form>
            </div>
          )}

          {/* TAB 2: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Saved Addresses</h3>
                  <p className="text-xs text-slate-500">
                    Manage dropoff destinations for single-trip deliveries
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAddAddressOpen(true)}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add Address
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map(addr => {
                  const isDefault = selectedAddress.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDefault
                          ? 'border-brand-600 bg-brand-50/50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800">
                          {addr.label}
                        </span>
                        {isDefault && (
                          <span className="text-[10px] font-bold text-brand-700 bg-brand-200/50 px-2 py-0.5 rounded-full">
                            Active Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">
                        {addr.fullAddress}
                      </p>
                      {addr.notes && (
                        <p className="text-[11px] text-slate-400 mt-1 italic">
                          Notes: {addr.notes}
                        </p>
                      )}
                      {!isDefault && (
                        <button
                          type="button"
                          onClick={() => setSelectedAddress(addr)}
                          className="mt-3 text-xs font-bold text-brand-600 hover:underline block"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Order History</h3>
                  <p className="text-xs text-slate-500">Your recent multi-store purchases</p>
                </div>
                <Link to="/orders" className="text-xs font-bold text-brand-600 hover:underline">
                  Full Tracking View
                </Link>
              </div>

              <div className="space-y-3">
                {orders.map(o => (
                  <div
                    key={o.id}
                    className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <p className="font-extrabold text-slate-900">#{o.orderNumber}</p>
                      <p className="text-slate-500 mt-0.5">{o.createdAt} • {o.items.length} items</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">Rs. {o.total.toLocaleString()}</span>
                      <Link
                        to={`/tracking/${o.id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-[11px]"
                      >
                        Track
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Saved Wishlist Items</h3>
                <p className="text-xs text-slate-500">Products saved for rapid re-ordering</p>
              </div>

              {wishlistedProducts.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">Your wishlist is empty.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Notification Center</h3>
                  <p className="text-xs text-slate-500">Order alerts and promotional discounts</p>
                </div>
                <button
                  onClick={markAllNotifsAsRead}
                  className="text-xs text-brand-600 font-bold hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border text-xs ${
                      n.isRead ? 'bg-white border-slate-200' : 'bg-brand-50/60 border-brand-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-slate-900">{n.title}</h5>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-slate-600">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Preferences & Security</h3>
                <p className="text-xs text-slate-500">App settings and notifications toggle</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <p className="font-bold text-slate-900">SMS / WhatsApp Status Alerts</p>
                    <p className="text-slate-500 text-[11px]">Receive live updates when rider picks up</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-brand-600 w-4 h-4" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <p className="font-bold text-slate-900">AI Order Auto-Balance Prompt</p>
                    <p className="text-slate-500 text-[11px]">Suggest combined stores with cheaper delivery fees</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-brand-600 w-4 h-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        title="Add Delivery Address"
      >
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Address Label
            </label>
            <div className="flex gap-2">
              {(['Home', 'Work', 'Other'] as const).map(l => (
                <button
                  type="button"
                  key={l}
                  onClick={() => setNewLabel(l)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    newLabel === l
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Street Address / House No."
            placeholder="e.g. House 14, Street 3, Block H"
            value={newStreet}
            onChange={e => setNewStreet(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Area / Sector"
              value={newArea}
              onChange={e => setNewArea(e.target.value)}
              required
            />
            <Input
              label="City"
              value={newCity}
              onChange={e => setNewCity(e.target.value)}
              required
            />
          </div>

          <Input
            label="Delivery Notes (Optional)"
            placeholder="e.g. Near round-about, ring bell"
            value={newNotes}
            onChange={e => setNewNotes(e.target.value)}
          />

          <Button type="submit" variant="primary" size="md" className="w-full font-bold">
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
};
