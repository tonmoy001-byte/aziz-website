import { MapPin, Send, ShieldCheck, Truck, Currency, Clock, Facebook, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/siteConfig";
import { DisclaimerBanner } from "../components/DisclaimerBanner";

export function About() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.addressBn)}`;
  const whatsappText = "আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইট থেকে কিছু জানতে চাই।";
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  const commitments = [
    {
      title: "স্বচ্ছ পণ্য তথ্য",
      icon: ShieldCheck,
      desc: "প্রতিটি পণ্যের উপাদান, ব্যবহার পদ্ধতি ও সতর্কতা স্পষ্টভাবে লিখে রাখা হয়েছে।",
    },
    {
      title: "ঠিকানা যাচাই করে ডেলিভারি",
      icon: Truck,
      desc: "অর্ডার কনফার্মের পর আমাদের টিম ঠিকানা যাচাই করে পণ্য পাঠিয়ে দেয়।",
    },
    {
      title: "ক্যাশ অন ডেলিভারি",
      icon: Currency,
      desc: "পণ্য হাতে পেয়ে টাকা পরিশোধ করুন। অগ্রিম কোনো পেমেন্টের প্রয়োজন নেই।",
    },
    {
      title: "দ্রুত উত্তর",
      icon: Clock,
      desc: "হোয়াটসঅ্যাপ এবং ফোনে আপনার প্রশ্নের দ্রুত উত্তর পাবেন।",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header band */}
      <section className="grain relative overflow-hidden border-b border-border">
        <div className="container relative py-12 sm:py-16">
          {/* Botanical watermark */}
          <svg
            className="pointer-events-none absolute -right-6 top-1/2 hidden h-[300px] -translate-y-1/2 text-primary/[0.07] lg:block"
            viewBox="0 0 160 300"
            fill="none"
            aria-hidden="true"
          >
            <path d="M80 10v270" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {[70, 110, 150, 190].map((y, i) => (
              <g key={y}>
                <path
                  d={`M80 ${y}c-26-10-42-30-44-54 22 2 38 20 44 54Z`}
                  fill="currentColor"
                />
                <path
                  d={`M80 ${y + 22}c26-10 42-30 44-54-22 2-38 20-44 54Z`}
                  fill="currentColor"
                  opacity={0.85 - i * 0.1}
                />
              </g>
            ))}
          </svg>

          <span className="eyebrow">আমাদের পরিচয়</span>
          <h1 className="mt-3 max-w-[18ch] font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl">
            আমাদের সম্পর্কে
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">
            আজিজ ন্যাচারাল ঔষধালয় (ইস্টার্ন ইউনানী মেডিকেল চেম্বার) বাংলাদেশের একটি
            ইউনানী ও হার্বাল পণ্যের দোকান। আমরা দীর্ঘদিন ফেসবুক পেইজের মাধ্যমে পণ্য
            বিক্রয় করছি। এখন নিজস্ব ওয়েবসাইটের মাধ্যমে সারা বাংলাদেশে ক্যাশ অন
            ডেলিভারিতে অর্ডার করা যাবে।
          </p>
        </div>
      </section>

      {/* Story + stats */}
      <section className="border-b border-border bg-surface">
        <div className="container grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start sm:py-16">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text">
              আমাদের পণ্য ও সেবা
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              আমরা প্রাকৃতিক উপাদানে তৈরি মধু, তেল, চূর্ণ, হার্বাল টনিক ও কম্বো
              প্যাকের মতো ইউনানী ও হার্বাল পণ্য বিক্রয় করি। বর্তমানে সাইটে কিছু
              ডেমো পণ্য দেখানো হয়েছে, যা মালিক খুব শীঘ্রই সঠিক তথ্য দিয়ে আপডেট
              করবেন।
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              আমাদের লক্ষ্য সহজ — সঠিক তথ্য, সৎ বর্ণনা এবং নির্ভরযোগ্য ডেলিভারির
              মাধ্যমে গ্রাহকের বিশ্বাস অর্জন করা।
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                পণ্য দেখুন
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Send className="h-4 w-4 text-[#1FA855]" aria-hidden="true" />
                হোয়াটসঅ্যাপে মেসেজ
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "৮+", v: "হার্বাল পণ্য" },
              { k: "৬৪", v: "জেলায় ডেলিভারি" },
              { k: "ক্যাশ", v: "অন ডেলিভারি" },
              { k: "১০০%", v: "প্রাকৃতিক উপাদান" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border bg-background p-5 shadow-card"
              >
                <p className="font-heading text-2xl font-bold text-primary">{s.k}</p>
                <p className="mt-1 text-xs text-muted">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <span className="eyebrow">প্রতিশ্রুতি</span>
          <h2 className="section-title mt-2">আমাদের প্রতিশ্রুতি</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-[15px] font-semibold text-text">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-y border-border bg-surface-alt/60 py-12 sm:py-16">
        <div className="container">
          <span className="eyebrow">যোগাযোগ</span>
          <h2 className="section-title mt-2">আমাদের ঠিকানা ও যোগাযোগ</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-text">দোকানের ঠিকানা</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{SITE_CONFIG.addressBn}</p>
              <p className="mt-3 text-xs text-muted">{SITE_CONFIG.serviceAreaNoteBn}</p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                ম্যাপে দেখুন
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-text">খোলার সময়</p>
              <p className="mt-1 text-sm text-muted">{SITE_CONFIG.openingHoursBn}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                ফোন
              </p>
              {SITE_CONFIG.phoneNumbers.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="mt-1 block text-lg font-semibold text-primary hover:text-primary-hover"
                >
                  {phone}
                </a>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-semibold text-text">সরাসরি যোগাযোগ</p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center gap-2.5 rounded-xl border border-border bg-background px-4 text-sm font-medium text-text transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
                >
                  <Send className="h-4 w-4 text-[#1FA855]" aria-hidden="true" />
                  হোয়াটসঅ্যাপে মেসেজ
                </a>
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center gap-2.5 rounded-xl border border-border bg-background px-4 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-primary-soft"
                >
                  <Facebook className="h-4 w-4 text-primary" aria-hidden="true" />
                  ফেসবুক পেইজ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <span className="eyebrow">অর্ডার প্রক্রিয়া</span>
          <h2 className="section-title mt-2">কীভাবে অর্ডার করবেন</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "পণ্যসমূহ পাতায় গিয়ে পছন্দের পণ্য বেছে নিন।",
              "নাম, মোবাইল নম্বর ও পূর্ণ ঠিকানা দিয়ে চেকআউট করুন।",
              "হোয়াটসঅ্যাপে অর্ডার পাঠিয়ে দিন; পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন।",
            ].map((step, i) => (
              <li
                key={step}
                className="rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-heading text-lg font-bold text-white">
                  {["১", "২", "৩"][i]}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="container pb-14">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
