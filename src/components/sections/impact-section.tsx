"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { GlowCard } from "@/components/ui/glow-card";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const numericMatch = value.match(/^([\d.]+)(.*)$/);
  const numericPart = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;

  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => {
    if (suffix.includes("%")) return `${v.toFixed(1)}%`;
    if (value.includes("M")) return `${Math.round(v)}M+`;
    return `${Math.round(v)}${suffix.replace(/^\d+/, "")}`;
  });

  useEffect(() => {
    if (inView && numericMatch && !reducedMotion) {
      spring.set(numericPart);
    }
  }, [inView, numericPart, numericMatch, reducedMotion, spring]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-center"
    >
      <p className="gradient-text text-4xl font-semibold tracking-tight md:text-5xl">
        {inView && numericMatch && !reducedMotion ? (
          <motion.span>{display}</motion.span>
        ) : (
          value
        )}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  );
}

export function ImpactSection() {
  const { t } = useI18n();

  return (
    <Section
      id="impact"
      index="03"
      label={t.impact.label}
      title={t.impact.title}
      description={t.impact.description}
      className="border-t border-border/60"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
      >
        <GlowCard>
          <div className="p-10 md:p-16">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {t.impact.metrics.map((metric) => (
                <AnimatedMetric
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </Section>
  );
}
