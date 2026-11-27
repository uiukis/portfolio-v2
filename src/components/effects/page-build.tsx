"use client";

import { useEffect } from "react";
import { loadGsap } from "@/lib/gsap";

/** Order in which the page is assembled: the agent cursor sketches a box, then the content drops into it. */
const parts = [
  { selector: "header nav a, header nav + div", at: .35, from: { y: -26, opacity: 0 }, stagger: .07 },
  { selector: ".hero-meta", at: .65, from: { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 } },
  { selector: ".hero-letter", at: 1.05, from: { yPercent: 90, rotateX: -100, rotate: 12, opacity: 0 }, stagger: .05 },
  { selector: ".hero-orbit", at: 1.65, from: { scale: .2, opacity: 0 } },
  { selector: ".hero-card", at: 1.9, from: { y: 120, scale: .3, rotate: -18, opacity: 0 }, stagger: .09 },
  { selector: ".hero-description", at: 2.65, from: { y: 28, opacity: 0 } },
  { selector: ".hero-actions > *", at: 3, from: { scale: .4, opacity: 0 }, stagger: .12 },
  { selector: ".hero-strip li", at: 3.35, from: { y: 18, opacity: 0 }, stagger: .015 },
];

/** Wireframes, in the order the cursor visits them. */
const frames = [
  { selector: "header nav", name: "<Nav />", at: .15 },
  { selector: ".hero-meta", name: "<Meta />", at: .45 },
  { selector: ".hero-display", name: "<h1 />", at: .8 },
  { selector: ".hero-stage", name: "<AgentStage />", at: 1.45 },
  { selector: ".hero-description", name: "<p />", at: 2.4 },
  { selector: ".hero-actions", name: "<Actions />", at: 2.75 },
  { selector: ".hero-strip", name: "<Stack />", at: 3.1 },
];

const open = "inset(-28px -120px -28px -120px)";

function add(parent: Element, className: string, style = "", text = "") {
  const node = document.createElement("span");
  node.className = className;
  node.style.cssText = style;
  node.textContent = text;
  parent.appendChild(node);
  return node;
}

