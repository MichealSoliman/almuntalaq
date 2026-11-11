const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const DOMAIN = 'https://almontalaqmoving.com';

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const relFromRoot = path.relative(root, fullPath).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.vscode', 'dist', 'scratch', 'scripts'].includes(file)) {
        results = results.concat(getAllHtmlFiles(fullPath));
      }
    } else if (file === 'index.html' || (dir === root && file.endsWith('.html'))) {
      results.push({ fullPath, relPath: relFromRoot });
    }
  }
  return results;
}

// 1. مسح جميع صفحات HTML في المشروع
const allFiles = getAllHtmlFiles(root);
console.log(`Found ${allFiles.length} candidate HTML files.`);

const validPages = [];
const skippedPages = [];

for (const { fullPath, relPath } of allFiles) {
  let pageUrlPath = '';
  if (relPath === 'index.html') {
    pageUrlPath = '/';
  } else if (relPath.endsWith('/index.html')) {
    pageUrlPath = '/' + relPath.replace(/\/index\.html$/, '') + '/';
  } else {
    pageUrlPath = '/' + relPath;
  }

  const expectedCanonical = `${DOMAIN}${pageUrlPath}`;
  const content = fs.readFileSync(fullPath, 'utf8');

  // robots meta
  const robotsMatch = content.match(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i) ||
                      content.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']robots["']/i);
  const robotsContent = robotsMatch ? robotsMatch[1].toLowerCase() : '';

  if (robotsContent.includes('noindex')) {
    skippedPages.push({ relPath, reason: `noindex found (${robotsContent})` });
    continue;
  }

  // Canonical
  const canonicalMatch = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                         content.match(/<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonicalHref = canonicalMatch ? canonicalMatch[1] : '';

  if (!canonicalHref) {
    skippedPages.push({ relPath, reason: 'missing canonical' });
    continue;
  }

  if (canonicalHref !== expectedCanonical) {
    skippedPages.push({ relPath, reason: `canonical mismatch (expected: ${expectedCanonical}, got: ${canonicalHref})` });
    continue;
  }

  // استخراج تاريخ آخر commit من Git مع استبعاد [no-lastmod]
  let lastmod = '';
  try {
    const gitCmd = `git log -1 --format=%cI --invert-grep --grep="\\[no-lastmod\\]" -- "${fullPath}"`;
    const gitDate = execSync(gitCmd, { cwd: root, encoding: 'utf8' }).trim();
    if (gitDate) {
      lastmod = gitDate.split('T')[0];
    }
  } catch (e) {
    console.warn(`Warning: Could not get git date for ${relPath}: ${e.message}`);
  }

  if (!lastmod) {
    const stat = fs.statSync(fullPath);
    lastmod = stat.mtime.toISOString().split('T')[0];
  }

  validPages.push({
    url: expectedCanonical,
    relPath,
    lastmod
  });
}

console.log(`Skipped ${skippedPages.length} non-indexable files.`);
console.log(`Included ${validPages.length} indexable pages in sitemap.`);

// فحص أمان صارم: التأكد من عدم وجود روابط مكررة أو تتبع redirects
const seenUrls = new Set();
for (const page of validPages) {
  if (seenUrls.has(page.url)) {
    console.error(`FATAL: Duplicate URL in sitemap: ${page.url}`);
    process.exit(1);
  }
  seenUrls.add(page.url);

  if (page.url.includes('/hayu-alrabwa/')) {
    console.error(`FATAL: Redirected slug found in sitemap: ${page.url}`);
    process.exit(1);
  }
}

// بناء XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

validPages.sort((a, b) => {
  if (a.url === `${DOMAIN}/`) return -1;
  if (b.url === `${DOMAIN}/`) return 1;
  return a.url.localeCompare(b.url);
});

for (const page of validPages) {
  xml += `  <url>\n`;
  xml += `    <loc>${page.url}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const sitemapPath = path.join(root, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`✅ sitemap.xml generated successfully with ${validPages.length} URLs!`);
