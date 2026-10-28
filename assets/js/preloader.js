// A abertura funciona sem aguardar as bibliotecas e as seções abaixo da primeira tela.
(() => {
  'use strict';
  const overlay = document.querySelector('.preloader');
  if (!overlay) return;
  const bar = overlay.querySelector('.preloader-bar');
  const counter = overlay.querySelector('.preloader-count');
  const name = overlay.querySelector('.preloader-name');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let target = 0, value = 0, finished = false, frame;
  document.documentElement.classList.add('is-preloading');
  document.body.style.overflow = 'hidden';
  const paint = () => {
    counter.textContent = `${String(Math.round(value)).padStart(2, '0')}%`;
    bar.style.transform = `scaleX(${value / 100})`;
  };
  function tick() {
    value += (target - value) * .18;
    if (target - value < .5) value = target;
    paint();
    if (!finished) frame = requestAnimationFrame(tick);
  }
  function remove() {
    document.documentElement.classList.remove('is-preloading');
    document.body.style.overflow = '';
    overlay.remove();
    dispatchEvent(new Event('preloader:done'));
  }
  function finish() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frame);
    value = 100;
    paint();
    if (reduced) { remove(); return; }
    [name, bar.parentElement, counter].forEach(element => {
      element.style.transition = 'opacity .1s ease';
      element.style.opacity = '0';
    });
    overlay.style.transition = 'transform .14s cubic-bezier(.76, 0, .24, 1)';
    requestAnimationFrame(() => { overlay.style.transform = 'translate3d(0,-100%,0)'; });
    setTimeout(remove, 170);
  }
  frame = requestAnimationFrame(tick);
  const maximum = setTimeout(finish, 450);
  const image = document.querySelector('.hero-image');
  const imageReady = !image ? Promise.resolve() : image.complete ? image.decode().catch(() => {}) : new Promise(resolve => {
    image.addEventListener('load', () => image.decode().catch(() => {}).finally(resolve), { once: true });
    image.addEventListener('error', resolve, { once: true });
  });
  const fontsReady = document.fonts.load('500 16px "ZT Nature"').catch(() => {});
  let loaded = 0;
  [imageReady, fontsReady].forEach(p => p.finally(() => { target = ++loaded * 48; }));
  Promise.all([imageReady, fontsReady]).then(() => {
    clearTimeout(maximum);
    finish();
  });
})();