/** Plays once the brand intro lands, as if the page were being built. Skipped entirely under reduced motion. */
export function PageBuild() {
  useEffect(() => {
    const root = document.documentElement;
    let disposed = false;
    let context: { revert(): void } | undefined;
    let blueprint: HTMLDivElement | undefined;
    const release = () => { delete root.dataset.build; };
    const clear = () => {
      blueprint?.remove();
      blueprint = undefined;
      context?.revert();
      context = undefined;
      release();
    };

    const build = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.scrollY > 40) return release();
      void loadGsap().then((gsap) => {
        if (disposed) return;
        clear();
        root.dataset.build = "pending";
        const english = root.lang.startsWith("en");

        const layer = document.createElement("div");
        blueprint = layer;
        layer.className = "build-blueprint";
        layer.setAttribute("aria-hidden", "true");
        const grid = add(layer, "build-grid");
        const found = frames.flatMap((frame) => {
          const rect = document.querySelector(frame.selector)?.getBoundingClientRect();
          return rect?.width && rect.top < window.innerHeight ? [{ ...frame, rect }] : [];
        });
        const drawn = found.map(({ rect, name, at }) => {
          const guideX = add(layer, "build-guide build-guide-x", `top:${rect.top - 4}px`);
          const guideY = add(layer, "build-guide build-guide-y", `left:${rect.left - 6}px`);
          const box = add(layer, "build-box", `left:${rect.left - 6}px;top:${rect.top - 4}px;width:${rect.width + 12}px;height:${rect.height + 8}px`);
          for (const corner of ["tl", "tr", "bl", "br"]) add(box, `build-handle build-handle-${corner}`);
          add(box, "build-name", "", name);
          const size = add(box, "build-size", "", "0 × 0");
          return { box, guideX, guideY, size, rect, name, at };
        });
        const scan = add(layer, "build-scan");
        const hud = add(layer, "build-hud");
        const log = drawn.map(({ name }) => add(hud, "build-line", "", `✓ ${name}`));
        const status = add(hud, "build-status", "", english ? "building 0%" : "montando 0%");
        const cursor = add(layer, "build-cursor");
        add(cursor, "build-cursor-tag", "", "agent");
        document.body.appendChild(layer);

        context = gsap.context(() => {
          const tl = gsap.timeline({ onComplete: clear });
          tl.fromTo(grid, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: .6, ease: "power3.out" }, 0);
          tl.fromTo(hud, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .35 }, 0);
          tl.fromTo(cursor, { x: window.innerWidth * .75, y: window.innerHeight * .85, opacity: 0 }, { x: window.innerWidth * .6, y: window.innerHeight * .6, opacity: 1, duration: .15 }, 0);

          drawn.forEach(({ box, guideX, guideY, size, rect, at }, index) => {
            // The cursor reaches the top-left corner, then drags to the bottom-right while the box is drawn.
            tl.to(cursor, { x: rect.left - 6, y: Math.max(8, rect.top - 4), duration: .16, ease: "power2.inOut" }, at - .16);
            tl.to(cursor, { x: rect.right + 6, y: Math.min(window.innerHeight - 30, rect.bottom + 4), duration: .26, ease: "power2.out" }, at);
            tl.fromTo(guideX, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: .4, ease: "power3.out" }, at - .1);
            tl.fromTo(guideY, { scaleY: 0, opacity: 1 }, { scaleY: 1, duration: .4, ease: "power3.out" }, at - .1);
            tl.to([guideX, guideY], { opacity: 0, duration: .5 }, at + .5);
            tl.fromTo(box, { clipPath: "inset(-28px 100% 100% -120px)", opacity: 1 }, { clipPath: open, duration: .26, ease: "power2.out" }, at);
            const value = { t: 0 };
            tl.to(value, {
              t: 1, duration: .4, ease: "power2.out",
              onUpdate: () => { size.textContent = `${Math.round(rect.width * value.t)} × ${Math.round(rect.height * value.t)}`; },
            }, at);
            tl.fromTo(box, { backgroundColor: "rgba(255,172,129,.22)" }, { backgroundColor: "rgba(255,172,129,0)", duration: .5, immediateRender: false }, at + .26);
            tl.fromTo(log[index], { x: -14, opacity: 0, display: "none" }, { x: 0, opacity: 1, display: "block", duration: .2, immediateRender: true }, at + .26);
            tl.to(box, { opacity: 0, duration: .45 }, at + 1.1);
          });

          for (const part of parts) {
            const targets = document.querySelectorAll(part.selector);
            if (!targets.length) continue;
            tl.fromTo(targets, { ...part.from }, {
              x: 0, y: 0, yPercent: 0, rotateX: 0, rotate: 0, scale: 1, opacity: 1,
              ...("clipPath" in part.from ? { clipPath: "inset(0% 0% 0% 0%)" } : {}),
              duration: .75,
              stagger: part.stagger ?? 0,
              ease: "back.out(1.35)",
              clearProps: "transform,opacity,clipPath",
            }, part.at);
          }

          const progress = { value: 0 };
          tl.to(progress, {
            value: 100, duration: 3.6, ease: "power1.inOut",
            onUpdate: () => {
              const percent = Math.round(progress.value);
              status.textContent = percent < 100
                ? `${english ? "building" : "montando"} ${percent}%`
                : english ? "page ready" : "página pronta";
            },
          }, .1);
          tl.to(cursor, { x: window.innerWidth + 40, opacity: 0, duration: .45, ease: "power2.in" }, 3.55);
          tl.fromTo(scan, { yPercent: -100, opacity: 1 }, { yPercent: 700, opacity: 1, duration: .8, ease: "power2.inOut" }, 3.7);
          tl.to([grid, scan], { opacity: 0, duration: .3 }, 4.35);
          tl.to(hud, { y: 30, opacity: 0, duration: .35 }, 4.7);

          // The initial state is now inline on every part, so the CSS hold can be lifted.
          release();
        }, document.body);
      }).catch(release);
    };

    function dismiss() {
      if (blueprint && window.scrollY > 40) clear();
    }
    window.addEventListener("portfolio-intro-complete", build);
    window.addEventListener("resize", clear);
    window.addEventListener("scroll", dismiss, { passive: true });

    return () => {
      disposed = true;
      window.removeEventListener("portfolio-intro-complete", build);
      window.removeEventListener("resize", clear);
      window.removeEventListener("scroll", dismiss);
      clear();
    };
  }, []);

  return null;
}
