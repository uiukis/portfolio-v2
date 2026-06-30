export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const LOCALE_STORAGE_KEY = "portfolio-locale";
