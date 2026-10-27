import type { Product } from "../types";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { formatBdt } from "../utils/bn";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
  onOrderNow?: (product: Product) => void;
}

export function ProductCard({
  product,
  onAdd,
  onOrderNow,
}: ProductCardProps) {
  const handleAdd = () => {
    // Adding to cart happens once in the parent's onAdd handler.
    onAdd?.(product);
  };

  const handleOrderNow = () => {
    // Adding to cart happens exactly once in the parent's onOrderNow handler.
    onOrderNow?.(product);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-surface-alt"
        aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
      >
        <img
          src={product.image}
          alt={product.nameBn}
          className="aspect-img p-6 transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          width={600}
          height={600}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        {product.isDemo && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-[10px] font-bold text-accent-hover">
            ডেমো পণ্য
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-error/10 px-2.5 py-1 text-[10px] font-bold text-error">
            স্টকে নেই
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-[2.9em] font-heading text-[15px] font-semibold leading-snug">
          <Link
            to={`/products/${product.id}`}
            className="text-text transition-colors hover:text-primary"
          >
            {product.nameBn}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted">{product.sizeBn}</p>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="font-heading text-lg font-bold text-accent-hover">
            {formatBdt(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted line-through">
              {formatBdt(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              aria-label={`${product.nameBn} কার্টে যোগ করুন`}
              className="min-h-[44px] w-full rounded-xl bg-primary px-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:flex-1"
            >
              কার্টে যোগ করুন
            </button>
            {onOrderNow && (
              <button
                onClick={handleOrderNow}
                disabled={!product.inStock}
                aria-label={`${product.nameBn} এখনই অর্ডার করুন`}
                className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl border border-border px-3 text-[13px] font-semibold text-text transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:shrink-0"
              >
                <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="sm:hidden">এখনই অর্ডার</span>
                <span className="hidden sm:inline">অর্ডার</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
