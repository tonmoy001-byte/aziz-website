import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import { formatBdt } from "../utils/bn";
import { useCart } from "../context/CartContext";
import { Modal } from "./Modal";
import { QuantityStepper } from "./QuantityStepper";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, subtotal, delivery, deliveryHint, isEmpty, setQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = useCallback(() => {
    onClose();
    onCheckout();
  }, [onClose, onCheckout]);

  const handleViewProducts = useCallback(() => {
    onClose();
    navigate("/products");
  }, [onClose, navigate]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="drawer"
      ariaLabel="শপিং কার্ট"
      className="translate-x-0"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <ShoppingBag className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="font-heading text-lg font-bold text-text">আপনার কার্ট</h2>
          {!isEmpty && (
            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">
              {items.length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="কার্ট বন্ধ করুন"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-error/10 hover:text-error"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <ShoppingBag className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-4 font-heading text-base font-semibold text-text">
              আপনার কার্ট এখন খালি
            </p>
            <p className="mt-1 max-w-[28ch] text-sm text-muted">
              পছন্দের পণ্য যোগ করে অর্ডার সম্পন্ন করুন।
            </p>
            <button onClick={handleViewProducts} className="btn-primary mt-5">
              পণ্য দেখুন
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-border" role="list">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex gap-3 py-4 first:pt-1">
                <div className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-alt p-1">
                  <img
                    src={product.image}
                    alt={product.nameBn}
                    className="aspect-img"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-heading text-sm font-semibold text-text">
                        {product.nameBn}
                      </h3>
                      <p className="text-xs text-muted">{product.sizeBn}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`${product.nameBn} সরান`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-error/10 hover:text-error"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-heading text-sm font-bold text-primary">
                      {formatBdt(product.price * qty)}
                    </span>
                    <QuantityStepper
                      value={qty}
                      onChange={(next) => setQuantity(product.id, next)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isEmpty && (
        <div className="shrink-0 border-t border-border bg-background px-5 py-4">
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">সাবটোটাল</dt>
              <dd className="font-semibold text-text">{formatBdt(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">ডেলিভারি চার্জ</dt>
              <dd className="font-semibold text-text">
                {delivery === 0 ? "ফ্রি" : formatBdt(delivery)}
              </dd>
            </div>
            {deliveryHint && <p className="text-xs text-accent-hover">{deliveryHint}</p>}
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-primary">
              <dt>মোট</dt>
              <dd>{formatBdt(subtotal + delivery)}</dd>
            </div>
          </dl>

          <button onClick={handleCheckout} className="btn-primary mt-4 w-full">
            অর্ডার করতে এগিয়ে যান
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </Modal>
  );
}
