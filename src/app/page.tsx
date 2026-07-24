import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-950">
      {/* Glow backgrounds */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-400 ring-1 ring-slate-800 hover:ring-slate-700">
              Türkiye&apos;nin İlk Medikal Broker Platformu{" "}
              <Link href="/urunler/ultrason" className="font-semibold text-blue-400 ml-1">
                <span className="absolute inset-0" aria-hidden="true" />
                Ultrason Cihazları <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Doğru Medikal Cihazı En İyi Şartlarla Keşfedin
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Klinikler ve hastaneler için özel olarak tasarlanmış ultrason, MR, BT ve röntgen karşılaştırma platformu. 
            Cihaz özelliklerini tarafsızca inceleyin, yan yana karşılaştırın ve anında özel teklifler alın.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/urunler/ultrason"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              Ultrason Cihazlarını İncele
            </Link>
            <Link href="/karsilastir" className="text-sm font-semibold leading-6 text-white hover:text-slate-300 transition-colors">
              Karşılaştırma Modülü <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
