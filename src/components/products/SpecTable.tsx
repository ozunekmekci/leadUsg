"use client";

import React from "react";
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

  // Extractors with safe fallbacks
  const getScreenSize = (p: ProductItem) => p.specs?.screenSize || "21.5\" HD / Standard Monitor";
  const getProbePorts = (p: ProductItem) =>
    p.specs?.probePorts !== undefined ? `${p.specs.probePorts} Aktif Port` : "4 Port (Standart)";
  const getPortable = (p: ProductItem) =>
    p.specs?.portable ? "Evet (Taşınabilir / POC)" : "Hayır (Konsol Tipi)";
  const getPriceSegment = (p: ProductItem) => p.specs?.priceSegment || "Belirtilmedi";
  const getSignalProcessing = (p: ProductItem) => p.specs?.signalProcessing || "CrystalBeam / cSound Mimarisi";
  const getProbeTechnology = (p: ProductItem) => p.specs?.probeTechnology || "Single Crystal Matris Prob";
  const getAutoOptimization = (p: ProductItem) => p.specs?.autoOptimization || "QuickScan / ATO";
  const getCompoundImaging = (p: ProductItem) => p.specs?.compoundImaging || "MultiVision / CrossXBeam / SonoCT";
  const getSpeckleReduction = (p: ProductItem) => p.specs?.speckleReduction || "ClearVision / SRI / X-RES";
  const getFlowImaging = (p: ProductItem) => p.specs?.flowImaging || "S-Flow, MV-Flow, B-Flow, LumiFlow";
  const getWorkflowProtocol = (p: ProductItem) => p.specs?.workflowProtocol || "EZ Exam+ / Scan Assistant";
  const getShearwave = (p: ProductItem) => p.specs?.shearwave || "Point & 2D Shearwave (ARFI)";
  const getFusionImaging = (p: ProductItem) => p.specs?.fusionImaging || "S-Fusion / Volume Navigation (VNav)";
  const getFourDImaging = (p: ProductItem) => p.specs?.fourDImaging || "Realistic Vue / HDlive / TrueVue";
  const getClinicalUnits = (p: ProductItem) =>
    p.specs?.clinicalUnits && p.specs.clinicalUnits.length > 0
      ? p.specs.clinicalUnits.join(", ")
      : "Radyoloji, Kadın Doğum";
  const getCompetitors = (p: ProductItem) => {
    const comps = p.specs?.competitors;
    if (!comps || Object.keys(comps).length === 0) return "Segment Amiral Gemisi";
    return Object.entries(comps)
      .map(([brand, model]) => `${brand}: ${model}`)
      .join(" | ");
  };

  const getHighlights = (p: ProductItem) =>
    p.specs?.highlights && p.specs.highlights.length > 0
      ? p.specs.highlights
      : ["Doğrulanmış yüksek çözünürlüklü doku ayrımı ve renkli Doppler akış mimarisi."];

  // Helper to check if values differ across products
  const isDifferent = (getter: (p: ProductItem) => string) => {
    if (products.length <= 1) return false;
    const firstVal = getter(products[0]);
    return products.some((p) => getter(p) !== firstVal);
  };

  const specGroups = [
    {
      groupName: "1. Genel Tanımlamalar & Bütçe",
      items: [
        { label: "Marka", getValue: (p: ProductItem) => p.brand },
        { label: "Model Adı", getValue: (p: ProductItem) => p.name },
        { label: "Cihaz Kategorisi", getValue: (p: ProductItem) => p.category.toUpperCase() },
        { label: "Tahmini Bütçe Segmenti", getValue: getPriceSegment },
        { label: "Klinik Branşlar", getValue: getClinicalUnits },
        { label: "Muadil / Rakip Modeller", getValue: getCompetitors },
      ],
    },
    {
      groupName: "2. Akustik & Sinyal İşleme Mimarisi",
      items: [
        { label: "Signal Processing Algoritması", getValue: getSignalProcessing },
        { label: "Prob Dönüştürücü Teknolojisi", getValue: getProbeTechnology },
        { label: "Otomatik Doku Optimizasyonu", getValue: getAutoOptimization },
        { label: "Aktif Prob Port Sayısı", getValue: getProbePorts },
      ],
    },
    {
      groupName: "3. Görüntü Kalitesi & Filtreleme",
      items: [
        { label: "Compound Görüntüleme", getValue: getCompoundImaging },
        { label: "Speckle Reduction (Leke Azaltma)", getValue: getSpeckleReduction },
        { label: "Özel Vasküler Akım Tekniği", getValue: getFlowImaging },
      ],
    },
    {
      groupName: "4. İleri Düzey Klinik Opsiyonlar & 4D",
      items: [
        { label: "4D / 3D Hacimsel Görüntüleme Modu", getValue: getFourDImaging },
        { label: "Shearwave Doku Ölçümü (Elastografi)", getValue: getShearwave },
        { label: "Füzyon Görüntüleme (Fusion)", getValue: getFusionImaging },
        { label: "İş Akış & Protokol Asistanı", getValue: getWorkflowProtocol },
      ],
    },
    {
      groupName: "5. Ergonomi & Garanti Desteği",
      items: [
        { label: "Ekran Boyutu & Tipi", getValue: getScreenSize },
        { label: "Taşınabilirlik / Form Faktörü", getValue: getPortable },
        { label: "Garanti & Servis Güvencesi", getValue: () => "2 Yıl Distribütör Garantisi + 10 Yıl Parça Desteği" },
      ],
    },
  ];

  return (
    <div className="overflow-x-auto rounded border border-slate-200 bg-white shadow-xs font-mono-tech">
      <table className="w-full text-left text-xs sm:text-sm text-slate-800 border-collapse">
        {/* Comparison Header for multi-product mode */}
        {!isSingle && (
          <thead>
            <tr className="border-b border-slate-200 bg-slate-950 text-white">
              <th className="p-4 font-bold font-display text-sm sm:text-base w-1/4">Biyomedikal Parametre</th>
              {products.map((product) => (
                <th key={product.id} className="p-4 font-bold border-l border-slate-800">
                  <div className="text-xs text-cyan-400 uppercase tracking-wider">{product.brand}</div>
                  <div className="text-base sm:text-lg font-display text-white font-bold">{product.name}</div>
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {specGroups.map((group, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {/* Group Header Row */}
              <tr className="border-b border-slate-200 bg-slate-900 text-white">
                <td
                  colSpan={isSingle ? 2 : products.length + 1}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono-tech"
                >
                  {group.groupName}
                </td>
              </tr>

              {/* Group Items */}
              {group.items.map((item, itemIdx) => {
                const diff = highlightDifferences && isDifferent(item.getValue);
                return (
                  <tr
                    key={itemIdx}
                    className={`border-b border-slate-200 transition-colors ${
                      diff ? "bg-amber-50/80 hover:bg-amber-100/80" : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="p-3.5 font-semibold text-slate-900 w-1/3 sm:w-1/4 border-r border-slate-200 bg-slate-50/50">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{item.label}</span>
                        {diff && (
                          <span className="delta-badge text-[10px] px-1.5 py-0.5 rounded font-mono-tech font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            ⌐ FARK
                          </span>
                        )}
                      </div>
                    </td>

                    {isSingle ? (
                      <td className="p-3.5 text-slate-800 font-mono-tech font-medium">
                        {item.getValue(products[0])}
                      </td>
                    ) : (
                      products.map((product) => (
                        <td
                          key={product.id}
                          className="p-3.5 text-slate-800 font-mono-tech font-medium border-l border-slate-200"
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
          <tr className="border-b border-slate-200 bg-slate-900 text-white">
            <td
              colSpan={isSingle ? 2 : products.length + 1}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono-tech"
            >
              6. Öne Çıkan Teknolojiler & Biyomedikal Özellikler
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-3.5 font-semibold text-slate-900 border-r border-slate-200 bg-slate-50/50">
              Teknoloji Maddeleri
            </td>
            {isSingle ? (
              <td className="p-3.5 text-slate-800">
                <ul className="space-y-1.5 list-disc list-inside text-xs leading-relaxed font-mono-tech">
                  {getHighlights(products[0]).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </td>
            ) : (
              products.map((product) => (
                <td key={product.id} className="p-3.5 text-slate-800 border-l border-slate-200 font-mono-tech">
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

