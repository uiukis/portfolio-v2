"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { PageLoader } from "@/components/effects/page-loader";
import { HeroSection } from "@/components/sections/hero-section";

const PositioningSection = dynamic(
  () =>
    import("@/components/sections/positioning-section").then((m) => m.PositioningSection),
  { ssr: true },
);
const CapabilitiesSection = dynamic(
  () =>
    import("@/components/sections/capabilities-section").then((m) => m.CapabilitiesSection),
  { ssr: true },
);
const ImpactSection = dynamic(
  () => import("@/components/sections/impact-section").then((m) => m.ImpactSection),
  { ssr: true },
);
const SystemsSection = dynamic(
  () => import("@/components/sections/systems-section").then((m) => m.SystemsSection),
  { ssr: true },
);
const ApproachSection = dynamic(
  () => import("@/components/sections/approach-section").then((m) => m.ApproachSection),
  { ssr: true },
);
const PhilosophySection = dynamic(
  () => import("@/components/sections/philosophy-section").then((m) => m.PhilosophySection),
  { ssr: true },
);
const ContactSection = dynamic(
  () => import("@/components/sections/contact-section").then((m) => m.ContactSection),
  { ssr: true },
);

export function HomePageContent() {
  return (
    <>
      <PageLoader />
      <AmbientBackground />
      <CursorGlow />
      <ScrollProgress />

      <Header />
      <main id="main-content">
        <HeroSection />
        <PositioningSection />
        <CapabilitiesSection />
        <ImpactSection />
        <SystemsSection />
        <ApproachSection />
        <PhilosophySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
