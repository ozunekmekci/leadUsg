import Link from "next/link";
import TrustStatsBar from "./TrustStatsBar";

export default function VideoHero() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[100vh] w-full overflow-hidden flex items-center bg-brand-dark">
      {/* Background HTML5 Video Loop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50 scale-105"
        >
          <source src="/assets/Free-to-Use Stock Footage of Ultrasound.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Video Overlay Gradient */}
      <div className="hero-video-overlay absolute inset-0 z-10"></div>
      
      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-teal/20 border border-brand-teal/40 rounded-full mb-6 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="font-sans uppercase tracking-widest text-brand-teal-light text-xs font-semibold">
              ◆ ULTRASON SEÇİMİNDE BAĞIMSIZ TEKNİK REHBER
            </span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 drop-shadow-sm">
            Ultrason seçimi, tahminle değil ölçülebilir veriyle olmalı.
          </h1>
          
          <p className="text-lg text-white/85 max-w-xl mb-10 mx-auto lg:mx-0 leading-relaxed font-sans drop-shadow-sm">
            Prob tipini, Doppler hassasiyetini ve ışın oluşturma mimarisini yan yana görün — kataloğun değil, cihazın kendisini karşılaştırın.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 lg:mb-20 justify-center lg:justify-start">
            <Link 
              href="/teklif-al"
              className="w-full sm:w-auto bg-brand-teal text-white rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-brand-teal-hover transition-all text-center shadow-lg shadow-brand-teal/25"
            >
              Teklif Al
            </Link>
            <Link 
              href="/urunler/ultrason"
              className="w-full sm:w-auto border border-white/30 text-white rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-white/10 transition-all text-center backdrop-blur-sm"
            >
              Cihazları İncele
            </Link>
          </div>
          
          {/* Trust Stats */}
          <TrustStatsBar variant="hero" />
        </div>
      </div>
    </section>
  );
}
