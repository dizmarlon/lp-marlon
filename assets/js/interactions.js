// Controles do DOM. Conteúdo, destinos e arquivos dos vídeos vêm do HTML.
(function () {
 'use strict';
function initInteractions(lenis) {
  const button = document.querySelector('.creative-burger');
  const menu = document.querySelector('.creative-mobile-menu');
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setMenu(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.hidden = !open;
  }
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
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
