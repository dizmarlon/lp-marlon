(function () {
 'use strict';
const { gsap, ScrollTrigger, Lenis, initAnimations, initPreloader, initInteractions, initLanguage } = window.SiteModules;

// Expõe somente as bibliotecas para diagnóstico; o conteúdo é lido do HTML.
window.gsap=gsap; window.ScrollTrigger=ScrollTrigger;
try {
  initLanguage();
  initAnimations();
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
  initPreloader();
  document.documentElement.dataset.siteReady='true';
  window.addEventListener('pageshow',()=>ScrollTrigger.refresh());
} catch(error) {
  window.dispatchEvent(new Event('site:failed'));
  throw error;
}
})();
