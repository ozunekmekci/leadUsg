export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Cihaz Karşılaştırma
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Seçtiğiniz medikal cihazların teknik özelliklerini yan yana detaylıca karşılaştırın.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-sm text-slate-400 border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950">
              <th className="p-4 font-semibold text-white">Özellikler</th>
              <th className="p-4 font-semibold text-white">Cihaz A</th>
              <th className="p-4 font-semibold text-white">Cihaz B</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            <tr>
              <td className="p-4 font-medium text-slate-200">Uygulama Alanları</td>
              <td className="p-4">Radyoloji, Kadın Doğum, Kardiyoloji</td>
              <td className="p-4">Radyoloji, Kadın Doğum</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-200">Prob Portu Sayısı</td>
              <td className="p-4">4 Aktif Port</td>
              <td className="p-4">3 Aktif Port</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-200">Ekran Boyutu</td>
              <td className="p-4">22 inç OLED</td>
              <td className="p-4">21.5 inç LCD</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
