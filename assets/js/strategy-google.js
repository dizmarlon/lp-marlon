(() => {
  'use strict';

  function initStrategyGoogle() {
    const story = document.querySelector('[data-strategy-story]');
    const { gsap, ScrollTrigger } = window.SiteModules || {};
    if (!story || !gsap || !ScrollTrigger || story.dataset.strategyReady) return;
    story.dataset.strategyReady = 'true';

    const stage = story.querySelector('.strategy-stage');
    const intro = story.querySelector('.strategy-section');
    const copy = story.querySelector('.strategy-copy');
    const mockup = story.querySelector('.strategy-mockup');
    const image = mockup.querySelector('img');
    const screen = story.querySelector('.google-search-section');
    const phrase = screen.querySelector('.google-query-text');
    const caret = screen.querySelector('.google-query-caret');
    const video = story.querySelector('.strategy-video');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let near = false, covered = false;

    // O vídeo só é baixado ao entrar na seção e pausa fora dela. O toque continua nativo.
    function syncVideo() {
      if (!near || covered || document.hidden || reduce.matches) { video.pause(); return; }
      const source = video.querySelector('source');
      if (!source.src) { source.src = source.dataset.src; video.load(); }
      video.play().catch(() => {});
    }
    const observer = new IntersectionObserver(entries => {
      near = entries[0].isIntersecting && entries[0].intersectionRatio > .01;
      syncVideo();
    }, { threshold: [0, .01] });
    observer.observe(intro);
    document.addEventListener('visibilitychange', syncVideo);
    reduce.addEventListener('change', syncVideo);

    // Projeta um retângulo nos quatro cantos da tela do notebook. Só transforma
    // uma camada; as medidas são lidas no refresh, nunca em cada frame do scroll.
    function project(points, width, height) {
      const [p0, p1, p2, p3] = points;
      const dx1 = p1.x - p2.x, dx2 = p3.x - p2.x;
      const dy1 = p1.y - p2.y, dy2 = p3.y - p2.y;
      const dx3 = p0.x - p1.x + p2.x - p3.x;
      const dy3 = p0.y - p1.y + p2.y - p3.y;
      const determinant = dx1 * dy2 - dx2 * dy1;
      const g = Math.abs(determinant) < .0001 ? 0 : (dx3 * dy2 - dx2 * dy3) / determinant;
      const h = Math.abs(determinant) < .0001 ? 0 : (dx1 * dy3 - dx3 * dy1) / determinant;
      const a = (p1.x - p0.x + g * p1.x) / width;
      const b = (p3.x - p0.x + h * p3.x) / height;
      const d = (p1.y - p0.y + g * p1.y) / width;
      const e = (p3.y - p0.y + h * p3.y) / height;
      return `matrix3d(${a},${d},0,${g / width},${b},${e},0,${h / height},0,0,1,0,${p0.x},${p0.y},0,1)`;
    }

    const media = gsap.matchMedia();
    media.add({ all: 'all', mobile: '(max-width: 640px)', touch: '(pointer: coarse)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduce) return;
      const direct = context.conditions.mobile || context.conditions.touch;
      const state = { progress: 0 };
      let width = 0, height = 0, viewport = 0, distance = 0;
      let sourcePoints = [], destinationPoints = [];

      function render() {
        const progress = state.progress;
        // A tela primeiro se desprende para baixo e depois se abre para o visitante.
        const drop = Math.sin(progress * Math.PI) * Math.min(viewport * .19, 160);
        const points = sourcePoints.map((point, index) => ({
          x: point.x + (destinationPoints[index].x - point.x) * progress,
          y: point.y + (destinationPoints[index].y - point.y) * progress + drop
        }));
        screen.style.transform = project(points, width, height);
        const nextCovered = progress >= .999;
        if (nextCovered !== covered) { covered = nextCovered; syncVideo(); }
      }

      function measure() {
        // 100svh permanece estável ao recolher a barra do navegador no celular.
        const probe = document.createElement('div');
        probe.style.cssText = 'position:absolute;height:100svh;width:0;pointer-events:none;visibility:hidden';
        stage.append(probe);
        viewport = probe.offsetHeight;
        probe.remove();
        height = Math.max(viewport, intro.offsetHeight);
        width = stage.clientWidth;
        distance = Math.round(viewport * (direct ? 1.5 : 1.8));
        const bounds = image.getBoundingClientRect();
        const stageBounds = stage.getBoundingClientRect();
        const left = bounds.left - stageBounds.left;
        const top = bounds.top - stageBounds.top;
        const imageWidth = Number(image.getAttribute('width'));
        const imageHeight = Number(image.getAttribute('height'));
        sourcePoints = [[525, 145], [945, 39], [945, 451], [525, 465]].map(([x, y]) => ({
          x: left + x / imageWidth * bounds.width,
          y: top + y / imageHeight * bounds.height
        }));
        destinationPoints = [{ x: 0, y: 0 }, { x: width, y: 0 }, { x: width, y: height }, { x: 0, y: height }];
        story.style.setProperty('--strategy-height', `${height}px`);
        story.style.setProperty('--strategy-distance', `${distance}px`);
        render();
      }

      measure();
      story.dataset.strategyMotion = 'true';
      gsap.set(screen, { opacity: 0 });
      gsap.set(phrase, { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.set(caret, { opacity: 0 });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'strategy-google-transition', trigger: story,
          start: () => `top ${Math.min(0, viewport - height)}px`,
          end: () => `+=${distance}`,
          scrub: direct ? true : .3,
          invalidateOnRefresh: true,
          refreshPriority: 3,
          onRefresh: render
        }
      });
      timeline.to(screen, { opacity: 1, duration: .06 }, .10)
        .to(state, { progress: 1, duration: .58, ease: 'power2.inOut', onUpdate: render }, .10)
        .to(copy, { opacity: 0, duration: .25 }, .17)
        .to(mockup, { opacity: 0, duration: .25 }, .23)
        .to(phrase, { clipPath: 'inset(0% 0% 0% 0%)', duration: .19, ease: 'steps(19)' }, .74)
        .to(caret, { opacity: 1, duration: .02 }, .93)
        .to({}, { duration: .12 });

      ScrollTrigger.addEventListener('refreshInit', measure);
      // Se o visitante chegar por uma âncora ou rolar rápido, usa o estado correto.
      timeline.scrollTrigger.update();
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', measure);
        delete story.dataset.strategyMotion;
        story.style.removeProperty('--strategy-height');
        story.style.removeProperty('--strategy-distance');
        screen.style.removeProperty('transform');
        covered = false;
        syncVideo();
      };
    });

    image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    addEventListener('site:failed', () => { media.revert(); video.pause(); }, { once: true });
  }

  window.SiteModules.initStrategyGoogle = initStrategyGoogle;
})();
