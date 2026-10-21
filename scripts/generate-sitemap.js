const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const TODAY = '2026-10-21';
const DOMAIN = 'https://almontalaqmoving.com';

// صفحات الموقع مع تحديد الأولويات وتكرار التحديث المناسب لكل نوع صفحة
const sitemapStructure = [
  // 1. الصفحة الرئيسية والصفحات المحورية
  { path: '/', priority: '1.00', changefreq: 'daily' },
  { path: '/services/', priority: '0.90', changefreq: 'weekly' },
  { path: '/areas/', priority: '0.85', changefreq: 'weekly' },
  { path: '/blogs/', priority: '0.80', changefreq: 'weekly' },
  { path: '/about/', priority: '0.80', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.80', changefreq: 'monthly' },

  // 2. الخدمات الأساسية التجارية ذات الأولوية القصوى (Core Commercial Services)
  { path: '/furniture-moving-companies-in-jeddah/', priority: '0.90', changefreq: 'weekly' },
  { path: '/furniture-moving-with-packing/', priority: '0.90', changefreq: 'weekly' },
  { path: '/furniture-packaging-in-jeddah/', priority: '0.90', changefreq: 'weekly' },
  { path: '/furniture-dismantling-and-assembly-in-jeddah/', priority: '0.90', changefreq: 'weekly' },
  { path: '/moving-trucks-in-jeddah/', priority: '0.90', changefreq: 'weekly' },
  { path: '/bridal-trousseau-moving-jeddah/', priority: '0.90', changefreq: 'weekly' },
  { path: '/cheapest-furniture-moving-jeddah/', priority: '0.90', changefreq: 'weekly' },
  { path: '/furniture-moving-workers-in-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/hydraulic-winch-moving-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/furniture-storage-in-jeddah/', priority: '0.85', changefreq: 'weekly' },

  // 3. الخدمات المتخصصة والسكنية والتجارية (Specialized & Property Moving)
  { path: '/ac-relocation-in-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/bedroom-moving-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/moving-villa-furniture-in-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/moving-office-furniture-in-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/moving-electrical-appliances-in-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/kitchen-moving-in-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/hotel-furniture-moving-in-jeddah/', priority: '0.85', changefreq: 'weekly' },
  { path: '/residential-furniture-moving-in-jeddah/', priority: '0.85', changefreq: 'weekly' },

  // 4. خطوط النقل بين المدن (Intercity Moving Routes)
  { path: '/areas/jeddah-to-riyadh/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-makkah/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-madinah/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-taif/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-dammam/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-yanbu/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-jizan/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-tabuk/', priority: '0.80', changefreq: 'weekly' },
  { path: '/areas/jeddah-to-qassim/', priority: '0.80', changefreq: 'weekly' },

  // 5. مقالات المدونة (Blog Posts - Informational & Supporting Content)
  { path: '/blogs/furniture-moving-mistakes-in-jeddah/', priority: '0.70', changefreq: 'monthly' },
  { path: '/blogs/furniture-moving-prices-in-jeddah/', priority: '0.70', changefreq: 'monthly' },
  { path: '/blogs/how-to-choose-furniture-moving-company/', priority: '0.70', changefreq: 'monthly' },
  { path: '/blogs/how-to-pack-furniture/', priority: '0.70', changefreq: 'monthly' },
  { path: '/blogs/villa-furniture-moving-prices-jeddah/', priority: '0.70', changefreq: 'monthly' },

  // 6. صفحات أحياء ومناطق جدة (Jeddah Local Districts)
  { path: '/areas/hayu-alrawda/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alsafa/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-almarwa/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alzahra/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alsalama/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alshati/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alsamer/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alhamdania/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-albasateen/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alaziziya/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alrabwa/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alwaha/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alnasim/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alnuzha/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-albawadi/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alfaysalia/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-almuhammadiyah/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alkhalidiya/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alajawid/', priority: '0.65', changefreq: 'monthly' },
  { path: '/areas/hayu-alsanabel/', priority: '0.65', changefreq: 'monthly' }
];

console.log(`Configured ${sitemapStructure.length} pages in sitemap.`);

// التحقق من أن كل صفحة لها ملف index.html حقيقي في المشروع
for (const item of sitemapStructure) {
  let localFile;
  if (item.path === '/') {
    localFile = path.join(root, 'index.html');
  } else {
    const cleanPath = item.path.replace(/^\//, '').replace(/\/$/, '');
    localFile = path.join(root, cleanPath, 'index.html');
  }
  if (!fs.existsSync(localFile)) {
    console.error(`ERROR: File does not exist for path: ${item.path} -> ${localFile}`);
    process.exit(1);
  }
}

// بناء محتوى XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const item of sitemapStructure) {
  xml += `  <url>
    <loc>${DOMAIN}${item.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>
`;
}

xml += `</urlset>
`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
console.log(`✅ sitemap.xml updated successfully with ${sitemapStructure.length} URLs (lastmod: ${TODAY})!`);
