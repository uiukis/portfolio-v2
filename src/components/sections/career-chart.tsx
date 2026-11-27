"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/providers/i18n-provider";

const START = 2021;
const END = 2027;
// Decimal years taken from the periods in the dictionaries. Cerus Bank only says "current", so its start is an editorial estimate.
const spans: Record<string, [number, number]> = {
  "Rodobank": [2021.08, 2021.33],
  "Reali Imobiliária": [2021.92, 2023.4],
  "Cometa Supermercados": [2023.5, 2025.55],
  "s4S": [2025.58, 2026.4],
  "Cerus Bank": [2026.4, END],
};
const years = Array.from({ length: END - START + 1 }, (_, i) => START + i);
const pct = (year: number) => `${((year - START) / (END - START)) * 100}%`;

/** A career Gantt with a playhead scrubbed by scroll, running newest to oldest like the list below it. */
export function CareerChart() {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState(END);
  const rows = [...t.experience.items].reverse();

  useEffect(() => {
    const element = root.current;
    const list = document.querySelector(".career-timeline");
    if (!element || !list) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      if (motion.matches) return;
      const rect = list.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * .55 - rect.top) / rect.height));
      const at = END - progress * (END - START);
      element.style.setProperty("--p", String((at - START) / (END - START)));
      setYear(at);
    };
    const queue = () => { if (frame === undefined) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const distance = (company: string) => {
    const [from, to] = spans[company] ?? [END, END];
    return year < from ? from - year : year > to ? year - to : 0;
  };
  const current = rows.reduce((best, item) => (distance(item.company) < distance(best.company) ? item : best), rows[0]);

  return (
    <div ref={root} className="career-chart" aria-hidden="true" style={{ "--p": 1 } as React.CSSProperties}>
      <p className="chart-readout"><strong>{current.company}</strong><span>{current.role} · {current.period}</span></p>
      <div className="chart-plot">
        {years.map((y) => <span key={y} className="chart-tick" style={{ left: pct(y) }}>{y}</span>)}
        {rows.map((item) => {
          const [from, to] = spans[item.company] ?? [END, END];
          return (
            <div key={item.company} className="chart-row" data-active={item.company === current.company}>
              <span className="chart-bar" data-flip={to > END - 1} style={{ left: pct(from), width: `${((to - from) / (END - START)) * 100}%` }}>
                <em>{item.company}</em>
              </span>
            </div>
          );
        })}
        <span className="chart-playhead" />
      </div>
    </div>
  );
}
