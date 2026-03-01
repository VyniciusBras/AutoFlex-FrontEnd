import { Trash2 } from 'lucide-react';
import { ProductionSuggestion } from '@/types/inventory';

interface SuggestionCardProps {
    suggestion: ProductionSuggestion;
    onDelete: (name: string) => void;
}

export default function SuggestionCard({ suggestion: s, onDelete }: SuggestionCardProps) {
    return (
        <div className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
            <button onClick={() => onDelete(s.productName)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                <Trash2 size={18} />
            </button>

            <div className="flex justify-between items-start mb-3 pr-8">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{s.productName}</h3>
                <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg">${s.totalPrice.toFixed(2)}</span>
            </div>

            <div className="mb-4">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 tracking-widest">Recipe / Materials:</p>
                <div className="flex flex-wrap gap-2">
                    {s.materialsUsed?.length > 0 ? (
                        s.materialsUsed.map((mat, mIdx) => (
                            <span key={mIdx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold border border-blue-100 uppercase">
                                {mat.quantity}x {mat.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-slate-400 text-[10px] italic">No materials defined</span>
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
                    <p className="font-bold text-slate-700 text-lg">${(s.quantityPossible * s.totalPrice).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}