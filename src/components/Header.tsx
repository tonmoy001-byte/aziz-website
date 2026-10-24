import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatBnNumber } from "../utils/bn";
import { SITE_CONFIG } from "../config/siteConfig";

const NAV_LINKS = [
  { to: "/", label: "হোম" },
  { to: "/products", label: "পণ্যসমূহ" },
  { to: "/about", label: "আমাদের সম্পর্কে" },
] as const;

interface HeaderProps {
  onOpenCart: () => void;
}

export function Header({ onOpenCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-3 sm:px-4 lg:px-6">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label={`${SITE_CONFIG.brandNameBn} হোম পেজ`}
        >
          <span className="font-heading text-xl font-bold text-primary">
            {SITE_CONFIG.brandNameBn}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium text-text transition-colors ${
                location.pathname === link.to ? "text-primary" : ""
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label={`কার্ট, ${formatBnNumber(itemCount)} আইটেম`}
            className="relative p-2 rounded-md text-text hover:bg-[#F3F2EA] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-surface">
                {formatBnNumber(itemCount)}
              </span>
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-text hover:bg-[#F3F2EA] transition-colors"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div key={location.pathname} className="md:hidden bg-surface border-t border-border">
          <div className="container mx-auto px-3 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.to}
                onClick={() => {
                  closeMenu();
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-text transition-colors ${
                  location.pathname === link.to ? "bg-[#F3F2EA] text-primary" : ""
                }`}
              >
                {link.label}
                <span
                  className={`text-[10px] ${location.pathname === link.to ? "text-primary" : "text-muted"}`}
                >
                  {location.pathname === link.to ? "সক্রিয়" : ""}
                </span>
              </button>
            ))}
            <div className="pt-3 border-t border-border">
              <button
                onClick={() => { closeMenu(); onOpenCart(); }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-text hover:bg-[#F3F2EA] transition-colors"
              >
                কার্ট ({formatBnNumber(itemCount)})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
