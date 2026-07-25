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
    screenSize: "23.8\" OLED Multi-Touch",
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
    <section className="py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 border border-cyan-300 rounded text-xs font-mono-tech text-cyan-900 font-bold uppercase tracking-wider mb-3">
            <span>ŞEFFAFLIK VE VERİ KARŞILAŞTIRMASI</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
            Pazarlama Klişeleri vs. Somut Biyomedikal Veri
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Broşürlerdeki belirsiz vaatler yerine, yatırım yapacağınız cihazın teknik sınırlarını ve ölçülebilir parametrelerini görün.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT CARD: Pazarlama Broşürü (Generic marketing copy) */}
          <div className="lg:col-span-5 rounded-lg border border-slate-300 bg-slate-200/60 p-6 flex flex-col justify-between shadow-xs">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-300 mb-4">
                <span className="text-xs font-mono-tech font-bold text-slate-500 uppercase tracking-wider">
                  PAZARLAMA BROŞÜRÜ
                </span>
                <span className="text-[11px] font-mono-tech bg-slate-300 text-slate-600 px-2 py-0.5 rounded font-medium">
                  Soyut & Belirsiz
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-700 opacity-90 mb-3">
                &ldquo;Klinik Mükemmellik &amp; Sezgisel İnovasyon&rdquo;
              </h3>

              {/* Fictional generic marketing sentences */}
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed font-sans italic border-l-2 border-slate-400 pl-4 py-1 my-4 bg-slate-100/80 rounded-r p-3">
                <p>
                  &ldquo;Üstün görüntü kalitesi ve devrim niteliğindeki sezgisel arayüzü ile klinik iş akışınızı baştan aşağı dönüştürün.&rdquo;
                </p>
                <p>
                  &ldquo;Yapay zekayla güçlendirilmiş benzersiz akustik mimarimiz sayesinde her hastada eşsiz teşhis güveni elde edin.&rdquo;
                </p>
                <p>
                  &ldquo;Geleceğin teknolojisini bugünden klinğinize taşıyarak tanısal doğruluğu en üst seviyeye çıkarın.&rdquo;
                </p>
              </div>

              <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded text-xs font-mono-tech text-amber-900">
                <span className="font-bold">⚠️ Pazarlama Problemi:</span> Somut prob frekansı, aktif port sayısı veya elastografi tipi verilmez; karşılaştırma yapmak imkansızlaşır.
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-300 text-right">
              <span className="text-xs font-mono-tech text-slate-500">Kaynak: Standart Üretici Broşürü</span>
            </div>
          </div>

          {/* VS Divider Badge for Desktop */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center -mx-4 z-10">
            <div className="h-12 w-12 rounded-full bg-slate-950 text-white font-mono-tech font-bold text-xs flex items-center justify-center border-2 border-cyan-500 shadow-xl">
              VS
            </div>
          </div>

          {/* RIGHT CARD: leadUsg Analizi (Concrete SpecTable) */}
          <div className="lg:col-span-6 rounded-lg border-2 border-cyan-600 bg-white p-6 shadow-xl flex flex-col justify-between relative">
            
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <span className="text-xs font-mono-tech font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-600 animate-pulse"></span>
                  LEADUSG TEKNİK TELEMETRİ ANALİZİ
                </span>
                <span className="text-[11px] font-mono-tech bg-cyan-100 text-cyan-900 px-2 py-0.5 rounded font-bold border border-cyan-200">
                  Somut & Ölçülebilir
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
                Doğrulanmış Biyomedikal Parametre Tablosu
              </h3>

              {/* Reusing existing SpecTable component */}
              <div className="my-4">
                <SpecTable products={[fictionalSampleProduct]} />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-mono-tech text-cyan-800 font-medium">
                ✓ %100 Bağımsız Doğrulanmış Veri
              </span>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <Link
            href="/karsilastir"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-cyan-700 text-white font-mono-tech font-bold text-sm rounded-md shadow-lg transition-all border border-slate-800 group"
          >
            <span>Kendi Karşılaştırmanı Yap</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
