"use client";

import { motion } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AmbientBackground() {
  const reduced = useReducedMotion();
  const mobile = useMobile();

  if (reduced || mobile) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-30 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden" aria-hidden="true">
      <motion.div
        className="orb orb-teal h-[500px] w-[500px] -left-32 top-1/4"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-purple h-[600px] w-[600px] -right-48 top-1/3"
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-teal h-[350px] w-[350px] bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, -25, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
