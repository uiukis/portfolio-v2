"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";

type MotionSceneProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
};

/** Finite, scoped timelines. Content remains readable if the runtime cannot load. */
export function MotionScene({ children, className, stagger = false }: MotionSceneProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let entered = false;
    let context: { revert(): void } | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (entered || media.matches) return;
      entered = true;
      void loadGsap().then((gsap) => {
        if (cancelled || media.matches) return;
        context = gsap.context(() => {
          const parts = stagger ? element.querySelectorAll("[data-scene-part]") : [];
          const targets = parts.length ? Array.from(parts) : [element];
          gsap.timeline().fromTo(
            targets,
            { y: 24, opacity: .55 },
            { y: 0, opacity: 1, duration: .8, stagger: .085, ease: "power3.out", clearProps: "transform,opacity" },
          );
        }, element);
      }).catch(() => {
        // Progressive enhancement leaves the unanimated content visible.
      });
    }, { rootMargin: "0px 0px -32px 0px", threshold: 0 });

    const reduceMotion = () => {
      if (media.matches) context?.revert();
    };
    media.addEventListener("change", reduceMotion);
    const begin = () => {
      if (!entered) observer.observe(element);
    };
    window.addEventListener("portfolio-intro-complete", begin, { once: true });
    if (document.documentElement.dataset.intro !== "playing") begin();

    return () => {
      cancelled = true;
      window.removeEventListener("portfolio-intro-complete", begin);
      observer.disconnect();
      media.removeEventListener("change", reduceMotion);
      context?.revert();
    };
  }, [stagger]);

  return <div ref={root} className={className}>{children}</div>;
}
