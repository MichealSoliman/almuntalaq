const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function getHtmlPages(dir, base = '') {
  let pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', 'scratch', 'components', 'dist', 'src', 'assets'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const rel = (base ? base + '/' : '') + entry.name;
    if (entry.isDirectory()) {
      if (fs.existsSync(path.join(fullPath, 'index.html'))) {
        pages.push('/' + rel + '/');
      }
      pages = pages.concat(getHtmlPages(fullPath, rel));
    }
  }
  return pages;
}

const liveRoutes = ['/'].concat(getHtmlPages(root)).sort();
console.log('Live routes count:', liveRoutes.length);

const sitemapContent = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locMatches = [...sitemapContent.matchAll(/<loc>https:\/\/almontalaqmoving\.com([^<]*)<\/loc>/g)].map(m => m[1]);
console.log('Sitemap locs count:', locMatches.length);

const missingInSitemap = liveRoutes.filter(r => !locMatches.includes(r));
const extraInSitemap = locMatches.filter(r => !liveRoutes.includes(r));

console.log('Missing in sitemap:', missingInSitemap);
console.log('Extra in sitemap (not in filesystem):', extraInSitemap);
