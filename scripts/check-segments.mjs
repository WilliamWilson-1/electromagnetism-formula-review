import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import * as css from 'css-tree';

const base=fs.readFileSync('dist/styles.css','utf8'),material=fs.readFileSync('dist/materials.css','utf8');
assert.ok(!base.includes('.mode-tabs button[aria-selected=true]:after'),'Legacy underline is removed');
const sheet=css.parse(material);
const noUnderline=[...sheet.children].find(rule=>rule.type==='Rule'&&css.generate(rule.prelude).includes('button[aria-selected="true"]::after'));
assert.ok(noUnderline);
assert.equal(css.generate(noUnderline.block).includes('display:none'),true);
assert.ok(material.includes('touch-action: pan-y pinch-zoom'),'Vertical touch scrolling remains native');

// Pointer events and layout metrics are simulated; these checks do not render browser pixels.
const dom=new JSDOM(fs.readFileSync('dist/index.html','utf8'),{url:'https://example.test/#all',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,d=w.document,$=id=>d.getElementById(id);
w.matchMedia=()=>({matches:false,addEventListener(){}});
w.HTMLElement.prototype.scrollIntoView=function(){};
w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
for(const file of ['data.js','content.js','summary.js','learning.js','quiz-data.js','quiz-engine.js','quiz-ui.js','materials.js','segments.js','app.js'])w.eval(fs.readFileSync('dist/'+file,'utf8'));
const tabs=d.querySelector('.mode-tabs'),pill=d.querySelector('.tab-highlight'),buttons=[...tabs.querySelectorAll('[role="tab"]')];
let layout={left:40,top:200,width:411,scale:1,widths:[112,96,104,80],positions:[5,120,219,326]},captured=null;
tabs.getBoundingClientRect=()=>({left:layout.left,top:layout.top,width:layout.width*layout.scale,height:54*layout.scale});
Object.defineProperty(tabs,'offsetWidth',{get:()=>layout.width});
buttons.forEach((button,index)=>Object.defineProperties(button,{offsetWidth:{get:()=>layout.widths[index]},offsetHeight:{get:()=>44},offsetLeft:{get:()=>layout.positions[index]},offsetTop:{get:()=>5}}));
tabs.setPointerCapture=id=>{captured=id;};tabs.hasPointerCapture=id=>captured===id;tabs.releasePointerCapture=()=>{captured=null;};
const settle=()=>new Promise(resolve=>w.setTimeout(resolve,30));
function pointer(target,type,x,y=220,{id=7,pointerType='mouse',button=0}={}){
  const event=new w.MouseEvent(type,{bubbles:true,cancelable:true,clientX:x,clientY:y,button,buttons:type==='pointerup'?0:1});
  Object.defineProperties(event,{pointerId:{value:id},pointerType:{value:pointerType},isPrimary:{value:true}});target.dispatchEvent(event);return event;
}
const center=index=>layout.left+(layout.positions[index]+layout.widths[index]/2)*layout.scale;
const active=()=>buttons.findIndex(button=>button.getAttribute('aria-selected')==='true');
function drag(from,to,options={}){pointer(buttons[from],'pointerdown',center(from),220,options);pointer(d,'pointermove',center(to),220,options);}
async function drop(to,options={}){pointer(d,'pointerup',center(to),220,options);await settle();assert.equal(active(),to);assert.equal(tabs.classList.contains('is-dragging'),false);assert.equal(captured,null);}
w.REVIEW_MATERIALS.updateTabs();await settle();
drag(0,2);await settle();assert.equal(tabs.classList.contains('is-dragging'),true);assert.equal(captured,7);
pointer(buttons[0],'lostpointercapture',center(0));assert.equal(tabs.classList.contains('is-dragging'),true,'Implicit touch capture can transfer from a button to its track');
assert.equal(active(),0,'Dragging previews without changing the current page before release');
assert.equal(buttons[2].classList.contains('is-preview'),true);
const moving=pill.style.transform;w.REVIEW_MATERIALS.updateTabs();await settle();assert.equal(pill.style.transform,moving,'Layout synchronization cannot pull the thumb back during drag');
await drop(2);assert.equal(w.location.hash,'#summary');assert.equal($('summary-view').hidden,false);
buttons[0].dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,detail:1}));assert.equal(active(),2,'Post-drag compatibility click is suppressed');
buttons[0].click();assert.equal(active(),0,'Keyboard/programmatic click remains available');
drag(0,3);pointer(d,'pointermove',2000);await settle();assert.match(pill.style.transform,/translate\(326px,5px\)/,'Thumb clamps at the right end');pointer(d,'pointerup',2000);await settle();assert.equal(active(),3);
drag(3,0);await drop(0);assert.equal(w.location.hash,'#all');
pointer(buttons[1],'pointerdown',center(1));pointer(d,'pointermove',center(1)+2);pointer(buttons[1],'pointerup',center(1)+2);buttons[1].dispatchEvent(new w.MouseEvent('click',{bubbles:true,detail:1}));assert.equal(active(),1,'Small motions are ordinary clicks');
drag(1,3);pointer(d,'pointercancel',center(3));await settle();assert.equal(active(),1);assert.equal(captured,null);assert.equal(tabs.classList.contains('is-dragging'),false);
pointer(buttons[1],'pointerdown',center(1),220,{pointerType:'touch'});pointer(d,'pointermove',center(1)+2,270,{pointerType:'touch'});pointer(d,'pointerup',center(1)+2,270,{pointerType:'touch'});assert.equal(active(),1);assert.equal(captured,null,'Vertical touch movement does not capture or switch');
drag(1,2);w.dispatchEvent(new w.Event('blur'));await settle();assert.equal(active(),1);assert.equal(captured,null);
drag(1,2);tabs.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await settle();assert.equal(active(),1);assert.equal(tabs.classList.contains('is-dragging'),false);
drag(1,2);captured=null;pointer(tabs,'lostpointercapture',center(2));await settle();assert.equal(active(),1);
buttons[1].dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));await settle();assert.equal(active(),3);assert.equal(d.activeElement,buttons[3]);
$('quiz-start').click();const questionId=d.querySelector('.quiz-question').dataset.questionId;
drag(3,0);await drop(0);drag(0,3);await drop(3);assert.equal(d.querySelector('.quiz-question').dataset.questionId,questionId,'Dragging between views preserves an ongoing quiz');
layout={left:16,top:200,width:320,scale:1.25,widths:[76,76,76,76],positions:[5,83,161,239]};w.dispatchEvent(new w.Event('resize'));await settle();
drag(3,1,{pointerType:'touch'});await drop(1,{pointerType:'touch'});assert.equal($('guide-view').hidden,false);
pointer(buttons[1],'pointerdown',center(1),220,{button:2});pointer(d,'pointermove',center(3),220,{button:2});pointer(d,'pointerup',center(3),220,{button:2});assert.equal(active(),1,'Secondary mouse button does not drag');
assert.equal(buttons.filter(button=>button.getAttribute('aria-selected')==='true').length,1);assert.equal(buttons.filter(button=>button.tabIndex===0).length,1);
dom.window.close();
console.log('PASS: no legacy underline; continuous mouse/touch thumb movement, snapping, end clamping, click/keyboard switching, cancel/blur handling, scaled mobile metrics, vertical scroll gestures and preserved quiz state (DOM simulation).');
