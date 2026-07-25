import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import { ProductSpecs } from "@/components/products/ProductCard";
import VideoHero from "@/components/VideoHero";
import TrustStatsBar from "@/components/TrustStatsBar";
import BrandsBanner from "@/components/BrandsBanner";
import NewArrivalsStrip from "@/components/NewArrivalsStrip";
import FeaturedProducts from "@/components/FeaturedProducts";
import QualityAndPrecision from "@/components/QualityAndPrecision";
import AIAndAutomation from "@/components/AIAndAutomation";
import SmartComparison from "@/components/SmartComparison";
import ProposalForm from "@/components/ProposalForm";
import TrustBadgeStrip from "@/components/TrustBadgeStrip";

export const dynamic = "force-dynamic";

export default async function Home() {
  let rawProducts = [];
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
    console.error("Home page DB query error, using fallback products:", error);
    rawProducts = FALLBACK_PRODUCTS;
  }

  if (!rawProducts || rawProducts.length === 0) {
    rawProducts = FALLBACK_PRODUCTS;
  }

  const products = rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    description: p.description,
    specs: (p.specs as unknown as ProductSpecs) || {},
  }));

  return (
    <div className="min-h-screen bg-surface-canvas text-text-primary">
      
      {/* 1. Hero Bölümü */}
      <VideoHero />

      {/* 2. Hizmet Standartlarımız (Metrics Bar Yerine) */}
      <TrustStatsBar />

      {/* 3. Çalıştığımız Üretici Markalar (Brands Banner) */}
      <BrandsBanner />

      {/* 4. Öne Çıkan Ürünler (Yeni Eklenen Cihazlar Carousel) */}
      <NewArrivalsStrip />

      {/* 5. KATALOG VE MODELLER (Interactive Product Filter Tabs) */}
      <Suspense fallback={<div className="text-center py-20">Katalog yükleniyor...</div>}>
        <FeaturedProducts />
      </Suspense>

      {/* 6. Görüntü Kalitesi & Hassasiyet */}
      <QualityAndPrecision />

      {/* 7. Yapay Zeka & Otomasyon */}
      <AIAndAutomation />

      {/* 8. Akıllı Karşılaştırma Aracı */}
      <SmartComparison products={products} />

      {/* 9. Satış Sonrası & Hizmet Güvencesi (Deaktif) */}
      {/* <AfterSalesAndSupport /> */}

      {/* 10. Teklif & Demo Formu */}
      <section id="teklif" className="py-section-sm md:py-section-md lg:py-section-lg bg-white border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & Advantages */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
                  FİYAT VE TEKLİF ALIN
                </span>
                <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
                  Kliniğiniz İçin En Uygun Ultrason Teklifini Alın
                </h2>
              </div>
              
              <p className="text-text-body text-base leading-relaxed font-sans">
                İhtiyacınız olan branşı ve bütçe aralığınızı belirtin; uzman ekibimiz size özel cihaz konfigürasyonlarını ve en avantajlı ödeme planlarını hazırlasın.
              </p>

              <div className="space-y-4 pt-4 text-sm font-sans text-text-body">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span>İhtiyaca özel konfigürasyon ve şeffaf fiyatlandırma</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span>Yerinde veya online demo imkanı</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span>Eski cihazınız için takas (Trade-in) değerlendirmesi</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form inside Suspense */}
            <div className="lg:col-span-7">
              <Suspense 
                fallback={
                  <div className="rounded border border-slate-800 bg-slate-900 p-8 text-center text-slate-400 font-mono-tech">
                    Form yükleniyor...
                  </div>
                }
              >
                <ProposalForm />
              </Suspense>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Bilgi Merkezi & SEO Rehberi (Deaktif) */}
      {/* <InformationCenter /> */}

      {/* Trust Badge Strip */}
      <TrustBadgeStrip />

    </div>
  );
}
