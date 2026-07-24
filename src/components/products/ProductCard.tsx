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
    <div className="group relative rounded border border-slate-300 bg-white p-5 transition-all duration-300 hover:border-cyan-600 hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Top Header & Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center text-xs font-mono-tech font-bold text-cyan-800 uppercase tracking-wide">
            {product.brand}
          </span>
          {specs.priceSegment && (
            <span className="text-xs font-mono-tech font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
              {specs.priceSegment}
            </span>
          )}
        </div>

        {/* Visual Telemetry Slot */}
        <div className="relative aspect-[16/10] w-full rounded bg-slate-950 border border-slate-800 overflow-hidden mb-4 flex items-center justify-center group-hover:border-cyan-600 transition-colors">
          <div className="flex flex-col items-center justify-center gap-1.5 text-slate-400 p-4 text-center">
            <div className="h-8 w-8 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-xs font-mono-tech">
              USG
            </div>
            <span className="text-xs font-mono-tech font-bold text-white tracking-wide">
              {product.brand} {product.name}
            </span>
          </div>
          {specs.portable && (
            <span className="absolute top-2.5 right-2.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono-tech font-bold px-2 py-0.5 border border-cyan-800">
              POC Taşınabilir
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-display text-xl font-bold text-slate-950 tracking-tight group-hover:text-cyan-700 transition-colors">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Spec Chips */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono-tech text-slate-700">
          {specs.screenSize && (
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 font-medium border border-slate-200">
              🖥️ {specs.screenSize}
            </span>
          )}
          {specs.probePorts !== undefined && (
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 font-medium border border-slate-200">
              🔌 {specs.probePorts} Port
            </span>
          )}
        </div>

        {/* Spec Highlights List */}
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs font-mono-tech text-slate-600">
            {highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3.5 gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono-tech font-semibold text-slate-700 hover:text-slate-950 transition-colors">
          <input
            type="checkbox"
            checked={compared}
            onChange={handleCompareClick}
            className="h-4 w-4 rounded border-slate-300 bg-white text-cyan-600 focus:ring-0 cursor-pointer"
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
          className="inline-flex items-center gap-1 rounded bg-slate-950 hover:bg-cyan-700 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors border border-slate-800"
        >
          <span>Detay</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
