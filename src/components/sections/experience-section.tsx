"use client";

import { Plus } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionScene } from "@/components/ui/motion-scene";
import { CareerChart } from "@/components/sections/career-chart";
import { useI18n } from "@/providers/i18n-provider";

export function ExperienceSection() {
  const { t } = useI18n();

  return (
    <Section
      id="experience"
      label={t.experience.label}
      title={t.experience.title}
      description={t.experience.description}
    >
      <CareerChart />
      <div className="career-timeline">
        {t.experience.items.map((item) => (
          <MotionScene key={item.company}>
            <details className="career-entry career-entry-line group" open={item.current || Boolean(item.clients)}>
              <summary className="focus-ring grid grid-cols-[1fr_auto] cursor-pointer list-none gap-3 py-4 md:grid-cols-[10rem_1fr_auto] md:items-center">
                <span className="col-start-1 text-sm text-muted">{item.period}</span>
                <span className="col-start-1 md:col-start-auto">
                  <span className="block text-xl font-semibold text-foreground">{item.company}</span>
                  <span className="mt-1 block text-sm text-muted">{item.role}</span>
                </span>
                <Plus
                  size={18}
                  className="career-expand col-start-2 row-start-1 text-muted md:col-start-auto md:row-start-auto"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-8 md:pl-[11rem]">
                <ul className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-muted">
                  {item.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
                {item.clients ? (
                  <div className="client-engagements">
                    <p className="mb-6 text-sm font-medium text-accent">{t.experience.clientLabel}</p>
                    {item.clients.map((client) => (
                      <article key={client.name} className="client-engagement">
                        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                          <span className="text-sm text-muted">{client.period}</span>
                        </div>
                        <p className="mb-3 text-sm font-medium text-accent">{client.project}</p>
                        <ul className="space-y-2 text-[15px] leading-relaxed text-muted">
                          {client.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                        </ul>
                        <p className="mt-4 text-sm text-muted-foreground">{client.stack.join(" · ")}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </details>
          </MotionScene>
        ))}
      </div>
    </Section>
  );
}
