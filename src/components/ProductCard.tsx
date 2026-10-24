import type { Product } from "../types";
import { Zap, ArrowRight } from "lucide-react";
import { formatBdt } from "../utils/bn";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
  onOrderNow?: (product: Product) => void;
  onDetail?: (product: Product) => void;
}

export function ProductCard({
  product,
  onAdd,
  onOrderNow,
  onDetail,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    onAdd?.(product);
  };

  const handleOrderNow = () => {
    addToCart(product);
    onOrderNow?.(product);
  };

  return (
    <article className="flex flex-col h-full rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <div className="relative aspect-[1/1] overflow-hidden bg-[#E7E2D6]">
        <img
          src={product.image}
          alt={product.nameBn}
          className="aspect-img"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        {product.isDemo && (
          <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold text-surface">
            ডেমো পণ্য
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-heading text-base font-semibold text-text leading-tight">{product.nameBn}</h3>
          {!product.inStock && (
            <span className="text-xs font-medium text-error">স্টকে নেই</span>
          )}
        </div>
        <p className="text-xs text-muted">{product.sizeBn}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold text-primary">{formatBdt(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted line-through">
              {formatBdt(product.oldPrice)}
            </span>
          )}
        </div>
        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label={`${product.nameBn} কার্টে যোগ করুন`}
            className="flex-1 py-2.5 rounded-xl bg-primary text-surface font-medium text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            কার্টে যোগ করুন
          </button>
          {onOrderNow && (
            <button
              onClick={handleOrderNow}
              disabled={!product.inStock}
              aria-label={`${product.nameBn} এখনই অর্ডার করুন`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border bg-surface text-text font-medium text-sm hover:bg-[#F3F2EA] transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <Zap className="w-4 h-4" /> এখনই অর্ডার করুন
            </button>
          )}
        </div>
        {onDetail && (
          <button
            onClick={() => onDetail(product)}
            aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
            className="w-full py-2 text-left text-sm text-primary underline-offset-4 hover:underline hover:text-primary-hover transition-colors"
          >
            বিস্তারিত <ArrowRight className="w-3 h-3 inline ml-1" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
}
