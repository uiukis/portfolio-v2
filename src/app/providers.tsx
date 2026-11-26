"use client";

import { MotionConfig } from "framer-motion";
import { I18nProvider } from "@/providers/i18n-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user"><I18nProvider>{children}</I18nProvider></MotionConfig>;
}
