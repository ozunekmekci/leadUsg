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
  const formattedProductCount = productCount > 0 ? `${productCount < 10 ? `0${productCount}` : productCount}+` : "12+";
  const formattedBrandCount = brandCount > 0 ? String(brandCount).padStart(2, "0") : "06";

  const stats = [
    {
      num: "%100",
      label: "Bağımsız Veri",
      highlight: true,
    },
    {
      num: "0₺",
      label: "Gizli Komisyon",
      highlight: false,
    },
    {
      num: `${formattedProductCount}`,
      label: "Premium Sistem",
      highlight: false,
    },
    {
      num: `${formattedBrandCount}`,
      label: "Global Üretici",
      highlight: false,
    },
  ];

  return (
    <section className="py-6 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 flex flex-col items-center justify-center text-center ${
                idx % 2 !== 0 ? "border-l md:border-l-0 border-slate-200" : ""
              }`}
            >
              <span
                className={`font-mono-tech text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  stat.highlight ? "text-cyan-700" : "text-slate-950"
                }`}
              >
                {stat.num}
              </span>
              <span className="mt-1 text-xs font-mono-tech text-slate-500 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
