import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import NewArrivalsCarousel, { NewArrivalItem } from "./NewArrivalsCarousel";
import { ProductSpecs } from "./products/ProductCard";

type ProductRecord = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  specs: unknown;
  createdAt?: Date | string;
};

export default async function NewArrivalsStrip() {
  let rawProducts: ProductRecord[] = [];

  try {
    rawProducts = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  } catch (error) {
    console.error("NewArrivalsStrip DB fetch error, using fallback data:", error);
    rawProducts = FALLBACK_PRODUCTS;
  }

  if (!rawProducts || rawProducts.length === 0) {
    rawProducts = FALLBACK_PRODUCTS;
  }

  const now = Date.now();

  const items: NewArrivalItem[] = rawProducts.map((p) => {
    const specs = (p.specs as unknown as ProductSpecs) || {};
    const createdTime = p.createdAt ? new Date(p.createdAt).getTime() : now;
    const daysAgo = Math.max(0, Math.floor((now - createdTime) / (1000 * 60 * 60 * 24)));

    // Create a 1-line tech summary
    const techSummaryParts = [];
    if (specs.transducerType) {
      techSummaryParts.push(specs.transducerType);
    } else if (specs.beamformer) {
      techSummaryParts.push(specs.beamformer);
    } else {
      techSummaryParts.push("Dijital Işın Oluşturucu");
    }

    if (specs.elastography) {
      techSummaryParts.push("elastografi");
    }
    if (specs.screenSize) {
      techSummaryParts.push(specs.screenSize);
    }

    const techSummary = techSummaryParts.slice(0, 2).join(" · ");

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category,
      techSummary,
      daysAgo,
      priceSegment: specs.priceSegment,
      portable: specs.portable,
    };
  });

  return (
    <section className="py-section-sm md:py-section-md lg:py-section-lg bg-surface-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-10">
          <div>
            <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
              SON EKLENENLER
            </span>
            <h2 className="font-display text-section-title font-semibold text-text-primary mt-2">
              Yeni Eklenen Cihazlar
            </h2>
            <p className="text-text-muted text-sm mt-2 max-w-md">
              Kataloğumuza son eklenen sistemler ve teknik güncellemeler
            </p>
          </div>

          <Link
            href="/urunler/ultrason"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal link-underline group"
          >
            <span>Tüm Kataloğu Gör</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Carousel Component */}
        <NewArrivalsCarousel items={items} />

      </div>
    </section>
  );
}
