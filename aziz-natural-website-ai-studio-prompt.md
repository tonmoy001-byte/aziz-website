# Google AI Studio Build Prompt — আজিজ ন্যাচারাল ঔষধালয় (Bangla COD Website)

> **How to use:** Open Google AI Studio → **Build** mode → paste everything below the line `=== PROMPT START ===` up to `=== PROMPT END ===` as one message. After the first build, use the "Follow-up prompts" at the bottom to fix or refine.
> **Before pasting:** replace the placeholder values in Section 3 (`SITE_CONFIG`) — especially the WhatsApp number.

---

=== PROMPT START ===

# ROLE
You are a senior front-end engineer. Build a complete, production-quality, mobile-first e-commerce website for a Bangladeshi Unani / natural-medicine shop. Everything must actually work (no dead buttons, no placeholder "coming soon" logic, no console errors). Ask me nothing — make sensible decisions and follow this spec exactly.

# 1. PROJECT SUMMARY
- **Business:** আজিজ ন্যাচারাল ঔষধালয় (Aziz Natural Medicine), also operating as "ইস্টার্ন ইউনানী মেডিকেল চেম্বার" (Eastern Unani Medical Chamber). Bangladesh-based Unani / natural-product seller, currently selling through a Facebook page.
- **Goal:** A clean, professional website where visitors browse products and place **Cash on Delivery (COD)** orders. Every order is sent to the shop owner's **WhatsApp** so he can see and count the orders coming from the website.
- **Language:** The ENTIRE UI is in **Bangla (বাংলা)**. No English text visible to users except the brand name where appropriate and technical units (e.g., "ml", "gm").
- **No domain yet:** The site must work from any hosted URL and in AI Studio preview. Do not hardcode any domain.
- **Pages (exactly 3):** Home (হোম), Products (পণ্যসমূহ), About (আমাদের সম্পর্কে). Cart and checkout are overlays (drawer + modal), NOT separate pages.
- **Products:** Use realistic DEMO products (listed in Section 4). All prices/details are demo and editable from one data file.

