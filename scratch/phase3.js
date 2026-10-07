const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const rootDir = path.resolve(__dirname, '..');
const areasDir = path.join(rootDir, 'areas');

const areasMap = {
    'hayu-albasateen': { newSlug: 'hayu-albasateen', decision: 'KEEP', title: 'البساتين' },
    'hayu-albawadi': { newSlug: 'hayu-albawadi', decision: 'KEEP', title: 'البوادي' },
    'hayu-aleazizia': { newSlug: 'hayu-alaziziya', decision: 'CHANGE', title: 'العزيزية' },
    'hayu-alfaysalia': { newSlug: 'hayu-alfaysalia', decision: 'KEEP', title: 'الفيصلية' },
    'hayu-alhamdania': { newSlug: 'hayu-alhamdania', decision: 'KEEP', title: 'الحمدانية' },
    'hayu-almarwa': { newSlug: 'hayu-almarwa', decision: 'KEEP', title: 'المروة' },
    'hayu-alnasim': { newSlug: 'hayu-alnasim', decision: 'KEEP', title: 'النسيم' },
    'hayu-alnuzha': { newSlug: 'hayu-alnuzha', decision: 'KEEP', title: 'النزهة' },
    'hayu-alrawda': { newSlug: 'hayu-alrawda', decision: 'KEEP', title: 'الروضة' },
    'hayu-alrubwa': { newSlug: 'hayu-alrabwa', decision: 'CHANGE', title: 'الربوة' },
    'hayu-alsafa': { newSlug: 'hayu-alsafa', decision: 'KEEP', title: 'الصفا' },
    'hayu-alsalama': { newSlug: 'hayu-alsalama', decision: 'KEEP', title: 'السلامة' },
    'hayu-alsamer': { newSlug: 'hayu-alsamer', decision: 'KEEP', title: 'السامر' },
    'hayu-alshaati': { newSlug: 'hayu-alshati', decision: 'CHANGE', title: 'الشاطئ' },
    'hayu-alwaha': { newSlug: 'hayu-alwaha', decision: 'KEEP', title: 'الواحة' },
    'hayu-alzahra': { newSlug: 'hayu-alzahra', decision: 'KEEP', title: 'الزهراء' }
};

const geoClusters = {
    'hayu-albasateen': ['hayu-alshati', 'hayu-alnuzha', 'hayu-alzahra'],
    'hayu-albawadi': ['hayu-alsalama', 'hayu-alnuzha', 'hayu-alrabwa'],
    'hayu-alaziziya': ['hayu-alnasim', 'hayu-alsafa'],
    'hayu-alfaysalia': ['hayu-alrawda', 'hayu-alrabwa'],
    'hayu-alhamdania': ['hayu-alsamer'],
    'hayu-almarwa': ['hayu-alsafa', 'hayu-alsamer', 'hayu-alnuzha'],
    'hayu-alnasim': ['hayu-alaziziya'],
    'hayu-alnuzha': ['hayu-albawadi', 'hayu-almarwa'],
    'hayu-alrawda': ['hayu-alfaysalia', 'hayu-alzahra', 'hayu-alsalama'],
    'hayu-alrabwa': ['hayu-alsafa', 'hayu-alfaysalia', 'hayu-albawadi'],
    'hayu-alsafa': ['hayu-almarwa', 'hayu-alrabwa', 'hayu-alaziziya'],
    'hayu-alsalama': ['hayu-alzahra', 'hayu-albawadi', 'hayu-alrawda'],
    'hayu-alsamer': ['hayu-alhamdania', 'hayu-almarwa', 'hayu-alwaha'],
    'hayu-alshati': ['hayu-alzahra', 'hayu-albasateen'],
    'hayu-alwaha': ['hayu-alsamer', 'hayu-alnasim'],
    'hayu-alzahra': ['hayu-alsalama', 'hayu-alshati', 'hayu-alrawda']
};

const changedSlugs = Object.entries(areasMap).filter(([old, data]) => data.decision === 'CHANGE');
const oldToNew = changedSlugs.map(([old, data]) => ({ old, new: data.newSlug }));

// 1. Rename Folders
changedSlugs.forEach(([oldSlug, data]) => {
    const oldPath = path.join(areasDir, oldSlug);
    const newPath = path.join(areasDir, data.newSlug);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
    }
});

// Helper: Get all HTML files
function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === 'scratch' || file === '.git') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allHtmlFiles = getAllHtmlFiles(rootDir);

