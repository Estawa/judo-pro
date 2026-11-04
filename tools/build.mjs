// Construit l'appli statique : node tools/build.mjs
// esbuild doit être disponible (npm i -D esbuild react react-dom dans tools/, ou installation globale)
import { createRequire } from 'module';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const acces = JSON.parse(readFileSync(path.join(root, 'config/acces.json'), 'utf8'));
const nodePaths = (process.env.NODE_PATH || '').split(':').filter(Boolean);
let esbuild;
try { esbuild = require('esbuild'); } catch (e) { esbuild = require(require.resolve('esbuild', { paths: nodePaths })); }
mkdirSync(path.join(root, 'assets'), { recursive: true });
await esbuild.build({
  entryPoints: [path.join(root, 'src/main.jsx')], bundle: true, minify: true, format: 'esm', target: ['es2020', 'safari15'],
  outfile: path.join(root, 'assets/app.js'), jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"', __ACCES__: JSON.stringify(acces) }, nodePaths, legalComments: 'none',
});
await esbuild.build({ entryPoints: [path.join(root, 'src/styles.css')], bundle: true, minify: true, outfile: path.join(root, 'assets/app.css') });
const v = readFileSync(path.join(root, 'src/version.js'), 'utf8').match(/VERSION = '([^']+)'/)[1];
const h = createHash('sha1').update(readFileSync(path.join(root, 'assets/app.js'))).update(readFileSync(path.join(root, 'assets/app.css'))).digest('hex').slice(0, 8);
const sw = readFileSync(path.join(root, 'tools/sw.template.js'), 'utf8').replace('__CACHE__', `judopro-${v}-${h}`);
writeFileSync(path.join(root, 'sw.js'), sw);
const html = readFileSync(path.join(root, 'index.html'), 'utf8').replace(/app\.(js|css)\?v=[\w.-]+/g, (m, ext) => `app.${ext}?v=${h}`);
writeFileSync(path.join(root, 'index.html'), html);
console.log('Build OK', v, h);
