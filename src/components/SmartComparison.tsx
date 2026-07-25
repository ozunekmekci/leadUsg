"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductItem } from "./products/ProductCard";

interface SmartComparisonProps {
  products: ProductItem[];
}

export default function SmartComparison({ products }: SmartComparisonProps) {
  const router = useRouter();
  const [model1, setModel1] = useState("");
  const [model2, setModel2] = useState("");

  const handleStartComparison = () => {
    if (model1 && model2) {
      router.push(`/karsilastir?ids=${model1},${model2}`);
    } else if (model1 || model2) {
      router.push(`/karsilastir?ids=${model1 || model2}`);
    } else {
      router.push("/karsilastir");
    }
  };

  const p1 = products.find((p) => String(p.id) === model1);
  const p2 = products.find((p) => String(p.id) === model2);

  const criteria = [
    "Sinyal İşleme Mimarisi",
    "Prob Kristal Teknolojisi",
    "4D & Hacimsel Modlar",
    "Shearwave Elastografi",
    "Füzyon Görüntüleme",
  ];

  return (
    <section className="py-section-sm md:py-section-md lg:py-section-lg bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
            ŞEFFAF KARŞILAŞTIRMA
          </span>
          <h2 className="font-display text-section-title font-semibold text-text-primary mt-2">
            Katalog Vaatleriyle Değil, Gerçek Teknik Verilerle Karşılaştırın
          </h2>
          <p className="text-text-muted text-sm mt-3 leading-relaxed">
            Markaların süslü pazarlama cümleleri yerine cihazların gerçek donanım yeteneklerini inceleyin. Prob frekans aralıkları, sinyal işleme mimarileri, elastografi türleri ve 4D modlarını tarafsızca kıyaslayarak en doğru kararı verin.
          </p>
        </div>

        {/* Interactive Selector UI Container */}
        <div className="max-w-4xl mx-auto bg-surface-canvas border border-border-subtle p-6 sm:p-8 rounded-card shadow-card-rest">
          
          <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4 mb-6">
            {/* Dropdown 1 */}
            <div className="md:col-span-5">
              <label className="block text-[10px] font-mono-tech text-text-muted uppercase tracking-wider mb-2 font-semibold">
                1. CİHAZ MODELİ
              </label>
              <select
                value={model1}
                onChange={(e) => setModel1(e.target.value)}
                className="w-full bg-white border border-border-subtle hover:border-brand-teal/40 rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-teal transition-all font-sans cursor-pointer"
              >
                <option value="">Bir Cihaz Seçin (12 Aktif Model)</option>
                {products
                  .filter((p) => String(p.id) !== model2)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} {p.name} ({p.specs?.priceSegment || "Konsol"})
                    </option>
                  ))}
              </select>
            </div>

            {/* VS Divider */}
            <div className="md:col-span-1 flex items-center justify-center pt-2 md:pt-0">
              <span className="h-10 w-10 rounded-full bg-brand-dark border border-brand-teal/30 text-white font-mono-tech text-xs font-bold flex items-center justify-center shadow-sm">
                VS
              </span>
            </div>

            {/* Dropdown 2 */}
            <div className="md:col-span-5">
              <label className="block text-[10px] font-mono-tech text-text-muted uppercase tracking-wider mb-2 font-semibold">
                2. CİHAZ MODELİ
              </label>
              <select
                value={model2}
                onChange={(e) => setModel2(e.target.value)}
                className="w-full bg-white border border-border-subtle hover:border-brand-teal/40 rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-teal transition-all font-sans cursor-pointer"
              >
                <option value="">Bir Cihaz Seçin (12 Aktif Model)</option>
                {products
                  .filter((p) => String(p.id) !== model1)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} {p.name} ({p.specs?.priceSegment || "Konsol"})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Instant Live Comparison Preview Box */}
          {(p1 || p2) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-lg border border-border-subtle shadow-2xs">
              <div className="p-3 bg-surface-light rounded border border-slate-200">
                <span className="text-[10px] font-mono-tech font-bold text-brand-teal uppercase block">
                  {p1 ? `${p1.brand} ${p1.name}` : "Seçim Bekleniyor"}
                </span>
                {p1 && (
                  <div className="mt-2 space-y-1 text-xs font-mono-tech text-slate-700">
                    <p><strong className="text-slate-900">Sinyal:</strong> {p1.specs?.signalProcessing || "Standart"}</p>
                    <p><strong className="text-slate-900">Prob:</strong> {p1.specs?.probeTechnology || "Single Crystal"}</p>
                    <p><strong className="text-slate-900">4D:</strong> {p1.specs?.fourDImaging || "Destekleniyor"}</p>
                  </div>
                )}
              </div>
              <div className="p-3 bg-surface-light rounded border border-slate-200">
                <span className="text-[10px] font-mono-tech font-bold text-brand-teal uppercase block">
                  {p2 ? `${p2.brand} ${p2.name}` : "Seçim Bekleniyor"}
                </span>
                {p2 && (
                  <div className="mt-2 space-y-1 text-xs font-mono-tech text-slate-700">
                    <p><strong className="text-slate-900">Sinyal:</strong> {p2.specs?.signalProcessing || "Standart"}</p>
                    <p><strong className="text-slate-900">Prob:</strong> {p2.specs?.probeTechnology || "Single Crystal"}</p>
                    <p><strong className="text-slate-900">4D:</strong> {p2.specs?.fourDImaging || "Destekleniyor"}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Criteria Checklist pill style */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-6 pt-4 border-t border-border-subtle">
            <span className="text-[10px] font-mono-tech text-text-muted uppercase tracking-wider font-semibold">
              Kritik Karar Kriterleri:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {criteria.map((item, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1.5 bg-white border border-border-subtle text-text-body px-3 py-1 rounded-full text-xs font-sans"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-teal"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="text-center">
            <button
              onClick={handleStartComparison}
              disabled={!model1 && !model2}
              className="inline-flex items-center justify-center bg-brand-teal hover:bg-brand-teal-hover text-white rounded-pill px-8 py-3.5 text-sm font-semibold transition-all disabled:opacity-50 disabled:hover:bg-brand-teal shadow-md shadow-brand-teal/15 font-sans"
            >
              Kapsamlı Cihaz Karşılaştırma Modülünü Başlatın →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
