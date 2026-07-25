import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";

interface TrustStatsBarProps {
  variant?: "strip" | "hero";
}

export default async function TrustStatsBar({ variant = "strip" }: TrustStatsBarProps) {
  // Calculate dynamic stats from database
  let productCount = 0;
  let brandCount = 0;

  try {
    productCount = await prisma.product.count();
    const distinctBrands = await prisma.product.findMany({
      distinct: ["brand"],
      select: { brand: true },
    });
    brandCount = distinctBrands.length;
  } catch (error) {
    console.error("TrustStatsBar DB count error, using fallback counts:", error);
    productCount = FALLBACK_PRODUCTS.length;
    brandCount = new Set(FALLBACK_PRODUCTS.map((p) => p.brand)).size;
  }

  if (productCount === 0) {
    productCount = FALLBACK_PRODUCTS.length;
    brandCount = new Set(FALLBACK_PRODUCTS.map((p) => p.brand)).size;
  }

  // Format strings
  const formattedProductCount =
    productCount > 0
      ? `${productCount < 10 ? `0${productCount}` : productCount}+`
      : "12+";
  const formattedBrandCount =
    brandCount > 0 ? String(brandCount).padStart(2, "0") : "06";

  const stats = [
    {
      num: "%100",
      label: "Bağımsız Veri",
    },
    {
      num: formattedProductCount,
      label: "Premium Sistem",
    },
    {
      num: formattedBrandCount,
      label: "Global Üretici",
    },
  ];

  if (variant === "hero") {
    return (
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-6 pt-8 border-t border-white/15 backdrop-blur-xs">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <div className="flex flex-col items-center lg:items-start">
              <span className={`font-display text-3xl font-bold mb-1 ${stat.num === "%100" ? "text-brand-teal-light" : "text-white"}`}>
                {stat.num}
              </span>
              <span className="font-mono-tech text-xs text-white/60 tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
            {idx < stats.length - 1 && (
              <div className="w-px h-10 bg-white/15 hidden sm:block"></div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-white border-y border-border-subtle py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-y-0 relative">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-center relative">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-display text-4xl md:text-5xl font-bold text-text-primary">
                  {stat.num}
                </span>
                <span className="font-mono-tech text-xs uppercase tracking-wider text-text-muted mt-1">
                  {stat.label}
                </span>
              </div>

              {/* Vertical divider on desktop */}
              {idx < stats.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-border-subtle" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
