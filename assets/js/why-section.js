/* Cards originais: GSAP leve e vídeos decorativos carregados só ao aparecer. */
(() => {
  'use strict';
  const section = document.querySelector('.why-section');
  if (!section || section.dataset.whyReady) return;
  section.dataset.whyReady = 'true';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const records = [...section.querySelectorAll('[data-why-video]')].map(video => ({ video, visible: false, loaded: false }));
  function stop(record, unload = false) {
    record.video.pause();
    if (!unload || !record.loaded) return;
    record.video.removeAttribute('src');
    record.video.querySelectorAll('source').forEach(source => source.removeAttribute('src'));
    record.video.load();
    record.loaded = false;
  }
  function update(record) {
    if (reduced.matches) { stop(record, true); return; }
    if (!record.visible || document.hidden) { stop(record); return; }
    if (!record.loaded) {
      record.video.muted = true;
      record.video.playsInline = true;
      record.video.querySelectorAll('source[data-src]').forEach(source => source.src = source.dataset.src);
      record.loaded = true;
      record.video.load();
    }
    record.video.play().catch(() => {});
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const record = records.find(item => item.video === entry.target);
        if (record) { record.visible = entry.isIntersecting; update(record); }
      }
    }, { threshold: .03 });
    records.forEach(record => observer.observe(record.video));
  }
  reduced.addEventListener('change', () => records.forEach(update));
  document.addEventListener('visibilitychange', () => records.forEach(update));
  addEventListener('pagehide', () => records.forEach(record => stop(record)));
  addEventListener('pageshow', () => records.forEach(update));

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
})();
