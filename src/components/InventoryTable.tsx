import { Edit3, Trash2 } from 'lucide-react';
import { RawMaterial } from '@/types/inventory';

interface InventoryTableProps {
    materials: RawMaterial[];
    onEdit: (material: RawMaterial) => void;
    onDelete: (id: number) => void;
}

export default function InventoryTable({ materials, onEdit, onDelete }: InventoryTableProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[550px]">
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
                                            <button onClick={() => onEdit(m)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit3 size={16} /></button>
                                            <button onClick={() => onDelete(m.id!)} className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}