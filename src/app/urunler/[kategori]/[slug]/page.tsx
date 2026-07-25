import { prisma } from "@/lib/prisma";
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

        {/* Hero Section: Diagnostic Gallery + Key Specs */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          
          {/* Left Column: Ultrasound Diagnostic HUD Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Slot 1: Main Diagnostic Scan Viewport */}
            <div className="ultrasound-console p-3 rounded bg-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
              
              {/* Header Telemetry Bar */}
              <div className="bg-slate-900 border-b border-slate-800 p-2.5 rounded-t flex items-center justify-between text-xs font-mono-tech text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-cyan-400 font-bold">LIVE TELEMETRY:</span>
                  <span className="text-white font-bold">{product.brand} {product.name}</span>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>FREQ: <strong className="text-cyan-400">4.2 MHz</strong></span> |
                  <span>GAIN: <strong className="text-white">68 dB</strong></span>
                </div>
              </div>

              {/* Viewport Screen */}
              <div className="relative bg-black h-[320px] sm:h-[400px] w-full overflow-hidden border border-slate-800 my-2 flex items-center justify-center">
                
                {/* Ultrasound Cardiac Sector Sweep Visual */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBkd3JoZTVjZnVycXQ1bHZuYmkzaHV1OTN3YzRuZ3l3aHh5NndpdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kvKSbXJfQKOY0/giphy.gif"
                    alt={`${product.brand} ${product.name} Cardiac Ultrasound Scan`}
                    className="w-full h-full object-contain filter contrast-125 brightness-105"
                  />
                </div>

                {/* SVG Overlay: Sector Arc Gridlines & HUD Caliper */}
                <svg className="sector-cone-overlay w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <path d="M200 12 L70 280 A210 210 0 0 0 330 280 Z" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
                  <circle cx="200" cy="12" r="3" fill="#ef4444"/>
                  
                  {/* Caliper measurement */}
                  <line x1="160" y1="140" x2="240" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2"/>
                  <circle cx="160" cy="140" r="3" fill="#f59e0b"/>
                  <circle cx="240" cy="160" r="3" fill="#f59e0b"/>
                  <text x="245" y="163" fontFamily="IBM Plex Mono" fontSize="9" fill="#f59e0b" fontWeight="bold">+-- 4.82 cm --+</text>

                  {/* Depth markings */}
                  <g fontFamily="IBM Plex Mono" fontSize="9" fill="#06b6d4" opacity="0.85">
                    <text x="365" y="60">- 5cm</text>
                    <text x="365" y="120">- 10cm</text>
                    <text x="365" y="180">- 15cm</text>
                    <text x="365" y="240">- 20cm</text>
                  </g>
                </svg>

                {/* Bottom ECG pulse animation line */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-950/90 border-t border-slate-800 flex items-center px-4 overflow-hidden z-20">
                  <span className="text-[9px] font-mono-tech text-rose-500 mr-2 font-bold">ECG 74 BPM</span>
                  <svg className="w-full h-6" viewBox="0 0 500 40">
                    <path
                      d="M0 20 L40 20 L50 20 L55 5 L60 35 L65 10 L70 25 L75 20 L150 20 L160 20 L165 5 L170 35 L175 10 L180 25 L185 20 L260 20 L270 20 L275 5 L280 35 L285 10 L290 25 L295 20 L370 20 L380 20 L385 5 L390 35 L395 10 L400 25 L405 20 L500 20"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-slate-900 p-2 rounded-b border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech text-slate-400">
                <span className="text-slate-300">GÖRSEL SLOT 1: <strong className="text-cyan-400">Ana Telemetri Görünümü</strong></span>
                <span>FPS: <strong className="text-cyan-400 font-bold">58 Hz</strong></span>
              </div>
            </div>

            {/* Thumbnail Gallery Slots (Slots 2, 3, 4) */}
            <div className="grid grid-cols-3 gap-3 font-mono-tech">
              <div className="rounded border border-slate-300 bg-white p-3 flex flex-col items-center justify-center text-center shadow-xs hover:border-cyan-600 cursor-pointer transition-colors">
                <span className="text-xs font-bold text-slate-900">🖥️ Konsol & Ekran</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Görsel Slot 2</span>
              </div>
              <div className="rounded border border-slate-300 bg-white p-3 flex flex-col items-center justify-center text-center shadow-xs hover:border-cyan-600 cursor-pointer transition-colors">
                <span className="text-xs font-bold text-slate-900">🔌 Prob Setleri</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Görsel Slot 3</span>
              </div>
              <div className="rounded border border-slate-300 bg-white p-3 flex flex-col items-center justify-center text-center shadow-xs hover:border-cyan-600 cursor-pointer transition-colors">
                <span className="text-xs font-bold text-slate-900">🎛️ Arayüz Paneli</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Görsel Slot 4</span>
              </div>
            </div>
          </div>

          {/* Right Column: Brand Info, Title & Sticky CTAs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Top Brand Banner */}
            <div className="rounded border border-slate-200 bg-white p-6 shadow-xs flex flex-col gap-4">
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
                {product.name}
              </h1>

              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Key Biomedical Specs Box */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono-tech">
                <div className="rounded bg-slate-50 border border-slate-200 p-3">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Ekran Tipi</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                    {specs.screenSize || "21.5\" HD Monitor"}
                  </span>
                </div>
                <div className="rounded bg-slate-50 border border-slate-200 p-3">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Prob Portları</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                    {specs.probePorts !== undefined ? `${specs.probePorts} Aktif Port` : "4 Port"}
                  </span>
                </div>
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

