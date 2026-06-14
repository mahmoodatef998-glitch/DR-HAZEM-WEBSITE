export type ProductOrigin = "ES" | "IT" | "EG";

export const ORIGIN_OPTIONS: { value: ProductOrigin; label: string; labelEn: string }[] = [
  { value: "ES", label: "🇪🇸 إسبانيا", labelEn: "Spain" },
  { value: "IT", label: "🇮🇹 إيطاليا", labelEn: "Italy" },
  { value: "EG", label: "🇪🇬 مصر", labelEn: "Egypt" },
];

export const ORIGIN_LABEL: Record<ProductOrigin, string> = {
  ES: "🇪🇸 Spain",
  IT: "🇮🇹 Italy",
  EG: "🇪🇬 Egypt",
};

export function getOriginLabel(origin: string, rtl = true): string {
  const match = ORIGIN_OPTIONS.find(o => o.value === origin);
  if (!match) return origin;
  return rtl ? match.label : `${match.label.split(" ")[0]} ${match.labelEn}`;
}

export function getOriginFlag(origin: string): string {
  return ORIGIN_OPTIONS.find(o => o.value === origin)?.label.split(" ")[0] ?? "🌍";
}
