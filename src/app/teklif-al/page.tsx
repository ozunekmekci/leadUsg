"use client";

export default function ProposalPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <div className="flex flex-col gap-2 border-b border-slate-800 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-white">Teklif İsteyin</h1>
          <p className="text-sm text-slate-400">
            Klinik veya hastanenizin ihtiyaçlarına en uygun cihaz için özel distribütör teklifi hazırlayalım.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">Ad Soyad</label>
            <input
              type="text"
              placeholder="Ahmet Yılmaz"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-0 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">Kurum / Klinik Adı</label>
            <input
              type="text"
              placeholder="Özel Radyoloji Polikliniği"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-0 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">Telefon Numarası</label>
            <input
              type="tel"
              placeholder="0500 000 00 00"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-0 outline-none"
            />
          </div>
          <button className="mt-4 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20">
            Teklif Talebi Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
