import { Link } from "react-router-dom";
import { Facebook, Send } from "lucide-react";
import { formatBnNumber } from "../utils/bn";
import { SITE_CONFIG } from "../config/siteConfig";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <span className="font-heading text-lg font-bold text-primary block mb-2">
              {SITE_CONFIG.brandNameBn}
            </span>
            <p className="text-sm text-muted leading-relaxed">
              {SITE_CONFIG.taglineBn} ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে
              অর্ডার করুন।
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text hover:bg-primary hover:text-surface transition-colors"
                aria-label="ফেসবুক পেইজ"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইট থেকে কিছু জানতে চাই।")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text hover:bg-[#25D366] hover:text-surface transition-colors"
                aria-label="হোয়াটসঅ্যাপে মেসেজ পাঠান"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-text mb-4">কুইক লিঙ্ক</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/">হোম</Link></li>
              <li><Link to="/products">পণ্যসমূহ</Link></li>
              <li><Link to="/about">আমাদের সম্পর্কে</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-text mb-4">যোগাযোগ</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>{SITE_CONFIG.addressBn}</li>
              {SITE_CONFIG.phoneNumbers.map((phone, i) => (
                <li key={i}>
                  <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li>{SITE_CONFIG.openingHoursBn}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-text mb-4">পেমেন্ট</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>ক্যাশ অন ডেলিভারি</li>
              <li>পণ্য হাতে পেয়ে টাকা পরিশোধ করুন</li>
              <li>হোয়াটসঅ্যাপে অর্ডার পাঠান</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>
            © {formatBnNumber(CURRENT_YEAR)} {SITE_CONFIG.brandNameBn}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p>এটি একটি ডেমো ওয়েবসাইট। পণ্য ও দাম মালিকের প্রয়োজন অনুযায়ী বদলানো যেতে পারে।</p>
        </div>
      </div>
    </footer>
  );
}
