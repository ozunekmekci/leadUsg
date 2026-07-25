import Link from "next/link";

interface SpecialtyItem {
  emoji: string;
  tag: string;
  title: string;
  description: string;
  recommends?: string;
  colorClass: string;
}

export default function SpecialtiesSection() {
  const specialties: SpecialtyItem[] = [
    {
      emoji: "🤰",
      tag: "OB / GYN",
      title: "Kadın Doğum & Jinekoloji Ultrasonları",
      description: "HD Live 3D/4D görüntüleme, otomatik fetal biyometri ölçümleri ve yüksek çözünürlüklü vajinal prob seçenekleri.",
      recommends: "RAB6-D, V11-3H",
      colorClass: "hover:border-brand-teal border-border-subtle",
    },
    {
      emoji: "🫀",
      tag: "KARDİYOLOJİ",
      title: "Kardiyoloji & Damar Sağlığı Ultrasonları",
      description: "Hassas renkli Doppler akış mimarisi, Single Crystal prob teknolojisi ve otomatik EF (Ejeksiyon Fraksiyonu) ölçüm yazılımları.",
      recommends: "M5Sc-D, TEE Problar",
      colorClass: "hover:border-red-500 border-border-subtle",
    },
    {
      emoji: "🩺",
      tag: "RADYOLOJİ",
      title: "Radyoloji & Genel Ultrason Cihazları",
      description: "Derin doku çözünürlüğü, elastografi (dokusal sertlik haritalama) ve kontrastlı görüntüleme modülleri.",
      recommends: "C1-6-D, ML6-15",
      colorClass: "hover:border-indigo-500 border-border-subtle",
    },
    {
      emoji: "📱",
      tag: "POCUS & MOBİL",
      title: "POCUS & Mobil Taşınabilir Ultrasonlar",
      description: "Acil servis, yoğun bakım ve saha muayeneleri için hafif, bataryalı, hızlı açılan kompakt sistemler.",
      recommends: "Linear & Convex Mobil Problar",
      colorClass: "hover:border-amber-500 border-border-subtle",
    },
    {
      emoji: "🦴",
      tag: "MSK & ANESTEZİ",
      title: "Kas-İskelet (MSK) & Anestezi",
      description: "İğne görünürlüğünü artıran yazılımlar ve sinir blokajı süreçleri için yüksek frekanslı lineer problar.",
      recommends: "L8-18i Yüksek Frekans",
      colorClass: "hover:border-emerald-500 border-border-subtle",
    },
  ];

  return (
    <section id="kategoriler" className="py-section-sm md:py-section-md lg:py-section-lg bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
            KLİNİK UYGULAMALAR
          </span>
          <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
            Uzmanlık Alanınıza Uygun Ultrason Sistemleri
          </h2>
          <p className="text-text-muted mt-4 text-base leading-relaxed">
            Farklı tıbbi branşların görüntüleme derinliği ve prob ihtiyaçları farklıdır. Branşınıza özel optimize edilmiş <strong>renkli Doppler ultrason cihazları</strong> ve <strong>yüksek frekanslı probları</strong> keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
          {specialties.map((item, idx) => (
            <div 
              key={idx} 
              className={`group card-premium bg-surface-canvas border p-8 rounded-card flex flex-col justify-between transition-all duration-300 ${item.colorClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 bg-brand-teal-light text-brand-teal rounded-xl flex items-center justify-center text-2xl shadow-xs">
                    {item.emoji}
                  </div>
                  <span className="text-eyebrow font-semibold text-text-muted uppercase tracking-widest text-[10px]">
                    {item.tag}
                  </span>
                </div>
                
                <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-brand-teal transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-text-muted text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="mt-8 pt-5 border-t border-border-subtle flex items-center justify-between">
                {item.recommends && (
                  <span className="text-xs font-mono-tech text-text-muted">
                    Önerilen: <strong className="text-text-primary">{item.recommends}</strong>
                  </span>
                )}
                <Link href="/urunler/ultrason" className="text-sm font-semibold text-brand-teal link-underline">
                  İncele &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
