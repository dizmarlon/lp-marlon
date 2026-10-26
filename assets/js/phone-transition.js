(() => {
  'use strict';
  function initPhoneTransition() {
    const section = document.querySelector('[data-phone-transition]');
    const { gsap, ScrollTrigger } = window.SiteModules || {};
    if (!section || !gsap || !ScrollTrigger || section.dataset.phoneReady) return;
    section.dataset.phoneReady = 'true';
    const stage = section.querySelector('.phone-transition-stage');
    const scene = section.querySelector('.phone-transition-scene');
    const device = section.querySelector('.phone-transition-device');
    const image = device.querySelector('img');
    const backdrop = section.querySelector('.phone-transition-backdrop');
    const cue = section.querySelector('.phone-transition-cue');
    const content = section.nextElementSibling?.querySelector('.why-section');
    if (!content) return;
    const media = gsap.matchMedia();
    media.add({ all: 'all', mobile: '(max-width: 640px)', touch: '(pointer: coarse)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduce) return;
      const mobile = context.conditions.mobile;
      const direct = mobile || context.conditions.touch;
      const handoff = direct ? .66 : .74;
      section.dataset.phoneActive = 'true';
      section.removeAttribute('data-phone-complete');
      const anchor = mobile ? { x: 50.1, y: 39.5 } : { x: 50.8, y: 35.1 };
      // Mede a parte branca, não a largura total das mãos. A margem exclui o notch e os cantos.
      const coverScale = () => Math.max(
        stage.clientWidth / (device.offsetWidth * (mobile ? .30 : .46)),
        stage.clientHeight / (device.offsetHeight * (mobile ? .60 : .43))
      ) * 1.12;
      gsap.set(device, {
        x: 0, y: 0, xPercent: -anchor.x, yPercent: -anchor.y,
        transformOrigin: `${anchor.x}% ${anchor.y}%`, transformPerspective: direct ? 0 : 1600,
        force3D: !direct
      });
      gsap.set(content, { autoAlpha: 0, y: 18 });
      let revealed = false;
      // O fade termina pelo tempo, mesmo se o visitante parar ou acelerar a rolagem.
      const entrance = gsap.timeline({ paused: true })
        .fromTo(scene, { autoAlpha: 1 }, { autoAlpha: 0, duration: .18, ease: 'power1.out' })
        .call(() => section.setAttribute('data-phone-complete', ''))
        .to(content, { autoAlpha: 1, y: 0, duration: .55, ease: 'power2.out' });
      function syncEntrance(trigger, instant = false) {
        if (trigger.progress >= handoff) {
          if (revealed) return;
          revealed = true;
          if (instant || trigger.scroll() > trigger.end + stage.clientHeight) {
            entrance.progress(1);
            section.setAttribute('data-phone-complete', '');
          } else entrance.restart();
        } else if (revealed) {
          revealed = false;
          entrance.pause(0);
          section.removeAttribute('data-phone-complete');
        }
      }
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'phone-screen-transition', trigger: section, pin: stage,
          start: 'top top', end: () => `+=${Math.round(stage.clientHeight * (direct ? 2.05 : 1.8))}`,
          scrub: direct ? true : .55, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1,
          onUpdate: self => syncEntrance(self),
          onRefresh: self => syncEntrance(self, true)
        }
      });
      timeline.fromTo(device, { y: 0, rotateX: direct ? 0 : 14, scale: .96, opacity: 1 },
        { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: .12 }, 0);
      timeline.fromTo(cue, { opacity: 1 }, { opacity: 0, duration: .12 }, 0);
      timeline.to(device, {
        y: () => stage.clientHeight / 2 - device.offsetTop,
        scale: coverScale, duration: direct ? .5 : .6
      }, .12);
      timeline.set(backdrop, { backgroundColor: '#fff' }, direct ? .62 : .72);
      timeline.to(device, { opacity: 0, duration: direct ? .38 : .28 }, direct ? .62 : .72);
      return () => { delete section.dataset.phoneActive; section.removeAttribute('data-phone-complete'); };
    });
    image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    image.addEventListener('error', () => {
      media.revert(); section.hidden = true; ScrollTrigger.refresh();
    }, { once: true });
    addEventListener('site:failed', () => media.revert(), { once: true });
  }
  window.SiteModules.initPhoneTransition = initPhoneTransition;
})();
