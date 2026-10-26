import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, MapPin, Info, ChevronRight, Send, X } from "lucide-react";
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
            className="fixed left-1/2 top-1/2 z-50 flex max-h-[92vh] w-full max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-3xl border border-border bg-surface p-5 shadow-lift sm:p-6 max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[92dvh] max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:rounded-t-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="চেকআউট ও অর্ডার নিশ্চিতকরণ"
          >
            <div className="mx-auto mb-1 h-1.5 w-12 shrink-0 rounded-full bg-border sm:hidden" />
            <div className="flex items-start gap-3">
              <div>
                <span className="eyebrow">চেকআউট</span>
                <h2 className="mt-1 font-heading text-lg font-bold text-text">
                  অর্ডার করুন (ক্যাশ অন ডেলিভারি)
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="চেকআউট বন্ধ করুন"
                className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-error/10 hover:text-error"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col gap-3"
            >
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 pb-1">
                <div className="space-y-2">
                  <label
                    htmlFor="checkout-name"
                    className="block text-sm font-semibold text-text"
                  >
                    আপনার নাম
                  </label>
                  <input
                    id="checkout-name"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    onBlur={() => setTouchedField("name")}
                    autoComplete="name"
                    aria-invalid={Boolean(touched.name && errors.name)}
                    className={`field ${touched.name && errors.name ? "border-error" : ""}`}
                  />
                  {touched.name && errors.name && (
                    <p role="alert" className="text-xs text-error">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="checkout-phone"
                    className="flex items-center gap-1.5 text-sm font-semibold text-text"
                  >
                    <Phone className="h-4 w-4 text-primary" aria-hidden="true" /> মোবাইল নম্বর
                  </label>
                  <input
                    id="checkout-phone"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    onBlur={() => setTouchedField("phone")}
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={Boolean(touched.phone && errors.phone)}
                    className={`field ${touched.phone && errors.phone ? "border-error" : ""}`}
                  />
                  <p className="text-xs text-muted">
                    ০১XXX-XXXXXX বা +৮৮০১XXX-XXXXXX আকারে লিখতে পারবেন
                  </p>
                  {touched.phone && errors.phone && (
                    <p role="alert" className="text-xs text-error">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="checkout-address"
                    className="flex items-center gap-1.5 text-sm font-semibold text-text"
                  >
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" /> সম্পূর্ণ ঠিকানা
                  </label>
                  <textarea
                    id="checkout-address"
                    value={form.address}
                    onChange={(e) => setField("address", e.target.value)}
                    onBlur={() => setTouchedField("address")}
                    rows={3}
                    autoComplete="street-address"
                    aria-invalid={Boolean(touched.address && errors.address)}
                    className={`field h-auto py-3 ${touched.address && errors.address ? "border-error" : ""}`}
                  />
                  <p className="text-xs text-muted">
                    গ্রাম/মহল্লা, রোড/বাসা নং, ইউনিয়ন/ওয়ার্ড, থানা/উপজেলা, জেলা
                  </p>
                  {touched.address && errors.address && (
                    <p role="alert" className="text-xs text-error">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="checkout-note"
                    className="block text-sm font-semibold text-text"
                  >
                    অতিরিক্ত নোট (ঐচ্ছিক)
                  </label>
                  <textarea
                    id="checkout-note"
                    value={form.note}
                    onChange={(e) => setField("note", e.target.value)}
                    onBlur={() => setTouchedField("note")}
                    rows={2}
                    className="field h-auto py-3"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted">ঐচ্ছিক, সর্বোচ্চ ২০০ অক্ষর</p>
                  {touched.note && errors.note && (
                    <p role="alert" className="text-xs text-error">{errors.note}</p>
                  )}
                </div>

                {/* Order summary */}
                <div className="space-y-2 rounded-2xl border border-border bg-background p-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    অর্ডারের বিবরণ
                  </h3>
                  <ul className="space-y-1.5 text-sm">
                    {cartItems.map(({ product, qty }) => (
                      <li key={product.id} className="flex justify-between gap-3">
                        <span className="text-text">
                          {product.nameBn} × {toBnDigits(qty)}
                        </span>
                        <span className="shrink-0 font-medium text-primary">
                          {formatBdt(product.price * qty)}
                        </span>
                      </li>
                    ))}
                    <li className="flex justify-between border-t border-border pt-1.5 text-xs text-muted">
                      <span>ডেলিভারি চার্জ</span>
                      <span>{delivery === 0 ? "ফ্রি" : formatBdt(delivery)}</span>
                    </li>
                    <li className="flex justify-between border-t border-border pt-1.5 font-bold text-primary">
                      <span>সর্বমোট</span>
                      <span>{formatBdt(total)}</span>
                    </li>
                  </ul>
                  <div className="mt-2 flex items-center gap-2 text-xs text-primary">
                    <Info className="h-3.5 w-3.5" aria-hidden="true" />
                    পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-1 flex min-h-[44px] w-full items-center justify-center gap-1 rounded-xl border border-border bg-surface text-sm font-medium text-text transition-colors hover:bg-surface-alt"
                  >
                    কার্টে ফিরে যান
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="shrink-0 space-y-2 border-t border-border pt-3">
                <button
                  type="submit"
                  disabled={submitting || cartItems.length === 0}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1FA855] py-3.5 font-bold text-white transition-colors hover:bg-[#188A46] disabled:pointer-events-none disabled:opacity-50"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  হোয়াটসঅ্যাপে অর্ডার পাঠান
                </button>
                <p className="text-xs leading-relaxed text-muted">
                  বাটনে ক্লিক করলে হোয়াটসঅ্যাপ খুলবে। সেখানে &quot;Send&quot; চাপলেই আপনার
                  অর্ডার আমাদের কাছে পৌঁছাবে।
                </p>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
