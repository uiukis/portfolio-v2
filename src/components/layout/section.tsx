"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-text";
import { fadeUp, revealLine, staggerFast, defaultViewport } from "@/lib/motion";

interface SectionProps {
  id?: string;
  index?: string;
  headingId?: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  title?: string;
  description?: string;
}

export function Section({
  id,
  index,
  headingId,
  children,
  className,
  label,
  title,
  description,
}: SectionProps) {
  const labelledBy = headingId ?? (title && id ? `${id}-heading` : undefined);

  return (
    <section
      id={id}
      className={cn("relative py-28 md:py-36", className)}
      aria-labelledby={labelledBy}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {(label || title || description) && (
          <motion.header
            className="mb-16 max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerFast}
          >
            {index && (
              <motion.span
                variants={fadeUp}
                className="mb-4 block font-mono text-[10px] tracking-[0.4em] text-muted-foreground"
              >
                {index}
              </motion.span>
            )}
            {label && (
              <motion.div variants={fadeUp}>
                <AnimatedText
                  as="p"
                  text={label}
                  className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent"
                />
              </motion.div>
            )}
            {title && (
              <motion.div variants={fadeUp}>
                <AnimatedText
                  as="h2"
                  id={`${id}-heading`}
                  text={title}
                  effect="typewriter"
                  className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
                />
              </motion.div>
            )}
            <motion.div
              variants={revealLine}
              className="section-line mt-6 max-w-xs origin-left"
            />
            {description && (
              <motion.div variants={fadeUp} className="mt-6">
                <AnimatedText
                  as="p"
                  text={description}
                  className="text-lg leading-relaxed text-muted"
                />
              </motion.div>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
