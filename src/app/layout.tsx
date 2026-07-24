import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "leadUsg | Medikal Cihaz Broker Platformu",
  description: "Türkiye'nin en kapsamlı medikal cihaz brokerlik ve karşılaştırma platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-slate-950 text-slate-100`}
      >
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                leadUsg
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                <Link href="/urunler/ultrason" className="hover:text-white transition-colors">
                  Ultrason
                </Link>
                <Link href="/urunler/mr" className="hover:text-white transition-colors">
                  MR
                </Link>
                <Link href="/urunler/bt" className="hover:text-white transition-colors">
                  BT
                </Link>
                <Link href="/urunler/rontgen" className="hover:text-white transition-colors">
                  Röntgen
                </Link>
                <Link href="/karsilastir" className="hover:text-white transition-colors">
                  Karşılaştır
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/teklif-al"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
              >
                Teklif Al
              </Link>
              <Link href="/admin" className="text-sm text-slate-400 hover:text-white transition-colors">
                AM Giriş
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-slate-900 text-slate-400 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-slate-200">leadUsg</span>
              <p className="max-w-md text-xs text-slate-500">
                Medikal görüntüleme cihazlarının karşılaştırma, analiz ve brokerlik platformu.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs">
              <Link href="/urunler/ultrason" className="hover:text-slate-200">Cihazlar</Link>
              <Link href="/karsilastir" className="hover:text-slate-200">Karşılaştırma</Link>
              <Link href="/teklif-al" className="hover:text-slate-200">Teklif Al</Link>
              <span className="text-slate-600">|</span>
              <p>&copy; {new Date().getFullYear()} leadUsg. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
