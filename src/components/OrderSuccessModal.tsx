import { useCallback } from "react";
import { CheckCircle2, Copy, Send } from "lucide-react";

interface OrderSuccessModalProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
  message: string;
  whatsappUrl: string;
}

export function OrderSuccessModal({
  open,
  onClose,
  orderId,
  message,
  whatsappUrl,
}: OrderSuccessModalProps) {
  const copyMessage = useCallback(() => {
    const text = message;
    try {
      navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // copy unavailable
      }
      document.body.removeChild(ta);
    }
  }, [message]);

  const reopenWhatsApp = useCallback(() => {
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = whatsappUrl;
    }
  }, [whatsappUrl]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 z-50 max-w-[520px] w-full -translate-x-1/2 -translate-y-1/2 bg-surface rounded-2xl border border-border shadow-2xl p-6 flex flex-col gap-4 text-center"
        role="dialog"
        aria-modal="true"
        aria-label="অর্ডার সফল"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10 text-success mx-auto mb-2">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="font-heading text-lg font-bold text-text">আপনার অর্ডার তৈরি হয়েছে</h2>
        <p className="text-sm text-text">
          অর্ডার নং: <span className="font-bold">{orderId}</span>
        </p>
        <p className="text-sm text-muted">
          হোয়াটসঅ্যাপে "Send" চাপুন, তাহলেই আমরা অর্ডার পাব। আমরা শীঘ্রই
          ফোন/হোয়াটসঅ্যাপে কনফার্ম করব।
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reopenWhatsApp}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-surface font-medium hover:bg-[#1FB053] transition-colors"
          >
            <Send className="w-5 h-5" /> আবার হোয়াটসঅ্যাপ খুলুন
          </button>
          <button
            onClick={copyMessage}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface text-text font-medium hover:bg-[#F3F2EA] transition-colors"
          >
            <Copy className="w-5 h-5" /> মেসেজ কপি করুন
          </button>
        </div>
        <button
          onClick={onClose}
          className="py-2.5 rounded-xl border border-border bg-surface text-text font-medium hover:bg-[#F3F2EA] transition-colors"
        >
          বন্ধ করুন
        </button>
      </div>
    </>
  );
}
