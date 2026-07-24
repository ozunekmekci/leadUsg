import { prisma } from "@/lib/prisma";
import SpecTable from "@/components/products/SpecTable";
import RelatedProducts from "@/components/products/RelatedProducts";
import { ProductItem, ProductSpecs } from "@/components/products/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ProductDetailPageProps {
  params: {
    kategori: string;
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { kategori, slug } = params || {};
  const currentCategory = kategori?.toLowerCase() || "";
  const currentSlug = slug?.toLowerCase() || "";

  // Query product from database
  const dbProduct = await prisma.product.findFirst({
    where: {
      category: currentCategory,
      slug: currentSlug,
    },
  });

  if (!dbProduct) {
    notFound();
  }

  // Map to ProductItem type
  const product: ProductItem = {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    brand: dbProduct.brand,
    category: dbProduct.category,
    description: dbProduct.description,
    specs: (dbProduct.specs as unknown as ProductSpecs) || {},
  };

  // Fetch 3 related products from same category
  const dbRelated = await prisma.product.findMany({
    where: {
      category: currentCategory,
      id: {
        not: product.id,
      },
    },
    take: 3,
  });

  const relatedProducts: ProductItem[] = dbRelated.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    description: p.description,
    specs: (p.specs as unknown as ProductSpecs) || {},
  }));

  const specs = product.specs || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
        <span>&gt;</span>
        <Link href={`/urunler/${currentCategory}`} className="hover:text-white capitalize transition-colors">
          {currentCategory}
        </Link>
        <span>&gt;</span>
        <span className="text-white font-bold">{product.name}</span>
      </nav>

      {/* Hero Section: Gallery + Details */}
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* Left Column: Image Gallery (at least 2 slots) */}
        <div className="flex flex-col gap-4">
          {/* Slot 1: Main View */}
          <div className="relative aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-xl group">
            <div className="rounded-full bg-blue-500/10 p-6 text-blue-400 border border-blue-500/20 mb-4 group-hover:scale-105 transition-transform">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-wide">
              {product.brand} {product.name}
            </span>
            <span className="text-xs text-slate-500 mt-1">Ana Cihaz Görseli (Görsel Slot 1)</span>
          </div>

          {/* Thumbnail Gallery (Slots 2, 3, 4) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-video rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col items-center justify-center text-center hover:border-slate-700 transition-colors">
              <span className="text-[10px] font-semibold text-slate-400">Konsol & Ekran</span>
              <span className="text-[9px] text-slate-600">Slot 2</span>
            </div>
            <div className="aspect-video rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col items-center justify-center text-center hover:border-slate-700 transition-colors">
              <span className="text-[10px] font-semibold text-slate-400">Prob Setleri</span>
              <span className="text-[9px] text-slate-600">Slot 3</span>
            </div>
            <div className="aspect-video rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col items-center justify-center text-center hover:border-slate-700 transition-colors">
              <span className="text-[10px] font-semibold text-slate-400">Arayüz Paneli</span>
              <span className="text-[9px] text-slate-600">Slot 4</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Details & Sticky CTAs */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 ring-1 ring-inset ring-blue-500/20">
                {product.brand}
              </span>
              {specs.priceSegment && (
                <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded">
                  Segment: {specs.priceSegment}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
              {product.name}
            </h1>

            <p className="text-slate-300 mt-4 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Key Spec Highlights Chips */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-xs font-semibold text-slate-400">Ekran Teknolojisi</div>
              <div className="text-sm font-bold text-white mt-1">{specs.screenSize || "Belirtilmedi"}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-xs font-semibold text-slate-400">Aktif Prob Portu</div>
              <div className="text-sm font-bold text-white mt-1">
                {specs.probePorts !== undefined ? `${specs.probePorts} Port` : "Belirtilmedi"}
              </div>
            </div>
          </div>

          {/* Sticky CTAs */}
          <div className="sticky top-20 z-40 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-md p-5 shadow-2xl flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href={`/karsilastir?ids=${product.id}`}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 px-5 py-3.5 text-sm font-bold text-white transition-all hover:border-slate-600"
            >
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Karşılaştırmaya Ekle
            </Link>

            <Link
              href="/teklif-al"
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      </div>

      {/* Spec Table Section */}
      <div className="mt-16 border-t border-slate-800 pt-12 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
            Teknik Özellikler
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {product.brand} {product.name} Spesifikasyon Tablosu
          </h2>
          <p className="text-sm text-slate-400">
            Cihaza ait ölçülebilir tıbbi ve biyomedikal donanım parametreleri.
          </p>
        </div>

        <SpecTable products={[product]} />
      </div>

      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} category={currentCategory} />
    </div>
  );
}
