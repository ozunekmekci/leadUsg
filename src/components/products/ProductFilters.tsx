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
    <div className="flex flex-col gap-6 font-mono-tech">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center justify-between bg-slate-950 text-white border border-slate-800 p-4 rounded">
        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Filtreler ({selectedBrands.length + (selectedBudget ? 1 : 0)})
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center gap-2 rounded bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500 transition-colors"
        >
          {mobileOpen ? "Kapat" : "Filtrele"}
        </button>
      </div>

      {/* Filter Sidebar Container */}
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block rounded border border-slate-300 bg-white p-5 flex flex-col gap-6 shadow-sm`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="font-display text-lg font-bold text-slate-950 tracking-tight">Katalog Filtreleri</h2>
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-cyan-600 hover:underline transition-colors"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Brands Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Markalar
          </h3>
          <div className="space-y-2">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-3 text-xs text-slate-800 hover:text-cyan-700 cursor-pointer select-none transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 rounded border-slate-300 bg-white text-cyan-600 focus:ring-0 cursor-pointer"
                  />
                  <span className="font-medium">{brand}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Budget Segment Section */}
        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Bütçe Aralığı
          </h3>
          <div className="space-y-2">
            {availableBudgets.map((budget) => {
              const isSelected = selectedBudget === budget;
              return (
                <button
                  key={budget}
                  onClick={() => handleBudgetChange(budget)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-semibold border transition-all ${
                    isSelected
                      ? "bg-cyan-50 border-cyan-600 text-cyan-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-white"
                  }`}
                >
                  {budget}
                </button>
              );
            })}
          </div>
        </div>

        {/* Total Count Footnote */}
        <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 text-center">
          Toplam <span className="font-bold text-slate-900">{totalResultsCount}</span> sistem listeleniyor.
        </div>
      </div>
    </div>
  );
}
