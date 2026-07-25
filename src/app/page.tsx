import Link from "next/link";
import NewArrivalsStrip from "@/components/NewArrivalsStrip";
import TrustStatsBar from "@/components/TrustStatsBar";
import BeforeAfterTeaser from "@/components/BeforeAfterTeaser";
import TrustBadgeStrip from "@/components/TrustBadgeStrip";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* HERO SECTION WITH DIAGNOSTIC HUD MONITOR */}
      <section className="clinical-grid-bg border-b border-slate-200 pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT HERO CONTENT (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-200 rounded text-xs font-mono-tech text-cyan-800">
                <span>MEDİKAL VE BİYOMEDİKAL KARAR PLATFORMU</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-950 leading-[1.1] tracking-tight">
                Ultrason Yatırımında <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-cyan-700 to-sky-600">
                  Teknik Hassasiyet ve Telemetri.
                </span>
              </h1>

              <p className="text-slate-600 text-base leading-relaxed">
                Jenerik pazarlama katalogları yerine; kristal matris probları, Doppler hassasiyeti, elastografi skorları ve ışın oluşturma (beamforming) kanallarını yan yana analiz edin.
              </p>

              {/* KEY SPECS BULLETS */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs font-mono-tech text-slate-700">
                <div className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded">
                  <span className="text-sky-600 font-bold">⚡</span>
                  <span>Renkli Doppler</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded">
                  <span className="text-cyan-600 font-bold">💠</span>
                  <span>Matris Prob</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded">
                  <span className="text-indigo-600 font-bold">🌊</span>
                  <span>Shear Wave</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded">
                  <span className="text-amber-600 font-bold">✨</span>
                  <span>AI Ölçümü</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/karsilastir" className="px-5 py-3 bg-slate-950 text-white font-semibold text-sm rounded border border-slate-800 hover:bg-cyan-700 transition-all flex items-center gap-2 shadow-lg shadow-slate-950/10">
                  <span>Cihazları Karşılaştır</span>
                </Link>
                <Link href="/urunler/ultrason" className="px-5 py-3 bg-white text-slate-800 font-semibold text-sm rounded border border-slate-300 hover:bg-slate-100 transition-all flex items-center gap-2">
                  <span>Ultrason Kataloğu</span>
                </Link>
              </div>

              {/* TRUST FOOTPRINT (Inline Quick Stats) */}
              <div className="pt-5 border-t border-slate-200 flex items-center gap-6 text-xs font-mono-tech text-slate-500">
                <div>
                  <span className="block text-lg font-bold text-slate-950 font-display">12+</span>
                  <span>Premium Sistem</span>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div>
                  <span className="block text-lg font-bold text-slate-950 font-display">06</span>
                  <span>Global Üretici</span>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div>
                  <span className="block text-lg font-bold text-cyan-700 font-display">%100</span>
                  <span>Bağımsız Veri</span>
                </div>
              </div>

            </div>

            {/* RIGHT ULTRASOUND CONSOLE HUD (EXPANDED 7 COLS MONITOR) */}
            <div className="lg:col-span-7">
              <div className="ultrasound-console p-3 sm:p-4 rounded-lg">
                
                {/* MONITOR TOP HEADER (PATIENT & PROBE METRICS) */}
                <div className="bg-slate-950 border-b border-slate-800 p-3 rounded-t flex items-center justify-between text-xs font-mono-tech text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-400 text-[10px] font-bold rounded">LIVE SCAN TELEMETRY</span>
                    <span className="text-slate-400 hidden sm:inline">PATIENT ID: <strong className="text-white">USG-2026-9042</strong></span>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <span>PROBE: <strong className="text-cyan-400">M5Sc-D (Single Crystal Sector)</strong></span> | 
                    <span> FREQ: <strong className="text-white">4.2 MHz</strong></span>
                  </div>
                </div>

                {/* EXPANDED SCREEN VIEWPORT */}
                <div className="relative bg-black h-[400px] sm:h-[480px] w-full overflow-hidden border border-slate-800 my-2 flex items-center justify-center">
                  
                  {/* GIF DISPLAY CONTAINER */}
                  <div id="usg-screen-display" className="relative w-full h-full flex items-center justify-center bg-black">
                    <img 
                      src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBkd3JoZTVjZnVycXQ1bHZuYmkzaHV1OTN3YzRuZ3l3aHh5NndpdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kvKSbXJfQKOY0/giphy.gif" 
                      alt="Cardiac Sector Sweep Ultrasound Scan" 
                      className="w-full h-full object-contain filter contrast-125 brightness-105"
                    />
                  </div>

                  {/* SVG SECTOR SCANNER CONE OVERLAY & HUD CALIPERS */}
                  <svg className="sector-cone-overlay w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <path d="M200 12 L70 280 A210 210 0 0 0 330 280 Z" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <path d="M200 12 L115 180 A130 130 0 0 0 285 180 Z" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1"/>
                    <circle cx="200" cy="12" r="3" fill="#ef4444"/>

                    {/* Animated Sector Sweep Line */}
                    <line className="sweep-beam" x1="200" y1="12" x2="200" y2="285" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="1.5" />

                    {/* Depth Scale Ticks */}
                    <g fontFamily="IBM Plex Mono" fontSize="9" fill="#06b6d4" opacity="0.85">
                      <text x="370" y="60">- 5cm</text>
                      <text x="370" y="120">- 10cm</text>
                      <text x="370" y="180">- 15cm</text>
                      <text x="370" y="240">- 20cm</text>
                    </g>

                    {/* Doppler Color Scale Bar */}
                    <g transform="translate(15, 60)">
                      <rect x="0" y="0" width="10" height="120" fill="url(#dopplerGradient)" stroke="#1e293b" strokeWidth="1"/>
                      <text x="14" y="10" fontFamily="IBM Plex Mono" fontSize="8" fill="#ef4444">+62 cm/s</text>
                      <text x="14" y="65" fontFamily="IBM Plex Mono" fontSize="8" fill="#94a3b8">0</text>
                      <text x="14" y="120" fontFamily="IBM Plex Mono" fontSize="8" fill="#3b82f6">-62 cm/s</text>
                    </g>

                    {/* Measurement Caliper Line */}
                    <line x1="160" y1="140" x2="240" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2"/>
                    <circle cx="160" cy="140" r="3" fill="#f59e0b"/>
                    <circle cx="240" cy="160" r="3" fill="#f59e0b"/>
                    <text x="245" y="163" fontFamily="IBM Plex Mono" fontSize="9" fill="#f59e0b" fontWeight="bold">+-- 4.82 cm --+</text>

                    <defs>
                      <linearGradient id="dopplerGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="45%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#000000" />
                        <stop offset="55%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* ECG REALTIME LINE AT BOTTOM */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-950/90 border-t border-slate-800 flex items-center px-4 overflow-hidden z-20">
                    <span className="text-[9px] font-mono-tech text-rose-500 mr-2 font-bold">ECG 74 BPM</span>
                    <svg className="w-full h-8" viewBox="0 0 500 40">
                      <path className="ecg-line" d="M0 20 L40 20 L50 20 L55 5 L60 35 L65 10 L70 25 L75 20 L150 20 L160 20 L165 5 L170 35 L175 10 L180 25 L185 20 L260 20 L270 20 L275 5 L280 35 L285 10 L290 25 L295 20 L370 20 L380 20 L385 5 L390 35 L395 10 L400 25 L405 20 L500 20" 
                            fill="none" stroke="#ef4444" strokeWidth="1.5" />
                    </svg>
                  </div>

                </div>

                {/* MONITOR CLINICAL STATUS BAR */}
                <div className="bg-slate-950 p-3 rounded-b border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      LIVE SCANNER ACTIVE
                    </span>
                    <span className="text-slate-600">|</span>
                    <span>ANGLE: <strong className="text-white">85°</strong></span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    GAIN: <span className="text-white">68 dB</span> | DR: <span className="text-white">75</span> | FPS: <span className="text-cyan-400 font-bold">58 Hz</span> | PWR: <span className="text-white">100%</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CP-015-A: YENİ EKLENEN CİHAZLAR ŞERİDİ (Hero'nun Hemen Altı) */}
      <NewArrivalsStrip />

      {/* BRANDS PORTFOLIO SECTION WITH OFFICIAL SVG LOGOS */}
      <section id="markalar" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono-tech text-cyan-700 tracking-wider uppercase font-bold">ÖNDE GELEN ÜRETİCİLER</span>
              <h2 className="font-display text-2xl font-bold text-slate-950">Global Ultrason Marka Portföyü</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Sistemimizdeki tüm cihazlar yetkili distribütör garantili ve güncel teknik servis standartlarıyla eşleştirilir.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* BRAND 1: GE HEALTHCARE */}
            <div className="p-5 rounded border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between items-center text-center group h-36">
              <div className="w-full h-14 flex items-center justify-center p-2">
                <img src="/brands/ge.svg" alt="GE HealthCare Logo" className="max-h-12 max-w-full object-contain filter group-hover:brightness-110 transition-all" />
              </div>
              <div>
                <div className="font-display text-xs font-bold text-slate-900 group-hover:text-cyan-600">GE HealthCare</div>
                <div className="text-[10px] font-mono-tech text-slate-500">Voluson · Logiq · Vivid</div>
              </div>
            </div>

            {/* BRAND 2: PHILIPS */}
            <div className="p-5 rounded border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between items-center text-center group h-36">
              <div className="w-full h-14 flex items-center justify-center p-2">
                <img src="/brands/philips.svg" alt="Philips Logo" className="max-h-10 max-w-full object-contain filter group-hover:brightness-110 transition-all" />
              </div>
              <div>
                <div className="font-display text-xs font-bold text-slate-900 group-hover:text-cyan-600">Philips</div>
                <div className="text-[10px] font-mono-tech text-slate-500">EPIQ Elite · Affiniti</div>
              </div>
            </div>

            {/* BRAND 3: SAMSUNG MEDISON */}
            <div className="p-5 rounded border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between items-center text-center group h-36">
              <div className="w-full h-14 flex items-center justify-center p-2">
                <img src="/brands/samsung.svg" alt="Samsung Medison Logo" className="max-h-8 max-w-full object-contain filter group-hover:brightness-110 transition-all" />
              </div>
              <div>
                <div className="font-display text-xs font-bold text-slate-900 group-hover:text-cyan-600">Samsung Medison</div>
                <div className="text-[10px] font-mono-tech text-slate-500">HERA W10 · V8 · RS85</div>
              </div>
            </div>

            {/* BRAND 4: SIEMENS HEALTHINEERS */}
            <div className="p-5 rounded border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between items-center text-center group h-36">
              <div className="w-full h-14 flex items-center justify-center p-2">
                <img src="/brands/siemens.svg" alt="Siemens Healthineers Logo" className="max-h-12 max-w-full object-contain filter group-hover:brightness-110 transition-all" />
              </div>
              <div>
                <div className="font-display text-xs font-bold text-slate-900 group-hover:text-cyan-600">Siemens Healthineers</div>
                <div className="text-[10px] font-mono-tech text-slate-500">ACUSON Sequoia</div>
              </div>
            </div>

            {/* BRAND 5: CANON MEDICAL */}
            <div className="p-5 rounded border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between items-center text-center group h-36">
              <div className="w-full h-14 flex items-center justify-center p-2">
                <img src="/brands/canon.svg" alt="Canon Medical Logo" className="max-h-8 max-w-full object-contain filter group-hover:brightness-110 transition-all" />
              </div>
              <div>
                <div className="font-display text-xs font-bold text-slate-900 group-hover:text-cyan-600">Canon Medical</div>
                <div className="text-[10px] font-mono-tech text-slate-500">Aplio i800 · Aplio a</div>
              </div>
            </div>

            {/* BRAND 6: MINDRAY */}
            <div className="p-5 rounded border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between items-center text-center group h-36">
              <div className="w-full h-14 flex items-center justify-center p-2">
                <img src="/brands/mindray.svg" alt="Mindray Logo" className="max-h-10 max-w-full object-contain filter group-hover:brightness-110 transition-all" />
              </div>
              <div>
                <div className="font-display text-xs font-bold text-slate-900 group-hover:text-cyan-600">Mindray</div>
                <div className="text-[10px] font-mono-tech text-slate-500">Resona 7 · Nuewa I9</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CP-015-C: SAYISAL GÜVEN ŞERİDİ (Marka Portföyü Altı) */}
      <TrustStatsBar />

      {/* CP-015-B: ÖNCE / SONRA KARŞILAŞTIRMA TEASER BLOĞU */}
      <BeforeAfterTeaser />

      {/* CLINICAL CATEGORIES & SPECIALIZATIONS */}
      <section id="kategoriler" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono-tech text-sky-700 tracking-wider uppercase font-bold">KLİNİK UZMANLIK ALANLARI</span>
            <h2 className="font-display text-3xl font-bold text-slate-950 mt-2">Hangi Branş İçin Ultrason Arıyorsunuz?</h2>
            <p className="text-slate-600 mt-3 text-sm">
              Her klinik uygulamanın prob frekansı, yazılım algoritmaları ve görüntüleme ihtiyaçları farklıdır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CATEGORY 1: OB/GYN */}
            <div className="bg-white border border-slate-200 p-6 rounded hover:border-cyan-600 transition-all shadow-sm group">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-cyan-50 text-cyan-600 border border-cyan-200 rounded flex items-center justify-center font-bold">
                  🤰
                </div>
                <span className="text-xs font-mono-tech bg-slate-100 text-slate-600 px-2 py-1 rounded">Obstetrik / Jinekoloji</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-950 group-hover:text-cyan-600">Kadın Doğum & Perinatoloji</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                4D HDlive hacimsel fetal görüntüleme, otomatik BPD/FL ölçümü, fetal ekokardiyografi ve endovajinal 3D prob çözümleri.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                <span>Önerilen Problar: <strong className="text-slate-800">RAB6-D, V11-3H</strong></span>
                <Link href="/urunler/ultrason" className="text-cyan-600 font-bold group-hover:underline">İncele →</Link>
              </div>
            </div>

            {/* CATEGORY 2: CARDIOLOGY */}
            <div className="bg-white border border-slate-200 p-6 rounded hover:border-cyan-600 transition-all shadow-sm group">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-rose-50 text-rose-600 border border-rose-200 rounded flex items-center justify-center font-bold">
                  🫀
                </div>
                <span className="text-xs font-mono-tech bg-slate-100 text-slate-600 px-2 py-1 rounded">Ekokardiyografi</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-950 group-hover:text-rose-600">Kardiyoloji & Vasküler</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Single-crystal faz dizili problar, Auto-EF, Strain Elastografi, Transözofageal (TEE) ve kesintisiz CW Doppler analizi.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                <span>Önerilen Problar: <strong className="text-slate-800">M5Sc-D, TEE</strong></span>
                <Link href="/urunler/ultrason" className="text-rose-600 font-bold group-hover:underline">İncele →</Link>
              </div>
            </div>

            {/* CATEGORY 3: RADIOLOGY */}
            <div className="bg-white border border-slate-200 p-6 rounded hover:border-cyan-600 transition-all shadow-sm group">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded flex items-center justify-center font-bold">
                  🩺
                </div>
                <span className="text-xs font-mono-tech bg-slate-100 text-slate-600 px-2 py-1 rounded">Genel Ultrasonografi</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-950 group-hover:text-indigo-600">Radyoloji & Abdominal</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Shear Wave doku sertliği elastografisi, karaciğer steatoz ölçümü (ATI/UDFF), kontraslı ultrason (CEUS) yazılımı.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                <span>Önerilen Problar: <strong className="text-slate-800">C1-6-D, ML6-15</strong></span>
                <Link href="/urunler/ultrason" className="text-indigo-600 font-bold group-hover:underline">İncele →</Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CP-015-E: GÜVEN ROZETİ ŞERİDİ (Footer Üstü) */}
      <TrustBadgeStrip />

    </div>
  );
}
