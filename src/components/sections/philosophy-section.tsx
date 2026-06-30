"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { BelfryLogo } from "@/components/brand/belfry-logo";
import { AnimatedText } from "@/components/ui/animated-text";
import { scaleIn, defaultViewport } from "@/lib/motion";

export function PhilosophySection() {
  const { t } = useI18n();

  return (
    <Section id="philosophy" index="06" headingId="philosophy-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={scaleIn}
        className="mx-auto max-w-4xl text-center"
      >
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-10 h-8 w-[4.5rem] text-accent md:mb-12 md:h-9 md:w-20"
          aria-hidden="true"
        >
          <BelfryLogo animated />
        </motion.div>

        <h2 id="philosophy-heading" className="sr-only">
          {t.philosophy.title}
        </h2>

        <blockquote>
          <p className="text-2xl font-medium leading-relaxed tracking-tight text-foreground md:text-3xl lg:text-4xl">
            &ldquo;
            <AnimatedText text={t.philosophy.quote} effect="typewriter" />{" "}
            <span className="gradient-text">
              <AnimatedText text={t.philosophy.highlight} effect="typewriter" />
            </span>
            &rdquo;
          </p>
          <footer className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <AnimatedText text={t.philosophy.footer} effect="typewriter" />
          </footer>
        </blockquote>
      </motion.div>
    </Section>
  );
}
