import { useCallback } from "react";
import { CheckCircle2, Copy, Send } from "lucide-react";
import { Modal } from "./Modal";

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

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="dialog"
      maxWidth="w-full max-w-[520px]"
      ariaLabel="অর্ডার সফল"
      className="gap-4 rounded-2xl p-6 text-center"
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
          className="btn-whatsapp"
        >
          <Send className="w-5 h-5" /> আবার হোয়াটসঅ্যাপ খুলুন
        </button>
        <button
          onClick={copyMessage}
          className="btn-ghost"
        >
          <Copy className="w-5 h-5" /> মেসেজ কপি করুন
        </button>
      </div>
      <button
        onClick={onClose}
        className="btn-ghost !min-h-[44px] !px-5 !text-[13px]"
      >
        বন্ধ করুন
      </button>
    </Modal>
  );
}
