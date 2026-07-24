"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { trackEvent } from "@/lib/tracking";

interface ProductFiltersProps {
  availableBrands: string[];
  availableBudgets: string[];
  totalResultsCount: number;
}

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
    <div className="flex flex-col gap-6">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <span className="text-sm font-semibold text-white">
          Filtreler ({selectedBrands.length + (selectedBudget ? 1 : 0)})
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          {mobileOpen ? "Filtreleri Kapat" : "Filtrele"}
        </button>
      </div>

      {/* Filter Sidebar Container */}
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col gap-6 shadow-xl`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white tracking-wide">Filtreleme</h2>
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Brands Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Markalar
          </h3>
          <div className="space-y-2.5">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer select-none transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Budget Segment Section */}
        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Bütçe Aralığı
          </h3>
          <div className="space-y-2">
            {availableBudgets.map((budget) => {
              const isSelected = selectedBudget === budget;
              return (
                <button
                  key={budget}
                  onClick={() => handleBudgetChange(budget)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    isSelected
                      ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                      : "bg-slate-850/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {budget}
                </button>
              );
            })}
          </div>
        </div>

        {/* Total Count Footnote */}
        <div className="border-t border-slate-800 pt-4 text-xs text-slate-500 text-center">
          Toplam <span className="font-bold text-slate-300">{totalResultsCount}</span> cihaz
          listeleniyor.
        </div>
      </div>
    </div>
  );
}
