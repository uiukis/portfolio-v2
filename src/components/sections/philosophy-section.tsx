"use client";

import { Fragment } from "react";
import { useI18n } from "@/providers/i18n-provider";
import { MotionScene } from "@/components/ui/motion-scene";

/** One span per word, so the quote can light up as it is scrolled. */
const words = (text: string) =>
  text.split(" ").map((word, index) => (
    <Fragment key={index}><span className="quote-word">{word}</span>{" "}</Fragment>
  ));

export function PhilosophySection() {
  const { t } = useI18n();
  return (
    <section id="philosophy" className="quote-section" aria-labelledby="philosophy-heading">
      <h2 id="philosophy-heading" className="sr-only">{t.philosophy.title}</h2>
      <MotionScene className="mx-auto max-w-4xl px-6">
        <blockquote>
          <p className="quote-text">
            {words(t.philosophy.quote)}
            <span className="quote-highlight">{words(t.philosophy.highlight)}</span>
          </p>
          <footer className="mt-7 text-sm leading-relaxed text-muted">{t.philosophy.footer}</footer>
        </blockquote>
      </MotionScene>
    </section>
  );
}
