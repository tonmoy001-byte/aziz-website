import { SITE_CONFIG } from "../config/siteConfig";
import { formatBdt, toBnDigits } from "./bn";

export type OrderLine = { nameBn: string; qty: number; unitPrice: number };
export type OrderInput = {
  name: string;
  phone: string;
  address: string;
  note?: string;
  lines: OrderLine[];
  subtotal: number;
  delivery: number;
  total: number;
};

export const makeOrderId = (d: Date = new Date()): string => {
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rnd = String(Math.floor(1000 + Math.random() * 9000));
  return `${SITE_CONFIG.orderIdPrefix}-${yy}${mm}${dd}-${rnd}`;
};

export const buildOrderMessage = (
  o: OrderInput,
  orderId: string,
  d: Date = new Date(),
): string => {
  const dateStr = toBnDigits(
    d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  );
  const items = o.lines
    .map(
      (l, i) =>
        `${toBnDigits(i + 1)}. ${l.nameBn} × ${toBnDigits(l.qty)} = ${formatBdt(
          l.qty * l.unitPrice,
        )}`,
    )
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

export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
