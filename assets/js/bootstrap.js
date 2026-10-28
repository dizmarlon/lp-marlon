// A primeira tela pinta antes de iniciar as animações e os módulos das demais seções.
(() => {
  'use strict';
  // A distância do lazy nativo varia com a conexão; estas mídias só são necessárias perto da tela.
  const deferredMedia = document.querySelectorAll('[data-viewport-src], [data-viewport-poster]');
  function revealMedia(element) {
    if (element.dataset.viewportSrcset) element.srcset = element.dataset.viewportSrcset;
    if (element.dataset.viewportSrc) element.src = element.dataset.viewportSrc;
    if (element.dataset.viewportPoster) element.poster = element.dataset.viewportPoster;
    for (const name of ['viewportSrc', 'viewportSrcset', 'viewportPoster']) delete element.dataset[name];
  }
  if ('IntersectionObserver' in window) {
    const mediaObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        revealMedia(entry.target);
        mediaObserver.unobserve(entry.target);
      }
    }, { rootMargin: '400px 0px' });
    deferredMedia.forEach(element => mediaObserver.observe(element));
  } else deferredMedia.forEach(revealMedia);
  const config = document.getElementById('site-modules');
  if (!config) return;
  const files = JSON.parse(config.textContent);
  let ready;
  function start() {
    if (ready) return ready;
    ready = Promise.all(files.map(file => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.dataset.cfasync = 'false';
      script.async = false;
      script.src = new URL(file, document.baseURI).href;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Não foi possível carregar ${file}`));
      document.body.append(script);
    })));
    ready.catch(() => dispatchEvent(new Event('site:failed')));
    return ready;
  }
  function afterPaint() { requestAnimationFrame(() => requestAnimationFrame(start)); }
  if (document.querySelector('.preloader')) addEventListener('preloader:done', afterPaint, { once: true });
  else afterPaint();
  // Guarda a intenção mais recente; não repete um clique depois de outra interação.
  let pendingControl = null, replaying = false;
  function replayControl() {
    const button = pendingControl;
    pendingControl = null;
    if (!button?.isConnected || !document.documentElement.dataset.siteReady || document.documentElement.dataset.siteFailed) return;
    replaying = true;
    try { button.click(); } finally { replaying = false; }
  }
  addEventListener('site:controls-ready', replayControl, { once: true });
  addEventListener('site:failed', () => { pendingControl = null; }, { once: true });
  document.addEventListener('click', event => {
    if (replaying) return;
    const button = event.target.closest('.creative-burger, .lang-toggle-btn');
    if (!button) return;
    if (document.documentElement.dataset.siteReady) { pendingControl = null; return; }
    if (document.documentElement.dataset.siteFailed) return;
    event.preventDefault(); event.stopImmediatePropagation();
    pendingControl = button;
    start().then(replayControl).catch(() => { pendingControl = null; });
  }, { capture: true });
})();
