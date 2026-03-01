'use client';
import { useState } from 'react';
import { inventoryService } from '../services/api';
import { Package, TrendingUp, AlertCircle } from 'lucide-react';
import { useInventory } from '@/hooks/useInventory';
import { RawMaterial } from '@/types/inventory';
import InventoryTable from '@/components/InventoryTable';
import SuggestionCard from '@/components/SuggestionCard';
import ProductModal from '@/components/ProductModal';
import MaterialModal from '@/inventory/MaterialModal';
import Header from '@/components/Header';

export default function Dashboard() {
  const { materials, suggestions, isLoading, error, refreshData } = useInventory();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);


  const handleSaveMaterial = async (data: RawMaterial) => {
    try {
      data.id
        ? await inventoryService.updateMaterial(data.id, data)
        : await inventoryService.createMaterial(data);
      await refreshData();
      setIsMaterialModalOpen(false);
    } catch (error) {
      alert("Error saving material.");
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    if (confirm("Do you really want to delete this material?")) {
      try {
        await inventoryService.deleteMaterial(id);
        await refreshData();
      } catch (error) {
        alert("It is not possible to delete material that is being used in a product..");
      }
    }
  };

  const handleDeleteProduct = async (name: string) => {
    if (confirm(`Delete the product "${name}" This will release the materials back into stock. Continue?`)) {
      try {
        await inventoryService.deleteProduct(name);
        await refreshData();
      } catch {
        alert("Error deleting product.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-600 font-medium">Loading AutoFlex data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header
        onAddMaterial={() => { setEditingMaterial(null); setIsMaterialModalOpen(true); }}
        onAddProduct={() => setIsProductModalOpen(true)}
      />

      <main className="max-w-full mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Package size={24} className="text-blue-500" /> Inventory Status
            </h2>
            {error && (
              <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                <AlertCircle size={14} /> {error}
              </span>
            )}
          </div>
          <InventoryTable
            materials={materials}
            onEdit={(m) => { setEditingMaterial(m); setIsMaterialModalOpen(true); }}
            onDelete={handleDeleteMaterial}
          />
        </section>
        <aside className="space-y-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <TrendingUp size={20} className="text-blue-500" /> Smart Suggestions
          </h2>
          <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
            {suggestions.length > 0 ? (
              suggestions.map((s, idx) => (
                <SuggestionCard
                  key={idx}
                  suggestion={s}
                  onDelete={handleDeleteProduct}
                />
              ))
            ) : (
              <div className="text-center p-8 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 italic">
                No suggestions available at the moment
              </div>
            )}
          </div>
        </aside>
      </main>
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        materials={materials}
        onSave={async (d) => {
          await inventoryService.createProduct(d);
          await refreshData();
          setIsProductModalOpen(false);
        }}
      />
      <MaterialModal
        isOpen={isMaterialModalOpen}
        onClose={() => setIsMaterialModalOpen(false)}
        onSave={handleSaveMaterial}
        initialData={editingMaterial}
      />
    </div>
  );
}