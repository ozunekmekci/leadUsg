import Link from "next/link";
import SpecTable from "./products/SpecTable";
import { ProductItem } from "./products/ProductCard";

// Fictional sample product for side-by-side comparison demonstration
const fictionalSampleProduct: ProductItem = {
  id: 99901,
  slug: "apexvision-x9",
  name: "ApexVision X9",
  brand: "Kurgusal Sistem",
  category: "ultrason",
  description: "Sayısallaştırılmış teknik biyomedikal telemetri gösterimi.",
  specs: {
    screenSize: '23.8" OLED Multi-Touch',
    probePorts: 5,
    portable: false,
    priceSegment: "Üst Klasman",
    beamformer: "1024 Kanal Matrix Beamformer",
    elastography: true,
    transducerType: "Single Crystal Sector (M5Sc)",
    applicationAreas: ["Kardiyoloji", "Radyoloji", "Kadın Doğum"],
    highlights: [
      "120 Hz Gerçek Zamanlı Doppler Taraması",
      "Quantitative Shear Wave Dokusal Elastografi",
      "AI Otomatik Biometri & EF Ölçümü",
    ],
  },
};

export default function BeforeAfterTeaser() {
  return (
    <section className="bg-white py-section-sm md:py-section-md lg:py-section-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-widest text-brand-teal font-semibold block mb-2">
            TEKNİK KARŞILAŞTIRMA
          </span>
          <h2 className="font-display text-section-title font-bold text-text-primary tracking-tight">
            Pazarlama Değil, Gerçek Veri.
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-3 leading-relaxed">
            Broşürlerdeki belirsiz vaatler yerine, yatırım yapacağınız cihazın
            teknik sınırlarını ve ölçülebilir parametrelerini görün.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT CARD: Pazarlama Broşürü (Generic marketing copy) */}
          <div className="lg:col-span-5 rounded-card border border-border-subtle bg-surface-cream/60 p-6 md:p-8 flex flex-col justify-between shadow-card-rest">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
                <span className="text-xs font-mono-tech font-bold text-text-muted uppercase tracking-wider">
                  PAZARLAMA BROŞÜRÜ
                </span>
                <span className="text-[11px] font-mono-tech bg-surface-cream text-text-muted px-2.5 py-0.5 rounded font-medium border border-border-subtle">
                  Soyut &amp; Belirsiz
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                &ldquo;Klinik Mükemmellik &amp; Sezgisel İnovasyon&rdquo;
              </h3>

              {/* Fictional generic marketing sentences */}
              <div className="space-y-3 text-sm text-text-muted leading-relaxed font-sans italic border-l-2 border-border-medium pl-4 py-1 my-4 bg-white/70 rounded-r p-3">
                <p>
                  &ldquo;Üstün görüntü kalitesi ve devrim niteliğindeki sezgisel
                  arayüzü ile klinik iş akışınızı baştan aşağı dönüştürün.&rdquo;
                </p>
                <p>
                  &ldquo;Yapay zekayla güçlendirilmiş benzersiz akustik
                  mimarimiz sayesinde her hastada eşsiz teşhis güveni elde
                  edin.&rdquo;
                </p>
                <p>
                  &ldquo;Geleceğin teknolojisini bugünden kliniğinize taşıyarak
                  tanısal doğruluğu en üst seviyeye çıkarın.&rdquo;
                </p>
              </div>

              <div className="mt-6 p-3.5 bg-amber-50 border border-amber-200/80 rounded-lg text-xs font-mono-tech text-amber-900">
                <span className="font-bold">⚠️ Pazarlama Problemi:</span> Somut
                prob frekansı, aktif port sayısı veya elastografi tipi verilmez;
                karşılaştırma yapmak imkansızlaşır.
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-border-subtle text-right">
              <span className="text-xs font-mono-tech text-text-muted">
                Kaynak: Standart Üretici Broşürü
              </span>
            </div>
          </div>

          {/* VS Divider Badge for Desktop */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center -mx-4 z-10">
            <div className="h-10 w-10 rounded-full bg-brand-dark text-white font-mono-tech font-bold text-xs flex items-center justify-center border-2 border-brand-teal shadow-md">
              VS
            </div>
          </div>

          {/* RIGHT CARD: leadUsg Analizi (Concrete SpecTable) */}
          <div className="lg:col-span-6 rounded-card border-2 border-brand-teal bg-white p-6 md:p-8 shadow-card-elevated flex flex-col justify-between relative">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
                <span className="text-xs font-mono-tech font-bold text-brand-teal uppercase tracking-wider flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                  LEADUSG TEKNİK TELEMETRİ ANALİZİ
                </span>
                <span className="text-[11px] font-mono-tech bg-brand-teal-light text-brand-teal px-2.5 py-0.5 rounded font-bold border border-brand-teal/20">
                  Somut &amp; Ölçülebilir
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                Doğrulanmış Biyomedikal Parametre Tablosu
              </h3>

              {/* Reusing existing SpecTable component */}
              <div className="my-4">
                <SpecTable products={[fictionalSampleProduct]} />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs font-mono-tech text-brand-teal font-medium flex items-center gap-1.5">
                ✓ %100 Bağımsız Doğrulanmış Veri
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <Link
            href="/karsilastir"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-hover text-white font-mono-tech font-semibold text-sm rounded-pill shadow-md transition-all hover:shadow-lg group"
          >
            <span>Cihazları Karşılaştır</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

