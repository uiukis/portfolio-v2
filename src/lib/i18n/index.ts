import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { en } from "./dictionaries/en";
import { pt } from "./dictionaries/pt";

export type { Dictionary, Locale };
export type { Locale as PortfolioLocale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { en, pt };