// 2. Global Internal Links & Canonical & OG Update
allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    oldToNew.forEach(({ old, new: newSlug }) => {
        const oldUrl = `/areas/${old}/`;
        const newUrl = `/areas/${newSlug}/`;
        if (content.includes(oldUrl)) {
            content = content.replace(new RegExp(oldUrl, 'g'), newUrl);
            modified = true;
        }
        
        const oldFullUrl = `https://almontalaqmoving.com/areas/${old}/`;
        const newFullUrl = `https://almontalaqmoving.com/areas/${newSlug}/`;
        if (content.includes(oldFullUrl)) {
            content = content.replace(new RegExp(oldFullUrl, 'g'), newFullUrl);
            modified = true;
        }

        const oldUrlNoSlash = `/areas/${old}`;
        const newUrlNoSlash = `/areas/${newSlug}`;
        if (content.includes(`"${oldUrlNoSlash}"`)) {
            content = content.replace(new RegExp(`"${oldUrlNoSlash}"`, 'g'), `"${newUrlNoSlash}"`);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(file, content);
    }
});

// 3. Update HTACCESS
const htaccessPath = path.join(rootDir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
    let htaccess = fs.readFileSync(htaccessPath, 'utf8');
    let redirects = `\n# Phase 3: Area Slugs Redirects\n`;
    oldToNew.forEach(({ old, new: newSlug }) => {
        redirects += `Redirect 301 /areas/${old}/ https://almontalaqmoving.com/areas/${newSlug}/\n`;
    });
    if (!htaccess.includes('# Phase 3: Area Slugs Redirects')) {
        fs.writeFileSync(htaccessPath, htaccess + redirects);
    }
}

// 4. Update Sitemap
const sitemapPath = path.join(rootDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    oldToNew.forEach(({ old, new: newSlug }) => {
        sitemap = sitemap.replace(
            `<loc>https://almontalaqmoving.com/areas/${old}/</loc>`,
            `<loc>https://almontalaqmoving.com/areas/${newSlug}/</loc>`
        );
    });
    fs.writeFileSync(sitemapPath, sitemap);
}

// 5. Inject Geographical Silos
Object.values(areasMap).forEach(data => {
    const filePath = path.join(areasDir, data.newSlug, 'index.html');
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const document = dom.window.document;

    const existing = document.getElementById('nearby-areas');
    if (existing) existing.remove();

    let mainContainer = document.querySelector('main');
    if (!mainContainer) {
        const divs = Array.from(document.querySelectorAll('div'));
        mainContainer = divs.find(d => d.className && d.className.includes('lg:w-3/4') && d.className.includes('space-y-'));
    }
    
    if (mainContainer) {
        const neighbors = geoClusters[data.newSlug];
        if (neighbors && neighbors.length > 0) {
            let linksHtml = '';
            neighbors.forEach(nSlug => {
                const nData = Object.values(areasMap).find(a => a.newSlug === nSlug);
                if (nData) {
                    linksHtml += `<li><a href="/areas/${nData.newSlug}/" class="hover:underline text-blue-600 font-bold">نقل عفش حي ${nData.title} جدة</a></li>`;
                }
            });

            const siloHtml = `
            <section id="nearby-areas" class="bg-blue-50 rounded-2xl shadow-sm p-6 mt-10 border border-blue-100 card-hover">
                <h3 class="text-2xl font-bold mb-3 text-blue-800">أحياء جدة المجاورة</h3>
                <p class="mb-4 text-gray-700">إذا كنت تنتقل إلى حي مجاور، يمكنك الاطلاع على خدماتنا المخصصة للأحياء التالية:</p>
                <ul class="list-disc list-inside space-y-2">
                    ${linksHtml}
                </ul>
                <p class="mt-4 text-sm text-gray-500">نقدم أيضاً <a href="/furniture-moving-in-jeddah/" class="text-blue-600 font-bold hover:underline">خدمة نقل عفش بجدة</a> لجميع المناطق، بالإضافة إلى خدمات <a href="/furniture-packaging-in-jeddah/" class="text-blue-600 hover:underline">تغليف العفش</a> و<a href="/furniture-storage-in-jeddah/" class="text-blue-600 hover:underline">تخزين الأثاث</a>.</p>
            </section>
            `;
            
            mainContainer.insertAdjacentHTML('beforeend', siloHtml);
            fs.writeFileSync(filePath, dom.serialize());
        }
    }
});

console.log("Phase 3 executed successfully.");
