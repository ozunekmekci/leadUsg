"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const BRANDS = ["GE", "Philips", "Mindray", "Samsung"];
const BUDGET_OPTIONS = [
  { label: "Tüm Bütçeler", value: "all" },
  { label: "1M TL Altı", value: "0-1M" },
  { label: "1M - 2M TL", value: "1-2M" },
  { label: "2M - 3M TL", value: "2-3M" },
  { label: "3M TL Üzeri", value: "3M-plus" },
];

export const ProductFilters: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state initialized from URL search params
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("all");

  useEffect(() => {
    // Sync local state with URL params on load/change
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setSelectedBrands(brandParam.split(","));
    } else {
      setSelectedBrands([]);
    }

    const budgetParam = searchParams.get("budget");
    if (budgetParam) {
      setSelectedBudget(budgetParam);
    } else {
      setSelectedBudget("all");
    }
  }, [searchParams]);

  const updateFilters = (brands: string[], budget: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (brands.length > 0) {
      params.set("brand", brands.join(","));
    } else {
      params.delete("brand");
    }

    if (budget !== "all") {
      params.set("budget", budget);
    } else {
      params.delete("budget");
    }

    // Push state using React transition for smooth UI feel
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const nextBrands = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);
    
    setSelectedBrands(nextBrands);
    updateFilters(nextBrands, selectedBudget);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextBudget = e.target.value;
    setSelectedBudget(nextBudget);
    updateFilters(selectedBrands, nextBudget);
  };

  const handleClear = () => {
    setSelectedBrands([]);
    setSelectedBudget("all");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-slate-800 bg-slate-900/20 p-5 sticky top-24">
      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
        <h3 className="text-sm font-semibold text-slate-200">Filtrele</h3>
        {(selectedBrands.length > 0 || selectedBudget !== "all") && (
          <button
            onClick={handleClear}
            className="text-[10px] font-medium text-slate-500 hover:text-white transition-colors uppercase tracking-wider"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Brand Checkboxes */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Markalar</span>
        <div className="flex flex-col gap-2">
          {BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-sm text-slate-350 cursor-pointer select-none hover:text-white transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Budget Select */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bütçe Aralığı</span>
        <select
          value={selectedBudget}
          onChange={handleBudgetChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 text-sm text-slate-250 px-3 py-2 outline-none focus:border-blue-500 transition-colors cursor-pointer"
        >
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {isPending && (
        <div className="text-[10px] text-blue-400 font-mono animate-pulse self-end mt-2">
          Yükleniyor...
        </div>
      )}
    </div>
  );
};
