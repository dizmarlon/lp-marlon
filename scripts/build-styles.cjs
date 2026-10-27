// Rebuild the combined stylesheet and the first-screen CSS after editing a source stylesheet.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const sources = [
  'assets/css/styles-BBPBVkOb-i8bfrl.css', 'assets/css/local-fixes.css',
  'assets/css/site-layout.css', 'assets/css/copy-layout.css', 'servicos.css',
  'assets/css/liquid-buttons.css', 'assets/css/process-bento.css', 'assets/css/why-section.css',
  'assets/css/phone-transition.css', 'assets/css/smooth-scroll.css',
  'assets/css/brand-statement.css', 'assets/css/scroll-navigation.css'
];
const bundle = sources.map(file => `\n/* Source: ${file} */\n${fs.readFileSync(path.join(root, file), 'utf8')}\n`).join('');
const hash = crypto.createHash('sha256').update(bundle).digest('hex').slice(0, 12);
fs.writeFileSync(path.join(root, 'assets/css/site-bundle.css'), bundle);
const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8').replace(/site-bundle\.css\?v=[a-z0-9]+/g, `site-bundle.css?v=${hash}`);
fs.writeFileSync(indexPath, html);

let playwright;
try { playwright = require('playwright'); }
catch (_) {
  const bundled = path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  try { playwright = require(bundled); }
  catch (_) { throw new Error('Install Playwright or make the Codex workspace dependencies available before rebuilding styles.'); }
}
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const name = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
  const file = path.resolve(root, name);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  const type = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.woff2': 'font/woff2', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.webm': 'video/webm', '.json': 'application/json' }[path.extname(file)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const chrome = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined);
  const browser = await playwright.chromium.launch({ headless: true, ...(chrome ? { executablePath: chrome } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'load' });
    await page.waitForFunction(() => [...document.querySelectorAll('link[data-deferred-style]')].every(link => link.dataset.styleReady));
    await page.waitForFunction(() => !document.querySelector('.preloader'));
    const critical = (await page.evaluate(() => {
      const dummy = document.createElement('div');
      dummy.className = 'preloader';
      dummy.innerHTML = '<div class="preloader-center"><span class="preloader-name">MARLON</span></div><span class="preloader-count">0%</span><div class="preloader-track"><span class="preloader-bar"></span></div>';
      document.body.append(dummy);
      const nodes = [document.documentElement, document.body, ...document.querySelectorAll('.creative-hero,.creative-hero *,.creative-nav,.creative-nav *,.creative-mobile-menu,.creative-mobile-menu *,.preloader,.preloader *,.mobile-whatsapp,.mobile-whatsapp *,.value-section,.value-section *')];
      const pseudo = /(::?(?:before|after|first-letter|first-line|marker|selection)|:(?:hover|focus-visible|focus-within|focus|active|visited))\b/g;
      function matches(selector) {
        try { if (nodes.some(element => element.matches(selector))) return true; } catch (_) {}
        try { return nodes.some(element => element.matches(selector.replace(pseudo, ''))); } catch (_) { return false; }
      }
      function extract(rules) {
        let result = '';
        for (const rule of rules) {
          if (rule instanceof CSSStyleRule) { if (matches(rule.selectorText)) result += rule.cssText + '\n'; }
          else if (rule instanceof CSSFontFaceRule || rule instanceof CSSKeyframesRule || rule.type === 0 && rule.cssText.startsWith('@property')) result += rule.cssText + '\n';
          else if (rule.cssRules) {
            const inner = extract(rule.cssRules);
            if (inner) result += rule.cssText.slice(0, rule.cssText.indexOf('{') + 1) + '\n' + inner + '}\n';
          }
        }
        return result;
      }
      const sheet = [...document.styleSheets].find(item => item.href?.includes('/assets/css/site-bundle.css'));
      if (!sheet) throw new Error('Combined stylesheet is unavailable.');
      const result = extract(sheet.cssRules).replace(/url\((['"]?)\.\.\/(fonts|images)\//g, 'url($1./assets/$2/');
      dummy.remove();
      return result;
    })).replace(/[\t ]+$/gm, '');
    html = fs.readFileSync(indexPath, 'utf8');
    if (!html.includes('<style id="critical-first-screen">')) throw new Error('Critical style marker not found.');
    html = html.replace(/<style id="critical-first-screen">[\s\S]*?<\/style>/, `<style id="critical-first-screen">\n${critical}\n</style>`);
    fs.writeFileSync(indexPath, html);
    console.log(`Styles rebuilt: ${sources.length} files, bundle ${hash}, critical CSS ${Buffer.byteLength(critical)} bytes.`);
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
