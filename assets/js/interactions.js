// Controles do DOM. Conteúdo, destinos e arquivos dos vídeos vêm do HTML.
(function () {
 'use strict';
function initInteractions(lenis) {
  const button = document.querySelector('.creative-burger');
  const menu = document.querySelector('.creative-mobile-menu');
  const header = document.querySelector('.creative-nav');
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setMenu(open) {
    if (button.getAttribute('aria-expanded') === String(open) && menu.hidden === !open) return;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.hidden = !open;
  }
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  // Fora da hero para que overflow, transformações e pins não recortem a barra fixa.
  document.body.append(header, menu);
  let previousY = Math.max(0, window.scrollY), travel = 0, direction = 0, scheduled = false, ignoreUntil = 0, nextThemeAt = 0;
  function updateNavigation() {
    scheduled = false;
    const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - innerHeight));
    const delta = y - previousY;
    previousY = y;
    const floating = y > 120;
    const modeChanged = floating !== header.classList.contains('is-scroll-nav');
    if (modeChanged) header.classList.remove('is-nav-animated', 'is-visible', 'is-light');
    header.classList.toggle('is-scroll-nav', floating);
    menu.classList.toggle('is-scroll-menu', floating);
    if (!floating) {
      header.classList.remove('is-visible', 'is-light');
      header.removeAttribute('inert');
      travel = 0;
      direction = 0;
      return;
    }
    if (modeChanged) {
      // A primeira pintura fixa já nasce oculta. Anima só depois, ao subir a página.
      setMenu(false);
      header.setAttribute('inert', '');
      travel = 0; direction = 0;
      requestAnimationFrame(() => {
        if (header.classList.contains('is-scroll-nav')) header.classList.add('is-nav-animated');
      });
      return;
    }
    const wasVisible = header.classList.contains('is-visible');
    if (performance.now() >= ignoreUntil && Math.abs(delta) > .1) {
      const nextDirection = Math.sign(delta);
      travel = nextDirection === direction ? travel + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;
      if (travel >= (direction < 0 ? 12 : 8)) {
        const visible = direction < 0;
        header.classList.toggle('is-visible', visible);
        if (!visible) setMenu(false);
      }
    }
    const visible = header.classList.contains('is-visible');
    header.toggleAttribute('inert', !visible);
    if (visible && (!wasVisible || performance.now() >= nextThemeAt)) {
      nextThemeAt = performance.now() + 120;
      const beneath = document.elementsFromPoint(innerWidth / 2, header.getBoundingClientRect().height / 2)
        .find(element => !header.contains(element) && !menu.contains(element) && element.closest('section, .creative-hero, .site-footer'));
      let light = !!beneath?.closest('.value-section, .projects-section, .why-section, .site-footer');
      for (let element = beneath; element && element !== document.body; element = element.parentElement) {
        const color = getComputedStyle(element).backgroundColor;
        const rgb = color.match(/^rgba?\(([^)]+)\)/)?.[1].split(',').map(Number);
        if (rgb && (rgb[3] ?? 1) >= .85) {
          light = (.2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2]) > 155;
          break;
        }
      }
      header.classList.toggle('is-light', light);
    }
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (matchMedia('(min-width: 1025px)').matches && header.classList.contains('is-scroll-nav')) setMenu(false);
    updateNavigation();
  });
  window.addEventListener('pageshow', updateNavigation);
  // A troca de idioma recalcula o layout; esse deslocamento não é intenção de rolagem.
  window.addEventListener('site:language', () => { ignoreUntil = performance.now() + 600; travel = 0; });
  updateNavigation();
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && !button.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { setMenu(false); button.focus({ preventScroll: true }); }
  });
  document.addEventListener('click', event => {
    if (event.defaultPrevented) return;
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || anchor.dataset.masterLink === 'configure') return;
    const target = anchor.getAttribute('href');
    if (target === '#' || !target) return;
    const element = document.getElementById(target.slice(1));
    if (!element) return;
    event.preventDefault(); setMenu(false);
    if (lenis && !reduced()) lenis.scrollTo(element, { offset: target === '#top' ? 0 : -32 });
    else element.scrollIntoView({ behavior:'instant' });
    // A referência atualiza a pílula ao clicar nos quatro itens do cabeçalho.
    if (anchor.closest('.creative-pill, .creative-mobile-menu, .creative-cta-row')) {
      document.querySelectorAll('.creative-pill a').forEach(link => {
        const active = link.getAttribute('href') === target;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
      });
    }
  });
  document.querySelectorAll('.project-media').forEach(link => link.addEventListener('click', event => event.preventDefault()));

  document.querySelectorAll('.faq-answer').forEach(answer => answer.setAttribute('inert', ''));
  document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
    const wasOpen = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(other => {
      const open = other === button && !wasOpen;
      other.setAttribute('aria-expanded', String(open));
      other.closest('.faq-row').classList.toggle('is-open', open);
      document.getElementById(other.getAttribute('aria-controls'))?.toggleAttribute('inert', !open);
    });
  }));

  const template = document.getElementById('project-video-template');
  let dialog = null, previousFocus = null, previousOverflow = '';
  function closeVideo() {
    if (!dialog) return;
    dialog.querySelector('video').pause(); dialog.remove(); dialog=null;
    document.body.style.overflow=previousOverflow;
    if (!reduced()) lenis?.start();
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll:true });
  }
  document.querySelectorAll('.project-view, .project-pill').forEach(button => button.addEventListener('click', () => {
    closeVideo(); previousFocus=button;
    const card = button.closest('.project-card');
    const fragment = template.content.cloneNode(true);
    dialog = fragment.querySelector('.project-video-modal');
    dialog.setAttribute('aria-label', `Vídeo do projeto ${card.querySelector('h3').textContent}`);
    const video = dialog.querySelector('video'); video.muted=true; video.src=card.dataset.projectVideo;
    dialog.querySelector('.project-video-close').addEventListener('click', closeVideo);
    dialog.addEventListener('click', event => { if (event.target === dialog) closeVideo(); });
    previousOverflow=document.body.style.overflow; document.body.style.overflow='hidden'; lenis?.stop();
    document.querySelector('main').append(fragment);
    video.play().catch(()=>{}); dialog.querySelector('.project-video-close').focus({ preventScroll:true });
  }));
  document.addEventListener('keydown', event => {
    if (!dialog) return;
    if (event.key === 'Escape') { event.preventDefault(); closeVideo(); }
    if (event.key === 'Tab') { event.preventDefault(); dialog.querySelector('.project-video-close').focus(); }
  });

}
window.SiteModules.initInteractions = initInteractions;
})();
