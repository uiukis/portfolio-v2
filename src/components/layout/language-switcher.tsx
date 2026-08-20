"use client";

import { motion } from "framer-motion";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-white/12 bg-white/[0.04] p-0.5 backdrop-blur-md",
        className,
      )}
      role="group"
      aria-label={t.language.label}
    >
      {locales.map((loc) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => locale !== loc && setLocale(loc as Locale)}
            className={cn(
              "focus-ring relative rounded-full px-2.5 py-1 text-[12px] font-medium uppercase tracking-wide transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80",
            )}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-white/14"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {loc}
              <span className="sr-only"> — {localeLabels[loc as Locale]}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
