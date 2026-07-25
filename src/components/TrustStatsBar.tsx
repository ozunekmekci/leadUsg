import { prisma } from "@/lib/prisma";

export default async function TrustStatsBar() {
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
    console.error("TrustStatsBar DB count error:", error);
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
      num: "0₺",
      label: "Gizli Komisyon",
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

  return (
    <section className="bg-white border-y border-border-subtle py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 relative">
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
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-border-subtle" />
              )}

              {/* Vertical divider on mobile (between item 0 & 1 and item 2 & 3 in 2x2 grid) */}
              {idx % 2 === 0 && (
                <div className="block md:hidden absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-border-subtle" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

