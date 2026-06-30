export const siteConfig = {
  name: "Wilker Quirino",
  url: "https://wilkerquirino.dev",
  email: "hello@wilkerquirino.dev",
  linkedin: "https://linkedin.com/in/wilkerquirino",
  github: "https://github.com/wilkerquirino",
} as const;

export const navHrefs = [
  { key: "capabilities" as const, href: "#capabilities" },
  { key: "impact" as const, href: "#impact" },
  { key: "systems" as const, href: "#systems" },
  { key: "approach" as const, href: "#approach" },
  { key: "contact" as const, href: "#contact" },
] as const;

export const capabilityIcons = ["brain", "layers", "network", "compass"] as const;

export const projectStacks: Record<string, readonly string[]> = {
  overmind: ["NestJS 11", "Next.js", "R3F", "Hermes", "Prisma"],
  mutua: ["NestJS", "Kafka", "Prisma", "Docuscan AI", "Next.js"],
  vidi: ["NestJS 11", "BullMQ", "Prisma", "PostgreSQL", "PM2"],
  office: ["NestJS 11", "Next.js 16", "Prisma", "Evolution API"],
};

export const projectIds = ["overmind", "mutua", "vidi", "office"] as const;
