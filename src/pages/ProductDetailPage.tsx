import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ProductDetailView, ProductDetailExtraInfo } from "../components/ProductDetailView";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      document.title = `${product.nameBn} | আজিজ ন্যাচারাল ঔষধালয়`;
    }
  }, [product]);

  if (!product) {
    return (
      <section className="container py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-text">পণ্যটি পাওয়া যায়নি</h1>
        <p className="mt-3 text-sm text-muted">
          লিঙ্কটি পরিবর্তিত হতে পারে। পণ্যসমূহ পাতা থেকে খুঁজে দেখুন।
        </p>
        <Link to="/products" className="btn-primary mt-8">
          পণ্যসমূহে ফিরুন
        </Link>
      </section>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-surface">
        <div className="container py-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            পণ্যসমূহে ফিরে যান
          </Link>
          <span className="eyebrow mt-3 hidden">পণ্যের বিবরণ</span>
          <h1 className="mt-2 font-heading text-2xl font-bold leading-snug text-text sm:text-3xl">
            {product.nameBn}
          </h1>
          <p className="mt-1 text-sm text-muted">{product.categoryBn} · {product.sizeBn}</p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-card sm:p-8">
            {/* key remounts the view per product so quantity always starts at 1 */}
            <ProductDetailView key={product.id} product={product} />
            <ProductDetailExtraInfo product={product} />
          </div>
        </div>
      </section>
    </div>
  );
}
