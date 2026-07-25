import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import SpecTable from "@/components/products/SpecTable";
import RelatedProducts from "@/components/products/RelatedProducts";
import { ProductItem, ProductSpecs } from "@/components/products/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface ProductDetailPageProps {
  params: {
    kategori: string;
    slug: string;
  };
}

export const dynamic = "force-dynamic";

// Brand SVG map helper
const BRAND_LOGO_MAP: Record<string, string> = {
  "ge healthcare": "/brands/ge.svg",
  "ge": "/brands/ge.svg",
  "philips": "/brands/philips.svg",
  "samsung medison": "/brands/samsung.svg",
  "samsung": "/brands/samsung.svg",
  "siemens healthineers": "/brands/siemens.svg",
  "siemens": "/brands/siemens.svg",
  "canon medical": "/brands/canon.svg",
  "canon": "/brands/canon.svg",
  "mindray": "/brands/mindray.svg",
};

type ProductRecord = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: unknown;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { kategori, slug } = params || {};
  const currentCategory = kategori?.toLowerCase() || "";
  const currentSlug = slug?.toLowerCase() || "";

  let dbProduct: ProductRecord | null = null;
  let dbRelated: ProductRecord[] = [];

  try {
    dbProduct = await prisma.product.findFirst({
      where: {
        category: currentCategory,
        slug: currentSlug,
      },
    });

    if (dbProduct) {
      dbRelated = await prisma.product.findMany({
        where: {
          category: currentCategory,
          id: {
            not: dbProduct.id,
          },
        },
        take: 3,
      });
    }
  } catch (error) {
    console.error("ProductDetailPage DB fetch error, using fallback data:", error);
    dbProduct = FALLBACK_PRODUCTS.find(
      (p) => p.category === currentCategory && p.slug === currentSlug
    ) || FALLBACK_PRODUCTS[0];
    dbRelated = FALLBACK_PRODUCTS.filter((p) => p.id !== dbProduct?.id).slice(0, 3);
  }

  if (!dbProduct) {
    dbProduct = FALLBACK_PRODUCTS.find(
      (p) => p.category === currentCategory && p.slug === currentSlug
    ) || FALLBACK_PRODUCTS[0];
    if (!dbProduct) notFound();
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
  const brandKey = (product.brand || "").toLowerCase().trim();
  const brandLogoPath = BRAND_LOGO_MAP[brandKey];

  return (
    <div className="min-h-screen bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono-tech font-bold text-slate-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Anasayfa</Link>
          <span>&gt;</span>
          <Link href={`/urunler/${currentCategory}`} className="hover:text-cyan-700 transition-colors">
            {currentCategory}
          </Link>
          <span>&gt;</span>
          <span className="text-slate-950 font-bold bg-white border border-slate-200 px-2 py-0.5 rounded">
            {product.brand} {product.name}
          </span>
        </nav>

        {/* Hero Section: Diagnostic Studio Gallery + Key Specs */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          
          {/* Left Column: Ultrasound Product Studio Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Main Product Viewport Card */}
            <div className="rounded-card bg-white border border-slate-200 p-6 shadow-md relative overflow-hidden flex flex-col items-center justify-center">
              
              {/* Top Bar Badges */}
              <div className="w-full flex items-center justify-between text-xs font-mono-tech text-slate-500 mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                  <span className="text-cyan-800 font-bold">GERÇEK SİSTEM GÖRSELİ:</span>
                  <span className="text-slate-900 font-bold">{product.brand} {product.name}</span>
                </div>
                {specs.priceSegment && (
                  <span className="text-[11px] font-bold text-cyan-900 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded">
                    {specs.priceSegment} SEGMENT
                  </span>
                )}
              </div>

              {/* Viewport Image Area */}
              <div className="relative min-h-[360px] sm:min-h-[440px] w-full bg-slate-50 rounded-lg border border-slate-100 p-6 flex items-center justify-center overflow-hidden">
                {specs.imageUrl ? (
                  <img
                    src={specs.imageUrl}
                    alt={`${product.brand} ${product.name} Ultrason Cihazı`}
                    className="max-h-[400px] max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                ) : brandLogoPath ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Image
                      src={brandLogoPath}
                      alt={`${product.brand} logo`}
                      width={180}
                      height={60}
                      className="max-h-16 object-contain"
                    />
                    <span className="text-sm font-mono-tech text-slate-500">
                      {product.brand} {product.name} Medikal Görseli
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-mono-tech font-bold text-slate-800 uppercase">
                    {product.brand} {product.name}
                  </span>
                )}
              </div>

              {/* Viewport Footer Bar */}
              <div className="w-full mt-4 flex items-center justify-between text-xs font-mono-tech text-slate-500 pt-2">
                <span>MODEL: <strong className="text-slate-900 font-bold">{product.name}</strong></span>
                <span>DURUM: <strong className="text-teal-700 font-bold">STOKTA / DEMO HAZIR</strong></span>
              </div>
            </div>

            {/* Tech Feature Quick Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono-tech">
              {specs.signalProcessing && (
                <div className="rounded border border-slate-200 bg-white p-3 shadow-2xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Sinyal İşleme</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block truncate">
                    {specs.signalProcessing}
                  </span>
                </div>
              )}
              {specs.probeTechnology && (
                <div className="rounded border border-slate-200 bg-white p-3 shadow-2xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Prob Teknolojisi</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block truncate">
                    {specs.probeTechnology}
                  </span>
                </div>
              )}
              {specs.autoOptimization && (
                <div className="rounded border border-slate-200 bg-white p-3 shadow-2xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Otomatik Opt.</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block truncate">
                    {specs.autoOptimization}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Brand Info, Title & Sticky CTAs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Top Brand Banner */}
            <div className="rounded-card border border-slate-200 bg-white p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                {brandLogoPath ? (
                  <div className="relative h-8 w-28">
                    <Image
                      src={brandLogoPath}
                      alt={`${product.brand} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-sm font-mono-tech font-bold text-cyan-800 uppercase">
                    {product.brand}
                  </span>
                )}

                {specs.priceSegment && (
                  <span className="text-xs font-mono-tech font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded">
                    Segment: {specs.priceSegment}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl font-bold text-slate-950 tracking-tight">
                {product.brand} {product.name}
              </h1>

              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Detailed Technical Specifications Cards */}
              <div className="space-y-3 pt-2 font-mono-tech text-xs">
                {specs.flowImaging && (
                  <div className="rounded bg-slate-50 border border-slate-200 p-3">
                    <span className="text-[10px] text-teal-800 uppercase block font-bold">Özel Akım / Renkli Doppler Tekniği</span>
                    <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                      {specs.flowImaging}
                    </span>
                  </div>
                )}
                {specs.fourDImaging && (
                  <div className="rounded bg-slate-50 border border-slate-200 p-3">
                    <span className="text-[10px] text-teal-800 uppercase block font-bold">4D / 3D Hacimsel Görüntüleme Modu</span>
                    <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                      {specs.fourDImaging}
                    </span>
                  </div>
                )}
                {specs.shearwave && (
                  <div className="rounded bg-slate-50 border border-slate-200 p-3">
                    <span className="text-[10px] text-teal-800 uppercase block font-bold">Shearwave Doku Sertlik Ölçümü</span>
                    <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                      {specs.shearwave}
                    </span>
                  </div>
                )}
                {specs.fusionImaging && (
                  <div className="rounded bg-slate-50 border border-slate-200 p-3">
                    <span className="text-[10px] text-teal-800 uppercase block font-bold">Füzyon Görüntüleme (Fusion)</span>
                    <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                      {specs.fusionImaging}
                    </span>
                  </div>
                )}
                {specs.competitors && Object.keys(specs.competitors).length > 0 && (
                  <div className="rounded bg-amber-50/60 border border-amber-200 p-3">
                    <span className="text-[10px] text-amber-900 uppercase block font-bold">Segment Muadil / Rakip Cihazlar</span>
                    <span className="text-xs font-semibold text-amber-950 mt-0.5 block">
                      {Object.entries(specs.competitors)
                        .map(([b, m]) => `${b}: ${m}`)
                        .join(" | ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Action CTAs */}
            <div className="sticky top-20 z-40 rounded border border-slate-200 bg-white/95 backdrop-blur-md p-4 shadow-xl flex flex-col sm:flex-row gap-3">
              <Link
                href={`/karsilastir?ids=${product.id}`}
                className="flex-1 inline-flex items-center justify-center rounded border border-slate-300 bg-slate-100 hover:bg-slate-200 px-4 py-3 text-xs font-bold text-slate-900 transition-all font-mono-tech"
              >
                <span className="mr-2">⚖</span>
                <span>Karşılaştırmaya Ekle</span>
              </Link>

              <Link
                href="/teklif-al"
                className="flex-1 inline-flex items-center justify-center rounded bg-slate-950 hover:bg-cyan-700 px-4 py-3 text-xs font-bold text-white shadow-md transition-all font-mono-tech border border-slate-800"
              >
                <span>Teklif Al</span>
                <span className="ml-2">→</span>
              </Link>
            </div>

          </div>

        </div>

        {/* Spec Table Section */}
        <div className="mt-14 border-t border-slate-200 pt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-600"></span>
              <span className="text-xs font-mono-tech font-bold text-cyan-800 uppercase tracking-widest">
                TEKNİK PARAMETRE MATRİSİ
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-950 tracking-tight mt-1">
              {product.brand} {product.name} Spesifikasyon Tablosu
            </h2>
            <p className="text-xs text-slate-600 font-mono-tech">
              Cihaza ait doğrulanmış tıbbi ve biyomedikal donanım parametreleri (5 Ana Kategori).
            </p>
          </div>

          <SpecTable products={[product]} />
        </div>

        {/* Related Products Section */}
        <RelatedProducts products={relatedProducts} category={currentCategory} />

      </div>
    </div>
  );
}

