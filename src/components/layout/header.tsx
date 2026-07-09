"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { navHrefs, siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { HeaderBrand } from "@/components/layout/header-brand";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AnimatedText } from "@/components/ui/animated-text";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 pt-[env(safe-area-inset-top)] font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-500",
        scrolled
          ? "border-b border-border/80 bg-background/95 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <HeaderBrand />

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t.a11y.mainNav}>
          {navHrefs.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring group relative text-muted-foreground transition-colors hover:text-accent"
            >
              <AnimatedText text={t.nav[item.key]} />
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="hidden text-accent sm:inline"
          >
            <AnimatedText text={t.hero.bootStatus} />
          </motion.span>
          <span className="hidden text-muted-foreground md:inline">{time}</span>
          <Link
            href={siteConfig.cvPath}
            download
            className="focus-ring hidden items-center gap-1.5 text-muted-foreground transition-colors hover:text-accent md:inline-flex"
          >
            <FileDown size={12} aria-hidden="true" />
            <AnimatedText text={t.hero.ctaCv} />
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            className="focus-ring flex h-11 w-11 items-center justify-center text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <motion.div
        id="mobile-menu"
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden border-t border-border/60 bg-background/98 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <nav className="flex flex-col px-4 py-3" aria-label={t.a11y.mainNav}>
          <div className="border-b border-border/60 pb-3 mb-1 space-y-3">
            <LanguageSwitcher />
            <Link
              href={siteConfig.cvPath}
              download
              className="focus-ring inline-flex items-center gap-2 text-muted-foreground hover:text-accent"
              onClick={() => setMobileOpen(false)}
            >
              <FileDown size={14} aria-hidden="true" />
              {t.hero.ctaCv}
            </Link>
          </div>
          {navHrefs.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ x: -12, opacity: 0 }}
              animate={mobileOpen ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                className="focus-ring block py-3 text-muted-foreground hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                <AnimatedText text={t.nav[item.key]} />
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
