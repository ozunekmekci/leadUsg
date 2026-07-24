"use client";

import { useEffect, useState } from "react";
import { setConsentStatus, initTrackingSession } from "@/lib/tracking";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already made a choice
    const storedChoice = localStorage.getItem("leadusg_consent");
    if (!storedChoice) {
      setIsVisible(true);
    } else if (storedChoice === "analytics" || storedChoice === "full") {
      initTrackingSession().catch(console.error);
    }
  }, []);

  if (!isVisible) return null;

  const handleAccept = async () => {
    await setConsentStatus("analytics");
    setIsVisible(false);
  };

  const handleReject = async () => {
    await setConsentStatus("none");
    setIsVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez ve Gizlilik Tercihleri"
      className="fixed bottom-0 inset-x-0 z-50 p-4 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-slate-300 text-xs sm:text-sm space-y-1 text-center md:text-left">
          <p className="font-semibold text-slate-100">
            🔒 Gizlilik ve Çerez Tercihleri
          </p>
          <p className="text-slate-400 max-w-3xl font-normal text-slate-300">
            Deneyiminizi ve medikal cihaz karşılaştırma hizmetlerimizi iyileştirmek için anonim kullanım verileri (analitik) topluyoruz. Detaylı bilgi için{" "}
            <a
              href="/kvkk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline font-medium"
            >
              KVKK Aydınlatma Metni
            </a>
            &apos;ni inceleyebilirsiniz. Onay vermediğiniz takdirde hiçbir kişisel cihaz parmak izi veya takip verisi saklanmaz.
          </p>
        </div>

        {/* EQUAL SIZE BUTTONS - NO DARK PATTERNS */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white font-medium text-xs sm:text-sm transition-colors text-center"
          >
            Sadece Gerekli
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-lg shadow-blue-500/20 text-center"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
