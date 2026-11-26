"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { useI18n } from "@/providers/i18n-provider";
import { siteConfig, projectImages, projectLinks } from "@/lib/site-config";
import { MotionScene } from "@/components/ui/motion-scene";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { t } = useI18n();
  const [featured, setFeatured] = useState<"nook" | "easycards">("nook");
  const projects = t.systems.groups.flatMap((group) => group.items);
  const project = projects.find((item) => item.id === featured)!;
  const image = projectImages[featured]!;

  return (
    <section className="hero-studio" aria-labelledby="hero-heading">
      <div className="hero-horizon" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <MotionScene variant="hero">
          <div className="hero-introduction">
            <div>
              <p data-motion-copy className="mb-5 text-sm text-muted">{t.hero.availability}</p>
              <h1 id="hero-heading" className="hero-display" aria-label={t.hero.name}>
                {t.hero.name.split(" ").map((word) => (
                  <span className="hero-word-mask" key={word} aria-hidden="true">
                    <span data-motion-word>{word}</span>
                  </span>
                ))}
              </h1>
            </div>
            <div className="hero-about">
              <p data-motion-copy className="text-sm font-medium text-accent">{t.hero.headline}</p>
              <p data-motion-copy className="hero-description">{t.hero.subheadline}</p>
              <div data-motion-copy className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link href="#systems">{t.hero.ctaSystems}</Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="#contact">{t.hero.ctaContact}</Link></Button>
              </div>
              <Link href="#experience" data-motion-copy className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {t.hero.currentRole}
              </Link>
            </div>
          </div>

          <div data-motion-panel className="hero-showcase">
            <div className="showcase-toolbar">
              <p className="text-sm text-muted">{t.hero.featuredLabel}</p>
              <div className="showcase-selector" role="group" aria-label={t.hero.featuredLabel}>
                <button type="button" aria-pressed={featured === "nook"} onClick={() => setFeatured("nook")}>Nook</button>
                <button type="button" aria-pressed={featured === "easycards"} onClick={() => setFeatured("easycards")}>Easy Cards</button>
              </div>
            </div>
            <MotionScene key={featured} className={`showcase-content showcase-${featured}`}>
              <div className="showcase-description">
                <p className="mb-3 text-sm text-muted">{project.category}</p>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">{project.title}</h2>
                <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-muted">{project.impact}</p>
                <Link href={projectLinks[featured]!} target="_blank" rel="noopener noreferrer" className="focus-ring mt-6 inline-flex min-h-11 items-center text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                  {t.systems.openProject}
                </Link>
              </div>
              <div className="showcase-visual">
                <Image src={image.src} alt={image.alt} width={1080} height={featured === "nook" ? 467 : 1076} priority sizes="(max-width: 768px) 90vw, 650px" />
              </div>
            </MotionScene>
          </div>
          <div className="hero-bottom">
            <p>{t.hero.subheadlineSecondary}</p>
            <Link className="focus-ring inline-flex min-h-11 items-center gap-2 hover:text-foreground" href={siteConfig.cvPath} download>
              <FileDown size={15} aria-hidden="true" />{t.hero.ctaCv}
            </Link>
          </div>
        </MotionScene>
      </div>
    </section>
  );
}
