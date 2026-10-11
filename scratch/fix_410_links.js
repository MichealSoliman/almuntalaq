const fs = require('fs');
const path = require('path');

function getAllFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
                results = results.concat(getAllFiles(fullPath));
            }
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = getAllFiles('.');
let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace full absolute URLs
    content = content.replaceAll('https://almontalaqmoving.com/furniture-moving-in-jeddah/', 'https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/');
    content = content.replaceAll('http://almontalaqmoving.com/furniture-moving-in-jeddah/', 'https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/');
    
    // Replace href="/furniture-moving-in-jeddah/"
    content = content.replaceAll('href="/furniture-moving-in-jeddah/"', 'href="/furniture-moving-companies-in-jeddah/"');
    content = content.replaceAll("href='/furniture-moving-in-jeddah/'", "href='/furniture-moving-companies-in-jeddah/'");
    
    // In JS config
    content = content.replaceAll("path: '/furniture-moving-in-jeddah/'", "path: '/furniture-moving-companies-in-jeddah/'");
    content = content.replaceAll("path: '/furniture-moving-in-jeddah'", "path: '/furniture-moving-companies-in-jeddah/'");
    content = content.replaceAll('link: "./furniture-moving-in-jeddah/"', 'link: "./furniture-moving-companies-in-jeddah/"');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} files to remove 410 /furniture-moving-in-jeddah/ links.`);
