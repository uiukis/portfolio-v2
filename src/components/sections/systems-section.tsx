"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  projectLinks,
  projectStacks,
  type ProjectId,
} from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";

const projectIdsByGroup: Record<"personal" | "client", readonly ProjectId[]> = {
  personal: ["overmind", "office"],
  client: ["mutua", "vidi"],
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
  const [selected, setSelected] = useState<SelectedProject | null>(null);

  return (
    <Section
      id="systems"
      index="04"
      label={t.systems.label}
      title={t.systems.title}
      description={t.systems.description}
    >
      <div className="flex flex-col gap-12">
        {t.systems.groups.map((group) => (
          <div key={group.key}>
            <h3 className="mb-6 text-sm font-medium text-muted">
              {group.title}
            </h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              {group.items.map((project, i) => {
                const id = projectIdsByGroup[group.key][i];
                const stack = projectStacks[id];
                const href = projectLinks[id];

                return (
                  <motion.div key={id} variants={fadeUp} custom={i}>
                    <GlowCard className="group">
                      <article className="relative overflow-hidden p-8 md:p-10">
                        <button
                          type="button"
                          className="focus-ring absolute inset-0 z-10 rounded-[inherit]"
                          aria-label={`${t.systems.viewDetails}: ${project.title}`}
                          onClick={() =>
                            setSelected({
                              id,
                              title: project.title,
                              category: project.category,
                              ownership: project.ownership,
                              impact: project.impact,
                              description: project.description,
                            })
                          }
                        />
                        <div className="relative z-0 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                              <Badge variant="accent">{project.category}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <h4 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-accent">
                              {project.title}
                            </h4>
                            {project.ownership ? (
                              <p className="mt-2 text-sm text-muted-foreground">
                                {project.ownership}
                              </p>
                            ) : null}
                            <p className="mt-3 max-w-xl leading-relaxed text-muted">
                              {project.description}
                            </p>
                            <p className="mt-4 text-sm font-medium text-accent">
                              {project.impact}
                            </p>
                            <p className="mt-3 text-xs font-medium text-muted-foreground">
                              {t.systems.viewDetails}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                            {stack.map((tech, j) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: j * 0.04 }}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted transition-colors hover:border-white/20 hover:text-foreground"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {href ? (
                          <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-ring absolute right-6 top-6 z-20 text-muted-foreground transition-colors hover:text-accent"
                            aria-label={`${t.systems.openProject}: ${project.title}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ArrowUpRight size={20} aria-hidden="true" />
                          </Link>
                        ) : (
                          <div
                            className="pointer-events-none absolute right-6 top-6 text-muted-foreground/50 group-hover:text-accent"
                            aria-hidden="true"
                          >
                            <ArrowUpRight size={20} />
                          </div>
                        )}
                      </article>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        {selected ? (
          <DialogContent>
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
