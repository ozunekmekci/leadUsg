import type { Metadata } from "next";
import Link from "next/link";
import ConsentBanner from "@/components/ConsentBanner";
import AnnouncementBar from "@/components/AnnouncementBar";
import MobileStickyBar from "@/components/MobileStickyBar";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "leadUsg | Türkiye'nin Güvenilir Ultrason Karşılaştırma Platformu",
  description:
    "Bağımsız, tarafsız, şeffaf. Medikal ultrason cihazlarını teknik parametreleriyle karşılaştırın, uzman danışmanlık alın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen bg-surface-canvas text-text-primary">
        
        {/* ANIMATED ANNOUNCEMENT BAR */}
        <AnnouncementBar />

        {/* MAIN HEADER — Glassmorphism */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border-subtle shadow-header">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 bg-brand-teal rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3L3 20A14 14 0 0 0 21 20L12 3Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 14A8 8 0 0 0 16.5 14" stroke="white" strokeOpacity="0.6" strokeDasharray="2 2"/>
                  <circle cx="12" cy="4" r="1.5" fill="white"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-text-primary">
                  Lead<span className="text-brand-teal">USG</span>
                </span>
                <span className="hidden sm:block text-[10px] font-mono-tech tracking-widest text-text-muted uppercase">
                  MedUltrasound
                </span>
              </div>
            </Link>

            {/* NAV LINKS — Center */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-text-body">
              <Link href="/" className="link-underline hover:text-text-primary transition-colors py-1">
                Ana Sayfa
              </Link>
              <Link href="/urunler/ultrason" className="link-underline hover:text-text-primary transition-colors py-1">
                Ultrason Cihazları
              </Link>
              <Link href="/karsilastir" className="link-underline hover:text-text-primary transition-colors py-1">
                Karşılaştırma Modülü
              </Link>
              <Link href="/#servis" className="link-underline hover:text-text-primary transition-colors py-1">
                Teknik Servis &amp; Garanti
              </Link>
              <Link href="/#kurumsal" className="link-underline hover:text-text-primary transition-colors py-1">
                Kurumsal
              </Link>
              <Link href="/#blog" className="link-underline hover:text-text-primary transition-colors py-1">
                Sağlık Teknolojileri Blog
              </Link>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              <Link
                href="/karsilastir"
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-text-body border border-border-subtle hover:border-brand-teal hover:text-brand-teal px-4 py-2 rounded-pill transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                </svg>
                Matrix
              </Link>
              <Link
                href="/teklif-al"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-teal hover:bg-brand-teal-hover px-5 py-2.5 rounded-pill transition-all shadow-sm"
              >
                <span>Teklif Al</span>
                <span>→</span>
              </Link>
              <Link
                href="/admin"
                className="hidden lg:inline text-xs font-mono-tech text-text-subtle hover:text-text-muted transition-colors"
              >
                AM
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* PREMIUM 4-COLUMN FOOTER */}
        <footer className="bg-brand-dark text-white/60 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              
              {/* Column 1: Brand & Mission */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="h-8 w-8 bg-brand-teal rounded-lg flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3L3 20A14 14 0 0 0 21 20L12 3Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">
                    Lead<span className="text-brand-teal">USG</span>
                  </span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                  Sağlık kurumları ve hekimler için en uygun ultrason cihazlarını şeffaf karşılaştırma, hızlı teklif süreci ve güvenilir teknik destek ile buluşturan medikal teknoloji platformu.
                </p>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                  Ürünler
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/urunler/ultrason?type=console" className="text-white/50 hover:text-white transition-colors">
                      Konsol Ultrasonlar
                    </Link>
                  </li>
                  <li>
                    <Link href="/urunler/ultrason?type=portable" className="text-white/50 hover:text-white transition-colors">
                      Taşınabilir Sistemler
                    </Link>
                  </li>
                  <li>
                    <Link href="/urunler/ultrason?type=probe" className="text-white/50 hover:text-white transition-colors">
                      Problar &amp; Aksesuarlar
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Process */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                  Süreç
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/teklif-al" className="text-white/50 hover:text-white transition-colors">
                      Teklif İste
                    </Link>
                  </li>
                  <li>
                    <Link href="/karsilastir" className="text-white/50 hover:text-white transition-colors">
                      Cihaz Karşılaştır
                    </Link>
                  </li>
                  <li>
                    <Link href="/teklif-al?demo=true" className="text-white/50 hover:text-white transition-colors">
                      Demo Talebi
                    </Link>
                  </li>
                  <li>
                    <Link href="/#servis" className="text-white/50 hover:text-white transition-colors">
                      Garanti Şartları
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Legal */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                  Yasal
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/kvkk" className="text-white/50 hover:text-white transition-colors">
                      KVKK Aydınlatma Metni
                    </Link>
                  </li>
                  <li>
                    <span className="text-white/50">
                      Kullanım Koşulları
                    </span>
                  </li>
                  <li>
                    <span className="text-white/50">
                      Çerez Politikası
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/30">
                © 2026 LeadUSG. Tüm Hakları Saklıdır.
              </p>
              <p className="text-xs text-white/20 font-mono-tech">
                Medikal Ultrason Karşılaştırma ve Danışmanlık Platformu
              </p>
            </div>
          </div>
        </footer>

        {/* Mobile Sticky CTA */}
        <MobileStickyBar />

        {/* Consent Banner */}
        <ConsentBanner />
      </body>
    </html>
  );
}
