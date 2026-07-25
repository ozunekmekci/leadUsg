"use client";

import { useRef } from "react";
import Link from "next/link";

export interface NewArrivalItem {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  techSummary: string;
  daysAgo: number;
  priceSegment?: string;
  portable?: boolean;
}

interface NewArrivalsCarouselProps {
  items: NewArrivalItem[];
}

export default function NewArrivalsCarousel({ items }: NewArrivalsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Navigation Buttons (Desktop) */}
      {items.length > 3 && (
        <>
          <button
            onClick={() => scroll("left")}
            aria-label="Önceki cihazlar"
            className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-slate-950/90 text-white border border-slate-700 shadow-lg hover:bg-cyan-700 hover:border-cyan-500 transition-all opacity-80 group-hover:opacity-100"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Sonraki cihazlar"
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-slate-950/90 text-white border border-slate-700 shadow-lg hover:bg-cyan-700 hover:border-cyan-500 transition-all opacity-80 group-hover:opacity-100"
          >
            →
          </button>
        </>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded border border-slate-800 bg-slate-950 p-4 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-950/30 transition-all duration-200 flex flex-col justify-between group/card"
          >
            <div>
              {/* Top Row: Brand & Added Days Ago Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-wide">
                  {item.brand}
                </span>

                <span className="text-[10px] font-mono-tech font-semibold bg-amber-950/90 border border-amber-800/80 text-amber-300 px-2 py-0.5 rounded">
                  eklendi: {item.daysAgo === 0 ? "Bugün" : `${item.daysAgo} gün önce`}
                </span>
              </div>

              {/* HUD Visual Graphic (16:9 aspect) */}
              <div className="relative aspect-[16/9] w-full rounded bg-[#060911] border border-slate-800 overflow-hidden mb-3 p-2.5 flex flex-col justify-between group-hover/card:border-cyan-700 transition-colors">
                <div className="flex items-center justify-between text-[9px] font-mono-tech text-slate-400 z-10">
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    NEW SCAN
                  </span>
                  <span>FREQ: 4.2 MHz</span>
                </div>

                {/* SVG Sector Cone Graphic */}
                <div className="relative flex-1 flex items-center justify-center my-0.5">
                  <svg viewBox="0 0 200 90" className="w-full h-full opacity-80">
                    <path
                      d="M100 8 L45 80 A85 85 0 0 0 155 80 Z"
                      fill="rgba(6, 182, 212, 0.08)"
                      stroke="rgba(6, 182, 212, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="3 2"
                    />
                    <circle cx="100" cy="8" r="2" fill="#ef4444" />
                    <line x1="85" y1="45" x2="115" y2="52" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="85" cy="45" r="1" fill="#f59e0b" />
                    <circle cx="115" cy="52" r="1" fill="#f59e0b" />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs font-display font-bold text-white tracking-wide bg-slate-950/85 px-2 py-0.5 rounded border border-slate-800">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono-tech text-slate-400 z-10 border-t border-slate-900 pt-1">
                  <span>FPS: <strong className="text-cyan-400">58Hz</strong></span>
                  {item.priceSegment && (
                    <span className="text-slate-400">{item.priceSegment}</span>
                  )}
                </div>
              </div>

              {/* Title & Model */}
              <h3 className="font-display text-lg font-bold text-white group-hover/card:text-cyan-400 transition-colors">
                {item.name}
              </h3>

              {/* Single Line Technical Summary */}
              <p className="mt-1 text-xs font-mono-tech text-slate-400 truncate">
                {item.techSummary}
              </p>
            </div>

            {/* Link Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono-tech text-slate-400">
                {item.portable ? "Taşınabilir System" : "Konsol Tipi"}
              </span>
              <Link
                href={`/urunler/${item.category}/${item.slug}`}
                className="text-xs font-mono-tech font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group-hover/card:translate-x-0.5 transition-transform"
              >
                <span>İncele</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
