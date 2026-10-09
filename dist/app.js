(() => {
  'use strict';
  const { chapters, types, formulas } = window.REVIEW_DATA;
  const $ = id => document.getElementById(id);
  const state = { chapter:'all', query:'', type:'全部类型', mode:'formulas' };
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const math = (latex, displayMode=true) => window.katex ? katex.renderToString(latex,{displayMode,throwOnError:false,strict:'ignore',output:'htmlAndMathml'}) : escape(latex);
  const prose = text => text.split(/(\$[^$]+\$)/g).map(part => part.startsWith('$')&&part.endsWith('$')?math(part.slice(1,-1),false):escape(part)).join('');
  const normalize = text => text.toLocaleLowerCase().replace(/\s+/g,'');
  const matching = () => formulas.filter(f => (state.chapter==='all'||f.chapter===state.chapter)&&(state.type==='全部类型'||f.type===state.type)&&(!state.query||normalize([f.title,f.latex,f.condition,f.hint,f.keywords,chapters.find(c=>c.id===f.chapter).title,...f.variables.flat()].join(' ')).includes(normalize(state.query))));
  function nav() {
    $('chapter-nav').innerHTML = `<a class="nav-link${state.chapter==='all'?' active':''}" href="#all" ${state.chapter==='all'?'aria-current="page"':''}><span class="nav-number">∑</span><span>全部公式</span><span class="nav-count">${formulas.length}</span></a><div class="nav-divider"></div>` + chapters.map((c,i) => `${i===0?'<div class="nav-group">静电学 · 第10章</div>':i===7?'<div class="nav-divider"></div><div class="nav-group">稳恒磁场 · 第11章</div>':''}<a class="nav-link${c.id===state.chapter?' active':''}" href="#${c.id}" ${c.id===state.chapter?'aria-current="page"':''}><span class="nav-number">${c.number}</span><span>${c.title}</span><span class="nav-count">${formulas.filter(f=>f.chapter===c.id).length}</span></a>`).join('');
    $('chapter-select').innerHTML = `<option value="all">全部章节</option>` + chapters.map(c=>`<option value="${c.id}">${c.number} ${c.title}</option>`).join('');
    $('chapter-select').value=state.chapter;
  }
  function render() {
    nav();
    const chapter=chapters.find(c=>c.id===state.chapter);
    $('page-title').textContent=chapter?chapter.title:'公式，在这里串起来。';
    $('page-description').textContent=chapter?chapter.description:'按章节找公式，点击查看变量、适用条件与解题提示。';
    $('total-number').textContent=formulas.length;
    const selected=matching();
    $('result-count').textContent = `显示 ${selected.length} 条公式 · ${chapter?chapter.section:'全部章节'}`;
    $('reset').hidden=state.chapter==='all'&&!state.query&&state.type==='全部类型';
    $('empty-state').hidden=selected.length!==0;
    $('formula-list').innerHTML=chapters.map(c=>{
      const rows=selected.filter(f=>f.chapter===c.id);if(!rows.length)return '';
      return `<section class="chapter-section" aria-labelledby="heading-${c.id}"><div class="section-heading"><span class="section-number">${c.number}</span><h2 id="heading-${c.id}">${c.title}</h2><span class="section-ref">${c.section} · ${rows.length} 条</span></div><div class="formula-grid">${rows.map(f=>`<button class="formula-card" data-formula="${f.id}" aria-label="查看${escape(f.title)}：变量、条件与解题提示"><div class="card-top"><span class="card-index">${c.number}.${String(formulas.filter(x=>x.chapter===c.id).indexOf(f)+1).padStart(2,'0')}</span><span class="card-type">${f.type}</span></div><h3>${escape(f.title)}</h3><div class="card-formula">${math(f.latex)}</div><div class="card-bottom"><span class="card-open">变量 · 条件 · 解题提示</span><span class="card-mark" aria-hidden="true">+</span></div></button>`).join('')}</div></section>`;
    }).join('');
    document.querySelectorAll('.card-formula').forEach(fitFormula);
  }
  function fitFormula(element) {
    // Only oversized formulas shrink; normal math stays readable. Exceptionally wide math remains scrollable.
    const k=element.querySelector('.katex-html');if(!k)return;
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
    $('detail-condition').innerHTML=prose(f.condition);$('detail-hint').innerHTML=prose(f.hint);$('detail-source').textContent=`依据复习提纲 · ${c.source} ${c.section}`;
    $('formula-dialog').showModal();$('formula-dialog').scrollTop=0;document.body.style.overflow='hidden';
  }
  function reset(){state.chapter='all';state.query='';state.type='全部类型';$('search').value='';$('type-filter').value='全部类型';history.replaceState(null,'','#all');render();}
  function setMode(mode){state.mode=mode;const isFormula=mode==='formulas';$('formula-view').hidden=!isFormula;$('guide-view').hidden=isFormula;for(const [id,active] of [['formula-tab',isFormula],['guide-tab',!isFormula]]){$(id).setAttribute('aria-selected',String(active));$(id).tabIndex=active?0:-1;}}
  $('type-filter').innerHTML=types.map(t=>`<option>${t}</option>`).join('');
  $('search').addEventListener('input',event=>{state.query=event.target.value.trim();render();});
  $('type-filter').addEventListener('change',event=>{state.type=event.target.value;render();});
  $('chapter-select').addEventListener('change',event=>{location.hash=event.target.value;});
  window.addEventListener('hashchange',()=>setChapter(location.hash.slice(1)));
  $('chapter-nav').addEventListener('click',()=>setMode('formulas'));
  $('formula-list').addEventListener('click',event=>{const card=event.target.closest('[data-formula]');if(card)openFormula(card.dataset.formula);});
  $('close-detail').addEventListener('click',()=>$('formula-dialog').close());
  $('formula-dialog').addEventListener('click',event=>{if(event.target===$('formula-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
  $('formula-dialog').addEventListener('close',()=>{document.body.style.overflow='';});
  $('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
  $('formula-tab').addEventListener('click',()=>setMode('formulas'));$('guide-tab').addEventListener('click',()=>setMode('guide'));
  document.querySelector('.mode-tabs').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();setMode(state.mode==='formulas'?'guide':'formulas');$(state.mode==='formulas'?'formula-tab':'guide-tab').focus();}});
  document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('formula-dialog').open){event.preventDefault();setMode('formulas');$('search').focus();}});
  const guide=window.REVIEW_DATA.guide;
  $('guide-view').innerHTML='<p class="guide-intro">从对称性、边界条件与守恒关系开始，先选方法，再代公式。</p>'+
    `<section class="guide-block"><h2>一道题的六个步骤</h2><ol class="steps">${guide.steps.map(([title,content],i)=>`<li><span class="step-number">0${i+1}</span><div><strong>${title}</strong><p>${prose(content)}</p></div></li>`).join('')}</ol></section>`+
    `<section class="guide-block"><h2>三个高频模板</h2>${guide.templates.map(([title,content])=>`<article class="template"><h3>${title}</h3><p>${prose(content)}</p></article>`).join('')}</section>`+
    `<section class="guide-block"><h2>题型与方法</h2><div class="table-scroll" tabindex="0" aria-label="题型与方法表格，可横向滚动"><table><thead><tr><th>题目特征</th><th>起手方法</th><th>关键检查</th></tr></thead><tbody>${guide.models.map(row=>`<tr>${row.map(cell=>`<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`+
    `<section class="guide-block"><h2>易错点速查</h2><ol class="mistakes">${guide.pitfalls.map(p=>`<li>${prose(p)}</li>`).join('')}</ol></section>`;
  const context=document.modelContext;
  if(context?.registerTool){const lifecycle=new AbortController();
    const register=tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
    register({name:'search_formulas',description:'检索复习站的课程公式，并同步更新页面搜索与筛选。',inputSchema:{type:'object',properties:{query:{type:'string'},chapter:{type:'string',enum:['all',...chapters.map(c=>c.id)]}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.query!=='string'||(input.chapter&&!['all',...chapters.map(c=>c.id)].includes(input.chapter)))throw new Error('Invalid search input');state.query=input.query.trim();state.chapter=input.chapter||'all';state.type='全部类型';$('search').value=state.query;$('type-filter').value=state.type;setMode('formulas');render();return matching().map(({id,title,chapter})=>({id,title,chapter}));}});
    register({name:'open_formula_detail',description:'在页面打开一条课程公式，查看变量、适用条件与解题提示。',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.id!=='string'||!formulas.some(f=>f.id===input.id))throw new Error('Unknown formula');openFormula(input.id);return {id:input.id,title:$('detail-title').textContent,opened:true};}});
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
  setChapter(location.hash.slice(1));
})();
