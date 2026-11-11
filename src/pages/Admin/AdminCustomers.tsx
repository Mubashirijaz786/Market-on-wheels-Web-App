import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState([
    {
      id: 'usr_1',
      name: 'Mubashir',
      email: 'mubashir@example.com',
      phone: '+92 300 9876543',
      address: 'University Road, Sargodha',
      ordersCount: 14,
      totalSpent: 16400,
      joined: 'October 2024',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 'usr_2',
      name: 'Ahmed Malik',
      email: 'ahmed.malik@example.com',
      phone: '+92 300 1234567',
      address: 'Main Commercial Plaza, Club Road, Sargodha',
      ordersCount: 8,
      totalSpent: 9800,
      joined: 'January 2025',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 'usr_3',
      name: 'Fatima Zahra',
      email: 'fatima.z@example.com',
      phone: '+92 321 4455667',
      address: 'Gulberg III, Lahore',
      ordersCount: 22,
      totalSpent: 28500,
      joined: 'November 2024',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 'usr_4',
      name: 'Bilal Hassan',
      email: 'bilal.h@example.com',
      phone: '+92 333 7788990',
      address: 'DHA Phase 5, Lahore',
      ordersCount: 5,
      totalSpent: 6200,
      joined: 'February 2025',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    },
  ]);

  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Customer Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          View registered consumer accounts, order volume, and active delivery addresses
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search customers by name, email, or area..."
          className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Primary Address</th>
                <th className="p-4">Orders Placed</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(cust => (
                <tr key={cust.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {cust.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Joined {cust.joined}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">
                    <p className="flex items-center gap-1 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" /> {cust.email}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {cust.phone}
                    </p>
                  </td>
                  <td className="p-4 text-slate-700 font-medium">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {cust.address}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">
                    {cust.ordersCount} Orders
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">
                    Rs. {cust.totalSpent.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
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