# 2. TECH STACK & ARCHITECTURE
- React 18 + TypeScript + Vite + Tailwind CSS (use whatever AI Studio's Build template provides; stay within it).
- Routing: `react-router-dom` with **HashRouter** (so deep links work without server config). Routes: `/` (home), `/products` (product page), `/about`.
- State: React Context + `useReducer` for the cart. Persist cart in `localStorage` under key `aziz_cart_v1` (wrap in try/catch; app must still work if storage is blocked).
- No backend, no database, no API keys, no paid services. Orders go out via the WhatsApp click-to-chat URL (`https://wa.me/<number>?text=<encoded message>`).
- Icons: `lucide-react`.
- Fonts: Google Fonts **"Hind Siliguri"** (body) and **"Noto Serif Bengali"** (headings). Set `font-display: swap`. Fallback: `system-ui, sans-serif`.
- Suggested structure:

```
src/
  config/siteConfig.ts        // all editable business info (Section 3)
  data/products.ts            // demo products (Section 4)
  types.ts
  context/CartContext.tsx
  utils/
    bn.ts                     // Bangla digit + currency formatting
    whatsapp.ts               // message builder + URL builder
    validation.ts             // phone + form validation
  components/
    Header.tsx  Footer.tsx  CartDrawer.tsx  CheckoutModal.tsx
    OrderSuccessModal.tsx  ProductCard.tsx  ProductDetailModal.tsx
    QuantityStepper.tsx  FloatingWhatsApp.tsx  DisclaimerBanner.tsx
  pages/Home.tsx  Products.tsx  About.tsx
  App.tsx  main.tsx  index.css
```

# 3. SINGLE SOURCE OF TRUTH — `src/config/siteConfig.ts`
Create this file exactly in this shape. EVERY piece of business info on the site must be read from here (header, footer, about page, WhatsApp number, delivery charge). I will edit only this file later.

```ts
export const SITE_CONFIG = {
  brandNameBn: "আজিজ ন্যাচারাল ঔষধালয়",
  brandSubNameBn: "ইস্টার্ন ইউনানী মেডিকেল চেম্বার",
  taglineBn: "প্রাকৃতিক উপাদানে তৈরি ইউনানী ও হার্বাল পণ্য",

  // WhatsApp number in INTERNATIONAL format, digits only, NO plus, NO spaces.
  // Bangladesh example: 8801XXXXXXXXX  (88 + 01XXXXXXXXX)
  whatsappNumber: "8801XXXXXXXXX",

  // Shown to visitors (display format). Replace with real numbers.
  phoneNumbers: ["+8801XXXXXXXXX", "+8801XXXXXXXXX"],

  // Confirm the real address with the owner; the Facebook page shows both.
  addressBn: "সমবায় মার্কেট (২য় তলা), দোকান নং ২১৬, চৌমুহনী, বেগমগঞ্জ, নোয়াখালী",
  serviceAreaNoteBn: "সেনবাগ ও আশেপাশের এলাকায় সেবা প্রদান করা হয়",

  facebookUrl: "https://www.facebook.com/Afzun",
  websiteLabel: "aziznatural.com", // display only, do not link
  openingHoursBn: "শনি – বৃহস্পতিবার: সকাল ১০টা – রাত ৯টা", // demo, editable

  currencySymbol: "৳",
  deliveryChargeBn: 60,        // demo flat delivery charge in BDT; set 0 for free delivery
  freeDeliveryAbove: 1500,     // demo; set 0 to disable
  orderIdPrefix: "AN",         // order IDs look like AN-241024-4821
} as const;
```

# 4. DEMO PRODUCTS — `src/data/products.ts`
Create typed demo data (8 products). Type:

```ts
export type Product = {
  id: string;
  nameBn: string;
  categoryBn: string;          // e.g., "মধু", "তেল", "চূর্ণ", "কম্বো প্যাক", "হার্বাল পানীয়"
  price: number;               // BDT
  oldPrice?: number;           // optional strike-through price
  sizeBn: string;              // e.g., "৫০০ গ্রাম"
  shortDescBn: string;         // 1 line for cards
  descriptionBn: string;       // 2–3 sentences for detail modal
  ingredientsBn: string;       // demo text, owner will replace
  usageBn: string;             // general usage text
  cautionBn: string;           // e.g., "গর্ভবতী, শিশু বা নিয়মিত ওষুধ সেবনকারীরা ব্যবহারের আগে চিকিৎসকের পরামর্শ নিন।"
  image: string;               // https://picsum.photos/seed/<id>/600/600
  inStock: boolean;
  isFeatured: boolean;
  isDemo: true;                // always true for now
};
```

Products (all DEMO — every card/detail shows a small "ডেমো পণ্য" badge so the owner knows to replace them):

| id | Bangla name | Category | Price (৳) | Size |
|---|---|---|---|---|
| shahi-kasturi-combo | শাহী কস্তুরী কম্বো প্যাক | কম্বো প্যাক | 1850 | কম্বো (২ আইটেম) |
| unani-herbal-tonic | ইউনানী হার্বাল টনিক | হার্বাল পানীয় | 650 | ২৫০ মি.লি. |
| sundarban-honey | সুন্দরবনের খাঁটি মধু | মধু | 900 | ৫০০ গ্রাম |
| sidr-honey | সিদর মধু | মধু | 1400 | ৫০০ গ্রাম |
| kalojira-oil | কালোজিরা তেল (কোল্ড প্রেসড) | তেল | 480 | ২০০ মি.লি. |
| triphala-churna | ত্রিফলা চূর্ণ | চূর্ণ | 320 | ১০০ গ্রাম |
| herbal-hair-oil | হার্বাল হেয়ার অয়েল | তেল | 420 | ১০০ মি.লি. |
| herbal-tea-mix | ইউনানী হার্বাল চা মিক্স | হার্বাল পানীয় | 350 | ১০০ গ্রাম |

Write natural Bangla copy for every field. **Content rules (important, apply everywhere on the site):**
- **Never** write "১০০% গ্যারান্টি", "কোনো পার্শ্বপ্রতিক্রিয়া নেই", "অপারেশন ছাড়া নিশ্চিত সমাধান", "সব রোগের চিকিৎসা", "রোগ নিরাময় হবেই" or any guaranteed-cure / disease-cure claim.
- Describe products by ingredients, traditional use, and general wellness only (e.g., "ঐতিহ্যগতভাবে ব্যবহৃত", "সুস্থ জীবনযাপনে সহায়ক").
- Every product detail shows the `cautionBn` text and the line: "এটি কোনো রোগ নিরাময়ের দাবি করে না। হৃদরোগ, ডায়াবেটিস, গর্ভাবস্থা বা অন্য কোনো শারীরিক সমস্যা থাকলে ব্যবহারের আগে নিবন্ধিত চিকিৎসকের পরামর্শ নিন।"
- Do NOT include sexual-health claims or copy anywhere on the site. The combo pack is described only as a "পুরুষদের জন্য ঐতিহ্যবাহী ইউনানী কম্বো" with ingredients/usage/caution fields, no performance promises.

# 5. DESIGN SYSTEM (clean & professional)
- Style: calm, trustworthy, natural. Generous whitespace, soft shadows, rounded corners (`rounded-2xl`), no clutter, no neon, no popup spam.
- Palette (define as CSS variables / Tailwind theme):
  - Primary deep green `#1F5D3A`, primary hover `#174A2E`
  - Accent warm gold `#C8963E`
  - Background `#FAF8F3`, surface `#FFFFFF`
  - Text `#1E293B`, muted text `#64748B`, border `#E7E2D6`
  - Success `#16A34A`, error `#DC2626`
- Mobile-first. Must look perfect at 360px width and scale to desktop (max container 1200px). Touch targets ≥ 44px.
- Sticky header with: logo/brand text (left), nav links (হোম, পণ্যসমূহ, আমাদের সম্পর্কে), cart icon with live item-count badge (right). On mobile: hamburger menu that opens a simple slide-down menu and closes on route change.
- Floating WhatsApp button (bottom-right) that opens a plain chat to the shop number with pre-filled text "আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইট থেকে কিছু জানতে চাই।". It must not overlap the cart bar on mobile.
- Subtle motion only (150–250ms transitions, respect `prefers-reduced-motion`).
- Accessibility: semantic HTML, `alt` text in Bangla for all images, visible focus rings, ARIA labels on icon buttons, modal focus trap + `Esc` to close, `lang="bn"` on `<html>`.
- Images: use `https://picsum.photos/seed/<product-id>/600/600`. Add `loading="lazy"` and an `onError` fallback to a neutral green placeholder with a leaf icon so layout never breaks.

# 6. PAGES

## 6.1 Home (`/`)
1. **Hero:** Bangla headline (e.g., "প্রকৃতির ছোঁয়ায় সুস্থ জীবন"), one supporting sentence, two buttons: "পণ্য দেখুন" (→ /products) and "হোয়াটসঅ্যাপে জানুন" (opens WhatsApp chat). Soft green/cream gradient background; no stock-photo dependency.
2. **Trust strip (4 icons):** "ক্যাশ অন ডেলিভারি", "সারা বাংলাদেশে ডেলিভারি", "প্রাকৃতিক উপাদান", "হোয়াটসঅ্যাপে সহজ অর্ডার". (Do not claim certifications.)
3. **Featured products:** 4 products where `isFeatured` is true, using `ProductCard`, with "কার্টে যোগ করুন" and "এখনই অর্ডার করুন".
4. **How to order (৩ ধাপ):** ১) পণ্য বাছাই করুন ২) নাম, ফোন ও ঠিকানা দিন ৩) ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করুন — আমরা হোয়াটসঅ্যাপে কনফার্ম করব।
5. **Contact/CTA band:** phone numbers (click-to-call `tel:`), WhatsApp button, Facebook link.
6. `DisclaimerBanner` above the footer.

