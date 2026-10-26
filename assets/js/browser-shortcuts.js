/* Bloqueia os atalhos de inspeção; o código entregue pelo navegador continua acessível. */
(() => {
  'use strict';
  const toolKeys = new Set(['i', 'j', 'c']);
  if (/Firefox\//.test(navigator.userAgent)) toolKeys.add('k');
  document.addEventListener('contextmenu', event => event.preventDefault(), { capture: true });
  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    const windowsSource = event.ctrlKey && !event.shiftKey && !event.altKey && key === 'u';
    const windowsTools = event.ctrlKey && event.shiftKey && !event.altKey && toolKeys.has(key);
    const macSourceOrTools = event.metaKey && event.altKey && (key === 'u' || toolKeys.has(key));
    if (key === 'f12' || windowsSource || windowsTools || macSourceOrTools) event.preventDefault();
  }, { capture: true });
})();
