import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import katex from 'katex';
const sandbox={window:{}};
for(const file of ['dist/data.js','dist/content.js','dist/summary.js','dist/learning.js','dist/quiz-data.js'])vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});
const {formulas,chapters,guide,summary,groups,learning,quiz}=sandbox.window.REVIEW_DATA;
const seen=new Set();
for(const f of formulas){
  if(seen.has(f.id))throw new Error(`Duplicate id: ${f.id}`);seen.add(f.id);
  if(!chapters.some(c=>c.id===f.chapter)||!f.condition||!f.hint||!f.variables.length||f.variables.some(v=>!v))throw new Error(`Incomplete formula: ${f.id}`);
  katex.renderToString(f.latex,{displayMode:true,throwOnError:true,strict:'ignore'});
  for(const [symbol] of f.variables)katex.renderToString(symbol,{throwOnError:true,strict:'ignore'});
}
for(const text of [...guide.templates.map(t=>t[1]),...guide.pitfalls])for(const match of text.matchAll(/\$([^$]+)\$/g))katex.renderToString(match[1],{throwOnError:true,strict:'ignore'});
const covered=new Set();
function verifySummary(value){
  if(typeof value==='string')for(const match of value.matchAll(/\$([^$]+)\$/g))katex.renderToString(match[1],{throwOnError:true,strict:'ignore'});
  else if(Array.isArray(value))value.forEach(verifySummary);
  else if(value&&typeof value==='object')for(const [key,child] of Object.entries(value)){
    if(key==='refs')for(const id of child){if(!seen.has(id))throw new Error(`Unknown summary formula: ${id}`);covered.add(id);}
    else if(key==='symbol')katex.renderToString(child,{throwOnError:true,strict:'ignore'});
    else verifySummary(child);
  }
}
verifySummary(summary);
for(const id of seen)if(!covered.has(id))throw new Error(`Formula missing from summary: ${id}`);
const grouped=new Set(),groupIds=new Set();
for(const group of groups){
  if(groupIds.has(group.id)||!group.title||!group.description||!group.ids.length)throw new Error(`Invalid group: ${group.id}`);
  groupIds.add(group.id);
  for(const id of group.ids){if(grouped.has(id)||!seen.has(id)||formulas.find(f=>f.id===id).chapter!==group.chapter)throw new Error(`Invalid group membership: ${id}`);grouped.add(id);}
}
for(const id of seen){
  if(!grouped.has(id))throw new Error(`Ungrouped formula: ${id}`);
  const lesson=learning[id];
  if(!lesson||!lesson.kind||lesson.steps.length<2||!lesson.solves.length||!lesson.related.length)throw new Error(`Incomplete learning detail: ${id}`);
  for(const [text,latex] of lesson.steps){if(!text)throw new Error(`Empty step: ${id}`);if(latex)katex.renderToString(latex,{displayMode:true,throwOnError:true,strict:'ignore'});}
  for(const [quantity,latex,note] of lesson.solves){if(!quantity||!latex||!note)throw new Error(`Incomplete solve: ${id}`);katex.renderToString(latex,{displayMode:true,throwOnError:true,strict:'ignore'});}
  for(const related of lesson.related)if(!seen.has(related)||related===id)throw new Error(`Invalid related formula: ${id} → ${related}`);
}
for(const id of Object.keys(learning))if(!seen.has(id))throw new Error(`Unknown learning formula: ${id}`);
for(const c of chapters)if(!formulas.some(f=>f.chapter===c.id))throw new Error(`Empty chapter: ${c.id}`);
const html=fs.readFileSync('dist/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(match[1].startsWith('data:'))continue;if(!fs.existsSync(path.join('dist',match[1].split('?')[0])))throw new Error(`Missing asset: ${match[1]}`);}
const questionIds=new Set();
for(const q of quiz.questions){
  if(questionIds.has(q.id)||!q.id||!chapters.some(c=>c.id===q.chapter)||!Object.hasOwn(quiz.kinds,q.kind)||!q.prompt||!q.explanation||!q.refs.length)throw new Error(`Invalid quiz question: ${q.id}`);
  questionIds.add(q.id);
  if(q.options.length!==4||new Set(q.options).size!==4||q.options.some(o=>!o)||!Number.isInteger(q.answer)||q.answer<0||q.answer>=4)throw new Error(`Invalid quiz options: ${q.id}`);
  for(const text of [q.prompt,q.explanation,...q.options])for(const match of text.matchAll(/\$([^$]+)\$/g))katex.renderToString(match[1],{throwOnError:true,strict:'ignore'});
  for(const id of q.refs)if(!seen.has(id))throw new Error(`Unknown quiz formula: ${q.id} → ${id}`);
}
for(const chapter of chapters)for(const kind of Object.keys(quiz.kinds))if(!quiz.questions.some(q=>q.chapter===chapter.id&&q.kind===kind))throw new Error(`Quiz coverage missing: ${chapter.id}/${kind}`);
for(const file of ['app.js','quiz-engine.js','quiz-ui.js','materials.js','segments.js'])new vm.Script(fs.readFileSync('dist/'+file,'utf8'),{filename:file});
console.log(`PASS: ${formulas.length} formulas, ${groups.length} groups, ${chapters.length} chapters, ${quiz.questions.length} quiz questions; math, references, coverage and local assets verified.`);
