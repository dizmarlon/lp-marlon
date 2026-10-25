(function templateRuntime(config) {
  'use strict';
  const root = new URL('../../',document.currentScript.src);
  const files = new Set(config.files.map(path => new URL(path,root).href));
  if (config.app && /^https?:$/.test(location.protocol) && /\/index\.html?$/i.test(location.pathname)) {
    try { history.replaceState(history.state, '', location.pathname.replace(/index\.html?$/i, '') + location.search + location.hash); } catch (_) {   }
  }
  // Scripts clássicos locais funcionam também por file://; não há import map.
  const problems = [];
  window.MasterClone = {problems,version:config.version};
  const broken = [];
  window.addEventListener('error', event => {
    const t = event.target;
    if (t && t !== window && t.tagName && /^(IMG|SCRIPT|VIDEO|AUDIO|SOURCE)$/.test(t.tagName) || t && t.tagName === 'LINK' && /stylesheet|modulepreload/.test(t.rel || '')) {
      const url = t.currentSrc || t.src || t.href || '';
      if (!url) return;
      let own = false; try { own = new URL(url, document.baseURI).origin === location.origin; } catch (_) {   }
      if (own && broken.length < 50 && !broken.includes(url)) broken.push(url);
    }
  }, true);
  function showNotice(id, label, content) {
    const host = document.createElement('div');
    host.id = id;
    host.style.cssText = 'all:initial!important;position:fixed!important;bottom:16px!important;right:16px!important;width:min(440px,calc(100vw - 32px))!important;z-index:2147483647!important;display:block!important;';
    const shadow = host.attachShadow({mode:'open'});
    shadow.innerHTML = `<style>
        :host{color-scheme:light}*{box-sizing:border-box}
        aside{font:14px/1.5 system-ui,sans-serif;color:#172033;background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:18px;box-shadow:0 8px 32px #0003;max-height:calc(100dvh - 32px);overflow:auto}
        strong{display:block;font-size:16px;padding-right:30px}p{margin:10px 0}ul{padding-left:20px;margin:10px 0}li{margin:6px 0}small{color:#52607a}
        button{position:absolute;top:10px;right:10px;width:32px;height:32px;border:0;border-radius:6px;background:#eef2f6;color:#172033;font:24px system-ui;cursor:pointer}
        button:focus-visible,summary:focus-visible{outline:3px solid #2563eb;outline-offset:2px}
        summary{cursor:pointer;font-weight:600}ol{padding-left:22px;margin:10px 0}
        code{display:block;background:#eef2f6;padding:8px;border-radius:6px;font:13px/1.5 monospace;overflow-wrap:anywhere}
      </style><aside role="note" aria-label="${label}"><button type="button" aria-label="Fechar aviso">×</button>${content}</aside>`;
    shadow.querySelector('button').addEventListener('click', () => host.remove());
    document.body.append(host);
  }
  function local(value) {
    try {
      const raw = value instanceof Request ? value.url : String(value);
      if (/^(data:|blob:)/.test(raw)) return raw;
      const original = new URL(raw,config.base);
      const hash = original.hash; original.hash='';
      if (config.map[original.href]) {
        const file=config.map[original.href];
        if(file.startsWith('_next/static/'))return '/'+file+original.search+hash;
        return new URL(file+hash,root).href;
      }
      const current = new URL(raw,document.baseURI); current.hash='';
      if(current.origin===location.origin&&current.pathname.startsWith('/_next/static/')&&(files.has(current.href)||files.has(current.origin+current.pathname)))return current.pathname+current.search+hash;
      if (files.has(current.href)) return current.href+hash;
      const withoutQuery = new URL(current); withoutQuery.search='';
      if (files.has(withoutQuery.href)) return withoutQuery.href+hash;
      if (current.origin === location.origin) {
        const tails = [current.pathname+current.search, current.pathname];
        if (current.href.startsWith(root.href)) tails.push('/'+current.href.slice(root.href.length), '/'+withoutQuery.href.slice(root.href.length));
        for (const tail of tails) {
          const file = config.map[new URL(tail,config.base).href];
          if (file) return (file.startsWith('_next/static/') ? '/'+file+current.search : new URL(file,root).href)+hash;
        }
      }
    } catch (_) {   }
    return null;
  }
  function missing(url) {
    if (problems.length<200 && !problems.some(p=>p.url===String(url))) problems.push({type:'unmapped-request',url:String(url)});
  }
  function localSrcset(value) {
    const result=[];let p=0;
    value=String(value);
    while(p<value.length) {
      while(p<value.length&&/[\t\n\f\r ,]/.test(value[p]))p++;
      const start=p;while(p<value.length&&!/[\t\n\f\r ]/.test(value[p]))p++;
      let url=value.slice(start,p);if(!url)break;
      let descriptor='';
      if(url.endsWith(','))url=url.replace(/,+$/,'');
      else {let depth=0;while(p<value.length){const c=value[p++];if(c===','&&!depth)break;if(c==='(')depth++;if(c===')')depth--;descriptor+=c;}}
      const destination=local(url);
      if(destination)result.push(destination+(descriptor.trim()?' '+descriptor.trim():''));
    }
    return result.join(', ');
  }
  for(const proto of [HTMLImageElement.prototype,HTMLSourceElement.prototype]) {
    const descriptor=Object.getOwnPropertyDescriptor(proto,'srcset');
    if(descriptor?.set)Object.defineProperty(proto,'srcset',{...descriptor,set(value){descriptor.set.call(this,localSrcset(value));}});
  }
  const imageSrcset=Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype,'imageSrcset');
  if(imageSrcset?.set)Object.defineProperty(HTMLLinkElement.prototype,'imageSrcset',{...imageSrcset,set(value){imageSrcset.set.call(this,localSrcset(value));}});
  const nativeSetAttribute=Element.prototype.setAttribute;
  Element.prototype.setAttribute=function(name,value) {
    if(String(name).toLowerCase()==='srcset'&&(this instanceof HTMLImageElement||this instanceof HTMLSourceElement))value=localSrcset(value);
    if(String(name).toLowerCase()==='imagesrcset'&&this instanceof HTMLLinkElement)value=localSrcset(value);
    if(String(name).toLowerCase()==='src'&&(this instanceof HTMLImageElement||this instanceof HTMLScriptElement||this instanceof HTMLMediaElement)) {
      const destination=local(value);
      if(destination)value=destination;
    }
    if(String(name).toLowerCase()==='poster'&&this instanceof HTMLVideoElement)value=local(value)||value;
    if(String(name).toLowerCase()==='href'&&this instanceof HTMLLinkElement)value=local(value)||value;
    if(/^(?:xlink:)?href$/i.test(String(name))&&/^(?:use|image)$/i.test(this.localName||'')&&!/^#/.test(String(value)))value=local(value)||value;
    return nativeSetAttribute.call(this,name,value);
  };
  const cssUrls=text=>String(text).replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g,(match,quote,url)=>{
    if(/^(?:data:|#)/.test(url))return match;
    const destination=local(url);
    return destination?'url('+quote+destination+quote+')':match;
  });
  const insertRule=CSSStyleSheet.prototype.insertRule;
  CSSStyleSheet.prototype.insertRule=function(rule,index){return insertRule.call(this,/url\(/.test(rule)?cssUrls(rule):rule,index);};
  const setProperty=CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty=function(nome,valor,...resto){return setProperty.call(this,nome,typeof valor==='string'&&/url\(/i.test(valor)?cssUrls(valor):valor,...resto);};
  const linkHref=Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype,'href');
  if(linkHref?.set)Object.defineProperty(HTMLLinkElement.prototype,'href',{...linkHref,set(value){linkHref.set.call(this,local(value)||value);}});
  const politica=(document.querySelector('meta[http-equiv="Content-Security-Policy" i]')||{}).content||'';
  const liberado=(url,diretiva)=>{
    try {
      const u=new URL(url instanceof Request?url.url:String(url),document.baseURI);
      const fontes=(politica.split(';').map(s=>s.trim().split(/\s+/)).find(p=>p[0]===diretiva)||[]).slice(1);
      return fontes.some(v=>{const coringa=/^(https?:)\/\/\*\.([^/]+)/i.exec(v);if(coringa)return u.protocol===coringa[1].toLowerCase()&&u.hostname.endsWith('.'+coringa[2].toLowerCase());try{return /^https?:\/\//i.test(v)&&new URL(v).origin===u.origin;}catch(_){return false;}});
    } catch (_) { return false; }
  };
  const doOriginal=url=>{try{return new URL(url,document.baseURI).origin===new URL(config.base).origin&&new URL(config.base).origin!==location.origin;}catch(_){return false;}};
  const nativeFetch=window.fetch;
  window.fetch=function(input,init) {
    const destination=local(input);
    if (!destination&&liberado(input,'connect-src')) return nativeFetch.call(this,input,init);
    if (!destination) {missing(input);return Promise.resolve(new Response('{"error":"Configure este recurso no template"}',{status:404,headers:{'content-type':'application/json'}}));}
    const method=String(init?.method||(input instanceof Request?input.method:'GET')).toUpperCase();
    if (!['GET','HEAD'].includes(method)) return Promise.resolve(new Response('',{status:405}));
    const request=input instanceof Request?new Request(destination,input):destination;
    return nativeFetch.call(this,request,init);
  };
  const nativeOpen=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(method,url,...rest) {
    if (!local(url)&&liberado(url,'connect-src')) return nativeOpen.call(this,method,url,...rest);
    const destination=['GET','HEAD'].includes(String(method).toUpperCase())?local(url):null;
    if (!destination) missing(url);
    return nativeOpen.call(this,destination?method:'GET',destination||new URL('assets/data/unavailable.json',root).href,...rest);
  };
  const nativeBeacon=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);
  try {Object.defineProperty(navigator,'sendBeacon',{value:(url,data)=>nativeBeacon&&liberado(url,'connect-src')?nativeBeacon(url,data):false,configurable:true});} catch (_) {   }
  for (const [proto,attr] of [[HTMLImageElement.prototype,'src'],[HTMLScriptElement.prototype,'src'],[HTMLMediaElement.prototype,'src'],[HTMLVideoElement.prototype,'poster']]) {
    const descriptor=Object.getOwnPropertyDescriptor(proto,attr);
    if (!descriptor?.set) continue;
    Object.defineProperty(proto,attr,{...descriptor,set(value) {
      const destination=local(value);
      if (!destination) missing(value);
      descriptor.set.call(this,destination||new URL(this instanceof HTMLScriptElement?'assets/js/unavailable.js':'assets/images/unavailable.svg',root).href);
    }});
  }
  const open=window.open;
  window.open=function(url,...args) {const destination=local(url);if(destination)return open.call(this,destination,...args);try{const u=new URL(url,document.baseURI);if(/^(?:https?|mailto|tel):$/.test(u.protocol)&&!doOriginal(u.href))return open.call(this,u.href,...args);}catch(_){   }return null;};
  const neutros=new Set(config.neutros||[]);
  const marca=texto=>{let h=0x811c9dc5;for(let i=0;i<texto.length;i++){h^=texto.charCodeAt(i);h=Math.imul(h,0x01000193);}return (h>>>0).toString(36);};
  const neutralizado=href=>{
    if(!neutros.size)return false;
    try{const u=new URL(href,document.baseURI);u.hash='';const daPagina=u.origin===location.origin||u.origin===new URL(config.base).origin;return neutros.has(marca(daPagina?'p:'+u.pathname+u.search:'u:'+u.href));}catch(_){return false;}
  };
  document.addEventListener('submit',event=>{
    const form=event.target;
    const destino=form&&form.getAttribute&&(form.getAttribute('action')||'');
    if (!form||!form.getAttribute||form.dataset.masterForm==='configure'&&!destino||/backend-removido/.test(destino)||destino&&doOriginal(destino)) {event.preventDefault();event.stopImmediatePropagation();}
  },true);
  document.addEventListener('click',event=>{
    const anchor=event.target.closest?.('a,area');
    if (!anchor) return;
    const href=anchor.getAttribute('href')||'';
    // Não deixe os handlers React abrirem o contato original depois de 1 s.
    if (anchor.dataset.masterLink === 'configure' && (!href || href === '#')) {
      event.preventDefault(); event.stopImmediatePropagation(); return;
    }
    if (!href || href==='#') {event.preventDefault();return;}
    if (!anchor.hasAttribute('data-master-link')&&neutralizado(href)) {event.preventDefault();event.stopImmediatePropagation();return;}
    try {if (doOriginal(href)) {event.preventDefault();event.stopImmediatePropagation();}} catch (_) {event.preventDefault();}
  },true);
  if (config.ocultar&&config.ocultar.length) {
    try {const folha=new CSSStyleSheet();folha.replaceSync(config.ocultar.join(',')+'{display:none!important}');document.adoptedStyleSheets=[...document.adoptedStyleSheets,folha];} catch (_) {   }
  }
  window.addEventListener('error',event=>{
    if (event.message && problems.length<200) problems.push({type:'script-error',message:event.message});
  });
  window.addEventListener('load',()=>{window.MasterClone.loaded=true;});
  window.addEventListener('load',()=>setTimeout(()=>{
    const sections=document.querySelectorAll('[data-master-section]').length;
    const brokenImages=[...document.images].filter(image=>image.complete&&!image.naturalWidth&&image.currentSrc).length;
    window.MasterClone.validation={status:broken.length||brokenImages?'needs-review':'observed',sectionsKept:sections+'/'+config.sections,brokenResources:broken.slice(),brokenImages};
    if(broken.length)console.warn('Recursos locais não carregaram:',broken);
  },4000),{once:true});
})({"version":"1.22.12","base":"https://www.jorgewebpro.com/","map":{"https://www.jorgewebpro.com/__l5e/assets-v1/5946e69a-5551-4c53-978c-4f81bfaa14d0/gateways-panel-background.mp4":"assets/media/gateways-panel-background-zq5wy4.mp4","https://www.jorgewebpro.com/assets/avatar-1-B32B7xz0.png":"assets/images/avatar-1-B32B7xz0-h6l9s0.png","https://www.jorgewebpro.com/assets/avatar-2-BwmxCLMc.png":"assets/images/avatar-2-BwmxCLMc-jshfp8.png","https://www.jorgewebpro.com/assets/avatar-3-UHLjOO3I.png":"assets/images/avatar-3-UHLjOO3I-1i95qfl.png","https://www.jorgewebpro.com/assets/avatar-4-oF7v5td3.webp":"assets/images/avatar-4-oF7v5td3-ziol86.webp","https://www.jorgewebpro.com/__l5e/assets-v1/6327f1f7-b417-468b-b409-d662c8f9812a/cloud-soft.png":"assets/images/cloud-soft-1w5qdon.png","https://www.jorgewebpro.com/__l5e/assets-v1/711ced8f-a894-4492-a5be-db8842cfe128/cloud-voluminous.png":"assets/images/cloud-voluminous-j45vq9.png","https://www.jorgewebpro.com/__l5e/assets-v1/b1c7247e-d2b1-4396-bdc6-c02115507b70/process-bg-mobile.png":"assets/images/process-bg-mobile-15q2hq6.png","https://www.jorgewebpro.com/__l5e/assets-v1/5664669f-49ec-4595-9777-c0c3b3985ee4/process-bg-tablet.png":"assets/images/process-bg-tablet-fjuzpw.png","https://www.jorgewebpro.com/__l5e/assets-v1/94e6169d-d136-4b55-a989-20147c4d7f4b/process-bg-desktop.png":"assets/images/process-bg-desktop-ec8t4v.png","https://www.jorgewebpro.com/__l5e/assets-v1/00b1f66b-6cf8-4469-a5f1-1b9181967609/process-bg-desktop-grande.png":"assets/images/process-bg-desktop-grande-yyrhcf.png","https://www.jorgewebpro.com/assets/styles-BBPBVkOb.css":"assets/css/styles-BBPBVkOb-i8bfrl.css","https://fonts.googleapis.com/css2?family=Poppins:wght@200;700&family=Instrument+Serif:ital@0;1&display=swap":"assets/css/css2-1bp8z8m.css","https://www.jorgewebpro.com/__l5e/assets-v1/ec4e759c-d57d-4971-b1a1-20efcfa3b689/universo-card-identidade.webp":"assets/images/universo-card-identidade-1otlood.webp","https://www.jorgewebpro.com/__l5e/assets-v1/a37efb05-5719-4999-88b9-0c114b248d57/hand-logo.webp":"assets/images/hand-logo-7tc8v4.webp","https://www.jorgewebpro.com/__l5e/assets-v1/0d0cfb96-e281-415a-8344-35f9d8e2e684/logo-jg-footer.webp":"assets/images/logo-jg-footer-z8h4uv.webp","https://www.jorgewebpro.com/__l5e/assets-v1/c282f831-0e5c-4719-87a0-e1ab16def7a1/minha-logo.webp":"assets/images/minha-logo-11q8qcr.webp","https://www.jorgewebpro.com/__l5e/assets-v1/52f71f72-294b-494d-b161-9f3c69eac52e/ProductSansInfanity.ttf":"assets/fonts/ProductSansInfanity-3ucyb0.ttf","https://www.jorgewebpro.com/favicon.png":"assets/images/favicon-3hmzhk.png","https://www.jorgewebpro.com/apple-touch-icon.png":"assets/images/apple-touch-icon-1xqzaq6.png","https://www.jorgewebpro.com/site.webmanifest":"assets/data/site.webmanifest","https://www.jorgewebpro.com/assets/growth-rock-faded-DFMrJPbf.webp":"assets/images/wallet-rock-faded-DFMrJPbf-fp4c5r.webp","https://www.jorgewebpro.com/__l5e/assets-v1/592fd09f-0a07-4b89-b740-711c576c8d3b/project-gestor.webp":"assets/images/project-gestor-mbf0k8.webp","https://www.jorgewebpro.com/__l5e/assets-v1/96659e22-17a3-48a5-9456-fc632a0949a6/project-frota.webp":"assets/images/project-frota-s21yu5.webp","https://www.jorgewebpro.com/__l5e/assets-v1/04671442-4f5e-4cb3-9ad8-607e49169ba0/giobbeauty.webp":"assets/images/giobbeauty-1taj0z8.webp","https://www.jorgewebpro.com/__l5e/assets-v1/33c925e2-376c-4479-b9c0-44730dc59b59/project-acelera.webp":"assets/images/project-acelera-1x0pmwo.webp","https://www.jorgewebpro.com/__l5e/assets-v1/cd008b05-712b-4a97-9da6-74f4ac5f8b15/universo-cards.webm":"assets/media/universo-cards-f4ywag.webm","https://www.jorgewebpro.com/__l5e/assets-v1/d5988bfa-af29-443b-8717-abd31699d29b/universo-cards-2.webm":"assets/media/universo-cards-2-14evr8z.webm","https://www.jorgewebpro.com/__l5e/assets-v1/5925a0b0-ff28-4c53-a0f6-bfeb0cca9e91/gateways-panel-background.webm":"assets/media/gateways-panel-background-15yyk21.webm","https://jorgewebpro.lovable.app/__l5e/assets-v1/5946e69a-5551-4c53-978c-4f81bfaa14d0/gateways-panel-background.mp4":"assets/media/gateways-panel-background-zq5wy4.mp4","https://www.jorgewebpro.com/__l5e/assets-v1/4c94c9f0-b4a4-47a2-becb-3ef85a4ee4e3/gateways-panel-poster.webp":"assets/images/gateways-panel-poster-zbttay.webp","https://www.jorgewebpro.com/__l5e/assets-v1/0bd019a5-abf2-4ef5-97f3-a2f5a1499716/azul_1.webp":"assets/images/azul_1-4bruid.webp","https://www.jorgewebpro.com/__l5e/assets-v1/0135e1b6-c6e5-4789-a779-498a8d8a7fbe/creative-portrait.webp":"assets/images/creative-portrait-13vtn8z.webp","https://www.jorgewebpro.com/assets/frame-39-smooth-BJ-4MSa0.webp":"assets/images/frame-39-smooth-BJ-4MSa0-bochb1.webp","https://www.jorgewebpro.com/__l5e/assets-v1/126dfc39-8faf-491c-9793-23e7c6b29922/fraaame-43.png":"assets/images/fraaame-43-1pt9q1t.png","https://www.jorgewebpro.com/__l5e/assets-v1/2e4f4607-e163-4587-8d8e-a40a18608730/gateways-bg.png":"assets/images/gateways-bg-inlqs.png","https://www.jorgewebpro.com/__l5e/assets-v1/1bcc6eef-363e-410d-bb4b-77a3fe31b263/gateways-feature-bg.webp":"assets/images/gateways-feature-bg-1i6ak4a.webp","https://www.jorgewebpro.com/__l5e/assets-v1/547573ee-54ee-4404-8cd4-db041cf83e06/faq-card-bg.png":"assets/images/faq-card-bg-1lk1ubo.png","https://www.jorgewebpro.com/icon-192.png":"assets/images/icon-192-9i8ir2.png","https://www.jorgewebpro.com/fonts/Yosan.otf":"assets/fonts/Yosan-x92toj.otf","https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo.woff2":"assets/fonts/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo-129xwql.woff2","https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2":"assets/fonts/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M-1uum64m.woff2","https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI.woff2":"assets/fonts/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI-892ky2.woff2","https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2":"assets/fonts/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg-1f2sk3v.woff2","https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLFj_Z11lFc-K.woff2":"assets/fonts/pxiByp8kv8JHgFVrLFj_Z11lFc-K-zlodjq.woff2","https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLFj_Z1JlFc-K.woff2":"assets/fonts/pxiByp8kv8JHgFVrLFj_Z1JlFc-K-m4efsp.woff2","https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLFj_Z1xlFQ.woff2":"assets/fonts/pxiByp8kv8JHgFVrLFj_Z1xlFQ-1i9xj7p.woff2","https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2":"assets/fonts/pxiByp8kv8JHgFVrLCz7Z11lFc-K-1phdh0h.woff2","https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2":"assets/fonts/pxiByp8kv8JHgFVrLCz7Z1JlFc-K-19t3aa6.woff2","https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2":"assets/fonts/pxiByp8kv8JHgFVrLCz7Z1xlFQ-161o7ne.woff2","https://www.jorgewebpro.com/icon-512.png":"assets/images/icon-512-1ece30i.png","https://www.jorgewebpro.com/icon-512-maskable.png":"assets/images/icon-512-maskable-1l4lzxb.png","https://www.jorgewebpro.com/__l5e/assets-v1/254d95ef-4091-4de5-86c4-66d65393a3ad/NRAG_V%C3%8DDEO.webm":"assets/media/NRAG_V-DEO-jbdnar.webm","https://www.jorgewebpro.com/__l5e/assets-v1/bfd4fd49-b572-4276-a5fa-1c5651ca477e/FROTA_F%C3%81CIL_V%C3%8DDEO.webm":"assets/media/FROTA_F-CIL_V-DEO-470iy6.webm","https://www.jorgewebpro.com/__l5e/assets-v1/09c8a21b-8a51-47fe-bf0e-1d28066d1a52/GIOBBEAUTY_V%C3%8DDEO.webm":"assets/media/GIOBBEAUTY_V-DEO-j6409a.webm","https://www.jorgewebpro.com/__l5e/assets-v1/bcd96ed2-449f-44db-820c-8a69ee9acc89/ACELERA_MAIS_V%C3%8DDEO.webm":"assets/media/ACELERA_MAIS_V-DEO-1xol8sx.webm","https://www.jorgewebpro.com/assets/images/eu.webp":"assets/images/eu.webp","https://www.jorgewebpro.com/assets/css/site-layout.css":"assets/css/site-layout.css","https://www.jorgewebpro.com/assets/fonts/zt-nature-regular.woff2":"assets/fonts/zt-nature-regular.woff2","https://www.jorgewebpro.com/assets/fonts/zt-nature-medium.woff2":"assets/fonts/zt-nature-medium.woff2","https://www.jorgewebpro.com/assets/fonts/zt-nature-semibold.woff2":"assets/fonts/zt-nature-semibold.woff2","https://www.jorgewebpro.com/assets/fonts/zt-nature-bold.woff2":"assets/fonts/zt-nature-bold.woff2"},"files":["assets/images/unavailable.svg","assets/data/unavailable.json","assets/js/unavailable.js","assets/images/avatar-1-B32B7xz0-h6l9s0.png","assets/images/avatar-2-BwmxCLMc-jshfp8.png","assets/images/avatar-3-UHLjOO3I-1i95qfl.png","assets/images/avatar-4-oF7v5td3-ziol86.webp","assets/images/cloud-soft-1w5qdon.png","assets/images/cloud-voluminous-j45vq9.png","assets/images/process-bg-mobile-15q2hq6.png","assets/images/process-bg-tablet-fjuzpw.png","assets/images/process-bg-desktop-ec8t4v.png","assets/images/process-bg-desktop-grande-yyrhcf.png","assets/css/styles-BBPBVkOb-i8bfrl.css","assets/css/css2-1bp8z8m.css","assets/images/universo-card-identidade-1otlood.webp","assets/images/hand-logo-7tc8v4.webp","assets/images/logo-jg-footer-z8h4uv.webp","assets/images/minha-logo-11q8qcr.webp","assets/fonts/ProductSansInfanity-3ucyb0.ttf","assets/images/favicon-3hmzhk.png","assets/images/apple-touch-icon-1xqzaq6.png","assets/data/site.webmanifest","assets/images/wallet-rock-faded-DFMrJPbf-fp4c5r.webp","assets/images/project-gestor-mbf0k8.webp","assets/images/project-frota-s21yu5.webp","assets/images/giobbeauty-1taj0z8.webp","assets/images/project-acelera-1x0pmwo.webp","assets/media/universo-cards-f4ywag.webm","assets/media/universo-cards-2-14evr8z.webm","assets/media/gateways-panel-background-15yyk21.webm","assets/media/gateways-panel-background-zq5wy4.mp4","assets/images/gateways-panel-poster-zbttay.webp","assets/images/azul_1-4bruid.webp","assets/images/creative-portrait-13vtn8z.webp","assets/images/frame-39-smooth-BJ-4MSa0-bochb1.webp","assets/images/fraaame-43-1pt9q1t.png","assets/images/gateways-bg-inlqs.png","assets/images/gateways-feature-bg-1i6ak4a.webp","assets/images/faq-card-bg-1lk1ubo.png","assets/images/icon-192-9i8ir2.png","assets/fonts/Yosan-x92toj.otf","assets/fonts/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjgn7MsNo-129xwql.woff2","assets/fonts/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M-1uum64m.woff2","assets/fonts/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI-892ky2.woff2","assets/fonts/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg-1f2sk3v.woff2","assets/fonts/pxiByp8kv8JHgFVrLFj_Z11lFc-K-zlodjq.woff2","assets/fonts/pxiByp8kv8JHgFVrLFj_Z1JlFc-K-m4efsp.woff2","assets/fonts/pxiByp8kv8JHgFVrLFj_Z1xlFQ-1i9xj7p.woff2","assets/fonts/pxiByp8kv8JHgFVrLCz7Z11lFc-K-1phdh0h.woff2","assets/fonts/pxiByp8kv8JHgFVrLCz7Z1JlFc-K-19t3aa6.woff2","assets/fonts/pxiByp8kv8JHgFVrLCz7Z1xlFQ-161o7ne.woff2","assets/images/icon-512-1ece30i.png","assets/images/icon-512-maskable-1l4lzxb.png","assets/media/NRAG_V-DEO-jbdnar.webm","assets/media/FROTA_F-CIL_V-DEO-470iy6.webm","assets/media/GIOBBEAUTY_V-DEO-j6409a.webm","assets/media/ACELERA_MAIS_V-DEO-1xol8sx.webm","assets/css/local-fixes.css","index.html","assets/js/boot.js","assets/js/site.js","assets/js/animations.js","assets/js/preloader.js","assets/js/interactions.js","assets/js/language.js","assets/js/translations.js","assets/js/vendor/lenis-1.3.26.js","assets/js/vendor/gsap-scrolltrigger-3.15.0.js","assets/images/eu.webp","assets/css/site-layout.css","assets/fonts/zt-nature-regular.woff2","assets/fonts/zt-nature-medium.woff2","assets/fonts/zt-nature-semibold.woff2","assets/fonts/zt-nature-bold.woff2","servicos.css","componentes/servicos/servicos.js","componentes/servicos/servicos.html","assets/images/servicos/hospedagem-DOsYiNVG_EzuGu-1571zfp.webp","assets/images/servicos/hospedagem-DOsYiNVG_QwQGR-pwl41l.webp","assets/images/servicos/hospedagem-DOsYiNVG_Z1wfJBm-1q1cieu.webp","assets/images/servicos/hospedagem-DOsYiNVG_Z2bJTTI-b667ti.webp","assets/images/servicos/landing-pages-DVOlPy8Z_1SbC9z-1oud1z1.webp","assets/images/servicos/landing-pages-DVOlPy8Z_1t0R7F-j1l6g7.webp","assets/images/servicos/landing-pages-DVOlPy8Z_Z1iiijo-krdlm0.webp","assets/images/servicos/landing-pages-DVOlPy8Z_Z1qVDRn-crspfd.webp","assets/images/servicos/seo-DoKasJU2_1s1ESg-2olttz.webp","assets/images/servicos/seo-DoKasJU2_1skytT-1tqjjmb.webp","assets/images/servicos/seo-DoKasJU2_Z1a1bhr-1kq89te.webp","assets/images/servicos/seo-DoKasJU2_Z2hlUzX-1pa1sv6.webp","assets/images/servicos/sites-5pa3TkXj_2c8UlL-1xjaqsp.webp","assets/images/servicos/sites-5pa3TkXj_8kWwN-1c5y06a.webp","assets/images/servicos/sites-5pa3TkXj_GYez2-cdmiem.webp","assets/images/servicos/sites-5pa3TkXj_ZHV2ke-1kml1xb.webp","assets/images/servicos/trafego-qDES-2K7_15xNYE-w5osir.webp","assets/images/servicos/trafego-qDES-2K7_2tcyen-1t22d9i.webp","assets/images/servicos/trafego-qDES-2K7_Z1MhxN9-73pgzg.webp","assets/images/servicos/trafego-qDES-2K7_Z1wiwA-zwg8ny.webp","assets/js/animations.js?v=value-reveal-1","assets/js/template-runtime.js?v=mockup-v3-1","assets/images/site-value-background.webp","assets/css/styles-BBPBVkOb-i8bfrl.css?v=growth-section-1","assets/css/local-fixes.css?v=growth-section-1","assets/css/site-layout.css?v=font-originals-1","assets/js/boot.js?v=value-reveal-1","assets/js/language.js?v=growth-section-1","assets/css/liquid-buttons.css","assets/css/liquid-buttons.css?v=cta-refined-1","assets/js/liquid-buttons.js","assets/js/liquid-buttons.js?v=whatsapp-only-2","assets/js/vendor/paper-liquid-metal-0.0.82.js","assets/licenses/PAPER-SHADERS-LICENSE.txt","assets/licenses/PAPER-SHADERS-NOTICE.txt","assets/css/copy-layout.css?v=loader-mockup-1","servicos.css?v=headings-500-1","assets/js/copy-translations.js?v=value-reveal-1","assets/images/growth-site-mockup-v3.webp"],"app":false,"sections":12,"words":361});
