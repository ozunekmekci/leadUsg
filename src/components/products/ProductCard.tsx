"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/tracking";

export interface ProductSpecs {
  screenSize?: string;
  probePorts?: number;
  portable?: boolean;
  applicationAreas?: string[];
  priceSegment?: string;
  highlights?: string[];
  beamformer?: string;
  elastography?: boolean;
  transducerType?: string;
}

export interface ProductItem {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: ProductSpecs;
  previewVideoUrl?: string | null;
}

interface ProductCardProps {
  product: ProductItem;
  onToggleCompare?: (id: number) => void;
  isCompared?: boolean;
}

// Brand SVG map helper
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

export default function ProductCard({
  product,
  onToggleCompare,
  isCompared = false,
}: ProductCardProps) {
  const [compared, setCompared] = useState(isCompared);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCompared(isCompared);
  }, [isCompared]);

  // Mobile viewport IntersectionObserver for autoplaying previewVideoUrl when visible
  useEffect(() => {
    if (!product.previewVideoUrl || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [product.previewVideoUrl]);

  const handleMouseEnter = () => {
    if (product.previewVideoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (product.previewVideoUrl && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleCompareClick = () => {
    const nextState = !compared;
    setCompared(nextState);
    trackEvent("compare_toggle", {
      productId: product.id,
      productName: `${product.brand} ${product.name}`,
      action: nextState ? "add" : "remove",
    });
    if (onToggleCompare) {
      onToggleCompare(product.id);
    }
  };

  const specs = product.specs || {};
  const highlights = specs.highlights || [];
  const brandKey = (product.brand || "").toLowerCase().trim();
  const brandLogoPath = BRAND_LOGO_MAP[brandKey];

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-cyan-600 hover:shadow-lg hover:shadow-cyan-950/5 flex flex-col justify-between"
    >
      <div>
        {/* Header: Brand Logo / Name & Price Segment Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 h-7">
            {brandLogoPath ? (
              <div className="relative h-6 w-20 flex items-center">
                <Image
                  src={brandLogoPath}
                  alt={`${product.brand} logo`}
                  width={80}
                  height={24}
                  className="max-h-6 max-w-full object-contain filter group-hover:brightness-110 transition-all"
                />
              </div>
            ) : (
              <span className="text-xs font-mono-tech font-bold text-cyan-800 uppercase tracking-wide">
                {product.brand}
              </span>
            )}
          </div>

          {specs.priceSegment && (
            <span className="text-[11px] font-mono-tech font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
              {specs.priceSegment}
            </span>
          )}
        </div>

        {/* Visual Telemetry HUD Viewport / Optional Video Preview */}
        <div className="relative aspect-[16/10] w-full rounded bg-[#060911] border border-slate-800 overflow-hidden mb-4 p-3 flex flex-col justify-between group-hover:border-cyan-600/80 transition-colors">
          {/* Top HUD Telemetry Info */}
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-400 z-10">
            <span className="inline-flex items-center gap-1 text-cyan-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              {product.brand.toUpperCase()}
            </span>
            <span className="text-slate-400 font-medium">FREQ: 4.2 MHz</span>
          </div>

          {/* Video Preview or Fallback SVG Sector Cone & HUD Graphic */}
          <div className="relative flex-1 flex items-center justify-center my-1 overflow-hidden">
            {product.previewVideoUrl ? (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={product.previewVideoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-cyan-950/90 text-cyan-400 border border-cyan-800 text-[9px] font-mono-tech font-bold rounded">
                  DEMO VIDEO
                </div>
              </div>
            ) : (
              <svg viewBox="0 0 200 110" className="w-full h-full max-h-24 opacity-85">
                {/* Sector arc gridlines */}
                <path
                  d="M100 10 L40 100 A90 90 0 0 0 160 100 Z"
                  fill="rgba(6, 182, 212, 0.06)"
                  stroke="rgba(6, 182, 212, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <path
                  d="M100 10 L60 65 A50 50 0 0 0 140 65 Z"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.2)"
                  strokeWidth="0.75"
                />
                <circle cx="100" cy="10" r="2" fill="#ef4444" />
                {/* Measurement caliper line */}
                <line x1="80" y1="55" x2="120" y2="65" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="80" cy="55" r="1.5" fill="#f59e0b" />
                <circle cx="120" cy="65" r="1.5" fill="#f59e0b" />
                <text x="124" y="67" fontFamily="IBM Plex Mono" fontSize="6" fill="#f59e0b" fontWeight="bold">
                  4.8cm
                </text>
              </svg>
            )}

            {/* Model Overlay Name */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="text-xs font-display font-bold text-white tracking-wide bg-slate-950/80 px-2 py-1 rounded border border-slate-800/80 backdrop-blur-xs">
                {product.name}
              </span>
            </div>
          </div>

          {/* Bottom HUD Telemetry Status */}
          <div className="flex items-center justify-between text-[9px] font-mono-tech text-slate-400 z-10 border-t border-slate-900 pt-1">
            <span className="text-slate-400">FPS: <strong className="text-cyan-400">58Hz</strong></span>
            {specs.portable ? (
              <span className="rounded bg-cyan-950 text-cyan-300 font-bold px-1.5 py-0.5 border border-cyan-800 text-[9px]">
                POC Taşınabilir
              </span>
            ) : (
              <span className="text-slate-400">Konsol Tipi</span>
            )}
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-display text-xl font-bold text-slate-950 tracking-tight group-hover:text-cyan-700 transition-colors">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed font-sans">
          {product.description}
        </p>

        {/* Spec Chips (IBM Plex Mono) */}
        <div className="mt-3.5 flex flex-wrap gap-1.5 text-xs font-mono-tech text-slate-700">
          {specs.screenSize && (
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 font-medium border border-slate-200">
              🖥️ {specs.screenSize}
            </span>
          )}
          {specs.probePorts !== undefined && (
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 font-medium border border-slate-200">
              🔌 {specs.probePorts} Port
            </span>
          )}
          {specs.beamformer && (
            <span className="inline-flex items-center gap-1 rounded bg-cyan-50 text-cyan-900 px-2 py-0.5 font-medium border border-cyan-200">
              ⚡ {specs.beamformer}
            </span>
          )}
        </div>

        {/* Spec Highlights Bullet Points */}
        {highlights.length > 0 && (
          <ul className="mt-3.5 space-y-1 border-t border-slate-100 pt-3 text-xs font-mono-tech text-slate-600">
            {highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-cyan-600 font-bold text-sm leading-none">•</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3.5 gap-3">
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono-tech font-semibold text-slate-700 hover:text-slate-950 transition-colors">
          <input
            type="checkbox"
            checked={compared}
            onChange={handleCompareClick}
            className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-0 cursor-pointer accent-cyan-600"
          />
          <span>Karşılaştır</span>
        </label>

        <Link
          href={`/urunler/${product.category}/${product.slug}`}
          onClick={() => {
            trackEvent("product_card_click", {
              productId: product.id,
              productSlug: product.slug,
              productName: `${product.brand} ${product.name}`,
            });
          }}
          className="inline-flex items-center gap-1.5 rounded bg-slate-950 hover:bg-cyan-700 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors border border-slate-800 font-mono-tech"
        >
          <span>Detay</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

