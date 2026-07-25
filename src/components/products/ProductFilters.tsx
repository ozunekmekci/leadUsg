"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/tracking";

interface ProductFiltersProps {
  availableBrands: string[];
  availableBudgets: string[];
  totalResultsCount: number;
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

export default function ProductFilters({
  availableBrands,
  availableBudgets,
  totalResultsCount,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Parse current query params
  const selectedBrands = searchParams.getAll("brand");
  const selectedBudget = searchParams.get("budget") || "";

  // Helper to create updated URL query strings
  const createQueryString = useCallback(
    (name: string, value: string, action: "set" | "toggle" | "clear") => {
      const params = new URLSearchParams(searchParams.toString());

      if (action === "set") {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      } else if (action === "toggle") {
        const currentValues = params.getAll(name);
        params.delete(name);

        if (currentValues.includes(value)) {
          currentValues.filter((v) => v !== value).forEach((v) => params.append(name, v));
        } else {
          [...currentValues, value].forEach((v) => params.append(name, v));
        }
      } else if (action === "clear") {
        params.delete("brand");
        params.delete("budget");
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleBrandChange = (brand: string) => {
    trackEvent("filter_applied", { filterType: "brand", brand });
    const queryString = createQueryString("brand", brand, "toggle");
    router.push(pathname + (queryString ? `?${queryString}` : ""), { scroll: false });
  };

  const handleBudgetChange = (budget: string) => {
    const nextValue = selectedBudget === budget ? "" : budget;
    trackEvent("filter_applied", { filterType: "budget", budget: nextValue });
    const queryString = createQueryString("budget", nextValue, "set");
    router.push(pathname + (queryString ? `?${queryString}` : ""), { scroll: false });
  };

  const handleClearAll = () => {
    const queryString = createQueryString("", "", "clear");
    router.push(pathname + (queryString ? `?${queryString}` : ""), { scroll: false });
  };

  const hasActiveFilters = selectedBrands.length > 0 || !!selectedBudget;

  return (
    <div className="flex flex-col gap-6 font-mono-tech">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center justify-between bg-slate-950 text-white border border-slate-800 p-4 rounded">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Katalog Filtreleri ({selectedBrands.length + (selectedBudget ? 1 : 0)})
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center gap-2 rounded bg-cyan-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500 transition-colors border border-cyan-500"
        >
          {mobileOpen ? "Filtreleri Gizle" : "Filtrele & Sırala"}
        </button>
      </div>

      {/* Filter Sidebar Container */}
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block rounded border border-slate-200 bg-white p-5 flex flex-col gap-6 shadow-sm`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="text-cyan-600 font-bold">⚙</span>
            <h2 className="font-display text-base font-bold text-slate-950 tracking-tight">Katalog Filtreleri</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 underline transition-colors"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>

        {/* Brands Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span>Marka Portföyü</span>
            {selectedBrands.length > 0 && (
              <span className="bg-cyan-100 text-cyan-900 text-[10px] px-1.5 py-0.2 rounded font-bold">
                {selectedBrands.length}
              </span>
            )}
          </h3>
          <div className="space-y-2.5">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              const brandKey = (brand || "").toLowerCase().trim();
              const logoPath = BRAND_LOGO_MAP[brandKey];

              return (
                <label
                  key={brand}
                  className={`flex items-center justify-between p-2 rounded border transition-all cursor-pointer select-none ${
                    isChecked
                      ? "bg-cyan-50/70 border-cyan-500 text-slate-950 font-bold"
                      : "bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBrandChange(brand)}
                      className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-0 cursor-pointer accent-cyan-600"
                    />
                    <span className="text-xs">{brand}</span>
                  </div>

                  {logoPath && (
                    <div className="relative h-4 w-12 opacity-80">
                      <Image
                        src={logoPath}
                        alt={`${brand} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Budget Segment Section */}
        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tahmini Bütçe Segmenti
          </h3>
          <div className="space-y-2">
            {availableBudgets.map((budget) => {
              const isSelected = selectedBudget === budget;
              return (
                <button
                  key={budget}
                  onClick={() => handleBudgetChange(budget)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-semibold border transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-slate-950 border-slate-950 text-cyan-400 font-bold shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <span>{budget}</span>
                  {isSelected && <span className="text-cyan-400 text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Total Count Footnote */}
        <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 text-center bg-slate-50 p-2.5 rounded border border-slate-200">
          Toplam <span className="font-bold text-slate-950">{totalResultsCount}</span> biyomedikal sistem listeleniyor.
        </div>
      </div>
    </div>
  );
}

