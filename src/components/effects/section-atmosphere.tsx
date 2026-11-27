"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type SceneTimeline } from "@/lib/gsap";

const scenes = [
  { id: "systems", color: "#663d35", x: 81, y: 43, angle: 125, texture: .28, rings: 1, ticks: 0, grid: 0 },
  { id: "project-nook", color: "#6d4430", x: 24, y: 48, angle: 110, texture: .3, rings: 1, ticks: 0, grid: 0 },
  { id: "project-easycards", color: "#6b5431", x: 78, y: 50, angle: 70, texture: .26, rings: 1, ticks: 0, grid: 0 },
  { id: "experience", color: "#4d354b", x: 18, y: 55, angle: 90, texture: .19, rings: 0, ticks: 1, grid: 0 },
  { id: "capabilities", color: "#3d4840", x: 77, y: 45, angle: 45, texture: .23, rings: 0, ticks: 0, grid: 1 },
  { id: "impact", color: "#634331", x: 51, y: 65, angle: 0, texture: .20, rings: 0, ticks: 0.5, grid: 0.6 },
  { id: "philosophy", color: "#503448", x: 36, y: 35, angle: -35, texture: .09, rings: 0.6, ticks: 0, grid: 0 },
  { id: "contact", color: "#5b3d38", x: 72, y: 75, angle: -55, texture: 0, rings: 0, ticks: 0, grid: 0 },
] as const;

export function SectionAtmosphere() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = layer.current;
    const main = element?.parentElement;
    if (!element || !main) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: SceneTimeline | undefined;
    let frame: number | undefined;
    let disposed = false;
    let context: { revert(): void } | undefined;
    let sections: { index: number; element: HTMLElement }[] = [];

    function render() {
      frame = undefined;
      const line = window.innerHeight * .38;
      let position = 0;
      for (const section of sections) {
        const top = section.element.getBoundingClientRect().top;
        const distance = (line - top) / (window.innerHeight * .55);
        if (distance <= 0) break;
        position = section.index + Math.min(1, distance);
      }
      timeline?.seek(Math.max(position, 0));
    }

    function queueFrame() {
      if (frame === undefined && timeline) frame = requestAnimationFrame(render);
    }

    const observer = new ResizeObserver(() => {
      sections = scenes.flatMap(({ id }, index) => {
        const section = document.getElementById(id);
        return section ? [{ element: section, index }] : [];
      });
      queueFrame();
    });
    observer.observe(main);

    const updateMotion = () => {
      context?.revert();
      context = undefined;
      timeline = undefined;
      if (motion.matches) return;

      void loadGsap().then((gsap) => {
        if (disposed || motion.matches || timeline) return;
        context = gsap.context(() => {
          const sequence = gsap.timeline({ paused: true });
          scenes.forEach((scene, index) => {
            sequence.to(element, {
              "--scene-color": scene.color,
              "--scene-x": `${scene.x}%`,
              "--scene-y": `${scene.y}%`,
              "--scene-angle": `${scene.angle}deg`,
              "--scene-texture": scene.texture,
              "--m-rings": scene.rings,
              "--m-ticks": scene.ticks,
              "--m-grid": scene.grid,
              duration: 1,
              ease: "sine.inOut",
            }, index);
          });
          timeline = sequence;
        }, element);
        queueFrame();
      }).catch(() => {
        // The static palette remains available if GSAP fails to load.
      });
    };

    window.addEventListener("scroll", queueFrame, { passive: true });
    window.addEventListener("resize", queueFrame);
    motion.addEventListener("change", updateMotion);
    updateMotion();

    return () => {
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      context?.revert();
      observer.disconnect();
      window.removeEventListener("scroll", queueFrame);
      window.removeEventListener("resize", queueFrame);
      motion.removeEventListener("change", updateMotion);
    };
  }, []);

  return <div ref={layer} className="section-atmosphere" aria-hidden="true">
      <span className="atm-rings" />
      <span className="atm-ticks" />
      <span className="atm-grid" />
    </div>;
}
