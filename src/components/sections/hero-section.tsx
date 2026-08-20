"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, FileDown, Layers, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { HeroTerminal } from "@/components/brand/hero-terminal";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerFast } from "@/lib/motion";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.3 0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

export function HeroSection() {
  const { t } = useI18n();

  const actions = [
    {
      href: siteConfig.github,
      label: t.hero.ctaGithub,
      variant: "default" as const,
      icon: <GitHubIcon />,
      external: true,
    },
    {
      href: "#systems",
      label: t.hero.ctaSystems,
      variant: "outline" as const,
      icon: <Layers size={16} aria-hidden="true" />,
    },
    {
      href: "#contact",
      label: t.hero.ctaContact,
      variant: "outline" as const,
      icon: <MessageCircle size={16} aria-hidden="true" />,
    },
    {
      href: siteConfig.cvPath,
      label: t.hero.ctaCv,
      variant: "outline" as const,
      icon: <FileDown size={16} aria-hidden="true" />,
      download: true,
    },
  ];

  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="dot-field absolute inset-0 opacity-80" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-28 md:px-6 md:pb-28 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerFast}
            className="max-w-xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-[15px] font-medium text-muted md:text-base"
            >
              {t.hero.availability}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              id="hero-heading"
              className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-[3.75rem] lg:leading-[1.05]"
            >
              {t.hero.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-xl font-medium text-foreground/90 md:text-2xl"
            >
              {t.hero.headline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[15px] leading-relaxed text-muted md:text-base"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-[14px] leading-relaxed text-muted-foreground md:text-[15px]"
            >
              {t.hero.subheadlineSecondary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {actions.map((action) => (
                <Button key={action.href + action.label} asChild variant={action.variant} size="lg">
                  <Link
                    href={action.href}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(action.download ? { download: true } : {})}
                  >
                    {action.icon}
                    {action.label}
                  </Link>
                </Button>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-2">
              {t.hero.tags.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-muted"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <HeroTerminal className="lg:justify-self-stretch" />
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <ArrowDown size={18} className="text-white/35" />
      </motion.div>
    </section>
  );
}
