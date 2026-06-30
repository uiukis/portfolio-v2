"use client";

import { motion } from "framer-motion";
import { Code2, Brain } from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { GlowCard } from "@/components/ui/glow-card";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";

export function PositioningSection() {
  const { t } = useI18n();

  const cards = [
    {
      icon: Code2,
      title: t.positioning.fullstackTitle,
      desc: t.positioning.fullstackDesc,
      accent: "text-accent",
      bg: "bg-accent/10 group-hover:bg-accent/20",
    },
    {
      icon: Brain,
      title: t.positioning.aiTitle,
      desc: t.positioning.aiDesc,
      accent: "text-accent-secondary",
      bg: "bg-accent-secondary/10 group-hover:bg-accent-secondary/20",
    },
  ] as const;

  return (
    <Section id="positioning" index="01" className="border-t border-border/60">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-2"
      >
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <GlowCard className="group h-full">
                <article className="p-8">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.accent} transition-colors`}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </motion.div>
                  <h2 className="text-xl font-semibold text-foreground">{card.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{card.desc}</p>
                </article>
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
