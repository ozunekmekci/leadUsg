"use client";

import { usePathname, useRouter } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="rounded border border-dashed border-slate-300 bg-white p-12 text-center flex flex-col items-center justify-center gap-4 font-mono-tech shadow-xs">
      <div className="rounded-full bg-slate-100 p-4 text-cyan-700 border border-slate-200">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          0 SONUÇ BİLDİRİMİ
        </span>
        <h3 className="text-lg font-display font-bold text-slate-950 mt-2">
          Kriterlere Uygun Ultrason Cihazı Bulunamadı
        </h3>
        <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed font-sans">
          Seçtiğiniz marka portföyü veya bütçe segmenti filtre kombinasyonunda ürün bulunamadı. Filtreleri sıfırlayarak tüm biyomedikal sistemleri görüntüleyebilirsiniz.
        </p>
      </div>
      <button
        onClick={handleReset}
        className="mt-2 inline-flex items-center gap-2 rounded bg-slate-950 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-700 transition-colors border border-slate-800"
      >
        <span>Filtreleri Temizle</span>
        <span>↺</span>
      </button>
    </div>
  );
}

