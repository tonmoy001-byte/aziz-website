import { useCallback } from "react";
import { Send } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";

export function FloatingWhatsApp() {
  const text = "আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইট থেকে কিছু জানতে চাই।";
  const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

  const handleClick = useCallback(() => {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
  }, [url]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="হোয়াটসঅ্যাপে মেসেজ পাঠান"
      className="fixed right-4 bottom-4 z-50 flex w-14 h-14 items-center justify-center rounded-full bg-[#25D366] text-surface shadow-lg hover:bg-[#1FB053] transition-colors focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <Send className="w-6 h-6" aria-hidden="true" />
      <span className="sr-only-sr">হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
    </a>
  );
}
