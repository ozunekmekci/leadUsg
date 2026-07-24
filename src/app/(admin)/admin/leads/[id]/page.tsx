interface AdminLeadDetailPageProps {
  params: {
    id: string;
  };
}

export default function AdminLeadDetailPage({ params }: AdminLeadDetailPageProps) {
  const { id } = params || {};
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
      <div className="border-b border-slate-800 pb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase">Lead ID: {id}</span>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">Dr. Ahmet Yılmaz</h1>
          <p className="text-slate-400 mt-2">Özel Kadın Doğum Polikliniği</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-slate-700 bg-slate-800 text-sm text-white px-4 py-2 outline-none">
            <option>Lead Geldi</option>
            <option>Arandı</option>
            <option>Sıcak</option>
            <option>Soğuk</option>
            <option>Satış</option>
            <option>Kapalı</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card & Specs */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">İletişim Bilgileri</h3>
            <div className="text-sm text-slate-400 flex flex-col gap-2">
              <div>Telefon: <span className="text-white">0500 000 00 00</span></div>
              <div>E-posta: <span className="text-white">ahmet@klinik.com</span></div>
              <div>Bütçe Aralığı: <span className="text-white">2-3M TL</span></div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Etkinlik Zaman Çizelgesi (Timeline)</h3>
            <div className="flex flex-col gap-6 pl-4 border-l border-slate-850 mt-4">
              <div className="relative">
                <div className="absolute -left-[21px] mt-1.5 h-3.5 w-3.5 rounded-full bg-blue-500 border-2 border-slate-900" />
                <div className="text-sm font-semibold text-white">Karşılaştırma Yapıldı</div>
                <div className="text-xs text-slate-500 mt-1">GE Logiq E10 ile Samsung Hera W9 karşılaştırıldı</div>
                <div className="text-xs text-slate-650 mt-1">24.07.2026 14:30</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] mt-1.5 h-3.5 w-3.5 rounded-full bg-indigo-500 border-2 border-slate-900" />
                <div className="text-sm font-semibold text-white">Ürün Detayı İnceleme</div>
                <div className="text-xs text-slate-500 mt-1">Samsung Hera W9 detay sayfası ziyaret edildi</div>
                <div className="text-xs text-slate-650 mt-1">24.07.2026 14:25</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
