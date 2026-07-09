export const siteConfig = {
  name: "Wilker Quirino",
  url: "https://uiukis.vercel.app",
  email: "wilker.quirino99@gmail.com",
  phone: "+55 85 99428-6518",
  linkedin: "https://linkedin.com/in/wilkerquirino",
  github: "https://github.com/uiukis",
  cvPath: "/Wilker-Quirino-CV.pdf",
  isInDevelopment: false,
} as const;

export const navHrefs = [
  { key: "capabilities" as const, href: "#capabilities" },
  { key: "impact" as const, href: "#impact" },
  { key: "systems" as const, href: "#systems" },
  { key: "approach" as const, href: "#approach" },
  { key: "contact" as const, href: "#contact" },
] as const;

export const capabilityIcons = ["brain", "layers", "network", "plug"] as const;

export const projectIds = ["overmind", "mutua", "vidi", "office"] as const;

export type ProjectId = (typeof projectIds)[number];

export const projectGroups = [
  { key: "personal" as const, projectIds: ["overmind", "office"] as const },
  { key: "client" as const, projectIds: ["mutua", "vidi"] as const },
] as const;

export const projectStacks: Record<ProjectId, readonly string[]> = {
  overmind: ["NestJS 11", "Next.js", "R3F", "Hermes", "Prisma"],
  mutua: ["NestJS", "Kafka", "Prisma", "Docuscan AI", "Next.js"],
  vidi: ["NestJS 11", "BullMQ", "Prisma", "PostgreSQL", "PM2"],
  office: ["NestJS 11", "Next.js 16", "Prisma", "Evolution API"],
};

export const projectLinks: Partial<Record<ProjectId, string>> = {
  overmind: "https://github.com/uiukis",
  office: "https://github.com/uiukis",
};
