import React, { useState } from 'react';
import { Plus, Search, CheckCircle2, XCircle } from 'lucide-react';
import { products, vendors } from '../../data/mockData';
import { Product } from '../../types';

export const VendorProductsPage: React.FC = () => {
  const currentVendor = vendors[0]; // Pizza Palace
  const initialProducts = products.filter(p => p.vendorId === currentVendor.id);

  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState(currentVendor.category);
  const [newDescription, setNewDescription] = useState('');

  const toggleStock = (productId: string) => {
    setProductList(prev =>
      prev.map(p => (p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice.trim()) return;

    const newProd: Product = {
      id: `prod_custom_${Date.now()}`,
      vendorId: currentVendor.id,
      vendorName: currentVendor.name,
      name: newName.trim(),
      description: newDescription.trim() || 'Freshly prepared item',
      price: parseFloat(newPrice) || 500,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      category: newCategory,
      categoryName: currentVendor.categoryName,
      isAvailable: true,
      unit: '1 item',
      rating: 5.0,
      inStock: 25,
    };

    setProductList([newProd, ...productList]);
    setNewName('');
    setNewPrice('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  const filteredProducts = productList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Menu & Products
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your store's live menu, prices, and stock availability
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9541E] hover:bg-[#EA4A15] text-white font-bold text-xs shadow-sm transition-all active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search items by name..."
          className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Product Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-600 uppercase text-[10px]">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">
                    Rs. {product.price}
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => toggleStock(product.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                        product.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {product.isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Out of Stock</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Live on Store
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Add Item to Menu
            </h3>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Item Title</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Chicken Fajita Pizza"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#F9541E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Price (PKR)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  placeholder="e.g. 850"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#F9541E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Fresh ingredients, toppings, or size details..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#F9541E]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F9541E] hover:bg-[#EA4A15] text-white font-bold cursor-pointer shadow-xs"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
