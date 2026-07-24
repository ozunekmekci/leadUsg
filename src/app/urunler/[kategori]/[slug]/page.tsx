interface ProductDetailPageProps {
  params: {
    kategori: string;
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { kategori, slug } = params || {};
  const slugName = (slug || "").replace(/-/g, " ");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 font-medium">
            Ana Görsel (Gallery Slot 1)
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-video rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-650">
              Görsel 2
            </div>
            <div className="aspect-video rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-650">
              Görsel 3
            </div>
            <div className="aspect-video rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-650">
              Görsel 4
            </div>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">{kategori}</span>
            <h1 className="text-3xl font-extrabold text-white mt-2 capitalize">{slugName || "Cihaz Detay"}</h1>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Bu cihaz modeli hakkında kısa tanıtım metni ve biyomedikal spec detaylarına giriş. En güncel teknolojilerle donatılmış sistem.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
              Teklif Al
            </button>
            <button className="rounded-lg border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-850 hover:text-white transition-colors">
              Karşılaştırmaya Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
