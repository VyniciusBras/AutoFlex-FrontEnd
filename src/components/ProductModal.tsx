'use client';
import { useState } from 'react';
import { RawMaterial } from '@/types/inventory';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: any) => void;
    materials: RawMaterial[];
}

export default function ProductModal({ isOpen, onClose, onSave, materials }: ProductModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedCompositions, setSelectedCompositions] = useState<any[]>([]);

    if (!isOpen) return null;

    const addMaterialRow = () => {
        setSelectedCompositions([...selectedCompositions, { rawMaterial: { id: "" }, quantityRequired: "" }]);
    };

    const handleSave = () => {
        const validCompositions = selectedCompositions
            .filter(comp => comp.rawMaterial.id && Number(comp.quantityRequired) > 0)
            .map(comp => ({
                rawMaterial: { id: Number(comp.rawMaterial.id) },
                quantityRequired: Number(comp.quantityRequired)
            }));

        if (!name.trim()) {
            alert("Please enter a product name.");
            return;
        }

        if (!price || parseFloat(price) <= 0) {
            alert("Please enter a valid price.");
            return;
        }

        if (validCompositions.length === 0) {
            alert("Please add at least one material with a quantity greater than zero.");
            return;
        }

        onSave({
            name: name.trim(),
            price: parseFloat(price),
            compositions: validCompositions
        });
        setName('');
        setPrice('');
        setSelectedCompositions([]);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-800">New Product</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} className="text-slate-600" />
                    </button>
                </div>

                <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Name</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="text-slate-900 font-bold w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/30"
                                placeholder="e.g. Iron Axe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price ($)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className="text-slate-900 font-bold w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/30"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recipe / Compositions</label>
                            <button
                                type="button"
                                onClick={addMaterialRow}
                                className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
                            >
                                <Plus size={16} /> Add Material
                            </button>
                        </div>

                        <div className="space-y-3">
                            {selectedCompositions.map((comp, idx) => (
                                <div key={idx} className="flex gap-3 items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex-1">
                                        <select
                                            className="w-full bg-white text-slate-900 font-bold px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                                            value={comp.rawMaterial.id}
                                            onChange={(e) => {
                                                const newComps = [...selectedCompositions];
                                                newComps[idx].rawMaterial.id = e.target.value;
                                                setSelectedCompositions(newComps);
                                            }}
                                        >
                                            <option value="" disabled>Select Material</option>
                                            {materials.map(m => (
                                                <option key={m.id} value={m.id}>{m.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-28">
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            value={comp.quantityRequired}
                                            className="w-full bg-white text-slate-900 font-bold px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={(e) => {
                                                const newComps = [...selectedCompositions];
                                                newComps[idx].quantityRequired = e.target.value;
                                                setSelectedCompositions(newComps);
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedCompositions(selectedCompositions.filter((_, i) => i !== idx))}
                                        className="text-rose-500 p-2.5 hover:bg-rose-100 rounded-xl transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-50/80 border-t border-slate-100 flex gap-4">
                    <button type="button" onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-all">Cancel</button>
                    <button type="button" onClick={handleSave} className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Create Product</button>
                </div>
            </div>
        </div>
    );
}