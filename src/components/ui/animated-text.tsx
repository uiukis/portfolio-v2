"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  className?: string;
  id?: string;
  showCursor?: boolean;
  effect?: "typewriter" | "fade";
};

function useTypewriterText(targetText: string, enabled: boolean, localeTick: number) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(targetText);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!enabled || reduced) {
      setDisplay(targetText);
      setIsAnimating(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setIsAnimating(true);
      setDisplay("");

      for (let i = 1; i <= targetText.length && !cancelled; i++) {
        setDisplay(targetText.slice(0, i));
        await new Promise((r) => setTimeout(r, 14));
      }

      if (!cancelled) setIsAnimating(false);
    };

    void run();

    return () => {
      cancelled = true;
      setIsAnimating(false);
    };
  }, [targetText, enabled, reduced, localeTick]);

  return { display, isAnimating };
}

export function AnimatedText({
  text,
  as: Tag = "span",
  className,
  id,
  showCursor = false,
  effect = "fade",
}: AnimatedTextProps) {
  const { localeTick } = useI18n();
  const reduced = useReducedMotion();
  const isBlock = Tag !== "span";
  const typewriter = useTypewriterText(
    text,
    effect === "typewriter" && !reduced,
    localeTick,
  );

  if (effect === "typewriter" && !reduced) {
    return (
      <Tag id={id} className={cn(isBlock && "block", className)}>
        {typewriter.display || "\u00A0"}
        {(showCursor || typewriter.isAnimating) && (
          <span className="cursor-blink ml-px text-accent" aria-hidden="true" />
        )}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={cn(isBlock && "block", className)}>
      <AnimatePresence initial={false}>
        <motion.span
          key={localeTick}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={cn(!isBlock && "inline-block", isBlock && "block")}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </Tag>
  );
}
