import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import FeaturedProductsClient from "./FeaturedProductsClient";
import { ProductItem, ProductSpecs } from "./products/ProductCard";

type ProductRecord = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: unknown;
};

export default async function FeaturedProducts() {
  let rawProducts: ProductRecord[] = [];

  try {
    rawProducts = await prisma.product.findMany({
      where: {
        category: "ultrason",
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (error) {
    console.error("FeaturedProducts DB fetch error, using fallback data:", error);
    rawProducts = FALLBACK_PRODUCTS;
  }

  if (!rawProducts || rawProducts.length === 0) {
    rawProducts = FALLBACK_PRODUCTS;
  }

  const items: ProductItem[] = rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    description: p.description,
    specs: (p.specs as unknown as ProductSpecs) || {},
  }));

  return (
    <section id="urunler" className="py-section-sm md:py-section-md lg:py-section-lg bg-surface-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
            KATALOG VE MODELLER
          </span>
          <h2 className="font-display text-section-title font-semibold text-text-primary mt-2">
            Klinik İhtiyacınıza Uygun Ultrason Cihazları
          </h2>
        </div>

        {/* Carousel Component */}
        <FeaturedProductsClient initialProducts={items} />

      </div>
    </section>
  );
}
