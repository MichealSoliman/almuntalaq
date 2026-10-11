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

    content = content.replaceAll('https://almontalaqmoving.com/blogs/furniture-storage-in-jeddah/', 'https://almontalaqmoving.com/furniture-storage-in-jeddah/');
    content = content.replaceAll('/blogs/furniture-storage-in-jeddah/', '/furniture-storage-in-jeddah/');
    content = content.replaceAll('https://almontalaqmoving.com/blogs/how-to-choose-furniture-moving-company-jeddah/', 'https://almontalaqmoving.com/blogs/how-to-choose-furniture-moving-company/');
    content = content.replaceAll('https://almontalaqmoving.com/furniture-moving-prices-jeddah/', 'https://almontalaqmoving.com/blogs/furniture-moving-prices-in-jeddah/');
    content = content.replaceAll('https://almontalaqmoving.com/arwas/', 'https://almontalaqmoving.com/areas/');
    content = content.replaceAll('https://almontalaqmoving.com/furniture-moving-jeddah/', 'https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/');
    content = content.replaceAll('/furniture-moving-jeddah/', '/furniture-moving-companies-in-jeddah/');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} files with remaining link fixes.`);
