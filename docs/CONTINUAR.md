# Prompt para continuar o portfólio

Continue o portfólio pessoal de Wilker Quirino a partir da branch `codex/continuar-portfolio`. A home já recebeu a nova identidade visual, com monograma WQ, intro animada, hero reformulado, seção de experiência, novas mídias de projetos, animações GSAP e conteúdo em português e inglês.

1. Rode `npm ci` e leia o guia aplicável em `node_modules/next/dist/docs/` antes de editar. Use `src/components/home-page-content.tsx` para localizar as seções da home e `src/lib/i18n/dictionaries/` para revisar os textos. As prévias em `docs/previas/` e `docs/preview/` servem como referências visuais.
2. Rode `npm run build` e `npm run lint`. Nesta máquina, o build parou porque o executável `next` não estava disponível. Corrija os problemas que conseguir reproduzir após instalar as dependências.
3. Abra a home em desktop e mobile. Confira a intro, a navegação por teclado e por âncoras, a troca PT/EN, o comportamento com movimento reduzido e os links de contato e currículo. Verifique o carregamento das mídias de Easy Cards e Nook.
4. Priorize os problemas encontrados nessa revisão e refine o conteúdo e o layout a partir da home atual. Preserve a identidade WQ e a paridade entre os dois idiomas. Registre o que foi validado e o que ainda depender de uma decisão editorial.

## Validação em 27 de novembro de 2026

- A marca Prompt (W com cursor de terminal) está no cabeçalho, na intro e nos ícones do site.
- Build de produção e lint passaram após `npm ci`. Neste ambiente, use `env -u NODE_ENV npm run build` para o Next.js selecionar o ambiente de produção.
- No Chrome, foram verificados desktop (1440 px) e mobile (390 px), troca PT/EN, âncora de projetos, links de contato, download do CV, imagens de Easy Cards e Nook e carregamento do vídeo de Nook. A intro foi verificada no modo normal e com movimento reduzido, incluindo repetição e navegação por teclado.
- A configuração atual do site permite indexação. O aviso de WIP no README descreve o estado editorial.
