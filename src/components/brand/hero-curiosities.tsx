"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { BelfryLogo } from "@/components/brand/belfry-logo";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5000;

type HeroCuriositiesProps = {
  className?: string;
  floating?: boolean;
};

export function HeroCuriosities({ className, floating = false }: HeroCuriositiesProps) {
  const { t, locale } = useI18n();
  const items = t.curiosities.items;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [locale]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [items.length, locale]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: floating ? 0.5 : 0.3 }}
      className={cn("relative w-full font-mono text-xs", className)}
      aria-label={t.curiosities.title}
      aria-live="polite"
    >
      <motion.div
        animate={{ y: [0, -4, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-1 -top-9 h-7 w-16 text-accent/80 md:-top-10 md:h-8 md:w-[4.5rem]"
        aria-hidden="true"
      >
        <BelfryLogo animated />
      </motion.div>

      <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        {t.curiosities.title}
      </p>

      <div className="relative min-h-[88px] space-y-2 border-l-2 border-accent/40 pl-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${locale}-${index}`}
            initial={{ opacity: 0, x: -14, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] leading-relaxed text-muted-foreground"
          >
            <span className="text-accent/80">{t.curiosities.prefix}</span> {items[index]}
          </motion.p>
        </AnimatePresence>
        <span className="cursor-blink inline-block text-accent" aria-hidden="true" />
      </div>

      <div className="mt-5 flex items-center gap-3 pl-4">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="focus-ring flex h-6 w-6 items-center justify-center"
            aria-label={`${t.curiosities.prefix} ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
          >
            <span
              className={cn(
                "block h-1.5 w-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "scale-150 bg-accent shadow-[0_0_8px_rgba(0,212,170,0.5)]"
                  : "bg-muted-foreground/40 hover:bg-accent/60",
              )}
            />
          </button>
        ))}
        <span className="ml-auto text-[9px] text-muted-foreground/50">
          {String(index + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
        </span>
      </div>
    </motion.aside>
  );
}
