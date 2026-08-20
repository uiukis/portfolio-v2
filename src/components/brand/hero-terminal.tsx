"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

type Tab = "quick" | "feed";

export function HeroTerminal({ className }: { className?: string }) {
  const { t, locale } = useI18n();
  const [tab, setTab] = useState<Tab>("quick");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const items = t.curiosities.items;

  useEffect(() => {
    setIndex(0);
  }, [locale]);

  useEffect(() => {
    if (tab !== "feed") return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [tab, items.length, locale]);

  const command = `$ ${t.hero.terminalCommand}`;

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(t.hero.terminalCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "hero-terminal w-full overflow-hidden rounded-2xl",
        className,
      )}
      aria-label={t.curiosities.title}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <button
              type="button"
              onClick={() => setTab("quick")}
              className={cn(
                "focus-ring relative pb-0.5 transition-colors",
                tab === "quick" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {t.hero.terminalQuick}
              {tab === "quick" && (
                <span className="absolute inset-x-0 -bottom-3 h-px bg-white" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setTab("feed")}
              className={cn(
                "focus-ring relative pb-0.5 transition-colors",
                tab === "feed" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {t.hero.terminalFeed}
              {tab === "feed" && (
                <span className="absolute inset-x-0 -bottom-3 h-px bg-white" />
              )}
            </button>
          </div>
        </div>

        {tab === "quick" && (
          <button
            type="button"
            onClick={copyCommand}
            className="focus-ring rounded-md px-2 py-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? t.hero.terminalCopied : t.hero.terminalCopy}
          </button>
        )}
      </div>

      <div className="min-h-[168px] px-5 py-6">
        <AnimatePresence mode="wait">
          {tab === "quick" ? (
            <motion.div
              key="quick"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[13px] leading-relaxed md:text-[14px]"
            >
              <p>
                <span className="text-accent">$</span>{" "}
                <span className="text-foreground/90">{t.hero.terminalCommand}</span>
              </p>
              <div className="mt-5 space-y-1.5 text-[12px] text-muted-foreground">
                {t.hero.bootLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`feed-${locale}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[12px] leading-relaxed text-muted md:text-[13px]"
              aria-live="polite"
            >
              <p>
                <span className="text-accent">{t.curiosities.prefix}</span>{" "}
                {items[index]}
              </p>
              <div className="mt-6 flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className="focus-ring h-6 w-6"
                    aria-label={`${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <span
                      className={cn(
                        "mx-auto block h-1.5 w-1.5 rounded-full transition-all",
                        i === index ? "scale-125 bg-accent" : "bg-white/25 hover:bg-white/50",
                      )}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="sr-only">{command}</span>
    </motion.aside>
  );
}
