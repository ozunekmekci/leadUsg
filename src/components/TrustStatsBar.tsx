export default function TrustStatsBar() {
  const stats = [
    {
      num: "Geniş Marka & Model Seçeneği",
      label: "İhtiyacınıza Özel Terzileme Çözüm",
    },
    {
      num: "Yerinde Demo & Deneyim",
      label: "Cihazı Kendi Kliniğinizde Deneme İmkanı",
    },
    {
      num: "Sorunsuz Garanti & Destek",
      label: "Kurulum, Eğitim ve Satış Sonrası Servis",
    },
  ];

  return (
    <section className="bg-white border-y border-border-subtle py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 relative">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-center relative px-4">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-display text-xl md:text-2xl font-bold text-text-primary">
                  {stat.num}
                </span>
                <span className="font-sans text-xs text-text-muted mt-2 max-w-xs leading-relaxed">
                  {stat.label}
                </span>
              </div>

              {/* Vertical divider on desktop */}
              {idx < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-border-subtle" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
