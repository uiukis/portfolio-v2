"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navHrefs, siteConfig } from "@/lib/site-config";
import { useI18n } from "@/providers/i18n-provider";
import { HeaderBrand } from "@/components/layout/header-brand";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.3 0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

export function Header() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!scrolled) setMobileOpen(false);
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
    >
      <div
        className={cn(
          "mx-auto transition-[max-width,margin,padding,border-radius,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "mt-3 max-w-[min(100%-1.5rem,56rem)] rounded-full border border-white/10 bg-[#0c1018]/82 px-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:px-4 md:mt-4 md:max-w-[min(100%-2rem,64rem)] md:px-5"
            : "mt-0 max-w-6xl border border-transparent bg-transparent px-4 py-0 md:px-6",
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between gap-3 transition-[height] duration-500",
            scrolled ? "h-12 md:h-14" : "h-14 md:h-16",
          )}
        >
          <HeaderBrand scrolled={scrolled} />

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 lg:flex"
            aria-label={t.a11y.mainNav}
          >
            {navHrefs.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring text-[13px] font-medium text-white/55 transition-colors hover:text-white"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher className="hidden sm:flex" />

            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "focus-ring items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-black transition-all duration-300 hover:bg-white/90",
                scrolled ? "hidden sm:inline-flex" : "hidden",
              )}
            >
              <GitHubIcon size={15} />
              <span>{t.header.github}</span>
            </Link>

            <button
              type="button"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className={cn(
              "mx-auto mt-2 overflow-hidden border border-white/10 bg-[#0c1018]/94 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] lg:hidden",
              scrolled
                ? "max-w-[min(100%-1.5rem,56rem)] rounded-3xl md:max-w-[min(100%-2rem,64rem)]"
                : "max-w-6xl rounded-2xl mx-4 md:mx-6",
            )}
          >
            <nav className="flex flex-col px-4 py-3" aria-label={t.a11y.mainNav}>
              <div className="mb-2 flex items-center justify-between gap-3 border-b border-white/10 pb-3 sm:hidden">
                <LanguageSwitcher />
                <Link
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  <GitHubIcon size={14} />
                  {t.header.github}
                </Link>
              </div>
              {navHrefs.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="focus-ring block py-3 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.nav[item.key]}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
