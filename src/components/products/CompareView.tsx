"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ProductItem } from "./ProductCard";
import SpecTable from "./SpecTable";
import { trackEvent } from "@/lib/tracking";

interface CompareViewProps {
  products: ProductItem[];
  wasTrimmed?: boolean;
  originalCount?: number;
}

export default function CompareView({
  products,
  wasTrimmed = false,
  originalCount = 0,
}: CompareViewProps) {
  useEffect(() => {
    const productIds = products.map((p) => p.id);
    const startTime = Date.now();

    // Fire compare_start event on mount
    trackEvent("compare_start", {
      productIds,
      count: products.length,
      productNames: products.map((p) => `${p.brand} ${p.name}`),
    });

    // Fire compare_end event on unmount with time spent
    return () => {
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      trackEvent("compare_end", {
        productIds,
        durationSeconds,
      });
    };
  }, [products]);

  const productIdsParam = products.map((p) => p.id).join(",");

  return (
    <div className="flex flex-col gap-8">
      {/* Warning Banner if count exceeded 4 */}
      {wasTrimmed && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-xs sm:text-sm flex items-center gap-3">
          <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <span className="font-bold">Karşılaştırma Sınırı Uyarısı: </span>
            {originalCount} adet cihaz seçildi. Yan yana inceleme düzeni korumak adına sadece{" "}
            <span className="font-bold underline">ilk 4 cihaz</span> listelenmektedir.
          </div>
        </div>
      )}

      {/* Side-by-side Spec Table with difference highlighting */}
      <SpecTable products={products} highlightDifferences={true} />

      {/* Bottom CTA Panel */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Seçili Cihazlar İçin Distribütör Teklifi Alın
          </h3>
          <p className="text-sm text-slate-400 max-w-xl">
            {products.map((p) => p.name).join(", ")} modelleri için kliniğinize özel fiyat ve tedarik şartlarını öğrenin.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href={`/teklif-al?products=${productIdsParam}`}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all text-center"
          >
            Seçili Cihazlar İçin Teklif Al
          </Link>
        </div>
      </div>
    </div>
  );
}
