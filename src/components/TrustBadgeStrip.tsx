export default function TrustBadgeStrip() {
  const badges = [
    {
      label: "TİTUBB Kayıtlı Üreticiler",
      title: "Tüm cihazlar Türkiye İlaç ve Tıbbi Cihaz Ulusal Bilgi Bankası (TİTUBB / ÜTS) kayıtlıdır.",
      icon: (
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: "Yetkili Servis Garantili",
      title: "Cihazlar resmi distribütör yetkili teknik servis garantisi ve yedek parça taahhüdü altındadır.",
      icon: (
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      label: "KVKK Uyumlu Veri Politikası",
      title: "Kullanıcı ve talep verileri 6698 sayılı KVKK mevzuatına tam uyumlu olarak işlenmektedir.",
      icon: (
        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-6 bg-slate-100/80 border-t border-slate-200 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center sm:text-left">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              title={badge.title}
              className="inline-flex items-center gap-2 text-xs font-mono-tech text-slate-600 hover:text-slate-900 transition-colors cursor-help group"
            >
              <div className="p-1.5 bg-white border border-slate-200 rounded-full group-hover:border-slate-300 transition-colors shadow-2xs">
                {badge.icon}
              </div>
              <span className="font-medium tracking-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
