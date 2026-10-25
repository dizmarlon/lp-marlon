// Mesmos tempos: mínimo 900 ms, limite 2000 ms, saída .25/.15/.7 s.
(function () {
 'use strict';
const { gsap } = window.SiteModules;

function resources() {
  const images = new Set(), videos = new Set();
  document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; if (image.currentSrc || image.src) images.add(image.currentSrc || image.src); });
  document.querySelectorAll('video:not([data-why-video])').forEach(video => {
    video.muted = true; video.preload = 'auto';
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){video.autoplay=false;video.pause();}
    else video.play().catch(() => {});
    if (video.poster) images.add(video.poster);
    const src = video.currentSrc || video.src || video.querySelector('source')?.src;
    if (src) videos.add(src);
  });
  document.querySelectorAll('body *').forEach(element => {
    for (const match of getComputedStyle(element).backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g)) images.add(match[1]);
  });
  return { images: [...images], videos: [...videos] };
}

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image(); image.decoding = 'async';
    image.onload = () => { image.decode().catch(() => {}).finally(resolve); };
    image.onerror = resolve; image.src = url;
  });
}

// Em file:// o próprio elemento de vídeo lê o arquivo; fetch local é bloqueado.
function loadVideo(url) {
  if (location.protocol !== 'file:') return fetch(url, { headers: { Range:'bytes=0-1500000' } }).then(r=>r.arrayBuffer()).catch(()=>{});
  const video = [...document.querySelectorAll('video')].find(v => (v.currentSrc || v.src || v.querySelector('source')?.src) === url);
  if (!video || video.readyState >= 2 || video.error) return Promise.resolve();
  return new Promise(resolve => {
    const finish = () => { clearTimeout(timer); video.removeEventListener('loadeddata',finish); video.removeEventListener('error',finish); resolve(); };
    const timer = setTimeout(finish,2000);
    video.addEventListener('loadeddata',finish,{once:true}); video.addEventListener('error',finish,{once:true});
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
    } }).to(state, { value:100, duration: reduced ? 0 : .25, ease:'power2.out', onUpdate:paint })
      .to([name,bar.parentElement,counter], { opacity:0, filter:'blur(2px)', duration:reduced ? 0 : .15 })
      .to(overlay, { yPercent:-100, duration:reduced ? 0 : .7, ease:'power4.inOut' }, reduced ? '>' : '-=0.05');
  };
  const maximum = setTimeout(finish, 2000);
  requestAnimationFrame(() => {
    const { images, videos } = resources();
    const promises = [...images.map(loadImage), ...videos.map(loadVideo), document.fonts.ready];
    let loaded=0;
    promises.forEach(p=>p.finally(()=>{ loaded++; target=Math.max(target,loaded/promises.length*96); }));
    Promise.all(promises).then(()=>setTimeout(()=>{ clearTimeout(maximum); finish(); }, Math.max(0,900-(performance.now()-started))));
  });
}
window.SiteModules.initPreloader = initPreloader;
})();
