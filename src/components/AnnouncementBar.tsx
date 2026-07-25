"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="announcement-gradient h-9 flex items-center justify-center px-4 relative w-full z-50">
      <div className="flex-1 flex items-center justify-center">
        <span className="text-white text-xs font-medium tracking-wide text-center truncate">
          Tüm Sistemler Yetkili Servis Garantili · Ücretsiz Teknik Danışmanlık
        </span>
        <Link 
          href="/teklif-al" 
          className="text-white text-xs font-medium tracking-wide ml-2 hover:underline hidden sm:inline-block shrink-0"
        >
          İletişime Geç &rarr;
        </Link>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Kapat"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
