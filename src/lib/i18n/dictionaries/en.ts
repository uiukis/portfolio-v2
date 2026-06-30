import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Technical Lead · AI Engineering & Full Stack Systems",
    description:
      "Technical Lead and full stack engineer specialized in AI agent control planes, event-driven architecture and enterprise system modernization at scale.",
  },
  a11y: {
    skipLink: "Skip to content",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    portraitAlt: "Wilker Quirino — Technical Lead portrait",
  },
  nav: {
    capabilities: "Capabilities",
    impact: "Impact",
    systems: "Systems",
    approach: "Approach",
    contact: "Contact",
    cta: "Let's talk",
  },
  language: {
    label: "Language",
    switchTo: "Switch language to",
  },
  loader: {
    title: "WQ-OS // PORTFOLIO",
    subtitle: "Initializing systems",
    ready: "Wilker Quirino — online",
  },
  curiosities: {
    title: "belfry — feed",
    prefix: "[LOG]",
    items: [
      "Overmind — AI control plane + 3D cockpit with 340+ files in the web app.",
      "Mútua-360 — 37 Kafka consumers and 7 NestJS backends in production.",
      "33+ repositories across personal projects and S4S.",
      "Hermes runtime via stdio — executor decoupled from the control plane.",
      "Bat-Family: specialized agents orchestrated from the Belfry.",
      "Vidi — multi-provider Pix gateway with BullMQ and webhooks.",
    ],
  },
  hero: {
    bootLabel: "WQ-OS // PORTFOLIO",
    bootTag: "WQ-OS",
    bootSuffix: "PORTFOLIO",
    bootStatus: "NETWORK: STABLE",
    bootLines: [
      "[SYSTEM] Initializing WQ-OS...",
      "[SYSTEM] Control planes · agent runtimes · OK",
      "[SYSTEM] Wilker Quirino — online",
    ],
    intro: "Hi, I'm",
    name: "Wilker Quirino",
    headline: "Full Stack Engineer & AI Engineer",
    subheadline:
      "I design AI control planes and production full stack systems — from agent orchestration to enterprise platforms.",
    ctaSystems: "View selected systems",
    ctaContact: "Start a conversation",
    tags: ["AI Control Planes", "Agent Runtimes", "Full Stack", "Event-Driven"],
  },
  positioning: {
    fullstackTitle: "Full Stack Engineer",
    fullstackDesc:
      "End-to-end — NestJS with use-cases, Prisma multi-schema, Next.js operational dashboards. From B2B2C subscription platforms to multi-provider Pix gateways, with Playwright e2e on critical flows.",
    aiTitle: "AI Engineer",
    aiDesc:
      "Control planes for agents, Hermes runtime via stdio/SSE, 3D cockpits with R3F and document analysis pipelines — always with clear separation between orchestration and execution.",
  },
  capabilities: {
    label: "Capabilities",
    title: "Where engineering meets intelligence",
    description:
      "Four pillars of expertise — each backed by production systems, not prototypes.",
    items: [
      {
        title: "AI Agents & Control Planes",
        description:
          "Agent ecosystems with runtime provider abstraction (Hermes, gateway protocols), agent runs with SSE, human-in-the-loop approvals and mission persistence — executor separated from product.",
        metrics: ["Overmind API + Web", "Hermes stdio bridge", "SSE streaming"],
      },
      {
        title: "Full Stack Systems",
        description:
          "NestJS 11 backends with use-cases, Prisma multi-schema, Next.js 16 frontends with React 19 — from REST API to operational dashboard with Playwright e2e.",
        metrics: ["20+ NestJS modules", "Next.js + R3F", "Prisma 7"],
      },
      {
        title: "Event-Driven Architecture",
        description:
          "Kafka consumers, BullMQ workers, crons and async pipelines for critical flows — documents, Pix webhooks, legacy system sync and automated analysis.",
        metrics: ["37 Kafka consumers", "BullMQ queues", "Multi-tenant"],
      },
      {
        title: "Technical Leadership",
        description:
          "Team standardization across multi-repo ecosystems, incremental legacy migration, architecture documentation and replicable conventions across enterprise clients.",
        metrics: ["33+ repos", "S4S boilerplate", "RBAC + Swagger"],
      },
    ],
  },
  impact: {
    label: "Impact",
    title: "Numbers that matter",
    description:
      "Production metrics from systems I've designed, built and led — not side projects.",
    metrics: [
      { value: "33+", label: "Repos across enterprise and personal ecosystems" },
      { value: "340+", label: "Files in Overmind Web 3D cockpit" },
      { value: "37", label: "Kafka consumers in benefits module" },
      { value: "7", label: "NestJS backends in Mútua-360 ecosystem" },
    ],
  },
  systems: {
    label: "Selected Systems",
    title: "Architecture in production",
    description:
      "Case studies focused on system design, technical decisions and business impact.",
    items: [
      {
        title: "Overmind — AI Agent Workspace",
        category: "AI Engineering",
        impact: "Control plane + 3D cockpit for local agents with full audit trail",
        description:
          "Personal ecosystem: API as control plane (runs, chat SSE, tasks, offices) and Web as visual cockpit with retro 3D office, kanban, approvals and mission control multipane.",
      },
      {
        title: "Mútua-360 — CIAP Modernization",
        category: "Enterprise · S4S",
        impact: "19 repos integrating legacy SQL Server with modular Next.js frontends",
        description:
          "CREA mutualism platform: benefits, contracts, travel allowances, sponsorships and mobile app — with AI document analysis pipeline and 37 async Kafka consumers.",
      },
      {
        title: "Vidi — Pix Multi-Provider Gateway",
        category: "Fintech · S4S",
        impact: "Unified gateway for Firebanking, SAQ and Simpay with async queues",
        description:
          "Pix microservices with stateless api-core, cash-in/out webhooks, multi-tenant auth and admin dashboards — architecture focused on financial reliability.",
      },
      {
        title: "Office — B2B2C Subscription Platform",
        category: "Full Stack · Personal",
        impact: "28 dashboard routes, multi-level partner hierarchy and external panel sync",
        description:
          "Complete B2B2C platform: subscriptions, billing, product catalog, delivery infrastructure, tickets, analytics, gamification and WhatsApp integration — with Playwright e2e and RBAC.",
      },
    ],
  },
  approach: {
    label: "Approach",
    title: "How I work",
    description:
      "Patterns from real projects — Overmind, Mútua-360, Vidi, Office — and multi-repo enterprise ecosystems.",
    items: [
      {
        title: "Control plane ≠ Executor",
        description:
          "The product orchestrates, audits and approves — execution stays in the runtime (Hermes, gateway, workers). Traceable, cancellable autonomy.",
      },
      {
        title: "Provider abstraction",
        description:
          "Interchangeable runtimes via common interface — Hermes, Mock, legacy gateway — without rewriting UI or persistence on every change.",
      },
      {
        title: "Legacy coexists with modern",
        description:
          "$queryRaw on legacy SQL Server + Prisma on PostgreSQL + Kafka to decouple — incremental modernization, not big-bang.",
      },
      {
        title: "3D as operational presence",
        description:
          "Agents visible in 3D space (R3F) — state, movement and activity translated into presence, not just terminal logs.",
      },
      {
        title: "Documentation as contract",
        description:
          "Migration roadmaps, audits and hybrid architecture documented before code — tracked TODOs, conscious technical debt.",
      },
      {
        title: "Test what matters",
        description:
          "30+ specs on Hermes runtime, Playwright e2e on critical flows — coverage focused on boundaries and integrations.",
      },
    ],
    engineeringQuote: "The product orchestrates and audits — the runtime executes.",
    engineeringHighlight:
      "Intelligent systems must be visible, cancellable, and evolvable.",
    engineeringFooter: "— Engineering philosophy, from the Belfry",
  },
  philosophy: {
    title: "Philosophy",
    quote: "It's not who I am underneath —",
    highlight: "it's what I do that defines me.",
    footer: "— Bruce Wayne, Batman Begins",
  },
  contact: {
    label: "Contact",
    title: "Let's build something intelligent",
    description:
      "Open to Technical Lead, Staff Engineer and AI Engineering leadership roles.",
    emailDesc: "Direct line for opportunities",
    linkedinDesc: "Professional network",
    githubDesc: "Open source & code",
  },
  footer: {
    role: "Technical Lead · AI Engineering & Full Stack",
    builtWith: "Built with Next.js, React Three Fiber & Framer Motion.",
    belfry: "Engineered from the Belfry.",
  },
};
