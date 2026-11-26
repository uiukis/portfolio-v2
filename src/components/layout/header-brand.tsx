"use client";

import Link from "next/link";
import { Monogram } from "@/components/brand/monogram";
import { useI18n } from "@/providers/i18n-provider";

export function HeaderBrand() {
  const { t } = useI18n();

  return (
    <Link href="/" aria-label={t.hero.name} className="focus-ring inline-flex items-center gap-3">
      <span data-brand-target className="inline-flex h-9 w-12"><Monogram className="h-9 w-12 text-foreground" /></span>
      <span className="hidden text-sm font-medium text-foreground/80 sm:block">{t.hero.name}</span>
    </Link>
  );
}
