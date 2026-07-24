"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export interface ProductSpecs {
  screenSize?: string;
  probePorts?: number;
  portable?: boolean;
  applicationAreas?: string[];
  priceSegment?: string;
  highlights?: string[];
}

export interface ProductItem {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: ProductSpecs;
}

interface ProductCardProps {
  product: ProductItem;
  onToggleCompare?: (id: number) => void;
  isCompared?: boolean;
}

export default function ProductCard({
  product,
  onToggleCompare,
  isCompared = false,
}: ProductCardProps) {
  const [compared, setCompared] = useState(isCompared);

  useEffect(() => {
    setCompared(isCompared);
  }, [isCompared]);

  const handleCompareClick = () => {
    const nextState = !compared;
    setCompared(nextState);
    trackEvent("compare_toggle", {
      productId: product.id,
      productName: `${product.brand} ${product.name}`,
      action: nextState ? "add" : "remove",
    });
    if (onToggleCompare) {
      onToggleCompare(product.id);
    }
  };

  const specs = product.specs || {};
  const highlights = specs.highlights || [];

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/90 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between">
      <div>
        {/* Top Header & Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 ring-1 ring-inset ring-blue-500/20">
            {product.brand}
          </span>
          {specs.priceSegment && (
            <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
              {specs.priceSegment}
            </span>
          )}
        </div>

        {/* Visual Slot */}
        <div className="relative aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 overflow-hidden mb-5 flex items-center justify-center group-hover:border-slate-700 transition-colors">
          <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
            <svg
              className="w-10 h-10 text-slate-600 group-hover:text-blue-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <span className="text-xs font-medium tracking-wide">
              {product.brand} {product.name}
            </span>
          </div>
          {specs.portable && (
            <span className="absolute top-3 right-3 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 border border-indigo-500/30">
              Taşınabilir (POC)
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Spec Chips */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
          {specs.screenSize && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 font-medium text-slate-300 border border-slate-750">
              🖥️ {specs.screenSize}
            </span>
          )}
          {specs.probePorts !== undefined && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 font-medium text-slate-300 border border-slate-750">
              🔌 {specs.probePorts} Port
            </span>
          )}
        </div>

        {/* Spec Highlights List */}
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
            {highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300 hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={compared}
            onChange={handleCompareClick}
            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <span>Karşılaştır</span>
        </label>

        <Link
          href={`/urunler/${product.category}/${product.slug}`}
          onClick={() => {
            trackEvent("product_card_click", {
              productId: product.id,
              productSlug: product.slug,
              productName: `${product.brand} ${product.name}`,
            });
          }}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors border border-slate-700/60"
        >
          <span>Detay</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
