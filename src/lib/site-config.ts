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
  { key: "systems" as const, href: "#systems" },
  { key: "experience" as const, href: "#experience" },
  { key: "capabilities" as const, href: "#capabilities" },
  { key: "contact" as const, href: "#contact" },
] as const;

export const capabilityIcons = ["brain", "layers", "network", "plug"] as const;

export const projectIds = ["nook", "easycards", "turno", "overmind", "mutua", "vidi", "office", "cerus"] as const;

export type ProjectId = (typeof projectIds)[number];

export const projectGroups = [
  { key: "personal" as const, projectIds: ["nook", "easycards", "turno", "overmind", "office"] as const },
  { key: "client" as const, projectIds: ["cerus", "mutua", "vidi"] as const },
] as const;

export const projectStacks: Record<ProjectId, readonly string[]> = {
  nook: ["SwiftUI", "macOS", "Windows", "AI agents"],
  easycards: ["Next.js", "TypeScript", "Supabase", "PWA"],
  turno: ["Node.js", "Pixel art", "SQLite", "AI agents"],
  overmind: ["NestJS 11", "Next.js", "R3F", "Hermes", "Prisma"],
  mutua: ["NestJS", "Kafka", "Prisma", "Docuscan AI", "Next.js"],
  vidi: ["NestJS 11", "BullMQ", "Prisma", "PostgreSQL", "PM2"],
  office: ["NestJS 11", "Next.js 16", "Prisma", "Evolution API"],
  cerus: ["NestJS 10", "Angular 19", "RabbitMQ", "PostgreSQL", "S3", "PM2"],
};

export const projectLinks: Partial<Record<ProjectId, string>> = {
  nook: "https://nook-notch-beta.vercel.app/",
  easycards: "https://easycardstcg.com.br",
  overmind: "https://github.com/uiukis",
  office: "https://github.com/uiukis",
};

export const projectImages: Partial<Record<ProjectId, { src: string; alt: string }>> = {
  nook: { src: "/projects/nook.webp", alt: "Nook" },
  easycards: { src: "/projects/easy-cards.webp", alt: "Easy Cards" },
};
