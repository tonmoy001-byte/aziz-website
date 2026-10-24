const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBnDigits = (v: string | number): string =>
  String(v).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export const fromBnDigits = (v: string): string =>
  v.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));

export const formatBdt = (n: number): string =>
  "৳" + toBnDigits(n.toLocaleString("en-IN"));

export const formatBnNumber = (n: number): string => toBnDigits(n.toString());

export const formatBnDate = (d: Date): string => {
  const parts = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).split("/");
  return `${toBnDigits(parts[0])}/${toBnDigits(parts[1])}/${toBnDigits(parts[2])}`;
};

export const formatBnTime = (d: Date): string => {
  const time = d.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return toBnDigits(time);
};
