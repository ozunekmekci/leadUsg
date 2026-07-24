import { prisma } from "@/lib/prisma";
import CompareView from "@/components/products/CompareView";
import { ProductItem, ProductSpecs } from "@/components/products/ProductCard";
import { redirect } from "next/navigation";
import Link from "next/link";

interface ComparePageProps {
  searchParams: {
    ids?: string | string[];
  };
}

export const dynamic = "force-dynamic";

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const rawIds = searchParams?.ids;

  // Parse rawIds string or array into numeric IDs
  let parsedIds: number[] = [];

  if (typeof rawIds === "string") {
    parsedIds = rawIds
      .split(",")
      .map((str) => parseInt(str.trim(), 10))
      .filter((num) => !isNaN(num) && num > 0);
  } else if (Array.isArray(rawIds)) {
    parsedIds = rawIds
      .map((str) => parseInt(String(str).trim(), 10))
      .filter((num) => !isNaN(num) && num > 0);
  }

  // Deduplicate IDs
  const uniqueIds = Array.from(new Set(parsedIds));

  // Fallback: If 0 or 1 product ID provided, redirect to catalog page
  if (uniqueIds.length < 2) {
    redirect("/urunler/ultrason");
  }

  const originalCount = uniqueIds.length;
  let wasTrimmed = false;
  let targetIds = uniqueIds;

  // Max 4 devices limit check
  if (uniqueIds.length > 4) {
    wasTrimmed = true;
    targetIds = uniqueIds.slice(0, 4);
  }

  // Query products from database
  const dbProducts = await prisma.product.findMany({
    where: {
      id: {
        in: targetIds,
      },
    },
  });

  // Fallback: If fetched valid products < 2 (e.g. non-existent IDs in DB)
  if (dbProducts.length < 2) {
    redirect("/urunler/ultrason");
  }

  // Maintain original order of requested IDs
  const orderedProducts = targetIds
    .map((id) => dbProducts.find((p) => p.id === id))
    .filter(Boolean);

  const products: ProductItem[] = orderedProducts.map((p) => ({
    id: p!.id,
    slug: p!.slug,
    name: p!.name,
    brand: p!.brand,
    category: p!.category,
    description: p!.description,
    specs: (p!.specs as unknown as ProductSpecs) || {},
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-8 mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
          <span>&gt;</span>
          <span className="text-slate-300">Karşılaştırma Modülü</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Cihaz Karşılaştırma Matrisi
            </h1>
            <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base leading-relaxed">
              Seçtiğiniz <span className="text-white font-bold">{products.length}</span> cihazın 
              teknik parametrelerini, prob mimarilerini ve klinik alanlarını yan yana karşılaştırın.
            </p>
          </div>

          <Link
            href="/urunler/ultrason"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors shrink-0"
          >
            <span>+ Cihaz Ekle</span>
          </Link>
        </div>
      </div>

      {/* Main Compare View Component */}
      <CompareView
        products={products}
        wasTrimmed={wasTrimmed}
        originalCount={originalCount}
      />
    </div>
  );
}
