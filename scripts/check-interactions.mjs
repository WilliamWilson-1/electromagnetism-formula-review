import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import katex from 'katex';

// DOM simulation verifies event wiring and routing, not browser layout or glass appearance.
const html=fs.readFileSync('dist/index.html','utf8');
function load(hash='',coarse=false,reduced=false){
  const dom=new JSDOM(html,{url:`https://example.test/electromagnetism-formula-review/${hash}`,runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window;
  w.katex=katex;
  w.matchMedia=query=>({matches:query.includes('reduced-motion')?reduced:query.includes('pointer: fine')?!coarse:false,addEventListener(){}});
  w.HTMLElement.prototype.scrollIntoView=function(){this.dataset.scrolled='true';};
  w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
  w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
  for(const file of ['data.js','content.js','summary.js','learning.js','quiz-data.js','quiz-engine.js','quiz-ui.js','materials.js','app.js'])w.eval(fs.readFileSync('dist/'+file,'utf8'));
  return dom;
}
const dom=load(),w=dom.window,d=w.document,$=id=>d.getElementById(id);
const settle=()=>new Promise(resolve=>w.setTimeout(resolve,25));
const displayedCards=()=>[...d.querySelectorAll('.formula-card')];
assert.equal(displayedCards().length,83,'All formulas load without a startup exception');
assert.equal(d.querySelectorAll('.quantity-card').length,12);
assert.equal(d.querySelectorAll('.pitfall-card').length,16);
assert.equal(d.querySelectorAll('.katex-error').length,0);
assert.equal(d.querySelectorAll('.formula-group').length,34);
assert.equal(d.querySelectorAll('.formula-group[open]').length,1,'Initial index is compact');
$('collapse-groups').click();await settle();
assert.equal(d.querySelectorAll('.formula-group[open]').length,0);
$('expand-groups').click();await settle();
assert.equal(d.querySelectorAll('.formula-group[open]').length,34);
$('collapse-groups').click();await settle();
d.querySelector('[data-group="capacitor-models"]').open=true;await settle();
assert.equal(d.querySelectorAll('[data-group="capacitor-models"] .formula-card').length,3);
assert.equal(d.querySelectorAll('[data-group="straight-wire-models"] .formula-card').length,3);
assert.equal(d.querySelectorAll('[data-group="round-current-models"] .formula-card').length,3);

// Each formula card has its own steps and usable inversions; related formulas update the panel.
for(const card of displayedCards()){
  card.click();
  const lesson=w.REVIEW_DATA.learning[card.dataset.formula];
  assert.equal($('detail-derivation').children.length,lesson.steps.length);
  assert.equal($('detail-solves').children.length,lesson.solves.length);
  assert.ok($('detail-learning-kind').textContent.length>0);
  assert.equal(d.querySelectorAll('#formula-dialog .katex-error').length,0);
  const related=$('detail-related').querySelector('button');
  related.click();
  assert.equal($('detail-title').textContent,w.REVIEW_DATA.formulas.find(f=>f.id===related.dataset.formula).title);
  $('close-detail').click();
}

$('summary-tab').click();
assert.equal(w.location.hash,'#summary');
assert.equal($('summary-view').hidden,false);
assert.equal($('formula-view').hidden,true);
assert.equal($('summary-tab').getAttribute('aria-selected'),'true');
assert.match($('page-title').textContent,/总结/);
d.querySelector('[data-scroll="quantity-hall"]').click();
assert.equal($('quantity-hall').open,true);
assert.equal($('quantity-hall').dataset.scrolled,'true');

// Every reference on the new page must open the intended existing formula, not a stale card.
const formulas=w.REVIEW_DATA.formulas;
for(const button of d.querySelectorAll('#summary-view [data-formula]')){
  button.click();
  assert.equal($('formula-dialog').open,true);
  assert.equal($('detail-title').textContent,formulas.find(f=>f.id===button.dataset.formula).title);
  assert.ok($('detail-variables').children.length>0);
  assert.equal(d.body.style.overflow,'hidden');
  $('close-detail').click();
  assert.equal(d.body.style.overflow,'');
}

$('summary-tab').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));
assert.equal($('guide-view').hidden,false);
assert.equal(d.activeElement,$('guide-tab'));
$('guide-tab').dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));
assert.equal(d.activeElement,$('quiz-tab'));
$('quiz-tab').dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));
assert.equal($('formula-view').hidden,false);
assert.equal(d.activeElement,$('formula-tab'));

$('search').value='hall-voltage';$('search').dispatchEvent(new w.Event('input',{bubbles:true}));
assert.equal(displayedCards().length,1);
assert.equal(displayedCards()[0].dataset.formula,'hall-voltage');
assert.equal(d.querySelectorAll('.formula-group[open]').length,1,'Filtered result is expanded even if previously collapsed');
$('summary-tab').click();$('formula-tab').click();
assert.equal($('search').value,'hall-voltage','Switching views preserves search');
assert.equal(displayedCards().length,1);
$('reset').click();
assert.equal(displayedCards().length,83);
await settle();
assert.equal(d.querySelector('[data-group="capacitor-models"]').open,true,'Manual expansion persists after clearing search');
assert.equal(d.querySelector('[data-group="straight-wire-models"]').open,false,'Other manually collapsed groups stay compact');
w.location.hash='particles';await settle();
assert.equal(displayedCards().length,12);
assert.match($('page-title').textContent,/粒子/);
$('type-filter').value='受力运动';$('type-filter').dispatchEvent(new w.Event('change'));
assert.ok(displayedCards().length>0);
assert.ok(displayedCards().every(card=>card.querySelector('.card-type').textContent==='受力运动'));
$('search').value='no-match';$('search').dispatchEvent(new w.Event('input'));
assert.equal($('empty-state').hidden,false);
$('empty-reset').click();assert.equal(displayedCards().length,83);

d.dispatchEvent(new w.MouseEvent('pointermove',{clientX:50,clientY:50,bubbles:true}));await settle();
assert.equal(d.body.classList.contains('pointer-active'),true);
w.dispatchEvent(new w.Event('blur'));
assert.equal(d.body.classList.contains('pointer-active'),false);
dom.window.close();
for(const [hash,coarse,reduced] of [['#summary',true,false],['#guide',false,true],['#quiz',true,false]]){
  const direct=load(hash,coarse,reduced),doc=direct.window.document;
  assert.equal(doc.getElementById(hash.slice(1)+'-view').hidden,false,'Deep link opens correct view');
  doc.dispatchEvent(new direct.window.MouseEvent('pointermove',{bubbles:true}));
  assert.equal(doc.body.classList.contains('pointer-active'),false,'Coarse pointer or reduced motion keeps static glass');
  direct.window.close();
}
console.log('PASS: compact model groups, bulk expand/collapse, preserved group state, all 83 enriched formula details and related links, routing, keyboard tabs, search/filter/reset and pointer preferences (DOM simulation; no visual layout verification).');
