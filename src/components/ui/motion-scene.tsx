"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useI18n } from "@/providers/i18n-provider";
import { loadGsap } from "@/lib/gsap";

type MotionSceneProps = {
  children: ReactNode;
  className?: string;
  variant?: "hero" | "reveal";
};

/** Finite, scoped timelines. Content remains readable if the runtime cannot load. */
export function MotionScene({ children, className, variant = "reveal" }: MotionSceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const { locale } = useI18n();

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let context: { revert(): void } | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (media.matches) return;
      void loadGsap().then((gsap) => {
        if (cancelled || media.matches) return;
        context = gsap.context(() => {
          const timeline = gsap.timeline();
          if (variant === "hero") {
            timeline.fromTo(
              element.querySelectorAll("[data-motion-word]"),
              { yPercent: 105, opacity: 0, filter: "blur(5px)" },
              { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: .9, stagger: .09, ease: "power4.out", clearProps: "all" },
              .08,
            );
            timeline.fromTo(
              element.querySelectorAll("[data-motion-copy]"),
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: .7, stagger: .075, ease: "expo.out", clearProps: "all" },
              .2,
            );
            timeline.fromTo(
              element.querySelectorAll("[data-motion-panel]"),
              { y: 28, scale: .97, opacity: 0, filter: "blur(5px)" },
              { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out", clearProps: "all" },
              .28,
            );
          } else {
            timeline.fromTo(
              element,
              { y: 20, opacity: .15, filter: "blur(3px)" },
              { y: 0, opacity: 1, filter: "blur(0px)", duration: .85, ease: "power4.out", clearProps: "all" },
            );
          }
        }, element);
      }).catch(() => {
        // Progressive enhancement leaves the unanimated content visible.
      });
    }, { rootMargin: "0px 0px -32px 0px", threshold: 0 });

    const reduceMotion = () => {
      if (media.matches) context?.revert();
    };
    media.addEventListener("change", reduceMotion);
    const begin = () => observer.observe(element);
    window.addEventListener("portfolio-intro-complete", begin, { once: true });
    if (document.documentElement.dataset.intro !== "playing") begin();

    return () => {
      cancelled = true;
      window.removeEventListener("portfolio-intro-complete", begin);
      observer.disconnect();
      media.removeEventListener("change", reduceMotion);
      context?.revert();
    };
  }, [locale, variant]);

  return <div ref={root} className={className}>{children}</div>;
}
