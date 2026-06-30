"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { AnimatedText } from "@/components/ui/animated-text";

export function BootIntro() {
  const { t } = useI18n();

  return (
    <div className="mb-10 md:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatedText
          as="p"
          text={t.hero.intro}
          effect="typewriter"
          className="text-sm uppercase tracking-[0.35em] text-accent"
        />
        <h1
          id="hero-heading"
          className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-8xl"
        >
          {t.hero.name}
        </h1>
      </motion.div>
    </div>
  );
}
