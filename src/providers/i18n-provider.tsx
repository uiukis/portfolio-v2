"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
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

  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("pt")) return "pt";
  return "en";
}

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const initialLocale = useSyncExternalStore(
    subscribeToStorage,
    resolveInitialLocale,
    () => defaultLocale,
  );
  const [selection, setSelection] = useState<{ locale: Locale; tick: number }>();
  const locale = selection?.locale ?? initialLocale;
  const localeTick = selection?.tick ?? 0;

  const setLocale = useCallback((next: Locale) => {
    if (next === locale) return;
    setSelection((current) => ({ locale: next, tick: (current?.tick ?? 0) + 1 }));
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // The current page can still switch languages without persistence.
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

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
