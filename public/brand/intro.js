/**
 * The browser and HyperFrames preview use the same seekable composition.
 * @param {Element | null} [reveal] The page content behind the intro in the browser.
 */
export function createBrandIntro(gsap, root, destination, onComplete, reveal = null) {
  const mark = root.querySelector(".brand-intro-mark");
  const name = root.querySelector(".brand-intro-name");
  const flight = root.querySelector(".brand-intro-flight");
  const [letter, cursor] = mark.querySelectorAll("path");
  const markBounds = mark.getBoundingClientRect();
  const nameBounds = name.getBoundingClientRect();
  const centerX = markBounds.left + markBounds.width / 2;
  const centerY = markBounds.top + markBounds.height / 2;
  const nameSize = parseFloat(getComputedStyle(name).fontSize);
  const steps = `steps(${[...name.textContent.trim()].length})`;
  const timeline = gsap.timeline({ paused: true, onComplete });

  timeline
    .fromTo(letter, { opacity: 0 }, { opacity: 1, duration: .09 }, .12)
    .fromTo(cursor, { opacity: 0 }, { opacity: 1, duration: .12 }, .24)
    .fromTo(flight, { x: 0, y: 0, scale: 1 }, {
      x: nameBounds.left - nameSize * .39 - centerX,
      scale: nameSize * 1.85 / markBounds.width,
      duration: .46,
      ease: "power3.inOut",
    }, .40)
    .to(cursor, { opacity: 0, duration: .17 }, .65)
    .fromTo(name, { opacity: 0 }, { opacity: 1, duration: .08 }, .77)
    .fromTo(name, { "--typed": "0%" }, { "--typed": "100%", duration: .87, ease: steps }, .77)
    .to(name, { "--typed": "0%", duration: .49, ease: steps }, 1.96)
    .to(name, { opacity: 0, duration: .12 }, 2.43)
    .to(cursor, { opacity: 1, duration: .14 }, 2.43)
    .to(flight, {
      x: destination.x - centerX,
      y: destination.y - centerY,
      scale: destination.width / markBounds.width,
      duration: 1.07,
      ease: "power3.inOut",
    }, 2.53)
    .fromTo(root.querySelector(".brand-intro-scrim"), { opacity: 1 }, { opacity: 0, duration: .76, ease: "power2.inOut" }, 2.84)
    .fromTo(root.querySelector(".brand-intro-skip"), { opacity: 1 }, { opacity: 0, duration: .21 }, 2.70);

  if (reveal) {
    timeline.fromTo(reveal,
      { y: 14, opacity: .70 },
      { y: 0, opacity: 1, duration: .64, ease: "power3.out" },
      2.92);
  }

  return timeline;
}
