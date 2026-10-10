import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import katex from 'katex';

const sandbox={window:{}};
for(const file of ['data.js','content.js','quiz-data.js','quiz-engine.js'])vm.runInNewContext(fs.readFileSync('dist/'+file,'utf8'),sandbox);
const questions=sandbox.window.REVIEW_DATA.quiz.questions,engine=sandbox.window.REVIEW_QUIZ_ENGINE;
const rng=seed=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
for(let seed=1;seed<=30;seed++){
  const selected=engine.draw(questions,{count:15},rng(seed));
  assert.equal(selected.length,15);
  assert.equal(new Set(selected.map(q=>q.id)).size,15);
  for(const kind of ['formula','concept','method'])assert.equal(selected.filter(q=>q.kind===kind).length,5);
  const ten=engine.draw(questions,{count:10},rng(seed));
  assert.equal(new Set(ten.map(q=>q.chapter)).size,10);
}
assert.equal(engine.draw(questions,{count:100}).length,66);
const scoped=engine.draw(questions,{chapter:'capacitors',kind:'formula',count:15},rng(4));
assert.equal(scoped.length,2);assert.ok(scoped.every(q=>q.chapter==='capacitors'&&q.kind==='formula'));
assert.throws(()=>engine.draw(questions,{count:0}));
const round=engine.createRound(questions,rng(8));
assert.equal(new Set(round.map(e=>e.answer)).size,4,'Correct choices occupy all four positions');
for(const entry of round){
  assert.equal(entry.choices[entry.answer].text,entry.question.options[entry.question.answer]);
  assert.throws(()=>engine.submit(entry));
  assert.equal(engine.choose(entry,9),false);
  engine.choose(entry,entry.answer);assert.equal(engine.submit(entry),true);
  assert.equal(engine.choose(entry,(entry.answer+1)%4),false,'Submitted answer locks');
  engine.submit(entry);
}
assert.equal(engine.grade(round).correct,66,'Repeated submission never adds points');
assert.equal(engine.grade(round).percent,100);

// This simulates the real page event handlers; it does not verify browser visuals.
const dom=new JSDOM(fs.readFileSync('dist/index.html','utf8'),{url:'https://example.test/#quiz',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,d=w.document,$=id=>d.getElementById(id);
w.katex=katex;w.Math.random=rng(13);
w.matchMedia=()=>({matches:false,addEventListener(){}});
w.HTMLElement.prototype.scrollIntoView=function(){};
w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
for(const file of ['data.js','content.js','summary.js','learning.js','quiz-data.js','quiz-engine.js','quiz-ui.js','app.js'])w.eval(fs.readFileSync('dist/'+file,'utf8'));
const change=(id,value)=>{$(id).value=value;$(id).dispatchEvent(new w.Event('change',{bubbles:true}));};
const submit=id=>$(id).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
const question=()=>w.REVIEW_DATA.quiz.questions.find(q=>q.id===d.querySelector('.quiz-question').dataset.questionId);
function answer(correct){
  const q=question(),entryText=q.options[q.answer];
  const radios=[...d.querySelectorAll('input[name="quiz-answer"]')];
  const right=radios.find(r=>r.nextElementSibling.querySelector('.quiz-choice-text').textContent===renderText(entryText));
  assert.ok(right,'Correct option text identifies its shuffled radio');
  const choice=correct?right:radios.find(r=>r!==right);
  choice.checked=true;choice.dispatchEvent(new w.Event('change',{bubbles:true}));
  assert.equal($('quiz-submit').disabled,false);
  submit('quiz-answer-form');
  assert.equal($('quiz-next').disabled,false);
  assert.equal(d.querySelectorAll('input[name="quiz-answer"]:disabled').length,4);
  assert.equal($('quiz-feedback').classList.contains(correct?'is-correct':'is-wrong'),true);
  assert.equal(d.querySelectorAll('.katex-error').length,0);
}
function renderText(text){
  const holder=d.createElement('span');
  holder.innerHTML=text.split(/(\$[^$]+\$)/g).map(part=>part.startsWith('$')?katex.renderToString(part.slice(1,-1),{throwOnError:true,strict:'ignore'}):part).join('');
  return holder.textContent;
}
assert.equal($('quiz-view').hidden,false);
change('quiz-count','5');$('quiz-start').click();
assert.equal($('quiz-submit').disabled,true);assert.equal($('quiz-next').disabled,true);
submit('quiz-answer-form');assert.equal($('quiz-feedback').hidden,true,'No explanation before answering');
const originalId=question().id;
$('formula-tab').click();$('quiz-tab').click();assert.equal(question().id,originalId,'View switching keeps round');
const wrongIds=[];
for(let i=0;i<5;i++){
  const correct=i>=2;if(!correct)wrongIds.push(question().id);
  answer(correct);
  const text=$('quiz-progress').value;submit('quiz-answer-form');assert.equal($('quiz-progress').value,text);
  const ref=$('quiz-feedback').querySelector('[data-formula]');ref.click();
  assert.equal($('formula-dialog').open,true);
  assert.equal($('detail-title').textContent,w.REVIEW_DATA.formulas.find(f=>f.id===ref.dataset.formula).title);
  $('close-detail').click();$('quiz-next').click();
}
assert.equal(d.querySelector('.quiz-score').dataset.correct,'3');
assert.equal(d.querySelector('.quiz-score').dataset.total,'5');
assert.equal(d.querySelectorAll('.quiz-review-item').length,2);
$('quiz-review-toggle').click();assert.equal(d.querySelectorAll('.quiz-review-item').length,5);
$('quiz-retry').click();const retried=[];
for(let i=0;i<2;i++){retried.push(question().id);assert.equal($('quiz-submit').disabled,true);answer(true);$('quiz-next').click();}
assert.deepEqual(retried.sort(),wrongIds.sort(),'Retry contains exactly the wrong questions');
assert.equal(d.querySelector('.quiz-score').dataset.correct,'2');assert.equal($('quiz-retry').disabled,true);
$('quiz-again').click();assert.equal($('quiz-progress').max,5,'Fresh round uses chosen configuration');
$('quiz-back').click();change('quiz-chapter','capacitors');change('quiz-kind','formula');change('quiz-count','15');
assert.match($('quiz-pool-count').textContent,/2 道题.*2 道/);
$('quiz-start').click();
for(let i=0;i<2;i++){assert.equal(question().chapter,'capacitors');assert.equal(question().kind,'formula');answer(true);$('quiz-next').click();}
assert.equal(d.querySelector('.quiz-score').dataset.total,'2');
assert.equal(d.querySelector('.quiz-score').dataset.correct,'2');
dom.window.close();
console.log('PASS: 66-question bank, balanced randomized draws, chapter/type scopes, shuffled answers, submission lock, scoring, formula links, retained rounds, full review and wrong-question retry (DOM simulation).');
