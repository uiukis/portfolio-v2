import { siteConfig } from "@/lib/site-config";
import { pt } from "@/lib/i18n/dictionaries/pt";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Technical Lead",
    description: pt.meta.description,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    knowsAbout: [
      "AI Engineering",
      "AI Agent Control Planes",
      "Hermes Runtime",
      "Full Stack Development",
      "NestJS",
      "Event-Driven Architecture",
      "Legacy Modernization",
      "Technical Leadership",
      "React Three Fiber",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
