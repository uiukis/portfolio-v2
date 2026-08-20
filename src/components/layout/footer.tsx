"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { Separator } from "@/components/ui/separator";
import { AnimatedText } from "@/components/ui/animated-text";
import { fadeUp, defaultViewport } from "@/lib/motion";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeUp}
      className="border-t border-border/60 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))]"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-tight text-foreground">
            {siteConfig.name}
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-accent"
            >
              .
            </motion.span>
          </p>
          <AnimatedText
            as="p"
            text={t.footer.role}
            className="mt-1 text-sm text-muted-foreground"
          />
          <p className="mt-2 text-xs text-muted-foreground">{t.footer.belfry}</p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex gap-6" role="list">
            {[
              { label: "LinkedIn", href: siteConfig.linkedin, external: true },
              { label: "GitHub", href: siteConfig.github, external: true },
              { label: "Email", href: `mailto:${siteConfig.email}`, external: false },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="focus-ring group relative rounded-md text-sm text-muted transition-colors hover:text-accent"
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Separator className="my-8" />

      <p className="mx-auto max-w-6xl px-6 text-center text-xs text-muted-foreground">
        © {year} {siteConfig.name}. <AnimatedText text={t.footer.builtWith} />
      </p>
    </motion.footer>
  );
}
