"use client";

import { useEffect } from "react";
import { loadGsap, type SceneGsap, type SceneTimeline } from "@/lib/gsap";

type Scrub = {
  selector: string;
  build(timeline: SceneTimeline, element: Element): void;
};

const ease = "none";

/** Each rule maps a selector to a timeline scrubbed 0→1 while the element crosses the viewport. */
const scrubs: Scrub[] = [
  {
    selector: ".project-shot",
    build: (tl, el) => {
      tl.fromTo(el, { yPercent: 9, scale: .93, rotate: -1.6, z: 30 }, { yPercent: -7, scale: 1.03, rotate: 1.4, z: 60, duration: 1, ease }, 0);
      // Rack focus: the artwork resolves while it crosses the reading line, then softens as it leaves.
      tl.fromTo(el, { "--dof": 9 }, { "--dof": 0, duration: .3, ease: "power2.out" }, 0);
      tl.fromTo(el, { "--dof": 0 }, { "--dof": 6, duration: .25, ease: "power1.in", immediateRender: false }, .75);
    },
  },
  {
    selector: ".project-brand",
    build: (tl, el) => tl.fromTo(el, { y: 60, scale: .4, rotate: -16, opacity: 0 }, { y: 0, scale: 1, rotate: -3, opacity: 1, duration: .36, ease: "back.out(1.8)" }, .1),
  },
  {
    selector: ".project-scribble path",
    build: (tl, el) => tl.fromTo(el, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .3, ease: "power2.inOut" }, .12),
  },
  {
    // Camera flight: each showcase swings in from depth on an alternating side, then drifts away on the other.
    selector: ".project-story-featured",
    build: (tl, el) => {
      const side = el.classList.contains("project-story-easycards") ? 1 : -1;
      tl.fromTo(el, { rotateY: side * 15, rotateX: 9, z: -260, transformPerspective: 1400 }, { rotateY: 0, rotateX: 0, z: 0, duration: .4, ease: "power3.out" }, 0);
      tl.fromTo(el, { rotateY: 0, rotateX: 0, z: 0 }, { rotateY: -side * 9, rotateX: -5, z: -170, duration: .3, ease: "power2.in", immediateRender: false }, .7);
    },
  },
  {
    selector: ".chart-bar",
    build: (tl, el) => tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: .5, ease: "power3.out" }, 0),
  },
  {
    selector: ".project-index",
    build: (tl, el) => tl.fromTo(el, { yPercent: 40, opacity: 0 }, { yPercent: -40, opacity: 1, duration: 1, ease }),
  },
  {
    selector: ".project-story-featured h4",
    build: (tl, el) => tl.fromTo(el, { xPercent: -5, letterSpacing: "-0.02em" }, { xPercent: 0, letterSpacing: "-0.055em", duration: .55, ease: "power2.out" }),
  },
  {
    selector: ".career-entry-line",
    build: (tl, el) => tl.fromTo(el, { "--line": 0 }, { "--line": 1, duration: .6, ease: "power2.out" }),
  },
  {
    selector: ".cap-icon",
    build: (tl, el) => tl.fromTo(el, { rotate: -140, scale: .6 }, { rotate: 0, scale: 1, duration: .5, ease: "back.out(1.6)" }),
  },
  {
    selector: "#capabilities li",
    build: (tl, el) => tl.fromTo(el, { y: 14, opacity: .2 }, { y: 0, opacity: 1, duration: .5, ease: "power2.out" }),
  },
  {
    selector: ".quote-text",
    // Reading light: the words brighten one after another as the quote climbs the screen.
    build: (tl, el) => tl.fromTo(el.querySelectorAll(".quote-word"), { opacity: .12, y: 10 }, { opacity: 1, y: 0, duration: .07, stagger: .011, ease: "power1.out" }, .02),
  },
  {
    selector: ".contact-studio h2",
    build: (tl, el) => tl.fromTo(el, { xPercent: -4, opacity: .3 }, { xPercent: 0, opacity: 1, duration: .55, ease: "power3.out" }),
  },
  {
    selector: ".count-num",
    build: (tl, el) => tl.fromTo(el, { "--n": 0 }, { "--n": Number((el as HTMLElement).style.getPropertyValue("--to")) || 0, duration: .22, ease: "power2.out" }),
  },
];

const fine = "(hover: hover) and (pointer: fine)";

