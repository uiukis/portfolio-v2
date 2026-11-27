"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { MotionScene } from "@/components/ui/motion-scene";
import { ArrowUpRight } from "lucide-react";
import {
  projectImages,
  projectLinks,
  projectStacks,
  type ProjectId,
} from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// The lettering Easy Cards uses on its own site.
const easyCardsLettering = localFont({ src: "../../fonts/LuckiestGuy.ttf", display: "swap" });

const demos: Partial<Record<ProjectId, string>> = {
  nook: "/projects/nook-demo.mp4",
  easycards: "/projects/easy-cards.mp4",
  turno: "/projects/turno.mp4",
};

type SelectedProject = {
  id: ProjectId;
  title: string;
  category: string;
  ownership?: string;
  impact: string;
  description: string;
};

export function SystemsSection() {
  const { t } = useI18n();
  const detailsTrigger = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<SelectedProject | null>(null);

  return (
    <Section
      id="systems"
      label={t.systems.label}
      title={t.systems.title}
      description={t.systems.description}
    >
      <div className="flex flex-col gap-8">
        {t.systems.groups.map((group) => (
          <div key={group.key}>
            <MotionScene>
              <h3 className="project-group-title">{group.title}</h3>
            </MotionScene>
            <div className="project-list">
              {group.items.map((project, order) => {
                const { id, title, category, ownership, description, impact } = project;
                const image = projectImages[id];
                const href = projectLinks[id];

                return (
                  <MotionScene key={id} stagger>
                    <article
                      id={`project-${id}`}
                      className={`project-story${image ? ` project-story-featured project-story-${id}` : ""}`}
                      aria-labelledby={`project-title-${id}`}
                    >
                      {image && (
                        <div className="project-stage" data-scene-part data-project={id}>
                          <span className="project-index" aria-hidden="true">{String(order + 1).padStart(2, "0")}</span>
                          <span className="project-glow" aria-hidden="true" />
                          <span className="project-ghost" aria-hidden="true">{title}</span>
                          <div className="project-frame">
                            <div className="project-shot">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={id === "nook" ? 1080 : 800}
                                height={id === "nook" ? 467 : id === "turno" ? 450 : 448}
                                className="project-stage-image"
                                sizes="(max-width: 767px) 90vw, 610px"
                              />
                              {demos[id] && (
                                <video className="project-peek" muted loop playsInline preload="none" src={demos[id]} aria-hidden="true" tabIndex={-1} />
                              )}
                            </div>
                            <span className="project-brand" aria-hidden="true">
                              {id === "nook" ? (
                                <>
                                  <Image src="/projects/nook-icon.svg" alt="" width={1024} height={1024} unoptimized />
                                  <span className="project-brand-nook">Nook</span>
                                </>
                              ) : id === "turno" ? (
                                <>
                                  <Image src="/projects/turno-logo.svg" alt="" width={400} height={400} unoptimized />
                                  <span className="project-brand-turno">turno</span>
                                  <span className="project-brand-beta">beta</span>
                                </>
                              ) : (
                                <>
                                  <Image src="/projects/easy-cards-mascot.webp" alt="" width={480} height={478} unoptimized />
                                  <span className={`project-brand-easy ${easyCardsLettering.className}`}>Easy Cards</span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="project-story-copy" data-scene-part>
                        <p className="project-category">{category}</p>
                        <h4 id={`project-title-${id}`}>{title}</h4>
                        {image && (
                          <svg className="project-scribble" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                            <path d="M2 10 C 70 2, 150 13, 298 4" pathLength="1" />
                          </svg>
                        )}
                        {ownership && <p className="text-sm text-muted-foreground">{ownership}</p>}
                        <p className="project-story-description">{description}</p>
                        {image && <p className="text-sm font-medium text-accent">{impact}</p>}
                        <div className="project-actions">
                          <button
                            type="button"
                            className="project-detail focus-ring"
                            aria-label={`${t.systems.viewDetails}: ${title}`}
                            aria-haspopup="dialog"
                            onClick={(event) => {
                              detailsTrigger.current = event.currentTarget;
                              setSelected(project);
                            }}
                          >
                            {t.systems.viewDetails}
                          </button>
                          {href && (
                            <Link
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link focus-ring"
                              aria-label={`${t.systems.openProject}: ${title}`}
                            >
                              {t.systems.openProject}
                              <ArrowUpRight size={15} aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </div>
                      <ul className="project-stack">
                        {projectStacks[id].map((tech) => <li key={tech} data-scene-part>{tech}</li>)}
                      </ul>
                    </article>
                  </MotionScene>
                );
              })}
            </div>
            {group.note && <p className="project-note">{group.note}</p>}
          </div>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        {selected ? (
          <DialogContent
            className="max-h-[90dvh] overflow-y-auto"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              detailsTrigger.current?.focus({ preventScroll: true });
            }}
          >
            <DialogHeader>
              <Badge variant="accent" className="mb-3 w-fit">
                {selected.category}
              </Badge>
              <DialogTitle>{selected.title}</DialogTitle>
              {selected.ownership ? (
                <p className="text-sm text-muted-foreground">{selected.ownership}</p>
              ) : null}
              <DialogDescription>{selected.description}</DialogDescription>
            </DialogHeader>
            {demos[selected.id] && (
              <video key={selected.id} controls playsInline preload="none" aria-label={t.systems.watchDemo} className="mx-auto max-h-[45vh] max-w-full rounded-xl" src={demos[selected.id]} />
            )}
            <p className="text-sm font-medium text-accent">{selected.impact}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {projectStacks[selected.id].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            {projectLinks[selected.id] ? (
              <Link
                href={projectLinks[selected.id]!}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                {t.systems.openProject}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ) : null}
          </DialogContent>
        ) : null}
      </Dialog>
    </Section>
  );
}