## 6.2 Products (`/products`)
- Page title + short intro.
- **Search box** (filters by Bangla name; case-insensitive; debounce 200ms).
- **Category filter chips** built dynamically from product data, with "সব" (All) default.
- **Sort dropdown:** ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম.
- Responsive grid: 2 columns on mobile, 3 on tablet, 4 on desktop.
- `ProductCard`: image, "ডেমো পণ্য" badge, name, size, price (+ strike-through old price if any), "বিস্তারিত" (opens `ProductDetailModal`), "কার্টে যোগ করুন", and "এখনই অর্ডার করুন" (adds to cart with qty 1 and opens checkout directly).
- `ProductDetailModal`: large image, description, ingredients, usage, caution + disclaimer, quantity stepper, "কার্টে যোগ করুন" and "এখনই অর্ডার করুন".
- Empty state when search has no results: "কোনো পণ্য পাওয়া যায়নি।" with a reset-filters button.
- Show all Bangla numerals (see Section 8).

## 6.3 About (`/about`)
- Brand story (short, honest, no medical claims), what we offer, how we deliver (COD), contact details block (address, phones, hours from config), Facebook link, and an embedded **link-only** map button "ম্যাপে দেখুন" that opens `https://www.google.com/maps/search/?api=1&query=<encoded addressBn>` in a new tab (no iframe, no API key).
- A "আমাদের প্রতিশ্রুতি" section with 3–4 honest commitments: স্বচ্ছ পণ্য তথ্য, ঠিকানা যাচাই করে ডেলিভারি, ক্যাশ অন ডেলিভারি, ক্রেতার প্রশ্নের দ্রুত উত্তর.
- A visible "গুরুত্বপূর্ণ নোটিশ" box with the medical disclaimer from Section 4.

