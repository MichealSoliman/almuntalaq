const fs = require('fs');
const path = require('path');


const rootDir = 'c:\\Users\\HP\\Desktop\\my-work\\day-2\\almuntalaq\\areas';
const dirs = fs.readdirSync(rootDir).filter(d => fs.statSync(path.join(rootDir, d)).isDirectory());

const results = [];

for (const dir of dirs) {
  const indexPath = path.join(rootDir, dir, 'index.html');
  if (!fs.existsSync(indexPath)) continue;

  const html = fs.readFileSync(indexPath, 'utf-8');
  
  // Use regex as fallback if cheerio fails, but we'll try to parse it.
  const titleMatch = html.match(/<title>(.*?)<\/title>/is);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/is) || html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/is);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/is);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/is);
  const robots = robotsMatch ? robotsMatch[1].trim() : '';

  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
  let h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  const h2Matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/isg)];
  const h2s = h2Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // primary keyword from H1 roughly
  const primaryKeyword = h1;

  // text extraction for word count
  const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/is);
  let wordCount = 0;
  if (bodyMatch) {
    const textOnly = bodyMatch[1].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                                 .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                                 .replace(/<[^>]+>/g, ' ')
                                 .replace(/\s+/g, ' ').trim();
    wordCount = textOnly.split(' ').length;
  }

  // extract internal links
  const links = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)];
  const internalLinks = [];
  const serviceLinks = [];
  links.forEach(m => {
    let href = m[1];
    let text = m[2].replace(/<[^>]+>/g, '').trim();
    if (href.startsWith('/') || href.startsWith('https://almontalaqmoving.com')) {
      internalLinks.push({href, text});
      if (['/furniture-moving-in-jeddah/', '/furniture-dismantling-and-assembly-in-jeddah/', '/furniture-packaging-in-jeddah/', '/furniture-storage-in-jeddah/', '/moving-trucks-in-jeddah/'].includes(href.replace('https://almontalaqmoving.com', ''))) {
         serviceLinks.push({href, text});
      }
    }
  });

  // Schema check
  const schemas = [...html.matchAll(/<script type=["']application\/ld\+json["']>(.*?)<\/script>/gis)];
  let hasWebPage = false, hasService = false, hasFAQ = false, hasBreadcrumb = false, hasMovingCo = false;
  let schemaErrors = [];
  let webpageId = null;
  schemas.forEach(m => {
    try {
      const data = JSON.parse(m[1]);
      const type = data['@type'];
      if (type === 'WebPage' || (Array.isArray(type) && type.includes('WebPage'))) { hasWebPage = true; webpageId = data['@id']; }
      if (type === 'Service' || (Array.isArray(type) && type.includes('Service'))) hasService = true;
      if (type === 'FAQPage' || (Array.isArray(type) && type.includes('FAQPage'))) hasFAQ = true;
      if (type === 'BreadcrumbList' || (Array.isArray(type) && type.includes('BreadcrumbList'))) hasBreadcrumb = true;
      if (type === 'MovingCompany' || (Array.isArray(type) && type.includes('MovingCompany'))) hasMovingCo = true;
    } catch (e) {
      schemaErrors.push("Invalid JSON");
    }
  });

  results.push({
    dir,
    title,
    metaDesc,
    h1,
    h2s,
    canonical,
    robots,
    wordCount,
    internalLinksCount: internalLinks.length,
    serviceLinks,
    schemas: { hasWebPage, hasService, hasFAQ, hasBreadcrumb, hasMovingCo, webpageId },
    schemaErrors
  });
}

fs.writeFileSync('c:\\Users\\HP\\Desktop\\my-work\\day-2\\almuntalaq\\scratch\\seo_results.json', JSON.stringify(results, null, 2));
console.log("Extraction complete.");
