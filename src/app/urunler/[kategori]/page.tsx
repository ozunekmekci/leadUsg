interface CategoryPageProps {
  params: {
    kategori: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { kategori } = params || {};
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white capitalize">
          {kategori} Cihazları
        </h1>
        <p className="text-slate-400 max-w-2xl">
          En popüler ve gelişmiş {kategori} modellerini inceleyin, karşılaştırın ve teklif alın.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        {[1, 2, 3].map((num) => (
          <div key={num} className="rounded-xl border border-slate-800 bg-slate-900 p-6 flex flex-col gap-4">
            <div className="aspect-video w-full rounded-lg bg-slate-800 animate-pulse flex items-center justify-center text-slate-600 text-xs">
              Görsel Slotu
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">Marka {num}</span>
              <h3 className="text-lg font-bold text-white mt-1">Cihaz Model {num}</h3>
              <p className="text-sm text-slate-400 mt-2">
                Bu kategori altındaki cihaz modelinin kısa açıklama alanı ve öne çıkan 2-3 teknik özelliği.
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-slate-850 pt-4">
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0 focus:ring-offset-0" />
                Karşılaştır
              </label>
              <span className="text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                Detay &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