## 6.4 Footer (all pages)
Brand, short description, quick links, contact (address + phones + hours), Facebook link, payment note "পেমেন্ট: শুধুমাত্র ক্যাশ অন ডেলিভারি", copyright "© <current year> আজিজ ন্যাচারাল ঔষধালয়। সর্বস্বত্ব সংরক্ষিত।" (year in Bangla digits).

# 7. CART & CHECKOUT (COD → WhatsApp)

## 7.1 Cart (`CartDrawer`)
- Slide-in drawer from right (full-width bottom sheet feel on mobile). Opens when the header cart icon is clicked or when an item is added (do not auto-open when using "এখনই অর্ডার করুন" — that opens checkout).
- Each line: image, name, unit price, `QuantityStepper` (min 1, max 20; "−" at 1 removes nothing, a separate trash icon removes), line total.
- Summary: সাবটোটাল, ডেলিভারি চার্জ (from config; show "ফ্রি" when `freeDeliveryAbove` threshold is met; show a hint like "আর ৳৩৫০ কেনাকাটা করলে ডেলিভারি ফ্রি"), **মোট (Total)**.
- Empty state with "পণ্য দেখুন" button.
- Primary button: "অর্ডার করতে এগিয়ে যান" → opens `CheckoutModal`. Disabled when cart is empty.
- Cart persists across reloads via localStorage.

## 7.2 Checkout form (`CheckoutModal`)
Fields (all labels, placeholders, and errors in Bangla):

| Field | Rules |
|---|---|
| আপনার নাম (`name`) | required, 2–60 chars, trimmed |
| মোবাইল নম্বর (`phone`) | required; accept Bangla digits and convert to English digits; accept `01XXXXXXXXX`, `+8801XXXXXXXXX`, `8801XXXXXXXXX`; must match `/^(?:\+?88)?01[3-9]\d{8}$/`; normalise to `01XXXXXXXXX` |
| সম্পূর্ণ ঠিকানা (`address`) | required textarea, min 15 chars, placeholder "গ্রাম/মহল্লা, রোড/বাসা নং, ইউনিয়ন/ওয়ার্ড, থানা/উপজেলা, জেলা" |
| অর্ডারের বিবরণ (read-only summary) | list of **product name × quantity = line total**, delivery charge, grand total |
| অতিরিক্ত নোট (`note`) | optional, max 200 chars |

