export default function QualityAndPrecision() {
  const highlights = [
    {
      title: "Düşük Artefakt & Yüksek Kontrast",
      desc: "Dokular arası sınırları netleştiren ve tanısal hataları azaltan adaptif görüntü işleme teknolojileri.",
    },
    {
      title: "Gelişmiş Prob Teknolojisi",
      desc: "Geniş frekans aralığına ve yüksek penetrasyona sahip tek kristal (Single Crystal) prob yapısı.",
    },
    {
      title: "Kesintisiz Renkli Doppler Akışı",
      desc: "Yüksek kare hızında (FPS) hemodinamik değerlendirme ve yavaş kan akımlarını hassas görüntüleme imkanı.",
    },
  ];

  return (
    <section className="py-section-sm md:py-section-md lg:py-section-lg bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
                KLİNİK HASSASİYET VE TEKNOLOJİ
              </span>
              <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
                Kristal Netliğinde Doku Ayrıştırması ve Kesin Teşhis
              </h2>
            </div>
            
            <p className="text-text-body text-base leading-relaxed max-w-2xl font-sans">
              Modern tanı süreçlerinde <strong>ultrason görüntü kalitesi</strong>, teşhis doğruluğunun temelini oluşturur. Gelişmiş ışın oluşturma (beamforming) mimarisi ve adaptif gürültü bastırma algoritmaları, en zorlu hasta yapılarında bile yüksek kontrast çözünürlüğü sağlar. Mikro kireçlenmeleri, ince damar yapılarını ve yavaş kan akışlarını <strong>yüksek hassasiyetli renkli Doppler</strong> teknolojisi ile net bir şekilde görüntüleyin.
            </p>

            <div className="grid grid-cols-1 gap-5 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-semibold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-text-primary text-sm">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video Visual Column */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-[4/3] bg-brand-dark border border-border-subtle shadow-card-rest">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-90"
            >
              <source src="/assets/main (1).mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-mono-tech text-[10px] text-white/80 bg-black/60 px-3 py-1 rounded backdrop-blur-xs">
                Real-Time Doppler Flow Telemetry
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
