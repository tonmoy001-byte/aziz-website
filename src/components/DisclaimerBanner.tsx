import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="flex gap-3 rounded-2xl border border-accent/25 bg-accent-soft/70 p-4">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-[#7C2D12]">
        এটা কোনো রোগ নিরাময়ের দাবি করে না। হৃদরোগ, ডায়াবেটিস, গর্ভাবস্থা বা অন্য
        কোনো শারীরিক সমস্যা থাকলে ব্যবহার করার আগে নিবন্ধিত চিকিৎসকের পরামর্শ নিন।
      </p>
    </div>
  );
}
