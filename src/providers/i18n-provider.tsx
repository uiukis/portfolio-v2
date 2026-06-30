"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  defaultLocale,
  isLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n";

type I18nContextValue = {
  locale: Locale;
  localeTick: number;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && isLocale(stored)) return stored;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("pt")) return "pt";
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [localeTick, setLocaleTick] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isFirstLocale = useRef(true);

  useEffect(() => {
    setLocaleState(resolveInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState((current) => {
      if (current === next) return current;
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
      document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
      return next;
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (isFirstLocale.current) {
      isFirstLocale.current = false;
      return;
    }
    setLocaleTick((tick) => tick + 1);
  }, [locale, mounted]);

  const value = useMemo(
    () => ({
      locale,
      localeTick,
      setLocale,
      t: getDictionary(locale),
    }),
    [locale, localeTick, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
