// Carrega apenas os recursos necessários à primeira tela.
(function () {
 'use strict';
const { gsap } = window.SiteModules;

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image(); image.decoding = 'async';
    image.onload = () => { image.decode().catch(() => {}).finally(resolve); };
    image.onerror = resolve; image.src = url;
  });
}

function initPreloader() {
  const overlay = document.querySelector('.preloader');
  if (!overlay) return;
  const name = overlay.querySelector('.preloader-name');
  const bar = overlay.querySelector('.preloader-bar');
  const counter = overlay.querySelector('.preloader-count');
  document.documentElement.classList.add('is-preloading'); document.body.style.overflow = 'hidden';
  const started = performance.now(), state = { value: 0 };
  let target = 0, finished = false;
  const paint = () => { counter.textContent = `${Math.round(state.value)}%`; bar.style.transform = `scaleX(${state.value/100})`; };
  const tick = () => { state.value += (target-state.value)*.18; if (target-state.value < .5) state.value=target; paint(); };
  gsap.ticker.add(tick);
  const finish = () => {
    if (finished) return; finished = true; target=100; gsap.ticker.remove(tick);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.timeline({ onComplete: () => {
      document.documentElement.classList.remove('is-preloading'); document.body.style.overflow=''; overlay.remove();
      requestAnimationFrame(() => dispatchEvent(new Event('preloader:done')));
    } }).to(state, { value:100, duration: reduced ? 0 : .15, ease:'power2.out', onUpdate:paint })
      .to([name,bar.parentElement,counter], { opacity:0, duration:reduced ? 0 : .1 })
      .to(overlay, { yPercent:-100, duration:reduced ? 0 : .35, ease:'power4.inOut' }, reduced ? '>' : '-=0.04');
  };
  const maximum = setTimeout(finish, 1200);
  requestAnimationFrame(() => {
    const heroImage = matchMedia('(max-width: 640px)').matches ? './assets/images/eu-mobile.webp' : './assets/images/eu.webp';
    const promises = [loadImage(heroImage), document.fonts.load('500 16px "ZT Nature"').catch(() => {})];
    let loaded=0;
    promises.forEach(p=>p.finally(()=>{ loaded++; target=Math.max(target,loaded/promises.length*96); }));
    Promise.all(promises).then(()=>setTimeout(()=>{ clearTimeout(maximum); finish(); }, Math.max(0,450-(performance.now()-started))));
  });
}
window.SiteModules.initPreloader = initPreloader;
})();
