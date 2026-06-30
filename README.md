# portfolio-v2

Portfólio pessoal de **Wilker Quirino** — Technical Lead em AI Engineering & Full Stack Systems.

Single-page em Next.js com hero 3D, i18n PT/EN, motion system e case studies de sistemas em produção (Overmind, Mútua-360, Vidi, Office).

**[→ Ver ao vivo](https://uiukis.vercel.app)**

## Destaques

- **Hero imersivo** — cena React Three Fiber com fallback para `prefers-reduced-motion`
- **Bilingue** — português e inglês com troca client-side sem reload
- **Proof over claims** — métricas e case studies reais, sem skill bars genéricas
- **Design system** — dark theme, glow cards, tipografia Geist, identidade Belfry
- **SEO** — metadata, JSON-LD, `sitemap.xml`, `robots.txt`
- **Acessibilidade** — skip link, foco visível, landmarks semânticos, `aria-live` no feed

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 · App Router · React 19 |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| Motion | Framer Motion |
| 3D | React Three Fiber · Three.js · Drei |
| UI | Radix primitives · Lucide icons |

## Estrutura

```
src/
├── app/              # layout, providers, SEO routes
├── components/
│   ├── sections/     # Hero, Capabilities, Impact, Systems…
│   ├── three/        # cena 3D do hero
│   ├── brand/        # boot intro, logos, curiosidades
│   └── layout/       # header, footer, language switcher
└── lib/
    ├── i18n/         # dicionários PT/EN
    └── site-config.ts
```

## Quick start

```bash
git clone https://github.com/uiukis/portfolio-v2.git
cd portfolio-v2
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build localmente |
| `npm run lint` | ESLint |

## Personalização

Edite [`src/lib/site-config.ts`](src/lib/site-config.ts) para nome, links sociais, email e navegação.

Textos e traduções ficam em [`src/lib/i18n/dictionaries/`](src/lib/i18n/dictionaries/).

## Deploy

Hospedado na [Vercel](https://vercel.com). Antes de ir para produção, ajuste `siteConfig.url` no `site-config.ts` para o domínio final (canonical, Open Graph, sitemap).

```bash
npx vercel --prod
```

## Documentação

Especificação de produto, UX, wireframes e design system em [`docs/PORTFOLIO-SPEC.md`](docs/PORTFOLIO-SPEC.md).

## Licença

Uso pessoal. Código aberto para referência — adaptações são bem-vindas com atribuição.
