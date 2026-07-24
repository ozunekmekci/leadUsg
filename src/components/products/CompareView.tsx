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
    <div className="flex flex-col gap-8 font-mono-tech">
      {/* Warning Banner if count exceeded 4 */}
      {wasTrimmed && (
        <div className="rounded border border-amber-300 bg-amber-50 p-4 text-amber-900 text-xs sm:text-sm flex items-center gap-3">
          <div>
            <span className="font-bold">⌐ KARŞILAŞTIRMA SINIRI: </span>
            {originalCount} adet cihaz seçildi. Yan yana inceleme düzenini korumak adına sadece{" "}
            <span className="font-bold underline">ilk 4 cihaz</span> listelenmektedir.
          </div>
        </div>
      )}

      {/* Side-by-side Spec Table with difference highlighting */}
      <SpecTable products={products} highlightDifferences={true} />

      {/* Bottom CTA Panel */}
      <div className="rounded border border-slate-800 bg-slate-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl text-white">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">TEKNİK DİFERANSİYEL AKSİYONU</span>
          <h3 className="font-display text-2xl font-bold tracking-tight">
            Seçili Cihazlar İçin Biyomedikal Teklif Alın
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            {products.map((p) => p.name).join(", ")} modelleri için kliniğinize özel fiyat ve tedarik şartlarını öğrenin.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href={`/teklif-al?products=${productIdsParam}`}
            className="inline-flex items-center justify-center rounded bg-cyan-600 hover:bg-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all text-center"
          >
            Seçili Cihazlar İçin Teklif Al →
          </Link>
        </div>
      </div>
    </div>
  );
}
