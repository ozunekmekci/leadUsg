"use client";

import { ProductItem } from "./ProductCard";

interface SpecTableProps {
  products: ProductItem[];
  highlightDifferences?: boolean;
}

export default function SpecTable({
  products,
  highlightDifferences = false,
}: SpecTableProps) {
  if (!products || products.length === 0) {
    return null;
  }

  const isSingle = products.length === 1;

  // Helpers for extracting spec values safely
  const getScreenSize = (p: ProductItem) => p.specs?.screenSize || "Belirtilmedi";
  const getProbePorts = (p: ProductItem) =>
    p.specs?.probePorts !== undefined ? `${p.specs.probePorts} Aktif Port` : "Belirtilmedi";
  const getPortable = (p: ProductItem) =>
    p.specs?.portable ? "Evet (Taşınabilir / POC)" : "Hayır (Konsol Tipi)";
  const getPriceSegment = (p: ProductItem) => p.specs?.priceSegment || "Belirtilmedi";
  const getApplicationAreas = (p: ProductItem) =>
    p.specs?.applicationAreas && p.specs.applicationAreas.length > 0
      ? p.specs.applicationAreas.join(", ")
      : "Genel Kullanım";
  const getHighlights = (p: ProductItem) =>
    p.specs?.highlights && p.specs.highlights.length > 0
      ? p.specs.highlights
      : ["Özel teknoloji bilgisi bulunmuyor."];

  // Helper to check if values differ across products
  const isDifferent = (getter: (p: ProductItem) => string) => {
    if (products.length <= 1) return false;
    const firstVal = getter(products[0]);
    return products.some((p) => getter(p) !== firstVal);
  };

  const rows = [
    {
      group: "Genel Tanımlamalar",
      items: [
        { label: "Marka", getValue: (p: ProductItem) => p.brand },
        { label: "Model", getValue: (p: ProductItem) => p.name },
        { label: "Kategori", getValue: (p: ProductItem) => p.category.toUpperCase() },
        { label: "Tahmini Bütçe Segmenti", getValue: getPriceSegment },
      ],
    },
    {
      group: "Ekran & Fiziksel Yapı",
      items: [
        { label: "Ekran Boyutu & Tipi", getValue: getScreenSize },
        { label: "Mobil / Taşınabilir Durumu", getValue: getPortable },
      ],
    },
    {
      group: "Akustik & Prob Mimarisi",
      items: [{ label: "Aktif Prob Port Sayısı", getValue: getProbePorts }],
    },
    {
      group: "Klinik & Teşhis Alanları",
      items: [{ label: "Uygulama Alanları", getValue: getApplicationAreas }],
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
      <table className="w-full text-left text-sm text-slate-300 border-collapse">
        {/* Comparison Header for multi-product mode */}
        {!isSingle && (
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80">
              <th className="p-4 font-bold text-white w-1/4">Teknik Parametre</th>
              {products.map((product) => (
                <th key={product.id} className="p-4 font-bold text-white border-l border-slate-800">
                  <div className="text-xs text-blue-400 uppercase font-semibold">{product.brand}</div>
                  <div className="text-base text-white font-bold">{product.name}</div>
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {rows.map((group, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {/* Group Header Row */}
              <tr className="border-b border-slate-800/80 bg-slate-950/60">
                <td
                  colSpan={isSingle ? 2 : products.length + 1}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-blue-400"
                >
                  {group.group}
                </td>
              </tr>

              {/* Group Items */}
              {group.items.map((item, itemIdx) => {
                const diff = highlightDifferences && isDifferent(item.getValue);
                return (
                  <tr
                    key={itemIdx}
                    className={`border-b border-slate-800/60 transition-colors ${
                      diff ? "bg-amber-500/10 hover:bg-amber-500/15" : "hover:bg-slate-850/40"
                    }`}
                  >
                    <td className="p-4 font-semibold text-slate-200 w-1/3 sm:w-1/4 border-r border-slate-800/40">
                      <div className="flex items-center gap-2">
                        <span>{item.label}</span>
                        {diff && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                            Farklı
                          </span>
                        )}
                      </div>
                    </td>

                    {isSingle ? (
                      <td className="p-4 text-slate-300 font-medium">
                        {item.getValue(products[0])}
                      </td>
                    ) : (
                      products.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 text-slate-300 font-medium border-l border-slate-800/40"
                        >
                          {item.getValue(product)}
                        </td>
                      ))
                    )}
                  </tr>
                );
              })}
            </React.Fragment>
          ))}

          {/* Highlights Row */}
          <tr className="border-b border-slate-800/80 bg-slate-950/60">
            <td
              colSpan={isSingle ? 2 : products.length + 1}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-blue-400"
            >
              Öne Çıkan Teknolojiler & Biyomedikal Özellikler
            </td>
          </tr>
          <tr className="hover:bg-slate-850/40">
            <td className="p-4 font-semibold text-slate-200 border-r border-slate-800/40">
              Teknoloji Maddeleri
            </td>
            {isSingle ? (
              <td className="p-4 text-slate-300">
                <ul className="space-y-1.5 list-disc list-inside text-xs leading-relaxed">
                  {getHighlights(products[0]).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </td>
            ) : (
              products.map((product) => (
                <td key={product.id} className="p-4 text-slate-300 border-l border-slate-800/40">
                  <ul className="space-y-1.5 list-disc list-inside text-xs leading-relaxed">
                    {getHighlights(product).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </td>
              ))
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// React import needed for React.Fragment in tsx
import React from "react";
