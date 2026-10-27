// Animações transportadas do site capturado. Valores e breakpoints preservados.
(function () {
 'use strict';
const { gsap, ScrollTrigger } = window.SiteModules;

function counters() {
  const section = document.querySelector('.stats-section');
  const nodes = [...section.querySelectorAll('[data-count]')];
  const values = nodes.map(node => Number(node.textContent));
  nodes.forEach((node,index)=>{node.dataset.countFinal=String(values[index]);});
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tweens = [];
  const reset = () => { tweens.splice(0).forEach(t => t.kill()); nodes.forEach(node => { node.textContent = '0'; }); };
  const play = () => {
    reset();
    nodes.forEach((node, index) => {
      if (reduce) { node.textContent = String(values[index]); return; }
      const state = { value: 0 };
      tweens.push(gsap.to(state, { value: values[index], duration: 1.8, delay: index * .08, ease: 'power2.out',
        onUpdate: () => { node.textContent = String(Math.round(state.value)); },
        onComplete: () => { node.textContent = String(values[index]); }
      }));
    });
  };
  ScrollTrigger.create({ trigger: section, start: 'top 82%', onEnter: play, onLeaveBack: reset });
  if (!reduce) gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 92%', end: 'top 55%', scrub: .5 } })
    .fromTo(section.querySelector('.stats-container'), { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power1.out' });
}

function clouds() {
  const wrap = document.querySelector('.fraaame-cloud-wrap');
  const section = wrap.parentElement;
  const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .3 } });
  [[1, -20, 35], [2, -10, 20], [3, 25, -30]].forEach(([layer, from, to], index) => {
    timeline.fromTo(wrap.querySelectorAll(`[data-cloud-layer="${layer}"]`), { yPercent: from }, { yPercent: to, ease: 'none' }, index === 0 ? 0 : '<');
  });
  [[1,-5,7],[2,6,-6],[3,-4,5],[4,5,-7],[5,-6,4],[6,4,-4]].forEach(([number,from,to]) => {
    gsap.fromTo(wrap.querySelector(`.fc-b${number}`), { y: from }, { y: to, ease: 'sine.inOut',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .8 }
    });
  });
}

function processTimeline() {
  const section = document.querySelector('.process-timeline');
  const media = gsap.matchMedia();
  function setup(mobile) {
    const line = section.querySelector(mobile ? '.process-path-mobile .process-line-active' : '.process-path-desktop .process-line-active');
    const steps = [...section.querySelectorAll('.process-step')];
    const length = line.getTotalLength();
    const points = mobile ? [0,.2,.4,.6,.8,1].map(p => length * p) : [0,326,652,length-652,length-326,length];
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(steps.slice(1), { opacity: .28 });
    const timeline = gsap.timeline({ scrollTrigger: {
      trigger: section, start: 'top top', end: () => `+=${Math.round(innerHeight * (mobile ? 2.4 : 3.2))}`,
      pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true
    } });
    for (let i=1; i<steps.length; i++) {
      timeline.to(line, { strokeDashoffset: length-points[i], duration: 1, ease: 'none' }, i-1);
      timeline.to(steps[i], { opacity: 1, duration: .5, ease: 'none' }, i-1+.5);
    }
    return () => {
      timeline.scrollTrigger?.kill(); timeline.kill();
      gsap.set(steps, { clearProps: 'all' }); gsap.set(line, { clearProps: 'all' });
    };
  }
  media.add('(min-width: 761px)', () => setup(false));
  media.add('(max-width: 760px)', () => setup(true));
}

function whySection() {
  gsap.context(() => {
    gsap.fromTo('.why-head', { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: '.why-head', start: 'top 84%', toggleActions: 'play none none reverse' } });
    gsap.fromTo('.why-card', { y: 64, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .12, ease: 'power3.out',
      scrollTrigger: { trigger: '.why-grid', start: 'top 86%', toggleActions: 'play none none reverse' } });
  }, document.querySelector('.why-section'));
}

