// Se um módulo falhar, a página continua legível. Só executa a recuperação em falha.
document.documentElement.classList.add('js');
(() => {
  function recover() {
    window.ScrollTrigger?.getAll().forEach(trigger=>trigger.kill(true));
    window.gsap?.globalTimeline.clear();
    document.documentElement.classList.remove('is-preloading');
    document.documentElement.dataset.siteFailed='true';
    document.body.style.overflow=''; document.querySelector('.preloader')?.remove();
    document.querySelectorAll('.wallet-word,.wallet-art,.wallet-left-copy,.wallet-right-copy,.stats-container,[data-cloud-layer],.fraaame-cloud,.process-step,.why-head,.why-card,.gateways-head,.gateways-panel,.gateways-feature,.brand-hand-art,.brand-hand-copy>*,.faq-title,.faq-row,.projects-headline,.projects-sub,.project-card').forEach(element=>{
      for(const property of ['opacity','visibility','transform']) element.style.removeProperty(property);
    });
    document.querySelectorAll('[data-count]').forEach(element=>{if(element.dataset.countFinal)element.textContent=element.dataset.countFinal;});
  }
  addEventListener('site:failed',recover,{once:true});
  setTimeout(()=>{if(!document.documentElement.dataset.siteReady)recover();},7000);
})();
