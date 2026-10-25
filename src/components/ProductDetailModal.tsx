import { useCallback, useState } from "react";
import { X } from "lucide-react";
import type { Product } from "../types";
import { formatBdt } from "../utils/bn";
import { useCart } from "../context/CartContext";
import { QuantityStepper } from "./QuantityStepper";

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onOrderNow?: (product: Product) => void;
}

export function ProductDetailModal({
  open,
  onClose,
  product,
  onOrderNow,
}: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = useCallback(() => {
    addToCart(product, qty);
  }, [addToCart, product, qty]);

  const handleOrderNow = useCallback(() => {
    addToCart(product, qty);
    onOrderNow?.(product);
  }, [addToCart, product, qty, onOrderNow]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 z-50 max-w-[640px] w-full -translate-x-1/2 -translate-y-1/2 bg-surface rounded-2xl border border-border shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh] flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="পণ্যের বিবরণ"
      >
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-lg font-bold text-text">{product.nameBn}</h2>
          <button
            onClick={onClose}
            aria-label="বিবরণ বন্ধ করুন"
            className="ml-auto p-1.5 rounded-md text-muted hover:text-error hover:bg-error/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative aspect-[4/5] overflow-hidden bg-[#E7E2D6] rounded-xl">
            <img
              src={product.image}
              alt={product.nameBn}
              className="aspect-img"
              loading="lazy"
            />
            {product.isDemo && (
              <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold text-surface">
                ডেমো পণ্য
              </span>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-text leading-relaxed">{product.descriptionBn}</p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">উপাদান</p>
              <p className="text-sm text-text">{product.ingredientsBn}</p>
              <p className="text-xs font-medium text-muted">ব্যবহার পদ্ধতি</p>
              <p className="text-sm text-text">{product.usageBn}</p>
              <p className="text-xs font-medium text-muted">সতর্কতা</p>
              <p className="text-sm text-text">{product.cautionBn}</p>
              <p className="text-xs text-error italic">
                এটা কোনো রোগ নিরাময়ের দাবি করে না। হৃদরোগ, ডায়াবেটিস, গর্ভাবস্থা বা অন্য কোনো শারীরিক সমস্যা থাকলে ব্যবহার করার আগে নিবন্ধিত চিকিৎসকের পরামর্শ নিন।
              </p>
            </div>
            <div className="pt-3 border-t border-border flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">{formatBdt(product.price)}</span>
              <span className="text-sm text-muted">{product.sizeBn}</span>
            </div>
            <div className="pt-2">
              <QuantityStepper value={qty} onChange={setQty} />
            </div>
            <div className="pt-3 flex gap-2">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className="flex-1 py-3 rounded-xl bg-primary text-surface font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                কার্টে যোগ করুন
              </button>
              {onOrderNow && (
                <button
                  onClick={handleOrderNow}
                  disabled={!product.inStock}
                  className="flex-1 py-3 rounded-xl border border-border bg-surface text-text font-medium hover:bg-[#F3F2EA] transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  এখনই অর্ডার করুন
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
