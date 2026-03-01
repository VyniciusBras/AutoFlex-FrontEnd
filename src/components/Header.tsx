import { Plus } from 'lucide-react';

interface HeaderProps {
    onAddMaterial: () => void;
    onAddProduct: () => void;
}

export default function Header({ onAddMaterial, onAddProduct }: HeaderProps) {
    return (
        <header className="bg-white border-b p-4 md:px-8 flex flex-col md:flex-row justify-between items-center sticky top-0 z-30 shadow-sm gap-4">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg text-white font-bold">
                    AF
                </div>
                <h1 className="text-xl font-bold text-slate-800">
                    AutoFlex <span className="text-blue-600">Materials</span>
                </h1>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                <button
                    onClick={onAddMaterial}
                    className="flex-1 md:flex-none text-slate-600 bg-slate-100 px-4 py-2 rounded-xl font-semibold hover:bg-slate-200 transition-all text-sm"
                >
                    + Material
                </button>
                <button
                    onClick={onAddProduct}
                    className="flex-1 md:flex-none bg-slate-900 text-white px-4 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all text-sm"
                >
                    <Plus size={18} /> New Product
                </button>
            </div>
        </header>
    );
}