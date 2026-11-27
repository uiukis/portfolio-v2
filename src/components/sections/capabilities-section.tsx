"use client";

import { Brain, Network, Layers, Plug } from "lucide-react";
import { capabilityIcons } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
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
        className="grid gap-x-14 md:grid-cols-2"
      >
        {t.capabilities.items.map((cap, i) => {
          const iconKey = capabilityIcons[i] ?? "brain";
          const Icon = iconMap[iconKey];
          return (
            <MotionScene key={i} className="h-full">
                <article className="capability group h-full">
                  <div className="mb-5 flex items-center gap-4">
                    <div
                      className="cap-icon flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-accent transition-colors group-hover:bg-white/[0.1]"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{cap.title}</h3>
                  </div>
                  <p className="leading-relaxed text-muted">{cap.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1" role="list">
                    {cap.metrics.map((metric, j) => (
                      <li key={j}
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {metric}
                      </li>
                    ))}
                  </ul>
                </article>
            </MotionScene>
          );
        })}
      </div>
    </Section>
  );
}
