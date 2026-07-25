import type { Metadata } from "next";
import Link from "next/link";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "leadUsg | Medikal Ultrason Sistemleri & Karşılaştırma Platformu",
  description: "Türkiye'nin en kapsamlı biyomedikal ultrason karşılaştırma ve teknik analiz platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
        
        {/* TOP CLINICAL TELEMETRY BAR */}
        <div className="bg-slate-950 text-slate-400 text-xs font-mono-tech border-b border-slate-800 py-2 px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              LEADUSG CLINICAL TELEMETRY v2.6
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">Doğrulanmış Üretici Veritabanı: GE, Philips, Samsung, Siemens, Canon, Mindray</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Karşılaştırma Engine <code>v2.6</code></span>
            <Link href="/teklif-al" className="text-cyan-400 hover:underline">Uzman Danışmanlığı ↗</Link>
          </div>
        </div>

        {/* MAIN HEADER */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 bg-slate-950 border border-slate-800 rounded flex items-center justify-center text-cyan-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3L3 20A14 14 0 0 0 21 20L12 3Z" stroke="#0ea5e9" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 14A8 8 0 0 0 16.5 14" stroke="#06b6d4" strokeDasharray="2 2"/>
                  <circle cx="12" cy="4" r="1.5" fill="#ef4444"/>
                </svg>
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-slate-950">lead<span className="text-cyan-600">USG</span></span>
                <span className="block text-[10px] font-mono-tech tracking-widest text-slate-500 uppercase">Ultrasound Intelligence</span>
              </div>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
              <Link href="/urunler/ultrason" className="hover:text-cyan-600 transition-colors">Ultrason Kataloğu</Link>
              <Link href="/#kategoriler" className="hover:text-cyan-600 transition-colors">Uzmanlık Alanları</Link>
              <Link href="/#markalar" className="hover:text-cyan-600 transition-colors">Marka Portföyü</Link>
              <Link href="/karsilastir" className="hover:text-cyan-600 transition-colors flex items-center gap-1.5">
                <span>Karşılaştırma Matrix</span>
                <span className="text-[10px] font-mono-tech px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">LIVE</span>
              </Link>
            </div>

            {/* ACTION CTA */}
            <div className="flex items-center gap-3">
              <Link href="/karsilastir" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-800 bg-slate-100 border border-slate-300 hover:bg-slate-200 px-4 py-2 rounded transition-all">
                Matrix&apos;e Git
              </Link>
              <Link href="/teklif-al" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-slate-900 border border-slate-800 hover:bg-cyan-700 px-4 py-2 rounded transition-all shadow-sm">
                <span>Teklif & Danışmanlık</span>
                <span>→</span>
              </Link>
              <Link href="/admin" className="text-xs font-mono-tech text-slate-400 hover:text-slate-700 transition-colors">
                AM Giriş
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-950 text-slate-400 py-10 text-xs font-mono-tech border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-display text-sm font-bold text-white">LEADUSG PLATFORMS © {new Date().getFullYear()}</span>
              <p className="text-slate-500 mt-0.5">Medikal Ultrason Broker ve Teknik Telemetri Sistemi</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/kvkk" className="hover:text-cyan-400">KVKK Aydınlatma Metni</Link>
              <Link href="#" className="hover:text-cyan-400">Biyomedikal Standartlar</Link>
            </div>
          </div>
        </footer>

        {/* Consent Banner */}
        <ConsentBanner />
      </body>
    </html>
  );
}
