/**
 * Shared finite timeline for the website and the HyperFrames composition.
 * All geometry is measured once, before building the paused timeline.
 */
export function createBrandIntro(gsap, root, destination, onComplete) {
  const bounds = root.getBoundingClientRect();
  const centerX = bounds.width / 2;
  const centerY = bounds.height / 2;
  const mark = root.querySelector(".brand-intro-mark");
  const name = root.querySelector(".brand-intro-name");
  const flight = root.querySelector(".brand-intro-flight");
  const paths = mark.querySelectorAll("path");
  const timeline = gsap.timeline({ paused: true, onComplete });

  for (const path of paths) {
    const length = path.getTotalLength();
    timeline.fromTo(path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: .85, ease: "power2.inOut" }, 0);
  }
  timeline.fromTo(mark,
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: .78, duration: .3, ease: "power3.in" }, .85);
  timeline.fromTo(name,
    { opacity: 0, y: 12, filter: "blur(9px)", clipPath: "inset(0 45% 0 45%)" },
    { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0 0% 0 0%)", duration: .65, ease: "power4.out" }, .95);
  timeline.fromTo(flight,
    { x: 0, y: 0, scale: 1 },
    { x: destination.x - bounds.left - centerX, y: destination.y - bounds.top - centerY,
      scale: destination.width / 120, duration: .9, ease: "power3.inOut" }, 1.7);
  timeline.fromTo(name,
    { opacity: 1, filter: "blur(0px)" },
    { opacity: 0, filter: "blur(4px)", duration: .22, ease: "power2.in" }, 2.35);
  timeline.fromTo(mark,
    { opacity: 0, scale: .78 },
    { opacity: 1, scale: 1, duration: .35, ease: "power4.out" }, 2.48);
  timeline.fromTo(root.querySelector(".brand-intro-scrim"),
    { opacity: 1 }, { opacity: 0, duration: .4, ease: "power2.inOut" }, 2.6);
  timeline.fromTo(root.querySelector(".brand-intro-skip"),
    { opacity: 1 }, { opacity: 0, duration: .15 }, 2.6);
  return timeline;
}
