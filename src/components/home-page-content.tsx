"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { DevBanner } from "@/components/layout/dev-banner";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { PageLoader } from "@/components/effects/page-loader";
import { HeroSection } from "@/components/sections/hero-section";

const ExperienceSection = dynamic(
  () => import("@/components/sections/experience-section").then((m) => m.ExperienceSection),
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
      <ScrollProgress />

      <DevBanner />
      <Header />
      <main id="main-content">
        <HeroSection />
        <SystemsSection />
        <ExperienceSection />
        <CapabilitiesSection />
        <ImpactSection />
        <PhilosophySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
