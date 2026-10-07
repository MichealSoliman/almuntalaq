const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const rootDir = path.resolve(__dirname, '..');

const newAreas = [
    { slug: 'hayu-alsanabel', title: 'حي السنابل' },
    { slug: 'hayu-alajawid', title: 'حي الأجاويد' },
    { slug: 'hayu-almuhammadiyah', title: 'حي المحمدية' },
    { slug: 'hayu-alkhalidiya', title: 'حي الخالدية' }
];

// 1. Update Sitemap
const sitemapPath = path.join(rootDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    let added = false;
    newAreas.forEach(area => {
        const urlStr = `<loc>https://almontalaqmoving.com/areas/${area.slug}/</loc>`;
        if (!sitemap.includes(urlStr)) {
            const entry = `
  <url>
    <loc>https://almontalaqmoving.com/areas/${area.slug}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.60</priority>
  </url>`;
            // Insert before closing tag
            sitemap = sitemap.replace('</urlset>', entry + '\n</urlset>');
            added = true;
        }
    });
    if (added) {
        fs.writeFileSync(sitemapPath, sitemap);
        console.log("Updated sitemap.xml");
    }
}

// 2. Update areas/index.html (Areas Hub)
const areasHubPath = path.join(rootDir, 'areas', 'index.html');
if (fs.existsSync(areasHubPath)) {
    let html = fs.readFileSync(areasHubPath, 'utf8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Find the grid container that holds the area cards
    // It's usually a div inside a section
    const grids = Array.from(doc.querySelectorAll('.grid'));
    // Usually the one with grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    const areaGrid = grids.find(g => g.innerHTML.includes('href="/areas/hayu-albasateen/"') || g.innerHTML.includes('href="/areas/hayu-alrabwa/"'));
    
    if (areaGrid) {
        newAreas.forEach(area => {
            const areaUrl = `/areas/${area.slug}/`;
            if (!areaGrid.innerHTML.includes(areaUrl)) {
                const card = `
                <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition duration-300 flex flex-col h-full fade-up">
                    <div class="p-6 flex-grow flex flex-col justify-between">
                        <div>
                            <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition transform">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-2">نقل عفش ${area.title}</h3>
                            <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                                أحدث خدمات تغليف ونقل العفش السكني والتجاري في ${area.title} مع توفير أوناش رفع وسيارات مجهزة لضمان السلامة التامة لممتلكاتك.
                            </p>
                        </div>
                        <a href="${areaUrl}" class="inline-flex items-center text-blue-600 font-bold hover:text-orange-500 transition mt-auto group-hover:translate-x-[-5px]">
                            التفاصيل <i class="fas fa-arrow-left ml-2 text-sm"></i>
                        </a>
                    </div>
                </div>`;
                areaGrid.insertAdjacentHTML('beforeend', card);
            }
        });
        fs.writeFileSync(areasHubPath, dom.serialize());
        console.log("Updated areas/index.html");
    }
}
