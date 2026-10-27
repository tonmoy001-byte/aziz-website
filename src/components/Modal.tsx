import { useEffect, useRef, type ReactNode } from "react";
import type { CSSProperties } from "react";

type ModalVariant = "drawer" | "dialog" | "sheet";

interface ModalProps {
  /** Whether the overlay is visible. */
  open: boolean;
  onClose: () => void;
  /**
   * drawer — right-side panel (cart drawer).
   * dialog — centered panel.
   * sheet  — centered on desktop, bottom sheet on mobile (checkout).
   */
  variant?: ModalVariant;
  /** Panel max width, e.g. "max-w-[560px]". */
  maxWidth?: string;
  /** Accessible name for the dialog element. */
  ariaLabel: string;
  /** Extra classes appended to the panel (e.g. layout tweaks). */
  className?: string;
  /** Inline styles for the panel (e.g. CSS vars). */
  style?: CSSProperties;
  children: ReactNode;
}

const BACKDROP_CLASS =
  "fixed inset-0 z-40 bg-[#1a231e]/40 backdrop-blur-sm";

const PANEL_BASE =
  "z-50 border border-border bg-surface shadow-lift";

const PANEL_CLASS: Record<ModalVariant, string> = {
  drawer:
    "fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l sm:w-[420px] transition-transform duration-200 ease-out",
  dialog: "flex flex-col fixed left-1/2 top-1/2 max-h-[92vh] -translate-x-1/2 -translate-y-1/2",
  // Bottom sheet on small screens, centered dialog from sm up.
  sheet: "flex flex-col max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[92dvh] max-sm:max-w-none max-sm:rounded-b-none max-sm:rounded-t-3xl sm:fixed sm:left-1/2 sm:top-1/2 sm:max-h-[92vh] sm:-translate-x-1/2 sm:-translate-y-1/2",
};

/**
 * The single overlay primitive for the app.
 *
 * Owns the shared overlay behaviour (backdrop, body scroll-lock, Escape,
 * click-outside close, focus restore) so every overlay renders the same way.
 * Each caller supplies its own panel contents.
 */
export function Modal({
  open,
  onClose,
  variant = "dialog",
  maxWidth,
  ariaLabel,
  className = "",
  style,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  // Body scroll-lock + focus bookkeeping for the open overlay.
  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      prevFocus.current?.focus();
    };
  }, [open]);

  // Escape closes the topmost open overlay.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={`${PANEL_BASE} ${PANEL_CLASS[variant]} ${maxWidth ?? ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );

  return (
    <>
      <div
        className={BACKDROP_CLASS}
        onClick={onClose}
        aria-hidden="true"
      />
      {panel}
    </>
  );
}
