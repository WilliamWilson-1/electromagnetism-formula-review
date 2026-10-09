import { mkdir, cp } from 'node:fs/promises';
await mkdir('dist/vendor/katex', { recursive: true });
for (const file of ['katex.min.js', 'katex.min.css', 'fonts']) {
  await cp(`node_modules/katex/dist/${file}`, `dist/vendor/katex/${file}`, { recursive: true });
}
await cp('node_modules/katex/LICENSE', 'dist/vendor/katex/LICENSE');
console.log('KaTeX script, stylesheet and fonts copied locally.');
