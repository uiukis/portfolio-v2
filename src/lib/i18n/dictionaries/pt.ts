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
    experience: "Experiência",
    capabilities: "Especialidades",
    impact: "Impacto",
    systems: "Projetos",
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
    skip: "Pular intro",
    replay: "Rever intro",
    title: "wilker",
    subtitle: "Portfolio",
    ready: "Software & AI Engineer",
  },
  curiosities: {
    title: "belfry — feed",
    prefix: "[LOG]",
    items: [
      "Cerus Bank — fintech de condomínios: Receita Garantida, crédito e +1.200 clientes.",
      "Cerus — relatórios financeiros async (Excel/PDF) com RabbitMQ + S3.",
      "s4S — fábrica de software (Fortaleza): AI, APIs, web/mobile e integrações.",
      "Mútua via s4S — modernização do CIAP (Caixa de Assistência do Sistema Confea/Crea).",
      "Vidi Tech via s4S — gateway Pix multi-provider (BaaS/CaaS).",
      "Overmind — control plane + cockpit 3D com 340+ arquivos no web.",
    ],
  },
  hero: {
    featuredLabel: "Produtos que estou construindo",
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
    currentRole: "Atualmente na Cerus Bank",
    availability: "Fortaleza, Brasil",
    eyebrow: "Wilker Quirino",
    headline: "Software & AI Engineer",
    subheadline:
      "Desenvolvo plataformas financeiras na Cerus Bank e produtos próprios para trabalhar com agentes de IA.",
    subheadlineSecondary:
      "NestJS · Angular · Next.js · RabbitMQ · PostgreSQL · MCP · LLM",
    ctaSystems: "Explorar projetos",
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
  experience: {
    "label": "Trajetória",
    "title": "Trajetória profissional",
    "description": "Os sistemas em que trabalhei e o que ajudei a construir em cada etapa.",
    "current": "Atual",
    "items": [
      {
        "company": "Cerus Bank",
        "role": "Dev Full Stack & AI Engineer",
        "period": "Atual",
        "current": true,
        "contributions": [
          "Desenvolvimento da API NestJS e da interface Angular para a operação de receita garantida e crédito condominial.",
          "Relatórios financeiros em Excel e PDF com processamento assíncrono via RabbitMQ e armazenamento em S3.",
          "Piloto da Conta Cerus para centralizar a autenticação dos colaboradores e integrar o login do Service Desk."
        ],
        "stack": [
          "NestJS",
          "Angular",
          "RabbitMQ",
          "PostgreSQL",
          "S3"
        ]
      },
      {
        "company": "s4S",
        "role": "Full Stack & AI Engineer · Freelance",
        "period": "Ago. 2025",
        "current": false,
        "contributions": [
          "Contratado pela s4S para atuar em projetos de clientes, com entregas full stack, integrações e automação com IA."
        ],
        "stack": [
          "NestJS",
          "Next.js",
          "Kafka",
          "BullMQ",
          "Prisma"
        ],
        "clients": [
          {
            "name": "Mútua",
            "period": "Ago. 2025",
            "project": "Modernização do CIAP",
            "contributions": [
              "Integração de serviços NestJS ao legado SQL Server em um ecossistema de 19 repositórios.",
              "Processamento de benefícios com Kafka e pipeline de análise documental com IA."
            ],
            "stack": [
              "NestJS",
              "Next.js",
              "Kafka",
              "SQL Server"
            ]
          },
          {
            "name": "Vidi Tech",
            "period": "Mai. 2026",
            "project": "Gateway Pix multi-provider",
            "contributions": [
              "Integração com Firebanking, SAQ e Simpay para operações Pix de entrada e saída.",
              "Filas assíncronas, webhooks multi-tenant e dashboards para a operação financeira."
            ],
            "stack": [
              "NestJS",
              "BullMQ",
              "Prisma",
              "PostgreSQL"
            ]
          }
        ]
      },
      {
        "company": "Cometa Supermercados",
        "role": "Analista de Desenvolvimento de Sistemas",
        "period": "Jul. 2023 – jul. 2025",
        "current": false,
        "contributions": [
          "Desenvolvimento de sistemas corporativos utilizados por 38 lojas da rede.",
          "Criação da aplicação de DRE gerencial e da API de relatórios de vendas, além de manutenção de aplicações Flutter."
        ],
        "stack": [
          "TypeScript",
          "React",
          "SQL Server",
          "Oracle",
          "Flutter"
        ]
      },
      {
        "company": "Reali Imobiliária",
        "role": "Desenvolvedor Web e Mobile",
        "period": "Dez. 2021 – mai. 2023",
        "current": false,
        "contributions": [
          "Sistemas internos para centralizar imóveis, clientes e transações. Desenvolvimento e manutenção dos aplicativos em React Native."
        ],
        "stack": [
          "React",
          "Next.js",
          "React Native"
        ]
      },
      {
        "company": "Rodobank",
        "role": "Estágio em Desenvolvimento / QA",
        "period": "Fev. – abr. 2021",
        "current": false,
        "contributions": [
          "Desenvolvimento de funcionalidades internas e testes de qualidade da plataforma."
        ],
        "stack": [
          "PHP",
          "Postman"
        ]
      }
    ],
    "clientLabel": "Atuação em clientes via s4S"
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
    "label": "Contexto de atuação",
    "title": "Sistemas que atendem operações reais",
    "description": "A escala dos ambientes em que contribuí com desenvolvimento e integrações.",
    "metrics": [
      {
        "value": "38",
        "label": "Lojas atendidas pelos sistemas corporativos do Cometa"
      },
      {
        "value": "37",
        "label": "Consumers Kafka no módulo de benefícios da Mútua"
      },
      {
        "value": "3",
        "label": "Provedores integrados ao gateway Pix da Vidi Tech"
      },
      {
        "value": "19",
        "label": "Repositórios no ecossistema Mútua-360"
      }
    ]
  },
  systems: {
    label: "Sistemas Selecionados",
    title: "Arquitetura em produção",
    description:
      "Case studies separados por projetos pessoais (solo) e entregas em clientes — design de sistema, decisões técnicas e impacto.",
    viewDetails: "Ver detalhes",
    watchDemo: "Assistir à demonstração",
    openProject: "Abrir projeto",
    groups: [
      {
        key: "personal",
        title: "Projetos pessoais",
        items: [
{
    "id": "nook",
    "title": "Nook",
    "category": "Desktop · AI tooling",
    "ownership": "Projeto próprio · macOS e Windows",
    "impact": "Agentes, cotas e ferramentas do dia a dia, a um passar de mouse.",
    "description": "Uma central no notch para acompanhar agentes de IA, consultar cotas por provedor e acessar música, arquivos e o histórico da área de transferência."
},
{
    "id": "easycards",
    "title": "Easy Cards",
    "category": "Comunidade · TCG",
    "ownership": "Plataforma para colecionadores",
    "impact": "Coleções, trocas e operação da comunidade no mesmo lugar.",
    "description": "Fichários digitais, lista de desejo, sugestões de troca e perfis de colecionadores. O painel da equipe reúne leilões, consignações, permissões e repasses."
},
{
    "id": "turno",
    "title": "Turno",
    "category": "AI tooling · Pixel art",
    "ownership": "Projeto próprio · agentes locais",
    "impact": "Cada agente ocupa uma mesa. Cada tarefa tem um responsável.",
    "description": "Escritório em pixel art conectado a ferramentas locais de IA. Conversas por agente, quadro de missões e acompanhamento visual da atividade."
},
          {
            id: "overmind",
            title: "Overmind — AI Agent Workspace",
            category: "AI Engineering",
            ownership: "Projeto solo · concepção, arquitetura e build end-to-end",
            impact: "Control plane + cockpit 3D para agentes locais com audit trail completo",
            description:
              "Ecossistema pessoal: API como control plane (runs, chat SSE, tasks, offices) e Web como cockpit visual com escritório 3D retro, kanban, approvals e mission control multipane.",
          },
          {
            id: "office",
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
            id: "cerus",
            title: "Cerus Bank — Finanças condominiais",
            category: "Fintech · Cerus Bank",
            ownership: "Cerus Bank · Dev Full Stack & AI Engineer",
            impact:
              "Plataforma de receita garantida e crédito condominial — +1.200 condomínios, 18 estados",
            description:
              "Fintech especializada em condomínios (Receita Garantida, crédito e inadimplência). API NestJS com consumers de remessas/boletos, front Angular 19, microserviço de relatórios async (Excel/PDF via RabbitMQ + S3) e pipeline de implantação com IA.",
          },
          {
            id: "mutua",
            title: "Mútua-360 — Modernização CIAP",
            category: "Enterprise · Cliente s4S",
            ownership: "s4S Tech · prestação de serviço para a Mútua",
            impact:
              "Modernização do CIAP — sistema corporativo da Caixa de Assistência dos profissionais do CREA",
            description:
              "Na s4S (fábrica de software em Fortaleza: consultoria, web/mobile, IA e integrações), atuei no Mútua-360 para a Mútua — Caixa de Assistência dos profissionais do Sistema Confea/Crea. Modernização do CIAP com NestJS, Kafka (37 consumers), pipeline documental com IA e Next.js, convivendo com legado SQL Server.",
          },
          {
            id: "vidi",
            title: "Vidi Tech — Gateway Pix multi-provider",
            category: "Fintech · Cliente s4S",
            ownership: "s4S Tech · prestação de serviço para a Vidi Tech",
            impact:
              "Gateway Pix unificado (IN/OUT, QR dinâmico/estático) com filas e webhooks multi-tenant",
            description:
              "Também via s4S, delivery na Vidi Tech — fintech de meios de pagamento (BaaS/CaaS) em Fortaleza. Gateway Pix multi-provider com NestJS, BullMQ, webhooks cash-in/out, auth multi-tenant e dashboards admin — foco em confiabilidade financeira e automação de repasses.",
          },
        ],
      },
    ],
  },
  approach: {
    label: "Abordagem",
    title: "Como eu trabalho",
    description:
      "Padrões extraídos de projetos reais — Cerus Bank, s4S (Mútua, Vidi Tech), Overmind, Office — e ecossistemas multi-repo enterprise.",
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
    quote: "Ler uma embalagem de chiclete",
    highlight: "e desvendar os segredos do universo.",
    footer: "Lex Luthor · trecho adaptado, citado em Jogador Nº 1",
  },
  contact: {
    label: "Contato",
    title: "Vamos construir algo inteligente",
    description:
      "Engenheiro de Software & IA. Aberto a conversar sobre engenharia, arquitetura e agentes.",
    emailDesc: "Email profissional",
    linkedinDesc: "Rede profissional",
    githubDesc: "Open source & código",
    cvLabel: "Currículo",
    cvDesc: "PDF atualizado (RenderCV)",
  },
  footer: {
    role: "Software & AI Engineer",
    builtWith: "Feito com Next.js, React Three Fiber & Framer Motion.",
    belfry: "Engineered from the Belfry.",
  },
  devBanner: {
    label: "WIP",
    message: "Portfólio em desenvolvimento — conteúdo e layout sujeitos a alterações.",
  },
};
