import React from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";

interface ProductSpecs {
  monitor_size?: string;
  probe_ports?: number;
  application?: string;
  type?: string;
  transducers?: string;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  specs: Prisma.JsonValue;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onCompareToggle?: (id: number, checked: boolean) => void;
  isCompared?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCompareToggle,
  isCompared = false,
}) => {
  const specs = product.specs as ProductSpecs;

  const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompareToggle?.(product.id, e.target.checked);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 p-5 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-blue-500/5">
      {/* Decorative Top Glow */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div>
        {/* Placeholder Graphic */}
        <div className="aspect-[16/10] w-full rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-700 text-xs font-mono relative overflow-hidden group-hover:border-slate-800 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="z-10 tracking-widest uppercase opacity-40 text-[10px]">{product.brand} - {product.name}</span>
        </div>

        {/* Brand & Title */}
        <div className="mt-4">
          <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase">
            {product.brand}
          </span>
          <h3 className="text-base font-bold text-slate-100 mt-1 leading-snug tracking-tight">
            {product.name}
          </h3>
        </div>

        {/* Specs summary */}
        <div className="mt-4 space-y-2 border-t border-b border-slate-850/50 py-3 text-xs text-slate-400">
          {specs.application && (
            <div className="flex justify-between">
              <span className="text-slate-500">Uygulama:</span>
              <span className="font-medium text-slate-300 text-right">{specs.application}</span>
            </div>
          )}
          {specs.monitor_size && (
            <div className="flex justify-between">
              <span className="text-slate-500">Ekran:</span>
              <span className="font-medium text-slate-300 text-right">{specs.monitor_size}</span>
            </div>
          )}
          {specs.probe_ports && (
            <div className="flex justify-between">
              <span className="text-slate-500">Prob Portu:</span>
              <span className="font-medium text-slate-300 text-right">{specs.probe_ports} Aktif</span>
            </div>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-850">
        {/* Compare Checkbox */}
        <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none hover:text-slate-200 transition-colors">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={handleCompareChange}
            className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer"
          />
          Karşılaştır
        </label>

        {/* Detail Link */}
        <Link
          href={`/urunler/${product.category}/${product.slug}`}
          className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1 group/link"
        >
          Detay 
          <span className="inline-block transform transition-transform group-hover/link:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};
