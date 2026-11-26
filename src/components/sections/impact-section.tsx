"use client";

import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { MotionScene } from "@/components/ui/motion-scene";

export function ImpactSection() {
  const { t } = useI18n();
  return (
    <Section id="impact" label={t.impact.label} title={t.impact.title} description={t.impact.description}>
      <MotionScene className="impact-ledger">
        {t.impact.metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">{metric.value}</p>
            <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">{metric.label}</p>
          </div>
        ))}
      </MotionScene>
    </Section>
  );
}
