export default function TrustBadgeStrip() {
  const badges = [
    {
      title: "TİTUBB Kayıtlı",
      subtitle: "Tüm cihazlar TİTUBB / ÜTS sistemine kayıtlıdır.",
      icon: (
        <svg
          className="w-5 h-5 text-text-primary shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Yetkili Servis Garantili",
      subtitle: "Resmi distribütör teknik servis & yedek parça güvencesi.",
      icon: (
        <svg
          className="w-5 h-5 text-text-primary shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      title: "KVKK Uyumlu",
      subtitle: "6698 sayılı kanuna tam uyumlu güvenli veri politikası.",
      icon: (
        <svg
          className="w-5 h-5 text-text-primary shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-surface-cream py-10 md:py-14 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 group cursor-default transition-transform duration-200 hover:scale-105"
            >
              <div className="p-2.5 bg-white rounded-full border border-border-subtle shadow-2xs text-text-primary shrink-0 group-hover:border-brand-teal/40 transition-colors">
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-text-primary leading-tight">
                  {badge.title}
                </span>
                <span className="text-xs text-text-muted mt-0.5 leading-normal">
                  {badge.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

