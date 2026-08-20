import type { Dictionary } from "../types";

export const pt: Dictionary = {
  meta: {
    title: "Full Stack & AI Engineering",
    description:
      "Full Stack & AI Engineer especializado em control planes de agentes de IA, NestJS, Next.js, arquitetura event-driven e sistemas enterprise e fintech em produção.",
  },
  a11y: {
    skipLink: "Pular para o conteúdo",
    mainNav: "Navegação principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    portraitAlt: "Wilker Quirino — Full Stack & AI Engineer",
  },
  nav: {
    capabilities: "Capacidades",
    impact: "Impacto",
    systems: "Sistemas",
    approach: "Abordagem",
    contact: "Contato",
    cta: "Vamos conversar",
  },
  header: {
    brand: "wilker",
    productBadge: "Portfolio",
    statusBadge: "Disponível",
    github: "GitHub",
  },
  language: {
    label: "Idioma",
    switchTo: "Alternar idioma para",
  },
  loader: {
    title: "WQ-OS // PORTFOLIO",
    subtitle: "Inicializando sistemas",
    ready: "Wilker Quirino — online",
  },
  curiosities: {
    title: "belfry — feed",
    prefix: "[LOG]",
    items: [
      "Overmind — control plane + cockpit 3D com 340+ arquivos no web.",
      "Mútua-360 — 37 consumers Kafka e 7 backends NestJS em produção.",
      "33+ repositórios entre projetos pessoais e S4S.",
      "Runtime Hermes via stdio — executor separado do control plane.",
      "Cometa — DRE gerencial e APIs para 38 lojas antes do foco enterprise.",
      "Vidi — gateway Pix multi-provider com BullMQ e webhooks.",
    ],
  },
  hero: {
    bootLabel: "WQ-OS // PORTFOLIO",
    bootTag: "WQ-OS",
    bootSuffix: "PORTFOLIO",
    bootStatus: "REDE: ESTÁVEL",
    bootLines: [
      "[SISTEMA] Inicializando WQ-OS...",
      "[SISTEMA] Control planes · agent runtimes · OK",
      "[SISTEMA] Wilker Quirino — online",
    ],
    intro: "Olá, sou",
    name: "Wilker Quirino",
    availability: "Disponível para oportunidades",
    eyebrow: "Wilker Quirino · Full Stack & AI",
    headline: "Full Stack Engineer & AI Engineer",
    subheadline:
      "Projeto e entrego control planes de IA e sistemas full stack em produção — de varejo corporativo a fintech, agentes e plataformas enterprise.",
    subheadlineSecondary:
      "Control planes · NestJS · Next.js · MCP · LLM · event-driven · sistemas enterprise em produção.",
    ctaSystems: "Ver sistemas",
    ctaContact: "Conversar",
    ctaCv: "Baixar CV",
    ctaGithub: "Ver no GitHub",
    terminalQuick: "Quick start",
    terminalFeed: "Feed",
    terminalCopy: "Copiar",
    terminalCopied: "Copiado",
    terminalCommand: "open portfolio — wilker quirino",
    tags: ["Control Planes", "MCP · LLM", "Full Stack", "Event-Driven"],
  },
  positioning: {
    fullstackTitle: "Full Stack Engineer",
    fullstackDesc:
      "End-to-end — NestJS com use-cases, Prisma multi-schema, Next.js com dashboards operacionais. De plataformas B2B2C de assinatura a gateways Pix multi-provider, com e2e Playwright nos fluxos críticos.",
    aiTitle: "AI Engineer",
    aiDesc:
      "Control planes para agentes, runtime Hermes via stdio/SSE, cockpits 3D com R3F e pipelines de análise documental com IA — sempre com separação clara entre orquestração e execução.",
  },
  capabilities: {
    label: "Capacidades",
    title: "Onde engenharia encontra inteligência",
    description:
      "Quatro pilares de expertise — cada um sustentado por sistemas em produção, não protótipos.",
    items: [
      {
        title: "AI Agents & Control Planes",
        description:
          "Ecossistemas de agentes com runtime provider abstraction (Hermes, gateway protocols), agent runs com SSE, approvals human-in-the-loop e persistência de missões — executor separado do produto.",
        metrics: ["Overmind API + Web", "Hermes stdio bridge", "SSE streaming"],
      },
      {
        title: "Full Stack Systems",
        description:
          "Backends NestJS 11 com use-cases, Prisma multi-schema, frontends Next.js 16 com React 19 — da API REST ao dashboard operacional com e2e Playwright.",
        metrics: ["20+ módulos NestJS", "Next.js + R3F", "Prisma 7"],
      },
      {
        title: "Event-Driven Architecture",
        description:
          "Kafka consumers, BullMQ workers, crons e pipelines assíncronos para fluxos críticos — documentos, webhooks Pix, sync com sistemas legados e análise automatizada.",
        metrics: ["37 Kafka consumers", "BullMQ queues", "Multi-tenant"],
      },
      {
        title: "MCP & Integrações com LLM",
        description:
          "Agentes, MCP servers e LLMs integrados a fluxos reais — automações operacionais, análise documental e orquestração com separação clara entre produto e runtime.",
        metrics: ["MCP integrations", "Pipelines documentais", "Agent tooling"],
      },
    ],
  },
  impact: {
    label: "Impacto",
    title: "Números que importam",
    description:
      "Métricas de produção de sistemas que projeto e entrego end-to-end — pessoais e em clientes.",
    metrics: [
      { value: "33+", label: "Repositórios em ecossistemas enterprise e pessoais" },
      { value: "38", label: "Lojas atendidas pelo DRE corporativo (Cometa)" },
      { value: "340+", label: "Arquivos no cockpit 3D Overmind Web" },
      { value: "37", label: "Kafka consumers no módulo de benefícios" },
      { value: "7", label: "Backends NestJS no ecossistema Mútua-360" },
    ],
  },
  systems: {
    label: "Sistemas Selecionados",
    title: "Arquitetura em produção",
    description:
      "Case studies separados por projetos pessoais (solo) e entregas em clientes — design de sistema, decisões técnicas e impacto.",
    viewDetails: "Ver detalhes",
    openProject: "Abrir projeto",
    groups: [
      {
        key: "personal",
        title: "Projetos pessoais",
        items: [
          {
            title: "Overmind — AI Agent Workspace",
            category: "AI Engineering",
            ownership: "Projeto solo · concepção, arquitetura e build end-to-end",
            impact: "Control plane + cockpit 3D para agentes locais com audit trail completo",
            description:
              "Ecossistema pessoal: API como control plane (runs, chat SSE, tasks, offices) e Web como cockpit visual com escritório 3D retro, kanban, approvals e mission control multipane.",
          },
          {
            title: "Office — Plataforma B2B2C de Assinaturas",
            category: "Full Stack",
            ownership: "Projeto solo · freelance · produto próprio",
            impact: "28 rotas de dashboard, hierarquia multi-nível de parceiros e sync com painel externo",
            description:
              "Plataforma B2B2C completa: assinaturas, billing, catálogo, infraestrutura de entrega, tickets, analytics, gamificação e integração WhatsApp — com e2e Playwright e RBAC.",
          },
        ],
      },
      {
        key: "client",
        title: "Projetos em clientes",
        items: [
          {
            title: "Mútua-360 — Modernização CIAP",
            category: "Enterprise · s4S",
            impact: "19 repos integrando legado SQL Server com frontends Next.js modulares",
            description:
              "Plataforma de mutualismo CREA: benefícios, contratos, diárias, patrocínios e app mobile — com pipeline de análise documental via IA e 37 consumers Kafka assíncronos.",
          },
          {
            title: "Vidi — Pix Gateway Multi-Provider",
            category: "Fintech · Vidi Tech",
            impact: "Gateway unificado para Firebanking, SAQ e Simpay com filas assíncronas",
            description:
              "Microserviços Pix com api-core stateless, webhooks cash-in/out, auth multi-tenant e dashboards admin — arquitetura orientada a confiabilidade financeira.",
          },
        ],
      },
    ],
  },
  approach: {
    label: "Abordagem",
    title: "Como eu trabalho",
    description:
      "Padrões extraídos de projetos reais — Overmind, Mútua-360, Vidi, Office — e ecossistemas multi-repo enterprise.",
    items: [
      {
        title: "Control plane ≠ Executor",
        description:
          "O produto orquestra, audita e aprova — a execução fica no runtime (Hermes, gateway, workers). Autonomia rastreável e cancelável.",
      },
      {
        title: "Provider abstraction",
        description:
          "Runtimes intercambiáveis via interface comum — Hermes, Mock, gateway legacy — sem reescrever UI ou persistência a cada mudança.",
      },
      {
        title: "Legado convive com moderno",
        description:
          "$queryRaw em SQL Server legado + Prisma em PostgreSQL + Kafka para desacoplar — modernização incremental, não big-bang.",
      },
      {
        title: "3D como presença operacional",
        description:
          "Agentes visíveis em espaço 3D (R3F) — estado, movimento e atividade traduzidos em presença, não só logs em terminal.",
      },
      {
        title: "Documentação como contrato",
        description:
          "Roadmaps de migração, auditorias e arquitetura híbrida documentados antes do código — TODOs rastreados, dívida técnica consciente.",
      },
      {
        title: "Testa o que importa",
        description:
          "30+ specs no runtime Hermes, e2e Playwright nos fluxos críticos — cobertura focada em boundaries e integrações.",
      },
    ],
    engineeringQuote: "O produto orquestra e audita — o runtime executa.",
    engineeringHighlight:
      "Sistemas inteligentes precisam ser visíveis, canceláveis e evoluíveis.",
    engineeringFooter: "— Filosofia de engenharia, da Belfry",
  },
  philosophy: {
    title: "Filosofia",
    quote: "Não é quem eu sou por baixo da máscara —",
    highlight: "é o que eu faço que me define.",
    footer: "— Bruce Wayne, Batman Begins",
  },
  contact: {
    label: "Contato",
    title: "Vamos construir algo inteligente",
    description:
      "Aberto a oportunidades em Full Stack & AI Engineering — produtos em produção, agentes, MCP e sistemas enterprise.",
    emailDesc: "Linha direta para oportunidades",
    linkedinDesc: "Rede profissional",
    githubDesc: "Open source & código",
    cvLabel: "Currículo",
    cvDesc: "PDF atualizado (RenderCV)",
  },
  footer: {
    role: "Full Stack & AI Engineer",
    builtWith: "Feito com Next.js, React Three Fiber & Framer Motion.",
    belfry: "Engineered from the Belfry.",
  },
  devBanner: {
    label: "WIP",
    message: "Portfólio em desenvolvimento — conteúdo e layout sujeitos a alterações.",
  },
};
