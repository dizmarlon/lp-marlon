// Generates production vendor scripts from the original local sources.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const root = path.resolve(__dirname, '..');

let terser;
try { terser = require('terser'); }
catch (_) {
  try { terser = require(path.join(root, '.work/lighthouse-tools/node_modules/terser')); }
  catch (_) {
    throw new Error('Terser is required. Install it locally, or run: npm install --prefix .work/lighthouse-tools --no-audit --no-fund --save-dev terser');
  }
}

const sources = [
  'gsap-scrolltrigger-3.15.0.js',
  'lenis-1.3.26.js',
  'paper-liquid-metal-0.0.82.js'
];

(async () => {
  for (const name of sources) {
    const sourcePath = path.join(root, 'assets/js/vendor', name);
    const source = fs.readFileSync(sourcePath, 'utf8');
    const header = source.match(/^(?:\s*\/\/[^\r\n]*(?:\r?\n|$)|\s*\/\*[\s\S]*?\*\/)+/)?.[0] || '';
    const result = await terser.minify(source.slice(header.length), {
      ecma: 2022,
      compress: { passes: 2, unsafe: false },
      mangle: { toplevel: false },
      format: {
        preamble: header.trim(),
        comments: /@license|@preserve|copyright|license|licen[çc]a|^!/i
      }
    });
    if (!result.code) throw new Error(`Minification produced no code for ${name}.`);
    const output = result.code.trimEnd() + '\n';
    const outputName = name.replace(/\.js$/, '.min.js');
    fs.writeFileSync(path.join(root, 'assets/js/vendor', outputName), output);
    console.log(`${outputName}: ${Buffer.byteLength(source)} → ${Buffer.byteLength(output)} bytes; gzip ${zlib.gzipSync(source).length} → ${zlib.gzipSync(output).length} bytes.`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
