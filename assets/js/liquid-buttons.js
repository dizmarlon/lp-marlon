/* Same LiquidMetal material as the supplied React button, on the static site. */
(() => {
  'use strict';
  (window.SiteModules?.stylesReady || Promise.resolve()).then(() => {
  if (!window.IntersectionObserver) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  // O acabamento CSS aparece imediatamente. O WebGL é uma melhoria sob interação,
  // dispensando compilação de shader no carregamento e nos aparelhos de toque.
  if (!fine.matches) return;
  let paper = window.PaperLiquidMetal, paperReady;
  const library = new URL('vendor/paper-liquid-metal-0.0.82.min.js', document.currentScript?.src || new URL('assets/js/liquid-buttons.js', document.baseURI));
  const loadPaper = () => {
    if (paper) return Promise.resolve(paper);
    return paperReady ||= new Promise(resolve => {
      const script = document.createElement('script');
      script.dataset.cfasync = 'false'; script.async = true; script.src = library.href;
      script.onload = () => { paper = window.PaperLiquidMetal; resolve(paper); };
      script.onerror = () => resolve(null);
      document.head.append(script);
    });
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const forced = matchMedia('(forced-colors: active)');
  const records = new Map();
  const selector = 'a.whatsapp-cta[href^="https://wa.me/"]';
  // Release offscreen contexts, keeping below browser WebGL context limits.
  const maxContexts = 10;
  let scheduled = 0;
  const uniforms = {
    u_colorBack: [138 / 255, 138 / 255, 143 / 255, 1], u_colorTint: [1, 1, 1, 1],
    u_repetition: 4, u_distortion: .15, u_softness: .1,
    u_shiftRed: .3, u_shiftBlue: -.3, u_angle: 45, u_shape: 0,
    u_contour: .4, u_isImage: false, u_imageAspectRatio: 1,
    u_fit: 2, u_scale: 1, u_rotation: 0, u_offsetX: 0, u_offsetY: 0,
    u_originX: .5, u_originY: .5, u_worldWidth: 0, u_worldHeight: 0
  };
  const speed = record => reduced.matches ? 0 : record.hovered || record.focused ? 3 : 1.5;
  const visible = record => record.visible && record.button.isConnected && !record.button.closest('[hidden], [aria-hidden="true"]');
  function release(record) {
    if (!record.mount) return;
    record.frame = record.mount.getCurrentFrame();
    record.mount.dispose(); record.mount = null;
    record.button.dataset.liquidState = 'static';
  }
  function sync() {
    scheduled = 0;
    if (!paper) return;
    for (const record of records.values()) {
      if (!visible(record) || forced.matches) release(record);
    }
    let active = [...records.values()].filter(record => record.mount).length;
    for (const record of records.values()) {
      if (record.mount) { record.mount.setSpeed(speed(record)); continue; }
      if (!record.activated || !visible(record) || forced.matches || record.failed || active >= maxContexts) continue;
      try {
        record.mount = new paper.ShaderMount(record.layer, paper.liquidMetalFragmentShader,
          { ...uniforms }, { alpha: false, powerPreference: 'low-power' }, speed(record), record.frame, 1, 160000);
        record.button.dataset.liquidState = 'shader';
        const instance = record.mount;
        record.mount.canvasElement.addEventListener('webglcontextlost', event => {
          if (record.mount !== instance) return;
          event.preventDefault(); release(record); record.failed = true;
        }, { once: true });
        active++;
      } catch (_) {
        // The chrome fallback is visible even without WebGL or JavaScript.
        record.failed = true; record.layer.replaceChildren();
        record.button.dataset.liquidState = 'static';
      }
    }
  }
  const schedule = () => { if (!scheduled) scheduled = requestAnimationFrame(sync); };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const record = records.get(entry.target);
      if (record) record.visible = entry.isIntersecting;
    }
    schedule();
  });
  function scan() {
    for (const [button, record] of records) {
      if (!button.isConnected || !button.matches(selector)) { release(record); observer.unobserve(button); record.events.abort(); records.delete(button); }
    }
    document.querySelectorAll(selector).forEach(button => {
      if (records.has(button)) return;
      const layer = button.querySelector(':scope > .liquid-metal-layer');
      if (!layer) return;
      const events = new AbortController();
      const record = { button, layer, events, mount: null, visible: false, frame: 12000, hovered: false, focused: button.matches(':focus'), activated: false, failed: false };
      records.set(button, record);
      const update = () => {
        if (record.mount) { record.mount.setSpeed(speed(record)); return; }
        if ((record.hovered || record.focused) && !reduced.matches && !forced.matches) {
          record.activated = true;
          loadPaper().then(schedule);
        }
      };
      button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { record.hovered = true; update(); } }, { signal: events.signal });
      button.addEventListener('pointerleave', () => { record.hovered = false; update(); }, { signal: events.signal });
      button.addEventListener('focus', () => { record.focused = true; update(); }, { signal: events.signal });
      button.addEventListener('blur', () => { record.focused = false; update(); }, { signal: events.signal });
      button.addEventListener('pointercancel', () => { record.hovered = false; update(); }, { signal: events.signal });
      button.dataset.liquidState = 'static';
      observer.observe(button);
    });
    schedule();
  }
  const mutations = new MutationObserver(changes => {
    let buttonsChanged = false, visibilityChanged = false;
    for (const change of changes) {
      if (change.type === 'attributes') { visibilityChanged = true; continue; }
      for (const node of [...change.addedNodes, ...change.removedNodes]) {
        if (node.nodeType === Node.ELEMENT_NODE && (node.matches(selector) || node.querySelector(selector))) {
          buttonsChanged = true;
          break;
        }
      }
    }
    if (buttonsChanged) scan();
    else if (visibilityChanged) schedule();
  });
  mutations.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden', 'aria-hidden'] });
  reduced.addEventListener('change', schedule);
  forced.addEventListener('change', schedule);
  addEventListener('pagehide', () => records.forEach(release));
  addEventListener('pageshow', schedule);
  scan();
  });
})();
