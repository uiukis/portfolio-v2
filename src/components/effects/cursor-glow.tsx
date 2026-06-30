"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 25 });
  const y = useSpring(rawY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY, reduced, visible]);

  if (reduced) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
