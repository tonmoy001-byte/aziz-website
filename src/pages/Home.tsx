import { Link } from "react-router-dom";
import {
  CreditCard,
  Truck,
  Leaf,
  MessageCircle,
  Phone,
  Facebook,
  ArrowRight,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { SITE_CONFIG } from "../config/siteConfig";
import { ProductCard } from "../components/ProductCard";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useCart } from "../context/CartContext";

interface TrustItem {
  label: string;
  desc: string;
  icon: React.ElementType;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    label: "ক্যাশ অন ডেলিভারি",
    desc: "পণ্য হাতে পেয়ে টাকা দিন",
    icon: CreditCard,
  },
  {
    label: "সারা দেশে ডেলিভারি",
    desc: "নোয়াখালী থেকে বাংলাদেশ",
    icon: Truck,
  },
  {
    label: "প্রাকৃতিক উপাদান",
    desc: "ইউনানী ও হার্বাল পণ্য",
    icon: Leaf,
  },
  {
    label: "সহজ অর্ডার",
    desc: "হোয়াটসঅ্যাপে এক ক্লিকে",
    icon: MessageCircle,
  },
];

interface HomeProps {
  onOpenCart: () => void;
  onOpenCheckout: (product?: { id: string }) => void;
}

export function Home({ onOpenCart, onOpenCheckout }: HomeProps) {
  const { addToCart } = useCart();
  const featured = PRODUCTS.filter((p) => p.isFeatured);

  const whatsappText = "আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইট থেকে কিছু জানতে চাই।";
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  const steps = [
    {
      num: "১",
      title: "পণ্য বাছাই করুন",
      desc: "পণ্যসমূহ পাতায় গিয়ে পছন্দের পণ্য বেছে নিন এবং কার্টে যোগ করুন।",
    },
    {
      num: "২",
      title: "নাম, ফোন ও ঠিকানা দিন",
      desc: "চেকআউটে আপনার নাম, মোবাইল নম্বর ও সম্পূর্ণ ঠিকানা দিন।",
    },
    {
      num: "৩",
      title: "হোয়াটসঅ্যাপে নিশ্চিত করুন",
      desc: "অর্ডার পাঠান — আমরা হোয়াটসঅ্যাপে কনফার্ম করব। পেমেন্ট ক্যাশ অন ডেলিভারি।",
    },
  ];

  const handleAdd = (product: (typeof PRODUCTS)[number]) => {
    addToCart(product);
    onOpenCart();
  };

  const handleOrderNow = (product: (typeof PRODUCTS)[number]) => {
    addToCart(product);
    onOpenCheckout(product);
  };

  return (
    <div className="flex flex-col">
      {/* ————— Hero ————— */}
      <section className="grain relative overflow-hidden border-b border-border">
        <div className="container grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="rise-in">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              ইউনানী ও হার্বাল · নোয়াখালী
            </span>
            <h1 className="mt-5 font-heading text-[34px] font-bold leading-[1.2] text-primary sm:text-5xl">
              প্রকৃতির ছোঁয়ায়
              <span className="relative ml-2 inline-block">
                সুস্থ জীবন
                <svg
                  className="absolute -bottom-2 left-0 w-full text-accent/60"
                  viewBox="0 0 200 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7C40 3 90 2 198 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-muted sm:text-base">
              প্রাকৃতিক উপাদানে তৈরি ইউনানী ও হার্বাল পণ্য — মধু, তেল, চূর্ণ ও টনিক।
              সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে অর্ডার করুন।
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn-primary">
                পণ্য দেখুন
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Send className="h-4 w-4 text-[#1FA855]" aria-hidden="true" />
                হোয়াটসঅ্যাপে জানুন
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                { k: "৮+", v: "পণ্য" },
                { k: "৬৪", v: "জেলা" },
                { k: "১০০%", v: "প্রাকৃতিক" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-heading text-xl font-bold text-primary">
                    {s.k}
                  </dt>
                  <dd className="text-xs text-muted">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Decorative product composition */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div
              className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-accent/15 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -right-4 bottom-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface-alt p-4 shadow-card sm:p-5">
              <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
                <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
                  <defs>
                    <pattern
                      id="leafgrid"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M30 8c10 10 10 24 0 34-10-10-10-24 0-34Z"
                        fill="#1B4433"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#leafgrid)" />
                </svg>
              </div>

              <div className="relative overflow-hidden rounded-[22px] border border-border bg-surface">
                <img
                  src="/products/honey-jar.svg"
                  alt="প্রাকৃতিক মধুর প্রতীকী ছবি"
                  className="aspect-square w-full object-cover"
                  width={600}
                  height={600}
                />

                <div className="absolute left-3 top-3 rounded-xl border border-border bg-surface/95 px-3 py-2 shadow-card backdrop-blur">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    খাঁটি ও নিরাপদ
                  </p>
                </div>
                <div className="absolute bottom-3 right-3 rounded-xl border border-border bg-surface/95 px-3 py-2 shadow-card backdrop-blur">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <Truck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    ডেলিভারি ফ্রি ৳১,৫০০+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Trust strip ————— */}
      <section className="border-b border-border bg-surface">
        <div className="container grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-text">{item.label}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ————— Featured products ————— */}
      <section className="py-14 sm:py-16">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">নির্বাচিত পণ্য</span>
              <h2 className="section-title mt-2">আমাদের জনপ্রিয় পণ্য</h2>
            </div>
            <Link
              to="/products"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary-soft"
            >
              সব পণ্য দেখুন
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => handleAdd(product)}
                onOrderNow={() => handleOrderNow(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ————— Promise band ————— */}
      <section className="bg-primary py-14 text-accent-soft sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow text-accent">আমাদের প্রতিশ্রুতি</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
              বিশ্বাসের সাথে প্রাকৃতিক পণ্য
            </h2>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-accent-soft/80">
              আমরা প্রতিটি পণ্যের উপাদান, ব্যবহার পদ্ধতি ও সতর্কতা স্পষ্টভাবে জানাই।
              কোনো রোগ নিরাময়ের অসত্য দাবি করি না — প্রয়োজন হলে নিবন্ধিত চিকিৎসকের
              পরামর্শ নিন।
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              আমাদের সম্পর্কে জানুন
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "স্বচ্ছ উপাদান তালিকা",
                desc: "প্রতিটি পণ্যে উপাদান ও সতর্কতা লেখা আছে।",
                icon: Leaf,
              },
              {
                title: "ঠিকানা যাচাই করে ডেলিভারি",
                desc: "অর্ডার কনফার্মের পর ঠিকানা যাচাই করা হয়।",
                icon: Truck,
              },
              {
                title: "কোনো অগ্রিম পেমেন্ট নয়",
                desc: "পণ্য হাতে পেয়ে ক্যাশ পরিশোধ করুন।",
                icon: CreditCard,
              },
              {
                title: "দ্রুত উত্তর",
                desc: "হোয়াটসঅ্যাপ ও ফোনে দ্রুত সাড়া।",
                icon: MessageCircle,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                >
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <p className="mt-2.5 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-accent-soft/75">{item.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ————— How to order ————— */}
      <section className="border-b border-border bg-surface-alt/60 py-14 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <span className="eyebrow">সহজ ৩ ধাপ</span>
            <h2 className="section-title mt-2">কীভাবে অর্ডার করবেন</h2>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <li key={step.num} className="relative">
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-heading text-lg font-bold text-white">
                    {step.num}
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ————— Contact ————— */}
      <section className="py-14 sm:py-16">
        <div className="container">
          <div className="rounded-[28px] border border-border bg-surface p-6 shadow-card sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="eyebrow">যোগাযোগ</span>
                <h2 className="section-title mt-2">প্রশ্ন আছে? আমরা পাশে আছি</h2>
                <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-muted">
                  পণ্য, ডেলিভারি বা অর্ডার সংক্রান্ত যেকোনো প্রশ্নে সরাসরি ফোন করুন
                  অথবা হোয়াটসঅ্যাপে মেসেজ দিন।
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  {SITE_CONFIG.openingHoursBn}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href={`tel:${SITE_CONFIG.phoneNumbers[0]}`}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-5 text-center transition-colors hover:border-primary/40 hover:bg-primary-soft"
                >
                  <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="text-sm font-semibold text-text">ফোন করুন</span>
                  <span className="text-xs text-muted">{SITE_CONFIG.phoneNumbers[0]}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-5 text-center transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
                >
                  <Send className="h-5 w-5 text-[#1FA855]" aria-hidden="true" />
                  <span className="text-sm font-semibold text-text">হোয়াটসঅ্যাপ</span>
                  <span className="text-xs text-muted">মেসেজ দিন</span>
                </a>
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-5 text-center transition-colors hover:border-primary/40 hover:bg-primary-soft"
                >
                  <Facebook className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="text-sm font-semibold text-text">ফেসবুক পেইজ</span>
                  <span className="text-xs text-muted">আমাদের ফলো করুন</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-14">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