- Payment method is **fixed: ক্যাশ অন ডেলিভারি** — show it as a non-editable highlighted line with a short note "পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।" Do NOT add any online payment option.
- Inline validation on blur and on submit; errors in red under the field; focus the first invalid field on failed submit.
- Allow editing quantities and removing items inside the summary, or provide a "কার্টে ফিরে যান" link. Block submit if the cart is empty.
- Submit button: "হোয়াটসঅ্যাপে অর্ডার পাঠান" (WhatsApp-green icon). Prevent double submit.
- Small helper text under the button: "বাটনে ক্লিক করলে হোয়াটসঅ্যাপ খুলবে। সেখানে 'Send' চাপলেই আপনার অর্ডার আমাদের কাছে পৌঁছাবে।" (This is important: the customer must press Send inside WhatsApp — be transparent about it.)

## 7.3 WhatsApp message builder — `src/utils/whatsapp.ts`
Generate a unique order ID per submit: `${orderIdPrefix}-${YYMMDD}-${4 random digits}` (e.g., `AN-261024-4821`). Build the message in Bangla with Bangla numerals for prices/quantities, exactly in this layout:

```
🛒 *নতুন অর্ডার (ওয়েবসাইট)*
━━━━━━━━━━━━━━
🆔 অর্ডার নং: AN-261024-4821
📅 তারিখ: ২৪/১০/২০২৬, রাত ৯:৩০

👤 *গ্রাহকের তথ্য*
নাম: <name>
মোবাইল: <phone>
ঠিকানা: <address>

📦 *অর্ডারকৃত পণ্য*
১. শাহী কস্তুরী কম্বো প্যাক × ২ = ৳৩,৭০০
২. সুন্দরবনের খাঁটি মধু × ১ = ৳৯০০

💰 সাবটোটাল: ৳৪,৬০০
🚚 ডেলিভারি চার্জ: ফ্রি
✅ *সর্বমোট: ৳৪,৬০০*

💳 পেমেন্ট: ক্যাশ অন ডেলিভারি
📝 নোট: <note or "নেই">
━━━━━━━━━━━━━━
```

Reference implementation (use and adapt; keep it dependency-free):

```ts
// src/utils/bn.ts
const BN_DIGITS = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
export const toBnDigits = (v: string | number) =>
  String(v).replace(/\d/g, d => BN_DIGITS[Number(d)]);
export const fromBnDigits = (v: string) =>
  v.replace(/[০-৯]/g, d => String(BN_DIGITS.indexOf(d)));
export const formatBdt = (n: number) =>
  "৳" + toBnDigits(n.toLocaleString("en-IN")); // 3700 -> ৳৩,৭০০ ; 150000 -> ৳১,৫০,০০০
```

```ts
// src/utils/whatsapp.ts
import { SITE_CONFIG } from "../config/siteConfig";
import { formatBdt, toBnDigits } from "./bn";

export type OrderLine = { nameBn: string; qty: number; unitPrice: number };
export type OrderInput = {
  name: string; phone: string; address: string; note?: string;
  lines: OrderLine[]; subtotal: number; delivery: number; total: number;
};

export const makeOrderId = (d = new Date()) => {
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rnd = String(Math.floor(1000 + Math.random() * 9000));
  return `${SITE_CONFIG.orderIdPrefix}-${yy}${mm}${dd}-${rnd}`;
};

export const buildOrderMessage = (o: OrderInput, orderId: string, d = new Date()) => {
  const dateStr = toBnDigits(
    d.toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true })
  );
  const items = o.lines
    .map((l, i) => `${toBnDigits(i + 1)}. ${l.nameBn} × ${toBnDigits(l.qty)} = ${formatBdt(l.qty * l.unitPrice)}`)
    .join("\n");
  return [
    "🛒 *নতুন অর্ডার (ওয়েবসাইট)*",
    "━━━━━━━━━━━━━━",
    `🆔 অর্ডার নং: ${orderId}`,
    `📅 তারিখ: ${dateStr}`,
    "",
    "👤 *গ্রাহকের তথ্য*",
    `নাম: ${o.name}`,
    `মোবাইল: ${o.phone}`,
    `ঠিকানা: ${o.address}`,
    "",
    "📦 *অর্ডারকৃত পণ্য*",
    items,
    "",
    `💰 সাবটোটাল: ${formatBdt(o.subtotal)}`,
    `🚚 ডেলিভারি চার্জ: ${o.delivery === 0 ? "ফ্রি" : formatBdt(o.delivery)}`,
    `✅ *সর্বমোট: ${formatBdt(o.total)}*`,
    "",
    "💳 পেমেন্ট: ক্যাশ অন ডেলিভারি",
    `📝 নোট: ${o.note?.trim() || "নেই"}`,
    "━━━━━━━━━━━━━━",
  ].join("\n");
};

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
```

