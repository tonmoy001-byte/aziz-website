import { MapPin, Send, ShieldCheck, Truck, Currency, Clock } from "lucide-react";
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
      desc: "অর্ডার কনফার্মের পর আমাদের টিম ঠিকানা যাচাই করে পণ্য পাঠিয়ে দেয়।",
    },
    {
      title: "ক্যাশ অন ডেলিভারি",
      icon: Currency,
      desc: "পণ্য হাতে পেয়ে টাকা পরিশোধ করুন। অগ্রিম কোনো পেমেন্টের প্রয়োজন নেই।",
    },
    {
      title: "ক্রেতার প্রশ্নের দ্রুত উত্তর",
      icon: Clock,
      desc: "হোয়াটসঅ্যাপ এবং ফোনে আপনার প্রশ্নের দ্রুত উত্তর পাবেন।",
    },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="py-10 px-4 border-b border-border">
        <div className="container mx-auto">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-3">আমাদের সম্পর্কে</h1>
          <p className="text-sm text-muted">
            আজিজ ন্যাচারাল ঔষধালয় (ইস্টার্ন ইউনানী মেডিকেল চেম্বার) বাংলাদেশের একটি ইউনানী ও হার্বাল পণ্যের দোকান। আমরা দীর্ঘদিন ফেসবুক পেইজের মাধ্যমে পণ্য বিক্রয় করছি। এখন আমাদের নিজস্ব ওয়েবসাইটের মাধ্যমে সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে অর্ডার করা যাবে।
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto">
          <h2 className="font-heading text-lg font-bold text-text mb-6">আমাদের পণ্য ও সেবা</h2>
          <p className="text-sm text-muted mb-6">
            আমরা প্রাকৃতিক উপাদানে তৈরি মধু, তেল, চূর্ণ, হার্বাল টনিক ও কম্বো প্যাকের মতো ইউনানী ও হার্বাল পণ্য বিক্রয় করি। বর্তমানে সাইটে কিছু ডেমো পণ্য দেখানো হয়েছে, যা মালিক খুব শীঘ্রই সঠিক তথ্য দিয়ে আপডেট করবেন।
          </p>
          <h3 className="font-heading text-base font-semibold text-text mb-4">কীভাবে অর্ডার করবেন</h3>
          <ol className="list-disc list-inside space-y-2 text-sm text-muted mb-6">
            <li>পণ্যসমূহ পাতায় গিয়ে পছন্দের পণ্য বেছে নিন।</li>
            <li>নাম, মোবাইল নম্বর ও পূর্ণ ঠিকানা দিয়ে চেকআউট করুন।</li>
            <li>হোয়াটসঅ্যাপে অর্ডার পাঠিয়ে দিন; পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন।</li>
          </ol>
        </div>
      </section>

      <section className="py-10 px-4 border-b border-border bg-[#F3F2EA]">
        <div className="container mx-auto">
          <h2 className="font-heading text-lg font-bold text-text mb-6">যোগাযোগ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl border border-border bg-surface">
              <MapPin className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-text">দোকানের ঠিকানা</p>
              <p className="text-xs text-muted leading-relaxed">{SITE_CONFIG.addressBn}</p>
              <p className="text-xs text-muted mt-2">{SITE_CONFIG.serviceAreaNoteBn}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface">
              <Send className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-text">ফোন নম্বর</p>
              {SITE_CONFIG.phoneNumbers.map((phone, i) => (
                <p key={i} className="text-xs text-muted">
                  <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                    {phone}
                  </a>
                </p>
              ))}
              <p className="text-xs text-muted mt-2">{SITE_CONFIG.openingHoursBn}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface flex flex-col items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#25D366]"
              >
                <Send className="w-4 h-4" aria-hidden="true" /> হোয়াটসঅ্যাপে মেসেজ
              </a>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Send className="w-4 h-4" aria-hidden="true" /> ফেসবুক পেইজ
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" /> ম্যাপে দেখুন
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto">
          <h2 className="font-heading text-lg font-bold text-text mb-6">আমাদের প্রতিশ্রুতি</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commitments.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="p-4 rounded-xl border border-border bg-surface flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-surface flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-text">{c.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="border border-[#F5E9D8] bg-[#FDF8F0] rounded-xl p-4 text-sm text-[#7C2D12]">
            <p className="font-semibold">গুরুত্বপূর্ণ নোটিস:</p>
            <p className="mt-1">এটা কোনো রোগ নিরাময়ের দাবি করে না। হৃদরোগ, ডায়াবেটিস, গর্ভাবস্থা বা অন্য কোনো শারীরিক সমস্যা থাকলে ব্যবহার করার আগে নিবন্ধিত চিকিৎসকের পরামর্শ নিন।</p>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
