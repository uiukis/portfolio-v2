"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AmbientBackground() {
  const reduced = useReducedMotion();
  const mobile = useMobile();
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.28);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30, mass: 0.9 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30, mass: 0.9 });

  const parallaxX = useTransform(smoothX, [0, 1], [-36, 36]);
  const parallaxY = useTransform(smoothY, [0, 1], [-24, 24]);
  const parallaxXSlow = useTransform(smoothX, [0, 1], [-18, 18]);
  const parallaxYSlow = useTransform(smoothY, [0, 1], [-12, 12]);
  const parallaxXFar = useTransform(smoothX, [0, 1], [28, -28]);
  const parallaxYFar = useTransform(smoothY, [0, 1], [16, -16]);

  const mistOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75], [1, 0.4, 0.1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [0.85, 0.3, 0.06]);
  const darkOverlay = useTransform(scrollYProgress, [0, 0.25, 0.55, 1], [0, 0.35, 0.62, 0.82]);
  const topWash = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    if (reduced || mobile) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduced, mobile]);

  if (reduced || mobile) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(100,140,210,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#070b14]" />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,rgba(90,130,200,0.16),transparent_58%)]"
        style={{ opacity: topWash }}
      />

      <motion.div className="absolute inset-0" style={{ opacity: gridOpacity }}>
        <div className="grid-bg absolute inset-0" />
        <div className="dot-field absolute inset-0" />
      </motion.div>

      {/* Soft frosted glass panes — liquid glass, not milky white */}
      <motion.div className="absolute inset-0" style={{ opacity: mistOpacity }}>
        <motion.div
          className="liquid-glass absolute -left-[10%] top-[-6%] h-[52vmin] w-[52vmin]"
          style={{ x: parallaxXSlow, y: parallaxYSlow }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="liquid-glass liquid-glass-cool absolute -right-[14%] top-[10%] h-[64vmin] w-[64vmin]"
          style={{ x: parallaxXFar, y: parallaxYFar }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="liquid-glass liquid-glass-deep absolute bottom-[-8%] left-[20%] h-[46vmin] w-[46vmin]"
          style={{ x: parallaxX, y: parallaxY }}
          animate={{ opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="liquid-glass absolute left-[38%] top-[12%] h-[30vmin] w-[38vmin]"
          style={{ x: parallaxX, y: parallaxYSlow }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="liquid-glass liquid-glass-cool absolute bottom-[20%] right-[22%] h-[40vmin] w-[48vmin]"
          style={{ x: parallaxXFar, y: parallaxY }}
          animate={{ scale: [1.04, 0.96, 1.04] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[#02050b]"
        style={{ opacity: darkOverlay }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050814]/35 to-[#02040a]"
        style={{ opacity: darkOverlay }}
      />

      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
