"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export interface ProductSpecs {
  screenSize?: string;
  probePorts?: number;
  portable?: boolean;
  applicationAreas?: string[];
  priceSegment?: string;
  highlights?: string[];
  beamformer?: string;
  elastography?: boolean;
  transducerType?: string;
  imageUrl?: string;
}

export interface ProductItem {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: ProductSpecs;
  previewVideoUrl?: string | null;
}

interface ProductCardProps {
  product: ProductItem;
  onToggleCompare?: (id: number) => void;
  isCompared?: boolean;
}

// Brand SVG map helper
const BRAND_LOGO_MAP: Record<string, string> = {
  "ge healthcare": "/brands/ge.svg",
  "ge": "/brands/ge.svg",
  "philips": "/brands/philips.svg",
  "samsung medison": "/brands/samsung.svg",
  "samsung": "/brands/samsung.svg",
  "siemens healthineers": "/brands/siemens.svg",
  "siemens": "/brands/siemens.svg",
  "canon medical": "/brands/canon.svg",
  "canon": "/brands/canon.svg",
  "mindray": "/brands/mindray.svg",
};

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
  const brandKey = (product.brand || "").toLowerCase().trim();
  const brandLogoPath = BRAND_LOGO_MAP[brandKey];

  return (
    <div
      className="bg-white rounded-card border border-border-subtle card-premium group relative p-5 flex flex-col justify-between hover:border-brand-teal transition-all duration-200"
    >
      <div>
        {/* Top Section: Clean Product Graphic Header */}
        <div className="aspect-[4/3] bg-surface-light rounded-lg overflow-hidden relative mb-4 flex items-center justify-center border border-border-subtle group-hover:border-brand-teal/40 transition-colors p-4">
          {/* Status Badge Overlay */}
          {specs.priceSegment && (
            <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 bg-brand-dark/80 text-white text-[10px] font-mono-tech font-bold rounded backdrop-blur-xs">
              {specs.priceSegment}
            </div>
          )}

          {/* Clean Studio Product Backdrop with Device Image or Brand Logo */}
          <div className="w-full h-full flex flex-col items-center justify-center text-center relative">
            {specs.imageUrl ? (
              <img
                src={specs.imageUrl}
                alt={`${product.brand} ${product.name}`}
                className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
              />
            ) : brandLogoPath ? (
              <Image
                src={brandLogoPath}
                alt={`${product.brand} logo`}
                width={130}
                height={48}
                className="max-h-12 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="text-xl font-mono-tech font-bold text-text-primary uppercase tracking-wide">
                {product.brand}
              </span>
            )}
            {!specs.imageUrl && (
              <span className="mt-2 text-xs font-mono-tech text-text-muted">
                {specs.portable ? "Taşınabilir Sistem" : "Konsol Tipi Ultrason"}
              </span>
            )}
          </div>
        </div>

        {/* Brand Logo & Price Segment */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center h-5">
            <span className="text-xs font-mono-tech font-bold text-brand-teal uppercase tracking-wide">
              {product.brand}
            </span>
          </div>
          {specs.beamformer && (
            <span className="text-[10px] font-mono-tech font-medium text-text-muted bg-surface-light border border-border-subtle px-2 py-0.5 rounded">
              {specs.beamformer}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-sans text-card-title font-semibold text-text-primary group-hover:text-brand-teal transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-muted line-clamp-2 mt-1 font-sans">
          {product.description}
        </p>

        {/* Spec Chips */}
        <div className="mt-3.5 flex flex-wrap gap-1.5 font-mono-tech text-xs">
          {specs.screenSize && (
            <span className="bg-surface-light text-text-body border border-border-subtle rounded-md px-2 py-0.5">
              {specs.screenSize}
            </span>
          )}
          {specs.probePorts !== undefined && (
            <span className="bg-surface-light text-text-body border border-border-subtle rounded-md px-2 py-0.5">
              {specs.probePorts} Port
            </span>
          )}
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1 text-xs font-sans text-text-muted">
            {highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-brand-teal font-bold text-sm leading-none mt-0.5">•</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Action Bar */}
      <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4 gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-sans font-semibold text-text-primary hover:text-brand-teal transition-colors">
          <input
            type="checkbox"
            checked={compared}
            onChange={handleCompareClick}
            className="h-4 w-4 rounded border-border-subtle text-brand-teal focus:ring-0 cursor-pointer accent-brand-teal"
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
          className="rounded-pill bg-brand text-white hover:bg-brand-teal px-4 py-2 text-xs font-semibold transition-colors flex items-center gap-1 font-sans"
        >
          <span>Detay</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
