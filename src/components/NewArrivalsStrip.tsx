import Link from "next/link";
import { prisma } from "@/lib/prisma";
import NewArrivalsCarousel, { NewArrivalItem } from "./NewArrivalsCarousel";
import { ProductSpecs } from "./products/ProductCard";

export default async function NewArrivalsStrip() {
  const rawProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  if (!rawProducts || rawProducts.length === 0) {
    return null;
  }

  const now = Date.now();

  const items: NewArrivalItem[] = rawProducts.map((p) => {
    const specs = (p.specs as unknown as ProductSpecs) || {};
    const createdTime = new Date(p.createdAt).getTime();
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
    <section className="py-12 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and View All link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-950/80 border border-amber-800/80 rounded text-[11px] font-mono-tech text-amber-400 font-bold uppercase tracking-wider mb-2">
              <span>SON EKLENENLER</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Yeni Eklenen Cihazlar
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Kataloğumuza son eklenen sistemler ve teknik güncellemeler
            </p>
          </div>

          <Link
            href="/urunler/ultrason"
            className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider group"
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
