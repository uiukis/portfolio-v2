"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { BootIntro } from "@/components/brand/boot-intro";
import { HeroCuriosities } from "@/components/brand/hero-curiosities";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { Magnetic } from "@/components/ui/magnetic";
import { fadeUp, staggerFast } from "@/lib/motion";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false },
);

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="grid-bg absolute inset-0 -z-20" aria-hidden="true" />
      <HeroScene />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-16">
          <div>
            <BootIntro />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerFast}
              className="max-w-xl"
            >
              <motion.p variants={fadeUp} className="text-xl font-medium md:text-3xl">
                <span className="gradient-text">
                  <AnimatedText text={t.hero.headline} effect="typewriter" />
                </span>
              </motion.p>

              <motion.div variants={fadeUp} className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                <AnimatedText as="p" text={t.hero.subheadline} effect="typewriter" />
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <Magnetic>
                  <Button asChild size="lg" className="shimmer-btn">
                    <Link href="#systems">
                      <AnimatedText text={t.hero.ctaSystems} />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#contact">
                      <AnimatedText text={t.hero.ctaContact} />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <Button asChild variant="outline" size="lg">
                    <Link href={siteConfig.cvPath} download>
                      <FileDown size={16} aria-hidden="true" />
                      <AnimatedText text={t.hero.ctaCv} />
                    </Link>
                  </Button>
                </Magnetic>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-14 flex flex-wrap gap-3 border-t border-border/80 pt-8"
              >
                {t.hero.tags.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="rounded-full border border-border/80 bg-surface-elevated px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <HeroCuriosities floating className="hidden lg:block lg:justify-self-end" />
        </div>

        <HeroCuriosities className="mt-14 lg:hidden" />
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <ArrowDown size={18} className="text-accent/50" />
      </motion.div>
    </section>
  );
}
