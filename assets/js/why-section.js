/* Cards com imagem estática e animações de entrada preservadas. */
(() => {
  'use strict';
  (window.SiteModules?.stylesReady || Promise.resolve()).then(() => {
  const section = document.querySelector('.why-section');
  if (!section || section.dataset.whyReady) return;
  section.dataset.whyReady = 'true';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const { gsap, ScrollTrigger } = window.SiteModules || {};
  if (!gsap || !ScrollTrigger) return;
  const media = gsap.matchMedia();
  media.add({ all: 'all', reduce: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 901px)', touch: '(pointer: coarse)' }, context => {
    const revealedByPhone = section.parentElement.classList.contains('phone-reveal-content');
    // A transição do celular faz uma única entrada da seção, sem fades concorrentes.
    if (context.conditions.reduce || revealedByPhone) return;
    gsap.fromTo(section.querySelector('.why-head'), { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: .7, ease: 'power3.out',
      scrollTrigger: { trigger: section.querySelector('.why-head'), start: 'top 90%', once: true }
    });
    const cards = [...section.querySelectorAll('.why-card')];
    if (context.conditions.desktop) {
      gsap.fromTo(cards, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out',
        scrollTrigger: { trigger: section.querySelector('.why-grid'), start: 'top 88%', once: true } });
    } else {
      cards.forEach(card => gsap.fromTo(card, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true } }));
    }
  });
  ScrollTrigger.refresh();
  });
})();
