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
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-lift transition-transform hover:scale-105 hover:bg-[#188A46] focus-visible:ring-2 focus-visible:ring-[#1FA855] focus-visible:ring-offset-2"
    >
      <Send className="w-6 h-6" aria-hidden="true" />
      <span className="sr-only-sr">হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
    </a>
  );
}