```ts
// src/utils/validation.ts
import { fromBnDigits } from "./bn";
export const normalizePhone = (raw: string) => {
  const s = fromBnDigits(raw).replace(/[\s-]/g, "");
  if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(s)) return null;
  return s.replace(/^(\+?88)/, ""); // -> 01XXXXXXXXX
};
```

## 7.4 Submit behaviour (critical — must work in AI Studio preview AND on a real host)
1. Validate → build `OrderInput` from the cart → generate `orderId` → build message → build URL.
2. Open WhatsApp using `window.open(url, "_blank", "noopener,noreferrer")`. **If the popup is blocked** (returns `null`), fall back to `window.location.href = url`. Do not use `target="_self"` as the primary path.
3. Immediately show `OrderSuccessModal`: "আপনার অর্ডার তৈরি হয়েছে! অর্ডার নং: <orderId>. হোয়াটসঅ্যাপে 'Send' চাপুন, তাহলেই আমরা অর্ডার পাব। আমরা শীঘ্রই ফোন/হোয়াটসঅ্যাপে কনফার্ম করব।" Include a **"আবার হোয়াটসঅ্যাপ খুলুন"** button (re-opens the same URL, for users whose WhatsApp didn't open) and a **"মেসেজ কপি করুন"** button (copies the message text via `navigator.clipboard`, with a `document.execCommand("copy")` fallback) so nothing is ever lost.
4. Clear the cart and close checkout only AFTER the success modal is shown.
5. Save the last order ID and timestamp to `localStorage` (`aziz_last_order`) purely for display; never block on storage errors.
6. The owner's order count = the number of "নতুন অর্ডার (ওয়েবসাইট)" messages in his WhatsApp chat, each with a unique order number and date. Do NOT build an admin panel, login, or fake analytics.

# 8. BANGLA LOCALISATION RULES
- All numbers shown to users (prices, quantities, counts, dates, phone display, year) in Bangla digits via `toBnDigits`; Indian-style grouping (`১,৫০,০০০`).
- Currency always `৳` before the number.
- Use correct Bangla UI wording: কার্ট, অর্ডার, ডেলিভারি, ক্যাশ অন ডেলিভারি, সর্বমোট, সাবটোটাল.
- Meta: `<title>আজিজ ন্যাচারাল ঔষধালয় | ইউনানী ও হার্বাল পণ্য</title>`, meta description in Bangla, `<html lang="bn">`, Open Graph tags in Bangla, a simple leaf-icon SVG favicon.
- Make sure Bangla conjuncts (যুক্তাক্ষর) render correctly (use the specified web fonts; never letter-space Bangla text; avoid `uppercase`/`tracking-*` utilities on Bangla).

# 9. QUALITY, EDGE CASES & PERFORMANCE
- No horizontal scroll at any width. No layout shift on image load (fixed aspect-ratio boxes).
- Lock body scroll when a modal/drawer is open; restore on close.
- Cart badge, drawer, and checkout summary always agree (single source of truth in context).
- Quantities clamp to 1–20; removing the last item shows the empty state.
- Handle very long names/addresses (wrap, no overflow); preserve line breaks in the address inside the WhatsApp message.
- Never put user input into `dangerouslySetInnerHTML`. Escape nothing manually; React handles it.
- Scroll to top on route change. Page `<title>` updates per page (e.g., "পণ্যসমূহ | আজিজ ন্যাচারাল ঔষধালয়").
- No `console.log` left in production code. No unused imports. TypeScript strict mode passes.
- Lighthouse-minded: lazy-load images, avoid heavy libraries, keep bundle small.

# 10. ACCEPTANCE CHECKLIST (verify each before finishing, and fix anything that fails)
- [ ] Only 3 routes exist: `/`, `/products`, `/about`; all nav links work, including on mobile.
- [ ] Entire UI is Bangla; numerals are Bangla; `<html lang="bn">`.
- [ ] `SITE_CONFIG.whatsappNumber` is the only place the number lives; changing it changes every WhatsApp link.
- [ ] Add to cart → badge updates → drawer totals correct → reload keeps the cart.
- [ ] "এখনই অর্ডার করুন" opens checkout with exactly that product × 1.
- [ ] Form validation blocks empty/invalid name, phone, address; accepts Bangla-digit phone numbers; normalises phone.
- [ ] Submit opens `wa.me` with a correctly encoded Bangla message containing: order ID, name, phone, full address, each product × quantity, totals, payment = COD.
- [ ] Popup-blocked fallback works; success modal shows with "আবার হোয়াটসঅ্যাপ খুলুন" and "মেসেজ কপি করুন".
- [ ] Cart clears only after success modal appears.
- [ ] No online-payment UI anywhere; COD is stated in checkout, footer, home trust strip.
- [ ] No guaranteed-cure / "no side effects" / sexual-performance claims anywhere; disclaimer visible on home, about, product details, footer.
- [ ] Every product is badged "ডেমো পণ্য"; all product data lives in `products.ts`.
- [ ] Looks clean at 360px, 768px, 1280px; no console errors; no broken images.

# 11. DELIVERABLE
Produce the complete working project in AI Studio's Build workspace (all files above, runnable immediately). After building, give me a short Bangla-free English summary: (a) how to change the WhatsApp number and business info, (b) how to add/edit products, (c) how to deploy, and (d) any assumption you made. Do not ask follow-up questions.

=== PROMPT END ===

---

## Follow-up prompts (use only if needed after the first build)

1. **WhatsApp not opening:** "Open the checkout flow. The WhatsApp link isn't opening on mobile/desktop. Make sure the URL is `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, the number has no `+` or spaces, use `window.open` with a same-tab `location.href` fallback, and keep the success modal with the re-open and copy buttons."
2. **Bangla text rendering broken:** "Bangla conjuncts look broken. Load Hind Siliguri and Noto Serif Bengali from Google Fonts, remove any `tracking-*` or `uppercase` classes on Bangla text, and ensure `lang="bn"` on `<html>`."
3. **Mobile polish:** "Audit at 360px width: fix any overflow, make the cart drawer a bottom sheet, ensure the floating WhatsApp button doesn't cover primary buttons."
4. **Replace demo data:** "Replace the 8 demo products with this list: <paste real products: name, price, size, description, ingredients, usage, caution, image URL>. Keep the `isDemo` badge only on items marked demo."

---

## Notes for the developer / owner (not part of the prompt)

- **How orders reach the owner:** The site uses WhatsApp click-to-chat. The customer's WhatsApp opens with the order pre-filled and they must tap **Send**. This is why the prompt includes an order number, a re-open button, and a copy button. A fully automatic push (no customer tap) needs the **WhatsApp Business Cloud API + a small backend** (e.g., Cloud Function) — a Phase 2 upgrade, not possible from a static AI Studio build.
- **Counting orders:** Each message begins with "নতুন অর্ডার (ওয়েবসাইট)" and has a unique order ID, so WhatsApp search for that phrase shows the count. Phase 2 option: also POST each order to a Google Sheet through Apps Script for automatic totals.
- **Facts to confirm with the owner:** the WhatsApp number, phone numbers, which address is correct (Senbag vs Chowmuhani/Begumganj), opening hours, delivery charge, and real product details. The page analysis could not verify the linked domain, so `websiteLabel` is display-only.
- **Why claims are toned down:** the page analysis flagged guarantee, "no side effects", and broad treatment claims as the biggest credibility and consumer-safety risk. The prompt deliberately builds a stricter, evidence-neutral copy standard and a visible disclaimer, which also reduces platform/advertising policy exposure.
- **Before going live:** replace all demo data, add real ingredient/batch/expiry details per product, and get a domain (e.g., `aziznatural.com` if the owner controls it) when ready.
