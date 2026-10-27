import { Link } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";

export function NotFound() {
  return (
    <section className="container flex flex-col items-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Leaf className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-heading text-2xl font-bold text-text sm:text-3xl">
        পাতাটি পাওয়া যায়নি
      </h1>
      <p className="mt-3 max-w-[36ch] text-sm text-muted">
        আপনি যে ঠিকানায় যেতে চেয়েছেন সেটি নেই বা বদলে গেছে। নিচের বাটন থেকে
        পণ্যসমূহ দেখতে পারেন।
      </p>
      <Link to="/products" className="btn-primary mt-8">
        পণ্যসমূহ দেখুন
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
