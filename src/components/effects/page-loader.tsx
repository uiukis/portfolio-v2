"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/providers/i18n-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LOADER_STORAGE_KEY = "portfolio-intro-seen";
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";
const INTRO_MS = 1400;

/**
 * Short brand intro — soft glass fade, no fake OS boot.
 * Skipped on mobile, reduced-motion, and after first visit in the session.
 */
export function PageLoader() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const startedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (reduced || startedRef.current) return;
    if (sessionStorage.getItem(LOADER_STORAGE_KEY)) return;
    if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) return;

    startedRef.current = true;
    setVisible(true);

    const exitTimer = setTimeout(() => {
      sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
      setVisible(false);
    }, INTRO_MS);

    return () => clearTimeout(exitTimer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,182,255,0.14)_0%,transparent_70%)]"
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0, scale: 1.12, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-4xl font-semibold tracking-tight text-foreground lowercase md:text-5xl"
          >
            wilker
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
            className="relative z-10 mt-4 text-[13px] font-medium text-muted"
          >
            {t.loader.ready}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
