import { useCallback, useEffect, useState } from "react";
import { X, ShieldCheck, Leaf, Info, ShoppingCart, Zap } from "lucide-react";
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

function InfoBlock({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-3.5">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
        <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-text">{children}</p>
    </div>
  );
}

export function ProductDetailModal({
  open,
  onClose,
  product,
  onOrderNow,
}: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  // Start every product at one unit instead of carrying the last quantity over.
  useEffect(() => {
    if (open && product) setQty(1);
  }, [open, product?.id]);

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
        className="fixed inset-0 z-50 bg-[#1a231e]/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 z-50 flex max-h-[92vh] w-[calc(100%-1.5rem)] max-w-[720px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-lift"
        role="dialog"
        aria-modal="true"
        aria-label="পণ্যের বিবরণ"
      >
        <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <span className="eyebrow">পণ্যের বিবরণ</span>
            <h2 className="mt-1 font-heading text-lg font-bold leading-snug text-text sm:text-xl">
              {product.nameBn}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="বিবরণ বন্ধ করুন"
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-error/10 hover:text-error"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-alt sm:w-[240px]">
              <img
                src={product.image}
                alt={product.nameBn}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              {product.isDemo && (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-[10px] font-bold text-accent-hover">
                  ডেমো পণ্য
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-muted">{product.descriptionBn}</p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-2xl font-bold text-primary">
                  {formatBdt(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-muted line-through">
                    {formatBdt(product.oldPrice)}
                  </span>
                )}
                <span className="text-xs text-muted">/ {product.sizeBn}</span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <QuantityStepper value={qty} onChange={setQty} />
                <span className="text-xs text-muted">
                  {product.inStock ? "স্টকে আছে" : "স্টকে নেই"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  কার্টে যোগ
                </button>
                {onOrderNow && (
                  <button
                    onClick={handleOrderNow}
                    disabled={!product.inStock}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-text transition-colors hover:border-primary/40 hover:bg-primary-soft disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
                    এখনই অর্ডার
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            <InfoBlock label="উপাদান" icon={Leaf}>
              {product.ingredientsBn}
            </InfoBlock>
            <InfoBlock label="ব্যবহার পদ্ধতি" icon={Info}>
              {product.usageBn}
            </InfoBlock>
            <InfoBlock label="সতর্কতা" icon={ShieldCheck}>
              {product.cautionBn}
            </InfoBlock>
          </div>

          <p className="mt-3 flex gap-2 rounded-xl border border-accent/25 bg-accent-soft/70 p-3 text-xs leading-relaxed text-[#7C2D12]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
            এটা কোনো রোগ নিরাময়ের দাবি করে না। হৃদরোগ, ডায়াবেটিস, গর্ভাবস্থা বা অন্য
            কোনো শারীরিক সমস্যা থাকলে ব্যবহার করার আগে নিবন্ধিত চিকিৎসকের পরামর্শ নিন।
          </p>
        </div>
      </div>
    </>
  );
}
