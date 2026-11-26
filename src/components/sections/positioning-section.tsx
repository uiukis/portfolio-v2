"use client";

import { Code2, Brain } from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { GlowCard } from "@/components/ui/glow-card";
import { MotionScene } from "@/components/ui/motion-scene";

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
      accent: "text-accent",
      bg: "bg-white/[0.06] group-hover:bg-white/[0.1]",
    },
  ] as const;

  return (
    <Section id="positioning" index="01" className="border-t border-border/60">
      <div
        className="grid gap-6 md:grid-cols-2"
      >
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <MotionScene key={i} className="h-full">
              <GlowCard className="group h-full">
                <article className="p-8">
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${card.bg} ${card.accent} transition-colors`}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{card.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{card.desc}</p>
                </article>
              </GlowCard>
            </MotionScene>
          );
        })}
      </div>
    </Section>
  );
}
