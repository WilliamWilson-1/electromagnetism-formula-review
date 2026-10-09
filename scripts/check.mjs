import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import katex from 'katex';
const sandbox={window:{}};
for(const file of ['dist/data.js','dist/content.js','dist/summary.js'])vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});
const {formulas,chapters,guide,summary}=sandbox.window.REVIEW_DATA;
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
for(const c of chapters)if(!formulas.some(f=>f.chapter===c.id))throw new Error(`Empty chapter: ${c.id}`);
const html=fs.readFileSync('dist/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(match[1].startsWith('data:'))continue;if(!fs.existsSync(path.join('dist',match[1])))throw new Error(`Missing asset: ${match[1]}`);}
new vm.Script(fs.readFileSync('dist/app.js','utf8'),{filename:'app.js'});
console.log(`PASS: ${formulas.length} formulas, ${chapters.length} chapters, ${summary.targets.length} quantity groups, ${summary.pitfalls.length} comparisons; all math, summary references and local assets verified.`);
