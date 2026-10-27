# Estilos do site

As folhas em `assets/css/` e `servicos.css` são as fontes. Após alterá-las, execute `node scripts/build-styles.cjs` para atualizar `assets/css/site-bundle.css`, o CSS crítico em `index.html` e a versão do pacote. O script requer Chrome e Playwright; no Codex usa também as dependências de workspace quando disponíveis.
