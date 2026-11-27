"use client";

import { Fragment } from "react";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { HeroStage } from "@/components/sections/hero-stage";

export function HeroSection() {
  const { t } = useI18n();
  const stack = t.hero.subheadlineSecondary.split(" · ");

  return (
    <section id="intro" className="hero-studio" aria-labelledby="hero-heading">
      <div className="hero-horizon" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div data-brand-reveal>
          <div className="hero-introduction">
            <div className="hero-meta">
              <p className="text-sm text-accent">{t.hero.headline}</p>
              <p className="text-sm text-muted">{t.hero.availability}</p>
            </div>
            <div className="hero-grid">
              <h1 id="hero-heading" className="hero-display" aria-label={t.hero.name}>
              {t.hero.name.split(" ").map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  {index > 0 ? " " : null}
                  <span className="hero-word" aria-hidden="true">
                    {[...word].map((letter, position) => <span key={position} className="hero-letter">{letter}</span>)}
                  </span>
                </Fragment>
              ))}
            </h1>
              <HeroStage />
              <div className="hero-about">
                <p className="hero-description">{t.hero.subheadline}</p>
                <div className="hero-actions">
                  <Button asChild size="lg" className="bg-accent text-background hover:bg-accent-secondary"><Link href="#systems">{t.hero.ctaSystems}</Link></Button>
                  <Button asChild variant="outline" size="lg"><Link href="#contact">{t.hero.ctaContact}</Link></Button>
                  <Link className="focus-ring inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted hover:text-foreground" href={siteConfig.cvPath} download>
                    <FileDown size={15} aria-hidden="true" />{t.hero.ctaCv}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-strip">
            <div className="hero-marquee-window">
              <div className="hero-marquee">
                {[0, 1, 2, 3].map((copy) => (
                  <ul key={copy} aria-hidden={copy > 0 || undefined}>
                    {stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
