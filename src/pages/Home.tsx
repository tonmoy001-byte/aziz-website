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
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { SITE_CONFIG } from "../config/siteConfig";
import { ProductCard } from "../components/ProductCard";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useCart } from "../context/CartContext";

interface TrustItem {
  label: string;
  icon: React.ElementType;
}

const TRUST_ITEMS: TrustItem[] = [
  { label: "ক্যাশ অন ডেলিভারি", icon: CreditCard },
  { label: "সারা বাংলাদেশে ডেলিভারি", icon: Truck },
  { label: "প্রাকৃতিক উপাদান", icon: Leaf },
  { label: "হোয়াটসঅ্যাপে সহজ অর্ডার", icon: MessageCircle },
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
      desc: "বারুদিচরে পণ্যসমূহ পাতায় গিয়ে পছন্দের পণ্য বেছে নিন এবং কার্টে যোগ করুন।",
    },
    {
      num: "২",
      title: "নাম, ফোন ও ঠিকানা দিন",
      desc: "চেকআউটে আপনার নাম, মোবাইল নম্বর ও সম্পূর্ণ ঠিকানা দিন। পেমেন্ট পদ্ধতি ক্যাশ অন ডেলিভারি।",
    },
    {
      num: "৩",
      title: "অর্ডার নিশ্চিত করুন",
      desc: "হোয়াটসঅ্যাপে অর্ডার পাঠান বাটনে চাপুন। আমরা হোয়াটসঅ্যাপে অর্ডার কনফার্ম করব।",
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
    <div className="flex flex-col min-h-[100dvh]">
      <section className="bg-gradient-to-br from-[#1F5D3A] via-[#174A2E] to-[#1F5D3A] text-surface py-10 sm:py-14 px-4">
        <div className="container mx-auto max-w-[560px] text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold leading-tight mb-4">
            প্রকৃতির ছোঁয়ায় সুস্থ জীবন
          </h1>
          <p className="text-sm sm:text-base text-[#E7E2D6] mb-8">
            ইউনানী ও হার্বাল পণ্য, প্রাকৃতিক উপাদানে তৈরি। ক্যাশ অন ডেলিভারিতে
            সারা বাংলাদেশে অর্ডার করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-surface text-primary font-semibold hover:bg-[#E7E2D6] transition-colors"
            >
              পণ্য দেখুন <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-[#E7E2D6] text-surface font-semibold hover:bg-surface/50 transition-colors"
            >
              <Send className="w-4 h-4" aria-hidden="true" /> হোয়াটসঅ্যাপে জানুন
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 border-b border-border">
        <div className="container mx-auto">
          <h2 className="font-heading text-lg font-bold text-text mb-6">
            কেন আমাদের পণ্য বিশ্বাস করবেন
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <div className="flex items-center justify-center gap-2 mb-1.5">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-medium text-text leading-tight">
                    {item.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-bold text-text">
              প্রদর্শিত পণ্য
            </h2>
            <Link
              to="/products"
              className="text-sm text-primary hover:underline transition-colors"
            >
              সব পণ্য দেখুন <ArrowRight className="w-3 h-3 inline ml-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

      <section className="py-10 px-4 bg-[#F3F2EA]">
        <div className="container mx-auto">
          <h2 className="font-heading text-lg font-bold text-text mb-6">
            অর্ডার করার সহজ ৩ ধাপ
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {steps.map((step) => (
              <li key={step.num} className="flex flex-col items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-primary text-surface flex items-center justify-center font-bold text-sm">
                  {step.num}
                </span>
                <h3 className="font-heading text-sm font-semibold text-text">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-10 px-4 border-b border-border">
        <div className="container mx-auto">
          <h2 className="font-heading text-lg font-bold text-text mb-6">
            যোগাযোগ করুন
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <Phone className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-text">ফোন করুন</p>
              {SITE_CONFIG.phoneNumbers.map((phone, i) => (
                <p key={i} className="text-sm text-muted">
                  <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                    {phone}
                  </a>
                </p>
              ))}
            </div>
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2"
              >
                <Send className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
                <p className="text-sm font-medium text-text">হোয়াটসঅ্যাপে মেসেজ</p>
              </a>
            </div>
            <div>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2"
              >
                <Facebook className="w-5 h-5 text-primary" aria-hidden="true" />
                <p className="text-sm font-medium text-text">ফেসবুক পেইজ</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
