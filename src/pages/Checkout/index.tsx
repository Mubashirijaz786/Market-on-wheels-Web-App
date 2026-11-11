import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Truck,
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle2,
  ShieldCheck,
  Plus,
  ArrowLeft,
  Store,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    vendorGroups,
    deliveryCalculation,
    cartSubtotal,
    cartTotal,
    addresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
    createOrder,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet'>('cod');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Add Address Modal state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newLabel, setNewLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newArea, setNewArea] = useState('Gulberg III');
  const [newCity, setNewCity] = useState('Lahore');
  const [newNotes, setNewNotes] = useState('');

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      const order = createOrder(paymentMethod, deliveryNotes);
      setIsPlacingOrder(false);
      navigate(`/orders/success/${order.id}`);
    }, 900);
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
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

  const finalOrderTotal = cartTotal + 40;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button & Heading */}
      <div className="pb-6 border-b border-slate-200">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Checkout & Finalize Multi-Store Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your dropoff location and unified delivery details before confirming.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Delivery Address */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  1. Delivery Address
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddAddressOpen(true)}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {addresses.map(addr => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {addr.label}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {addr.fullAddress}
                    </p>
                    {addr.notes && (
                      <p className="text-[11px] text-slate-400 mt-1 italic">
                        Note: {addr.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Delivery Instructions */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Special Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={e => setDeliveryNotes(e.target.value)}
                placeholder="e.g. Ring the bell twice, leave with security guard, call before arriving..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Section 2: Combined Multi-Vendor Route Preview */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  2. Single Rider Dispatch Plan
                </h3>
                <p className="text-xs text-emerald-800">
                  {vendorGroups.length} pickups consolidated into 1 thermal transport bag
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {vendorGroups.map((vg, idx) => (
                <div
                  key={vg.vendorId}
                  className="p-3.5 rounded-2xl bg-white border border-emerald-100 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 font-extrabold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{vg.vendorName}</p>
                      <p className="text-[11px] text-slate-500">
                        {vg.items.length} item{vg.items.length > 1 ? 's' : ''} • Zone: {vg.vendorZone}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-800">
                    Rs. {vg.vendorSubtotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-white border border-emerald-100 text-xs text-slate-600 flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-600 shrink-0" />
              <span>
                Estimated arrival in <strong>~{deliveryCalculation.estimatedTotalMinutes} minutes</strong> from order confirmation.
              </span>
            </div>
          </div>

          {/* Section 3: Payment Options (Mock UI) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <Banknote className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                3. Payment Method (Prototype Simulation)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-5 h-5 text-brand-600" />
                  {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </div>
                <span className="font-bold text-xs text-slate-900">Cash on Delivery (COD)</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Pay rider upon delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  paymentMethod === 'card'
                    ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </div>
                <span className="font-bold text-xs text-slate-900">Credit / Debit Card</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Simulated Card Gateway</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  paymentMethod === 'wallet'
                    ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Wallet className="w-5 h-5 text-amber-600" />
                  {paymentMethod === 'wallet' && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </div>
                <span className="font-bold text-xs text-slate-900">Mobile Wallet</span>
                <span className="text-[10px] text-slate-400 mt-0.5">EasyPaisa / JazzCash</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 pb-3 border-b border-slate-100">
              Order Breakdown
            </h3>

            {/* List of items preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1">
              {cart.map(item => (
                <div key={item.productId} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-800 truncate">{item.productName}</p>
                    <p className="text-[10px] text-slate-400">
                      {item.quantity} × Rs. {item.price} • {item.vendorName}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Costs calculation */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Products Subtotal:</span>
                <span className="font-bold text-slate-800">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Multi-Store Combined Delivery:</span>
                <span className="font-bold text-slate-800">
                  Rs. {deliveryCalculation.totalDeliveryFee}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee:</span>
                <span className="font-bold text-slate-800">Rs. 40</span>
              </div>

              {deliveryCalculation.savingsVsIndividual > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Consolidation Discount:</span>
                  <span>- Rs. {deliveryCalculation.savingsVsIndividual}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="text-2xl text-brand-700">
                  Rs. {finalOrderTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full text-base font-extrabold shadow-md hover:shadow-lg mt-4"
              isLoading={isPlacingOrder}
              onClick={handlePlaceOrder}
            >
              Place Mock Order (Rs. {finalOrderTotal.toLocaleString()})
            </Button>

            <div className="text-center pt-2 text-[11px] text-slate-400">
              By placing order, you confirm the multi-store delivery schedule.
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        title="Add Delivery Address"
      >
        <form onSubmit={handleSaveNewAddress} className="space-y-4">
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
            Save Address & Use
          </Button>
        </form>
      </Modal>
    </div>
  );
};
