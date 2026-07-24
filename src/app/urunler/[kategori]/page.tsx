import { prisma } from "@/lib/prisma";
import ProductCard, { ProductItem, ProductSpecs } from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import EmptyState from "@/components/products/EmptyState";
import { notFound } from "next/navigation";

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
    // Brand filter matching
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    // Budget filter matching
    if (selectedBudget && product.specs?.priceSegment !== selectedBudget) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Hero Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-8 mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
          <span>Katalog</span>
          <span>&gt;</span>
          <span className="text-slate-300">{currentCategory}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize">
          {currentCategory} Cihazları ve Modelleri
        </h1>
        <p className="text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Klinikler ve görüntüleme merkezleri için öne çıkan {currentCategory} sistemleri. 
          Teknik spesifikasyonları inceleyin, filtrelere göre eleyin ve karşılaştırma listenize ekleyin.
        </p>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Column */}
        <div className="lg:col-span-1">
          <ProductFilters
            availableBrands={availableBrands}
            availableBudgets={availableBudgets}
            totalResultsCount={filteredProducts.length}
          />
        </div>

        {/* Right Product Grid Column */}
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
  );
}
