import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, MapPin, Info, ChevronRight, Send } from "lucide-react";
import { formatBdt, toBnDigits } from "../utils/bn";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  makeOrderId,
  type OrderInput,
  type OrderLine,
} from "../utils/whatsapp";
import { normalizePhone } from "../utils/validation";
import { useCart } from "../context/CartContext";
import { OrderSuccessModal } from "./OrderSuccessModal";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

type FormFields = {
  name: string;
  phone: string;
  address: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const INITIAL_FORM: FormFields = { name: "", phone: "", address: "", note: "" };

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items: cartItems, subtotal, delivery, total, clearCart } = useCart();
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormFields, boolean>>({
    name: false,
    phone: false,
    address: false,
    note: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    orderId: string;
    message: string;
    url: string;
  } | null>(null);
  const submitRef = useRef(false);

  const validateField = useCallback((key: keyof FormFields): boolean => {
    const value = form[key];
    switch (key) {
      case "name": {
        const trimmed = value.trim();
        if (!trimmed) {
          setErrors((prev) => ({ ...prev, name: "নাম লিখুন" }));
          return false;
        }
        if (trimmed.length < 2 || trimmed.length > 60) {
          setErrors((prev) => ({
            ...prev,
            name: "নাম ২ থেকে ৬০ অক্ষরের মধ্যে হতে হবে",
          }));
          return false;
        }
        setErrors((prev) => {
          const next = { ...prev };
          delete next.name;
          return next;
        });
        return true;
      }
      case "phone": {
        if (!normalizePhone(value)) {
          setErrors((prev) => ({
            ...prev,
            phone: "সঠিক মোবাইল নম্বর লিখুন (০১XXXXXXXXX)",
          }));
          return false;
        }
        setErrors((prev) => {
          const next = { ...prev };
          delete next.phone;
          return next;
        });
        return true;
      }
      case "address": {
        if (value.trim().length < 15) {
          setErrors((prev) => ({
            ...prev,
            address: "দয়া করে পূর্ণ ঠিকানা লিখুন (কমপক্ষে ১৫ অক্ষর)",
          }));
          return false;
        }
        setErrors((prev) => {
          const next = { ...prev };
          delete next.address;
          return next;
        });
        return true;
      }
      case "note": {
        if (value.length > 200) {
          setErrors((prev) => ({
            ...prev,
            note: "নোট ২০০ অক্ষরের বেশি হতে পারবে না",
          }));
          return false;
        }
        setErrors((prev) => {
          const next = { ...prev };
          delete next.note;
          return next;
        });
        return true;
      }
    }
    return true;
  }, [form]);

  const setField = useCallback(
    (key: keyof FormFields, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    },
    [errors],
  );

  const setTouchedField = useCallback((key: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    validateField(key);
  }, [validateField]);

  const validateAll = useCallback((): boolean => {
    let ok = true;
    (Object.keys(form) as (keyof FormFields)[]).forEach((key) => {
      if (!validateField(key)) ok = false;
    });
    return ok;
  }, [validateField, form]);

  const focusFirstInvalid = useCallback(() => {
    const order: (keyof FormFields)[] = ["name", "phone", "address", "note"];
    const first = order.find((key) => Boolean(errors[key]));
    if (!first) return;
    const el = document.getElementById(`checkout-${first}`);
    (el as HTMLElement | null)?.focus();
  }, [errors]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (submitRef.current) return;
      if (cartItems.length === 0) {
        onClose();
        return;
      }
      setSubmitting(true);
      if (!validateAll()) {
        setSubmitting(false);
        focusFirstInvalid();
        return;
      }

      const phone = normalizePhone(form.phone);
      if (!phone) {
        setSubmitting(false);
        return;
      }

      const lines: OrderLine[] = cartItems.map(({ product, qty }) => ({
        nameBn: product.nameBn,
        qty,
        unitPrice: product.price,
      }));

      const input: OrderInput = {
        name: form.name.trim(),
        phone,
        address: form.address.trim(),
        note: form.note.trim() || undefined,
        lines,
        subtotal,
        delivery,
        total,
      };

      const orderId = makeOrderId();
      const message = buildOrderMessage(input, orderId);
      const url = buildWhatsAppUrl(message);

      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) {
        window.location.href = url;
      }

      setSuccess({ orderId, message, url });
      setSubmitting(false);
    },
    [cartItems, form, subtotal, delivery, total, validateAll, focusFirstInvalid, onClose],
  );

  const handleSuccessClose = useCallback(() => {
    clearCart();
    setSuccess(null);
    onClose();
  }, [clearCart, onClose]);

  // Lock body scroll while checkout is open
  useEffect(() => {
    if (!open && !success) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, success]);

  return (
    <>
      {success && (
        <OrderSuccessModal
          open={true}
          onClose={handleSuccessClose}
          orderId={success.orderId}
          message={success.message}
          whatsappUrl={success.url}
        />
      )}
      {!open && !success ? null : (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            className="fixed left-1/2 top-1/2 z-50 max-w-[560px] w-full -translate-x-1/2 -translate-y-1/2 bg-surface rounded-2xl border border-border shadow-2xl p-5 sm:p-6 flex flex-col gap-4 max-h-[92vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="চেকআউট ও অর্ডার পुष্টি"
          >
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-lg font-bold text-text">
                অর্ডার করুন (ক্যাশ অন ডেলিভারি)
              </h2>
              <button
                onClick={onClose}
                aria-label="চেকআউট বন্ধ করুন"
                className="ml-auto p-1.5 rounded-md text-muted hover:text-error hover:bg-error/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-2">
              <div className="space-y-2">
                <label
                  htmlFor="checkout-name"
                  className="text-sm font-semibold text-text block"
                >
                  আপনার নাম
                </label>
                <input
                  id="checkout-name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  onBlur={() => setTouchedField("name")}
                  autoComplete="name"
                  className={`w-full rounded-lg border px-3 py-2 text-text focus:ring-2 focus:ring-primary transition-colors ${touched.name && errors.name ? "border-error" : "border-border"}`}
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-error">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="checkout-phone"
                  className="text-sm font-semibold text-text block flex items-center gap-1"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> মোবাইল নম্বর
                </label>
                <input
                  id="checkout-phone"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  onBlur={() => setTouchedField("phone")}
                  autoComplete="tel"
                  className={`w-full rounded-lg border px-3 py-2 text-text focus:ring-2 focus:ring-primary transition-colors ${touched.phone && errors.phone ? "border-error" : "border-border"}`}
                />
                <p className="text-xs text-muted">
                  ০১XXX-XXXXXX বা +৮৮০১XXX-XXXXXX আকারে লিখতে পারবেন
                </p>
                {touched.phone && errors.phone && (
                  <p className="text-xs text-error">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="checkout-address"
                  className="text-sm font-semibold text-text block flex items-center gap-1"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" /> সম্পূর্ণ ঠিকানা
                </label>
                <textarea
                  id="checkout-address"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  onBlur={() => setTouchedField("address")}
                  rows={3}
                  autoComplete="street-address"
                  className={`w-full rounded-lg border px-3 py-2 text-text focus:ring-2 focus:ring-primary transition-colors ${touched.address && errors.address ? "border-error" : "border-border"}`}
                />
                <p className="text-xs text-muted">
                  গ্রাম/মহল্লা, রোড/বাসা নং, ইউনিয়ন/ওয়ার্ড, থানা/উপজেলা, জেলা
                </p>
                {touched.address && errors.address && (
                  <p className="text-xs text-error">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="checkout-note"
                  className="text-sm font-semibold text-text block"
                >
                  অতিরিক্ত নোট (ঐচ্ছিক)
                </label>
                <textarea
                  id="checkout-note"
                  value={form.note}
                  onChange={(e) => setField("note", e.target.value)}
                  onBlur={() => setTouchedField("note")}
                  rows={2}
                  className="w-full rounded-lg border px-3 py-2 text-text focus:ring-2 focus:ring-primary transition-colors border-border"
                  maxLength={200}
                />
                <p className="text-xs text-muted">ঐচ্ছিক, সর্বোচ্চ ২০০ অক্ষর</p>
                {touched.note && errors.note && (
                  <p className="text-xs text-error">{errors.note}</p>
                )}
              </div>

              {/* Order summary */}
              <div className="border border-border rounded-xl p-3 bg-[#FAF8F3] space-y-2">
                <h3 className="text-xs font-semibold text-muted">অর্ডারের বিবরণ</h3>
                <ul className="space-y-1 text-sm">
                  {cartItems.map(({ product, qty }) => (
                    <li key={product.id} className="flex justify-between">
                      <span className="text-text">{product.nameBn} × {toBnDigits(qty)}</span>
                      <span className="font-medium text-primary">{formatBdt(product.price * qty)}</span>
                    </li>
                  ))}
                  <li className="flex justify-between text-xs text-muted border-t border-border pt-1">
                    <span>ডেলিভারি চার্জ</span>
                    <span>{delivery === 0 ? "ফ্রি" : formatBdt(delivery)}</span>
                  </li>
                  <li className="flex justify-between font-bold text-primary">
                    <span>সর্বমোট</span>
                    <span>{formatBdt(total)}</span>
                  </li>
                </ul>
                <div className="flex items-center gap-2 mt-2 text-xs text-primary">
                  <Info className="w-3 h-3" aria-hidden="true" />
                  পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 rounded-lg border border-border bg-surface text-text text-sm hover:bg-[#F3F2EA] transition-colors"
                >
                  কার্টে ফিরে যান <ChevronRight className="w-3 h-3 ml-1" aria-hidden="true" />
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting || cartItems.length === 0}
                className="w-full py-3.5 rounded-xl bg-[#25D366] text-surface font-bold hover:bg-[#1FB053] disabled:opacity-50 disabled:pointer-events-none transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                হোয়াটসঅ্যাপে অর্ডার পাঠান
              </button>
              <p className="text-xs text-muted leading-relaxed">
                বাটনে ক্লিক করলে হোয়াটসঅ্যাপ খুলবে। সেখানে "Send" চাপলেই আপনার অর্ডার আমাদের কাছে
                পৌঁছাবে।
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
}
