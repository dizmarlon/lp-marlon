// Traduções locais: troca imediata, sem rede e sem substituir a estrutura animada.
(function () {
 'use strict';
const { translations, translationsES } = window.SiteModules;

function initLanguage() {
  const dictionaries = { en:translations, es:translationsES };
  const languages = {
    pt:{ tag:'pt-BR', label:'Mudar idioma' },
    en:{ tag:'en', label:'Change language' },
    es:{ tag:'es', label:'Cambiar idioma' }
  };
  let language='pt';
  // Cada nó guarda seu português e a última tradução aplicada. Isso permite
  // PT → EN → ES → PT, inclusive com textos e rótulos criados depois do clique.
  const texts=new WeakMap(), attributes=new WeakMap();
  const translatedAttributes=['aria-label','alt','title','placeholder'];
  const excluded='script,style,template,[data-no-translate]';
  const prefixes = {
    en:[['Ver projeto ','View project '],['Site do projeto ','Website of project '],['Abrir portfólio de ','Open portfolio of '],['Assistir vídeo do projeto ','Watch video of project '],['Vídeo do projeto ','Video of project ']],
    es:[['Ver projeto ','Ver proyecto '],['Site do projeto ','Web del proyecto '],['Abrir portfólio de ','Abrir portafolio de '],['Assistir vídeo do projeto ','Ver vídeo del proyecto '],['Vídeo do projeto ','Vídeo del proyecto ']]
  };
  function translate(source) {
    if(language==='pt')return source;
    const key=source.replace(/\s+/g,' ').trim();
    if(!key)return source;
    let result=dictionaries[language][key];
    if(result===undefined){
      const prefix=prefixes[language].find(([pt])=>key.startsWith(pt));
      if(!prefix)return source; // Conteúdo novo do dono não recupera texto antigo.
      result=prefix[1]+key.slice(prefix[0].length);
    }
    return (source.match(/^\s*/)?.[0]||'')+result+(source.match(/\s*$/)?.[0]||'');
  }
  function text(node) {
    if(node.parentElement?.closest(excluded+',.wallet-word'))return;
    const current=node.nodeValue??'';
    let record=texts.get(node);
    if(!record||current!==record.rendered){record={source:current,rendered:current};texts.set(node,record);}
    const next=translate(record.source);record.rendered=next;
    if(current!==next)node.nodeValue=next;
  }
  function attribute(element,name) {
    const current=element.getAttribute(name);if(current===null)return;
    const records=attributes.get(element)||{};
    let record=records[name];
    if(!record||current!==record.rendered)record=records[name]={source:current,rendered:current};
    attributes.set(element,records);
    const next=translate(record.source).trim();record.rendered=next;
    if(current!==next)element.setAttribute(name,next);
  }
  function attrs(element) {
    if(element.closest(excluded))return;
    translatedAttributes.forEach(name=>attribute(element,name));
  }
  function tree(root) {
    if(root.nodeType===Node.TEXT_NODE){text(root);return;}
    if(root.nodeType!==Node.ELEMENT_NODE||root.closest(excluded))return;
    attrs(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{
      acceptNode:node=>node.nodeType===Node.ELEMENT_NODE&&node.matches(excluded)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT
    });
    for(let node=walker.nextNode();node;node=walker.nextNode()){
      if(node.nodeType===Node.TEXT_NODE)text(node);else attrs(node);
    }
  }
  const walletPT=['Um novo site pode','fazer sua empresa','vender muito mais'];
  const walletWords={
    en:[['A ','new ','website ','can'],['make ','your ','company'],['sell ','much ','more']],
    es:[['Un ','nuevo ','sitio ','puede'],['hacer que ','tu ','empresa'],['venda ','mucho ','más']]
  };
  const walletLines=[...document.querySelectorAll('.wallet-line')].map(line=>({
    line,source:line.textContent.replace(/\s+/g,' ').trim(),rendered:line.textContent,
    words:[...line.querySelectorAll('.wallet-word')].map(element=>({element,nodes:[...element.childNodes].map(n=>n.cloneNode(true))}))
  }));
  function wallet() {
    walletLines.forEach((record,index)=>{
      if(record.source!==walletPT[index]||record.line.textContent!==record.rendered)return;
      const values=walletWords[language]?.[index];
      record.words.forEach(({element,nodes},i)=>{
        if(!values){element.replaceChildren(...nodes.map(n=>n.cloneNode(true)));return;}
        const value=values[i];
        // Conserva os mesmos wrappers do GSAP e a separação tipográfica dos espaços.
        if(value.endsWith(' '))element.replaceChildren(document.createTextNode(value.slice(0,-1)),document.createComment(' '),document.createTextNode(' '));
        else element.textContent=value;
      });
      record.rendered=record.line.textContent;
    });
  }
  const observer=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==='characterData')text(record.target);
      else if(record.type==='attributes')attrs(record.target);
      else record.addedNodes.forEach(tree);
    }
  });
  function setLanguage(value,persist) {
    if(!Object.hasOwn(languages,value))return;
    observer.disconnect();language=value;
    document.documentElement.lang=languages[value].tag;
    tree(document.body);wallet();
    tree(document.querySelector('title'));
    document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"],meta[property="og:title"],meta[name="twitter:title"]').forEach(meta=>attribute(meta,'content'));
    document.querySelector('.lang-toggle')?.setAttribute('aria-label',languages[value].label);
    document.querySelectorAll('.lang-toggle-btn').forEach(button=>{
      const active=button.dataset.language===value;
      button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:translatedAttributes});
    if(persist)try{localStorage.setItem('site-lang',value);}catch{}
    // Os textos mudam de tamanho; recalcula pins e gatilhos após o layout.
    requestAnimationFrame(()=>window.ScrollTrigger?.refresh());
    dispatchEvent(new CustomEvent('site:language',{detail:{language:value}}));
  }
  document.querySelectorAll('.lang-toggle-btn').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language,true)));
  let initial='pt';try{const saved=localStorage.getItem('site-lang');if(Object.hasOwn(languages,saved))initial=saved;}catch{}
  setLanguage(initial,false);
}
window.SiteModules.initLanguage=initLanguage;
})();
