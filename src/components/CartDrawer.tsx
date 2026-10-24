import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { formatBdt } from "../utils/bn";
import { useCart } from "../context/CartContext";
import { QuantityStepper } from "./QuantityStepper";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, subtotal, delivery, deliveryHint, isEmpty, setQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleCheckout = useCallback(() => {
    onClose();
    onCheckout();
  }, [onClose, onCheckout]);

  const handleViewProducts = useCallback(() => {
    onClose();
    navigate("/products");
  }, [onClose, navigate]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed right-0 top-0 z-50 h-full bg-surface border-l border-border shadow-2xl flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-200 ease-out sm:max-w-[420px] sm:w-full`}
        aria-label="শপিং কার্ট"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-heading text-lg font-bold text-text">আপনার কার্ট</h2>
          <button
            onClick={onClose}
            aria-label="কার্ট বন্ধ করুন"
            className="p-1.5 rounded-md text-muted hover:text-error hover:bg-error/10 transition-colors"
          >
            <span className="sr-only-sr">কার্ট বন্ধ করুন</span>
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-muted">আপনার কার্ট এখন খালি।</p>
              <button
                onClick={handleViewProducts}
                className="mt-4 py-2 px-6 rounded-xl bg-primary text-surface font-medium hover:bg-primary-hover transition-colors"
              >
                পণ্য দেখুন
              </button>
            </div>
          ) : (
            <>
              <ul className="space-y-4" role="list">
                {items.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-3 group">
                    <div className="relative aspect-[1/1] w-16 h-16 flex-shrink-0 overflow-hidden bg-[#E7E2D6] rounded-lg">
                      <img
                        src={product.image}
                        alt={product.nameBn}
                        className="aspect-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-text truncate">{product.nameBn}</h4>
                      <p className="text-xs text-muted">{product.sizeBn}</p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-primary">{formatBdt(product.price)}</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex items-center gap-2">
                        <QuantityStepper
                          value={qty}
                          onChange={(next) => setQuantity(product.id, next)}
                        />
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`${product.nameBn} সরান`}
                        className="p-1.5 rounded-md text-muted hover:bg-error/10 hover:text-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">সাবটোটাল</span>
                  <span className="font-bold text-text">{formatBdt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">ডেলিভারি চার্জ</span>
                  <span className="font-bold text-text">
                    {delivery === 0 ? "ফ্রি" : formatBdt(delivery)}
                  </span>
                </div>
                {deliveryHint && (
                  <p className="text-xs text-primary">{deliveryHint}</p>
                )}
                <div className="flex justify-between text-base font-bold text-primary border-t border-border pt-2">
                  <span>মোট</span>
                  <span>{formatBdt(subtotal + delivery)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isEmpty}
                  className="w-full mt-4 py-3 rounded-xl bg-primary text-surface font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  অর্ডার করতে এগিয়ে যান
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
