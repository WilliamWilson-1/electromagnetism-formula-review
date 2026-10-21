import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import * as css from 'css-tree';
const sandbox={window:{}};
for(const file of ['data','content','summary','learning','quiz-data','course-update','course-quiz','quantity-details','model-diagrams'])vm.runInNewContext(fs.readFileSync(`dist/${file}.js`,'utf8'),sandbox);
const d=sandbox.window.REVIEW_DATA,library=sandbox.window.REVIEW_DIAGRAMS;
let quantityCount=0,diagramCount=0;
for(const f of d.formulas){
  assert.equal(f.variableDetails.length,f.variables.length);
  assert.equal(new Set(f.variableDetails.map(v=>v.key)).size,f.variableDetails.length,'No duplicate quantity in '+f.id);
  for(const v of f.variableDetails){
    for(const key of ['symbol','name','unit','meaning','convention','reading'])assert.ok(v[key],f.id+'/'+v.key+'/'+key);
    quantityCount++;
  }
  const diagram=library.get(f.id);
  if(['典型模型','受力运动'].includes(f.type))assert.ok(diagram,'Model schematic missing: '+f.id);
  if(!diagram)continue;
  diagramCount++;
  const exported=fs.readFileSync(`dist/diagrams/${f.id}.svg`,'utf8');
  const dom=new JSDOM(exported,{contentType:'image/svg+xml'}),doc=dom.window.document;
  assert.equal(doc.documentElement.getAttribute('viewBox'),'0 0 480 320');
  assert.ok(doc.querySelector('title')?.textContent);
  assert.ok(doc.querySelector('desc')?.textContent.includes(diagram.caption));
  assert.equal(doc.querySelectorAll('script,foreignObject').length,0,'Static self-contained SVG');
  const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size);
  for(const [,id]of exported.matchAll(/url\(#([^)]+)\)/g))assert.ok(doc.getElementById(id),'Unresolved SVG marker');
  assert.ok(!exported.includes('var(--'),'Download files do not depend on site styles');
  dom.window.close();
}
const get=(id,key)=>d.formulas.find(f=>f.id===id).variableDetails.find(v=>v.key===key);
assert.equal(get('hall-voltage','thickness').unit,'m');
assert.equal(get('rotating-loop','time').unit,'s');
assert.equal(get('cylindrical-capacitor','Llen').unit,'m');
assert.equal(get('self-inductance','Lind').unit,'H（亨利）');
assert.notEqual(get('magnetic-h','Mmag').unit,get('mutual-definition','Mmut').unit);
assert.notEqual(get('coax-media','cRadius').unit,get('radiation-fields','cLight').unit);
assert.notEqual(get('helix-pitch','hpitch').meaning,get('toroid-inductance','hToroid').meaning);
assert.equal(library.get('coax-inductance').family,'coaxThin');
assert.equal(library.get('magnetic-gauss').family,'magneticClosed');
assert.equal(library.get('loop-center').family,'loopCenter');
css.parse(fs.readFileSync('dist/explanations.css','utf8'),{onParseError(e){throw Error(e.formattedMessage);}});
console.log(`PASS: ${quantityCount} contextual quantities across ${d.formulas.length} formulas, ${diagramCount} accessible SVG diagrams, all model cards covered, distinct reused symbols and explanation CSS.`);
