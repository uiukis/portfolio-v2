"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { LogoW } from "@/components/brand/logo-w";
import { AnimatedText } from "@/components/ui/animated-text";

export function HeaderBrand() {
  const { t } = useI18n();

  return (
    <Link
      href="/"
      className="focus-ring group flex shrink-0 items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
    >
      <motion.div whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
        <LogoW size={18} className="text-accent" />
      </motion.div>

      <span className="hidden items-baseline gap-1.5 font-mono text-[10px] tracking-[0.14em] sm:flex">
        <AnimatedText text={t.hero.bootTag} className="text-accent" />
        <span className="text-muted-foreground/50">//</span>
        <AnimatedText
          text={t.hero.bootSuffix}
          className="text-muted-foreground transition-colors group-hover:text-foreground"
        />
      </span>

      <span className="font-mono text-[10px] tracking-[0.14em] text-accent sm:hidden">
        {t.hero.bootTag}
      </span>
    </Link>
  );
}
