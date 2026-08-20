"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { GlowCard } from "@/components/ui/glow-card";
import { AnimatedText } from "@/components/ui/animated-text";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";

export function ApproachSection() {
  const { t } = useI18n();

  return (
    <Section
      id="approach"
      index="05"
      label={t.approach.label}
      title={t.approach.title}
      description={t.approach.description}
      className="border-t border-border/60"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {t.approach.items.map((principle, i) => (
          <motion.div key={i} variants={fadeUp} custom={i}>
            <GlowCard className="h-full">
              <article className="p-6">
                <span className="text-[12px] font-medium text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
              </article>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.blockquote
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeUp}
        className="mx-auto mt-16 max-w-3xl border-l-2 border-white/15 pl-6 md:pl-8"
      >
        <p className="text-lg leading-relaxed text-foreground md:text-xl">
          &ldquo;
          <AnimatedText text={t.approach.engineeringQuote} />{" "}
          <span className="text-muted">
            <AnimatedText text={t.approach.engineeringHighlight} />
          </span>
          &rdquo;
        </p>
        <footer className="mt-4 text-xs font-medium text-muted-foreground">
          <AnimatedText text={t.approach.engineeringFooter} />
        </footer>
      </motion.blockquote>
    </Section>
  );
}
