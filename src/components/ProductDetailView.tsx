import { useCallback, useState } from "react";
import { ShieldCheck, Leaf, Info, ShoppingCart, Zap } from "lucide-react";
import type { Product } from "../types";
import { formatBdt } from "../utils/bn";
import { useCart } from "../context/CartContext";
import { useUi } from "../context/UiContext";
import { QuantityStepper } from "./QuantityStepper";

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

interface ProductDetailViewProps {
  product: Product;
}

/**
 * Shared product detail content (description, price, quantity, CTAs,
 * ingredients/usage/caution). Used by the product detail page.
 */
export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const { openCart, openCheckout } = useUi();
  const [qty, setQty] = useState(1);

  const handleAdd = useCallback(() => {
    addToCart(product, qty);
    openCart();
  }, [addToCart, product, qty, openCart]);

  const handleOrderNow = useCallback(() => {
    addToCart(product, qty);
    openCheckout();
  }, [addToCart, product, qty, openCheckout]);

  return (
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
          <span className="font-heading text-2xl font-bold text-accent-hover">
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
            className="btn-primary !min-h-[48px] !px-4"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            কার্টে যোগ
          </button>
          <button
            onClick={handleOrderNow}
            disabled={!product.inStock}
            className="btn-ghost !min-h-[48px] !px-4"
          >
            <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
            এখনই অর্ডার
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailExtraInfo({ product }: { product: Product }) {
  return (
    <>
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

      <p className="mt-3 flex gap-2 rounded-xl border border-accent/25 bg-accent-soft/70 p-3 text-xs leading-relaxed text-caution">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
        এটা কোনো রোগ নিরাময়ের দাবি করে না। হৃদরোগ, ডায়াবেটিস, গর্ভাবস্থা বা অন্য
        কোনো শারীরিক সমস্যা থাকলে ব্যবহার করার আগে নিবন্ধিত চিকিৎসকের পরামর্শ নিন।
      </p>
    </>
  );
}