function gateways() {
  gsap.context(() => {
    gsap.fromTo('.gateways-head', { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: '.gateways-head', start: 'top 82%', toggleActions: 'play none none reverse' } });
    gsap.fromTo('.gateways-panel', { y: 90, opacity: 0, scale: .97 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.gateways-panel', start: 'top 85%', toggleActions: 'play none none reverse' } });
    gsap.fromTo('.gateways-feature', { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .12, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-list', start: 'top 88%', toggleActions: 'play none none reverse' } });
  }, document.querySelector('.gateways-section'));
}

function hand() {
  const section = document.querySelector('.brand-hand-section');
  const timeline = gsap.timeline({ paused: true });

  timeline.fromTo(section.querySelector('.brand-hand-copy').children, { autoAlpha: 0, y: 38 },
    { autoAlpha: 1, y: 0, stagger: .12, duration: .8, ease: 'power3.out' }, .1);
  ScrollTrigger.create({ trigger: section, start: 'top 90%', animation: timeline, toggleActions: 'play none none reverse', invalidateOnRefresh: true });
}

function faq() {
  const section = document.querySelector('.faq-section');
  const timeline = gsap.timeline({ paused: true });
  timeline.fromTo(section.querySelectorAll('.faq-title, .faq-subtitle, .faq-row'), { autoAlpha: 0, y: 44 },
    { autoAlpha: 1, y: 0, stagger: .08, duration: .9, ease: 'power3.out' });
  const trigger = ScrollTrigger.create({ trigger: section, start: 'top 90%', invalidateOnRefresh: true,
    onEnter: () => timeline.play(), onLeaveBack: () => timeline.reverse() });
  if (trigger.progress > 0 || trigger.scroll() > trigger.start) timeline.progress(1);
}

function valueTextReveal() {
  const heading = document.getElementById('value-heading');
  if (!heading) return;
  const label = document.createElement('span');
  label.className = 'value-reveal-label';
  // Keep the original text nodes so the language switch retains their source.
  label.append(...heading.childNodes);
  const visual = document.createElement('span');
  visual.className = 'value-reveal-visual';
  visual.setAttribute('aria-hidden', 'true');
  visual.dataset.noTranslate = 'true';
  heading.append(label, visual);
  let media;
  function rebuild() {
    media?.revert();
    const fragment = document.createDocumentFragment();
    for (const part of label.textContent.match(/\S+|\s+/g) || []) {
      if (/^\s+$/.test(part)) fragment.append(document.createTextNode(part));
      else {
        const word = document.createElement('span');
        word.className = 'value-reveal-word'; word.textContent = part;
        fragment.append(word);
      }
    }
    visual.replaceChildren(fragment);
    const words = visual.querySelectorAll('.value-reveal-word');
    media = gsap.matchMedia();
    media.add({ all: 'all', reduce: '(prefers-reduced-motion: reduce)', small: '(max-width: 760px)', touch: '(pointer: coarse)' }, context => {
      if (context.conditions.reduce) return;
      const entrance = context.conditions.small || context.conditions.touch;
      gsap.fromTo(words, { opacity: .18 }, {
        opacity: 1, duration: entrance ? .6 : 1,
        stagger: entrance ? { amount: .75 } : .08,
        ease: entrance ? 'power2.out' : 'none',
        scrollTrigger: { id: 'value-text-reveal', trigger: heading, start: 'top 85%',
          ...(entrance ? { once: true } : { end: 'bottom 60%', scrub: .45 }) }
      });
    });
    ScrollTrigger.refresh();
  }
  rebuild();
  addEventListener('site:language', rebuild);
}

function growthAnimations() {
  const section = document.querySelector('.growth-section');
  if (!section) return;
  const headline = section.querySelector('.growth-headline');
  const words = headline.querySelectorAll('.growth-word');
  const image = section.querySelector('.growth-art');
  const media = gsap.matchMedia();
  media.add({
    all: 'all',
    small: '(max-width: 1100px)',
    touch: '(pointer: coarse)',
    reduce: '(prefers-reduced-motion: reduce)'
  }, context => {
    const { small, touch, reduce } = context.conditions;
    section.dataset.growthAnimation = reduce ? 'reduced' : small || touch ? 'entrance' : 'scroll';
    if (reduce) return () => { delete section.dataset.growthAnimation; };

    if (small || touch) {
      // No celular, cada parte entra quando ela própria chega à tela.
      // A rolagem por toque pode atravessar toda a faixa do scrub em um gesto.
      gsap.fromTo(words, { opacity: .12 }, { opacity: 1, stagger: .06, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: headline, start: 'top 88%', once: true } });
      ['.growth-left-copy', '.growth-right-copy'].forEach((selector, index) => {
        const element = section.querySelector(selector);
        gsap.fromTo(element, { autoAlpha: 0, x: index ? 28 : -28 }, { autoAlpha: 1, x: 0, duration: .75, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
      });

      // Em conexão lenta, a imagem ainda precisa fazer a entrada depois de carregar.
      let entered = false;
      const imageTween = gsap.fromTo(image, { autoAlpha: 0, scale: .82, y: 24 },
        { autoAlpha: 1, scale: 1, y: 0, duration: .85, ease: 'power3.out', paused: true });
      const playImage = () => { if (entered && image.complete && image.naturalWidth > 0) imageTween.play(); };
      const imageLoaded = () => { ScrollTrigger.refresh(); playImage(); };
      image.addEventListener('load', imageLoaded);
      ScrollTrigger.create({ trigger: section.querySelector('.growth-art-position'), start: 'top 90%', once: true,
        onEnter: () => { entered = true; playImage(); } });
      return () => {
        image.removeEventListener('load', imageLoaded);
        delete section.dataset.growthAnimation;
      };
    }

    const timeline = gsap.timeline({ scrollTrigger: { trigger: headline, start: 'top 85%', end: 'top 30%', scrub: .5 } });
    timeline.fromTo(words, { opacity: .12 }, { opacity: 1, stagger: .12, duration: 1, ease: 'none' });
    timeline.fromTo(section.querySelector('.growth-left-copy'), { opacity: 0, x: -64 }, { opacity: 1, x: 0, duration: 1.4, ease: 'power1.out' }, '>-0.02');
    timeline.fromTo(section.querySelector('.growth-right-copy'), { opacity: 0, x: 64 }, { opacity: 1, x: 0, duration: 1.4, ease: 'power1.out' }, '<0.12');
    gsap.fromTo(image, { scale: .7, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom bottom', scrub: .5 } });
    return () => { delete section.dataset.growthAnimation; };
  });
}

function projectAnimations() {
  gsap.timeline({ scrollTrigger: { trigger: '.projects-section', start: 'top 82%', end: 'top 38%', scrub: .5 } })
    .fromTo(document.querySelectorAll('.projects-headline, .projects-sub, .project-card'), { opacity: 0, y: 52 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power1.out', stagger: .14 });
}

function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Os gatilhos da terceira seção são recalculados também ao mudar a preferência de movimento.
  valueTextReveal();
  growthAnimations();
  counters();
  window.SiteModules.initPhoneTransition?.();
  if (!reduced) { hand(); faq(); }
  if (!reduced) projectAnimations();
  let refreshPending = false;
  const refresh = () => {
    if (refreshPending) return;
    refreshPending = true;
    requestAnimationFrame(() => { refreshPending = false; ScrollTrigger.refresh(); });
  };
  addEventListener('load', refresh, { once: true });
  addEventListener('preloader:done', refresh, { once: true });
  document.fonts.ready.then(refresh);
}
window.SiteModules.initAnimations = initAnimations;
})();
