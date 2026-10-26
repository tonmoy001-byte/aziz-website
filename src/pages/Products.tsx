import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, RotateCcw, Leaf, ArrowUpDown, ChevronDown } from "lucide-react";
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

  const resetFilters = () => {
    setQuery("");
    setSearchTerm("");
    setCategory("সব");
  };

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="grain border-b border-border">
        <div className="container py-10 sm:py-12">
          <span className="eyebrow">আমাদের ক্যাটালগ</span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            পণ্যসমূহ
          </h1>
          <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted sm:text-[15px]">
            নিচ থেকে পণ্য বেছে নিন। সকল দাম বাংলাদেশী টাকায় (৳) — ক্যাশ অন
            ডেলিভারিতে সারা দেশে পাঠানো হয়।
          </p>
        </div>
      </section>

      <main className="flex-1 pb-16">
        <div className="container">
          {/* Filter card */}
          <div className="-mt-6 rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="flex-1">
                <label
                  htmlFor="product-search"
                  className="mb-1.5 block text-xs font-semibold text-muted"
                >
                  পণ্য খুঁজুন
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="product-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="পণ্যের নাম লিখুন..."
                    className="field pl-11"
                  />
                </div>
              </div>

              <div className="lg:w-[220px]">
                <label
                  htmlFor="product-sort"
                  className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted"
                >
                  <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
                  সাজান
                </label>
                <div className="relative">
                  <select
                    id="product-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="field appearance-none pr-10"
                  >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-asc">দাম: কম থেকে বেশি</option>
                    <option value="price-desc">দাম: বেশি থেকে কম</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={`chip shrink-0 ${category === cat ? "chip-active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-6 mt-8 flex items-center justify-between gap-3">
            <p className="text-sm text-muted">
              মোট <span className="font-semibold text-text">{formatBnNumber(filtered.length)}</span> টি
              পণ্য
            </p>
            {(query || category !== "সব") && (
              <button
                onClick={resetFilters}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                ফিল্টার রিসেট
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Leaf className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="mt-4 font-heading text-lg font-semibold text-text">
                কোনো পণ্য পাওয়া যায়নি
              </p>
              <p className="mt-1 max-w-[36ch] text-sm text-muted">
                অন্য কোনো নাম দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করে সব পণ্য দেখুন।
              </p>
              <button onClick={resetFilters} className="btn-primary mt-6">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
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
