import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, X, Truck, Phone, Leaf } from "lucide-react";
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

function BrandMark() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-accent-soft shadow-card">
      <Leaf className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export function Header({ onOpenCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-accent-soft">
        <div className="container flex items-center justify-center gap-2 py-2 text-center text-[11px] font-medium sm:text-xs">
          <Truck className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
          <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি · ৳১,৫০০+ কেনাকাটায় ডেলিভারি ফ্রি</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="container flex h-[72px] items-center justify-between gap-3">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`${SITE_CONFIG.brandNameBn} হোম পেজ`}
            onClick={closeMenu}
          >
            <BrandMark />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-[17px] font-bold text-primary sm:text-lg">
                {SITE_CONFIG.brandNameBn}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-muted sm:block">
                {SITE_CONFIG.brandSubNameBn}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="প্রধান মেনু">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted hover:bg-primary-soft hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE_CONFIG.phoneNumbers[0]}`}
              className="hidden items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary lg:flex"
            >
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              {SITE_CONFIG.phoneNumbers[0]}
            </a>

            <button
              onClick={onOpenCart}
              aria-label={`কার্ট, ${formatBnNumber(itemCount)} আইটেম`}
              className="relative flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-3.5 text-white transition-colors hover:bg-primary-hover sm:px-4"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              <span className="hidden text-sm font-semibold sm:inline">কার্ট</span>
              {itemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">
                  {formatBnNumber(itemCount)}
                </span>
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-text transition-colors hover:bg-primary-soft md:hidden"
              aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="container space-y-1 py-4">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={`flex min-h-[48px] items-center justify-between rounded-xl px-4 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary-soft text-primary"
                        : "text-text hover:bg-surface-alt"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}

              <div className="grid grid-cols-2 gap-2 border-t border-border pt-3">
                <a
                  href={`tel:${SITE_CONFIG.phoneNumbers[0]}`}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-semibold text-text"
                >
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" /> ফোন করুন
                </a>
                <button
                  onClick={() => {
                    closeMenu();
                    onOpenCart();
                  }}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white"
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" /> কার্ট (
                  {formatBnNumber(itemCount)})
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
