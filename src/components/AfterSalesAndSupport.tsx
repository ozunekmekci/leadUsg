export default function AfterSalesAndSupport() {
  const servicePromises = [
    {
      title: "Kapsamlı Aplikatör Eğitimi",
      desc: "Cihaz teslimatının ardından uzman aplikatörlerimiz tarafından klinik ekibinize verilen detaylı kullanım eğitimi.",
      badge: "Klinik Eğitim",
    },
    {
      title: "Hızlı Teknik Destek Süreci",
      desc: "Olası arıza veya yazılım güncellemelerinde zaman kaybetmeden müdahale eden teknik ekip anlayışı.",
      badge: "Aynı Gün Servis",
    },
    {
      title: "Şeffaf Garanti Şartları",
      desc: "Sürpriz maliyetler çıkarmayan, net ve açık garanti sözleşmeleri ile uzun vadeli yatırım güvencesi.",
      badge: "Resmi Güvence",
    },
  ];

  return (
    <section id="servis" className="py-section-sm md:py-section-md lg:py-section-lg bg-surface-canvas border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
              TEKNİK DESTEK VE EĞİTİM
            </span>
            <h2 className="font-display text-section-title font-semibold text-text-primary mt-3">
              Yalnızca Cihaz Değil, Kesintisiz Destek Hizmeti Sunuyoruz
            </h2>
          </div>
          <p className="text-text-muted text-sm max-w-md leading-relaxed">
            Ultrason cihazı yatırımı bir süreçtir. Doğru cihaz seçiminden kurulum aşamasına, klinik eğitimlerden periyodik bakıma kadar her adımda şeffaf ve ulaşılabilir bir hizmet sunuyoruz.
          </p>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {servicePromises.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-card border border-border-subtle card-premium flex flex-col justify-between group hover:border-brand-teal transition-all duration-300"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-md bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-teal font-mono-tech">
                  {item.badge}
                </span>
                
                <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-brand-teal transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-text-muted text-xs leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-text-subtle font-mono-tech">
                <span>Servis Güvencesi</span>
                <span className="text-brand-teal font-bold">&bull; Uyumlu</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
