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
      scrollTrigger: { trigger: '.gateways-features', start: 'top 88%', toggleActions: 'play none none reverse' } });
  }, document.querySelector('.gateways-section'));
}

function hand() {
  const section = document.querySelector('.brand-hand-section');
  const timeline = gsap.timeline({ paused: true });
  timeline.fromTo(section.querySelector('.brand-hand-art'), { autoAlpha: 0, scale: .68, y: 88 },
    { autoAlpha: 1, scale: 1, y: 0, duration: 1.3, ease: 'power3.out' }, 0);
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

function floatingBar(reduced) {
  const bar = document.querySelector('.floating-bar');
  const link = bar.querySelector('a');
  let active = false, frame = 0;
  const contrast = () => {
    frame = 0;
    const rect = bar.getBoundingClientRect();
    const light = active && [...document.querySelectorAll('.value-section, .projects-section, .process-timeline')].some(section => {
      const other = section.getBoundingClientRect();
      return rect.left < other.right && rect.right > other.left && rect.top < other.bottom && rect.bottom > other.top;
    });
    bar.classList.toggle('floating-bar--claro', light);
  };
  const update = value => {
    active = value; bar.classList.toggle('floating-bar--ativo', value);
    bar.setAttribute('aria-hidden', String(!value)); link.tabIndex = value ? 0 : -1;
    contrast();
  };
  if (reduced) {
    const visibility = () => update(document.querySelector('.value-section').getBoundingClientRect().top <= innerHeight*.7 && document.querySelector('.site-footer').getBoundingClientRect().top > innerHeight*.85);
    addEventListener('scroll', visibility, { passive: true }); visibility();
  } else {
    ScrollTrigger.create({ trigger: '.value-section', start: 'top 70%', onEnter: () => update(true), onLeaveBack: () => update(false) });
    ScrollTrigger.create({ trigger: '.site-footer', start: 'top 85%', onEnter: () => update(false), onLeaveBack: () => update(true) });
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(contrast); };
  addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule);
  setInterval(contrast, 200);
}

function walletAndProjects() {
  const headline = document.querySelector('.wallet-headline');
  const timeline = gsap.timeline({ scrollTrigger: { trigger: headline, start: 'top 85%', end: 'top 30%', scrub: .5 } });
  timeline.fromTo(headline.querySelectorAll('.wallet-word'), { opacity: .12 }, { opacity: 1, stagger: .12, duration: 1, ease: 'none' });
  timeline.fromTo('.wallet-left-copy', { opacity: 0, x: -64 }, { opacity: 1, x: 0, duration: 1.4, ease: 'power1.out' }, '>-0.02');
  timeline.fromTo('.wallet-right-copy', { opacity: 0, x: 64 }, { opacity: 1, x: 0, duration: 1.4, ease: 'power1.out' }, '<0.12');
  gsap.fromTo('.wallet-art', { scale: .7, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none',
    scrollTrigger: { trigger: document.querySelector('.wallet-section'), start: 'top bottom', end: 'bottom bottom', scrub: .5 } });
  gsap.timeline({ scrollTrigger: { trigger: '.projects-section', start: 'top 82%', end: 'top 38%', scrub: .5 } })
    .fromTo(document.querySelectorAll('.projects-headline, .projects-sub, .project-card'), { opacity: 0, y: 52 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power1.out', stagger: .14 });
}

function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Mesma ordem dos efeitos de montagem da referência, inclusive o pin.
  counters();
  if (!reduced) { clouds(); processTimeline(); whySection(); gateways(); hand(); faq(); }
  floatingBar(reduced);
  if (!reduced) walletAndProjects();
  const refresh = () => ScrollTrigger.refresh();
  addEventListener('load', refresh, { once: true });
  addEventListener('preloader:done', refresh, { once: true });
  document.fonts.ready.then(refresh);
  setTimeout(refresh, 800); setTimeout(refresh, 1200);
}
window.SiteModules.initAnimations = initAnimations;
})();
