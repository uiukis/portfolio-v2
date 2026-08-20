"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { LogoW } from "@/components/brand/logo-w";
import { cn } from "@/lib/utils";

type HeaderBrandProps = {
  scrolled?: boolean;
};

export function HeaderBrand({ scrolled = false }: HeaderBrandProps) {
  const { t } = useI18n();

  return (
    <Link
      href="/"
      className="focus-ring group flex shrink-0 items-center gap-2.5 sm:gap-3"
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <LogoW size={20} className="text-foreground drop-shadow-none" />
      </motion.div>

      <span className="text-[15px] font-medium tracking-tight text-foreground lowercase">
        {t.header.brand}
      </span>

      <span
        className={cn(
          "hidden rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-white/80 sm:inline-flex",
          "backdrop-blur-sm",
        )}
      >
        {t.header.productBadge}
      </span>

      <AnimatePresence>
        {scrolled && (
          <motion.span
            initial={{ opacity: 0, width: 0, marginLeft: -8 }}
            animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
            exit={{ opacity: 0, width: 0, marginLeft: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="hidden overflow-hidden whitespace-nowrap rounded-full border border-sky-400/25 bg-sky-500/15 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-sky-200 md:inline-flex"
          >
            {t.header.statusBadge}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
