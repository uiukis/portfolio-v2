"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Share2, Code2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Magnetic } from "@/components/ui/magnetic";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";

export function ContactSection() {
  const { t } = useI18n();

  const contactLinks = [
    {
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      description: t.contact.emailDesc,
    },
    {
      label: "LinkedIn",
      href: siteConfig.linkedin,
      icon: Share2,
      description: t.contact.linkedinDesc,
    },
    {
      label: "GitHub",
      href: siteConfig.github,
      icon: Code2,
      description: t.contact.githubDesc,
    },
  ] as const;

  return (
    <Section
      id="contact"
      index="07"
      label={t.contact.label}
      title={t.contact.title}
      description={t.contact.description}
      className="border-t border-border/60"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-3"
      >
        {contactLinks.map((link, i) => {
          const Icon = link.icon;
          const isExternal = link.href.startsWith("http");

          return (
            <motion.div key={link.label} variants={fadeUp} custom={i}>
              <GlowCard className="group h-full">
                <Link
                  href={link.href}
                  className="focus-ring flex h-full flex-col p-6"
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }}>
                    <Icon
                      size={24}
                      className="text-accent"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {link.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{link.description}</p>
                  <ArrowRight
                    size={16}
                    className="mt-auto pt-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </Link>
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeUp}
        className="mt-12 text-center"
      >
        <Magnetic>
          <Button asChild size="lg" className="shimmer-btn">
            <Link href={`mailto:${siteConfig.email}`}>
              <Mail size={18} aria-hidden="true" />
              {siteConfig.email}
            </Link>
          </Button>
        </Magnetic>
      </motion.div>
    </Section>
  );
}
