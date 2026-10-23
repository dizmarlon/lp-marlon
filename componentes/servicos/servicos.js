// Componente recebido, integrado à página e aos controles de teclado.
(() => {
  'use strict';
  const iniciar = raiz => {
    if (raiz.dataset.pfsIniciado) return;
    raiz.dataset.pfsIniciado = '1';
    if ('IntersectionObserver' in window) {
      raiz.classList.add('pfs-js');
      const observador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add('pfs-is-in');
          observador.unobserve(entrada.target);
        });
      }, {threshold: .01});
      raiz.querySelectorAll('[data-pfs-reveal]').forEach(el => observador.observe(el));
    }
    const desktop = matchMedia('(min-width: 900px)');
    raiz.querySelectorAll('[data-pfs-acc]').forEach(acc => {
      const paineis = [...acc.querySelectorAll('[data-pfs-acc-panel]')];
      function atualizar() {
        paineis.forEach(painel => {
          const ativo = painel.classList.contains('pfs-is-active');
          const content = painel.querySelector('.pfs-acc__content');
          content.toggleAttribute('inert', desktop.matches && !ativo);
          if (desktop.matches) {
            painel.tabIndex = 0; painel.setAttribute('role', 'button');
            painel.setAttribute('aria-expanded', String(ativo));
          } else {
            painel.removeAttribute('tabindex'); painel.removeAttribute('role');
            painel.removeAttribute('aria-expanded');
          }
        });
      }
      function ativar(painel) {
        if (!desktop.matches) return;
        paineis.forEach(p => p.classList.toggle('pfs-is-active', p === painel));
        atualizar();
      }
      paineis.forEach((painel, index) => {
        painel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') ativar(painel); });
        painel.addEventListener('focus', () => ativar(painel));
        painel.addEventListener('click', () => ativar(painel));
        painel.addEventListener('keydown', event => {
          if (!desktop.matches) return;
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); ativar(painel); }
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault(); paineis[(index + (event.key === 'ArrowRight' ? 1 : -1) + paineis.length) % paineis.length].focus();
          }
        });
      });
      desktop.addEventListener('change', atualizar); atualizar();
    });
  };
  const todos = () => document.querySelectorAll('[data-pfs-servicos]').forEach(iniciar);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', todos);
  else todos();
  window.pfsServicos = todos;
})();
