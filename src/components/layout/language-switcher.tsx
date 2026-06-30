"use client";

import { motion } from "framer-motion";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={cn("flex gap-1 rounded-md border border-border/60 p-0.5", className)}
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
              "focus-ring relative min-h-6 min-w-6 px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors",
              active ? "text-accent" : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded bg-accent/10"
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
