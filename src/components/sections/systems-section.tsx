"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectIds, projectStacks } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";

export function SystemsSection() {
  const { t } = useI18n();

  return (
    <Section
      id="systems"
      index="04"
      label={t.systems.label}
      title={t.systems.title}
      description={t.systems.description}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="flex flex-col gap-6"
      >
        {t.systems.items.map((project, i) => {
          const id = projectIds[i];
          const stack = id ? projectStacks[id] : [];

          return (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <GlowCard className="group">
                <article className="relative overflow-hidden p-8 md:p-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex items-center gap-3">
                        <Badge variant="accent">{project.category}</Badge>
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted">{project.description}</p>
                      <p className="mt-4 text-sm font-medium text-accent">{project.impact}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                      {stack.map((tech, j) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.04 }}
                          className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/30 hover:text-accent"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -4, y: 4 }}
                    whileHover={{ opacity: 1, x: 0, y: 0 }}
                    className="absolute right-6 top-6 text-muted-foreground group-hover:text-accent"
                  >
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </motion.div>
                </article>
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
