(function () {
 'use strict';
const { gsap, ScrollTrigger, Lenis, initAnimations, initPreloader, initInteractions, initLanguage } = window.SiteModules;

// Expõe somente as bibliotecas para diagnóstico; o conteúdo é lido do HTML.
window.gsap=gsap; window.ScrollTrigger=ScrollTrigger;
try {
  initLanguage();
  initAnimations();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch=matchMedia('(pointer: coarse)').matches;
  const oldIOS=/OS (\d+)[_\d]* like Mac OS X/.exec(navigator.userAgent);
  const lenis=reduced?null:new Lenis({
    lerp:touch?.14:.1,
    smoothWheel:true,
    syncTouch:touch&&!(oldIOS&&Number(oldIOS[1])<16),
    syncTouchLerp:.14,
    touchInertiaExponent:1.25,
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
