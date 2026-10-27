/* Our Vision: expansão no desktop e navegação nativa dos projetos. */
(() => {
  'use strict';
  (window.SiteModules?.stylesReady || Promise.resolve()).then(() => {
    const section = document.querySelector('.portfolio-vision');
    if (!section || section.dataset.visionReady) return;
    section.dataset.visionReady = 'true';
    const stage = section.querySelector('.portfolio-vision-stage');
    const intro = section.querySelector('.portfolio-vision-intro');
    const preview = section.querySelector('.portfolio-vision-preview');
    const viewer = section.querySelector('.portfolio-vision-viewer');
    const track = section.querySelector('.portfolio-vision-track');
    const cards = [...track.querySelectorAll('.project-card')];
    const controls = section.querySelector('.portfolio-vision-controls');
    const previous = controls.querySelector('[data-vision-prev]');
    const next = controls.querySelector('[data-vision-next]');
    const status = controls.querySelector('.portfolio-vision-status');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let current = -1, scrollFrame = 0, trackWidth = track.clientWidth, navigationTarget = null;
    function update(index) {
      const active = Math.max(0, Math.min(cards.length - 1, index));
      if (active === current) return;
      current = active;
      cards.forEach((card, i) => {
        card.classList.toggle('is-current', i === current);
        card.toggleAttribute('inert', i !== current);
        card.setAttribute('aria-hidden', String(i !== current));
      });
      previous.disabled = current === 0;
      next.disabled = current === cards.length - 1;
      status.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    }
    function select(index) {
      update(index);
      navigationTarget = current;
      const image = cards[current].querySelector('img');
      if (image) image.loading = 'eager';
      track.scrollTo({ left: current * track.clientWidth, behavior: reduced.matches ? 'instant' : 'smooth' });
    }
    previous.addEventListener('click', () => select(current - 1));
    next.addEventListener('click', () => select(current + 1));
    viewer.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const fromCard = event.target.closest('.project-card');
      const focusSelector = event.target.closest('.project-pill') ? '.project-pill' : '.project-media';
      select(current + (event.key === 'ArrowRight' ? 1 : -1));
      if (fromCard) cards[current].querySelector(focusSelector)?.focus({ preventScroll: true });
    });
    track.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        if (navigationTarget !== null) {
          if (Math.abs(track.scrollLeft - navigationTarget * track.clientWidth) > 2) return;
          navigationTarget = null;
        }
        if (track.clientWidth) update(Math.round(track.scrollLeft / track.clientWidth));
      });
    }, { passive: true });
    const nativeInput = () => { navigationTarget = null; };
    track.addEventListener('pointerdown', nativeInput, { passive: true });
    track.addEventListener('wheel', nativeInput, { passive: true });
    const resize = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      if (Math.abs(width - trackWidth) < 1) return;
      trackWidth = width;
      navigationTarget = null;
      track.scrollTo({ left: current * width, behavior: 'instant' });
    });
    resize.observe(track);
    controls.hidden = false;
    update(0);

    const { gsap, ScrollTrigger } = window.SiteModules || {};
    if (!gsap || !ScrollTrigger) return;
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 1025px) and (hover: hover) and (pointer: fine)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (!context.conditions.desktop || context.conditions.reduce) return;
      section.dataset.visionMotion = 'true';
      const captions = cards.map(card => card.querySelector('.portfolio-vision-caption'));
      let origin = { scale: 1, x: 0, y: 0 };
      const measureOrigin = () => {
        const width = viewer.offsetWidth, height = viewer.offsetHeight;
        stage.style.setProperty('--vision-preview-ratio', `${width} / ${height}`);
        const slot = preview.getBoundingClientRect();
        const bounds = stage.getBoundingClientRect();
        origin = {
          scale: slot.width / width,
          x: slot.left - bounds.left + slot.width / 2 - viewer.offsetLeft - width / 2,
          y: slot.top - bounds.top + slot.height / 2 - viewer.offsetTop - height / 2
        };
      };
      measureOrigin();
      gsap.set(viewer, { opacity: 1, transformOrigin: '50% 50%' });
      gsap.set([...captions, controls], { opacity: 0 });
      viewer.setAttribute('inert', '');
      const access = trigger => viewer.toggleAttribute('inert', trigger.progress < .74);
      ScrollTrigger.addEventListener('refreshInit', measureOrigin);
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'portfolio-vision-zoom', trigger: stage, start: 'top top',
          end: () => `+=${Math.round(innerHeight * 1.05)}`,
          pin: true, pinSpacing: true, scrub: true, anticipatePin: 1,
          invalidateOnRefresh: true, refreshPriority: 2,
          onUpdate: access, onRefresh: access
        }
      });
      // A própria vitrine ocupa a prévia: não há uma segunda imagem nem troca de posição.
      // Zoom e fade terminam em 74%; o restante mantém tudo visível antes de soltar o pin.
      timeline.fromTo(viewer, {
        scale: () => origin.scale, x: () => origin.x, y: () => origin.y
      }, { scale: 1, x: 0, y: 0, duration: .65, ease: 'power2.inOut' }, .03)
        .to(intro, { opacity: 0, duration: .24 }, 0)
        .to([...captions, controls], { opacity: 1, duration: .16 }, .58)
        .to({}, { duration: .26 }, .74);
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', measureOrigin);
        stage.style.removeProperty('--vision-preview-ratio');
        delete section.dataset.visionMotion;
        viewer.removeAttribute('inert');
      };
    });

    // As medidas são lidas na entrada; o movimento usa apenas transforms.
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const events = new AbortController();
      for (const card of cards) {
        const button = card.querySelector('.project-media');
        const cursor = card.querySelector('.portfolio-vision-cursor');
        const x = gsap.quickTo(cursor, 'x', { duration: .18, ease: 'power2.out' });
        const y = gsap.quickTo(cursor, 'y', { duration: .18, ease: 'power2.out' });
        let bounds, cursorWidth = 0, cursorHeight = 0;
        const position = event => ({
          x: Math.max(12, Math.min(bounds.width - cursorWidth - 12, event.clientX - bounds.left + 14)),
          y: Math.max(12, Math.min(bounds.height - cursorHeight - 12, event.clientY - bounds.top + 14))
        });
        button.addEventListener('pointerenter', event => {
          if (event.pointerType !== 'mouse') return;
          bounds = button.getBoundingClientRect();
          cursorWidth = cursor.offsetWidth; cursorHeight = cursor.offsetHeight;
          gsap.set(cursor, position(event));
          cursor.setAttribute('data-pointer-active', '');
        }, { signal: events.signal });
        button.addEventListener('pointermove', event => {
          if (!bounds || event.pointerType !== 'mouse') return;
          const point = position(event);
          x(point.x); y(point.y);
        }, { signal: events.signal });
        const clear = () => { bounds = null; cursor.removeAttribute('data-pointer-active'); };
        button.addEventListener('pointerleave', clear, { signal: events.signal });
        button.addEventListener('pointercancel', clear, { signal: events.signal });
      }
      return () => { events.abort(); section.querySelectorAll('[data-pointer-active]').forEach(el => el.removeAttribute('data-pointer-active')); };
    });
    addEventListener('site:failed', () => { media.revert(); viewer.removeAttribute('inert'); });
  });
})();
