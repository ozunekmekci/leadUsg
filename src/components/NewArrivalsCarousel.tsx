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
        className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => {
          const brandKey = (item.brand || "").toLowerCase().trim();
          const brandLogoPath = BRAND_LOGO_MAP[brandKey];

          return (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[280px] sm:w-[300px] card-premium bg-white border border-border-subtle rounded-card p-5 flex flex-col justify-between group/card"
            >
              <div>
                {/* Top Row: Brand & Added Days Ago Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono-tech font-semibold text-brand-teal uppercase tracking-wide">
                    {item.brand}
                  </span>

                  <span className="text-[10px] font-mono-tech font-medium bg-brand-gold-light text-brand-gold px-2 py-0.5 rounded-md">
                    {item.daysAgo === 0 ? "Bugün" : `${item.daysAgo} gün önce`}
                  </span>
                </div>

                {/* Clean Product Header Graphic */}
                <div className="relative aspect-[4/3] w-full rounded-lg bg-surface-light border border-border-subtle overflow-hidden mb-4 flex items-center justify-center p-4">
                  {brandLogoPath ? (
                    <Image
                      src={brandLogoPath}
                      alt={`${item.brand} logo`}
                      width={120}
                      height={40}
                      className="max-h-10 max-w-full object-contain filter group-hover/card:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-lg font-mono-tech font-bold text-text-primary uppercase tracking-wide">
                      {item.brand}
                    </span>
                  )}
                  
                  {/* Model Name Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <span className="text-xs font-semibold text-text-primary bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border-subtle shadow-sm inline-block">
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-card-title text-text-primary group-hover/card:text-brand-teal transition-colors leading-tight">
                  {item.name}
                </h3>

                {/* Technical Summary */}
                <p className="mt-1.5 text-xs font-mono-tech text-text-muted truncate">
                  {item.techSummary}
                </p>

                {/* Spec Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.priceSegment && (
                    <span className="text-[10px] font-mono-tech font-medium text-text-body bg-surface-light border border-border-subtle px-2 py-0.5 rounded-md">
                      {item.priceSegment}
                    </span>
                  )}
                  <span className="text-[10px] font-mono-tech font-medium text-text-body bg-surface-light border border-border-subtle px-2 py-0.5 rounded-md">
                    {item.portable ? "Taşınabilir" : "Konsol Tipi"}
                  </span>
                </div>
              </div>

              {/* Link Footer */}
              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-end">
                <Link
                  href={`/urunler/${item.category}/${item.slug}`}
                  className="text-xs font-semibold text-brand-teal inline-flex items-center gap-1 link-underline group-hover/card:gap-2 transition-all"
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
