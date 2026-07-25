export default function AIAndAutomation() {
  const aiFeatures = [
    {
      title: "Otomatik Fetal Biyometri (OB/GYN)",
      desc: "BPD, HC, AC ve FL gibi fetal parametreleri yapay zeka ile saniyeler içinde otomatik algılar ve ölçer.",
      code: "01",
    },
    {
      title: "Akıllı Kardiyak Analiz",
      desc: "Sol ventrikül ejeksiyon fraksiyonunu (EF) ve strain parametrelerini tek tıkla otomatik hesaplar.",
      code: "02",
    },
    {
      title: "Lezyon ve Doku Sınıflandırma (Radyoloji)",
      desc: "Meme ve tiroit kitlelerinde BI-RADS ve TI-RADS standartlarına uygun otomatik sınıflandırma ve boyutlandırma desteği sunar.",
      code: "03",
    },
    {
      title: "Görüntü Optimizasyonu",
      desc: "Manuel tuş ayarı ihtiyacını azaltan, B-Mode ve Doppler parametrelerini derinliğe göre otomatik ayarlayan akıllı doku tanıma.",
      code: "04",
    },
  ];

  return (
    <section className="py-section-sm md:py-section-md lg:py-section-lg bg-surface-canvas border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
            AKILLI GÖRÜNTÜLEME TEKNOLOJİLERİ
          </span>
          <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
            Yapay Zeka Destekli Ultrason Teknolojisi ile Hızlı ve Standart Muayene
          </h2>
          <p className="text-text-body text-base mt-4 max-w-3xl mx-auto font-sans leading-relaxed">
            Günümüz medikal görüntüleme dünyasında <strong>GE (SonoLyst / cSound), Samsung (BiometryAssist), Mindray (Smart Scene 3D), Siemens ve Canon (SMI)</strong> gibi dünya lideri markaların geliştirdiği <strong>yapay zeka (AI) algoritmaları</strong>, ultrason cihazlarını pasif bir görüntüleme aracından aktif bir klinik asistana dönüştürüyor. Yapay zeka destekli ultrason sistemleri; klinik iş akışını hızlandırırken kullanıcıya bağlı ölçüm sapmalarını ortadan kaldırır:
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {aiFeatures.map((feat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-card border border-border-subtle shadow-card-rest flex gap-4 hover:border-brand-teal transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-teal/10 text-brand-teal font-mono-tech font-bold flex items-center justify-center text-sm shrink-0">
                {feat.code}
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-text-primary text-sm sm:text-base">
                  {feat.title}
                </h4>
                <p className="font-sans text-xs text-text-muted leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
