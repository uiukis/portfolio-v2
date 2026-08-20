"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LogoW } from "@/components/brand/logo-w";
import { useI18n } from "@/providers/i18n-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LOADER_STORAGE_KEY = "wq-os-loader-seen";
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

const DESKTOP_BOOT_MS = 2600;

export function PageLoader() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const startedRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"boot" | "ready">("boot");
  const [bootDurationMs, setBootDurationMs] = useState(DESKTOP_BOOT_MS);

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

    const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
    if (isMobile) return;

    startedRef.current = true;

    const duration = DESKTOP_BOOT_MS;
    const lineDelayMs = 380;
    const lineStartMs = 400;
    const readyDelayMs = 300;

    setBootDurationMs(duration);
    setVisible(true);

    const lines = t.hero.bootLines.length;
    const lineTimers = Array.from({ length: lines }, (_, i) =>
      setTimeout(() => setVisibleLines(i + 1), lineStartMs + i * lineDelayMs),
    );

    const readyTimer = setTimeout(
      () => setPhase("ready"),
      lineStartMs + lines * lineDelayMs + readyDelayMs,
    );
    const exitTimer = setTimeout(() => {
      sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
      setVisible(false);
    }, duration);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(readyTimer);
      clearTimeout(exitTimer);
    };
  }, [reduced, t.hero.bootLines.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,182,255,0.12)_0%,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center px-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoW size={88} animated />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-8 text-[13px] font-medium tracking-wide text-muted"
            >
              {t.loader.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-2 text-[12px] tracking-wide text-muted-foreground"
            >
              {t.loader.subtitle}
              <span className="cursor-blink" />
            </motion.p>

            <div className="hero-terminal mt-10 w-full max-w-md space-y-2 rounded-2xl px-5 py-4 text-left font-mono text-[11px] leading-relaxed">
              {t.hero.bootLines.map((line, i) => (
                <AnimatePresence key={line}>
                  {visibleLines > i && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-muted-foreground"
                    >
                      {line}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
              {phase === "ready" && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium text-accent"
                >
                  ▸ {t.loader.ready}
                </motion.p>
              )}
              {visibleLines > 0 && phase === "boot" && (
                <span className="cursor-blink inline-block text-accent" aria-hidden="true" />
              )}
            </div>
          </div>

          <motion.div
            className="absolute left-1/2 h-px w-48 max-w-[60vw] -translate-x-1/2 overflow-hidden rounded-full bg-border"
            style={{ bottom: "calc(3rem + env(safe-area-inset-bottom))" }}
            aria-hidden="true"
          >
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent to-accent-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: bootDurationMs / 1000 - 0.25, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
