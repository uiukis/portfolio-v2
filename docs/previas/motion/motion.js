// Each line is a slice through the same signal field. Render once at initialization.
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const { width, height } = canvas;
for (let lane = 0; lane < 84; lane++) {
  const depth = lane / 83;
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, '#2b999a');
  gradient.addColorStop(.48, '#8cd4c8');
  gradient.addColorStop(1, '#8e80dc');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1.45;
  ctx.globalAlpha = .23 + depth * .56;
  ctx.beginPath();
  for (let x = 0; x <= width; x += 4) {
    const u = x / width;
    const crest = Math.sin(u * 6.8 + depth * 4.7);
    const fold = Math.exp(-Math.pow((u - .64 + depth * .22) / .3, 2));
    const y = height * (.1 + depth * .9 + crest * (.12 + fold * .14) + .05 * Math.cos(u * 11 - depth * 6));
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

const views = ['#sessions', '#usage', '#closed'];
const timeline = gsap.timeline({ paused: true });
timeline.fromTo(canvas, { scale: 1.04 }, { scale: 1.17, xPercent: -2, duration: 12, ease: 'sine.inOut' }, 0);
views.forEach((view, index) => {
  if (index > 0) {
    timeline.to(views[index - 1], { opacity: 0, y: -12, scale: .96, duration: .35 }, index * 4)
      .fromTo(view, { opacity: 0, y: 12, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .45, immediateRender: false }, index * 4 + .15);
  }
});
window.__timelines = { 'nook-portfolio': timeline };

// The standalone player drives the same finite timeline as the composition.
if (location.hash === '#preview') {
  const buttons = [...document.querySelectorAll('[data-chapter]')];
  const toggle = document.querySelector('.toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let automatic = !reduced.matches;
  function sync() {
    const chapter = Math.min(2, Math.floor(timeline.time() / 4));
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === chapter)));
    toggle.textContent = timeline.progress() >= 1 ? 'Rever' : timeline.paused() ? 'Reproduzir' : 'Pausar';
  }
  buttons.forEach((button, i) => button.onclick = () => {
    automatic = false;
    timeline.pause(i * 4 + .7);
    sync();
  });
  toggle.onclick = () => {
    automatic = false;
    if (timeline.progress() >= 1) timeline.restart();
    else timeline.paused(!timeline.paused());
    sync();
  };
  timeline.eventCallback('onUpdate', sync);
  reduced.addEventListener('change', () => {
    if (reduced.matches) { automatic = false; timeline.pause(); sync(); }
  });
  new IntersectionObserver(([entry]) => {
    if (automatic) {
      if (entry.isIntersecting) timeline.play();
      else timeline.pause();
      sync();
    }
  }).observe(canvas);
} else {
  document.querySelector('nav').hidden = true;
}
