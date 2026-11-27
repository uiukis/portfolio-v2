"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Monogram } from "@/components/brand/monogram";
import { useI18n } from "@/providers/i18n-provider";
import { loadGsap, type SceneTimeline } from "@/lib/gsap";
import { createBrandIntro } from "../../../public/brand/intro.js";

export function PageLoader() {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const replay = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      document.documentElement.dataset.intro = "playing";
      document.documentElement.dataset.build = "pending";
      setVisible(true);
    };
    // The intro plays on every load.
    const frame = reduced ? undefined : requestAnimationFrame(replay);
    window.addEventListener("portfolio-replay-intro", replay);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      delete document.documentElement.dataset.intro;
      delete document.documentElement.dataset.build;
      window.removeEventListener("portfolio-replay-intro", replay);
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!visible || !element) return;
    // The overlay is on screen now, so the pre-paint cover can go.
    delete document.documentElement.dataset.cover;
    let cancelled = false;
    let finished = false;
    let usedKeyboard = false;
    let timeline: SceneTimeline | undefined;
    let context: { revert(): void } | undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      // No revert here: it would repaint the opaque scrim before React unmounts it. The cleanup reverts.
      timeline?.kill();
      delete document.documentElement.dataset.intro;
      document.body.style.overflow = previousOverflow;
      if (document.activeElement === skip) {
        const destination = previousFocus instanceof HTMLElement && previousFocus !== document.body
          ? previousFocus
          : usedKeyboard ? document.querySelector<HTMLElement>(".skip-link") : null;
        destination?.focus({ preventScroll: true });
      }
      setVisible(false);
      window.dispatchEvent(new Event("portfolio-intro-complete"));
    };
    const skip = element.querySelector("button");
    const previousFocus = document.activeElement;
    const handleKey = (event: KeyboardEvent) => {
      usedKeyboard = true;
      if (event.key === "Escape") {
        event.preventDefault();
        finish();
      }
      if (event.key === "Tab") {
        event.preventDefault();
        skip?.focus();
      }
    };
    skip?.focus({ preventScroll: true });
    skip?.addEventListener("click", finish);
    element.addEventListener("keydown", handleKey);
    window.addEventListener("resize", finish, { once: true });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (media.matches) finish(); };
    media.addEventListener("change", reduce);
    const timeout = window.setTimeout(finish, 6500);

    void loadGsap().then((gsap) => {
      if (cancelled || finished) return;
      const target = document.querySelector("[data-brand-target]")?.getBoundingClientRect();
      if (!target) { finish(); return; }
      const reveal = document.querySelector("[data-brand-reveal]");
      context = gsap.context(() => {
        timeline = createBrandIntro(gsap, element, {
          x: target.left + target.width / 2,
          y: target.top + target.height / 2,
          width: target.width,
        }, finish, reveal);
      }, element);
      timeline?.play();
    }).catch(finish);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      timeline?.kill();
      context?.revert();
      skip?.removeEventListener("click", finish);
      element.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", finish);
      media.removeEventListener("change", reduce);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div ref={root} className="brand-intro" role="dialog" aria-modal="true" aria-label={t.loader.title}>
      <div className="brand-intro-scrim" />
      <div className="brand-intro-flight" aria-hidden="true">
        <Monogram className="brand-intro-mark" />
      </div>
      <span className="brand-intro-name" aria-hidden="true">
        <span className="brand-intro-text">{t.hero.name.slice(1)}</span>
      </span>
      <button className="brand-intro-skip" type="button">{t.loader.skip}</button>
    </div>
  );
}
