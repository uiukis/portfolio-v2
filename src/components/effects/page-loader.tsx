"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Monogram } from "@/components/brand/monogram";
import { useI18n } from "@/providers/i18n-provider";
import { loadGsap, type SceneTimeline } from "@/lib/gsap";
import { createBrandIntro } from "../../../public/brand/intro.js";

const STORAGE_KEY = "portfolio-brand-intro-v1";

export function PageLoader() {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = Boolean(sessionStorage.getItem(STORAGE_KEY)); } catch { /* Storage is optional. */ }
    if (!reduced && !seen) {
      document.documentElement.dataset.intro = "playing";
      setVisible(true);
    }
    const replay = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      document.documentElement.dataset.intro = "playing";
      setVisible(true);
    };
    window.addEventListener("portfolio-replay-intro", replay);
    return () => {
      delete document.documentElement.dataset.intro;
      window.removeEventListener("portfolio-replay-intro", replay);
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!visible || !element) return;
    let cancelled = false;
    let timeline: SceneTimeline | undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const finish = () => {
      if (cancelled) return;
      timeline?.kill();
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* Storage is optional. */ }
      delete document.documentElement.dataset.intro;
      document.body.style.overflow = previousOverflow;
      setVisible(false);
      window.dispatchEvent(new Event("portfolio-intro-complete"));
    };
    const skip = element.querySelector("button");
    skip?.addEventListener("click", finish);
    window.addEventListener("resize", finish, { once: true });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (media.matches) finish(); };
    media.addEventListener("change", reduce);
    const timeout = window.setTimeout(finish, 6500);

    void loadGsap().then((gsap) => {
      if (cancelled) return;
      const target = document.querySelector("[data-brand-target]")?.getBoundingClientRect();
      if (!target) { finish(); return; }
      timeline = createBrandIntro(gsap, element, {
        x: target.left + target.width / 2,
        y: target.top + target.height / 2,
        width: target.width,
      }, finish);
      timeline?.play();
    }).catch(finish);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      timeline?.kill();
      skip?.removeEventListener("click", finish);
      window.removeEventListener("resize", finish);
      media.removeEventListener("change", reduce);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div ref={root} className="brand-intro" role="status" aria-label={t.loader.title}>
      <div className="brand-intro-scrim" />
      <div className="brand-intro-flight" aria-hidden="true">
        <Monogram className="brand-intro-mark" />
        <span className="brand-intro-name">{t.hero.name}</span>
      </div>
      <button className="brand-intro-skip" type="button">{t.loader.skip}</button>
    </div>
  );
}
