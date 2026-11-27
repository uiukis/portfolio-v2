"use client";

import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { MotionScene } from "@/components/ui/motion-scene";

function Metric({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return <>{value}</>;
  return (
    <span aria-label={value}>
      <span aria-hidden="true">{match[1]}<span className="count-num" style={{ "--to": match[2] } as React.CSSProperties} />{match[3]}</span>
    </span>
  );
}

export function ImpactSection() {
  const { t } = useI18n();
  return (
    <Section id="impact" label={t.impact.label} title={t.impact.title} description={t.impact.description}>
      <MotionScene stagger className="impact-ledger">
        {t.impact.metrics.map((metric) => (
          <div data-scene-part key={metric.label}>
            <p className="text-4xl font-medium tracking-tight text-foreground md:text-5xl"><Metric value={metric.value} /></p>
            <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">{metric.label}</p>
          </div>
        ))}
      </MotionScene>
    </Section>
  );
}
