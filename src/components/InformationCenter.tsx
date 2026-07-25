

export default function InformationCenter() {
  const articles = [
    {
      title: "Ultrason Cihazı Alırken Dikkat Edilmesi Gereken 5 Temel Teknik Parametre",
      desc: "Prob frekans aralığı, kanal sayısı ve ekran teknolojisi gibi donanım kriterlerinin teşhis kalitesine etkilerini inceleyin.",
      readTime: "6 dk okuma",
      tag: "Cihaz Seçimi",
    },
    {
      title: "Renkli Doppler Ultrason Fiyatlarını Belirleyen Donanım ve Yazılım Özellikleri",
      desc: "Medikal cihaz alımında bütçe planlaması yaparken gizli maliyetlerden kaçınmanın ve doğru segmentasyonu yapmanın yolları.",
      readTime: "8 dk okuma",
      tag: "Bütçe & Planlama",
    },
    {
      title: "Yapay Zeka Destekli Ultrasonlar Klinik Süreçleri Nasıl Hızlandırıyor?",
      desc: "GE, Samsung ve Mindray gibi markaların geliştirdiği otomatik fetal biyometri ve strain analiz yazılımlarının getirdiği kolaylıklar.",
      readTime: "5 dk okuma",
      tag: "Yeni Teknolojiler",
    },
  ];

  return (
    <section id="blog" className="py-section-sm md:py-section-md lg:py-section-lg bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
            SEÇİM REHBERİ
          </span>
          <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
            Ultrason Alımında Doğru Karar İçin Rehberler
          </h2>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-surface-canvas p-6 rounded-card border border-border-subtle hover:border-brand-teal hover:bg-white shadow-xs hover:shadow-card-hover flex flex-col justify-between h-[280px] transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech font-bold text-brand-teal uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono-tech text-text-muted">
                    {item.readTime}
                  </span>
                </div>
                
                <h3 className="font-display text-base font-bold text-text-primary group-hover:text-brand-teal transition-colors leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3 font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono-tech">
                <span className="text-text-subtle">Makaleyi Oku</span>
                <span className="text-brand-teal font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
