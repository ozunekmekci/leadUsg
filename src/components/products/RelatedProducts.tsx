import ProductCard, { ProductItem } from "./ProductCard";

interface RelatedProductsProps {
  products: ProductItem[];
  category: string;
}

export default function RelatedProducts({ products, category }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 border-t border-slate-200 pt-12 flex flex-col gap-6 font-sans">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-600"></span>
          <span className="text-xs font-mono-tech font-bold text-cyan-800 uppercase tracking-widest">
            KLİNİK ALTERNATİFLER
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-950 tracking-tight mt-1">
          Benzer {category.toUpperCase()} Sistemleri
        </h2>
        <p className="text-sm text-slate-600 font-sans">
          Eşdeğer biyomedikal özellikler ve bütçe aralığı sunan diğer alternatif ultrason sistemleri.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

