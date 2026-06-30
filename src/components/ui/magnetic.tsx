"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
};

export function Magnetic({ children, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) * strength;
    const offsetY = (e.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.2s ease-out" }}
    >
      {children}
    </motion.div>
  );
}
