(function () {
 'use strict';
const { gsap, ScrollTrigger, Lenis, initAnimations, initPreloader, initInteractions, initLanguage } = window.SiteModules;

// Expõe somente as bibliotecas para diagnóstico; o conteúdo é lido do HTML.
window.gsap=gsap; window.ScrollTrigger=ScrollTrigger;
try {
  initLanguage();
  initAnimations();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis=reduced?null:new Lenis({duration:1.2});
  if(lenis) {
    lenis.on('scroll',()=>ScrollTrigger.update());
    const frame=time=>{lenis.raf(time);requestAnimationFrame(frame);};
    requestAnimationFrame(frame);
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
