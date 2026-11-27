"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { MotionScene } from "@/components/ui/motion-scene";

export function ContactSection() {
  const { t } = useI18n();
  return (
    <section id="contact" className="contact-studio" aria-labelledby="contact-heading">
      <MotionScene stagger className="mx-auto max-w-6xl px-4 md:px-6">
        <p data-scene-part className="mb-5 text-sm text-accent">{t.contact.label}</p>
        <h2 data-scene-part id="contact-heading">{t.contact.title}</h2>
        <p data-scene-part className="mt-5 max-w-xl text-base leading-relaxed text-muted">{t.contact.description}</p>
        <Link data-scene-part href={`mailto:${siteConfig.email}`} className="contact-email focus-ring">{siteConfig.email}</Link>
        <div data-scene-part className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
          <Link href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring py-2 text-sm text-muted hover:text-foreground">LinkedIn</Link>
          <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="focus-ring py-2 text-sm text-muted hover:text-foreground">GitHub</Link>
          <Link href={siteConfig.cvPath} download className="focus-ring py-2 text-sm text-muted hover:text-foreground">{t.hero.ctaCv}</Link>
        </div>
      </MotionScene>
    </section>
  );
}
