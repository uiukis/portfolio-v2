"use client";

import { useEffect, useRef, useState } from "react";
import { loadGsap } from "@/lib/gsap";
import { useI18n } from "@/providers/i18n-provider";

const labels: [string, { pt: string; en: string }][] = [
  [".project-stage", { pt: "ver", en: "view" }],
  [".project-link, a[target=_blank]", { pt: "abrir", en: "open" }],
  [".project-detail", { pt: "mais", en: "more" }],
  [".career-entry summary", { pt: "ler", en: "read" }],
  [".contact-email", { pt: "escrever", en: "write" }],
  [".hero-strip a", { pt: "ir", en: "go" }],
];

/** A small label that follows the pointer and names what the element under it does. */
export function CursorLabel() {
  const { locale } = useI18n();
  const node = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const element = node.current;
    if (!element) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || motion.matches) return;

    let disposed = false;
    let shown = false;
    const move = (event: PointerEvent) => {
      void loadGsap().then((gsap) => {
        if (disposed) return;
        const entry = labels.find(([selector]) => (event.target as Element).closest(selector));
        gsap.to(element, { x: event.clientX + 18, y: event.clientY + 18, duration: .35, ease: "power3.out", overwrite: "auto" });
        if (entry) setText(entry[1][locale]);
        if (!!entry !== shown) {
          shown = !!entry;
          gsap.to(element, { scale: shown ? 1 : .4, opacity: shown ? 1 : 0, duration: .3, ease: "back.out(2)" });
        }
      }).catch(() => undefined);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      disposed = true;
      window.removeEventListener("pointermove", move);
    };
  }, [locale]);

  return <div ref={node} className="cursor-label" aria-hidden="true">{text}</div>;
}
