import React from "react";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: {
    kategori: string;
  };
  searchParams?: {
    brand?: string;
    budget?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { kategori } = params || {};
  const { brand, budget } = searchParams || {};

  // Build prisma query filters with type-safety
  const whereClause: Prisma.ProductWhereInput = {
    category: kategori,
  };

  // Brand filter
  if (brand) {
    const brands = brand.split(",");
    whereClause.brand = {
      in: brands,
      mode: "insensitive", // case insensitive matching
    };
  }

  // Budget filter
  if (budget) {
    if (budget === "0-1M") {
      whereClause.price = { lte: 1000000 };
    } else if (budget === "1-2M") {
      whereClause.price = { gte: 1000000, lte: 2000000 };
    } else if (budget === "2-3M") {
      whereClause.price = { gte: 2000000, lte: 3000000 };
    } else if (budget === "3M-plus") {
      whereClause.price = { gte: 3000000 };
    }
  }

  // Fetch from database
  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: {
      price: "desc",
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Info */}
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-8 mb-8">
        <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">Kategoriler</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white capitalize sm:text-4xl">
          {kategori === "ultrason" ? "Ultrason Cihazları" : `${kategori} Cihazları`}
        </h1>
        <p className="text-slate-450 text-sm max-w-2xl leading-relaxed">
          Klinik ihtiyaçlarınıza uygun, en güncel teknolojilerle donatılmış {kategori} sistemlerini inceleyin. 
          Marka ve bütçenize göre filtreleme yaparak cihazları karşılaştırabilirsiniz.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>

        {/* Right Product Grid */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/10 p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[300px]">
              <span className="text-slate-600 text-5xl">🔍</span>
              <h3 className="text-lg font-bold text-slate-300">Cihaz Bulunamadı</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Seçtiğiniz filtre kriterlerine uygun medikal cihaz bulunamadı. Lütfen filtreleri değiştirerek tekrar deneyin.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
