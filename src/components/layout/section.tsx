"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-text";
import { fadeUp, staggerFast, defaultViewport } from "@/lib/motion";

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
      className={cn("relative py-24 md:py-32", className)}
      aria-labelledby={labelledBy}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {(label || title || description) && (
          <motion.header
            className="mb-14 max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerFast}
          >
            {index && (
              <motion.span
                variants={fadeUp}
                className="mb-3 block text-[12px] font-medium tracking-wide text-muted-foreground"
              >
                {index}
              </motion.span>
            )}
            {label && (
              <motion.div variants={fadeUp}>
                <AnimatedText
                  as="p"
                  text={label}
                  className="mb-3 text-sm font-medium text-muted"
                />
              </motion.div>
            )}
            {title && (
              <motion.div variants={fadeUp}>
                <AnimatedText
                  as="h2"
                  id={`${id}-heading`}
                  text={title}
                  className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
                />
              </motion.div>
            )}
            <motion.div
              variants={fadeUp}
              className="section-line mt-5 max-w-[10rem]"
            />
            {description && (
              <motion.div variants={fadeUp} className="mt-5">
                <AnimatedText
                  as="p"
                  text={description}
                  className="text-base leading-relaxed text-muted md:text-lg"
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
