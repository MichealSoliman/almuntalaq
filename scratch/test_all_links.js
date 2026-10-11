const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
                results = results.concat(getAllHtmlFiles(fullPath));
            }
        } else if (file.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = getAllHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files.`);

let brokenLinks = [];
let checkedCount = 0;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hrefRegex = /href=["']([^"'#]+)(?:#[^"']*)?["']/gi;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        let url = match[1];
        if (url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('javascript:')) continue;
        if (url.endsWith('.css') || url.endsWith('.ico') || url.endsWith('.png') || url.endsWith('.webmanifest')) continue;
        if (url.startsWith('http') && !url.includes('almontalaqmoving.com')) continue; // External
        
        let targetPath;
        if (url.startsWith('http')) {
            let clean = url.replace(/https?:\/\/almontalaqmoving\.com/, '');
            if (!clean.startsWith('/')) clean = '/' + clean;
            clean = clean.split('?')[0];
            let rel = clean.replace(/^\//, '');
            if (rel === '' || rel.endsWith('/')) rel = path.join(rel, 'index.html');
            targetPath = path.resolve(rel);
        } else if (url.startsWith('/')) {
            let rel = url.replace(/^\//, '').split('?')[0];
            if (rel === '' || rel.endsWith('/')) rel = path.join(rel, 'index.html');
            targetPath = path.resolve(rel);
        } else {
            // relative to current file
            let dir = path.dirname(file);
            let clean = url.split('?')[0];
            if (clean.endsWith('/') || clean === '..') clean = path.join(clean, 'index.html');
            targetPath = path.resolve(dir, clean);
            if (!fs.existsSync(targetPath) && fs.existsSync(path.join(targetPath, 'index.html'))) {
                targetPath = path.join(targetPath, 'index.html');
            }
        }
        
        checkedCount++;
        if (!fs.existsSync(targetPath)) {
            brokenLinks.push({ source: file, link: url, targetPath });
        }
    }
});

console.log(`Checked ${checkedCount} HTML links.`);
if (brokenLinks.length === 0) {
    console.log('SUCCESS: All internal HTML links resolve to valid local pages! Zero 404s.');
} else {
    console.log(`Found ${brokenLinks.length} broken links:`);
    const uniqueTargets = [...new Set(brokenLinks.map(b => b.link))];
    console.log('Unique broken link targets:', uniqueTargets);
    brokenLinks.slice(0, 10).forEach(b => console.log(`In ${b.source} -> ${b.link}`));
}
