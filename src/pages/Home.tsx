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
import { useUi } from "../context/UiContext";
import type { Product } from "../types";

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
    label: "ফ্রি ডেলিভারি ৳১,৫০০+",
    desc: "সারা দেশে দ্রুত ডেলিভারি",
    icon: Truck,
  },
  {
    label: "১০০% প্রাকৃতিক",
    desc: "ইউনানী ও হার্বাল উপাদান",
    icon: Leaf,
  },
  {
    label: "সহজ অর্ডার",
    desc: "হোয়াটসঅ্যাপে এক ক্লিকে",
    icon: MessageCircle,
  },
];

interface SectionHeadProps {
  title: string;
  center?: boolean;
  linkTo?: string;
  linkLabel?: string;
}

function SectionHead({ title, center = false, linkTo, linkLabel = "সব দেখুন" }: SectionHeadProps) {
  return (
    <div
      className={`mb-8 flex flex-col gap-3 ${
        center
          ? "items-center"
          : "items-start sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={center ? "text-center" : undefined}>
        <h2 className="section-title">{title}</h2>
        <span className="title-bar mt-2.5" aria-hidden="true" />
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          {linkLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}

export function Home() {
  const { addToCart } = useCart();
  const { openCart, openCheckout } = useUi();
  const featured = PRODUCTS.filter((p) => p.isFeatured);
  const honey = PRODUCTS.filter((p) => p.categoryBn === "মধু");
  const oils = PRODUCTS.filter((p) => p.categoryBn === "তেল");
  const powdersDrinks = PRODUCTS.filter(
    (p) => p.categoryBn === "চূর্ণ" || p.categoryBn === "হার্বাল পানীয়",
  );
  const combo = PRODUCTS.find((p) => p.id === "shahi-kasturi-combo")!;

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
      desc: "অর্ডার পাঠান — আমরা কনফার্ম করব। পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।",
    },
  ];

  const handleAdd = (product: Product) => {
    addToCart(product);
    openCart();
  };

  const handleOrderNow = (product: Product) => {
    addToCart(product);
    openCheckout();
  };

  return (
    <div className="flex flex-col">
      {/* ————— Hero: simple product-focused split ————— */}
      <section className="border-b border-border bg-surface">
        <div className="container grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <div className="rise-in">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              ইউনানী ও হার্বাল · নোয়াখালী
            </span>
            <h1 className="mt-4 font-heading text-[32px] font-bold leading-[1.25] text-primary sm:text-[44px]">
              প্রকৃতির ছোঁয়ায়
              <br />
              সুস্থ জীবন
            </h1>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted sm:text-base">
              খাঁটি মধু, তেল, চূর্ণ ও হার্বাল পণ্য — ক্যাশ অন ডেলিভারিতে সারা
              বাংলাদেশে অর্ডার করুন।
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                হোয়াটসঅ্যাপে অর্ডার
              </a>
            </div>

            <dl className="mt-9 flex max-w-md gap-8 border-t border-border pt-6">
              {[
                { k: "৮+", v: "পণ্য" },
                { k: "৬৪", v: "জেলায় ডেলিভারি" },
                { k: "১০০%", v: "প্রাকৃতিক" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-heading text-xl font-bold text-primary">{s.k}</dt>
                  <dd className="text-xs text-muted">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Large product visual */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div
              className="absolute -left-6 top-12 h-24 w-24 rounded-full bg-accent/15 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -right-4 bottom-6 h-28 w-28 rounded-full bg-primary/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-display border border-border bg-primary-soft shadow-card">
              <img
                src="/products/honey-jar.svg"
                alt="প্রাকৃতিক মধুর প্রতীকী ছবি"
                className="aspect-square w-full object-cover"
                width={600}
                height={600}
              />
              <div className="absolute left-4 top-4 rounded-xl border border-border bg-surface/95 px-3.5 py-2 shadow-card backdrop-blur">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                  <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                  খাঁটি ও নিরাপদ
                </p>
              </div>
              <div className="absolute bottom-4 right-4 rounded-xl border border-border bg-surface/95 px-3.5 py-2 shadow-card backdrop-blur">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                  <Truck className="h-4 w-4 text-accent" aria-hidden="true" />
                  ৳১,৫০০+ অর্ডারে ফ্রি ডেলিভারি
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Refined trust bar ————— */}
      <section className="border-b border-border bg-surface">
        <div className="container grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent-soft text-accent-hover">
                  <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
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

      {/* ————— Best sellers ————— */}
      <section className="py-14 sm:py-16">
        <div className="container">
          <SectionHead
            title="আমাদের জনপ্রিয় পণ্য"
            linkTo="/products"
            linkLabel="সব পণ্য দেখুন"
          />
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

      {/* ————— Category: মধু (pale green band) ————— */}
      <section className="border-y border-border bg-primary-soft/70 py-14 sm:py-16">
        <div className="container">
          <SectionHead title="মধু" linkTo="/products" linkLabel="সব মধু দেখুন" />
          <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-5">
            {honey.map((product) => (
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

      {/* ————— Category: তেল (cream band) ————— */}
      <section className="py-14 sm:py-16">
        <div className="container">
          <SectionHead title="তেল" linkTo="/products" linkLabel="সব তেল দেখুন" />
          <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-5">
            {oils.map((product) => (
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

      {/* ————— Category: চূর্ণ ও পানীয় (pale green band) ————— */}
      <section className="border-y border-border bg-primary-soft/70 py-14 sm:py-16">
        <div className="container">
          <SectionHead
            title="চূর্ণ ও হার্বাল পানীয়"
            linkTo="/products"
            linkLabel="সব দেখুন"
          />
          <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {powdersDrinks.map((product) => (
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

      {/* ————— Promo banners (Naturo-style double banner) ————— */}
      <section className="py-14 sm:py-16">
        <div className="container grid gap-5 md:grid-cols-2">
          {/* Combo pack promo — dark green */}
          <div className="relative overflow-hidden rounded-card border border-primary/10 bg-primary">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-xl" aria-hidden="true" />
            <div className="relative flex items-center gap-5 p-6 sm:p-8">
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                  কম্বো অফার
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-white sm:text-2xl">
                  শাহী কস্তুরী কম্বো প্যাক
                </h3>
                <p className="mt-2 text-sm text-accent-soft/85">
                  ৳১,৮৫০{" "}
                  <span className="text-accent-soft/60 line-through">৳২,১০০</span>
                </p>
                <button
                  onClick={() => handleOrderNow(combo)}
                  className="btn-gold mt-5 min-h-[44px] !rounded-xl px-5 text-[13px]"
                >
                  এখনই অর্ডার করুন
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <img
                src="/products/combo-pack.svg"
                alt="শাহী কস্তুরী কম্বো প্যাক"
                className="h-32 w-32 shrink-0 rounded-2xl sm:h-40 sm:w-40"
                loading="lazy"
              />
            </div>
          </div>

          {/* Sidr honey promo — parchment */}
          <div className="relative overflow-hidden rounded-card border border-border bg-accent-soft">
            <div className="relative flex items-center gap-5 p-6 sm:p-8">
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-hover">
                  নতুন সংগ্রহ
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-primary sm:text-2xl">
                  সিদর মধু
                </h3>
                <p className="mt-2 text-sm text-muted">
                  প্রিমিয়াম মানের খাঁটি সিদর মধু — ৳১,৪০০
                </p>
                <Link
                  to="/products"
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  পণ্য দেখুন
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <img
                src="/products/honey-jar.svg"
                alt="সিদর মধু"
                className="h-32 w-32 shrink-0 rounded-2xl sm:h-40 sm:w-40"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ————— How to order: clean 3-step ————— */}
      <section className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="container">
          <SectionHead center title="সহজ ৩ ধাপে অর্ডার" />

          <ol className="mx-auto mt-2 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5">
            {steps.map((step, i) => (
              <li
                key={step.num}
                className="relative h-full rounded-2xl border border-border bg-background p-6 shadow-card"
              >
                {i < steps.length - 1 && (
                  <span
                    className="absolute -right-[22px] top-10 hidden w-4 border-t-2 border-dashed border-accent/50 sm:block"
                    aria-hidden="true"
                  />
                )}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-white">
                  {step.num}
                </span>
                <h3 className="mt-4 font-heading text-[15px] font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ————— Contact ————— */}
      <section className="py-14 sm:py-16">
        <div className="container">
          <SectionHead center title="প্রশ্ন আছে? আমরা পাশে আছি" />
          <p className="mx-auto -mt-4 max-w-[52ch] text-center text-sm leading-relaxed text-muted">
            পণ্য, ডেলিভারি বা অর্ডার সংক্রান্ত যেকোনো প্রশ্নে সরাসরি কথা বলুন —
            {SITE_CONFIG.openingHoursBn}।
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={`tel:${SITE_CONFIG.phoneNumbers[0]}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-6 text-center shadow-card transition-colors hover:border-primary/40 hover:bg-primary-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-text">ফোন করুন</span>
              <span className="text-xs text-muted">{SITE_CONFIG.phoneNumbers[0]}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-6 text-center shadow-card transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 text-[#1FA855]">
                <Send className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-text">হোয়াটসঅ্যাপ</span>
              <span className="text-xs text-muted">সরাসরি অর্ডার করুন</span>
            </a>
            <a
              href={SITE_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-6 text-center shadow-card transition-colors hover:border-primary/40 hover:bg-primary-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-text">ফেসবুক পেইজ</span>
              <span className="text-xs text-muted">আমাদের ফলো করুন</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container pb-14">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
