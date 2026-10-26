(() => {
  'use strict';
  function initPhoneTransition() {
    const section = document.querySelector('[data-phone-transition]');
    const { gsap, ScrollTrigger } = window.SiteModules || {};
    if (!section || !gsap || !ScrollTrigger || section.dataset.phoneReady) return;
    section.dataset.phoneReady = 'true';
    const stage = section.querySelector('.phone-transition-stage');
    const device = section.querySelector('.phone-transition-device');
    const image = device.querySelector('img');
    const backdrop = section.querySelector('.phone-transition-backdrop');
    const cue = section.querySelector('.phone-transition-cue');
    const media = gsap.matchMedia();
    media.add({ all: 'all', mobile: '(max-width: 640px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduce) return;
      const mobile = context.conditions.mobile;
      section.dataset.phoneActive = 'true';
      const anchor = mobile ? { x: 50.1, y: 39.5 } : { x: 50.8, y: 35.1 };
      // Mede a parte branca, não a largura total das mãos. A margem exclui o notch e os cantos.
      const coverScale = () => Math.max(
        stage.clientWidth / (device.offsetWidth * (mobile ? .30 : .46)),
        stage.clientHeight / (device.offsetHeight * (mobile ? .60 : .43))
      ) * 1.12;
      gsap.set(device, {
        x: 0, y: 0, xPercent: -anchor.x, yPercent: -anchor.y,
        transformOrigin: `${anchor.x}% ${anchor.y}%`, transformPerspective: 1600
      });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'phone-screen-transition', trigger: section, pin: stage,
          start: 'top top', end: () => `+=${Math.round(stage.clientHeight * 1.65)}`,
          scrub: .55, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1
        }
      });
      timeline.fromTo(device, { y: 0, rotateX: mobile ? 9 : 14, scale: .96, opacity: 1 },
        { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: .2 }, 0);
      timeline.fromTo(cue, { opacity: 1 }, { opacity: 0, duration: .2 }, .05);
      timeline.to(device, {
        y: () => stage.clientHeight / 2 - device.offsetTop,
        scale: coverScale, duration: 1
      }, .2);
      timeline.fromTo(backdrop, { opacity: 1 }, { opacity: 0, duration: .15 }, 1.2);
      timeline.to(device, { opacity: 0, duration: .3 }, 1.3);
      return () => { delete section.dataset.phoneActive; };
    });
    image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    image.addEventListener('error', () => {
      media.revert(); section.hidden = true; ScrollTrigger.refresh();
    }, { once: true });
    addEventListener('site:failed', () => media.revert(), { once: true });
  }
  window.SiteModules.initPhoneTransition = initPhoneTransition;
})();
