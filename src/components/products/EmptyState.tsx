"use client";

import { usePathname, useRouter } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-12 text-center flex flex-col items-center justify-center gap-4">
      <div className="rounded-full bg-slate-800/80 p-4 text-slate-400 border border-slate-750">
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
        <h3 className="text-lg font-bold text-white">Aradığınız Kriterlere Uygun Cihaz Bulunamadı</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Seçmiş olduğunuz marka veya bütçe filtre kombinasyonunda henüz ultrason cihazı bulunmuyor. Filtreleri temizleyerek tüm cihazları listeleyebilirsiniz.
        </p>
      </div>
      <button
        onClick={handleReset}
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
      >
        Filtreleri Temizle
      </button>
    </div>
  );
}
