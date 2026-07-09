import { siteConfig } from "@/lib/site-config";
import { pt } from "@/lib/i18n/dictionaries/pt";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Full Stack & AI Engineer",
    description: pt.meta.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    knowsAbout: [
      "AI Engineering",
      "AI Agent Control Planes",
      "MCP",
      "LLM Systems",
      "Hermes Runtime",
      "Full Stack Development",
      "NestJS",
      "Event-Driven Architecture",
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