/** Scroll-scrubbed GSAP timelines plus pointer tilt for project stages. No-op under reduced motion. */
export function ScrollChoreography() {
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tracked = new Map<Element, SceneTimeline>();
    const cleanups: (() => void)[] = [];
    let frame: number | undefined;
    let gsapRuntime: SceneGsap | undefined;
    let disposed = false;
    let context: { revert(): void } | undefined;

    function render() {
      frame = undefined;
      const vh = window.innerHeight;
      tracked.forEach((tl, el) => {
        const rect = el.getBoundingClientRect();
        // The scrubbed transform shifts rect slightly; the range stays stable enough for a scrub.
        const progress = (vh * .95 - rect.top) / (vh * .95 + rect.height * .6);
        tl.seek(Math.min(1, Math.max(0, progress)));
      });
    }
    const queue = () => {
      if (frame === undefined && tracked.size) frame = requestAnimationFrame(render);
    };

    // Touch screens have no hover: the demo plays by itself while its project is on screen.
    // The frame is observed, not the video: the video starts fully clipped.
    const watched = new Set<HTMLElement>();
    const autoplay = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const frame = entry.target as HTMLElement;
        const video = frame.querySelector<HTMLVideoElement>(".project-peek");
        if (!video) continue;
        if (entry.intersectionRatio >= .6) {
          video.muted = true;
          video.preload = "auto";
          // Reveal only once it really plays, so a blocked autoplay keeps the print visible.
          void video.play().then(() => { frame.dataset.playing = "1"; }).catch(() => undefined);
        } else {
          video.pause();
          delete frame.dataset.playing;
        }
      }
    }, { threshold: [0, .6] });

    // Headings reveal once, on their own clock: tied to the scroll position they could rest half-written.
    const headings = new Map<Element, SceneTimeline>();
    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal.unobserve(entry.target);
        headings.get(entry.target)?.play();
      }
    }, { rootMargin: "0px 0px -12% 0px" });

    function scan() {
      const gsap = gsapRuntime;
      if (!gsap || motion.matches) return;
      context ??= gsap.context(() => undefined, main!);
      for (const rule of scrubs) {
        main!.querySelectorAll(rule.selector).forEach((el) => {
          if (tracked.has(el)) return;
          const tl = gsap.timeline({ paused: true });
          rule.build(tl, el);
          tracked.set(el, tl);
        });
      }
      main!.querySelectorAll(".section-heading h2").forEach((heading) => {
        if (headings.has(heading) || heading.getBoundingClientRect().top < window.innerHeight) return;
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(heading.querySelectorAll(".w-i"), { yPercent: 115 }, { yPercent: 0, duration: .8, stagger: .08, ease: "power3.out" });
        headings.set(heading, tl);
        reveal.observe(heading);
      });
      if (!window.matchMedia(fine).matches) {
        main!.querySelectorAll<HTMLElement>(".project-frame").forEach((frame) => {
          if (watched.has(frame)) return;
          watched.add(frame);
          autoplay.observe(frame);
        });
      }
      main!.querySelectorAll<HTMLElement>(".project-stage").forEach((stage) => {
        if (stage.dataset.tilt || !window.matchMedia(fine).matches) return;
        stage.dataset.tilt = "1";
        const move = (event: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          const x = (event.clientX - r.left) / r.width - .5;
          const y = (event.clientY - r.top) / r.height - .5;
          gsap.to(stage, { rotateY: x * 7, rotateX: -y * 5, duration: .6, ease: "power3.out", transformPerspective: 900 });
        };
        const peek = stage.querySelector<HTMLVideoElement>(".project-peek");
        const enter = () => {
          if (!peek) return;
          peek.preload = "auto";
          void peek.play().catch(() => undefined);
          gsap.to(peek, { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: .9, ease: "power3.inOut", overwrite: "auto" });
        };
        const leave = () => {
          gsap.to(stage, { rotateY: 0, rotateX: 0, duration: .9, ease: "power3.out" });
          if (peek) gsap.to(peek, { clipPath: "inset(100% 0% 0% 0% round 14px)", duration: .7, ease: "power3.inOut", overwrite: "auto" });
        };
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerenter", enter);
        stage.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerenter", enter);
          stage.removeEventListener("pointerleave", leave);
          peek?.pause();
          delete stage.dataset.tilt;
        });
      });
      queue();
    }

    function teardown() {
      tracked.forEach((tl) => tl.kill());
      tracked.clear();
      autoplay.disconnect();
      reveal.disconnect();
      headings.forEach((tl, heading) => {
        tl.kill();
        heading.querySelectorAll<HTMLElement>(".w-i").forEach((word) => { word.style.transform = ""; });
      });
      headings.clear();
      watched.forEach((frame) => {
        frame.querySelector("video")?.pause();
        delete frame.dataset.playing;
      });
      watched.clear();
      cleanups.splice(0).forEach((fn) => fn());
      context?.revert();
      context = undefined;
      main!.querySelectorAll<HTMLElement>(".project-stage, .project-story-featured").forEach((s) => {
        s.style.transform = "";
      });
    }

    const start = () => {
      if (motion.matches) return teardown();
      void loadGsap().then((gsap) => {
        if (disposed) return;
        gsapRuntime = gsap;
        scan();
      }).catch(() => {
        // Content stays static if GSAP cannot load.
      });
    };

    // Sections mount lazily and change height, so rescan whenever the page layout moves.
    const observer = new ResizeObserver(() => { scan(); queue(); });
    observer.observe(main);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    motion.addEventListener("change", start);
    start();

    return () => {
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      motion.removeEventListener("change", start);
      teardown();
    };
  }, []);

  return null;
}
