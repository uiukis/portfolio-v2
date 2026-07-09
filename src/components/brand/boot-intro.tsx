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
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,212,170,0.8)]" />
          {t.hero.availability}
        </motion.span>
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
