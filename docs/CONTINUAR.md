# Prompt para continuar o portfólio

Continue o portfólio pessoal de Wilker Quirino a partir da branch `codex/continuar-portfolio`. A home já recebeu a nova identidade visual, com monograma WQ, intro animada, hero reformulado, seção de experiência, novas mídias de projetos, animações GSAP e conteúdo em português e inglês.

1. Rode `npm ci` e leia o guia aplicável em `node_modules/next/dist/docs/` antes de editar. Use `src/components/home-page-content.tsx` para localizar as seções da home e `src/lib/i18n/dictionaries/` para revisar os textos. As prévias em `docs/previas/` e `docs/preview/` servem como referências visuais.
2. Rode `npm run build` e `npm run lint`. Nesta máquina, o build parou porque o executável `next` não estava disponível. Corrija os problemas que conseguir reproduzir após instalar as dependências.
3. Abra a home em desktop e mobile. Confira a intro, a navegação por teclado e por âncoras, a troca PT/EN, o comportamento com movimento reduzido e os links de contato e currículo. Verifique o carregamento das mídias de Easy Cards e Nook.
4. Priorize os problemas encontrados nessa revisão e refine o conteúdo e o layout a partir da home atual. Preserve a identidade WQ e a paridade entre os dois idiomas. Registre o que foi validado e o que ainda depender de uma decisão editorial.
