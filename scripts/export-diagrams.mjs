import fs from 'node:fs';
import vm from 'node:vm';
const sandbox={window:{}};
for(const file of ['data','content','summary','learning','quiz-data','course-update','course-quiz','quantity-details','model-diagrams'])vm.runInNewContext(fs.readFileSync(`dist/${file}.js`,'utf8'),sandbox);
fs.mkdirSync('dist/diagrams',{recursive:true});
let count=0;
for(const f of sandbox.window.REVIEW_DATA.formulas){
  const diagram=sandbox.window.REVIEW_DIAGRAMS.get(f.id);if(!diagram)continue;
  // Downloadable files are self-contained, with an explicit readable light background.
  const svg=diagram.svg.replace(/var\(--[\w-]+,([^()]+)\)/g,'$1').replace('stroke="context-stroke"','stroke="#176444"').replace('</defs>','</defs><rect width="480" height="320" fill="#f0f6f2"/>');
  fs.writeFileSync(`dist/diagrams/${f.id}.svg`,svg);count++;
}
console.log(`Exported ${count} self-contained model diagrams.`);
