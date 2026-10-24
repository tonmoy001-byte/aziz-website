import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const modal = modalRef.current;
    if (modal) {
      modal.addEventListener("keydown", handleKeyDown);
      const focusables = modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      focusables[0]?.focus();
    }
    return () => {
      if (modal) modal.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      prevFocus.current?.focus();
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/2 z-50 max-w-[560px] w-full -translate-x-1/2 -translate-y-1/2 bg-surface rounded-2xl border border-border shadow-2xl p-6 flex flex-col gap-4"
        role="dialog"
        aria-modal="true"
        aria-label={title || "মডাল"}
      >
        {title && (
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-bold text-text">{title}</h2>
            <button
              onClick={onClose}
              aria-label="মডাল বন্ধ করুন"
              className="ml-auto p-1.5 rounded-md text-muted hover:text-error hover:bg-error/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto max-h-[85vh]">{children}</div>
      </div>
    </>
  );
}
