"use client";

import { useEffect, useRef } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Portfolio palette — sumi-nagashi inks */
const INKS = [
  { r: 126, g: 182, b: 255 }, // accent
  { r: 88, g: 130, b: 210 }, // deep blue
  { r: 168, g: 200, b: 255 }, // accent-secondary
  { r: 60, g: 90, b: 160 }, // navy ink
  { r: 100, g: 150, b: 200 }, // slate blue
] as const;

type Filament = {
  phase: number;
  speed: number;
  amp: number;
  thickness: number;
  yBase: number;
  ink: (typeof INKS)[number];
  alpha: number;
  drift: number;
};

type Wake = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  ink: (typeof INKS)[number];
};

const FADE_SCROLL_START = 100;
const FADE_SCROLL_END = 1500;

export function CursorGlow() {
  const reduced = useReducedMotion();
  const mobile = useMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced || mobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };
    let scrollY = 0;
    let raf = 0;
    let t = 0;
    const wakes: Wake[] = [];

    const filaments: Filament[] = Array.from({ length: 9 }, (_, i) => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.18 + Math.random() * 0.28,
      amp: 28 + Math.random() * 55,
      thickness: 18 + Math.random() * 42,
      yBase: 0.12 + (i / 9) * 0.7 + (Math.random() - 0.5) * 0.06,
      ink: INKS[i % INKS.length],
      alpha: 0.04 + Math.random() * 0.05,
      drift: (Math.random() - 0.5) * 0.15,
    }));

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const onMove = (e: MouseEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const dx = mouse.x - (mouse.px < 0 ? mouse.x : mouse.px);
      const dy = mouse.y - (mouse.py < 0 ? mouse.y : mouse.py);
      const speed = Math.min(Math.hypot(dx, dy), 70);

      if (speed > 1.5 && wakes.length < 36) {
        wakes.push({
          x: mouse.x + (Math.random() - 0.5) * 14,
          y: mouse.y + (Math.random() - 0.5) * 14,
          vx: dx * 0.06 + (Math.random() - 0.5) * 0.35,
          vy: dy * 0.06 + (Math.random() - 0.5) * 0.35,
          life: 1,
          size: 40 + speed * 1.1 + Math.random() * 24,
          ink: INKS[Math.floor(Math.random() * INKS.length)],
        });
      }
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const drawFilament = (f: Filament, w: number, h: number, time: number) => {
      const steps = 48;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = u * w;
        let y =
          f.yBase * h +
          Math.sin(u * Math.PI * 2.4 + time * f.speed + f.phase) * f.amp +
          Math.sin(u * Math.PI * 5.1 - time * f.speed * 0.6 + f.phase) * (f.amp * 0.35);

        // mouse disturbance — ink swirls away like sumi-nagashi
        if (mouse.active && mouse.x > 0) {
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          if (dist < 280) {
            const force = (1 - dist / 280) ** 2;
            const ang = Math.atan2(y - mouse.y, x - mouse.x);
            y += Math.sin(ang + time) * force * 28;
            // slight lateral push stored via x offset in curve
          }
        }

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const { r, g, b } = f.ink;
      ctx.strokeStyle = `rgba(${r},${g},${b},${f.alpha})`;
      ctx.lineWidth = f.thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // soft bloom under the ribbon
      ctx.strokeStyle = `rgba(${r},${g},${b},${f.alpha * 0.45})`;
      ctx.lineWidth = f.thickness * 2.2;
      ctx.stroke();
    };

    const drawGlassLens = (x: number, y: number, speed: number, angle: number) => {
      const radius = 130 + speed * 0.6;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const stretch = 1 + speed * 0.018;
      ctx.scale(stretch, 1 / Math.sqrt(stretch));

      // frosted glass body — barely there, Apple liquid-glass feel
      const body = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius);
      body.addColorStop(0, "rgba(180, 205, 245, 0.07)");
      body.addColorStop(0.35, "rgba(110, 150, 210, 0.045)");
      body.addColorStop(0.7, "rgba(80, 120, 180, 0.02)");
      body.addColorStop(1, "rgba(80, 120, 180, 0)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      // specular rim (top-left highlight) — liquid glass edge
      const rim = ctx.createRadialGradient(
        -radius * 0.28,
        -radius * 0.32,
        0,
        -radius * 0.1,
        -radius * 0.15,
        radius * 0.85,
      );
      rim.addColorStop(0, "rgba(255, 255, 255, 0.055)");
      rim.addColorStop(0.35, "rgba(200, 220, 255, 0.025)");
      rim.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // thin cool edge ring
      ctx.strokeStyle = "rgba(170, 200, 255, 0.06)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.72, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      const scrollFade = Math.max(
        0,
        1 - (scrollY - FADE_SCROLL_START) / (FADE_SCROLL_END - FADE_SCROLL_START),
      );

      if (scrollFade <= 0.02) {
        raf = requestAnimationFrame(tick);
        return;
      }

      ctx.globalAlpha = scrollFade;
      ctx.globalCompositeOperation = "lighter";

      // sumi-nagashi flowing ribbons
      ctx.save();
      ctx.filter = "blur(18px)";
      for (const f of filaments) {
        drawFilament(f, w, h, t);
      }
      ctx.restore();

      // ink wakes from mouse — portfolio blues only
      ctx.globalCompositeOperation = "lighter";
      for (let i = wakes.length - 1; i >= 0; i--) {
        const d = wakes[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.97;
        d.vy *= 0.97;
        d.life -= 0.014;
        d.size *= 1.01;

        if (d.life <= 0) {
          wakes.splice(i, 1);
          continue;
        }

        const a = d.life * d.life * 0.55;
        const { r, g, b } = d.ink;
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size);
        grad.addColorStop(0, `rgba(${r},${g},${b},${0.1 * a})`);
        grad.addColorStop(0.45, `rgba(${r},${g},${b},${0.04 * a})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // liquid glass lens on cursor
      if (mouse.active && mouse.x > 0) {
        const dx = mouse.x - (mouse.px < 0 ? mouse.x : mouse.px);
        const dy = mouse.y - (mouse.py < 0 ? mouse.y : mouse.py);
        const speed = Math.min(Math.hypot(dx, dy), 55);
        const angle = Math.atan2(dy, dx);

        ctx.globalCompositeOperation = "source-over";
        drawGlassLens(mouse.x, mouse.y, speed, angle);

        // soft accent tint behind glass (not white)
        const tint = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          200,
        );
        tint.addColorStop(0, "rgba(126, 182, 255, 0.05)");
        tint.addColorStop(0.5, "rgba(88, 130, 210, 0.025)");
        tint.addColorStop(1, "rgba(88, 130, 210, 0)");
        ctx.fillStyle = tint;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "none";
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, mobile]);

  if (reduced || mobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 hidden md:block"
      aria-hidden="true"
    />
  );
}
