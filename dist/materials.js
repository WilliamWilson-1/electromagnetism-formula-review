(() => {
  'use strict';
  // A web interpretation of Apple's material hierarchy, not a native Liquid Glass shader.
  const root=document.documentElement;
  const media={dark:matchMedia('(prefers-color-scheme: dark)'),solid:matchMedia('(prefers-reduced-transparency: reduce)'),motion:matchMedia('(prefers-reduced-motion: reduce)'),pointer:matchMedia('(hover: hover) and (pointer: fine)')};
  const theme=document.getElementById('appearance-theme'),solid=document.getElementById('appearance-solid'),menu=document.getElementById('appearance-menu');
  let preference={theme:'system',solid:false};
  try{const saved=JSON.parse(localStorage.getItem('review-appearance'));if(saved&&['system','light','dark'].includes(saved.theme))preference={theme:saved.theme,solid:saved.solid===true};}catch{}
  const tracked=new Set(),visible=new Set();
  let frame=0,tabFrame=0,point={x:0,y:0};
  const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);}}):null;
  const glassSelector='.topbar,.sidebar,.mode-tabs,.search-box,.filter-control,.mobile-chapter,.browse-button,.primary-button,.icon-button,.formula-reference,.summary-nav,.quantity-nav,.quiz-setting,.detail-top,.appearance-panel';
  const contentSelector='.formula-card,.formula-group,.solve-card,.steps li,.template,.mistakes,.quantity-card,.method-card,.pitfall-card,.chain-card,.summary-intro,.final-checks article,.quiz-intro,.quiz-setup,.quiz-question,.quiz-choice,.quiz-feedback,.quiz-results,.quiz-review-item';
  const interactiveSelector='.formula-card,.quiz-choice';
  function clearLight(){
    if(frame){cancelAnimationFrame(frame);frame=0;}
    document.body.classList.remove('pointer-active');
    for(const element of tracked)element.style.removeProperty('--spot-opacity');
  }
  function applyAppearance(){
    root.dataset.theme=preference.theme==='system'?(media.dark.matches?'dark':'light'):preference.theme;
    root.dataset.transparency=preference.solid||media.solid.matches?'reduced':'regular';
    theme.value=preference.theme;solid.checked=root.dataset.transparency==='reduced';solid.disabled=media.solid.matches;
    solid.title=media.solid.matches?'系统已开启减少透明效果':'';
    clearLight();
  }
  function persist(){try{localStorage.setItem('review-appearance',JSON.stringify(preference));}catch{}applyAppearance();}
  theme.addEventListener('change',()=>{preference.theme=theme.value;persist();});
  solid.addEventListener('change',()=>{preference.solid=solid.checked;persist();});
  for(const query of [media.dark,media.solid])query.addEventListener('change',applyAppearance);
  for(const query of [media.motion,media.pointer])query.addEventListener('change',clearLight);
  document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus();}});
  function updateTabs(){
    if(tabFrame)cancelAnimationFrame(tabFrame);
    tabFrame=requestAnimationFrame(()=>{
      tabFrame=0;const tabs=document.querySelector('.mode-tabs'),active=tabs.querySelector('[aria-selected="true"]'),pill=tabs.querySelector('.tab-highlight');
      // Real layout supplies these metrics; avoid guessing offsets in hidden or simulated documents.
      if(active.offsetWidth){pill.style.width=active.offsetWidth+'px';pill.style.height=active.offsetHeight+'px';pill.style.transform=`translate(${active.offsetLeft}px,${active.offsetTop}px)`;tabs.classList.add('tabs-measured');}
    });
  }
  function sync(){
    document.querySelectorAll(contentSelector).forEach(element=>element.classList.add('content-surface'));
    document.querySelectorAll(glassSelector).forEach(element=>element.classList.add('glass-surface'));
    document.querySelectorAll(interactiveSelector).forEach(element=>element.classList.add('interactive-surface'));
    for(const element of tracked)if(!element.isConnected){observer?.unobserve(element);tracked.delete(element);visible.delete(element);}
    document.querySelectorAll('.glass-surface,.interactive-surface').forEach(element=>{
      if(tracked.has(element))return;tracked.add(element);if(observer)observer.observe(element);else visible.add(element);
    });
    updateTabs();
  }
  document.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||!media.pointer.matches||media.motion.matches||root.dataset.transparency==='reduced')return;
    point={x:event.clientX,y:event.clientY};if(frame)return;
    frame=requestAnimationFrame(()=>{
      frame=0;document.body.classList.add('pointer-active');
      document.querySelector('.cursor-aura').style.transform=`translate3d(${point.x-250}px,${point.y-250}px,0)`;
      const positions=[...visible].filter(element=>element.isConnected).map(element=>[element,element.getBoundingClientRect()]);
      for(const [element,rect] of positions){
        const distance=Math.hypot(Math.max(rect.left-point.x,0,point.x-rect.right),Math.max(rect.top-point.y,0,point.y-rect.bottom));
        element.style.setProperty('--spot-x',`${point.x-rect.left}px`);element.style.setProperty('--spot-y',`${point.y-rect.top}px`);element.style.setProperty('--spot-opacity',String(Math.max(0,1-distance/200)));
      }
    });
  },{passive:true});
  document.addEventListener('pointerleave',clearLight);window.addEventListener('blur',clearLight);
  window.addEventListener('scroll',clearLight,{passive:true});
  document.addEventListener('scroll',clearLight,{passive:true,capture:true});
  window.addEventListener('resize',()=>{clearLight();updateTabs();});
  if(document.fonts?.ready)document.fonts.ready.then(updateTabs);
  applyAppearance();
  window.REVIEW_MATERIALS=Object.freeze({sync,updateTabs});
})();
