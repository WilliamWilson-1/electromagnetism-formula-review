(() => {
  'use strict';
  const { chapters, types, formulas, groups, learning } = window.REVIEW_DATA;
  const $ = id => document.getElementById(id);
  const state = { chapter:'all', query:'', type:'全部类型', mode:'formulas' };
  const expandedGroups=new Map();
  const modes = [['formulas','formula'],['guide','guide'],['summary','summary']];
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const math = (latex, displayMode=true) => window.katex ? katex.renderToString(latex,{displayMode,throwOnError:false,strict:'ignore',output:'htmlAndMathml'}) : escape(latex);
  const prose = text => text.split(/(\$[^$]+\$)/g).map(part => part.startsWith('$')&&part.endsWith('$')?math(part.slice(1,-1),false):escape(part)).join('');
  const normalize = text => text.toLocaleLowerCase().replace(/\s+/g,'');
  const matching = () => formulas.filter(f => (state.chapter==='all'||f.chapter===state.chapter)&&(state.type==='全部类型'||f.type===state.type)&&(!state.query||normalize([f.id,f.title,f.latex,f.condition,f.hint,f.keywords,chapters.find(c=>c.id===f.chapter).title,groups.find(g=>g.ids.includes(f.id)).title,learning[f.id].kind,...f.variables.flat(),...learning[f.id].steps.flat(),...learning[f.id].solves.flat()].join(' ')).includes(normalize(state.query))));
  function nav() {
    $('chapter-nav').innerHTML = `<a class="nav-link${state.chapter==='all'?' active':''}" href="#all" ${state.chapter==='all'?'aria-current="page"':''}><span class="nav-number">∑</span><span>全部公式</span><span class="nav-count">${formulas.length}</span></a><div class="nav-divider"></div>` + chapters.map((c,i) => `${i===0?'<div class="nav-group">静电学 · 第10章</div>':i===7?'<div class="nav-divider"></div><div class="nav-group">稳恒磁场 · 第11章</div>':''}<a class="nav-link${c.id===state.chapter?' active':''}" href="#${c.id}" ${c.id===state.chapter?'aria-current="page"':''}><span class="nav-number">${c.number}</span><span>${c.title}</span><span class="nav-count">${formulas.filter(f=>f.chapter===c.id).length}</span></a>`).join('');
    $('chapter-select').innerHTML = `<option value="all">全部章节</option>` + chapters.map(c=>`<option value="${c.id}">${c.number} ${c.title}</option>`).join('');
    $('chapter-select').value=state.chapter;
  }
  function render() {
    nav();
    const chapter=chapters.find(c=>c.id===state.chapter);
    updateHeading();
    $('total-number').textContent=formulas.length;
    const selected=matching();
    const selectedGroups=groups.filter(g=>selected.some(f=>g.ids.includes(f.id)));
    const filtered=Boolean(state.query)||state.type!=='全部类型';
    $('result-count').textContent = `匹配 ${selected.length} 条公式 · ${selectedGroups.length} 个分类 · ${chapter?chapter.section:'全部章节'}`;
    $('reset').hidden=state.chapter==='all'&&!state.query&&state.type==='全部类型';
    $('empty-state').hidden=selected.length!==0;
    $('group-toolbar').hidden=selected.length===0;
    const card=f=>{
      const c=chapters.find(c=>c.id===f.chapter), lesson=learning[f.id];
      const badge=lesson.kind.includes('基本定律')?'定律说明':lesson.kind.includes('定义')?'定义说明':`${lesson.steps.length} 步展开`;
      return `<button class="formula-card" data-formula="${f.id}" aria-label="查看${escape(f.title)}：推导、物理量求法、变量与条件"><div class="card-top"><span class="card-index">${c.number}.${String(formulas.filter(x=>x.chapter===c.id).indexOf(f)+1).padStart(2,'0')}</span><span class="card-type">${f.type}</span></div><h3>${escape(f.title)}</h3><div class="card-formula">${math(f.latex)}</div><p class="card-scope">${escape(f.condition)}</p><div class="card-solves"><span>可求</span>${lesson.solves.map(s=>escape(s[0])).join(' · ')}</div><div class="card-bottom"><span class="card-open">${badge} · 求量 · 变量</span><span class="card-mark" aria-hidden="true">↗</span></div></button>`;
    };
    $('formula-list').innerHTML=chapters.map(c=>{
      const rows=selected.filter(f=>f.chapter===c.id);if(!rows.length)return '';
      return `<section class="chapter-section" aria-labelledby="heading-${c.id}"><div class="section-heading"><span class="section-number">${c.number}</span><h2 id="heading-${c.id}">${c.title}</h2><span class="section-ref">${c.section} · ${rows.length} 条</span></div><div class="formula-groups">${selectedGroups.filter(g=>g.chapter===c.id).map(g=>{
        const groupRows=g.ids.map(id=>rows.find(f=>f.id===id)).filter(Boolean);
        const open=filtered|| (expandedGroups.has(g.id)?expandedGroups.get(g.id):g.id===selectedGroups[0].id);
        return `<details class="formula-group" data-group="${g.id}" ${open?'open':''}><summary><span class="group-glyph" aria-hidden="true">${c.number}</span><span class="group-heading"><strong>${g.title}</strong><small>${g.description}</small></span><span class="group-count">${groupRows.length} 条</span><span class="expand-mark" aria-hidden="true">+</span></summary><div class="group-content"><div class="formula-grid">${groupRows.map(card).join('')}</div></div></details>`;
      }).join('')}</div></section>`;
    }).join('');
    if(state.mode==='formulas')document.querySelectorAll('.card-formula').forEach(fitFormula);
    syncGlass();
  }
  function fitFormula(element) {
    // Only oversized formulas shrink; normal math stays readable. Exceptionally wide math remains scrollable.
    element.style.fontSize='';
    const k=element.querySelector('.katex-html');if(!k||!element.clientWidth)return;
    const width=k.getBoundingClientRect().width, available=element.clientWidth-6;
    if(width>available)element.style.fontSize=Math.max(12,parseFloat(getComputedStyle(element).fontSize)*available/width)+'px';
  }
  function setChapter(id) {state.chapter=chapters.some(c=>c.id===id)?id:'all';render();}
  function openFormula(id) {
    const f=formulas.find(f=>f.id===id);if(!f)return;
    const c=chapters.find(c=>c.id===f.chapter);
    $('detail-chapter').textContent=`${c.number} / ${c.title}`;$('detail-type').textContent=f.type;$('detail-title').textContent=f.title;
    $('detail-formula').innerHTML=math(f.latex);
    $('detail-variables').innerHTML=f.variables.map(([symbol,meaning])=>`<div class="variable-row"><dt>${math(symbol,false)}</dt><dd>${prose(meaning)}</dd></div>`).join('');
    $('detail-condition').innerHTML=prose(f.condition);$('detail-hint').innerHTML=prose(f.hint);$('detail-source').textContent=`原公式依据复习提纲 · ${c.source} ${c.section}。推导与反解由现有课程关系整理。`;
    const lesson=learning[f.id];
    $('detail-learning-kind').textContent=lesson.kind;
    $('detail-derivation').innerHTML=lesson.steps.map(([text,latex],i)=>`<li><span class="derivation-number">0${i+1}</span><div><p>${prose(text)}</p>${latex?`<div class="derivation-equation math-scroll">${math(latex)}</div>`:''}</div></li>`).join('');
    $('detail-solves').innerHTML=lesson.solves.map(([quantity,latex,note])=>`<article class="solve-card"><h4>${escape(quantity)}</h4><div class="solve-equation math-scroll">${math(latex)}</div><p>${prose(note)}</p></article>`).join('');
    $('detail-related').innerHTML=lesson.related.map(id=>`<button class="formula-reference" data-formula="${id}">${escape(formulas.find(f=>f.id===id).title)} ↗</button>`).join('');
    $('detail-derivation-panel').open=true;$('detail-solves-panel').open=true;$('detail-variables-panel').open=false;
    if(!$('formula-dialog').open)$('formula-dialog').showModal();$('formula-dialog').scrollTop=0;document.body.style.overflow='hidden';
    syncGlass();
  }
  function reset(){state.chapter='all';state.query='';state.type='全部类型';$('search').value='';$('type-filter').value='全部类型';history.replaceState(null,'','#all');render();}
  function updateHeading(){
    const chapter=chapters.find(c=>c.id===state.chapter);
    const headings={formulas:[chapter?chapter.title:'电磁学公式交互式复习',chapter?chapter.description:'按章节和模型找公式，点击查看推导、物理量求法与适用条件。'],guide:['做题思路','从对称性、边界条件与守恒关系开始，先选方法，再代公式。'],summary:['总结与易错辨析','同一个物理量的不同求法，串联现有公式与适用条件。']};
    [$('page-title').textContent,$('page-description').textContent]=headings[state.mode];
  }
  function setMode(mode,updateHash=false){
    state.mode=mode;
    for(const [value,prefix] of modes){const active=mode===value;$(prefix+'-view').hidden=!active;$(prefix+'-tab').setAttribute('aria-selected',String(active));$(prefix+'-tab').tabIndex=active?0:-1;}
    if(updateHash)history.pushState(null,'','#'+(mode==='formulas'?state.chapter:mode));
    updateHeading();
    if(mode==='formulas')document.querySelectorAll('.card-formula').forEach(fitFormula);
  }
  function route(){const id=location.hash.slice(1);if(id==='main')return;if(id==='guide'||id==='summary')setMode(id);else{setMode('formulas');setChapter(id);}}
  $('type-filter').innerHTML=types.map(t=>`<option>${t}</option>`).join('');
  $('search').addEventListener('input',event=>{state.query=event.target.value.trim();render();});
  $('type-filter').addEventListener('change',event=>{state.type=event.target.value;render();});
  $('chapter-select').addEventListener('change',event=>{location.hash=event.target.value;});
  window.addEventListener('hashchange',route);
  $('chapter-nav').addEventListener('click',()=>setMode('formulas'));
  document.querySelector('main').addEventListener('click',event=>{const card=event.target.closest('[data-formula]');if(card)openFormula(card.dataset.formula);});
  $('formula-list').addEventListener('toggle',event=>{const group=event.target;if(!group.matches('details.formula-group')||!group.isConnected)return;if(!state.query&&state.type==='全部类型')expandedGroups.set(group.dataset.group,group.open);if(group.open&&state.mode==='formulas')requestAnimationFrame(()=>group.querySelectorAll('.card-formula').forEach(fitFormula));},true);
  function setAllGroups(open){document.querySelectorAll('.formula-group').forEach(group=>{group.open=open;expandedGroups.set(group.dataset.group,open);});if(open)requestAnimationFrame(()=>document.querySelectorAll('.card-formula').forEach(fitFormula));}
  $('expand-groups').addEventListener('click',()=>setAllGroups(true));$('collapse-groups').addEventListener('click',()=>setAllGroups(false));
  $('detail-related').addEventListener('click',event=>{const button=event.target.closest('[data-formula]');if(button)openFormula(button.dataset.formula);});
  $('close-detail').addEventListener('click',()=>$('formula-dialog').close());
  $('formula-dialog').addEventListener('click',event=>{if(event.target===$('formula-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
  $('formula-dialog').addEventListener('close',()=>{document.body.style.overflow='';});
  $('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
  for(const [value,prefix] of modes)$(prefix+'-tab').addEventListener('click',()=>setMode(value,true));
  document.querySelector('.mode-tabs').addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();let index=modes.findIndex(([value])=>value===state.mode);index=event.key==='Home'?0:event.key==='End'?modes.length-1:(index+(event.key==='ArrowRight'?1:-1)+modes.length)%modes.length;setMode(modes[index][0],true);$(modes[index][1]+'-tab').focus();}});
  document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('formula-dialog').open){event.preventDefault();setMode('formulas',true);$('search').focus();}});
  const guide=window.REVIEW_DATA.guide;
  $('guide-view').innerHTML='<p class="guide-intro">从对称性、边界条件与守恒关系开始，先选方法，再代公式。</p>'+
    `<section class="guide-block"><h2>一道题的六个步骤</h2><ol class="steps">${guide.steps.map(([title,content],i)=>`<li><span class="step-number">0${i+1}</span><div><strong>${title}</strong><p>${prose(content)}</p></div></li>`).join('')}</ol></section>`+
    `<section class="guide-block"><h2>三个高频模板</h2>${guide.templates.map(([title,content])=>`<article class="template"><h3>${title}</h3><p>${prose(content)}</p></article>`).join('')}</section>`+
    `<section class="guide-block"><h2>题型与方法</h2><div class="table-scroll" tabindex="0" aria-label="题型与方法表格，可横向滚动"><table><thead><tr><th>题目特征</th><th>起手方法</th><th>关键检查</th></tr></thead><tbody>${guide.models.map(row=>`<tr>${row.map(cell=>`<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`+
    `<section class="guide-block"><h2>易错点速查</h2><ol class="mistakes">${guide.pitfalls.map(p=>`<li>${prose(p)}</li>`).join('')}</ol></section>`;
  const summary=window.REVIEW_DATA.summary;
  const references=ids=>`<div class="formula-references" aria-label="关联公式">${ids.map(id=>{const f=formulas.find(f=>f.id===id);return `<button class="formula-reference" data-formula="${id}">${escape(f.title)}<span aria-hidden="true"> ↗</span></button>`;}).join('')}</div>`;
  $('summary-view').innerHTML=`
    <div class="summary-intro"><span class="eyebrow">CONNECT THE FORMULAS</span><h2>从“要求什么”出发。</h2><p>${summary.targets.length} 类物理量 · ${summary.pitfalls.length} 组易错辨析 · ${summary.chains.length} 条综合解题路线。点击关联公式，继续查看变量、条件与提示。</p><div class="summary-stats"><span>覆盖 ${formulas.length} 条现有公式</span><span>静电学 → 稳恒磁场</span></div></div>
    <nav class="summary-nav" aria-label="总结页快速导航"><button data-scroll="summary-quantities">按物理量选方法 <span>01</span></button><button data-scroll="summary-pitfalls">易错概念辨析 <span>02</span></button><button data-scroll="summary-chains">综合解题路线 <span>03</span></button><button data-scroll="summary-checks">交卷前检查 <span>04</span></button></nav>
    <section id="summary-quantities" class="summary-section" tabindex="-1"><div class="summary-heading"><span class="section-number">01</span><h2>要求什么量？</h2><span>已知条件决定求法</span></div><p class="section-description">展开一个物理量，比较不同求法；下面的公式按钮均指向已有课程公式。</p><div class="quantity-nav">${summary.targets.map(target=>`<button data-scroll="quantity-${target.id}">${math(target.symbol,false)}<span>${escape(target.title)}</span></button>`).join('')}</div>
    <div class="quantity-list">${summary.targets.map((target,index)=>`<details id="quantity-${target.id}" class="quantity-card" ${index===0?'open':''}><summary><span class="quantity-symbol">${math(target.symbol,false)}</span><span class="quantity-name"><strong>${target.title}</strong><small>${target.methods.length} 种求解路线</small></span><span class="expand-mark" aria-hidden="true">+</span></summary><div class="quantity-body"><p class="quantity-intro">${prose(target.intro)}</p><div class="method-grid">${target.methods.map((method,i)=>`<article class="method-card"><span class="method-number">METHOD 0${i+1}</span><h3>${method.title}</h3><p class="method-when"><strong>适用</strong>${prose(method.when)}</p><div class="summary-equation math-scroll">${math(formulas.find(f=>f.id===method.refs[0]).latex)}</div><p>${prose(method.steps)}</p>${references(method.refs)}</article>`).join('')}</div><p class="quantity-check"><span>核对</span>${prose(target.check)}</p></div></details>`).join('')}</div></section>
    <section id="summary-pitfalls" class="summary-section" tabindex="-1"><div class="summary-heading"><span class="section-number">02</span><h2>易错概念，逐对辨清。</h2><span>展开查看原因与公式</span></div><div class="pitfall-grid">${summary.pitfalls.map((item,index)=>`<details class="pitfall-card"><summary><span class="pitfall-number">${String(index+1).padStart(2,'0')}</span><strong>${item.title}</strong><span class="expand-mark" aria-hidden="true">+</span></summary><div class="pitfall-body"><div class="comparison wrong"><span>常见误判</span><p>${prose(item.wrong)}</p></div><div class="comparison correct"><span>正确理解</span><p>${prose(item.right)}</p></div><p class="pitfall-check">自检：${prose(item.check)}</p>${references(item.refs)}</div></details>`).join('')}</div></section>
    <section id="summary-chains" class="summary-section" tabindex="-1"><div class="summary-heading"><span class="section-number">03</span><h2>把几组公式串成一条路线。</h2></div><div class="chain-list">${summary.chains.map(chain=>`<article class="chain-card"><h3>${chain.title}</h3><ol class="chain-steps">${chain.steps.map((step,i)=>`<li><span>0${i+1}</span>${step}</li>`).join('')}</ol><p>${prose(chain.note)}</p>${references(chain.refs)}</article>`).join('')}</div></section>
    <section id="summary-checks" class="summary-section" tabindex="-1"><div class="summary-heading"><span class="section-number">04</span><h2>交卷前的六项检查。</h2></div><div class="final-checks">${summary.checks.map(([label,content])=>`<article><span>${label}</span><p>${content}</p></article>`).join('')}</div><p class="summary-source">依据三份课件整理的现有提纲与 ${formulas.length} 条公式；上面的反解与路线是对这些关系的整理，适用条件以公式详情和题目为准。</p></section>`;
  $('summary-view').addEventListener('click',event=>{const button=event.target.closest('[data-scroll]');if(!button)return;const target=$(button.dataset.scroll);if(target.tagName==='DETAILS')target.open=true;target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});if(target.tagName==='DETAILS')target.querySelector('summary').focus({preventScroll:true});else target.focus({preventScroll:true});});

  // Track only visible glass surfaces. Read all geometry before writing pointer styles.
  const glassSelector='.formula-card,.formula-group,.browse-button,.solve-card,.mode-tabs button,.nav-link,.search-box,.filter-control,.mobile-chapter,.icon-button,.steps li,.template,.mistakes,.quantity-card,.method-card,.pitfall-card,.chain-card,.summary-intro,.summary-nav button,.quantity-nav button,.formula-reference,.final-checks article';
  const tracked=new Set(), visible=new Set();
  const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);}}):null;
  function syncGlass(){
    for(const element of tracked)if(!element.isConnected){observer?.unobserve(element);tracked.delete(element);visible.delete(element);}
    document.querySelectorAll(glassSelector).forEach(element=>{element.classList.add('glass-surface');if(tracked.has(element))return;tracked.add(element);if(observer)observer.observe(element);else visible.add(element);});
  }
  const pointerMedia=matchMedia('(hover: hover) and (pointer: fine)'), reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let pointerFrame=0,point={x:0,y:0};
  function clearLight(){if(pointerFrame){cancelAnimationFrame(pointerFrame);pointerFrame=0;}document.body.classList.remove('pointer-active');for(const element of tracked)element.style.removeProperty('--spot-opacity');}
  document.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||!pointerMedia.matches||reducedMotion.matches)return;
    point={x:event.clientX,y:event.clientY};if(pointerFrame)return;
    pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;document.body.classList.add('pointer-active');document.querySelector('.cursor-aura').style.transform=`translate3d(${point.x-250}px,${point.y-250}px,0)`;
      const positions=[...visible].filter(element=>element.isConnected).map(element=>[element,element.getBoundingClientRect()]);
      for(const [element,rect] of positions){const distance=Math.hypot(Math.max(rect.left-point.x,0,point.x-rect.right),Math.max(rect.top-point.y,0,point.y-rect.bottom));element.style.setProperty('--spot-x',`${point.x-rect.left}px`);element.style.setProperty('--spot-y',`${point.y-rect.top}px`);element.style.setProperty('--spot-opacity',String(Math.max(0,1-distance/260)));}
    });
  },{passive:true});
  document.addEventListener('pointerleave',clearLight);window.addEventListener('blur',clearLight);window.addEventListener('scroll',clearLight,{passive:true});
  for(const media of [pointerMedia,reducedMotion])media.addEventListener('change',clearLight);
  window.addEventListener('resize',()=>{clearLight();if(state.mode==='formulas')document.querySelectorAll('.card-formula').forEach(fitFormula);});
  syncGlass();
  const context=document.modelContext;
  if(context?.registerTool){const lifecycle=new AbortController();
    const register=tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
    register({name:'search_formulas',description:'检索复习站的课程公式，并同步更新页面搜索与筛选。',inputSchema:{type:'object',properties:{query:{type:'string'},chapter:{type:'string',enum:['all',...chapters.map(c=>c.id)]}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.query!=='string'||(input.chapter&&!['all',...chapters.map(c=>c.id)].includes(input.chapter)))throw new Error('Invalid search input');state.query=input.query.trim();state.chapter=input.chapter||'all';state.type='全部类型';$('search').value=state.query;$('type-filter').value=state.type;setMode('formulas');render();return matching().map(({id,title,chapter})=>({id,title,chapter}));}});
    register({name:'open_formula_detail',description:'在页面打开一条课程公式，查看变量、适用条件与解题提示。',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.id!=='string'||!formulas.some(f=>f.id===input.id))throw new Error('Unknown formula');openFormula(input.id);return {id:input.id,title:$('detail-title').textContent,opened:true};}});
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
  setChapter('all');route();
})();
