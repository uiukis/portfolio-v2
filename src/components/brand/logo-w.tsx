"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const drawVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.4, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

type LogoWProps = {
  size?: number;
  animated?: boolean;
  className?: string;
};

export function LogoW({ size = 40, animated = false, className }: LogoWProps) {
  const path = (
    <motion.path
      d="M6 8 L16 40 L24 20 L32 40 L42 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={animated ? drawVariants : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
    />
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0 text-foreground drop-shadow-[0_0_12px_rgba(126,182,255,0.25)]", className)}
    >
      {animated ? path : (
        <path
          d="M6 8 L16 40 L24 20 L32 40 L42 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
