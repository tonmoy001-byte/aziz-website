import { Link } from "react-router-dom";
import { Facebook, Send, Phone, MapPin, Clock, Leaf } from "lucide-react";
import { formatBnNumber } from "../utils/bn";
import { SITE_CONFIG } from "../config/siteConfig";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইট থেকে কিছু জানতে চাই।",
  )}`;

  return (
    <footer className="mt-auto bg-primary text-accent-soft">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-accent">
                <Leaf className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="font-heading text-lg font-bold text-white">
                {SITE_CONFIG.brandNameBn}
              </span>
            </div>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-accent-soft/75">
              {SITE_CONFIG.taglineBn}। ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে অর্ডার
              করুন।
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-accent-soft transition-colors hover:border-accent hover:bg-accent hover:text-white"
                aria-label="ফেসবুক পেইজ"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-accent-soft transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                aria-label="হোয়াটসঅ্যাপে মেসেজ পাঠান"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              দ্রুত লিঙ্ক
            </h3>
            <ul className="mt-4 space-y-1">
              {[
                { to: "/", label: "হোম" },
                { to: "/products", label: "পণ্যসমূহ" },
                { to: "/about", label: "আমাদের সম্পর্কে" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex min-h-[40px] items-center text-sm text-accent-soft/80 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              যোগাযোগ
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-accent-soft/80">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{SITE_CONFIG.addressBn}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  {SITE_CONFIG.phoneNumbers.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="transition-colors hover:text-white"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{SITE_CONFIG.openingHoursBn}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              পেমেন্ট ও ডেলিভারি
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-accent-soft/80">
              <li>ক্যাশ অন ডেলিভারি</li>
              <li>পণ্য হাতে পেয়ে টাকা পরিশোধ</li>
              <li>৳১,৫০০+ অর্ডারে ডেলিভারি ফ্রি</li>
              <li>হোয়াটসঅ্যাপে অর্ডার কনফার্মেশন</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-accent-soft/60 md:flex-row md:text-left">
          <p>
            © {formatBnNumber(CURRENT_YEAR)} {SITE_CONFIG.brandNameBn}। সর্বস্বত্ব
            সংরক্ষিত।
          </p>
          <p>এটি একটি ডেমো ওয়েবসাইট। পণ্য ও দাম মালিকের প্রয়োজন অনুযায়ী বদলানো যেতে পারে।</p>
        </div>
      </div>
    </footer>
  );
}
