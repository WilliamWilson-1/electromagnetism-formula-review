import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import katex from 'katex';
const sandbox={window:{}};
for(const file of ['dist/data.js','dist/content.js'])vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});
const {formulas,chapters,guide}=sandbox.window.REVIEW_DATA;
const seen=new Set();
for(const f of formulas){
  if(seen.has(f.id))throw new Error(`Duplicate id: ${f.id}`);seen.add(f.id);
  if(!chapters.some(c=>c.id===f.chapter)||!f.condition||!f.hint||!f.variables.length||f.variables.some(v=>!v))throw new Error(`Incomplete formula: ${f.id}`);
  katex.renderToString(f.latex,{displayMode:true,throwOnError:true,strict:'ignore'});
  for(const [symbol] of f.variables)katex.renderToString(symbol,{throwOnError:true,strict:'ignore'});
}
for(const text of [...guide.templates.map(t=>t[1]),...guide.pitfalls])for(const match of text.matchAll(/\$([^$]+)\$/g))katex.renderToString(match[1],{throwOnError:true,strict:'ignore'});
for(const c of chapters)if(!formulas.some(f=>f.chapter===c.id))throw new Error(`Empty chapter: ${c.id}`);
const html=fs.readFileSync('dist/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(match[1].startsWith('data:'))continue;if(!fs.existsSync(path.join('dist',match[1])))throw new Error(`Missing asset: ${match[1]}`);}
new vm.Script(fs.readFileSync('dist/app.js','utf8'),{filename:'app.js'});
console.log(`PASS: ${formulas.length} formulas, ${chapters.length} chapters, all inline/display math and local assets verified.`);
