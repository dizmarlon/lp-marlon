(() => {
  'use strict';
  (window.SiteModules?.stylesReady || Promise.resolve()).then(() => {
  const section = document.querySelector('.brand-statement');
  if (!section) return;
  const video = section.querySelector('[data-brand-video]');
  const source = video.querySelector('source[data-src]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let loaded = false;
  function update() {
    const active = visible && !document.hidden && !reduced.matches;
    section.toggleAttribute('data-brand-active', active);
    if (!active) {
      video.pause();
      if (reduced.matches && loaded) {
        source.removeAttribute('src'); video.load(); loaded = false;
      }
      return;
    }
    if (!loaded) {
      video.muted = true; video.playsInline = true;
      source.src = source.dataset.src; video.load(); loaded = true;
    }
    video.play().catch(() => {});
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting; update();
    }, { threshold: .04 });
    observer.observe(section.querySelector('.brand-statement-panel'));
  } else { visible = true; update(); }
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  addEventListener('pagehide', () => { video.pause(); section.removeAttribute('data-brand-active'); });
  addEventListener('pageshow', update);
  });
})();
