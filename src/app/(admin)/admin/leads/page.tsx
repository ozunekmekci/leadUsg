export default function AdminLeadsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Leads Yönetimi</h1>
        <p className="text-slate-400">
          Gelen teklif talepleri ve davranışsal ziyaretçi verilerinin birleşik listesi.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-sm text-slate-400 border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950">
              <th className="p-4 font-semibold text-white">İsim / Kurum</th>
              <th className="p-4 font-semibold text-white">Telefon</th>
              <th className="p-4 font-semibold text-white">Statü</th>
              <th className="p-4 font-semibold text-white">Tarih</th>
              <th className="p-4 font-semibold text-white">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            <tr>
              <td className="p-4">
                <div className="font-semibold text-white">Dr. Ahmet Yılmaz</div>
                <div className="text-xs text-slate-500">Özel Kadın Doğum Polikliniği</div>
              </td>
              <td className="p-4">0500 000 00 00</td>
              <td className="p-4">
                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Lead Geldi
                </span>
              </td>
              <td className="p-4 text-xs text-slate-500">24.07.2026</td>
              <td className="p-4">
                <span className="text-xs font-semibold text-blue-400 hover:text-white cursor-pointer transition-colors">Detay &rarr;</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
