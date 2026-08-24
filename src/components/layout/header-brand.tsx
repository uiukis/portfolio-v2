"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

export function HeaderBrand() {
  const { t } = useI18n();

  return (
    <Link
      href="/"
      className="focus-ring group flex shrink-0 items-center gap-2.5 sm:gap-3"
    >
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
    </Link>
  );
}
