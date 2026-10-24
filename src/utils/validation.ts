import { fromBnDigits } from "./bn";

export const normalizePhone = (raw: string): string | null => {
  const s = fromBnDigits(raw).replace(/[\s-]/g, "");
  if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(s)) return null;
  return s.replace(/^(\+?88)/, ""); // -> 01XXXXXXXXX
};
