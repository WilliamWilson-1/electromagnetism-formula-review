import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import * as css from 'css-tree';

const stylesheet=fs.readFileSync('dist/materials.css','utf8');
for(const file of ['styles.css','materials.css'])css.parse(fs.readFileSync('dist/'+file,'utf8'),{onParseError(error){throw new Error(file+': '+error.formattedMessage);}});
const ast=css.parse(stylesheet),themes={};
const sidebarRule=[...ast.children].find(rule=>rule.type==='Rule'&&css.generate(rule.prelude)==='.sidebar.glass-surface');
const sidebarPaint=Object.fromEntries([...sidebarRule.block.children].filter(node=>node.type==='Declaration').map(node=>[node.property,css.generate(node.value).trim()]));
assert.equal(sidebarPaint['background-origin'],'border-box');
assert.equal(sidebarPaint['background-attachment'],'scroll','Sidebar glow stays fixed to the visible box rather than scrolling content');
for(const rule of ast.children)if(rule.type==='Rule'&&[':root',':root[data-theme="dark"]'].includes(css.generate(rule.prelude))){
  const tokens={};for(const node of rule.block.children)if(node.type==='Declaration')tokens[node.property]=css.generate(node.value).trim();
  themes[css.generate(rule.prelude)]=tokens;
}
const lum=color=>{
  assert.match(color,/^#[0-9a-f]{3,6}$/i);
  const h=color.slice(1),hex=h.length===3?[...h].map(c=>c+c).join(''):h;
  const channels=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
};
for(const [theme,overrides] of Object.entries(themes)){
  const tokens={...themes[':root'],...overrides};
  for(const [fg,bg] of [['--ink','--paper'],['--muted','--paper'],['--green','--paper'],['--primary-ink','--primary-fill'],['--correct-ink','--correct-fill'],['--wrong-ink','--wrong-fill']]){
    const a=lum(tokens[fg]),b=lum(tokens[bg]),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    assert.ok(ratio>=4.5,`${theme} ${fg}/${bg}: ${ratio.toFixed(2)} contrast <4.5`);
  }
}
const html=fs.readFileSync('dist/index.html','utf8'),source=fs.readFileSync('dist/materials.js','utf8');
// Exercise the generated guide with both stylesheets: token contrast alone misses
// a legacy component selector overriding the material background with white.
const guideDOM=new JSDOM(html,{url:'https://example.test/#guide',runScripts:'outside-only',pretendToBeVisual:true});
const gw=guideDOM.window,gd=gw.document;
gw.matchMedia=()=>({matches:false,addEventListener(){}});
gw.HTMLElement.prototype.scrollIntoView=function(){};
for(const file of ['data.js','content.js','summary.js','learning.js','quiz-data.js','quiz-engine.js','quiz-ui.js','materials.js','segments.js','app.js'])gw.eval(fs.readFileSync('dist/'+file,'utf8'));
assert.equal(gd.querySelectorAll('.steps li').length,6);
const guideStyles=gd.createElement('style');gd.head.append(guideStyles);
for(const [theme,reduced] of [['light',false],['dark',false],['dark',true]]){
  const tokens={...themes[':root'],...(theme==='dark'?themes[':root[data-theme="dark"]']: {})};
  if(reduced)tokens['--content-fill']=tokens['--paper'];
  gd.documentElement.dataset.theme=theme;
  gd.documentElement.dataset.transparency=reduced?'reduced':'regular';
  // jsdom does not resolve CSS variables. Substitute known theme tokens before
  // checking the real stylesheet cascade; this is not a rendered pixel check.
  guideStyles.textContent=['styles.css','materials.css'].map(file=>fs.readFileSync('dist/'+file,'utf8').replace(/var\((--[\w-]+)(?:,\s*var\(--paper\))?\)/g,(match,name)=>tokens[name]??match)).join('\n');
  const probe=gd.createElement('div');probe.style.backgroundColor=tokens['--content-fill'];gd.body.append(probe);
  const expected=gw.getComputedStyle(probe).backgroundColor;probe.remove();
  for(const card of gd.querySelectorAll('.steps li,.template,.mistakes,.guide-block table')){
    assert.equal(gw.getComputedStyle(card).backgroundColor,expected,`${theme}${reduced?' reduced':''}: ${card.className||card.tagName} uses the reading surface`);
  }
}
guideDOM.window.close();
function load({dark=false,systemSolid=false,reduced=false,saved=null,storageBlocked=false}={}){
  const dom=new JSDOM(html,{url:'https://example.test/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
  const queries=new Map();
  w.matchMedia=q=>{
    const query={matches:q.includes('color-scheme')?dark:q.includes('reduced-transparency')?systemSolid:q.includes('reduced-motion')?reduced:q.includes('pointer: fine'),listeners:[],addEventListener(event,fn){this.listeners.push(fn);}};
    queries.set(q,query);return query;
  };
  if(saved)w.localStorage.setItem('review-appearance',JSON.stringify(saved));
  if(storageBlocked)Object.defineProperty(w,'localStorage',{get(){throw new Error('Storage disabled');}});
  w.eval(source);return {dom,w,queries};
}
const {dom,w,queries}=load(),d=w.document,root=d.documentElement,$=id=>d.getElementById(id);
const settle=()=>new Promise(resolve=>w.setTimeout(resolve,30));
const change=(id,value)=>{$(id).value=value;$(id).dispatchEvent(new w.Event('change',{bubbles:true}));};
assert.equal(root.dataset.theme,'light');
change('appearance-theme','dark');assert.equal(root.dataset.theme,'dark');
assert.equal(JSON.parse(w.localStorage.getItem('review-appearance')).theme,'dark');
change('appearance-theme','system');
const darkMedia=queries.get('(prefers-color-scheme: dark)');darkMedia.matches=true;darkMedia.listeners.forEach(fn=>fn());assert.equal(root.dataset.theme,'dark');
const card=d.createElement('button');card.className='formula-card';d.getElementById('formula-list').append(card);
w.REVIEW_MATERIALS.sync();
assert.equal(card.classList.contains('content-surface'),true);assert.equal(card.classList.contains('glass-surface'),false,'Math content uses the standard reading layer');
assert.equal(d.querySelector('.mode-tabs').classList.contains('glass-surface'),true);
assert.equal($('formula-tab').classList.contains('glass-surface'),false,'Tabs share one glass container');
const quizTab=$('quiz-tab');
for(const tab of d.querySelectorAll('[role="tab"]'))tab.setAttribute('aria-selected',String(tab===quizTab));
Object.defineProperties(quizTab,{offsetWidth:{value:96},offsetHeight:{value:44},offsetLeft:{value:306},offsetTop:{value:5}});
w.REVIEW_MATERIALS.updateTabs();await settle();
assert.equal(d.querySelector('.tab-highlight').style.transform,'translate(306px,5px)');
assert.equal(d.querySelector('.tab-highlight').style.width,'96px');
d.dispatchEvent(new w.MouseEvent('pointermove',{clientX:50,clientY:50,bubbles:true}));await settle();assert.equal(d.body.classList.contains('pointer-active'),true);
// Reconstruct the glow center in viewport coordinates as the sidebar scrolls and sticks.
const sidebar=d.querySelector('.sidebar');
let sidebarRect={left:16,top:88,right:256,bottom:688,width:240,height:600};
sidebar.getBoundingClientRect=()=>sidebarRect;
for(const [scrollTop,top,x,y] of [[0,88,80,200],[160,88,100,500],[240,120,76,620]]){
  sidebar.scrollTop=scrollTop;sidebarRect={...sidebarRect,top,bottom:top+600};
  sidebar.dispatchEvent(new w.Event('scroll'));
  d.dispatchEvent(new w.MouseEvent('pointermove',{clientX:x,clientY:y,bubbles:true}));await settle();
  assert.equal(sidebarRect.left+parseFloat(sidebar.style.getPropertyValue('--spot-x')),x);
  assert.equal(sidebarRect.top+parseFloat(sidebar.style.getPropertyValue('--spot-y')),y,'Scrolled sidebar glow aligns with cursor');
  assert.equal(sidebar.style.getPropertyValue('--spot-opacity'),'1');
}
$('appearance-solid').checked=true;$('appearance-solid').dispatchEvent(new w.Event('change',{bubbles:true}));
assert.equal(root.dataset.transparency,'reduced');assert.equal(d.body.classList.contains('pointer-active'),false);
d.dispatchEvent(new w.MouseEvent('pointermove',{bubbles:true}));await settle();assert.equal(d.body.classList.contains('pointer-active'),false);
$('appearance-menu').open=true;d.body.click();assert.equal($('appearance-menu').open,false);
$('appearance-menu').open=true;d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal($('appearance-menu').open,false);
const pref=JSON.parse(w.localStorage.getItem('review-appearance'));dom.window.close();
for(const options of [{saved:pref},{dark:true,systemSolid:true},{storageBlocked:true},{reduced:true}]){
  const loaded=load(options),r=loaded.w.document.documentElement;
  if(options.saved)assert.equal(r.dataset.transparency,'reduced');
  if(options.systemSolid){assert.equal(r.dataset.theme,'dark');assert.equal(r.dataset.transparency,'reduced');assert.equal(loaded.w.document.getElementById('appearance-solid').disabled,true);}
  if(options.reduced){loaded.w.REVIEW_MATERIALS.sync();loaded.w.document.dispatchEvent(new loaded.w.MouseEvent('pointermove',{bubbles:true}));await new Promise(resolve=>loaded.w.setTimeout(resolve,30));assert.equal(loaded.w.document.body.classList.contains('pointer-active'),false);}
  loaded.dom.window.close();
}
console.log('PASS: CSS parsing, light/dark reading and feedback color contrast, appearance persistence, system preferences, shared glass hierarchy, moving tab indicator and reduced effects (DOM simulation; no browser visual verification).');
