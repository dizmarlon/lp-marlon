(function () {
 'use strict';
const { gsap, ScrollTrigger, Lenis, initAnimations, initInteractions, initLanguage } = window.SiteModules;

// Expõe somente as bibliotecas para diagnóstico; o conteúdo é lido do HTML.
window.gsap=gsap; window.ScrollTrigger=ScrollTrigger;
function startSite() {
try {
  initLanguage();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis=reduced?null:new Lenis({
    lerp:.1,
    smoothWheel:true,
    // Toque nativo preserva a inércia do aparelho e o gesto de puxar para atualizar.
    syncTouch:false,
    autoRaf:false,
    stopInertiaOnNavigate:true
  });
  window.SiteModules.lenis=lenis;
  if(lenis) {
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(time=>lenis.raf(time*1000));
    gsap.ticker.lagSmoothing(0);
  }
  initInteractions(lenis);
  document.documentElement.dataset.siteReady='true';
  window.dispatchEvent(new Event('site:controls-ready'));
  window.addEventListener('pageshow',()=>ScrollTrigger.refresh());
} catch(error) {
  window.dispatchEvent(new Event('site:failed'));
  throw error;
}
}
// Os controles ficam disponíveis assim que os scripts carregarem.
startSite();
// As animações devem medir a página somente depois de todas as folhas de estilo.
const styles = [...document.querySelectorAll('link[data-deferred-style]')];
const stylesReady = Promise.all(styles.map(link => link.dataset.styleReady ? Promise.resolve() : new Promise(resolve => {
  link.addEventListener('load', resolve, { once: true });
  link.addEventListener('error', resolve, { once: true });
})));
window.SiteModules.stylesReady = stylesReady;
stylesReady.then(() => {
  try { initAnimations(); }
  catch (error) { window.dispatchEvent(new Event('site:failed')); throw error; }
});
})();
