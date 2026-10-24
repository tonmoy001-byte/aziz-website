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
