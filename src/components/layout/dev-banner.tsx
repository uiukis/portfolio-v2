"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";

export function DevBanner() {
  const { t } = useI18n();

  if (!siteConfig.isInDevelopment) {
    return null;
  }

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative z-[60] border-b border-amber-500/25 bg-amber-500/10 pt-[env(safe-area-inset-top)]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-amber-200/90 sm:gap-3 sm:text-[11px]">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded border border-amber-500/35 bg-amber-500/15 px-2 py-0.5 text-amber-300">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            aria-hidden="true"
          />
          {t.devBanner.label}
        </span>
        <span className="text-center normal-case tracking-normal text-amber-100/80">
          {t.devBanner.message}
        </span>
      </div>
    </motion.div>
  );
}
