'use client';
import { useState, useEffect } from 'react';
import { RawMaterial } from '@/types/inventory';
import { X } from 'lucide-react';

interface MaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (material: RawMaterial) => void;
    initialData?: RawMaterial | null;
}

export default function MaterialModal({ isOpen, onClose, onSave, initialData }: MaterialModalProps) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setQuantity(initialData.stockQuantity.toString());
        } else {
            setName('');
            setQuantity('');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">{initialData ? 'Edit Material' : 'New Material'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase">Material Name</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                            placeholder="e.g. Steel"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase">Stock Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="p-6 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Cancel</button>
                    <button
                        onClick={() => onSave({ id: initialData?.id, name, stockQuantity: parseFloat(quantity) })}
                        className="flex-1 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
                    >
                        {initialData ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}