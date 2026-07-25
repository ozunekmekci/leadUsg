"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductItem } from "./products/ProductCard";

interface FeaturedProductsClientProps {
  initialProducts: ProductItem[];
}

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

export default function FeaturedProductsClient({ initialProducts }: FeaturedProductsClientProps) {
  const tabs = [
    "Tüm Modeller",
    "Konsol Tipi",
    "Taşınabilir (POCUS)",
    "Radyoloji",
    "Kadın Doğum",
  ];
  const [activeTab, setActiveTab] = useState("Tüm Modeller");

  const filteredProducts = initialProducts.filter((product) => {
    const specs = product.specs || {};
    const appAreas = specs.applicationAreas || [];
    const isPortable = specs.portable === true;

    if (activeTab === "Konsol Tipi") {
      return !isPortable;
    }
    if (activeTab === "Taşınabilir (POCUS)") {
      return isPortable;
    }
    if (activeTab === "Radyoloji") {
      return appAreas.some((area) => area.toLowerCase().includes("radyoloji"));
    }
    if (activeTab === "Kadın Doğum") {
      return appAreas.some(
        (area) =>
          area.toLowerCase().includes("kadın") ||
          area.toLowerCase().includes("doğum") ||
          area.toLowerCase().includes("perinatoloji")
      );
    }
    return true; // Tüm Modeller
  });

  return (
    <div className="space-y-10">
      {/* Tabs list */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border-subtle pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
              activeTab === tab
                ? "bg-brand-teal text-white border-brand-teal shadow-sm"
                : "bg-white text-text-body border-border-subtle hover:border-brand-teal/40 hover:text-brand-teal"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid count summary */}
      <div className="text-center md:text-left text-xs font-mono-tech text-text-muted">
        Gösterilen: <span className="text-text-primary font-bold">{filteredProducts.length}</span> cihaz listeleniyor.
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card border border-border-subtle p-8">
          <p className="text-text-muted text-sm font-sans">Bu kategoriye uygun cihaz bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const specs = product.specs || {};
            const brandKey = (product.brand || "").toLowerCase().trim();
            const brandLogoPath = BRAND_LOGO_MAP[brandKey];
            const highlights = specs.highlights || [];

            return (
              <div
                key={product.id}
                className="bg-white rounded-card border border-border-subtle card-premium group flex flex-col justify-between p-5 hover:border-brand-teal transition-all duration-300"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="aspect-[4/3] bg-surface-light rounded-lg overflow-hidden relative mb-4 flex items-center justify-center border border-border-subtle group-hover:border-brand-teal/40 transition-all p-6">
                    {/* Price segment */}
                    {specs.priceSegment && (
                      <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 bg-brand-dark/80 text-white text-[10px] font-mono-tech font-bold rounded backdrop-blur-xs">
                        {specs.priceSegment}
                      </div>
                    )}
                    
                    {/* Brand Logo & Type details */}
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      {brandLogoPath ? (
                        <Image
                          src={brandLogoPath}
                          alt={`${product.brand} logo`}
                          width={120}
                          height={45}
                          className="max-h-11 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-xl font-mono-tech font-bold text-text-primary uppercase tracking-wide">
                          {product.brand}
                        </span>
                      )}
                      <span className="mt-2 text-[10px] font-mono-tech text-text-muted tracking-wider uppercase">
                        {specs.portable ? "Taşınabilir (POCUS)" : "Konsol Tipi"}
                      </span>
                    </div>
                  </div>

                  {/* Brand & Tech tags */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-mono-tech font-bold text-brand-teal uppercase tracking-wide">
                      {product.brand}
                    </span>
                    {specs.beamformer && (
                      <span className="text-[10px] font-mono-tech font-medium text-text-muted bg-surface-light border border-border-subtle px-2 py-0.5 rounded">
                        {specs.beamformer}
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3 className="font-sans text-xl font-bold text-text-primary group-hover:text-brand-teal transition-colors leading-tight">
                    {product.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-text-muted line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Spec Highlights List */}
                  {highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5 text-xs font-sans text-text-body">
                      {highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-brand-teal font-bold text-sm leading-none mt-0.5">•</span>
                          <span className="leading-snug text-text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Double CTA Button Row */}
                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-3">
                  <Link
                    href={`/teklif-al?products=${product.id}`}
                    className="flex-1 rounded-pill bg-brand-teal hover:bg-brand-teal-hover text-white text-center py-2.5 text-xs font-bold transition-all shadow-sm shadow-brand-teal/10"
                  >
                    Teklif Al
                  </Link>
                  <Link
                    href={`/urunler/${product.category}/${product.slug}`}
                    className="flex-1 rounded-pill bg-white hover:bg-surface-light text-text-primary text-center py-2.5 text-xs font-semibold border border-border-subtle hover:border-brand-teal transition-all"
                  >
                    Detayları İncele
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
