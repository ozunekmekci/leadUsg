import { prisma } from "@/lib/prisma";
import ProductCard, { ProductItem, ProductSpecs } from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import EmptyState from "@/components/products/EmptyState";
import { notFound } from "next/navigation";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    kategori: string;
  };
  searchParams: {
    brand?: string | string[];
    budget?: string;
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { kategori } = params || {};
  const currentCategory = kategori?.toLowerCase() || "";

  // Validate allowed categories for MVP
  const validCategories = ["ultrason", "mr", "bt", "rontgen"];
  if (!validCategories.includes(currentCategory)) {
    notFound();
  }

  // Fetch all products for the current category from PostgreSQL via Prisma
  const dbProducts = await prisma.product.findMany({
    where: {
      category: currentCategory,
    },
    orderBy: {
      id: "asc",
    },
  });

  // Map JSON specs type
  const allProducts: ProductItem[] = dbProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    description: p.description,
    specs: (p.specs as unknown as ProductSpecs) || {},
  }));

  // Extract unique available brands and budgets for filter UI
  const availableBrands = Array.from(new Set(allProducts.map((p) => p.brand))).sort();
  const availableBudgets = Array.from(
    new Set(allProducts.map((p) => p.specs?.priceSegment).filter(Boolean) as string[])
  ).sort();

  // Normalize search params
  const rawBrandParam = searchParams?.brand;
  const selectedBrands: string[] = Array.isArray(rawBrandParam)
    ? rawBrandParam
    : rawBrandParam
    ? [rawBrandParam]
    : [];
  const selectedBudget = searchParams?.budget || "";

  // Apply filters to products
  const filteredProducts = allProducts.filter((product) => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    if (selectedBudget && product.specs?.priceSegment !== selectedBudget) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 border-b border-slate-200">
      {/* Category Hero Banner */}
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-cyan-800 uppercase tracking-wider">
              <Link href="/" className="hover:underline text-slate-500">KATALOG</Link>
              <span className="text-slate-300">&gt;</span>
              <span className="text-slate-900 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                {currentCategory.toUpperCase()} SİSTEMLERİ
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 capitalize">
                  {currentCategory} Cihazları ve Modelleri
                </h1>
                <p className="text-slate-600 max-w-3xl leading-relaxed text-sm sm:text-base mt-2 font-sans">
                  Klinikler, hastaneler ve özel tıp merkezleri için öne çıkan biyomedikal {currentCategory} sistemleri. 
                  Teknik donanımları filtreleyin, yan yana karşılaştırın veya doğrudan distribütör teklifi talep edin.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-950 text-white rounded border border-slate-800 text-xs font-mono-tech">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>AKTİF KATALOG: <strong className="text-cyan-400">{filteredProducts.length} CİHAZ</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              availableBrands={availableBrands}
              availableBudgets={availableBudgets}
              totalResultsCount={filteredProducts.length}
            />
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

