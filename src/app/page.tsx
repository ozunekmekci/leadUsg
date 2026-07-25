import Link from "next/link";
import Image from "next/image";
import VideoHero from "@/components/VideoHero";
import NewArrivalsStrip from "@/components/NewArrivalsStrip";
import TrustStatsBar from "@/components/TrustStatsBar";
import EditorialSplit from "@/components/EditorialSplit";
import VideoInterstitial from "@/components/VideoInterstitial";
import BeforeAfterTeaser from "@/components/BeforeAfterTeaser";
import AMConsultantCard from "@/components/AMConsultantCard";
import TrustBadgeStrip from "@/components/TrustBadgeStrip";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-canvas text-text-primary">
      
      {/* ═══════════════════════════════════════════════════ */}
      {/* 1. HERO — Full-Screen Local Video Background       */}
      {/* ═══════════════════════════════════════════════════ */}
      <VideoHero />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 2. MARKA PORTFÖYÜ — Grayscale Logos                */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="markalar" className="py-section-sm md:py-section-md lg:py-section-lg bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <span className="text-eyebrow font-semibold uppercase tracking-widest text-text-muted">
              ÖNDE GELEN ÜRETİCİLER
            </span>
            <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
              Global Ultrason Marka Portföyü
            </h2>
            <p className="text-text-muted text-base mt-3 max-w-xl mx-auto">
              Sistemimizdeki tüm cihazlar yetkili distribütör garantili ve güncel teknik servis standartlarıyla eşleştirilir.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {[
              { name: "GE HealthCare", logo: "/brands/ge.svg", models: "Voluson · Logiq · Vivid" },
              { name: "Philips", logo: "/brands/philips.svg", models: "EPIQ Elite · Affiniti" },
              { name: "Samsung Medison", logo: "/brands/samsung.svg", models: "HERA W10 · V8 · RS85" },
              { name: "Siemens Healthineers", logo: "/brands/siemens.svg", models: "ACUSON Sequoia" },
              { name: "Canon Medical", logo: "/brands/canon.svg", models: "Aplio i800 · Aplio a" },
              { name: "Mindray", logo: "/brands/mindray.svg", models: "Resona 7 · Nuewa I9" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="group flex flex-col items-center justify-center text-center p-6 rounded-card border border-border-subtle bg-white hover:border-brand-teal hover:shadow-card-hover transition-all duration-300 h-36"
              >
                <div className="w-full h-12 flex items-center justify-center mb-3">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    width={100}
                    height={40}
                    className="max-h-10 max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
                <div className="font-semibold text-xs text-text-primary group-hover:text-brand-teal transition-colors">
                  {brand.name}
                </div>
                <div className="text-[10px] font-mono-tech text-text-muted mt-0.5">
                  {brand.models}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="section-divider" />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 3. ÖNE ÇIKAN CİHAZLAR — Clean Catalog Carousel     */}
      {/* ═══════════════════════════════════════════════════ */}
      <NewArrivalsStrip />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 4. SAYISAL GÜVEN ŞERİDİ — Trust Stats              */}
      {/* ═══════════════════════════════════════════════════ */}
      <TrustStatsBar />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 5. EDİTORYAL SPLIT BLOK 1: Neden leadUSG?          */}
      {/* ═══════════════════════════════════════════════════ */}
      <EditorialSplit
        eyebrow="NEDEN LEADUSG?"
        title="Bağımsız Broker, Tarafsız Veri."
        description="Distribütör broşürleri tek markayı övmek zorundadır. Biz olmak zorunda değiliz. Tüm premium ultrason markalarını eşit şartlarda, doğrulanmış teknik parametreleriyle karşılaştırın."
        ctaText="Cihazları İncele"
        ctaHref="/urunler/ultrason"
        videoSrc="/assets/main (1).mp4"
        imageAlt="Bağımsız Broker Ultrason İnceleme"
        bgClass="bg-surface-canvas"
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 6. VİDEO İNTERSTİTİAL — Local HD Video Loop         */}
      {/* ═══════════════════════════════════════════════════ */}
      <VideoInterstitial
        videoSrc="/assets/main (3).mp4"
        caption="Ultrason teknolojisini yakından tanıyın."
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 7. KARŞILAŞTIRMA TEASER — Before/After              */}
      {/* ═══════════════════════════════════════════════════ */}
      <BeforeAfterTeaser />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 8. EDİTORYAL SPLIT BLOK 2: AM Danışmanlığı          */}
      {/* ═══════════════════════════════════════════════════ */}
      <EditorialSplit
        eyebrow="AM DANIŞMANLIĞI"
        title="Satıcı Değil, Teknik Danışmanınız."
        description="Biyomedikal mühendis geçmişli Account Manager'ımız, cihaz seçiminden teklif sürecine kadar yanınızda. Tarafsız karşılaştırma, teknik destek ve satın alma rehberliği — tek görüşmede."
        ctaText="Danışmanla Görüş"
        ctaHref="/teklif-al"
        videoSrc="/assets/main (2).mp4"
        imageAlt="AM Teknik Danışmanlık"
        reversed
        bgClass="bg-surface-cream"
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 9. AM DANIŞMAN KARTI — Trust & Credibility          */}
      {/* ═══════════════════════════════════════════════════ */}
      <AMConsultantCard />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 10. KLİNİK UZMANLIK ALANLARI                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="kategoriler" className="py-section-sm md:py-section-md lg:py-section-lg bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
              KLİNİK UZMANLIK ALANLARI
            </span>
            <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
              Hangi Branş İçin Ultrason Arıyorsunuz?
            </h2>
            <p className="text-text-muted mt-4 text-base leading-relaxed">
              Her klinik uygulamanın prob frekansı, yazılım algoritmaları ve görüntüleme ihtiyaçları farklıdır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* CATEGORY 1: OB/GYN */}
            <div className="group card-premium bg-surface-canvas border border-border-subtle p-8 rounded-card flex flex-col justify-between hover:border-brand-teal transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 bg-brand-teal-light text-brand-teal rounded-xl flex items-center justify-center text-2xl shadow-xs">
                    🤰
                  </div>
                  <span className="text-eyebrow font-semibold text-text-muted uppercase tracking-widest">
                    OB / GYN
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-text-primary group-hover:text-brand-teal transition-colors">
                  Kadın Doğum &amp; Perinatoloji
                </h3>
                <p className="text-text-muted text-sm mt-3 leading-relaxed">
                  4D HDlive hacimsel fetal görüntüleme, otomatik BPD/FL ölçümü, fetal ekokardiyografi ve endovajinal 3D prob çözümleri.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs font-mono-tech text-text-muted">
                  Önerilen: <strong className="text-text-primary">RAB6-D, V11-3H</strong>
                </span>
                <Link href="/urunler/ultrason" className="text-sm font-semibold text-brand-teal link-underline">
                  İncele →
                </Link>
              </div>
            </div>

            {/* CATEGORY 2: CARDIOLOGY */}
            <div className="group card-premium bg-surface-canvas border border-border-subtle p-8 rounded-card flex flex-col justify-between hover:border-red-500 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl shadow-xs">
                    🫀
                  </div>
                  <span className="text-eyebrow font-semibold text-text-muted uppercase tracking-widest">
                    EKOKARDİYOGRAFİ
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-text-primary group-hover:text-red-500 transition-colors">
                  Kardiyoloji &amp; Vasküler
                </h3>
                <p className="text-text-muted text-sm mt-3 leading-relaxed">
                  Single-crystal faz dizili problar, Auto-EF, Strain Elastografi, Transözofageal (TEE) ve kesintisiz CW Doppler analizi.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs font-mono-tech text-text-muted">
                  Önerilen: <strong className="text-text-primary">M5Sc-D, TEE</strong>
                </span>
                <Link href="/urunler/ultrason" className="text-sm font-semibold text-red-500 link-underline">
                  İncele →
                </Link>
              </div>
            </div>

            {/* CATEGORY 3: RADIOLOGY */}
            <div className="group card-premium bg-surface-canvas border border-border-subtle p-8 rounded-card flex flex-col justify-between hover:border-indigo-500 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-2xl shadow-xs">
                    🩺
                  </div>
                  <span className="text-eyebrow font-semibold text-text-muted uppercase tracking-widest">
                    GENEL USG
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-text-primary group-hover:text-indigo-500 transition-colors">
                  Radyoloji &amp; Abdominal
                </h3>
                <p className="text-text-muted text-sm mt-3 leading-relaxed">
                  Shear Wave doku sertliği elastografisi, karaciğer steatoz ölçümü (ATI/UDFF), kontraslı ultrason (CEUS) yazılımı.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs font-mono-tech text-text-muted">
                  Önerilen: <strong className="text-text-primary">C1-6-D, ML6-15</strong>
                </span>
                <Link href="/urunler/ultrason" className="text-sm font-semibold text-indigo-500 link-underline">
                  İncele →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 11. GÜVEN ROZETİ ŞERİDİ                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <TrustBadgeStrip />

    </div>
  );
}
