"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  id?: string;
  delay?: number;
  /** First word starts larger and settles — snapcn-inspired */
  mode?: "settle" | "up";
};

export function TextReveal({
  text,
  className,
  as: Tag = "h1",
  id,
  delay = 0,
  mode = "settle",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: delay },
    },
  };

  const wordSettle: Variants = {
    hidden: { opacity: 0, y: 28, scale: 1.35, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const wordUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag id={id} className={cn("overflow-visible", className)}>
      <motion.span
        className="inline"
        initial="hidden"
        animate="visible"
        variants={container}
        aria-label={text}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="mr-[0.28em] inline-block last:mr-0"
            variants={mode === "settle" ? wordSettle : wordUp}
            style={{ transformOrigin: "left bottom" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
