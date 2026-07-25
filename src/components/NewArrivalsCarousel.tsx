"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
  imageUrl?: string;
}

interface NewArrivalsCarouselProps {
  items: NewArrivalItem[];
}

const BRAND_LOGO_MAP: Record<string, string> = {
  "ge healthcare": "/brands/ge.svg",
  "ge": "/brands/ge.svg",
  "philips": "/brands/philips.svg",
  "samsung medison": "/brands/samsung.svg",
  "samsung": "/brands/samsung.svg",
  "siemens healthineers": "/brands/siemens.svg",
  "siemens": "/brands/siemens.svg",
  "canon medical": "/brands/canon.svg",
  "canon": "/brands/canon.svg",
  "mindray": "/brands/mindray.svg",
};

export default function NewArrivalsCarousel({ items }: NewArrivalsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll Navigation Buttons (Desktop) */}
      {items.length > 3 && (
        <>
          <button
            onClick={() => scroll("left")}
            aria-label="Önceki cihazlar"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white text-text-primary border border-border-subtle shadow-card-hover hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Sonraki cihazlar"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white text-text-primary border border-border-subtle shadow-card-hover hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            →
          </button>
        </>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => {
          const brandKey = (item.brand || "").toLowerCase().trim();
          const brandLogoPath = BRAND_LOGO_MAP[brandKey];

          return (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[240px] sm:w-[260px] bg-white border border-slate-200 rounded-card p-3 flex flex-col justify-between group/card shadow-2xs hover:border-brand-teal hover:shadow-card-hover transition-all"
            >
              <div>
                {/* Top Row: Brand & Added Days Ago Badge */}
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="text-[11px] font-mono-tech font-bold text-brand-teal uppercase tracking-wide">
                    {item.brand}
                  </span>

                  <span className="text-[9px] font-mono-tech font-medium bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">
                    {item.daysAgo === 0 ? "Bugün" : `${item.daysAgo}g önce`}
                  </span>
                </div>

                {/* Large Clean Product Image Container */}
                <div className="relative h-[210px] w-full rounded-lg bg-slate-50 border border-slate-100 overflow-hidden mb-2 flex items-center justify-center p-2 group-hover/card:bg-white transition-colors">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={`${item.brand} ${item.name}`}
                      className="max-h-[195px] max-w-full object-contain filter drop-shadow-md group-hover/card:scale-105 transition-transform duration-300"
                    />
                  ) : brandLogoPath ? (
                    <Image
                      src={brandLogoPath}
                      alt={`${item.brand} logo`}
                      width={120}
                      height={40}
                      className="max-h-12 max-w-full object-contain filter group-hover/card:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-base font-mono-tech font-bold text-text-primary uppercase tracking-wide">
                      {item.brand}
                    </span>
                  )}
                </div>

                {/* Model Title */}
                <h3 className="font-bold text-sm text-slate-900 group-hover/card:text-brand-teal transition-colors leading-tight">
                  {item.name}
                </h3>

                {/* Technical Summary */}
                <p className="mt-0.5 text-[11px] font-mono-tech text-slate-500 truncate">
                  {item.techSummary}
                </p>

                {/* Spec Badges */}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.priceSegment && (
                    <span className="text-[9px] font-mono-tech font-medium text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                      {item.priceSegment}
                    </span>
                  )}
                  <span className="text-[9px] font-mono-tech font-medium text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                    {item.portable ? "Taşınabilir" : "Konsol Tipi"}
                  </span>
                </div>
              </div>

              {/* Link Footer */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-end">
                <Link
                  href={`/urunler/${item.category}/${item.slug}`}
                  className="text-xs font-semibold text-brand-teal inline-flex items-center gap-1 link-underline group-hover/card:gap-1.5 transition-all"
                >
                  <span>Detay</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
