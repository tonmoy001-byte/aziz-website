import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PRODUCTS } from "../data/products";
import type { Product } from "../types";
import { formatBnNumber } from "../utils/bn";
import { ProductCard } from "../components/ProductCard";
import { ProductDetailModal } from "../components/ProductDetailModal";
import { useCart } from "../context/CartContext";

interface ProductsProps {
  onOpenCart: () => void;
  onOpenCheckout: (product: Product) => void;
}

export function Products({ onOpenCart, onOpenCheckout }: ProductsProps) {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("সব");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default",
  );
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  const categories = useMemo(
    () => ["সব", ...Array.from(new Set(PRODUCTS.map((p) => p.categoryBn)))],
    [],
  );

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCategory = category === "সব" || p.categoryBn === category;
      const matchSearch = p.nameBn.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [category, searchTerm, sort]);

  const handleAdd = useCallback(
    (product: Product) => {
      addToCart(product);
      onOpenCart();
    },
    [addToCart, onOpenCart],
  );

  const handleOrderNow = useCallback(
    (product: Product) => {
      addToCart(product);
      onOpenCheckout(product);
    },
    [addToCart, onOpenCheckout],
  );

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="border-b border-border bg-surface sticky top-0 z-30">
        <div className="container mx-auto px-3 sm:px-4 py-4">
          <h1 className="font-heading text-lg font-bold text-text mb-3">পণ্যসমূহ</h1>
          <p className="text-sm text-muted mb-4">
            নিচ থেকে পণ্য বেছে নেওয়া যাবে। সকল দাম বাংলাদেশী টাকায় (৳)।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex-1 sm:w-auto relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" aria-hidden="true" />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="পণ্যের নাম লিখুন খুঁজতে..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-surface text-text focus:ring-2 focus:ring-primary transition-colors"
              />
            </div>

            <div className="flex-1 sm:w-auto overflow-x-auto no-scrollbar pb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setCategory("সব")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    category === "সব"
                      ? "bg-primary text-surface"
                      : "bg-surface text-text border border-border hover:bg-[#F3F2EA]"
                  }`}
                >
                  সব
                </button>
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      category === cat
                        ? "bg-primary text-surface"
                        : "bg-surface text-text border border-border hover:bg-[#F3F2EA]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 sm:w-auto">
              <label className="block text-xs text-muted mb-1">দাম অনুযায়ী সাজানো</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="w-full pl-3 pr-3 py-2 rounded-lg border border-border bg-surface text-text focus:ring-2 focus:ring-primary transition-colors appearance-none"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 px-4 pb-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted">
              মোট {formatBnNumber(filtered.length)} পণ্য পাওয়া গেছে
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-medium text-text mb-3">কোনো পণ্য পাওয়া যায়নি।</p>
              <button
                onClick={() => {
                  setQuery("");
                  setSearchTerm("");
                  setCategory("সব");
                }}
                className="px-5 py-2 rounded-xl border border-border bg-surface text-text hover:bg-[#F3F2EA] transition-colors"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={() => handleAdd(product)}
                  onOrderNow={() => handleOrderNow(product)}
                  onDetail={() => setDetailProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ProductDetailModal
        open={detailProduct !== null}
        onClose={() => setDetailProduct(null)}
        product={detailProduct!}
        onOrderNow={(product) => {
          setDetailProduct(null);
          onOpenCheckout(product);
        }}
      />
    </div>
  );
}
