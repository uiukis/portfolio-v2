"use client";

import { Brain, Network, Layers, Plug } from "lucide-react";
import { capabilityIcons } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { GlowCard } from "@/components/ui/glow-card";
import { MotionScene } from "@/components/ui/motion-scene";

const iconMap = {
  brain: Brain,
  layers: Layers,
  network: Network,
  plug: Plug,
} as const;

export function CapabilitiesSection() {
  const { t } = useI18n();

  return (
    <Section
      id="capabilities"
      index="02"
      label={t.capabilities.label}
      title={t.capabilities.title}
      description={t.capabilities.description}
    >
      <div
        className="grid gap-6 md:grid-cols-2"
      >
        {t.capabilities.items.map((cap, i) => {
          const iconKey = capabilityIcons[i] ?? "brain";
          const Icon = iconMap[iconKey];
          return (
            <MotionScene key={i} className="h-full">
              <GlowCard className="group h-full">
                <article className="p-8">
                  <div className="mb-5 flex items-center gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-accent transition-colors group-hover:bg-white/[0.1]"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{cap.title}</h3>
                  </div>
                  <p className="leading-relaxed text-muted">{cap.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" role="list">
                    {cap.metrics.map((metric, j) => (
                      <li key={j}
                        className="rounded-full border border-border bg-surface-elevated px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {metric}
                      </li>
                    ))}
                  </ul>
                </article>
              </GlowCard>
            </MotionScene>
          );
        })}
      </div>
    </Section>
  );
}
