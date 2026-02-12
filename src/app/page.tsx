'use client';
import { useState, useEffect, useCallback } from 'react';
import { inventoryService } from '../services/api';
import { RawMaterial, ProductionSuggestion } from '@/types/inventory';
import { Package, TrendingUp, AlertCircle, Plus, Edit3, Trash2 } from 'lucide-react';
import ProductModal from '@/components/ProductModal';
import MaterialModal from '@/inventory/MaterialModal';

export default function Dashboard() {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [suggestions, setSuggestions] = useState<ProductionSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const materialsData = await inventoryService.getMaterials();
      setMaterials(materialsData);

      try {
        const suggestionsData = await inventoryService.getProductionSuggestions();
        setSuggestions(suggestionsData);
      } catch (suggErr) {
        console.error("Error in suggestion calculation:", suggErr);
        setSuggestions([]);
      }
    } catch (err) {
      setError("Server connection error");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleSaveMaterial = async (materialData: RawMaterial) => {
    try {
      if (materialData.id) {
        await inventoryService.updateMaterial(materialData.id, materialData);
      } else {
        await inventoryService.createMaterial(materialData);
      }
      await refreshData();
      setIsMaterialModalOpen(false);
      setEditingMaterial(null);
    } catch (err) {
      alert("Error saving material.");
    }
  };
  const handleDeleteMaterial = async (id: number) => {
    if (confirm("Delete this material?")) {
      try {
        await inventoryService.deleteMaterial(id);
        await refreshData();
      } catch (err) {
        alert("Cannot delete material currently in use.");
      }
    }
  };
  const handleSaveProduct = async (productData: any) => {
    try {
      await inventoryService.createProduct(productData);
      setIsProductModalOpen(false);
      setTimeout(() => refreshData(), 600);
    } catch (err) {
      alert("Error creating product.");
    }
  };
  const handleDeleteProduct = async (name: string) => {
    if (confirm(`Do you really want to delete the product "${name}"? This will release the materials.`)) {
      try {
        await inventoryService.deleteProduct(name);
        await refreshData();
      } catch (err) {
        alert("Error deleting product.");
      }
    }
  };
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-slate-50 text-slate-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="font-medium">Connecting to AutoFlex Server...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-30 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white font-bold">AF</div>
          <h1 className="text-xl font-bold text-slate-800">AutoFlex <span className="text-blue-600">Materials</span></h1>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => { setEditingMaterial(null); setIsMaterialModalOpen(true); }}
            className="flex-1 md:flex-none text-slate-600 bg-slate-100 px-4 py-2 rounded-xl font-semibold hover:bg-slate-200 transition-all text-sm"
          >
            + Material
          </button>
          <button
            onClick={() => setIsProductModalOpen(true)}
            className="flex-1 md:flex-none bg-slate-900 text-white px-4 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all text-sm"
          >
            <Plus size={18} /> New Product
          </button>
        </div>
      </header>
      <main className="max-w-1600px mx-auto px-4 md:px-8 mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <section className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Package size={24} className="text-blue-500 " /> Inventory Status
            </h2>
            {error && <span className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertCircle size={14} /> {error}</span>}
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-550px">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Material</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {materials
                    .slice()
                    .sort((a, b) => b.stockQuantity - a.stockQuantity)
                    .map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 font-bold text-slate-900">{m.name}</td>
                        <td className="px-6 py-4 text-slate-600">{m.stockQuantity} Units</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${m.stockQuantity > 10 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {m.stockQuantity > 10 ? 'In Stock' : 'Low Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditingMaterial(m); setIsMaterialModalOpen(true); }} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit3 size={16} /></button>
                            <button onClick={() => handleDeleteMaterial(m.id!)} className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <aside className="lg:sticky lg:top-24 flex flex-col space-y-6 order-1 lg:order-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <TrendingUp size={20} className="text-blue-500" /> Smart Suggestions
          </h2>
          <div className="space-y-4 max-h-550px lg:max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar pb-10">
            {suggestions.length > 0 ? (
              suggestions.map((s, idx) => (
                <div key={idx} className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
                  <button
                    onClick={() => handleDeleteProduct(s.productName)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex justify-between items-start mb-3 pr-8">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                      {s.productName}
                    </h3>
                    <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg">
                      ${s.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 tracking-widest">Recipe / Materials:</p>
                    <div className="flex flex-wrap gap-2">
                      {s.materialsUsed && s.materialsUsed.length > 0 ? (
                        s.materialsUsed.map((mat, mIdx) => (
                          <span key={mIdx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold border border-blue-100 uppercase">
                            {mat.quantity}x {mat.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">No materials defined in Database</span>
                      )}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-black text-slate-900">{s.quantityPossible}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Units Possible</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Pot. Revenue</p>
                      <p className="font-bold text-slate-700 text-lg">
                        ${(s.quantityPossible * s.totalPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-100 p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center text-slate-400 italic text-sm">
                No suggestions available.
              </div>
            )}
          </div>
        </aside>
      </main>

      <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} onSave={handleSaveProduct} materials={materials} />
      <MaterialModal isOpen={isMaterialModalOpen} onClose={() => setIsMaterialModalOpen(false)} onSave={handleSaveMaterial} initialData={editingMaterial} />
    </div>
  );
}